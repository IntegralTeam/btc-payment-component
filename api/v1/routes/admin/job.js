let express = require('express');
let router = express.Router();

const cwStatus = require('../../controllers/job/checkWallets/status');
const cwStart = require('../../controllers/job/checkWallets/start');
const cwStop = require('../../controllers/job/checkWallets/stop');

router.get('/checkwallets/status', cwStatus);
router.put('/checkwallets/start', cwStart);
router.put('/checkwallets/stop', cwStop);

module.exports = router;
