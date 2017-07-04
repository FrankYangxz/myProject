var router = require('koa-router')();
var Msg = require("../modules/MsgModel");
var User = require("../modules/userModel");

router.prefix('/msg');  //路由控制器，控制路由的方向
// 回复按钮
router.post('/reply', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    if ( loginbean.role > 0 ){
        let msg = new Msg();
        msg.send = loginbean.id;
        msg.sendname = loginbean.nicheng;
        msg.to = this.request.body["rid"];
        msg.message = this.request.body["message"];
        msg.sendtime = new Date();
        let rs3 = yield msg.save();
        if ( rs3 ){
            let rs1 = yield User.update({_id:msg.to},{$set:{msgnum:1}});
            this.body = 1;
        }else{
            this.body = 0;
        }
    }
});

//删除消息
router.get('/delmsg', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    if ( loginbean.role > 0 ){
        let id = this.query['id'];
        let rs = yield Msg.remove({_id:id,to:loginbean.id});
        if ( rs.result.ok ){
            this.redirect('/home')
        }else{
            this.body = "<script>alert('删除失败');location.href='/home';</script>";
        }
    }
});


// 新消息 发送
router.post('/newmsg', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    if ( loginbean.role > 0 ){
        let nicheng = this.request.body["nicheng"];
        console.log( nicheng )
        let rs = yield User.findOne({nicheng:nicheng});
        if ( rs != null ){
            let told = rs._id;
            let msg = new Msg();
            msg.send = loginbean.id;
            msg.sendname = loginbean.nicheng;
            msg.to = told;
            msg.message = this.request.body["message"];
            msg.sendtime = new Date();
            let rs3 = yield msg.save();
            if ( rs3 ){
                let rs1 = yield User.update({_id:msg.to},{$set:{msgnum:1}})
                this.body = 1;
            }else{
                this.body = 0;
            }
        }else{
            this.body = -1;
        }

    }
});
module.exports = router;
