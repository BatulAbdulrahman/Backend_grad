import { Knex } from "knex";
import * as bcrypt from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash("password", salt)

    // Inserts seed entries
    await knex("users").insert([
        { email: "admin@gmail.com", password: hash, role:'admin' },
        { email: "user@gmail.com", password: hash},
        { email: "doctor@gmail.com", password: hash ,role:'doctor'},
    ]);
};
