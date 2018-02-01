const Router = require('koa-router');
const authController = require('../controller/auth');

const router = new Router();
router.prefix('/api');
router.use(authController.check);
router.get('/test', async (ctx) => {
  ctx.body = 'It works.';
});

module.exports = router;
