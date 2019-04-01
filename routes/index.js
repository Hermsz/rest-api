const router = require('express').Router()
const users = require('./users')

router.use('/api', users)

module.exports = router