import Database from '../src/database/index'
import truncate from './util/truncate'

import Agendamento from '../src/app/models/Agendamento'
import Cliente from '../src/app/models/Cliente'
import Usuario from '../src/app/models/Usuario'
import Modelo from '../src/app/models/Modelo'
import Fabricante from '../src/app/models/Fabricante'
import Unidade from '../src/app/models/Unidade'
import Veiculo from '../src/app/models/Veiculo'

test('Realizando Agendamentos', async () => {
  const unidade = await Unidade.create({ id: 427 })
  const cliente = await Cliente.create({ nome: 'Gabriel', cpf: '123' })
  const atendente = await Usuario.create({ nome: 'Sr. João', email: 'atendimento@carsharing.com.br', senha: 'senha' })

  await Fabricante.create({ id: 1, nome: 'Ford' })
  await Fabricante.create({ id: 2, nome: 'Renault' })

  await Modelo.create({ id: 1, fabricante_id: 1, modelo: 'Ka', imagem: 'modelos/ka.png' })
  await Modelo.create({ id: 3, fabricante_id: 2, modelo: 'Kwid', imagem: 'modelos/kwid.png' })

  const veiculo1 = await Veiculo.create({ id: 12, unidade_id: 427, modelo_id: 3, placa: 'BCS5B68', cor: 'BRANCO' })

  const agendamento = await Agendamento.create({
    data_inicial: new Date('2020-06-12T18:00:00'),
    data_final: new Date('2020-06-13T18:00:00'),
    cliente_id: cliente.id,
    unidade_id: unidade.id,
    veiculo_id: veiculo1.id,
    atendente_id: atendente.id
  })
  expect(agendamento).not.toBeNull()
  console.log(agendamento.toJSON())
})

afterAll(async done => {
  await truncate()
  await Database.connection.close()
  done()
})
