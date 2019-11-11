const errors = require('../../../../config/errors');
const config = require('config')
const wif = require('wif');
import bitcoinRPC from '../../utils/bitcoinRpcConnection';

module.exports = async (req, res, next) => {
  try {
    const { newkeypool } = req.body;
    const masterPrivateKey = config.get('btc.masterPrivateKey');
    const wifMasterPrivateKey = wif.encode(128, new Buffer(masterPrivateKey), true);
    const walletInfo = await bitcoinRPC.setHdSeed(newkeypool, wifMasterPrivateKey);
    
    const meta = { sucess: true };
    const data = { walletInfo };  
    return res.json({ meta, data });
  }
  catch (err){
    console.log(err);
    next( errors.internalServerErrorWithMsg(err.message) );
  }
};