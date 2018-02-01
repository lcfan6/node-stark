const Router = require('koa-router');
const authController = require('../controller/auth');

const router = new Router();
router.prefix('/auth');
router.get('/test', async (ctx) => {
  ctx.body = 'It works.';
});
router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;
