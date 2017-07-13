import * as Koa from 'koa';
import MsgCode from '../constants/msg-code'
import Msg from '../constants/msg'
import Config from '../config'
import Encrypt from '../utils/encrypt'
import Validate from '../utils/validate'
import Trace from '../utils/trace'

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
        const entity = new db.user({
            email: msg.email,
            username: msg.username,
            nickname: msg.username,
            password: Encrypt.encryptPassword(msg.password, salt),
            salt: salt,
            avatar: Config.user.default_avatar
        });

        if (msg.email) {
            const cdt_email = { email: entity.email };
            const res_email = await db.user.find(cdt_email);
            if (res_email && res_email.length > 0) {
                ctx.body = Msg.create(MsgCode.EMAIL_OCCUPIED);
                return next;
            }
        }

        if (msg.username) {
            const cdt_username = { username: entity.username };
            const res_username = await db.user.find(cdt_username);
            if (res_username && res_username.length > 0) {
                ctx.body = Msg.create(MsgCode.USERNAME_OCCUPIED);
                return next;
            }
        }

        const save_result = await entity.save();
        if (!save_result) {
            ctx.body = Msg.create(MsgCode.DB_FAILED);
            return next;
        }

        Trace.info(`User created [${entity.username}(${entity.email})], id: ${entity.id}.`);

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

        if (!msg.email) {
            if (!Validate.username(msg.username)) {
                return MsgCode.USERNAME_INVALID;
            }
        } else {
            if (!Validate.email(msg.email)) {
                return MsgCode.EMAIL_INVALID;
            }
        }

        if (!Validate.password(msg.password)) {
            return MsgCode.PASSWORD_INVALID;
        }

        return MsgCode.OK;
    }

}