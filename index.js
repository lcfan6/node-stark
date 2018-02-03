const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const mongoose = require('mongoose');

const authRoute = require('./route/auth');
const apiRoute = require('./route/api');

/*
 *  链接mongodb数据库
 */

mongoose.connect('mongodb://localhost/starkdb');
const db = mongoose.connection;
db.on('error', (err) => {
  process.exit(err);
});
db.once('open', () => {
  // eslint-disable-next-line
  console.log(`mongodb connected.`);
});
const app = new Koa();

app.use(cors({
  maxAge: 86400,
}));
app.use(koaBody({
  multipart: true,
}));

app.use(authRoute.routes());
app.use(apiRoute.routes());

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line
  console.log(`server running at port: ${process.env.PORT || 3000}`);
});
