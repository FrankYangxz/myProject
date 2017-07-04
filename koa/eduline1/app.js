var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;  //初始化mongoose
var session = require("koa-generic-session");  //session插件   @1：session

const MongooseStore = require("koa-session-mongoose");  //session插件   @2：mongoStore 存贮数据
const multer = require('koa-multer');//加载koa-multer模块

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var admin = require('./routes/admin');
var msg = require('./routes/msg');
var teacher = require('./routes/teacher');
var upload = require('./routes/upload');
app.keys = ["myserectkey"];   //@1:方法1   这是给cookie设置一个签名；
app.use(session({
    store:new MongooseStore()
}));

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
    root: __dirname + '/views',
    default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());



//session拦截器
var allowpage = ['/','/users/login','/users/zhuce','/users/logout'];
app.use(function *(next) {
    var url = this.originalUrl;
    if( allowpage.indexOf( url ) != (-1) ){
        yield next;
    }else{
        if ( this.session.loginbean ){
            yield next;
        } else{
            this.redirect("/");   //重定向
        }
    }
})
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});



app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(home.routes(), home.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());
app.use(msg.routes(), msg.allowedMethods());
app.use(teacher.routes(), teacher.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());


mongoose.connect("mongodb://localhost/eduline");  //链接数据库  入口文件链接一次，省的每个文件链接一次



module.exports = app;
