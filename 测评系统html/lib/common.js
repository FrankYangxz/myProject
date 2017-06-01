(function() {
  var COMMON;

  COMMON = (function() {
    COMMON.prototype._opt = {
      curBtn: '',
      oldDiv: '',
      newDiv: ''
    };

    function COMMON() {
      $(function() {
        $('.nav > ul > li').hover(function() {
          $(this).find('.nav_menu').show();
        }, function() {
          $(this).find('.nav_menu').hide();
        });
        $('.icon_user').hover(function() {
          $(this).find('.regest_div').show();
        }, function() {
          $(this).find('.regest_div').hide();
        });
      });
    }

    COMMON.prototype.left2right = function(opt, callBack) {
      var curBtn, newDiv, oldDiv, ref;
      this._opt = $.extend({}, this._opt, opt);
      ref = this._opt, curBtn = ref.curBtn, oldDiv = ref.oldDiv, newDiv = ref.newDiv;
      $(curBtn).bind({
        'click': function() {
          $(this).toggleClass("on");
          if ($(this).hasClass("on")) {
            $(oldDiv).animate({
              left: "100%"
            }, 10);
            $(newDiv).animate({
              left: 0
            }, 500);
          } else {
            $(oldDiv).animate({
              left: 0
            }, 500);
            $(newDiv).animate({
              left: "100%"
            }, 10);
          }
        }
      });
    };

    return COMMON;

  })();

  window.$$ = new COMMON;

}).call(this);
