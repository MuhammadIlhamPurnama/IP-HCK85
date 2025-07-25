const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const movieRouter = require('./movie')
const threadRouter = require('./thread')
const authentication = require('../middlewares/authentication')

router.use(userRouter)

router.use(authentication)
router.use('/movies', movieRouter)
router.use('/threads', threadRouter)

module.exports = router