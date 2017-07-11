import * as Router from 'koa-router'
import url from './constants/url'
import account from './controllers/account';

const router = new Router();

router.post(url.ACCOUNT_CREATE, account.onCreate);
router.post(url.ACCOUNT_LOGIN, account.onLogin);

export default router