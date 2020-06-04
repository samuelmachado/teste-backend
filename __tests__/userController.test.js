import app from '../src/server'
import Database from '../src/database/index'

describe('Test Users endpoints', () => {
  test('Should save an user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Felipe', email: 'user@email.com', password: 'password' })
    expect(response.statusCode).toBe(201)
  })

  test('Should return Validation fails - email is not valid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Felipe', email: 'useremail.com', password: 'password' })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Validation fails')
  })

  test('Should return Validation fails - password is not valid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Felipe', email: 'usere@mail.com', password: 'pass' })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Validation fails')
  })

  test('Should response conflict error', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Felipe', email: 'user2@email.com', password: 'password' })
    const response = await request(app)
      .post('/users')
      .send({ name: 'Felipe', email: 'user2@email.com', password: 'password' })
    expect(response.statusCode).toBe(409)
  })

  test('Should update an user', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'User 01', email: 'user01@email.com', password: 'password1' })

    const authResponse = await request(app)
      .post('/auth')
      .send({ email: 'user01@email.com', password: 'password1' })

    const response = await request(app)
      .put('/users')
      .set('Authorization', 'bearer ' + authResponse.body.token)
      .send(
        {
          name: 'User 01',
          email: 'user01@email.com',
          password: 'password2',
          confirmPassword: 'password2',
          oldPassword: 'password1'
        })
    expect(response.statusCode).toBe(200)
  })

  test('Should return Password does not match', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'User 01', email: 'user01@email.com', password: 'password1' })

    const authResponse = await request(app)
      .post('/auth')
      .send({ email: 'user01@email.com', password: 'password1' })

    const response = await request(app)
      .put('/users')
      .set('Authorization', 'bearer ' + authResponse.body.token)
      .send(
        {
          name: 'User 01',
          email: 'user01@email.com',
          password: 'password2',
          confirmPassword: 'password2',
          oldPassword: '11111111'
        })
    expect(response.body.error).toBe('Password does not match')
  })

  test('Should return validation fails - email is not valid', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'User 01', email: 'user01@email.com', password: 'password1' })

    const authResponse = await request(app)
      .post('/auth')
      .send({ email: 'user01@email.com', password: 'password1' })

    const response = await request(app)
      .put('/users')
      .set('Authorization', 'bearer ' + authResponse.body.token)
      .send(
        {
          name: 'User 01',
          email: 'user01email.com',
          password: 'password2',
          confirmPassword: 'password2',
          oldPassword: 'password1'
        })
    expect(response.body.error).toBe('Validation fails')
  })
})

afterAll(async done => {
  await Database.connection.models.User.truncate({ cascade: true })
  await Database.connection.close()
  app.close()
  done()
})
