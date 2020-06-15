import Unidade from '../src/app/models/Unidade'
import Database from '../src/database/index'

test('Salvando e deletando Unidade', async () => {
  const unidade = await Unidade.create({ id: 1 })
  expect(unidade.id).not.toBeNull()
  expect(unidade.id).toBe(1)
  await unidade.destroy()
})

afterAll(async done => {
  await Database.connection.close()
  done()
})
