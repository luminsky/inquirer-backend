const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./router');
const bodyParser = require('koa-bodyparser');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server has been started and listening on port ${PORT}`);
});
