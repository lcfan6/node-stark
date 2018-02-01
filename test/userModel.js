const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/starkdb');
const UserModel = require('../model/UserModel');

(async () => {
  console.log('ok');
  const a = await UserModel.register('asdf', 'asdf');
  console.log(a);
}());

(async () => {
  const a = await UserModel.check('fedcd3d2-43b9-48a7-8d8a-2cfac9df7ffc');
  console.log(a);
}());
