import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1688493348302 implements MigrationInterface {
    name = 'InitialMigrations1688493348302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" character varying(8) NOT NULL, "state" character varying(64) NOT NULL, "city" character varying(64) NOT NULL, "number" character varying(12) NOT NULL, "complement" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying(240) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "annoucementId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "abbreviation" character varying(2) NOT NULL, "email" character varying(100) NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "birthday" date NOT NULL, "resetCode" character varying(8), "descripition" character varying(200) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "seller" boolean NOT NULL, "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "addressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcements" ("id" SERIAL NOT NULL, "model" character varying(60) NOT NULL, "type" character varying(150) NOT NULL, "description" character varying, "km" integer NOT NULL, "year" integer NOT NULL, "default_img" character varying(220) NOT NULL, "images" text NOT NULL, "price" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT 'true', "userId" integer, CONSTRAINT "PK_b3ad760876ff2e19d58e05dc8b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_fbf58a45f9ae57019b572de39bc" FOREIGN KEY ("annoucementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_fbf58a45f9ae57019b572de39bc"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
