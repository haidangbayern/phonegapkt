$(document).ready(function () {

        window.menu_aside_touchDown = false;
            
            $(document).bind( "touchstart", function ( event ) {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

                window.menu_aside_touchDown = true;
                window.menu_aside_originalPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                window.menu_aside_newPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
            } );

            $(document).bind( "touchend", function () {
                var p_x =  Math.abs(window.menu_aside_newPosition.x - window.menu_aside_originalPosition.x);
                if (window.menu_aside_newPosition.x < window.menu_aside_originalPosition.x && p_x >= $(window).width()/5)
                {
                     $("#aside_menu").click();        
                }
                // var p_x = ( window.menu_aside_newPosition.x < window.menu_aside_originalPosition.x )
                // if (p_x)
                // {
                //     $("#aside_menu").click();    
                // }
                // else
                // {
                //     if (( window.menu_aside_newPosition.x - window.menu_aside_originalPosition.x ) > $(window).width()/5)
                //     {
                //         $("#aside_menu").click();    
                //     }

                // }

                window.menu_aside_touchDown = false;
                window.menu_aside_originalPosition = null;
                window.menu_aside_newPosition = null;


            } );

            $(document).bind('touchmove mousemove',function(e){
                if (!window.menu_aside_touchDown)
                    return;
                
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                window.menu_aside_newPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
            });

    //stick in the fixed 100% height behind the navbar but don't wrap it
    /*$('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));*/

    // Enter your ids or classes
    var toggler = '#aside_menu';
    var id_aside = "#slide-nav";
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '200px';
    var menuneg = '-100%';
    var slideneg = '-80%';


    $(toggler).on("click", function (e) {
        var selected = $(id_aside).hasClass('slide-active');

        if (!selected)   //slide-active
        {
            // $(document).bind('touchmove',function(e){
            //     e.preventDefault();

                // if (!window.menu_aside_touchDown)
                //     return;
                
                // var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                // window.menu_aside_newPosition = {
                //     x: touch.pageX,
                //     y: touch.pageY
                // };
            //});

            // window.menu_aside_touchDown = false;
            
            // $(document).bind( "touchstart", function ( event ) {
            //     var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

            //     window.menu_aside_touchDown = true;
            //     window.menu_aside_originalPosition = {
            //         x: touch.pageX,
            //         y: touch.pageY
            //     };
            //     window.menu_aside_newPosition = {
            //         x: touch.pageX,
            //         y: touch.pageY
            //     };
            // } );

            // $(document).bind( "touchend", function () {
            //     var p_x = ( window.menu_aside_newPosition.x < window.menu_aside_originalPosition.x )
            //     if (p_x)
            //     {
            //         $("#aside_menu").click();    
            //     }
            //     else
            //     {
            //         if (( window.menu_aside_newPosition.x - window.menu_aside_originalPosition.x ) > $(window).width()/5)
            //         {
            //             $("#aside_menu").click();    
            //         }

            //     }

            //     window.menu_aside_touchDown = false;
            //     window.menu_aside_originalPosition = null;
            //     window.menu_aside_newPosition = null;


            // } );

            // $(document).bind('touchmove mousemove',function(e){
            //     if (!window.menu_aside_touchDown)
            //         return;
                
            //     var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

            //     window.menu_aside_newPosition = {
            //         x: touch.pageX,
            //         y: touch.pageY
            //     };
            // });


            
        }
        else
        {
            //$(document).unbind("touchmove");
            // $(document).bind('touchmove',function(e){
                

            //     if (!window.menu_aside_touchDown)
            //         return;
                
            //     var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

            //     window.menu_aside_newPosition = {
            //         x: touch.pageX,
            //         y: touch.pageY
            //     };
            // });
        }

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        },100);

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        },100);

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        },100);

        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        },100);

        $('.time_server_mobile').stop().animate({
            left: selected ? '0px' : slidewidth
        },100);

        $('#page-content,#slidemenu, .navbar, body, .navbar-header').toggleClass('slide-active');


    });


    var selected = '#slidemenu, #slide-nav, #page-content, body, .navbar, .navbar-header';


    $(window).on("resize", function () {

        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }


    });




});