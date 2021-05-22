const mongoose = require('mongoose')
const Shema = mongoose.Schema

const itemShema = new Shema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  parentId: {
    type: Number
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('items', itemShema)
