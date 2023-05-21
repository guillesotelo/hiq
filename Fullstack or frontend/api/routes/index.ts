const express = require('express')
const router = express.Router()

const textRoutes = require('./text')

router.use('/text', textRoutes)

module.exports = router