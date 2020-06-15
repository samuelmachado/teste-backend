import Usuario from '../src/app/models/Usuario'
import Database from '../src/database/index'

test('Salvando e deletando usuario', async () => {
  const usuario = await Usuario.create({ id: 1, nome: 'Gabriel', email: 'usuario@email.com', senha: 'senha123' })
  expect(usuario.id).not.toBeNull()
  expect(usuario.id).toBe(1)
  await usuario.destroy()
})

test('Testando login', async () => {
  const usuario = await Usuario.create({ id: 2, nome: 'Gabriel', email: 'usuario2@email.com', senha: 'senha123' })
  const resultTrue = await usuario.checkPassword('senha123')
  const resultFalse = await usuario.checkPassword('senha errada')
  expect(resultTrue).toBe(true)
  expect(resultFalse).toBe(false)
  await usuario.destroy()
})

afterAll(async done => {
  await Database.connection.close()
  done()
})
