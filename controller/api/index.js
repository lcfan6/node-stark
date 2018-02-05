const path = require('path');
const fse = require('fs-extra');
const mkdirp = require('mkdirp-promise');
const sharp = require('sharp');

const userModel = require('../../model/UserModel');

function generateTimestamp() {
  return parseInt(Date.now() / 1000, 10);
}

exports.uploadImage = async (ctx) => {
  try {
    const { userInfo } = ctx.state;
    const { file } = ctx.request.body.files;
    const extname = path.extname(file.name);
    if (!/(\.jpe?g)|(\.png)$/.test(extname)) {
      ctx.body = {
        error: 1,
        msg: 'Invalid extname',
        data: null,
      };
      return;
    }
    const dirpath = path.resolve(
      __dirname,
      `../../temp/photos/${userInfo.userid}/${generateTimestamp()}`,
    );
    const imgPath = path.resolve(
      __dirname,
      `../../volume/photos/${userInfo.userid}/${generateTimestamp()}`,
    );
    await mkdirp(dirpath);
    await mkdirp(imgPath);
    await fse.rename(file.path, path.resolve(dirpath, file.name));
    await sharp(path.resolve(dirpath, file.name))
      .resize(2048, 2048)
      .max()
      .jpeg()
      .toFile(path.resolve(imgPath, file.name));
    const resModel = await userModel.addPhoto(userInfo.userid, path.resolve(imgPath, file.name));
    ctx.body = resModel;
  } catch (err) {
    ctx.throw(500);
  }
};

exports.getRate = async (ctx) => {
  try {
    const { img_token } = ctx.query;
  } catch (err) {}
};
