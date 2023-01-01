import { Knex } from "knex";

const table_name = 'clinic'
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name , (table) =>{
       table.increments('id' ,{primaryKey:true})
       table.string('name').notNullable()
       table.string('location').nullable()
       table.string('img').nullable()
       table.string('phone').unique().nullable()
       table.string('thumb').nullable()
       table.string('description').nullable()
        table.timestamp('created_at', {useTz: false}).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', {useTz: false}).defaultTo(knex.raw('now()')).notNullable()

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

