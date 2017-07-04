/**
 * Created by yangxz-nash on 17/6/14.
 */
var router = require("koa-router")();
var formidable = require("formidable");
var User = require("../modules/userModel");
var Msg = require("../modules/MsgModel");

router.prefix('/home');  //路由控制器，控制路由的方向
router.get("/",function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    //这是防止从一个浏览器复制链接到另一个浏览器产生的权限问题；
    if ( loginbean.role == 0 ){
        this.body = "<script>location.href="/";</script>";
        return;
    }
    //查出消息的结果集
        // 前面4行代码的意思是点击个人空间吧消息个数职位0；
    yield  User.update({_id:loginbean.id},{$set:{msgnum:0}});
    loginbean.msgnum = 0 ;
    this.session.loginbean = loginbean;
    this.state.loginbean = loginbean;
    console.log( loginbean );

    let msgrs= yield Msg.find({to:loginbean.id})
    yield this.render("home",{msgrs:msgrs});
});

router.get("/apply",function *(next) {
    // this.state.loginbean = this.session.loginbean;
    yield this.render("apply",{})
    // this.body = "个人呢空间！"
});

//上传
function upLoad(req,form) {
    return new Promise(function (resolve,reject) {
        form.parse(req,function (err,fields,files) {
            if ( err ){
                console.log( err );
            }
            console.log( fields )
            console.log( "上传的文件名：" + files.photo.name );
            console.log( "文件路径：" + files.photo.path );
            console.log( "aaaaa" );
            resolve({fields:fields,files:files});
        })
    })
}
//入库
function insertUser(loginbean,fields,files ) {
    return new Promise(function (resolve,reject) {
        let teacher = {};
        teacher.role = 2 ;
        teacher.realname = fields.realname;
        teacher.idnumber = fields.idnumber;
        teacher.photoname = files.photo.name;
        teacher.photopath = (files.photo.path).replace("../public/","");  //这是存储的时候吧前缀去掉，如果在页面上图片显示不出来，右键单击查看图片的路径，删前面路径查看，根据路径更改图片存贮与取得路径
        teacher.preview = fields.preview;
        console.log("id是："+ loginbean.id )
        User.update( ({_id:loginbean.id}) , ({$set:teacher}) ,function (err,rs) {    //这里曾经删了一个括号，坑了很久。唉//
            //更新数据   位置                     更新的数据         回掉函数

            console.log("id是："+ loginbean.id )
            if (err ){
                console.log( err );
                return;
            }
            resolve("申请成功");
        });
    });
}
router.post("/apply",function *(next) {
    let  loginbean = this.session.loginbean;
    if (  !loginbean ){
        this.body= "<script>alert(3333);location.href="/"</script>";
    }
    var form = new formidable.IncomingForm();  //创建上传表单
    form.encoding = "utf-8";                //设置编辑
    form.uploadDir = "../public/images/";     //设置上传目录，文件会自动保存在里面
    form.keepExtensions = true ;            //保留文件后缀
    form.maxFieldsSize = 5 * 1024 * 1024;   // 文件最大是5兆
    let rs = yield upLoad( this.req , form );   //上传
    let rs1 =  yield insertUser(loginbean,rs.fields,rs.files);  // 插入到数据库
    this.body = rs1 ;

});

module.exports = router;




