import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {



    // USER / ROLES
    return knex.schema.createTable('doctor_roles', (table) => {
        table.uuid('doctor_id')
             .references('doctors.id')
             .onDelete('CASCADE')
        table.integer('role_id').unsigned().references('roles.id')
        table.primary(['doctor_id', 'role_id'])
    })
    

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('doctor_roles')
    return knex.schema.dropTableIfExists('roles')
}

