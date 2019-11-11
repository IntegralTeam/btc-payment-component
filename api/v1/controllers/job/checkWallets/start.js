const errors = require('../../../../../config/errors');
const cwJob = require('../../../jobs/checkWallets');

module.exports = async (req, res, next) => {
    try {
        cwJob.start();
        console.log(`checkWallets job started`);
        const meta = { sucess: true };
        return res.json({ meta });
    }
    catch (err){
        console.log(err);
        next( errors.internalServerError );
    }
}