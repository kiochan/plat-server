import * as Koa from 'koa';
import Msg from '../constants/msg'

export default function () {
    return async (ctx: Koa.Context, next) => {
        const dat = ctx.request.body['dat'];
        if (dat) {
            ctx.service.msg = JSON.parse(dat);
        }
        await next();
    }
}