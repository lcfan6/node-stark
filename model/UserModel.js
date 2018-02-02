const mongoose = require('mongoose');
const _ = require('lodash');
const uuid = require('uuid/v4');

const UserSchema = mongoose.Schema({
  userid: String,
  username: String,
  password: String,
  register_date: Number, // 精确到秒
  token: String,
});

const usernameMap = ['诸葛亮', '小乔', '西施', '大师傅', '李白'];

function generateUsername() {
  const index = _.random(0, usernameMap.length - 1);
  return usernameMap[index];
}

function resUser(user) {
  return {
    userid: user.userid,
    username: user.username,
    token: user.token,
    register_date: user.register_date,
  };
}

UserSchema.statics.register = function register(userid, password, username) {
  return new Promise(async (resolve, reject) => {
    if (!userid || !password) {
      reject(new Error('userid, password is required.'));
    }
    const reg = /[^0-9A-z.@]/;
    if (reg.test(userid) || reg.test(password)) {
      reject(new Error('userid, password can only contain 0-9A-Z.@'));
    }
    // eslint-disable-next-line
    const queryResult = await UserModel.find({ userid });
    if (queryResult.length) {
      resolve({
        data: null,
        msg: 'userid existed',
        error: 1,
      });
    }

    // eslint-disable-next-line
    const userObject = new UserModel({
      userid,
      username: username || generateUsername(),
      password,
      token: uuid(),
      register_date: parseInt(Date.now() / 1000, 10),
    });
    await userObject.save();
    resolve({
      data: resUser(userObject),
      msg: 'success',
      error: 0,
    });
  });
};

UserSchema.statics.login = function login(userid, password) {
  return new Promise(async (resolve, reject) => {
    if (!userid || !password) {
      reject(new Error('userid, password is needed'));
    }
    // eslint-disable-next-line
    const queryResult = await UserModel.find({ userid });
    if (!queryResult.length) {
      resolve({
        data: null,
        msg: 'no user found',
        error: 1,
      });
    }
    const userObject = queryResult[0];
    if (userObject.password !== password) {
      resolve({
        data: null,
        msg: 'wrong password',
        error: 1,
      });
    }
    userObject.token = uuid();
    await userObject.save();
    resolve({
      data: resUser(userObject),
      msg: 'success',
      error: 0,
    });
  });
};

UserSchema.statics.check = function check(token) {
  return new Promise(async (resolve) => {
    if (!token) {
      resolve({
        data: null,
        msg: 'invalid token',
        error: 1,
      });
    }
    // eslint-disable-next-line
    const queryResult = await UserModel.find({ token });
    if (!queryResult.length) {
      resolve({
        data: null,
        msg: 'invalid token',
        error: 1,
      });
    }
    const userObject = queryResult[0];
    resolve({
      data: resUser(userObject),
      msg: 'success',
      error: 0,
    });
  });
};

UserSchema.statics.logout = function logout(token) {
  return new Promise(async (resolve) => {
    if (!token) {
      resolve({
        data: null,
        msg: 'invalid token',
        error: 1,
      });
    }
    // eslint-disable-next-line
    const queryResult = await UserModel.find({ token });
    if (!queryResult.length) {
      resolve({
        data: null,
        msg: 'invalid token',
        error: 1,
      });
    }
    const userObject = queryResult[0];
    userObject.token = '';
    await userObject.save();
    resolve({
      data: null,
      msg: 'success',
      error: 0,
    });
  });
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
