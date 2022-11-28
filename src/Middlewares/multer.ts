import path                from "path"
import multer              from "multer"
import { ValidationError } from "objection"
import { UPLOADS_PATH }    from '../config'

export class Multer {

    /**
     * ---------------------------------------------------------------------
     * no file POST middleware
     * ---------------------------------------------------------------------
     */
    static none = multer().none()

   
}
