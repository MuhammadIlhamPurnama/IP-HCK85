const express = require('express')
const ThreadController = require('../controllers/threadController')
const ownerOnly = require('../middlewares/ownerOnly')
const router = express.Router()

router.get('/', ThreadController.getAllThreads)
router.post('/add', ThreadController.createThread)
router.put('/:id',ownerOnly, ThreadController.editThread)
router.delete('/:id',ownerOnly, ThreadController.deleteThread)

module.exports = router