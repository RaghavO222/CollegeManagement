const express = require('express')
const {
    getSubs
} = require('../controller/subject')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/',getSubs)

module.exports = router