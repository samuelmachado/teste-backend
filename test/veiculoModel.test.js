import Database from '../src/database/index'
import truncate from './util/truncate'

import Modelo from '../src/app/models/Modelo'
import Fabricante from '../src/app/models/Fabricante'
import Unidade from '../src/app/models/Unidade'
import Veiculo from '../src/app/models/Veiculo'

beforeAll(async () => {
  await Fabricante.create({ id: 1, nome: 'Ford' })
  await Fabricante.create({ id: 2, nome: 'Renault' })
  await Modelo.create({ id: 1, fabricante_id: 1, modelo: 'Ka', imagem: 'modelos/ka.png' })
  await Modelo.create({ id: 3, fabricante_id: 2, modelo: 'Kwid', imagem: 'modelos/kwid.png' })
  await Unidade.create({ id: 427 })
  await Unidade.create({ id: 380 })
})

test('Salvando e Deletando Veiculo', async () => {
  const veiculo = await Veiculo.create({ id: 12, unidade_id: 427, modelo_id: 3, placa: 'BCS5B68', cor: 'BRANCO' })

  expect(veiculo).not.toBeNull()
  expect(veiculo.id).toBe(12)
  console.log(veiculo)
  await veiculo.destroy()
})

test('Buscando Veiculos com Filtro de Unidade', async () => {
  const veiculo1 = await Veiculo.create({ id: 12, unidade_id: 427, modelo_id: 3, placa: 'BCS5B68', cor: 'BRANCO' })
  const veiculo2 = await Veiculo.create({ id: 13, unidade_id: 427, modelo_id: 1, placa: 'PXS6266', cor: 'BRANCO' })
  const veiculo3 = await Veiculo.create({ id: 16, unidade_id: 380, modelo_id: 3, placa: 'BCS6H23', cor: 'BRANCO' })

  const resultadoBusca427 = await Veiculo.findAll({ where: { unidade_id: 427 } })
  const resultadoBusca380 = await Veiculo.findAll({ where: { unidade_id: 380 } })

  expect(resultadoBusca427.length).toBe(2)
  resultadoBusca427.forEach(veiculo => console.log(veiculo.toJSON()))

  expect(resultadoBusca380.length).toBe(1)
  resultadoBusca380.forEach(veiculo => console.log(veiculo.toJSON()))
  await truncate()
})

afterAll(async done => {
  await truncate()
  await Database.connection.close()
  done()
})
