import * as Koa from "koa";
import * as compose from 'koa-compose'
import { Database } from '../../middleware/db'
import Msg from '../../constants/msg'

declare module "koa" {
    interface Context {
        params: any; //koa-router
        service: {
            db: Database
            msg?: Msg
        };
    }

    interface Request extends BaseRequest {
        body: any; // koa-parser
    }
}