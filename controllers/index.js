const express = require('express')
const findOrCreate = require('./findOrCreate')
const router = express.Router()

router.get('/:userName?/:gameId?', findOrCreate)

module.exports = router

