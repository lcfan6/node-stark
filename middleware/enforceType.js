function enforceType(type) {
  return async (ctx, next) => {
    try {
      if (ctx.method === 'POST' && ctx.get('Content-Type').indexOf(type) === -1) {
        ctx.status = 400;
        return;
      }
      await next();
    } catch (err) {
      ctx.throw(500);
    }
  };
}

module.exports = enforceType;
