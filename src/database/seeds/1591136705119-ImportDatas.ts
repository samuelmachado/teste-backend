/* eslint-disable */
import { readFile } from 'fs'
import { resolve } from 'path'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { promisify } from 'util'

import { Car, Factory, CarModel } from '@/database/models'
import ImportableData from '@/types/importableData'

export default class ImportDatas1591136705119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dataFilePath = resolve(__dirname, '..', '..', 'files', 'veiculos.json')
    const factoryRepository = queryRunner.connection.getRepository(Factory)
    const carModelRepository = queryRunner.connection.getRepository(CarModel)
    const carRepository = queryRunner.connection.getRepository(Car)
    const asynReadFile = promisify(readFile)

    const data = await asynReadFile(dataFilePath, { encoding: 'utf-8' })

    const importableCars: ImportableData[] = JSON.parse(data)

    for (const carData of importableCars) {
      const factoryData = {
        name: carData.modelo.fabricante.nome
      }
      let factory = await factoryRepository.findOne({ where: { name: factoryData.name } })
      if (!factory) factory = await factoryRepository.save(factoryData)

      const carModelData = {
        factory,
        name: carData.modelo.modelo,
        image: carData.modelo.imagem
      }

      let carModel = await carModelRepository.findOne({ where: { name: carModelData.name } })
      if (!carModel) carModel = await carModelRepository.save(carModelData)

      await carRepository.save({
        plate: carData.placa,
        color: carData.cor,
        unity: carData.idUnidade,
        carModel
      })
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
