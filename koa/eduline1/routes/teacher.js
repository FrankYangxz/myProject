var router = require('koa-router')();
var formidable = require('formidable');
var Course = require("../modules/courseModel");
var Chapter = require("../modules/chapterModel");
router.prefix('/teacher');
router.get('/course', function *(next) {
    //共享空间
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    if ( loginbean ){
        let courseRs = yield Course.find({uid:loginbean.id});
        yield this.render('course',{courseRs:courseRs});
    }
});

//点击进入创建新课程页面
router.get('/newCourse', function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    yield this.render('newCourse',{});
});

//点击提交新课程相关信息
router.post('/newCourse', function *(next) {
    let loginbean = this.session.loginbean;
    this.state.loginbean = this.session.loginbean;
    let form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = "../public/images/courseLogo";
    form.keepExtensions = true ;
    form.maxFieldsSize = 5 * 1024 * 1024;
    let thisa = this;
    let rs = yield (new Promise(function (resolve,reject) {
        form.parse(thisa.req,function (err,fields,files) {
            if ( err ){
                reject("err");
            }
            let course = new Course();
            course.title = fields.title;
            course.type = fields.type;
            course.logo = (files.clogo.path).replace("../public/",'');
            course.brief = fields.brief;
            course.uid = loginbean.id;
            course.uname = loginbean.nicheng;
            course.status = 0 ;
            course.pubtime = new Date();
            course.save(function (err,rs) {
                if( err ){
                    reject("err");
                    return;
                }
                resolve("<script>alert('保存成功');location.href='/teacher/course';</script>");
            })
        })
    }))
    this.body = rs;
});

//创建章节   及改章节下的子章节
router.get('/chapter', function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    let loginbean = this.session.loginbean;
    let cid = this.query['cid'];
    let coursName = this.query['courseName'];

    //、、、查出章节列表
    let page = 1;
    let cpage = this.query['page'];
    if( cpage ){
       page = cpage;
       if(page<1)page = 1;
    }
    let pageNum = 2; //每页条数
    let cpCount =  yield Chapter.count({courseid:cid,uid:loginbean.id});  //获取总的子章节数量
    let sumPage = Math.ceil( cpCount / pageNum )  ;  // 总的页数
    if ( page>0 && page>sumPage ){
        page = sumPage;
    }
    let startPoint = ( parseInt(page) - 1 )*pageNum;                                   //指针调到开始的位置     限制信息的个数
    let chapterRs = yield Chapter.find({courseid:cid,uid:loginbean.id}).skip(startPoint).limit(pageNum);
    let url = '/teacher/chapter?cid='+cid+'&courseName='+coursName;
    yield this.render('chapter',{
        id:cid,
        coursName:coursName,
        chapterRs:chapterRs,
        page:parseInt(page),
        sumpage:parseInt(sumPage),
        cpCount:cpCount,
        url:url
    });  //获取总的子章节个数
});

//创建章节入库
router.post('/pubChapter',function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    let loginbean = this.session.loginbean;
    let chapter = new Chapter();
    chapter.title = this.request.body['title'];
    chapter.content = this.request.body['content'];
    chapter.courseid = this.request.body['courseid'];
    chapter.uid = loginbean.id;
    yield chapter.save();
    let myurl = this.request.body['myurl'];
    this.redirect(myurl);
})

//删除章节
router.get('/delChapetr',function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    let loginbean = this.session.loginbean;
    let id = this.query['id'];
    let cid = this.query['cid'];
    let coursName = this.query['coursName'];
    yield Chapter.remove({_id:id,uid:loginbean.id});
    this.redirect( "./chapter/"+"?cid="+cid+"&coursName="+coursName );
})

//修改章节
router.get('/getChapter',function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    let loginbean = this.session.loginbean;
    let id = this.query['id'];
    let rs = yield Chapter.findOne({_id:id,uid:loginbean.id});
    this.body = rs;
})

//修改的新章节入库
router.post('/upChapter',function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    let loginbean = this.session.loginbean;
    let id = this.request.body['chapterid'];
    let chapter = {};
    chapter.title = this.request.body['title'];
    chapter.content = this.request.body['content'];
    chapter.uid = loginbean.id;
    let rs = yield Chapter.update({_id:id,uid:loginbean.id},{$set:chapter});   //数据更改
    let myurl = this.request.body['myurl'];
    this.redirect(myurl);
})

//提交审核
router.get('/reqReview',function *(next) {
    //共享空间
    this.state.loginbean = this.session.loginbean;
    let loginbean = this.session.loginbean;
    let id = this.request.query['id'];
    let rs = yield Course.update({_id:id,uid:loginbean.id},{$set:{status:1}});
    this.redirect('./course');
})


module.exports = router;
