import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export default class CreateCarModelTable1591135816156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'car_models',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'factory_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
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
      'car_models',
      new TableForeignKey({
        name: 'FK_CAR_MODELS_FACTORIES',
        columnNames: ['factory_id'],
        referencedTableName: 'factories',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('car_models', true, true)
  }
}
