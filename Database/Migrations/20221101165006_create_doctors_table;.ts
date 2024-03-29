import { Knex } from "knex";

const table_name = 'doctors'
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name , (table) =>{
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
       table.string('name').notNullable()
       table.string('phone').unique().notNullable()
        table.string('email').unique().notNullable()
        table.string('password').nullable()
       table.string('sex').nullable()
        table.text('description').nullable()//CV
        table.string('rating').notNullable().defaultTo(0.0)
        table.string('role').defaultTo('doctor')
        table.string('img').nullable()
        table.string('thumb').nullable()
        table.boolean('is_disabled').defaultTo(false).notNullable()
        table.timestamp('created_at', {useTz: false}).defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('updated_at', {useTz: false}).defaultTo(knex.raw('now()')).notNullable()

    })/*.raw(
        `ALTER Table "users"
        add constraint "phone_or_email" check (
            (
                (phone is not null)::integer +
                (
                (email is not null)::integer + 
                (password is not null)::integer
                )
            ) >= 1
            )
            `)*/
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(table_name)
}

