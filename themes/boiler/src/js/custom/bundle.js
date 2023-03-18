
jQuery(document).ready(function ($) {

    /* JQuery
    ------------------------------------- */

     /* Accessibility
    ------------------------------------- */

    /* Add Outline to logo when focused */

    jQuery('.logo--align').focusin(function () {
        jQuery(this).find('img').addClass('active')
    });

    jQuery('.logo--align').focusout(function () {
        jQuery(this).find('img').removeClass('active')
    });

    /* Open Popup Form
    ------------------------------------- */

    jQuery('.popupForm a').on('click', function () {
        jQuery('#popupModal').addClass('active');
    });

    jQuery('.popupForm').on('click', function () {
        jQuery('#popupModal').addClass('active');
    });

    jQuery('.btn-close').on('click', function () {
        jQuery('#popupModal').removeClass('active');
    });

    jQuery('.home').focus(function () {
        jQuery('#popupModal').removeClass('active');
    });

    /* Text Slide In 
    ------------------------------------- */
    
   /*** Start animation if on screen */

   // Function to check if element is in viewport

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // Check if it's time to start the animation.
    function checkAnimation() {
        // class for elements to be animated
            var $elem = $('.animate');
        // actions to perform for each element
        $elem.each(function() {
        // if animation already started return
            if ($(this).hasClass('animated')) return;
        // check if in viewport
            if ($(this).isInViewport()) {
        // begin animation if not started
            $(this).addClass('animated');
            }
        });
    }

    // Capture scroll events
    $(window).load(function(){
        checkAnimation();
    });

    $(window).scroll(function(){
        checkAnimation();
    });

    /* Open Top Nav Sub-Menu dropdown 
    ------------------------------------- */

    jQuery('.prevent__arrow').on('click', function () {
        event.preventDefault()
    });

    jQuery('.prevent > a').on('click', function () {
        event.preventDefault()
    });

    jQuery('.menu .menu-item').focusin(function () {
        jQuery(this).find('.sub-menu').addClass('active')
    });

    jQuery('.menu-item').focusout(function () {
        jQuery(this).siblings().find('.sub-menu').removeClass('active');
    });

    jQuery('.top-level-menu-item').hover(function () {
        jQuery(this).siblings().find('.sub-menu').removeClass('active');
        jQuery(this).find('.sub-menu').toggleClass('active')
    });

    /* Open Pre-Menu dropdown 
    ------------------------------------- */

    jQuery('.pre-menu-dropdown').on('click', function () {
        jQuery('.pre-menu-dropdown-content').toggleClass('active')
        jQuery('.arrow--down').toggleClass('active')
    });

    jQuery('.pre-menu-dropdown').on('keypress', function(e) {
        if(e.which == 13) {
            jQuery('.pre-menu-dropdown-content').toggleClass('active')
            jQuery('.arrow--down').toggleClass('active')
        }
    });

    /* Drop Arrow color change & open 
    ------------------------------------- */

    jQuery('.dropdown').hover(function () {
        jQuery(this).siblings().find('.dropdown-content').removeClass('active');
        jQuery(this).find('.dropdown-content').toggleClass('active')
    });

    jQuery('.dropdown').on('keypress', function(e) {
        if(e.which == 13) {
            jQuery(this).siblings().find('.dropdown-content').removeClass('active');
            jQuery(this).find('.dropdown-content').toggleClass('active')
        }
    });

    /* Contact Us Banner Accordion 
    ------------------------------------- */

    jQuery('.accordion-1').on('click', function() {
        jQuery('.description__content__3').removeClass('active');
        jQuery('.description__content__2').removeClass('active');
        jQuery('.description__content__1').toggleClass('active');
        jQuery('.arrow--rotate__3').removeClass('active');
        jQuery('.arrow--rotate__2').removeClass('active');
        jQuery(this).find('.arrow--rotate__1').toggleClass('active');
    });

    jQuery('.accordion-2').on('click', function() {
        jQuery('.description__content__3').removeClass('active');
        jQuery('.description__content__1').removeClass('active');
        jQuery('.description__content__2').toggleClass('active');
        jQuery('.arrow--rotate__1').removeClass('active');
        jQuery('.arrow--rotate__3').removeClass('active');
        jQuery(this).find('.arrow--rotate__2').toggleClass('active');
    });

    jQuery('.accordion-3').on('click', function() {
        jQuery('.description__content__1').removeClass('active');
        jQuery('.description__content__2').removeClass('active');
        jQuery('.description__content__3').toggleClass('active');
        jQuery('.arrow--rotate__1').removeClass('active');
        jQuery('.arrow--rotate__2').removeClass('active');
        jQuery(this).find('.arrow--rotate__3').toggleClass('active');
    });

    jQuery('.accordion-1').on('keypress',function(e) {
        if(e.which == 13) {
            jQuery('.description__content__3').removeClass('active');
            jQuery('.description__content__2').removeClass('active');
            jQuery('.description__content__1').toggleClass('active');
            jQuery(this).find('.arrow--rotate').toggleClass('active');
        }
    });

    jQuery('.accordion-2').on('keypress',function(e) {
        if(e.which == 13) {
            jQuery('.description__content__3').removeClass('active');
            jQuery('.description__content__1').removeClass('active');
            jQuery('.description__content__2').toggleClass('active');
            jQuery(this).find('.arrow--rotate').toggleClass('active');
        }
    });

    jQuery('.accordion-3').on('keypress',function(e) {
        if(e.which == 13) {
            jQuery('.description__content__1').removeClass('active');
            jQuery('.description__content__2').removeClass('active');
            jQuery('.description__content__3').toggleClass('active');
            jQuery(this).find('.arrow--rotate').toggleClass('active');
        }
    });

    /* Mobile Menu 
    ------------------------------------- */

    jQuery('.mobileNav').on('click', function() {
        jQuery('#navItems').toggle();
    });

    jQuery('.mobileNav').on('keypress',function(e) {
        if(e.which == 13) {
            jQuery('#navItems').toggle();
        }
    });

    /* FAQS 
    ------------------------------------- */

    $('.collapse-main').on('click', function() {
        $(this).find('.collapse').toggle();
        $(this).find('.arrow--down').toggleClass('active');
    });	
});