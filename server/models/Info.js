const mongoose = require('mongoose')
const Shema = mongoose.Schema

const itemInfoShema = new Shema({
  id: {
    type: Number
  },
  description: {
    type: String
  },
  size: {
    type: String
  },
  relation: {
    type: String
  },
  visibility: {
    type: String
  },
  color: {
    type: String
  }
})

module.exports = mongoose.model('itemsInfo', itemInfoShema)
