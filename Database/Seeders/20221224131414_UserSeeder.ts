import { Knex } from "knex";
import * as bcrypt from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash("password", salt)

    // Inserts seed entries
    await knex("users").insert([
        { name : "admin" ,email: "admin@gmail.com", password: hash, },
        { name : "user" ,email: "user@gmail.com", password: hash},
       {name : "doctor" , email: "doctor@gmail.com", password: hash ,},
    ]);
};
