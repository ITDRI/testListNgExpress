const express = require('express')
const controller = require('../controllers/item.controller')
const router = express.Router()

router.get('/items', controller.getItems)

module.exports = router
