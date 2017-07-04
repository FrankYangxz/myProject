var router = require('koa-router')();

router.get('/', function *(next) {

    //共享空间
    console.log( this.session.loginbean );
    this.state.loginbean = this.session.loginbean;

  yield this.render('index', {
    title: 'Hello World Koa11!'
  });
});

module.exports = router;
