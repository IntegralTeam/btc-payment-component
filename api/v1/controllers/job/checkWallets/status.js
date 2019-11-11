const errors = require('../../../../../config/errors');
const cwJob = require('../../../jobs/checkWallets');

module.exports = async (req, res, next) => {
    try {
        let running = cwJob.running;
        cwJob.running ? null : running = false;

        const meta = { sucess: true };
        const data = { running };    
        return res.json({ meta, data });
    }
    catch (err){
        console.log(err);
        next( errors.internalServerError );
    }
}