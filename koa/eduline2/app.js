const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var User = require("./modules/UserModel");
var mongoose = require("mongoose");
var session = require("koa-generic-session");
const MongooseStore = require("koa-session-mongoose");  //session插件   @2：mongoStore 存贮数据

const index = require('./routes/index');
const users = require('./routes/users');
const home = require('./routes/home');
const admin = require('./routes/admin');
const msg = require('./routes/msg');

app.keys = ["myserectkey"];   //@1:方法1   这是给cookie设置一个签名；
app.use(session({
    store:new MongooseStore()
}));


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//      extension:'ejs'
// }))

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(home.routes(), home.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(msg.routes(), msg.allowedMethods())

mongoose.connect("mongodb://localhost/eduline2");


module.exports = app
