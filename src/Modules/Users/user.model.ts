
import { Model, QueryContext } from "objection";
import * as jsonwebtoken                  from "jsonwebtoken";
import { TimestampedModel } from "../Shared/TimestampedModel";
import * as bcrypt from 'bcryptjs'
import { knex } from "../../../knexfile";
import Role from "../../Modules/Role/role.model";
import { DOMAIN, JWT_EXPIRY, JWT_SECRET } from '../../config'

export class User extends TimestampedModel{
    static tableName = 'users'
//Tabel columns
id! : string
name! : string
phone!:string|null
email!:string
password!:string|null
roles!: Role[] | string[] | []

/*
 * ---------------------------------------------------------------------
 * Static methods
 * ---------------------------------------------------------------------
*/

// BEFORE
async $beforeInsert(qc: QueryContext) {

    if ('email' in this) {
        this.email    = this.email.toLowerCase()
      this.password = await this.$setPassword(this.password!)
    }
    return super.$beforeInsert(qc)
}
async $beforeUpdate(args: any, qc: QueryContext) {
    if ('email' in this) this.email = this.email.toLowerCase()

    if ('password' in this && this.password) {
        this.password = await this.$setPassword(this.password)
    }
    return super.$beforeUpdate(args, qc)
}
 // Password hashing
 async $getPassword(){
    const result = await knex('users')
    .where('id',this.id)
    .select('password')
    return result[0] ? result[0].password : null
 }

 
 async $setPassword(value: string) {
    const salt = await bcrypt.genSalt()
    if (value == null) return null
    return await bcrypt.hash(value, salt)
}


 async $validatePassword(candidatePassword : string) : Promise<boolean>{
    let userPassword= await this.$getPassword()

    if(userPassword){
        return await bcrypt.compare(candidatePassword,userPassword)
    }else{
        return false
    }
 }
 // Generating JWT token with only user id inside

 $genToken(): string {
    return jsonwebtoken.sign(
        { id: this.id,
        name:this.name
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    )
}
  /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */
  static relationMappings = () => ({
    roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
            from: 'users.id',
            through: {
                from: 'user_roles.user_id',
                to: 'user_roles.role_id'
            },
            to: 'roles.id'
        }
    },
    
})
}