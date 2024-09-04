const express = require('express')
const {
    getMarks,
    createMarks
} = require('../controller/mark')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/',getMarks)

router.post('/',createMarks)

module.exports = router