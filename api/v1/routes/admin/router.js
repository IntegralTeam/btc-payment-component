let express = require('express');
let router = express.Router();

const user = require('./user');
const job = require('./job');
const btcHdWallet = require('./btcHdWallet');

router.use('/user', user);
router.use('/job', job);
router.use('/btchdwallet', btcHdWallet);

module.exports = router;