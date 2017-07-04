var router = require('koa-router')();
var multiparty = require('multiparty');
var fs = require('fs');
router.prefix('/upload');

router.post('/upimg', function *(next) {
    var form = new multiparty.Form();
    form.encoding = "utf-8";
    form.uploadDir = "../public/uploadtemp/";   //设置临时文件路径
    form.maxFieldsSize = 2 * 1024 * 1024;
    let thisa = this;
    let rs = yield new Promise(function (resolve,reject) {
        form.parse(thisa.req,function (err,fields,files) {
            if ( err ){
                console.log(err);
                return;
            }
            let uploadurl = 'images/upload/';   // 目标路径
            file1 = files['filedata'];
            paraname = file1[0].fieldName;      //参数名fieldata
            originalFilename = file1[0].originalFilename;
            tmpPath = file1[0].path;
            fileSize = file1[0].size;
            var timestamp = new Date().getTime();
            uploadurl += timestamp+originalFilename;
            newPath = "../public/"+uploadurl;  //目标路径

            var fileReadStream = fs.createReadStream(tmpPath);
            var fileWriteStream = fs.createWriteStream(newPath);
            fileReadStream.pipe( fileWriteStream );   //  管道流
            fileWriteStream.on('close',function () {
                fs.unlinkSync(tmpPath);
                console.log( 'copy over' )
                resolve(uploadurl);
            })
        })
    })
    this.body = '{"err":"","msg":"/'+rs+'"}';
});

module.exports = router;
