import * as Koa from 'koa'
import * as Redis from 'ioredis'

export default function (options?: Redis.RedisOptions) {
    const redis = new Redis(options);
    return async (ctx: Koa.Context, next: () => Promise<any>) => {
        ctx.service.redis = redis;
        await next();
    }
}