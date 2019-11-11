const errors = require('../../../../config/errors');
const config = require('config');
const mongoose = require('mongoose');
const Wallet = require('../../models/Wallet');
import bitcoinRPC from '../../utils/bitcoinRpcConnection';

module.exports = async (req, res, next) => {
  try {
    let { 
      externalId, 
      expectedAmount,
      callbackName,
      callbackArgs
    } = req.body;

    const address = await bitcoinRPC.getNewAddress();
    let hoursToCheck = new Date();
    hoursToCheck.setTime(hoursToCheck.getTime() + (config.get(`btc.hoursToCheck`)*60*60*1000));
    callbackArgs = callbackArgs ? JSON.parse(callbackArgs) : undefined;

    let newWallet = new Wallet({
      _id: new mongoose.Types.ObjectId(),
      address,
      externalId,
      expectedAmount,
      hoursToCheck,
      callbackName,
      callbackArgs,
      createdBy: req.user.id
    });

    await newWallet.save().then(null, function (err) { 
      if (err) throw err;
    });

    const meta = { sucess: true };
    const data = { address, newWallet };    
    return res.json({ meta, data });
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
};