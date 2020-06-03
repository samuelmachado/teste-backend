import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm'

export default class CreateCarTable1591136290425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'car_models_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'plate',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'reserved',
            type: 'boolean',
            default: false
          },
          {
            name: 'unity',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'cars',
      new TableForeignKey({
        name: 'FK_CARS_CAR_MODELS',
        columnNames: ['car_models_id'],
        referencedTableName: 'car_models',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('cars', true, true)
  }
}
