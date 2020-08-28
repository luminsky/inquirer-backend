const Router = require('@koa/router');
const { queries } = require('./db');

const router = new Router();

router.get('/tests', async (ctx, next) => {
  ctx.body = await queries.selectTests();
});

router.post('/tests', async (ctx) => {
  ctx.body = await queries.insert(ctx.request.body);
});

router.delete('/tests/:id', async (ctx) => {
  ctx.body = await queries.delete(ctx.params.id);
});

module.exports = router;
