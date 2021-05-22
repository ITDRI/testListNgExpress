const ItemInfo = require('../models/Info')
const errorHandler = require('../error/errorHandler');

module.exports.getInfo = async function(req, res) {
  try {
    const info = await ItemInfo.find({
      id: req.params.id
    })
    res.status(200).json(info[0])
  } catch (e) {
    errorHandler(res, e)
  }
}
