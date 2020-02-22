import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDB1582243038535 implements MigrationInterface {
  name = 'InitialDB1582243038535';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "branches" ("id" SERIAL NOT NULL, "city" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "manufacturers" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_379a6015606c983f18c0b03e9e2" UNIQUE ("name"), CONSTRAINT "PK_138520de32c379a48e703441975" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "models" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "image" character varying(255) NOT NULL, "manufacturer_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3492c71396207453cf17c0928fb" UNIQUE ("name"), CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "cars" ("id" SERIAL NOT NULL, "license_plate" character varying(7) NOT NULL, "color" character varying(20) NOT NULL, "model_id" integer NOT NULL, "branch_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97deb66a03be534e7c02d9add0a" UNIQUE ("license_plate"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "checkin_at" TIMESTAMP, "checkout_at" TIMESTAMP, "car_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "models" ADD CONSTRAINT "FK_0f38d27d487c72e023d7308a69f" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_e2c56ee6f05695da6b1abcb01c1" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_89d4ee41d15722dedd01c279557" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_a37a9ce499a633119bb1c71010b" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_a37a9ce499a633119bb1c71010b"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_89d4ee41d15722dedd01c279557"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_e2c56ee6f05695da6b1abcb01c1"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "models" DROP CONSTRAINT "FK_0f38d27d487c72e023d7308a69f"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "bookings"`, undefined);
    await queryRunner.query(`DROP TABLE "cars"`, undefined);
    await queryRunner.query(`DROP TABLE "models"`, undefined);
    await queryRunner.query(`DROP TABLE "manufacturers"`, undefined);
    await queryRunner.query(`DROP TABLE "branches"`, undefined);
  }
}
