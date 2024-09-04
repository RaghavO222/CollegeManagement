const express = require('express')
const {
    getAtt,
    addAtt
} = require('../controller/attendence')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/:date',getAtt)

router.post('/',addAtt)

module.exports = router