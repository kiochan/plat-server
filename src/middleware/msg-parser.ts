import * as Koa from 'koa';
import Msg from '../constants/msg'

export default function () {
    return async (ctx: Koa.Context, next) => {
        const dat = ctx.request.query['dat'];
        if (dat) {
            ctx.service.msg = JSON.parse(ctx.request.query['dat']);
        }
        await next();
    }
}