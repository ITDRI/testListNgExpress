const ItemList = require('../models/Item')
const errorHandler = require('../error/errorHandler');

module.exports.getItems = async function(req, res) {
  try {
    const itemList = await ItemList.find()
    res.status(200).json(itemList)
  } catch (e) {
    errorHandler(res, e)
  }
}
