const express = require('express')
const MovieController = require('../controllers/movieController')
const router = express.Router()

router.get('/', MovieController.getAllMovies)
router.get('/popular', MovieController.getMostPopularMovies)
router.get('/newest', MovieController.getNewestMovies)
router.get('/:id', MovieController.getMovieDetail)
router.post('/ai-assistant', MovieController.AiAssistantMovies)

module.exports = router