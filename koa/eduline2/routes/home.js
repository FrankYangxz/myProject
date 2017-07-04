const router = require('koa-router')();
const fomidable = require('formidable');
var User = require("../modules/UserModel");
var Msg = require('../modules/MsgModel');
router.prefix('/home');

router.get('/', async (ctx, next) => {
    let loginbean = ctx.session.loginbean;
    ctx.state.loginbean = ctx.session.loginbean;
    console.log(1111)
    console.log(loginbean)
    if ( loginbean.role == 0 ){
        ctx.body = "<script>location.href='/';</script>";
        return;
    }
    //查出消息的结果集
    // 前面4行代码的意思是点击个人空间吧消息个数职位0；
    await User.update({_id:loginbean.id},{$set:{msgnum:0}});
    loginbean.msgnum = 0;
    ctx.session.loginbean = loginbean;
    ctx.state.loginbean = loginbean;
    let msgRs = await Msg.find({to:loginbean.id});
    await ctx.render("home",{msgRs:msgRs});
})

//申请为讲师
router.get('/apply',async(ctx,next)=> {
    await ctx.render("apply",{})
})

//上传函数
function upLoad( req , form ) {
    return new Promise(function (resolve,reject) {
        form.parse(req,function (err,fields,files) {
            if (err){
                console.log(err);
            }
            resolve({fields:fields,files:files});
        })
    })
}
//入库函数
function insertUser( loginbean , fields , files  ) {
    return new Promise(function (resolve,reject) {
        let teacher = {};
        teacher.role = 2 ;
        teacher.realname = fields.realname;
        teacher.idnumber = fields.idnumber;
        teacher.photoname = files.photo.name;
        teacher.photopath = (files.photo.path).replace('../public/','');
        teacher.preview = fields.preview;
        User.update( ({_id:loginbean.id}) , ({$set:teacher}) ,function (err,rs) {
            if ( err ){
                console.log( err );
                return;
            }
            resolve("申请成功！");
        } )
    })
}

//上传
router.post('/apply',async (ctx,next)=>{
    let loginbean = ctx.session.loginbean;
    if (  !loginbean ){
        this.body= "<script>alert(3333);location.href="/"</script>";
    }
    var form = new fomidable.IncomingForm();
    console.log( "1111" )
    form.encoding = "utf-8";
    form.uploadDir = "../public/images";
    form.keepExtensions = true;
    form.maxFieldsSize = 5 * 1024 * 1024;
    let rs = await upLoad ( ctx.req , form );
    console.log( "2222" )
    let rs1 = await insertUser( loginbean , rs.fields , rs.files );
    console.log( rs1 )
    ctx.body = rs1;
})



module.exports = router;
