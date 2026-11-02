import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsTable1729955000000 implements MigrationInterface {
  name = 'CreatePostsTable1729955000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "posts" (
        "id" SERIAL PRIMARY KEY,
        "title" varchar(255) NOT NULL,
        "category" varchar(100) NOT NULL,
        "description" text NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "deleted_at" TIMESTAMP WITH TIME ZONE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "posts";`);
  }
}
