import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export default class CreateReservationTable1591142025290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'car_id',
            type: 'integer'
          },
          {
            name: 'user_email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: false
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: false
          },
          {
            name: 'checkin_date',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'checkout_date',
            type: 'timestamp',
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
      'reservations',
      new TableForeignKey({
        name: 'FK_RESERVATIONS_CARS',
        columnNames: ['car_id'],
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('reservations', true, true)
  }
}
