const errors = require('../../../../../config/errors');
const cwJob = require('../../../jobs/checkWallets');

module.exports = async (req, res, next) => {
    try {
        cwJob.stop();
        console.log(`checkWallets job stopped`);
        const meta = { sucess: true };
        return res.json({ meta });
    }
    catch (err){
        console.log(err);
        next( errors.internalServerError );
    }
}