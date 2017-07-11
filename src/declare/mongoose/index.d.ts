import * as Mongoose from "koa";

declare module "mongoose" {
  interface ConnectionOptions extends
    ConnectionOpenOptions,
    ConnectionOpenSetOptions {
        useMongoClient: boolean
    }
}