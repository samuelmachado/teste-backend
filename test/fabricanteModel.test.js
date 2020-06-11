import Fabricante from '../src/app/models/Fabricante'
import Database from '../src/database/index'

test('Salvando e deletando fabricante', async () => {
  const fabricante = await Fabricante.create({ nome: 'Volks' })
  expect(fabricante).not.toBeNull()
  await fabricante.destroy()
})

test('Busca por nome', async () => {
  await Fabricante.create({ nome: 'Volks' })
  await Fabricante.create({ nome: 'Fiat' })
  await Fabricante.create({ nome: 'Ford' })
  const fabricante = await Fabricante.findOne({ where: { nome: 'Fiat' } })
  expect(fabricante).not.toBeNull()
  expect(fabricante.nome).toBe('Fiat')
  await Fabricante.truncate()
})

afterAll(async done => {
  await Database.connection.close()
  done()
})
