import {Request, Response, NextFunction} from 'express'

import {
    ValidationError,
    NotFoundError,
    DBError,
    DataError,
    CheckViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ConstraintViolationError,
    ForeignKeyViolationError
} from 'objection'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        switch (err.type) {
            case 'UnauthorizedAccess':
                res.status(403).send({
                    message: err.message,
                    type: err.type,
                    data: err.data
                });
                break;
            case 'ModelValidation':
                res.status(422).send({
                    message: err.message,
                    type: err.type,
                    data: err.data
                });
                break;
            case 'RelationExpression':
                res.status(400).send({
                    message: err.message,
                    type: 'RelationExpression',
                    data: {}
                });
                break;
            case 'UnallowedRelation':
                res.status(400).send({
                    message: err.message,
                    type: err.type,
                    data: {}
                });
                break;
            case 'InvalidGraph':
                res.status(400).send({
                    message: err.message,
                    type: err.type,
                    data: {}
                });
                break;
            default:
                res.status(400).send({
                    message: err.message,
                    type: 'UnknownValidationError',
                    data: {}
                });
                break;
        }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: err.message,
            type: 'NotFound',
            data: {}
        });
    } else if (err instanceof ConstraintViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'ConstraintViolation',
            data: {}
        });
    } else if (err instanceof UniqueViolationError) {
        res.status(409).send({
            message: err.message,
            type: 'UniqueViolation',
            data: {
                columns: err.columns,
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'NotNullViolation',
            data: {
                column: err.column,
                table: err.table
            }
        });
    } else if (err instanceof ForeignKeyViolationError) {
        res.status(409).send({
            message: err.message,
            type: 'ForeignKeyViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof CheckViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'CheckViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof DataError) {
        res.status(400).send({
            message: err.message,
            type: 'InvalidData',
            data: {}
        });
    } else if (err instanceof DBError) {
        res.status(500).send({
            message: err.message,
            type: 'UnknownDatabaseError',
            data: {}
        });
    } else {
        res.status(500).send({
            message: err.message,
            type: 'UnknownError',
            data: {}
        });
    }
}
