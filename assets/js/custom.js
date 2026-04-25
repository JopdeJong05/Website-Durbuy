$(document).ready(function(){
    "use strict";

    // 1. Scroll To Top
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('.return-to-top').fadeIn();
        } else {
            $('.return-to-top').fadeOut();
        }
    });
    $('.return-to-top').on('click', function(){
        $('html, body').animate({ scrollTop: 0 }, 1500);
        return false;
    });

    // 2. Welcome hero animatie (FIX: $(window).load bestaat niet in jQuery 3+, vervangen door $(window).on('load'))
    $(window).on('load', function(){
        $(".welcome-hero-txt h2, .welcome-hero-txt p").addClass("animated fadeInUp");
        $(".welcome-hero-txt button").addClass("animated fadeInDown");
    });

});
