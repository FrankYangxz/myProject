var router = require('koa-router')();
// var session = require("koa-generic-session");
// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;  //初始化
// var db = mongoose.connect("mongodb://localhost/eduline");  //连接数据库     上面注释的四行全部放在了app.js

var User = require("../modules/userModel");
router.prefix('/users');
router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/login', function *(next) {
  // this.body = '我是 login';
    yield this.render("login",{})
});

//登录
router.post("/login",function *(next) {
    let email = this.request.body['email'];
    let pwd = this.request.body["pwd"];
    let rs = yield User.findOne({email:email,pwd:pwd});

    if ( rs != null ){
        const loginbean = {};
        loginbean.id = rs._id;
        loginbean.nicheng = rs.nicheng;
        loginbean.role = rs.role;
        loginbean.msgnum = rs.msgnum;
        this.session.loginbean = loginbean;
        console.log( this.session.loginbean );
        // this.body = "登录成功 ！";
        this.redirect("../"); // 不带参数跳转

    } else {
        this.body = "email/密码错误 ！"
    }

})

router.get("/zhuce",function *(next) {
    let email = this.query['email'];
    console.log( this.query );
    this.body = "收到email："+ email;
});


//注册
router.post("/zhuce",function *(next) {
    let user = new User();
    user.email = this.request.body['email'];
    user.pwd = this.request.body["pwd"];
    user.nicheng = this.request.body["nicheng"];
    user.role = 1;
    user.msgnum = 0;
    console.log( user )
    try{
        yield user.save();
        // 对于post请求，选用307传参；
        this.status = 307 ; //设置状态吗；
        this.redirect("/users/login");
    } catch (err) {
        if ( err.toString().indexOf("emailuid") > 1 ) {
            this.body = "emial重复！";
        } else if ( err.toString().indexOf("nichenguid") > 1 ){
            this.body = "昵称重复！";
        }
        return;
    }
    this.body = user._id;
});

//注销
router.get("/logout",function *(next) {
    //杀掉session，跳转到首页
    delete this.session.loginbean;
    this.redirect("/")
})

module.exports = router;
