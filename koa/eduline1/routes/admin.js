/**
 * Created by yangxz-nash on 17/6/14.
 */
var router = require("koa-router")();
var User = require("../modules/userModel");
var Msg = require("../modules/MsgModel");

router.prefix('/admin');  //路由控制器，控制路由的方向

router.get("/",function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    if ( loginbean.role != 0 ){
        // this.body = "<script>location.href="/";</script>";
        this.redirect("/");
        // return;
    }
    yield this.render("adminhome",{
        title: 'Koa11!'
    })

})

router.get("/teacherapplylist",function *(next) {
    let rs = yield User.find({role:2});
    yield this.render("teacherapplylist",{rs:rs});
})

//同意成为讲师
router.get("/pass",function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role == 0){
        let id = this.query["id"];
        let rs = yield User.update({_id:id},{$set:{role:3},$inc:{msgnum:1}});
        console.log( rs )
        if ( rs.ok ){
            let msg = new Msg();
            msg.send = loginbean.id;
            msg.sendname = loginbean.nicheng;
            msg.message = "您的讲师申请已审核通过！";
            msg.to = id;
            msg.sendtime = new Date();
            let mrs = yield msg.save();
            if ( mrs._id ){
                this.body = 1;  //插入消息成功
            }else{
                this.body = 2;  //插入消息失败
            }
        }else{
            this.body = 0 ;     //数据库操作失败
        }
    }
})

//拒绝成为讲师申请
router.get("/refause",function *(next) {
    let loginbean = this.session.loginbean;
    if (loginbean.role == 0){
        let id = this.query["uid"];                         //审核通过，消息加1
        let rs = yield User.update({_id:id},{$set:{role:1},$inc:{msgnum:1}});
        if ( rs.ok ){
            let msg = new Msg();
            msg.send = loginbean.id;
            msg.sendname = loginbean.nicheng;
            msg.message = this.query["message"];
            msg.to = id;
            msg.sendtime = new Date();
            let mrs = yield msg.save();
            console.log( mrs )
            if ( mrs._id ){
                this.body = 1;
            }else{
                this.body = 2;
            }
        }else{
            this.body = 0 ;
        }
    }
})

module.exports = router;
