(function ($) {
    "use strict";

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
        $mobile_nav.find('> ul').attr({'class': '', 'id': ''});
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Stick the header at top on scroll
    $("#header").sticky({topSpacing: 0, zIndex: '50'});

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });
    
    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });
    
    // Cart Quantity
    $('.quantity').prepend('<span class="dec q-btn">-</span>');
    $('.quantity').append('<span class="inc q-btn">+</span>');
    $('.q-btn').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        var newVal = oldValue;
        if ($button.hasClass('inc')) {
            newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                newVal = parseFloat(oldValue) - 1;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    // Add active class to correct menu item based on URL
    $(document).ready(function () {
        var currentUrl = window.location.pathname;

        // Remove 'active' class from all menu items
        $('.nav-menu li').removeClass('active');

        // Add 'active' class to the menu item that corresponds to the current URL
        $('.nav-menu li a').each(function () {
            var linkUrl = $(this).attr('href');
            if (linkUrl === currentUrl) {
                $(this).parent().addClass('active');
            }
        });
    });
    
})(jQuery);

const gallery = document.querySelector(".gallery");
let currentSlide = 0;

function slideLeft() {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateGallery();
}

function slideRight() {
    const totalSlides = document.querySelectorAll(".slide").length;
    currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
    updateGallery();
}

function updateGallery() {
    const offset = -currentSlide * 100; // Slide width is 100% of the parent container
    gallery.style.transform = `translateX(${offset}%)`;
}
