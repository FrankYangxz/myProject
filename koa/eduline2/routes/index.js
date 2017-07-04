const router = require('koa-router')()

router.get('/', async (ctx ,next) => {
  //这是一个共享空间
  ctx.state.loginbean = ctx.session.loginbean;
  await ctx.render('index', {
    title: 'koa2'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
