const router = require('koa-router')()
var User = require("../modules/UserModel");
var Msg = require('../modules/MsgModel');
router.prefix('/admin');

router.get('/', async (ctx, next) => {
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = ctx.session.loginbean;
    if ( loginbean.role != 0 ){
        ctx.redirect('/');
    }
    await ctx.render("admin",{});
})

router.get("/teacherapplylist",async (ctx,next) => {
    let rs = await User.find({role:2});
    await ctx.render('teacherapplylist',{rs:rs});
})

//同意成为讲师
router.get('/pass',async (ctx,next) => {
    let loginbean = ctx.session.loginbean;
    if ( loginbean.role == 0 ){
        let id = ctx.request.query['id'];
        let rs = await User.update({_id:id},{$set:{role:3},$inc:{msgnum:1}});
        if ( rs.ok ){
            let msg = new Msg();
            msg.send = loginbean.id;
            msg.sendname = loginbean.nicheng;
            msg.to = id;
            msg.message = "您的将是申请已通过";
            msg.sendtime = new Date();
            let rs2 = await msg.save();
            if ( rs2._id ){
                ctx.body = 1;
            }else{
                ctx.body = 2;
            }
        }else{
            ctx.body = 0;
        }
    }
})

//拒绝成为讲师
router.get('/refause',async (ctx,next) => {
    let loginbean = ctx.session.loginbean;
    if ( loginbean.role == 0 ){
        let id = ctx.request.query['uid'];
        let rs = await User.update({_id:id},{$set:{role:1},$inc:{msgnum:1}});
        if ( rs.ok ){
            let msg = new Msg();
            msg.send = loginbean.id;
            msg.sendname = loginbean.nicheng;
            msg.to = id;
            msg.message = ctx.request.query['message'];
            msg.sendtime = new Date();
            let rs2 = await msg.save();
            if ( rs2._id ){
                ctx.body = 1;
            }else{
                ctx.body = 2;
            }
        }else{
            ctx.body = 0;
        }
    }
})







module.exports = router;
