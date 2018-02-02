const userModel = require('../../model/UserModel');

exports.login = async (ctx) => {
  try {
    const { userid, password } = ctx.request.body;
    if (!userid || !password) {
      ctx.status = 400;
      return;
    }
    const resModel = await userModel.login(userid, password);
    ctx.body = resModel;
  } catch (err) {
    ctx.throw(500);
  }
};

exports.register = async (ctx) => {
  try {
    const { userid, password, username } = ctx.request.body;
    if (!userid || !password) {
      ctx.status = 400;
      return;
    }
    const resModel = await userModel.register(userid, password, username);
    ctx.body = resModel;
  } catch (err) {
    ctx.throw(500);
  }
};

exports.logout = async (ctx) => {
  try {
    const { token } = ctx.query;
    if (!token) {
      ctx.status = 400;
      return;
    }
    const resModel = await userModel.logout(token);
    ctx.body = resModel;
  } catch (err) {
    ctx.throw(500);
  }
};

exports.check = async (ctx, next) => {
  try {
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
    await next();
  } catch (err) {
    ctx.throw(500);
  }
};
