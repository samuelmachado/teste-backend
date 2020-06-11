import Fabricante from '../src/app/models/Fabricante'
import Database from '../src/database/index'
import truncate from './util/truncate'

test('Salvando e deletando fabricante', async () => {
  const fabricante = await Fabricante.create({ nome: 'Volks' })
  expect(fabricante).not.toBeNull()
})

test('Busca por nome', async () => {
  await Fabricante.create({ nome: 'Volks' })
  await Fabricante.create({ nome: 'Fiat' })
  await Fabricante.create({ nome: 'Ford' })
  const fabricante = await Fabricante.findOne({ where: { nome: 'Fiat' } })
  expect(fabricante).not.toBeNull()
  expect(fabricante.nome).toBe('Fiat')
})

afterAll(async done => {
  await truncate()
  await Database.connection.close()
  done()
})
