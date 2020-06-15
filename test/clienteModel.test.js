import Cliente from '../src/app/models/Cliente'
import Database from '../src/database/index'
import truncate from './util/truncate'

import { Op } from 'sequelize'

test('Salvando e Deletando Cliente', async () => {
  const nome = 'Gabriel'
  const usuario = await Cliente.create({ nome, cpf: '123' })
  expect(usuario.nome).toBe(nome)
  console.log(usuario.toJSON())
  await usuario.destroy()
})

test('Buscando Cliente por CPF e/ou Nome', async () => {
  await Cliente.create({ nome: 'Gabriel', cpf: '123' })
  await Cliente.create({ nome: 'Gabriel Pereira', cpf: '234' })
  await Cliente.create({ nome: 'Marcelo', cpf: '345' })

  const clientes = await Cliente.findAll({
    where: {
      nome: {
        [Op.like]: 'Gabriel%'
      }
    }
  })
  expect(clientes.length).toBe(2)
  clientes.forEach(c => console.log(c.toJSON()))

  const cliente2 = await Cliente.findOne({ where: { cpf: '345' } })
  console.log(cliente2.toJSON())
  expect(cliente2.nome).toBe('Marcelo')
})

afterAll(async done => {
  await truncate()
  await Database.connection.close()
  done()
})
