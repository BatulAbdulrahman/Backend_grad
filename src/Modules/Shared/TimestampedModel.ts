import { Model, QueryContext } from 'objection'

export class TimestampedModel extends Model {

    created_at!: Date | string
    updated_at!: Date | string

    /*
     * ---------------------------------------------------------------------
     * Static methods
     * ---------------------------------------------------------------------
     */
    async $beforeInsert(qc: QueryContext) {
        this.created_at = new Date()
        this.updated_at = new Date()

        return super.$beforeInsert(qc)
    }

    async $beforeUpdate(args: any, qc: QueryContext) {
        this.updated_at = new Date()

        return super.$beforeUpdate(args, qc)
    }

}
