const Router = require('koa-router');
const authController = require('../controller/auth');
const enforceType = require('../middleware/enforceType');

const router = new Router();
router.prefix('/auth');
router.get('/test', async (ctx) => {
  ctx.body = 'It works.';
});
router.post('/login', enforceType('application/x-www-form-urlencoded'), authController.login);
router.post('/register', enforceType('application/x-www-form-urlencoded'), authController.register);
router.get('/logout', authController.logout);

module.exports = router;
