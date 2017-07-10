import Router = require('koa-router')
import url from './constants/url'
import account from './controllers/account';

const router = new Router();

router.get(url.ACCOUNT_CREATE, account.onCreate);
router.get(url.ACCOUNT_LOGIN, account.onLogin);

export default router