let express = require('express');
let router = express.Router();

const create = require('../../controllers/btcHdWallet/create');
const setHdSeed = require('../../controllers/btcHdWallet/setHdSeed');

const validation = require('../../middlewares/validation/btcHdWallet');

router.post('/', validation.create(), create);
router.post('/setseed', validation.setHdSeed(), setHdSeed);

module.exports = router;
