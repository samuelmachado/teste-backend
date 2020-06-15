import Modelo from '../src/app/models/Modelo'
import Fabricante from '../src/app/models/Fabricante'
import Database from '../src/database/index'
import truncate from './util/truncate'

test('Salvando e deletando Modelo', async () => {
  await Fabricante.create({ id: 2, nome: 'Renault' })
  const modelo = await Modelo.create({ id: 3, fabricante_id: 2, modelo: 'Kwid', imagem: 'modelos/kwid.png' })
  expect(modelo).not.toBeNull()
  await truncate()
})

test('Buscando Modelo', async () => {
  await Fabricante.create({ id: 1, nome: 'Ford' })
  await Fabricante.create({ id: 2, nome: 'Renault' })
  await Modelo.create({ id: 1, fabricante_id: 1, modelo: 'Ka', imagem: 'modelos/ka.png' })
  await Modelo.create({ id: 3, fabricante_id: 2, modelo: 'Kwid', imagem: 'modelos/kwid.png' })

  const modelo = await Modelo.findOne({ where: { modelo: 'Ka' } })

  expect(modelo).not.toBeNull()
})

afterAll(async done => {
  await truncate()
  await Database.connection.close()
  done()
})
