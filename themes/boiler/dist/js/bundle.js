/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/custom/bundle.js":
/*!*********************************!*\
  !*** ./src/js/custom/bundle.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery(document).ready(function ($) {
  /* JQuery
  ------------------------------------- */

  /* Accessibility
  ------------------------------------- */

  /* Add Outline to logo when focused */

  jQuery('.logo--align').focusin(function () {
    jQuery(this).find('img').addClass('active');
  });
  jQuery('.logo--align').focusout(function () {
    jQuery(this).find('img').removeClass('active');
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

  $.fn.isInViewport = function () {
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
    $elem.each(function () {
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
  $(window).load(function () {
    checkAnimation();
  });
  $(window).scroll(function () {
    checkAnimation();
  });

  /* Open Top Nav Sub-Menu dropdown 
  ------------------------------------- */

  jQuery('.prevent__arrow').on('click', function () {
    event.preventDefault();
  });
  jQuery('.prevent > a').on('click', function () {
    event.preventDefault();
  });
  jQuery('.menu .menu-item').focusin(function () {
    jQuery(this).find('.sub-menu').addClass('active');
  });
  jQuery('.menu-item').focusout(function () {
    jQuery(this).siblings().find('.sub-menu').removeClass('active');
  });
  jQuery('.top-level-menu-item').hover(function () {
    jQuery(this).siblings().find('.sub-menu').removeClass('active');
    jQuery(this).find('.sub-menu').toggleClass('active');
  });

  /* Open Pre-Menu dropdown 
  ------------------------------------- */

  jQuery('.pre-menu-dropdown').on('click', function () {
    jQuery('.pre-menu-dropdown-content').toggleClass('active');
    jQuery('.arrow--down').toggleClass('active');
  });
  jQuery('.pre-menu-dropdown').on('keypress', function (e) {
    if (e.which == 13) {
      jQuery('.pre-menu-dropdown-content').toggleClass('active');
      jQuery('.arrow--down').toggleClass('active');
    }
  });

  /* Drop Arrow color change & open 
  ------------------------------------- */

  jQuery('.dropdown').hover(function () {
    jQuery(this).siblings().find('.dropdown-content').removeClass('active');
    jQuery(this).find('.dropdown-content').toggleClass('active');
  });
  jQuery('.dropdown').on('keypress', function (e) {
    if (e.which == 13) {
      jQuery(this).siblings().find('.dropdown-content').removeClass('active');
      jQuery(this).find('.dropdown-content').toggleClass('active');
    }
  });

  /* Contact Us Banner Accordion 
  ------------------------------------- */

  jQuery('.accordion-1').on('click', function () {
    jQuery('.description__content__3').removeClass('active');
    jQuery('.description__content__2').removeClass('active');
    jQuery('.description__content__1').toggleClass('active');
    jQuery('.arrow--rotate__3').removeClass('active');
    jQuery('.arrow--rotate__2').removeClass('active');
    jQuery(this).find('.arrow--rotate__1').toggleClass('active');
  });
  jQuery('.accordion-2').on('click', function () {
    jQuery('.description__content__3').removeClass('active');
    jQuery('.description__content__1').removeClass('active');
    jQuery('.description__content__2').toggleClass('active');
    jQuery('.arrow--rotate__1').removeClass('active');
    jQuery('.arrow--rotate__3').removeClass('active');
    jQuery(this).find('.arrow--rotate__2').toggleClass('active');
  });
  jQuery('.accordion-3').on('click', function () {
    jQuery('.description__content__1').removeClass('active');
    jQuery('.description__content__2').removeClass('active');
    jQuery('.description__content__3').toggleClass('active');
    jQuery('.arrow--rotate__1').removeClass('active');
    jQuery('.arrow--rotate__2').removeClass('active');
    jQuery(this).find('.arrow--rotate__3').toggleClass('active');
  });
  jQuery('.accordion-1').on('keypress', function (e) {
    if (e.which == 13) {
      jQuery('.description__content__3').removeClass('active');
      jQuery('.description__content__2').removeClass('active');
      jQuery('.description__content__1').toggleClass('active');
      jQuery(this).find('.arrow--rotate').toggleClass('active');
    }
  });
  jQuery('.accordion-2').on('keypress', function (e) {
    if (e.which == 13) {
      jQuery('.description__content__3').removeClass('active');
      jQuery('.description__content__1').removeClass('active');
      jQuery('.description__content__2').toggleClass('active');
      jQuery(this).find('.arrow--rotate').toggleClass('active');
    }
  });
  jQuery('.accordion-3').on('keypress', function (e) {
    if (e.which == 13) {
      jQuery('.description__content__1').removeClass('active');
      jQuery('.description__content__2').removeClass('active');
      jQuery('.description__content__3').toggleClass('active');
      jQuery(this).find('.arrow--rotate').toggleClass('active');
    }
  });

  /* Mobile Menu 
  ------------------------------------- */

  jQuery('.mobileNav').on('click', function () {
    jQuery('#navItems').toggle();
  });
  jQuery('.mobileNav').on('keypress', function (e) {
    if (e.which == 13) {
      jQuery('#navItems').toggle();
    }
  });

  /* FAQS 
  ------------------------------------- */

  $('.collapse-main').on('click', function () {
    $(this).find('.collapse').toggle();
    $(this).find('.arrow--down').toggleClass('active');
  });
});

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./src/js/custom/bundle.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/lightstream_station14/vvv-local/www/bp-102/public_html/wp-content/themes/splash/src/js/custom/bundle.js */"./src/js/custom/bundle.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2N1c3RvbS9idW5kbGUuanMiXSwibmFtZXMiOlsialF1ZXJ5IiwiZG9jdW1lbnQiLCJyZWFkeSIsIiQiLCJmb2N1c2luIiwiZmluZCIsImFkZENsYXNzIiwiZm9jdXNvdXQiLCJyZW1vdmVDbGFzcyIsIm9uIiwiZm9jdXMiLCJmbiIsImlzSW5WaWV3cG9ydCIsImVsZW1lbnRUb3AiLCJvZmZzZXQiLCJ0b3AiLCJlbGVtZW50Qm90dG9tIiwib3V0ZXJIZWlnaHQiLCJ2aWV3cG9ydFRvcCIsIndpbmRvdyIsInNjcm9sbFRvcCIsInZpZXdwb3J0Qm90dG9tIiwiaGVpZ2h0IiwiY2hlY2tBbmltYXRpb24iLCIkZWxlbSIsImVhY2giLCJoYXNDbGFzcyIsImxvYWQiLCJzY3JvbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2libGluZ3MiLCJob3ZlciIsInRvZ2dsZUNsYXNzIiwiZSIsIndoaWNoIiwidG9nZ2xlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNqRkFBLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxVQUFVQyxDQUFDLEVBQUU7RUFFaEM7QUFDSjs7RUFFSztBQUNMOztFQUVJOztFQUVBSCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUNJLE9BQU8sQ0FBQyxZQUFZO0lBQ3ZDSixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQztFQUMvQyxDQUFDLENBQUM7RUFFRk4sTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDTyxRQUFRLENBQUMsWUFBWTtJQUN4Q1AsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUNHLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDbEQsQ0FBQyxDQUFDOztFQUVGO0FBQ0o7O0VBRUlSLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQzNDVCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUNNLFFBQVEsQ0FBQyxRQUFRLENBQUM7RUFDNUMsQ0FBQyxDQUFDO0VBRUZOLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQ3pDVCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUNNLFFBQVEsQ0FBQyxRQUFRLENBQUM7RUFDNUMsQ0FBQyxDQUFDO0VBRUZOLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQ3pDVCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDL0MsQ0FBQyxDQUFDO0VBRUZSLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQ1UsS0FBSyxDQUFDLFlBQVk7SUFDOUJWLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztFQUMvQyxDQUFDLENBQUM7O0VBRUY7QUFDSjs7RUFFRzs7RUFFQTs7RUFFQ0wsQ0FBQyxDQUFDUSxFQUFFLENBQUNDLFlBQVksR0FBRyxZQUFXO0lBQzNCLElBQUlDLFVBQVUsR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDVyxNQUFNLEVBQUUsQ0FBQ0MsR0FBRztJQUNyQyxJQUFJQyxhQUFhLEdBQUdILFVBQVUsR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDYyxXQUFXLEVBQUU7SUFDdEQsSUFBSUMsV0FBVyxHQUFHZixDQUFDLENBQUNnQixNQUFNLENBQUMsQ0FBQ0MsU0FBUyxFQUFFO0lBQ3ZDLElBQUlDLGNBQWMsR0FBR0gsV0FBVyxHQUFHZixDQUFDLENBQUNnQixNQUFNLENBQUMsQ0FBQ0csTUFBTSxFQUFFO0lBQ3JELE9BQU9OLGFBQWEsR0FBR0UsV0FBVyxJQUFJTCxVQUFVLEdBQUdRLGNBQWM7RUFDckUsQ0FBQzs7RUFFRDtFQUNBLFNBQVNFLGNBQWNBLENBQUEsRUFBRztJQUN0QjtJQUNJLElBQUlDLEtBQUssR0FBR3JCLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDN0I7SUFDQXFCLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLFlBQVc7TUFDdEI7TUFDSSxJQUFJdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDdUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO01BQ3RDO01BQ0ksSUFBSXZCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1MsWUFBWSxFQUFFLEVBQUU7UUFDaEM7UUFDSVQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDRyxRQUFRLENBQUMsVUFBVSxDQUFDO01BQzVCO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7RUFDQUgsQ0FBQyxDQUFDZ0IsTUFBTSxDQUFDLENBQUNRLElBQUksQ0FBQyxZQUFVO0lBQ3JCSixjQUFjLEVBQUU7RUFDcEIsQ0FBQyxDQUFDO0VBRUZwQixDQUFDLENBQUNnQixNQUFNLENBQUMsQ0FBQ1MsTUFBTSxDQUFDLFlBQVU7SUFDdkJMLGNBQWMsRUFBRTtFQUNwQixDQUFDLENBQUM7O0VBRUY7QUFDSjs7RUFFSXZCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDUyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDOUNvQixLQUFLLENBQUNDLGNBQWMsRUFBRTtFQUMxQixDQUFDLENBQUM7RUFFRjlCLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQzNDb0IsS0FBSyxDQUFDQyxjQUFjLEVBQUU7RUFDMUIsQ0FBQyxDQUFDO0VBRUY5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ksT0FBTyxDQUFDLFlBQVk7SUFDM0NKLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDO0VBQ3JELENBQUMsQ0FBQztFQUVGTixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUNPLFFBQVEsQ0FBQyxZQUFZO0lBQ3RDUCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMrQixRQUFRLEVBQUUsQ0FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQ0csV0FBVyxDQUFDLFFBQVEsQ0FBQztFQUNuRSxDQUFDLENBQUM7RUFFRlIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUNnQyxLQUFLLENBQUMsWUFBWTtJQUM3Q2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQytCLFFBQVEsRUFBRSxDQUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQy9EUixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzRCLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDeEQsQ0FBQyxDQUFDOztFQUVGO0FBQ0o7O0VBRUlqQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQ2pEVCxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQ2lDLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDMURqQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUNpQyxXQUFXLENBQUMsUUFBUSxDQUFDO0VBQ2hELENBQUMsQ0FBQztFQUVGakMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUNTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBU3lCLENBQUMsRUFBRTtJQUNwRCxJQUFHQSxDQUFDLENBQUNDLEtBQUssSUFBSSxFQUFFLEVBQUU7TUFDZG5DLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDaUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztNQUMxRGpDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQ2lDLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDaEQ7RUFDSixDQUFDLENBQUM7O0VBRUY7QUFDSjs7RUFFSWpDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQ2dDLEtBQUssQ0FBQyxZQUFZO0lBQ2xDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDK0IsUUFBUSxFQUFFLENBQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQ0csV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN2RVIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzRCLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDaEUsQ0FBQyxDQUFDO0VBRUZqQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUNTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBU3lCLENBQUMsRUFBRTtJQUMzQyxJQUFHQSxDQUFDLENBQUNDLEtBQUssSUFBSSxFQUFFLEVBQUU7TUFDZG5DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQytCLFFBQVEsRUFBRSxDQUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUNHLFdBQVcsQ0FBQyxRQUFRLENBQUM7TUFDdkVSLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM0QixXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ2hFO0VBQ0osQ0FBQyxDQUFDOztFQUVGO0FBQ0o7O0VBRUlqQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUNTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUMxQ1QsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDeERSLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDUSxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ3hEUixNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQ2lDLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDeERqQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNqRFIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDakRSLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM0QixXQUFXLENBQUMsUUFBUSxDQUFDO0VBQ2hFLENBQUMsQ0FBQztFQUVGakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDUyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7SUFDMUNULE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDUSxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ3hEUixNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN4RFIsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUNpQyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ3hEakMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDakRSLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDUSxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ2pEUixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDNEIsV0FBVyxDQUFDLFFBQVEsQ0FBQztFQUNoRSxDQUFDLENBQUM7RUFFRmpDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFXO0lBQzFDVCxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN4RFIsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDeERSLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDaUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN4RGpDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDUSxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ2pEUixNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNqRFIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzRCLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDaEUsQ0FBQyxDQUFDO0VBRUZqQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUNTLEVBQUUsQ0FBQyxVQUFVLEVBQUMsVUFBU3lCLENBQUMsRUFBRTtJQUM3QyxJQUFHQSxDQUFDLENBQUNDLEtBQUssSUFBSSxFQUFFLEVBQUU7TUFDZG5DLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDUSxXQUFXLENBQUMsUUFBUSxDQUFDO01BQ3hEUixNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztNQUN4RFIsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUNpQyxXQUFXLENBQUMsUUFBUSxDQUFDO01BQ3hEakMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzRCLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDN0Q7RUFDSixDQUFDLENBQUM7RUFFRmpDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQ1MsRUFBRSxDQUFDLFVBQVUsRUFBQyxVQUFTeUIsQ0FBQyxFQUFFO0lBQzdDLElBQUdBLENBQUMsQ0FBQ0MsS0FBSyxJQUFJLEVBQUUsRUFBRTtNQUNkbkMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7TUFDeERSLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDUSxXQUFXLENBQUMsUUFBUSxDQUFDO01BQ3hEUixNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQ2lDLFdBQVcsQ0FBQyxRQUFRLENBQUM7TUFDeERqQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDNEIsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUM3RDtFQUNKLENBQUMsQ0FBQztFQUVGakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDUyxFQUFFLENBQUMsVUFBVSxFQUFDLFVBQVN5QixDQUFDLEVBQUU7SUFDN0MsSUFBR0EsQ0FBQyxDQUFDQyxLQUFLLElBQUksRUFBRSxFQUFFO01BQ2RuQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLFFBQVEsQ0FBQztNQUN4RFIsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUNRLFdBQVcsQ0FBQyxRQUFRLENBQUM7TUFDeERSLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDaUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztNQUN4RGpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM0QixXQUFXLENBQUMsUUFBUSxDQUFDO0lBQzdEO0VBQ0osQ0FBQyxDQUFDOztFQUVGO0FBQ0o7O0VBRUlqQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUNTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUN4Q1QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDb0MsTUFBTSxFQUFFO0VBQ2hDLENBQUMsQ0FBQztFQUVGcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDUyxFQUFFLENBQUMsVUFBVSxFQUFDLFVBQVN5QixDQUFDLEVBQUU7SUFDM0MsSUFBR0EsQ0FBQyxDQUFDQyxLQUFLLElBQUksRUFBRSxFQUFFO01BQ2RuQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUNvQyxNQUFNLEVBQUU7SUFDaEM7RUFDSixDQUFDLENBQUM7O0VBRUY7QUFDSjs7RUFFSWpDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDTSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7SUFDdkNOLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDK0IsTUFBTSxFQUFFO0lBQ2xDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM0QixXQUFXLENBQUMsUUFBUSxDQUFDO0VBQ3RELENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuXG4gICAgLyogSlF1ZXJ5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgIC8qIEFjY2Vzc2liaWxpdHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKiBBZGQgT3V0bGluZSB0byBsb2dvIHdoZW4gZm9jdXNlZCAqL1xuXG4gICAgalF1ZXJ5KCcubG9nby0tYWxpZ24nKS5mb2N1c2luKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJ2ltZycpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcubG9nby0tYWxpZ24nKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCdpbWcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICB9KTtcblxuICAgIC8qIE9wZW4gUG9wdXAgRm9ybVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGpRdWVyeSgnLnBvcHVwRm9ybSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkoJyNwb3B1cE1vZGFsJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcucG9wdXBGb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkoJyNwb3B1cE1vZGFsJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkoJyNwb3B1cE1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcuaG9tZScpLmZvY3VzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KCcjcG9wdXBNb2RhbCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIC8qIFRleHQgU2xpZGUgSW4gXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAgIFxuICAgLyoqKiBTdGFydCBhbmltYXRpb24gaWYgb24gc2NyZWVuICovXG5cbiAgIC8vIEZ1bmN0aW9uIHRvIGNoZWNrIGlmIGVsZW1lbnQgaXMgaW4gdmlld3BvcnRcblxuICAgICQuZm4uaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50VG9wID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciBlbGVtZW50Qm90dG9tID0gZWxlbWVudFRvcCArICQodGhpcykub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdmFyIHZpZXdwb3J0VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgdmlld3BvcnRCb3R0b20gPSB2aWV3cG9ydFRvcCArICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRCb3R0b20gPiB2aWV3cG9ydFRvcCAmJiBlbGVtZW50VG9wIDwgdmlld3BvcnRCb3R0b207XG4gICAgfTtcblxuICAgIC8vIENoZWNrIGlmIGl0J3MgdGltZSB0byBzdGFydCB0aGUgYW5pbWF0aW9uLlxuICAgIGZ1bmN0aW9uIGNoZWNrQW5pbWF0aW9uKCkge1xuICAgICAgICAvLyBjbGFzcyBmb3IgZWxlbWVudHMgdG8gYmUgYW5pbWF0ZWRcbiAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoJy5hbmltYXRlJyk7XG4gICAgICAgIC8vIGFjdGlvbnMgdG8gcGVyZm9ybSBmb3IgZWFjaCBlbGVtZW50XG4gICAgICAgICRlbGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGlmIGFuaW1hdGlvbiBhbHJlYWR5IHN0YXJ0ZWQgcmV0dXJuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYW5pbWF0ZWQnKSkgcmV0dXJuO1xuICAgICAgICAvLyBjaGVjayBpZiBpbiB2aWV3cG9ydFxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXNJblZpZXdwb3J0KCkpIHtcbiAgICAgICAgLy8gYmVnaW4gYW5pbWF0aW9uIGlmIG5vdCBzdGFydGVkXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhbmltYXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDYXB0dXJlIHNjcm9sbCBldmVudHNcbiAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpe1xuICAgICAgICBjaGVja0FuaW1hdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuICAgICAgICBjaGVja0FuaW1hdGlvbigpO1xuICAgIH0pO1xuXG4gICAgLyogT3BlbiBUb3AgTmF2IFN1Yi1NZW51IGRyb3Bkb3duIFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGpRdWVyeSgnLnByZXZlbnRfX2Fycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5wcmV2ZW50ID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcubWVudSAubWVudS1pdGVtJykuZm9jdXNpbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuc3ViLW1lbnUnKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLm1lbnUtaXRlbScpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCkuZmluZCgnLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcudG9wLWxldmVsLW1lbnUtaXRlbScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCkuZmluZCgnLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLnN1Yi1tZW51JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfSk7XG5cbiAgICAvKiBPcGVuIFByZS1NZW51IGRyb3Bkb3duIFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGpRdWVyeSgnLnByZS1tZW51LWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkoJy5wcmUtbWVudS1kcm9wZG93bi1jb250ZW50JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1kb3duJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5wcmUtbWVudS1kcm9wZG93bicpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgalF1ZXJ5KCcucHJlLW1lbnUtZHJvcGRvd24tY29udGVudCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgalF1ZXJ5KCcuYXJyb3ctLWRvd24nKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyogRHJvcCBBcnJvdyBjb2xvciBjaGFuZ2UgJiBvcGVuIFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGpRdWVyeSgnLmRyb3Bkb3duJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuc2libGluZ3MoKS5maW5kKCcuZHJvcGRvd24tY29udGVudCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5kcm9wZG93bi1jb250ZW50JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5kcm9wZG93bicpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCkuZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyogQ29udGFjdCBVcyBCYW5uZXIgQWNjb3JkaW9uIFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGpRdWVyeSgnLmFjY29yZGlvbi0xJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18zJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzEnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1yb3RhdGVfXzMnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1yb3RhdGVfXzInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuYXJyb3ctLXJvdGF0ZV9fMScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLmFjY29yZGlvbi0yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18zJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzInKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1yb3RhdGVfXzEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1yb3RhdGVfXzMnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuYXJyb3ctLXJvdGF0ZV9fMicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLmFjY29yZGlvbi0zJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18xJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzMnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1yb3RhdGVfXzEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFycm93LS1yb3RhdGVfXzInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuYXJyb3ctLXJvdGF0ZV9fMycpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLmFjY29yZGlvbi0xJykub24oJ2tleXByZXNzJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18zJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuYXJyb3ctLXJvdGF0ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcuYWNjb3JkaW9uLTInKS5vbigna2V5cHJlc3MnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzMnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18yJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5hcnJvdy0tcm90YXRlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5hY2NvcmRpb24tMycpLm9uKCdrZXlwcmVzcycsZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzMnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmFycm93LS1yb3RhdGUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIE1vYmlsZSBNZW51IFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGpRdWVyeSgnLm1vYmlsZU5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJyNuYXZJdGVtcycpLnRvZ2dsZSgpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcubW9iaWxlTmF2Jykub24oJ2tleXByZXNzJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI25hdkl0ZW1zJykudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIEZBUVMgXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgJCgnLmNvbGxhcHNlLW1haW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuY29sbGFwc2UnKS50b2dnbGUoKTtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYXJyb3ctLWRvd24nKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XHRcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=