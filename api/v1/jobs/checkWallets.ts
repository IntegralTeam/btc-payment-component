const CronJob = require('cron').CronJob;
const config = require('config');
const Wallet = require('../models/Wallet');
const callbacks = { ...require('../callbacks') };
import bitcoinRPC from '../utils/bitcoinRpcConnection';

const mainFunction = async () => {
  const query = { 
    fullfilled: false, 
    hoursToCheck: { $gte : new Date() }
  };
  
  const unfulfilledWallets = await Wallet.find(query);
  console.log(`Unfulfilled wallets: `, unfulfilledWallets.length);

  unfulfilledWallets.forEach(async(wallet) => {
    try {

      let amount = await bitcoinRPC.getReceivedByAddress(wallet.address, config.get(`btc.minConfirmsNumber`));
      if (amount >= wallet.expectedAmount){

        wallet.fullfilled = true;
        await wallet.save().then(null, function (err) { 
          if (err) throw err;
        });

        const { callbackName, callbackArgs } = wallet;
        if (callbacks[callbackName]){
          callbacks[callbackName](callbackArgs);
        }

      }
    }
    catch (err){
      console.log(err);
    }    
  });
};

const job = new CronJob('*/5 * * * * *', mainFunction);

module.exports = job;