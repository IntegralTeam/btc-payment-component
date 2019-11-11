const errors = require('../../../../config/errors');
const config = require('config');

let start = async (req, res, next) => {
  try {
    req.foundUser.status = config.get('userStatuses.active');
    await req.foundUser.save();

    return res.json({ success: true })
  }
  catch (err){
    console.log(err);
    next( errors.internalServerError );
  }
}
module.exports = start;