const router = require('koa-router')()
var User = require("../modules/UserModel");

router.prefix('/users');

router.get('/login', async (ctx, next) => {
    await ctx.render("login",{})
})
//登录
router.post('/login',async (ctx,next)=>{
    let email = ctx.request.body['email'];
    let pwd = ctx.request.body['pwd'];
    let rs = await User.findOne({email:email,pwd:pwd});
    if ( rs != null ){
        const loginbean = {};
        loginbean.id = rs._id;
        loginbean.nicheng = rs.nicheng;
        loginbean.role = rs.role;
        loginbean.msgnum = rs.msgnum;
        ctx.session.loginbean = loginbean;
        ctx.redirect("../");
    }else{
        ctx.body = "email/密码错误！";
    }
})

//注册
router.post('/zhuce',async (ctx,next) =>{
    let user = new User();
    user.email = ctx.request.body['email'];
    user.pwd = ctx.request.body['pwd'];
    user.nicheng = ctx.request.body['nicheng'];
    user.role = 1;
    user.msgnum = 0;
    try {
        let rsNC = await User.findOne({nicheng:user.nicheng});
        let rsEM = await User.findOne({email:user.email});
        if ( rsNC != null ){
            ctx.body = "昵称重复！"
            return;
        }
        if ( rsEM != null ){
            ctx.body = "邮箱已注册！"
            return;
        }
        await user.save();
        ctx.status = 307;
        ctx.redirect('/users/login');
    }catch (err){
        console.log( err )
        if ( err.toString().indexOf("emailuid") > 1 ){
            ctx.body = "邮箱重复了！"
        }else if ( err.toString().indexOf("nichenguid") > 1){
            ctx.body = "昵称重复！"
        }
        return;
    }
    this.body = user._id;
})

//注销
router.get('/logout',async (ctx,next)=>{
    delete ctx.session.loginbean;
    ctx.redirect("../");
})
module.exports = router;
