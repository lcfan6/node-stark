const userModel = require('../../model/UserModel');

exports.login = async (ctx) => {
  const { userid, password } = ctx.request.body;
  const resModel = await userModel.login(userid, password);
  ctx.body = resModel;
};

exports.register = async (ctx) => {
  const { userid, password, username } = ctx.request.body;
  const resModel = await userModel.register(userid, password, username);
  ctx.body = resModel;
};

exports.check = async (ctx, next) => {
  const { token } = ctx.query;
  const resModel = await userModel.check(token);
  if (resModel.error !== 0) {
    ctx.body = {
      data: null,
      msg: 'invalid token',
      error: 1,
    };
    return;
  }
  next();
};
