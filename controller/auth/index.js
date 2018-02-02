const userModel = require('../../model/UserModel');

exports.login = async (ctx) => {
  try {
    const { userid, password } = ctx.request.body;
    if (!userid || !password) {
      throw new Error('userid, password are required');
    }
    const resModel = await userModel.login(userid, password);
    ctx.body = resModel;
  } catch (err) {
    ctx.response.status = 400;
  }
};

exports.register = async (ctx) => {
  try {
    const { userid, password, username } = ctx.request.body;
    if (!userid || !password) {
      throw new Error('userid, password are required');
    }
    const resModel = await userModel.register(userid, password, username);
    ctx.body = resModel;
  } catch (err) {
    ctx.response.status = 400;
  }
};

exports.logout = async (ctx) => {
  try {
    const { token } = ctx.query;
    if (!token) {
      throw new Error('token is required');
    }
    const resModel = await userModel.logout(token);
    ctx.body = resModel;
  } catch (err) {
    ctx.response.status = 400;
  }
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
