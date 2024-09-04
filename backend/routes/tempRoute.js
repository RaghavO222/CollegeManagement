const express = require('express')
const {
    createTemp,
    getTemp,
    deleteTemp
} = require('../controller/temp')

const router = express.Router()

router.get('/',getTemp)

router.post('/',createTemp)

router.delete('/:id',deleteTemp)

module.exports = router