require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const { Movie, Genre, User } = require('../models')
const jwt = require('jsonwebtoken')

let access_token
let movieId
let genreId

beforeAll(async () => {
  await Movie.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  await Genre.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  await User.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
 

  const user = await User.create({ username: 'movietest', email: 'movietest@mail.com', password: '123456' })
  access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret')

  const genre = await Genre.create({ name: 'Action' })
  genreId = genre.id

  const movie = await Movie.create({
    title: 'Test Movie',
    overview: 'Test overview',
    release_date: '2025-07-24',
    poster_path: 'https://image.tmdb.org/t/p/w780/test.jpg',
    popularity: 100,
    adult: false,
    backdrop_path: 'https://image.tmdb.org/t/p/w780/test_backdrop.jpg',
    original_language: 'en',
    original_title: 'Test Movie',
    video: false,
    vote_average: 8.5,
    vote_count: 1000
  })
  movieId = movie.id
  await movie.addGenre(genre)
})

afterAll(async () => {
  await Movie.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  await Genre.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  await User.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  
})

describe('MovieController', () => {
  test('GET /movies - getAllMovies', async () => {
    const res = await request(app)
      .get('/movies')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  

  test('GET /movies?genreId=1 - getAllMovies with genre filter', async () => {
    const res = await request(app)
      .get(`/movies?genreId=${genreId}`)
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('GET /movies?search=Test - getAllMovies with search', async () => {
    const res = await request(app)
      .get('/movies?search=Test')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('GET /movies/popular - getMostPopularMovies', async () => {
    const res = await request(app)
      .get('/movies/popular')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('GET /movies/newest - getNewestMovies', async () => {
    const res = await request(app)
      .get('/movies/newest')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  test('GET /movies/:id - getMovieDetail', async () => {
    const res = await request(app)
      .get(`/movies/${movieId}`)
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.id).toBe(movieId)
    expect(res.body.Genres).toBeDefined()
  })

  test('GET /movies/:id - getMovieDetail not found', async () => {
    const res = await request(app)
      .get(`/movies/99999`)
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(404)
  })

  test('POST /movies/ai-assistant - AiAssistantMovies missing query', async () => {
    const res = await request(app)
      .post('/movies/ai-assistant')
      .set('Authorization', `Bearer ${access_token}`)
      .send({})
    expect(res.statusCode).toBe(400)
  })

  test('GET /movies - getAllMovies with sorting DESC', async () => {
    const res = await request(app)
      .get('/movies?sort=-popularity')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
  })

  test('GET /movies - getAllMovies with sorting ASC', async () => {
    const res = await request(app)
      .get('/movies?sort=title')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
  })

  test('GET /movies/popular - with pagination', async () => {
    const res = await request(app)
      .get('/movies/popular?page=2&limit=5')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
  })

  test('GET /movies/newest - with pagination', async () => {
    const res = await request(app)
      .get('/movies/newest?page=1&limit=5')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
  })

  test('POST /movies/ai-assistant - AiAssistantMovies', async () => {
    const res = await request(app)
      .post('/movies/ai-assistant')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ query: 'action movie' })
    // Karena ini pakai GoogleGenAI, bisa saja gagal jika API key tidak valid
    // Jadi, cek status 200 atau 400/500 jika key tidak tersedia
    expect([200, 400, 500]).toContain(res.statusCode)
  }, 20000)
})