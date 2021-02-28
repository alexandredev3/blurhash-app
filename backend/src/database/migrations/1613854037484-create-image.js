"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images1613854037484 = void 0;
const typeorm_1 = require("typeorm");
class images1613854037484 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'hash',
                    type: 'varchar',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('images');
    }
}
exports.images1613854037484 = images1613854037484;
