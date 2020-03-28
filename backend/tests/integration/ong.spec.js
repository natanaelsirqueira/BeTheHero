const request = require('supertest')
const app = require('../../src/app')
const conn = require('../../src/database/conn')

describe('ONG', () => {
  beforeEach(async () => {
    await conn.migrate.rollback()
    await conn.migrate.latest()
  })

  afterAll(async () => await conn.destroy())

  function createOng(params) {
    return request(app)
      .post('/ongs')
      .send(params)
  }

  const params = {
    name: 'APAD',
    email: 'contato@apad.com.br',
    whatsapp: '6900000000',
    city: 'Ji-Paraná',
    uf: 'RO'
  }

  it('should be able to create a new ONG', async () => {
    const response = await createOng(params)

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })

  it('should not accept an invalid email', async () => {
    const response = await createOng({ ...params, email: 'contato' })

    expect(response.body.statusCode).toBe(400)
    expect(response.body.message).toBe('"email" must be a valid email')
  })

  it('should not accept an invalid whatsapp number', async () => {
    let response = await createOng({ ...params, whatsapp: '123' })

    expect(response.body.statusCode).toBe(400)
    expect(response.body.message).toBe('"whatsapp" length must be at least 10 characters long')

    response = await createOng({ ...params, whatsapp: '123456789011' })

    expect(response.body.statusCode).toBe(400)
    expect(response.body.message).toBe('"whatsapp" length must be less than or equal to 11 characters long')
  })
})
