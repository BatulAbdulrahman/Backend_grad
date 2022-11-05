import {Knex} from "knex";

const table_name = 'doctors'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(table_name, (table) => {
        table.integer('spec_id').nullable()
        table.foreign("spec_id")
        .references("specialization.id").onDelete("SET NULL")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(table_name, (table) => {
        table.dropColumn('spec_id')
    })
}

