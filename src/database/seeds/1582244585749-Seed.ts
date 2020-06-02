/* eslint-disable no-restricted-syntax */
import { MigrationInterface, QueryRunner } from 'typeorm';

import data from '../../../veiculos.json';
import { Branch } from '../../app/models/Branch';
import { Car } from '../../app/models/Car';
import { Manufacturer } from '../../app/models/Manufacturer';
import { Model } from '../../app/models/Model';

const cities = [
  'Sao Paulo',
  'Florianopolis',
  'Sao Jose dos Campos',
  'Rio de Janeiro',
];

export class Seed1582244585749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const city of cities) {
      const branchInfo = new Branch({
        city,
      });

      await queryRunner.connection.manager.save(Branch, branchInfo);
    }

    for (const item of data) {
      const { modelo } = item;
      const { fabricante } = modelo;

      let manufacturer = await queryRunner.connection.manager.findOne(
        Manufacturer,
        {
          name: fabricante.nome,
        },
      );

      if (!manufacturer) {
        const manufacturerInfo = new Manufacturer({
          name: fabricante.nome,
        });

        manufacturer = await queryRunner.connection.manager.save(
          Manufacturer,
          manufacturerInfo,
        );
      }

      let model = await queryRunner.connection.manager.findOne(Model, {
        name: modelo.modelo,
      });

      if (!model) {
        const modelInfo = new Model({
          name: modelo.modelo,
          image: modelo.imagem,
          manufacturer_id: manufacturer.id,
        });

        model = await queryRunner.connection.manager.save(Model, modelInfo);
      }

      const carInfo = new Car({
        license_plate: item.placa,
        color: item.cor,
        branch_id: Math.floor(Math.random() * 4) + 1,
        model_id: model.id,
      });

      await queryRunner.connection.manager.save(Car, carInfo);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE manufacturers CASCADE;`, undefined);
    await queryRunner.query(`TRUNCATE TABLE branches CASCADE;`, undefined);
    await queryRunner.query(`TRUNCATE TABLE models CASCADE;`, undefined);
    await queryRunner.query(`TRUNCATE TABLE cars CASCADE;`, undefined);
    await queryRunner.query(`TRUNCATE TABLE bookings CASCADE;`, undefined);
  }
}
