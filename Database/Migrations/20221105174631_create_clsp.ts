import {Knex} from "knex";

const table_name = 'clsp'//clinic or specializtion

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, (table) => {
        table
            .integer('spec_id')
            .references('specialization.id')

        table
            .integer('clinic_id')
            .references('clinic.id')

        table.primary(['spec_id', 'clinic_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

