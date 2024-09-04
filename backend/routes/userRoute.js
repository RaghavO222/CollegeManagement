const express = require('express')

const {getUser,sepUser,signupUser,loginUser} = require('../controller/user')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.post('/signup',signupUser)

router.post('/login',loginUser)

router.use(requireAuth)

router.get('/',getUser)

router.get('/:username',sepUser)


module.exports = router