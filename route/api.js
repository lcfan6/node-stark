const Router = require('koa-router');
const authController = require('../controller/auth');
const apiController = require('../controller/api');
const enforceType = require('../middleware/enforceType');

const router = new Router();
router.prefix('/api');
router.use(authController.check);
router.get('/test', async (ctx) => {
  ctx.body = ctx.state.userInfo;
});
router.post('/uploadimage', enforceType('multipart/form-data'), apiController.uploadImage);

module.exports = router;
