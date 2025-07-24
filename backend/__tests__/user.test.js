const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

beforeAll(async () => {
  await User.destroy({ where: {} })
  await User.create({
    username: 'loginuser',
    email: 'login@mail.com',
    password: 'password' // plain text, biar hook yang hash
  })
})

afterAll(async () => {
  await User.destroy({ where: {} })
})

describe('UserController', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@mail.com',
          password: '123456'
        })
      expect(res.statusCode).toBe(201)
      expect(res.body.user).toHaveProperty('id', expect.any(Number))
      expect(res.body.user.username).toBe('testuser')
      expect(res.body.user.email).toBe('test@mail.com')
    })

    it('should fail if email already exists', async () => {
      await User.create({
        username: 'testuser2',
        email: 'test2@mail.com',
        password: '123456'
      })
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser2',
          email: 'test2@mail.com',
          password: '123456'
        })
      expect(res.statusCode).toBeGreaterThanOrEqual(400)
    })
  })

  describe('POST /login', () => {

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'login@mail.com',
          password: 'password'
        })
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('access_token')
    })

    it('should fail login with wrong password', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'login@mail.com',
          password: 'wrongpassword'
        })
      expect(res.statusCode).toBe(401)
    })

    it('should fail login with wrong email', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'wrong@mail.com',
          password: 'password'
        })
      expect(res.statusCode).toBe(401)
    })

    it('should fail login if email is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          password: 'password'
        })
      expect(res.statusCode).toBe(400)
    })

    it('should fail login if password is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'login@mail.com'
        })
      expect(res.statusCode).toBe(400)
    })
  })

  describe('POST /google-login', () => {
    it('should fail if googleToken is missing', async () => {
      const res = await request(app)
        .post('/google-login')
        .send({})
      expect(res.statusCode).toBe(400)
    })

    it('should fail with invalid google token', async () => {
      const res = await request(app)
        .post('/google-login')
        .send({ googleToken: 'invalid_token' })
      expect(res.statusCode).toBe(500) // GoogleGenAI will throw error
    })
  })

  describe('Authentication Tests', () => {
    it('should fail without authorization header', async () => {
      const res = await request(app)
        .get('/movies')
      expect(res.statusCode).toBe(401)
    })

    it('should fail with invalid token format', async () => {
      const res = await request(app)
        .get('/movies')
        .set('Authorization', 'InvalidToken')
      expect(res.statusCode).toBe(401)
    })

    it('should fail with invalid Bearer token', async () => {
      const res = await request(app)
        .get('/movies')
        .set('Authorization', 'Bearer invalid_token')
      expect(res.statusCode).toBe(401)
    })
  })

  
})