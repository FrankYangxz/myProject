const router = require('koa-router')();
var User = require("../modules/UserModel");
var Msg = require('../modules/MsgModel');

router.prefix('/msg');

router.get('/', async (ctx, next)=> {
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = ctx.session.loginbean;

});
// 回复按钮
router.post('/reply',async (ctx,next)=>{
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = ctx.session.loginbean;
    if ( loginbean.role > 0 ){
        let msg = new Msg();
        msg.send = loginbean.id;
        msg.sendname = loginbean.nicheng;
        msg.to = ctx.request.body["rid"];
        msg.message = ctx.request.body["message"];
        msg.sendtime = new Date();
        let rs3 = await msg.save();
        if ( rs3 ){
            let rs1 = await User.update({_id:msg.to},{$set:{msgnum:1}});
            ctx.body = 1;
        }else{
            ctx.body = 0;
        }
    }
})

//删除消息
router.get('/delmsg',async (ctx,next)=>{
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = ctx.session.loginbean;
    console.log( 333 )
    if ( loginbean.role > 0 ){
        let id = ctx.query['id'];
        console.log( id )
        let rs = await Msg.remove({_id:id,to:loginbean.id});
        console.log( rs )
        if ( rs.result.ok ) {
            ctx.redirect('/home');
        } else {
            ctx.body = "<script>alert('删除失败');location.href='/home';</script>";
        }
    }
})


//新消息发送
router.post('/newmsg',async (ctx,next)=>{
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = ctx.session.loginbean;
    if ( loginbean.role > 0 ){
        let nicheng = ctx.request.body["nicheng"];
        let rs = await User.findOne({nicheng:nicheng});
        if( rs != null ) {
            let told = rs._id;
            let msg = new Msg();
            msg.send = loginbean.id;
            msg.sendname = loginbean.nicheng;
            msg.to = told;
            msg.message = ctx.request.body["message"];
            msg.sendtime = new Date();
            let rs3 = await msg.save();
            if ( rs3 ){
                let rs1 = await User.update({_id:msg.to},{$set:{msgnum:1}});
                ctx.body = 1;
            }else{
                ctx.body = 0;
            }
        }else{
            ctx.body = -1;
        }
    }
});

module.exports = router;

