class COMMON
    
    _opt:
        curBtn: ''
        oldDiv: ''
        newDiv: ''

    constructor: ()->
        $(()->
            $('.nav > ul > li').hover(()->
                $(this).find('.nav_menu').show()
                return
            , ()->
                $(this).find('.nav_menu').hide()
                return
            )
            $('.icon_user').hover(()->
                $(this).find('.regest_div').show()
                return
            , ()->
                $(this).find('.regest_div').hide()
                return
            )
            return
        )

    left2right:(opt, callBack)->
        @_opt = $.extend {}, @_opt, opt
        {curBtn, oldDiv, newDiv} = @_opt

        $(curBtn).bind('click':->
            $(@).toggleClass "on"
            if $(@).hasClass "on"
                $(oldDiv).animate({
                    left: "100%",
                }, 10);
                $(newDiv).animate({
                    left: 0
                }, 500);
            else
                $(oldDiv).animate({
                    left: 0
                }, 500);
                $(newDiv).animate({
                    left: "100%"
                }, 10);
            return
        )
        return
    
window.$$ = new COMMON