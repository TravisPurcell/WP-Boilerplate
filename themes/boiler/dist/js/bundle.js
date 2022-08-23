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
  }; // Check if it's time to start the animation.


  function checkAnimation() {
    // class for elements to be animated
    var $elem = $('.animate'); // actions to perform for each element

    $elem.each(function () {
      // if animation already started return
      if ($(this).hasClass('animated')) return; // check if in viewport

      if ($(this).isInViewport()) {
        // begin animation if not started
        $(this).addClass('animated');
      }
    });
  } // Capture scroll events


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
  }); // jQuery('.top-level-menu-item').on('keypress', function(e) {
  //     if(e.which == 13) {
  //         jQuery(this).siblings().find('.sub-menu').removeClass('active');
  //         jQuery(this).find('.sub-menu').toggleClass('active')
  //     }
  // });

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
  // jQuery('.dropdown').on('click', function () {
  //     jQuery(this).siblings().find('.dropdown-content').removeClass('active');
  //     jQuery(this).find('.dropdown-content').toggleClass('active')
  // });

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
  /* Toggle Famous Figures captions 
  ------------------------------------- */

  jQuery('.rl-gallery-item').hover(function () {
    jQuery(this).find('.rl-gallery-caption').toggleClass('active');
  });
  jQuery('.rl-gallery-item').focus(function () {
    jQuery(this).find('.rl-gallery-caption').toggleClass('active');
  });
});

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./src/js/custom/bundle.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/lightstream_station14/vvv-local/www/lsg-271/public_html/wp-content/themes/boiler/src/js/custom/bundle.js */"./src/js/custom/bundle.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2N1c3RvbS9idW5kbGUuanMiXSwibmFtZXMiOlsialF1ZXJ5IiwiZG9jdW1lbnQiLCJyZWFkeSIsIiQiLCJmb2N1c2luIiwiZmluZCIsImFkZENsYXNzIiwiZm9jdXNvdXQiLCJyZW1vdmVDbGFzcyIsIm9uIiwiZm9jdXMiLCJmbiIsImlzSW5WaWV3cG9ydCIsImVsZW1lbnRUb3AiLCJvZmZzZXQiLCJ0b3AiLCJlbGVtZW50Qm90dG9tIiwib3V0ZXJIZWlnaHQiLCJ2aWV3cG9ydFRvcCIsIndpbmRvdyIsInNjcm9sbFRvcCIsInZpZXdwb3J0Qm90dG9tIiwiaGVpZ2h0IiwiY2hlY2tBbmltYXRpb24iLCIkZWxlbSIsImVhY2giLCJoYXNDbGFzcyIsImxvYWQiLCJzY3JvbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2libGluZ3MiLCJob3ZlciIsInRvZ2dsZUNsYXNzIiwiZSIsIndoaWNoIiwidG9nZ2xlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNqRkFBLE1BQU0sQ0FBQ0MsUUFBRCxDQUFOLENBQWlCQyxLQUFqQixDQUF1QixVQUFVQyxDQUFWLEVBQWE7QUFFaEM7QUFDSjs7QUFFSTtBQUVBSCxRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCSSxPQUF2QixDQUErQixZQUFZO0FBQ3ZDSixVQUFNLENBQUMsSUFBRCxDQUFOLENBQWFLLElBQWIsQ0FBa0IsS0FBbEIsRUFBeUJDLFFBQXpCLENBQWtDLFFBQWxDO0FBQ0gsR0FGRDtBQUlBTixRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCTyxRQUF2QixDQUFnQyxZQUFZO0FBQ3hDUCxVQUFNLENBQUMsSUFBRCxDQUFOLENBQWFLLElBQWIsQ0FBa0IsS0FBbEIsRUFBeUJHLFdBQXpCLENBQXFDLFFBQXJDO0FBQ0gsR0FGRDtBQUlBO0FBQ0o7O0FBRUlSLFFBQU0sQ0FBQyxjQUFELENBQU4sQ0FBdUJTLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7QUFDM0NULFVBQU0sQ0FBQyxhQUFELENBQU4sQ0FBc0JNLFFBQXRCLENBQStCLFFBQS9CO0FBQ0gsR0FGRDtBQUlBTixRQUFNLENBQUMsWUFBRCxDQUFOLENBQXFCUyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFZO0FBQ3pDVCxVQUFNLENBQUMsYUFBRCxDQUFOLENBQXNCTSxRQUF0QixDQUErQixRQUEvQjtBQUNILEdBRkQ7QUFJQU4sUUFBTSxDQUFDLFlBQUQsQ0FBTixDQUFxQlMsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBWTtBQUN6Q1QsVUFBTSxDQUFDLGFBQUQsQ0FBTixDQUFzQlEsV0FBdEIsQ0FBa0MsUUFBbEM7QUFDSCxHQUZEO0FBSUFSLFFBQU0sQ0FBQyxPQUFELENBQU4sQ0FBZ0JVLEtBQWhCLENBQXNCLFlBQVk7QUFDOUJWLFVBQU0sQ0FBQyxhQUFELENBQU4sQ0FBc0JRLFdBQXRCLENBQWtDLFFBQWxDO0FBQ0gsR0FGRDtBQUlBO0FBQ0o7O0FBRUc7QUFFQTs7QUFFQ0wsR0FBQyxDQUFDUSxFQUFGLENBQUtDLFlBQUwsR0FBb0IsWUFBVztBQUMzQixRQUFJQyxVQUFVLEdBQUdWLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVcsTUFBUixHQUFpQkMsR0FBbEM7QUFDQSxRQUFJQyxhQUFhLEdBQUdILFVBQVUsR0FBR1YsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRYyxXQUFSLEVBQWpDO0FBQ0EsUUFBSUMsV0FBVyxHQUFHZixDQUFDLENBQUNnQixNQUFELENBQUQsQ0FBVUMsU0FBVixFQUFsQjtBQUNBLFFBQUlDLGNBQWMsR0FBR0gsV0FBVyxHQUFHZixDQUFDLENBQUNnQixNQUFELENBQUQsQ0FBVUcsTUFBVixFQUFuQztBQUNBLFdBQU9OLGFBQWEsR0FBR0UsV0FBaEIsSUFBK0JMLFVBQVUsR0FBR1EsY0FBbkQ7QUFDSCxHQU5ELENBekNnQyxDQWlEaEM7OztBQUNBLFdBQVNFLGNBQVQsR0FBMEI7QUFDdEI7QUFDSSxRQUFJQyxLQUFLLEdBQUdyQixDQUFDLENBQUMsVUFBRCxDQUFiLENBRmtCLENBR3RCOztBQUNBcUIsU0FBSyxDQUFDQyxJQUFOLENBQVcsWUFBVztBQUN0QjtBQUNJLFVBQUl0QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVF1QixRQUFSLENBQWlCLFVBQWpCLENBQUosRUFBa0MsT0FGaEIsQ0FHdEI7O0FBQ0ksVUFBSXZCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVMsWUFBUixFQUFKLEVBQTRCO0FBQ2hDO0FBQ0lULFNBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUcsUUFBUixDQUFpQixVQUFqQjtBQUNDO0FBQ0osS0FSRDtBQVNILEdBL0QrQixDQWlFaEM7OztBQUNBSCxHQUFDLENBQUNnQixNQUFELENBQUQsQ0FBVVEsSUFBVixDQUFlLFlBQVU7QUFDckJKLGtCQUFjO0FBQ2pCLEdBRkQ7QUFJQXBCLEdBQUMsQ0FBQ2dCLE1BQUQsQ0FBRCxDQUFVUyxNQUFWLENBQWlCLFlBQVU7QUFDdkJMLGtCQUFjO0FBQ2pCLEdBRkQ7QUFJQTtBQUNKOztBQUVJdkIsUUFBTSxDQUFDLGlCQUFELENBQU4sQ0FBMEJTLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQVk7QUFDOUNvQixTQUFLLENBQUNDLGNBQU47QUFDSCxHQUZEO0FBSUE5QixRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCUyxFQUF2QixDQUEwQixPQUExQixFQUFtQyxZQUFZO0FBQzNDb0IsU0FBSyxDQUFDQyxjQUFOO0FBQ0gsR0FGRDtBQUlBOUIsUUFBTSxDQUFDLGtCQUFELENBQU4sQ0FBMkJJLE9BQTNCLENBQW1DLFlBQVk7QUFDM0NKLFVBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYUssSUFBYixDQUFrQixXQUFsQixFQUErQkMsUUFBL0IsQ0FBd0MsUUFBeEM7QUFDSCxHQUZEO0FBSUFOLFFBQU0sQ0FBQyxZQUFELENBQU4sQ0FBcUJPLFFBQXJCLENBQThCLFlBQVk7QUFDdENQLFVBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYStCLFFBQWIsR0FBd0IxQixJQUF4QixDQUE2QixXQUE3QixFQUEwQ0csV0FBMUMsQ0FBc0QsUUFBdEQ7QUFDSCxHQUZEO0FBSUFSLFFBQU0sQ0FBQyxzQkFBRCxDQUFOLENBQStCZ0MsS0FBL0IsQ0FBcUMsWUFBWTtBQUM3Q2hDLFVBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYStCLFFBQWIsR0FBd0IxQixJQUF4QixDQUE2QixXQUE3QixFQUEwQ0csV0FBMUMsQ0FBc0QsUUFBdEQ7QUFDQVIsVUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhSyxJQUFiLENBQWtCLFdBQWxCLEVBQStCNEIsV0FBL0IsQ0FBMkMsUUFBM0M7QUFDSCxHQUhELEVBN0ZnQyxDQW1HaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0o7O0FBRUlqQyxRQUFNLENBQUMsb0JBQUQsQ0FBTixDQUE2QlMsRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsWUFBWTtBQUNqRFQsVUFBTSxDQUFDLDRCQUFELENBQU4sQ0FBcUNpQyxXQUFyQyxDQUFpRCxRQUFqRDtBQUNBakMsVUFBTSxDQUFDLGNBQUQsQ0FBTixDQUF1QmlDLFdBQXZCLENBQW1DLFFBQW5DO0FBQ0gsR0FIRDtBQUtBakMsUUFBTSxDQUFDLG9CQUFELENBQU4sQ0FBNkJTLEVBQTdCLENBQWdDLFVBQWhDLEVBQTRDLFVBQVN5QixDQUFULEVBQVk7QUFDcEQsUUFBR0EsQ0FBQyxDQUFDQyxLQUFGLElBQVcsRUFBZCxFQUFrQjtBQUNkbkMsWUFBTSxDQUFDLDRCQUFELENBQU4sQ0FBcUNpQyxXQUFyQyxDQUFpRCxRQUFqRDtBQUNBakMsWUFBTSxDQUFDLGNBQUQsQ0FBTixDQUF1QmlDLFdBQXZCLENBQW1DLFFBQW5DO0FBQ0g7QUFDSixHQUxEO0FBT0E7QUFDSjtBQUVDO0FBQ0c7QUFDQTtBQUNBOztBQUVBakMsUUFBTSxDQUFDLFdBQUQsQ0FBTixDQUFvQmdDLEtBQXBCLENBQTBCLFlBQVk7QUFDbENoQyxVQUFNLENBQUMsSUFBRCxDQUFOLENBQWErQixRQUFiLEdBQXdCMUIsSUFBeEIsQ0FBNkIsbUJBQTdCLEVBQWtERyxXQUFsRCxDQUE4RCxRQUE5RDtBQUNBUixVQUFNLENBQUMsSUFBRCxDQUFOLENBQWFLLElBQWIsQ0FBa0IsbUJBQWxCLEVBQXVDNEIsV0FBdkMsQ0FBbUQsUUFBbkQ7QUFDSCxHQUhEO0FBS0FqQyxRQUFNLENBQUMsV0FBRCxDQUFOLENBQW9CUyxFQUFwQixDQUF1QixVQUF2QixFQUFtQyxVQUFTeUIsQ0FBVCxFQUFZO0FBQzNDLFFBQUdBLENBQUMsQ0FBQ0MsS0FBRixJQUFXLEVBQWQsRUFBa0I7QUFDZG5DLFlBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYStCLFFBQWIsR0FBd0IxQixJQUF4QixDQUE2QixtQkFBN0IsRUFBa0RHLFdBQWxELENBQThELFFBQTlEO0FBQ0FSLFlBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYUssSUFBYixDQUFrQixtQkFBbEIsRUFBdUM0QixXQUF2QyxDQUFtRCxRQUFuRDtBQUNIO0FBQ0osR0FMRDtBQU9BO0FBQ0o7O0FBRUlqQyxRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCUyxFQUF2QixDQUEwQixPQUExQixFQUFtQyxZQUFXO0FBQzFDVCxVQUFNLENBQUMsMEJBQUQsQ0FBTixDQUFtQ1EsV0FBbkMsQ0FBK0MsUUFBL0M7QUFDQVIsVUFBTSxDQUFDLDBCQUFELENBQU4sQ0FBbUNRLFdBQW5DLENBQStDLFFBQS9DO0FBQ0FSLFVBQU0sQ0FBQywwQkFBRCxDQUFOLENBQW1DaUMsV0FBbkMsQ0FBK0MsUUFBL0M7QUFDQWpDLFVBQU0sQ0FBQyxtQkFBRCxDQUFOLENBQTRCUSxXQUE1QixDQUF3QyxRQUF4QztBQUNBUixVQUFNLENBQUMsbUJBQUQsQ0FBTixDQUE0QlEsV0FBNUIsQ0FBd0MsUUFBeEM7QUFDQVIsVUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhSyxJQUFiLENBQWtCLG1CQUFsQixFQUF1QzRCLFdBQXZDLENBQW1ELFFBQW5EO0FBQ0gsR0FQRDtBQVNBakMsUUFBTSxDQUFDLGNBQUQsQ0FBTixDQUF1QlMsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBVztBQUMxQ1QsVUFBTSxDQUFDLDBCQUFELENBQU4sQ0FBbUNRLFdBQW5DLENBQStDLFFBQS9DO0FBQ0FSLFVBQU0sQ0FBQywwQkFBRCxDQUFOLENBQW1DUSxXQUFuQyxDQUErQyxRQUEvQztBQUNBUixVQUFNLENBQUMsMEJBQUQsQ0FBTixDQUFtQ2lDLFdBQW5DLENBQStDLFFBQS9DO0FBQ0FqQyxVQUFNLENBQUMsbUJBQUQsQ0FBTixDQUE0QlEsV0FBNUIsQ0FBd0MsUUFBeEM7QUFDQVIsVUFBTSxDQUFDLG1CQUFELENBQU4sQ0FBNEJRLFdBQTVCLENBQXdDLFFBQXhDO0FBQ0FSLFVBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYUssSUFBYixDQUFrQixtQkFBbEIsRUFBdUM0QixXQUF2QyxDQUFtRCxRQUFuRDtBQUNILEdBUEQ7QUFTQWpDLFFBQU0sQ0FBQyxjQUFELENBQU4sQ0FBdUJTLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFDMUNULFVBQU0sQ0FBQywwQkFBRCxDQUFOLENBQW1DUSxXQUFuQyxDQUErQyxRQUEvQztBQUNBUixVQUFNLENBQUMsMEJBQUQsQ0FBTixDQUFtQ1EsV0FBbkMsQ0FBK0MsUUFBL0M7QUFDQVIsVUFBTSxDQUFDLDBCQUFELENBQU4sQ0FBbUNpQyxXQUFuQyxDQUErQyxRQUEvQztBQUNBakMsVUFBTSxDQUFDLG1CQUFELENBQU4sQ0FBNEJRLFdBQTVCLENBQXdDLFFBQXhDO0FBQ0FSLFVBQU0sQ0FBQyxtQkFBRCxDQUFOLENBQTRCUSxXQUE1QixDQUF3QyxRQUF4QztBQUNBUixVQUFNLENBQUMsSUFBRCxDQUFOLENBQWFLLElBQWIsQ0FBa0IsbUJBQWxCLEVBQXVDNEIsV0FBdkMsQ0FBbUQsUUFBbkQ7QUFDSCxHQVBEO0FBU0FqQyxRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCUyxFQUF2QixDQUEwQixVQUExQixFQUFxQyxVQUFTeUIsQ0FBVCxFQUFZO0FBQzdDLFFBQUdBLENBQUMsQ0FBQ0MsS0FBRixJQUFXLEVBQWQsRUFBa0I7QUFDZG5DLFlBQU0sQ0FBQywwQkFBRCxDQUFOLENBQW1DUSxXQUFuQyxDQUErQyxRQUEvQztBQUNBUixZQUFNLENBQUMsMEJBQUQsQ0FBTixDQUFtQ1EsV0FBbkMsQ0FBK0MsUUFBL0M7QUFDQVIsWUFBTSxDQUFDLDBCQUFELENBQU4sQ0FBbUNpQyxXQUFuQyxDQUErQyxRQUEvQztBQUNBakMsWUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhSyxJQUFiLENBQWtCLGdCQUFsQixFQUFvQzRCLFdBQXBDLENBQWdELFFBQWhEO0FBQ0g7QUFDSixHQVBEO0FBU0FqQyxRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCUyxFQUF2QixDQUEwQixVQUExQixFQUFxQyxVQUFTeUIsQ0FBVCxFQUFZO0FBQzdDLFFBQUdBLENBQUMsQ0FBQ0MsS0FBRixJQUFXLEVBQWQsRUFBa0I7QUFDZG5DLFlBQU0sQ0FBQywwQkFBRCxDQUFOLENBQW1DUSxXQUFuQyxDQUErQyxRQUEvQztBQUNBUixZQUFNLENBQUMsMEJBQUQsQ0FBTixDQUFtQ1EsV0FBbkMsQ0FBK0MsUUFBL0M7QUFDQVIsWUFBTSxDQUFDLDBCQUFELENBQU4sQ0FBbUNpQyxXQUFuQyxDQUErQyxRQUEvQztBQUNBakMsWUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhSyxJQUFiLENBQWtCLGdCQUFsQixFQUFvQzRCLFdBQXBDLENBQWdELFFBQWhEO0FBQ0g7QUFDSixHQVBEO0FBU0FqQyxRQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCUyxFQUF2QixDQUEwQixVQUExQixFQUFxQyxVQUFTeUIsQ0FBVCxFQUFZO0FBQzdDLFFBQUdBLENBQUMsQ0FBQ0MsS0FBRixJQUFXLEVBQWQsRUFBa0I7QUFDZG5DLFlBQU0sQ0FBQywwQkFBRCxDQUFOLENBQW1DUSxXQUFuQyxDQUErQyxRQUEvQztBQUNBUixZQUFNLENBQUMsMEJBQUQsQ0FBTixDQUFtQ1EsV0FBbkMsQ0FBK0MsUUFBL0M7QUFDQVIsWUFBTSxDQUFDLDBCQUFELENBQU4sQ0FBbUNpQyxXQUFuQyxDQUErQyxRQUEvQztBQUNBakMsWUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhSyxJQUFiLENBQWtCLGdCQUFsQixFQUFvQzRCLFdBQXBDLENBQWdELFFBQWhEO0FBQ0g7QUFDSixHQVBEO0FBU0E7QUFDSjs7QUFFSWpDLFFBQU0sQ0FBQyxZQUFELENBQU4sQ0FBcUJTLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDeENULFVBQU0sQ0FBQyxXQUFELENBQU4sQ0FBb0JvQyxNQUFwQjtBQUNILEdBRkQ7QUFJQXBDLFFBQU0sQ0FBQyxZQUFELENBQU4sQ0FBcUJTLEVBQXJCLENBQXdCLFVBQXhCLEVBQW1DLFVBQVN5QixDQUFULEVBQVk7QUFDM0MsUUFBR0EsQ0FBQyxDQUFDQyxLQUFGLElBQVcsRUFBZCxFQUFrQjtBQUNkbkMsWUFBTSxDQUFDLFdBQUQsQ0FBTixDQUFvQm9DLE1BQXBCO0FBQ0g7QUFDSixHQUpEO0FBTUE7QUFDSjs7QUFFSWpDLEdBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CTSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDTixLQUFDLENBQUMsSUFBRCxDQUFELENBQVFFLElBQVIsQ0FBYSxXQUFiLEVBQTBCK0IsTUFBMUI7QUFDQWpDLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUUsSUFBUixDQUFhLGNBQWIsRUFBNkI0QixXQUE3QixDQUF5QyxRQUF6QztBQUNILEdBSEQ7QUFLQTtBQUNKOztBQUVJakMsUUFBTSxDQUFDLGtCQUFELENBQU4sQ0FBMkJnQyxLQUEzQixDQUFpQyxZQUFZO0FBQ3pDaEMsVUFBTSxDQUFDLElBQUQsQ0FBTixDQUFhSyxJQUFiLENBQWtCLHFCQUFsQixFQUF5QzRCLFdBQXpDLENBQXFELFFBQXJEO0FBQ0gsR0FGRDtBQUlBakMsUUFBTSxDQUFDLGtCQUFELENBQU4sQ0FBMkJVLEtBQTNCLENBQWlDLFlBQVk7QUFDekNWLFVBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYUssSUFBYixDQUFrQixxQkFBbEIsRUFBeUM0QixXQUF6QyxDQUFxRCxRQUFyRDtBQUNILEdBRkQ7QUFHSCxDQXRPRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuXG4gICAgLyogQWNjZXNzaWJpbGl0eVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8qIEFkZCBPdXRsaW5lIHRvIGxvZ28gd2hlbiBmb2N1c2VkICovXG5cbiAgICBqUXVlcnkoJy5sb2dvLS1hbGlnbicpLmZvY3VzaW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnaW1nJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5sb2dvLS1hbGlnbicpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJ2ltZycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgIH0pO1xuXG4gICAgLyogT3BlbiBQb3B1cCBGb3JtXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgalF1ZXJ5KCcucG9wdXBGb3JtIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGpRdWVyeSgnI3BvcHVwTW9kYWwnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5wb3B1cEZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGpRdWVyeSgnI3BvcHVwTW9kYWwnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5idG4tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGpRdWVyeSgnI3BvcHVwTW9kYWwnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5ob21lJykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkoJyNwb3B1cE1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgLyogVGV4dCBTbGlkZSBJbiBcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gICAgXG4gICAvKioqIFN0YXJ0IGFuaW1hdGlvbiBpZiBvbiBzY3JlZW4gKi9cblxuICAgLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgZWxlbWVudCBpcyBpbiB2aWV3cG9ydFxuXG4gICAgJC5mbi5pc0luVmlld3BvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRUb3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgdmFyIGVsZW1lbnRCb3R0b20gPSBlbGVtZW50VG9wICsgJCh0aGlzKS5vdXRlckhlaWdodCgpO1xuICAgICAgICB2YXIgdmlld3BvcnRUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIHZhciB2aWV3cG9ydEJvdHRvbSA9IHZpZXdwb3J0VG9wICsgJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudEJvdHRvbSA+IHZpZXdwb3J0VG9wICYmIGVsZW1lbnRUb3AgPCB2aWV3cG9ydEJvdHRvbTtcbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgaWYgaXQncyB0aW1lIHRvIHN0YXJ0IHRoZSBhbmltYXRpb24uXG4gICAgZnVuY3Rpb24gY2hlY2tBbmltYXRpb24oKSB7XG4gICAgICAgIC8vIGNsYXNzIGZvciBlbGVtZW50cyB0byBiZSBhbmltYXRlZFxuICAgICAgICAgICAgdmFyICRlbGVtID0gJCgnLmFuaW1hdGUnKTtcbiAgICAgICAgLy8gYWN0aW9ucyB0byBwZXJmb3JtIGZvciBlYWNoIGVsZW1lbnRcbiAgICAgICAgJGVsZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gaWYgYW5pbWF0aW9uIGFscmVhZHkgc3RhcnRlZCByZXR1cm5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhbmltYXRlZCcpKSByZXR1cm47XG4gICAgICAgIC8vIGNoZWNrIGlmIGluIHZpZXdwb3J0XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pc0luVmlld3BvcnQoKSkge1xuICAgICAgICAvLyBiZWdpbiBhbmltYXRpb24gaWYgbm90IHN0YXJ0ZWRcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENhcHR1cmUgc2Nyb2xsIGV2ZW50c1xuICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNoZWNrQW5pbWF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNoZWNrQW5pbWF0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAvKiBPcGVuIFRvcCBOYXYgU3ViLU1lbnUgZHJvcGRvd24gXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgalF1ZXJ5KCcucHJldmVudF9fYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLnByZXZlbnQgPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5tZW51IC5tZW51LWl0ZW0nKS5mb2N1c2luKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5zdWItbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcubWVudS1pdGVtJykuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuc2libGluZ3MoKS5maW5kKCcuc3ViLW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy50b3AtbGV2ZWwtbWVudS1pdGVtJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuc2libGluZ3MoKS5maW5kKCcuc3ViLW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuc3ViLW1lbnUnKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICB9KTtcblxuXG4gICAgLy8galF1ZXJ5KCcudG9wLWxldmVsLW1lbnUtaXRlbScpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAvLyAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgIC8vICAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCkuZmluZCgnLnN1Yi1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIC8vICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5zdWItbWVudScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cblxuICAgIC8qIE9wZW4gUHJlLU1lbnUgZHJvcGRvd24gXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgalF1ZXJ5KCcucHJlLW1lbnUtZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGpRdWVyeSgnLnByZS1tZW51LWRyb3Bkb3duLWNvbnRlbnQnKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgalF1ZXJ5KCcuYXJyb3ctLWRvd24nKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLnByZS1tZW51LWRyb3Bkb3duJykub24oJ2tleXByZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICBqUXVlcnkoJy5wcmUtbWVudS1kcm9wZG93bi1jb250ZW50JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICBqUXVlcnkoJy5hcnJvdy0tZG93bicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKiBEcm9wIEFycm93IGNvbG9yIGNoYW5nZSAmIG9wZW4gXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIGpRdWVyeSgnLmRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBqUXVlcnkodGhpcykuc2libGluZ3MoKS5maW5kKCcuZHJvcGRvd24tY29udGVudCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAvLyAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5kcm9wZG93bi1jb250ZW50JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgLy8gfSk7XG5cbiAgICBqUXVlcnkoJy5kcm9wZG93bicpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCkuZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuZHJvcGRvd24tY29udGVudCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcuZHJvcGRvd24nKS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5zaWJsaW5ncygpLmZpbmQoJy5kcm9wZG93bi1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5kcm9wZG93bi1jb250ZW50JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIENvbnRhY3QgVXMgQmFubmVyIEFjY29yZGlvbiBcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICBqUXVlcnkoJy5hY2NvcmRpb24tMScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18xJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcnJvdy0tcm90YXRlX18zJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcnJvdy0tcm90YXRlX18yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmFycm93LS1yb3RhdGVfXzEnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5hY2NvcmRpb24tMicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18yJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcnJvdy0tcm90YXRlX18xJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcnJvdy0tcm90YXRlX18zJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmFycm93LS1yb3RhdGVfXzInKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5hY2NvcmRpb24tMycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18zJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcnJvdy0tcm90YXRlX18xJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcnJvdy0tcm90YXRlX18yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmFycm93LS1yb3RhdGVfXzMnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkoJy5hY2NvcmRpb24tMScpLm9uKCdrZXlwcmVzcycsZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzEnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmFycm93LS1yb3RhdGUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLmFjY29yZGlvbi0yJykub24oJ2tleXByZXNzJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18zJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuYXJyb3ctLXJvdGF0ZScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCcuYWNjb3JkaW9uLTMnKS5vbigna2V5cHJlc3MnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgalF1ZXJ5KCcuZGVzY3JpcHRpb25fX2NvbnRlbnRfXzEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBqUXVlcnkoJy5kZXNjcmlwdGlvbl9fY29udGVudF9fMicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeSgnLmRlc2NyaXB0aW9uX19jb250ZW50X18zJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5hcnJvdy0tcm90YXRlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKiBNb2JpbGUgTWVudSBcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICBqUXVlcnkoJy5tb2JpbGVOYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcjbmF2SXRlbXMnKS50b2dnbGUoKTtcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLm1vYmlsZU5hdicpLm9uKCdrZXlwcmVzcycsZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLndoaWNoID09IDEzKSB7XG4gICAgICAgICAgICBqUXVlcnkoJyNuYXZJdGVtcycpLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKiBGQVFTIFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgICQoJy5jb2xsYXBzZS1tYWluJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnLmNvbGxhcHNlJykudG9nZ2xlKCk7XG4gICAgICAgICQodGhpcykuZmluZCgnLmFycm93LS1kb3duJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1x0XG5cbiAgICAvKiBUb2dnbGUgRmFtb3VzIEZpZ3VyZXMgY2FwdGlvbnMgXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgalF1ZXJ5KCcucmwtZ2FsbGVyeS1pdGVtJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLnJsLWdhbGxlcnktY2FwdGlvbicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcdFxuXG4gICAgalF1ZXJ5KCcucmwtZ2FsbGVyeS1pdGVtJykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLnJsLWdhbGxlcnktY2FwdGlvbicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcdFxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==