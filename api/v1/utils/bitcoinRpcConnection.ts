const config = require('config');
import BitcoinRPC from './bitcoinRpcClass';

export default new BitcoinRPC(
  config.btc.rpcHost,
  config.btc.rpcUser,
  config.btc.rpcPassword,
);