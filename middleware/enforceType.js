function enforceType(type) {
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.get('Content-Type').indexOf(type) === -1) {
      ctx.throw(400);
      return;
    }
    await next();
  };
}

module.exports = enforceType;
