const request = require('supertest')
const app = require('../app')
const { Thread, User } = require('../models')
const jwt = require('jsonwebtoken')

let access_token
let userId
let threadId

beforeAll(async () => {
  await Thread.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  await User.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })

  const user = await User.create({ username: 'threaduser', email: 'thread@mail.com', password: '123456' })
  userId = user.id
  access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret')

  const thread = await Thread.create({ content: 'Test thread', UserId: userId })
  threadId = thread.id
})

afterAll(async () => {
  await Thread.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
  await User.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true })
})

describe('ThreadController', () => {
  test('GET /threads - getAllThreads', async () => {
    const res = await request(app)
      .get('/threads')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.total).toBeGreaterThanOrEqual(1)
  })

  test('POST /threads - createThread', async () => {
    const res = await request(app)
      .post('/threads/add')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ content: 'New thread' })
    expect(res.statusCode).toBe(201)
    expect(res.body.content).toBe('New thread')
  })

  test('PUT /threads/:id - editThread', async () => {
    const res = await request(app)
      .put(`/threads/${threadId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({ content: 'Updated thread' })
    expect(res.statusCode).toBe(200)
    expect(res.body.content).toBe('Updated thread')
  })

  test('DELETE /threads/:id - deleteThread', async () => {
    const res = await request(app)
      .delete(`/threads/${threadId}`)
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/deleted/i)
  })

  test('PUT /threads/:id - editThread not found', async () => {
    const res = await request(app)
      .put(`/threads/99999`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({ content: 'Should not update' })
    expect(res.statusCode).toBe(404)
  })

  test('DELETE /threads/:id - deleteThread not found', async () => {
    const res = await request(app)
      .delete(`/threads/99999`)
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(404)
  })

  test('GET /threads - getAllThreads with pagination', async () => {
    const res = await request(app)
      .get('/threads?page=2&limit=5')
      .set('Authorization', `Bearer ${access_token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('page')
  })
})