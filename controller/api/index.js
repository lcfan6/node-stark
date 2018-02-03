exports.uploadImage = async (ctx) => {
  try {
    const userInfo = ctx.state.userInfo;
    const { file } = ctx.request.body.files;
  } catch (err) {
    ctx.throw(400);
  }
};
