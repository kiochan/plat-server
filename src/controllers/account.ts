import * as Koa from 'koa';
import MsgCode from '../constants/msg-code'
import Msg from '../constants/msg'
import Config from '../config'
import Encrypt from '../utils/encrypt'
import Validate from '../utils/validate'

export default class Account {

    public static async onLogin(ctx: Koa.Context, next) {
        console.log(ctx.service.msg);
        const { db, msg } = ctx.service;
        ctx.body = { cv: 'asa', key: ctx.service.msg };
    }

    public static async onCreate(ctx: Koa.Context, next) {
        const { db, msg } = ctx.service;

        const check = Account.checkLoginBase(msg);
        if (check !== MsgCode.OK) {
            ctx.body = Msg.create(check);
            return next;
        }

        const salt = Encrypt.generateSalt(Config.encrypt.salt_length);
        const entity = new ctx.service.db.user({
            email: msg.email,
            username: msg.username,
            nickname: msg.username,
            password: Encrypt.encryptPassword(msg.password, salt),
            salt: salt,
            avatar: Config.user.default_avatar
        });

        const save_result = await entity.save();
        if (!save_result) {
            ctx.body = Msg.create(MsgCode.DB_FAILED);
            return next;
        }

        console.log(`User [${entity.username} (${entity.email})] created, id: ${entity.id}.`);

        const result = Msg.create();
        ctx.body = entity;
    }

    private static checkLoginBase(msg: Msg): string {

        if (!msg) {
            return MsgCode.HTTP_INVALID_PARAM;
        }

        if (!(msg.email || msg.username)) {
            if (!msg.email) {
                return MsgCode.EMAIL_REQUIRED;
            } else {
                return MsgCode.USERNAME_REQUIRED;
            }
        }

        if (!msg.password) {
            return MsgCode.PASSWORD_REQUIRED;
        }

        if (!Validate.email(msg.email)) {
            return MsgCode.EMAIL_INVALID;
        }

        if (!Validate.username(msg.username)) {
            return MsgCode.USERNAME_INVALID;
        }

        if (!Validate.password(msg.password)) {
            return MsgCode.PASSWORD_INVALID;
        }

        return MsgCode.OK;
    }

}