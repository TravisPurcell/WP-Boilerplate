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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/vendor/modal.js":
/*!********************************!*\
  !*** ./src/js/vendor/modal.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================
  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;
    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };
  Modal.VERSION = '3.3.7';
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };
  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };
  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', {
      relatedTarget: _relatedTarget
    });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) return;
    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');
    this.escape();
    this.resize();
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');
      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);
      that.adjustDialog();
      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');
      that.enforceFocus();
      var e = $.Event('shown.bs.modal', {
        relatedTarget: _relatedTarget
      });
      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };
  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();
    e = $.Event('hide.bs.modal');
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) return;
    this.isShown = false;
    this.escape();
    this.resize();
    $(document).off('focusin.bs.modal');
    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
    this.$dialog.off('mousedown.dismiss.bs.modal');
    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };
  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };
  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };
  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };
  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };
  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };
  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';
    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);
      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));
      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');
      if (!callback) return;
      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');
      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  };

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };
  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };
  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };
  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };
  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };
  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
  };
  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }
  var old = $.fn.modal;
  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;

  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({
      remote: !/#/.test(href) && href
    }, $target.data(), $this.data());
    if ($this.is('a')) e.preventDefault();
    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);

/***/ }),

/***/ "./src/js/vendor/slick.js":
/*!********************************!*\
  !*** ./src/js/vendor/slick.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;
(function (factory) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  'use strict';

  var Slick = window.Slick || {};
  Slick = function () {
    var instanceUid = 0;
    function Slick(element, settings) {
      var _ = this,
        dataSettings;
      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function customPaging(slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;
      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }
      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++;

      // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source
      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
      _.registerBreakpoints();
      _.init(true);
    }
    return Slick;
  }();
  Slick.prototype.activateADA = function () {
    var _ = this;
    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };
  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;
    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }
    _.unload();
    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.animateHeight = function () {
    var _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };
  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
      _ = this;
    _.animateHeight();
    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }
    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }
        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function step(now) {
            now = Math.ceil(now);
            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';
              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';
              _.$slideTrack.css(animProps);
            }
          },
          complete: function complete() {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);
        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }
        _.$slideTrack.css(animProps);
        if (callback) {
          setTimeout(function () {
            _.disableTransition();
            callback.call();
          }, _.options.speed);
        }
      }
    }
  };
  Slick.prototype.getNavTarget = function () {
    var _ = this,
      asNavFor = _.options.asNavFor;
    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }
    return asNavFor;
  };
  Slick.prototype.asNavFor = function (index) {
    var _ = this,
      asNavFor = _.getNavTarget();
    if (asNavFor !== null && _typeof(asNavFor) === 'object') {
      asNavFor.each(function () {
        var target = $(this).slick('getSlick');
        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };
  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
      transition = {};
    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.autoPlay = function () {
    var _ = this;
    _.autoPlayClear();
    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };
  Slick.prototype.autoPlayClear = function () {
    var _ = this;
    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };
  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
      slideTo = _.currentSlide + _.options.slidesToScroll;
    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;
          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }
      _.slideHandler(slideTo);
    }
  };
  Slick.prototype.buildArrows = function () {
    var _ = this;
    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');
      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }
        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }
        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {
        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };
  Slick.prototype.buildDots = function () {
    var _ = this,
      i,
      dot;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass('slick-dotted');
      dot = $('<ul />').addClass(_.options.dotsClass);
      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }
      _.$dots = dot.appendTo(_.options.appendDots);
      _.$dots.find('li').first().addClass('slick-active');
    }
  };
  Slick.prototype.buildOut = function () {
    var _ = this;
    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;
    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });
    _.$slider.addClass('slick-slider');
    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
    _.$slideTrack.css('opacity', 0);
    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }
    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
    _.setupInfinite();
    _.buildArrows();
    _.buildDots();
    _.updateDots();
    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };
  Slick.prototype.buildRows = function () {
    var _ = this,
      a,
      b,
      c,
      newSlides,
      numOfSlides,
      originalSlides,
      slidesPerSection;
    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();
    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');
        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');
          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }
          slide.appendChild(row);
        }
        newSlides.appendChild(slide);
      }
      _.$slider.empty().append(newSlides);
      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };
  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
      breakpoint,
      targetBreakpoint,
      respondToWidth,
      triggerBreakpoint = false;
    var sliderWidth = _.$slider.width();
    var windowWidth = window.innerWidth || $(window).width();
    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }
    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;
      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }
      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }
              _.refresh(initial);
            }
            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }
            _.refresh(initial);
          }
          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;
          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }
          _.refresh(initial);
          triggerBreakpoint = targetBreakpoint;
        }
      }

      // only trigger breakpoints during an actual break. not on initialize.
      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };
  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
      $target = $(event.currentTarget),
      indexOffset,
      slideOffset,
      unevenOffset;

    // If target is a link, prevent default action.
    if ($target.is('a')) {
      event.preventDefault();
    }

    // If target is not the <li> element (ie: a child), find the <li>.
    if (!$target.is('li')) {
      $target = $target.closest('li');
    }
    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
    switch (event.data.message) {
      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }
        break;
      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }
        break;
      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
        $target.children().trigger('focus');
        break;
      default:
        return;
    }
  };
  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
      navigables,
      prevNavigable;
    navigables = _.getNavigableIndexes();
    prevNavigable = 0;
    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }
        prevNavigable = navigables[n];
      }
    }
    return index;
  };
  Slick.prototype.cleanUpEvents = function () {
    var _ = this;
    if (_.options.dots && _.$dots !== null) {
      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));
      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }
    _.$slider.off('focus.slick blur.slick');
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }
    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
    _.$list.off('click.slick', _.clickHandler);
    $(document).off(_.visibilityChange, _.visibility);
    _.cleanUpSlideEvents();
    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }
    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };
  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;
    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };
  Slick.prototype.cleanUpRows = function () {
    var _ = this,
      originalSlides;
    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');
      _.$slider.empty().append(originalSlides);
    }
  };
  Slick.prototype.clickHandler = function (event) {
    var _ = this;
    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  Slick.prototype.destroy = function (refresh) {
    var _ = this;
    _.autoPlayClear();
    _.touchObject = {};
    _.cleanUpEvents();
    $('.slick-cloned', _.$slider).detach();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');
      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }
    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');
      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }
    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
        $(this).attr('style', $(this).data('originalStyling'));
      });
      _.$slideTrack.children(this.options.slide).detach();
      _.$slideTrack.detach();
      _.$list.detach();
      _.$slider.append(_.$slides);
    }
    _.cleanUpRows();
    _.$slider.removeClass('slick-slider');
    _.$slider.removeClass('slick-initialized');
    _.$slider.removeClass('slick-dotted');
    _.unslicked = true;
    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };
  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
      transition = {};
    transition[_.transitionType] = '';
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });
      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);
      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });
      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);
          callback.call();
        }, _.options.speed);
      }
    }
  };
  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {
      _.applyTransition(slideIndex);
      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };
  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;
    if (filter !== null) {
      _.$slidesCache = _.$slides;
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.focusHandler = function () {
    var _ = this;
    _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {
      event.stopImmediatePropagation();
      var $sf = $(this);
      setTimeout(function () {
        if (_.options.pauseOnFocus) {
          _.focussed = $sf.is(':focus');
          _.autoPlay();
        }
      }, 0);
    });
  };
  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;
    return _.currentSlide;
  };
  Slick.prototype.getDotCount = function () {
    var _ = this;
    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;
    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }
    return pagerQty - 1;
  };
  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
      targetLeft,
      verticalHeight,
      verticalOffset = 0,
      targetSlide,
      coef;
    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);
    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;
        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }
        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }
    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }
    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }
    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }
      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }
      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }
        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }
        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }
    return targetLeft;
  };
  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;
    return _.options[option];
  };
  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
      breakPoint = 0,
      counter = 0,
      indexes = [],
      max;
    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }
    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }
    return indexes;
  };
  Slick.prototype.getSlick = function () {
    return this;
  };
  Slick.prototype.getSlideCount = function () {
    var _ = this,
      slidesTraversed,
      swipedSlide,
      centerOffset;
    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      });
      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };
  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;
    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };
  Slick.prototype.init = function (creation) {
    var _ = this;
    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');
      _.buildRows();
      _.buildOut();
      _.setProps();
      _.startLoad();
      _.loadSlider();
      _.initializeEvents();
      _.updateArrows();
      _.updateDots();
      _.checkResponsive(true);
      _.focusHandler();
    }
    if (creation) {
      _.$slider.trigger('init', [_]);
    }
    if (_.options.accessibility === true) {
      _.initADA();
    }
    if (_.options.autoplay) {
      _.paused = false;
      _.autoPlay();
    }
  };
  Slick.prototype.initADA = function () {
    var _ = this,
      numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
      tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
        return val >= 0 && val < _.slideCount;
      });
    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });
    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });
        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });
      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
        var mappedSlideIndex = tabControlIndexes[i];
        $(this).attr({
          'role': 'presentation'
        });
        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }
    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }
    _.activateADA();
  };
  Slick.prototype.initArrowEvents = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);
      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);
      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);
        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };
  Slick.prototype.initDotEvents = function () {
    var _ = this;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);
      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }
    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };
  Slick.prototype.initSlideEvents = function () {
    var _ = this;
    if (_.options.pauseOnHover) {
      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };
  Slick.prototype.initializeEvents = function () {
    var _ = this;
    _.initArrowEvents();
    _.initDotEvents();
    _.initSlideEvents();
    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);
    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);
    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);
    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);
    _.$list.on('click.slick', _.clickHandler);
    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }
    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };
  Slick.prototype.initUI = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();
      _.$nextArrow.show();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };
  Slick.prototype.keyHandler = function (event) {
    var _ = this;
    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };
  Slick.prototype.lazyLoad = function () {
    var _ = this,
      loadRange,
      cloneRange,
      rangeStart,
      rangeEnd;
    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this),
          imageSource = $(this).attr('data-lazy'),
          imageSrcSet = $(this).attr('data-srcset'),
          imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
          imageToLoad = document.createElement('img');
        imageToLoad.onload = function () {
          image.animate({
            opacity: 0
          }, 100, function () {
            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);
              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }
            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function () {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });
            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };
        imageToLoad.onerror = function () {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');
          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };
        imageToLoad.src = imageSource;
      });
    }
    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }
    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
        nextSlide = rangeEnd,
        $slides = _.$slider.find('.slick-slide');
      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }
    loadImages(loadRange);
    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };
  Slick.prototype.loadSlider = function () {
    var _ = this;
    _.setPosition();
    _.$slideTrack.css({
      opacity: 1
    });
    _.$slider.removeClass('slick-loading');
    _.initUI();
    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };
  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;
    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };
  Slick.prototype.orientationChange = function () {
    var _ = this;
    _.checkResponsive();
    _.setPosition();
  };
  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;
    _.autoPlayClear();
    _.paused = true;
  };
  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;
    _.autoPlay();
    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };
  Slick.prototype.postSlide = function (index) {
    var _ = this;
    if (!_.unslicked) {
      _.$slider.trigger('afterChange', [_, index]);
      _.animating = false;
      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }
      _.swipeLeft = null;
      if (_.options.autoplay) {
        _.autoPlay();
      }
      if (_.options.accessibility === true) {
        _.initADA();
        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };
  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;
    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };
  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };
  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;
    var _ = this,
      $imgsToLoad = $('img[data-lazy]', _.$slider),
      image,
      imageSource,
      imageSrcSet,
      imageSizes,
      imageToLoad;
    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');
      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);
          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }
        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }
        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
        _.progressiveLazyLoad();
      };
      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');
          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
          _.progressiveLazyLoad();
        }
      };
      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };
  Slick.prototype.refresh = function (initializing) {
    var _ = this,
      currentSlide,
      lastVisibleIndex;
    lastVisibleIndex = _.slideCount - _.options.slidesToShow;

    // in non-infinite sliders, we don't want to go past the
    // last visible index.
    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    }

    // if less slides than to show, go to start.
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    currentSlide = _.currentSlide;
    _.destroy(true);
    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });
    _.init();
    if (!initializing) {
      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };
  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
      breakpoint,
      currentBreakpoint,
      l,
      responsiveSettings = _.options.responsive || null;
    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || 'window';
      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

          // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.
          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }
            l--;
          }
          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }
      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };
  Slick.prototype.reinit = function () {
    var _ = this;
    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;
    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    _.registerBreakpoints();
    _.setProps();
    _.setupInfinite();
    _.buildArrows();
    _.updateArrows();
    _.initArrowEvents();
    _.buildDots();
    _.updateDots();
    _.initDotEvents();
    _.cleanUpSlideEvents();
    _.initSlideEvents();
    _.checkResponsive(false, true);
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }
    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
    _.setPosition();
    _.focusHandler();
    _.paused = !_.options.autoplay;
    _.autoPlay();
    _.$slider.trigger('reInit', [_]);
  };
  Slick.prototype.resize = function () {
    var _ = this;
    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();
        _.checkResponsive();
        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };
  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;
    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }
    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }
    _.unload();
    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.setCSS = function (position) {
    var _ = this,
      positionProps = {},
      x,
      y;
    if (_.options.rtl === true) {
      position = -position;
    }
    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;
    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};
      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
        _.$slideTrack.css(positionProps);
      }
    }
  };
  Slick.prototype.setDimensions = function () {
    var _ = this;
    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }
    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();
    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);
      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }
    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };
  Slick.prototype.setFade = function () {
    var _ = this,
      targetLeft;
    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;
      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });
    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };
  Slick.prototype.setHeight = function () {
    var _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.css('height', targetHeight);
    }
  };
  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */

    var _ = this,
      l,
      item,
      option,
      value,
      refresh = false,
      type;
    if ($.type(arguments[0]) === 'object') {
      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];
      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {
        type = 'single';
      }
    }
    if (type === 'single') {
      _.options[option] = value;
    } else if (type === 'multiple') {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === 'responsive') {
      for (item in value) {
        if ($.type(_.options.responsive) !== 'array') {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1;

          // loop through the responsive object and splice out duplicates.
          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }
            l--;
          }
          _.options.responsive.push(value[item]);
        }
      }
    }
    if (refresh) {
      _.unload();
      _.reinit();
    }
  };
  Slick.prototype.setPosition = function () {
    var _ = this;
    _.setDimensions();
    _.setHeight();
    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }
    _.$slider.trigger('setPosition', [_]);
  };
  Slick.prototype.setProps = function () {
    var _ = this,
      bodyStyle = document.body.style;
    _.positionProp = _.options.vertical === true ? 'top' : 'left';
    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }
    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }
    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }
    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }
    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }
    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };
  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
      centerOffset,
      allSlides,
      indexOffset,
      remainder;
    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');
    _.$slides.eq(index).addClass('slick-current');
    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);
      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }
        if (index === 0) {
          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }
      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }
    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };
  Slick.prototype.setupInfinite = function () {
    var _ = this,
      i,
      slideIndex,
      infiniteCount;
    if (_.options.fade === true) {
      _.options.centerMode = false;
    }
    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;
      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }
        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }
        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }
        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };
  Slick.prototype.interrupt = function (toggle) {
    var _ = this;
    if (!toggle) {
      _.autoPlay();
    }
    _.interrupted = toggle;
  };
  Slick.prototype.selectHandler = function (event) {
    var _ = this;
    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index) index = 0;
    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);
      return;
    }
    _.slideHandler(index);
  };
  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
      animSlide,
      oldSlide,
      slideLeft,
      targetLeft = null,
      _ = this,
      navTarget;
    sync = sync || false;
    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }
    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }
    if (sync === false) {
      _.asNavFor(index);
    }
    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    }
    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }
    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }
    _.animating = true;
    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;
    _.setSlideClasses(_.currentSlide);
    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');
      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }
    _.updateDots();
    _.updateArrows();
    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);
        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }
      _.animateHeight();
      return;
    }
    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };
  Slick.prototype.startLoad = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();
      _.$nextArrow.hide();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }
    _.$slider.addClass('slick-loading');
  };
  Slick.prototype.swipeDirection = function () {
    var xDist,
      yDist,
      r,
      swipeAngle,
      _ = this;
    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }
    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }
    return 'vertical';
  };
  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
      slideCount,
      direction;
    _.dragging = false;
    _.swiping = false;
    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }
    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
    if (_.touchObject.curX === undefined) {
      return false;
    }
    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }
    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();
      switch (direction) {
        case 'left':
        case 'down':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;
        case 'right':
        case 'up':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;
        default:
      }
      if (direction != 'vertical') {
        _.slideHandler(slideCount);
        _.touchObject = {};
        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);
        _.touchObject = {};
      }
    }
  };
  Slick.prototype.swipeHandler = function (event) {
    var _ = this;
    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }
    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }
    switch (event.data.action) {
      case 'start':
        _.swipeStart(event);
        break;
      case 'move':
        _.swipeMove(event);
        break;
      case 'end':
        _.swipeEnd(event);
        break;
    }
  };
  Slick.prototype.swipeMove = function (event) {
    var _ = this,
      edgeWasHit = false,
      curLeft,
      swipeDirection,
      swipeLength,
      positionOffset,
      touches,
      verticalSwipeLength;
    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }
    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }
    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }
    swipeDirection = _.swipeDirection();
    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }
    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }
    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;
    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }
    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }
    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }
    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }
    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }
    _.setCSS(_.swipeLeft);
  };
  Slick.prototype.swipeStart = function (event) {
    var _ = this,
      touches;
    _.interrupted = true;
    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }
    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }
    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };
  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;
    if (_.$slidesCache !== null) {
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.unload = function () {
    var _ = this;
    $('.slick-cloned', _.$slider).remove();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }
    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }
    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };
  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;
    _.$slider.trigger('unslick', [_, fromBreakpoint]);
    _.destroy();
  };
  Slick.prototype.updateArrows = function () {
    var _ = this,
      centerOffset;
    centerOffset = Math.floor(_.options.slidesToShow / 2);
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };
  Slick.prototype.updateDots = function () {
    var _ = this;
    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').end();
      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };
  Slick.prototype.visibility = function () {
    var _ = this;
    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };
  $.fn.slick = function () {
    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;
    for (i = 0; i < l; i++) {
      if (_typeof(opt) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }
    return _;
  };
});

/***/ }),

/***/ "./src/js/vendor/tab.js":
/*!******************************!*\
  !*** ./src/js/vendor/tab.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================
  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element);
    // jscs:enable requireDollarBeforejQueryAssignment
  };

  Tab.VERSION = '3.3.7';
  Tab.TRANSITION_DURATION = 150;
  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;
    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });
    $previous.trigger(hideEvent);
    $this.trigger(showEvent);
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
    var $target = $(selector);
    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };
  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);
    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);
      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }
      if (element.parent('.dropdown-menu').length) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }
      callback && callback();
    }
    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
    $active.removeClass('in');
  };

  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }
  var old = $.fn.tab;
  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;

  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };

  // TAB DATA-API
  // ============

  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };
  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);

/***/ }),

/***/ "./src/js/vendor/vendor.js":
/*!*********************************!*\
  !*** ./src/js/vendor/vendor.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slick */ "./src/js/vendor/slick.js");
/* harmony import */ var _slick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slick__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/vendor/modal.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab */ "./src/js/vendor/tab.js");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tab__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./src/js/vendor/vendor.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/lightstream_station14/vvv-local/www/bp-102/public_html/wp-content/themes/splash/src/js/vendor/vendor.js */"./src/js/vendor/vendor.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlbmRvci9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVuZG9yL3NsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZW5kb3IvdGFiLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZW5kb3IvdmVuZG9yLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbIiQiLCJNb2RhbCIsImVsZW1lbnQiLCJvcHRpb25zIiwiJGJvZHkiLCJkb2N1bWVudCIsImJvZHkiLCIkZWxlbWVudCIsIiRkaWFsb2ciLCJmaW5kIiwiJGJhY2tkcm9wIiwiaXNTaG93biIsIm9yaWdpbmFsQm9keVBhZCIsInNjcm9sbGJhcldpZHRoIiwiaWdub3JlQmFja2Ryb3BDbGljayIsInJlbW90ZSIsImxvYWQiLCJwcm94eSIsInRyaWdnZXIiLCJWRVJTSU9OIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJERUZBVUxUUyIsImJhY2tkcm9wIiwia2V5Ym9hcmQiLCJzaG93IiwicHJvdG90eXBlIiwidG9nZ2xlIiwiX3JlbGF0ZWRUYXJnZXQiLCJoaWRlIiwidGhhdCIsImUiLCJFdmVudCIsInJlbGF0ZWRUYXJnZXQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJjaGVja1Njcm9sbGJhciIsInNldFNjcm9sbGJhciIsImFkZENsYXNzIiwiZXNjYXBlIiwicmVzaXplIiwib24iLCJvbmUiLCJ0YXJnZXQiLCJpcyIsInRyYW5zaXRpb24iLCJzdXBwb3J0IiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJsZW5ndGgiLCJhcHBlbmRUbyIsInNjcm9sbFRvcCIsImFkanVzdERpYWxvZyIsIm9mZnNldFdpZHRoIiwiZW5mb3JjZUZvY3VzIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJwcmV2ZW50RGVmYXVsdCIsIm9mZiIsInJlbW92ZUNsYXNzIiwiaGlkZU1vZGFsIiwiaGFzIiwid2hpY2giLCJ3aW5kb3ciLCJoYW5kbGVVcGRhdGUiLCJyZXNldEFkanVzdG1lbnRzIiwicmVzZXRTY3JvbGxiYXIiLCJyZW1vdmVCYWNrZHJvcCIsInJlbW92ZSIsImNhbGxiYWNrIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsYmFja1JlbW92ZSIsIm1vZGFsSXNPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsImNzcyIsInBhZGRpbmdMZWZ0IiwiYm9keUlzT3ZlcmZsb3dpbmciLCJwYWRkaW5nUmlnaHQiLCJmdWxsV2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiTWF0aCIsImFicyIsImxlZnQiLCJjbGllbnRXaWR0aCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJzdHlsZSIsInNjcm9sbERpdiIsImNsYXNzTmFtZSIsImFwcGVuZCIsInJlbW92ZUNoaWxkIiwiUGx1Z2luIiwib3B0aW9uIiwiZWFjaCIsIiR0aGlzIiwiZGF0YSIsImV4dGVuZCIsIl90eXBlb2YiLCJvbGQiLCJmbiIsIm1vZGFsIiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0IiwiaHJlZiIsImF0dHIiLCIkdGFyZ2V0IiwicmVwbGFjZSIsInRlc3QiLCJzaG93RXZlbnQiLCJjYWxsIiwialF1ZXJ5IiwiZmFjdG9yeSIsImRlZmluZSIsIlNsaWNrIiwiaW5zdGFuY2VVaWQiLCJzZXR0aW5ncyIsIl8iLCJkYXRhU2V0dGluZ3MiLCJkZWZhdWx0cyIsImFjY2Vzc2liaWxpdHkiLCJhZGFwdGl2ZUhlaWdodCIsImFwcGVuZEFycm93cyIsImFwcGVuZERvdHMiLCJhcnJvd3MiLCJhc05hdkZvciIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsImNlbnRlck1vZGUiLCJjZW50ZXJQYWRkaW5nIiwiY3NzRWFzZSIsImN1c3RvbVBhZ2luZyIsInNsaWRlciIsImkiLCJ0ZXh0IiwiZG90cyIsImRvdHNDbGFzcyIsImRyYWdnYWJsZSIsImVhc2luZyIsImVkZ2VGcmljdGlvbiIsImZhZGUiLCJmb2N1c09uU2VsZWN0IiwiZm9jdXNPbkNoYW5nZSIsImluZmluaXRlIiwiaW5pdGlhbFNsaWRlIiwibGF6eUxvYWQiLCJtb2JpbGVGaXJzdCIsInBhdXNlT25Ib3ZlciIsInBhdXNlT25Gb2N1cyIsInBhdXNlT25Eb3RzSG92ZXIiLCJyZXNwb25kVG8iLCJyZXNwb25zaXZlIiwicm93cyIsInJ0bCIsInNsaWRlIiwic2xpZGVzUGVyUm93Iiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJzcGVlZCIsInN3aXBlIiwic3dpcGVUb1NsaWRlIiwidG91Y2hNb3ZlIiwidG91Y2hUaHJlc2hvbGQiLCJ1c2VDU1MiLCJ1c2VUcmFuc2Zvcm0iLCJ2YXJpYWJsZVdpZHRoIiwidmVydGljYWwiLCJ2ZXJ0aWNhbFN3aXBpbmciLCJ3YWl0Rm9yQW5pbWF0ZSIsInpJbmRleCIsImluaXRpYWxzIiwiYW5pbWF0aW5nIiwiZHJhZ2dpbmciLCJhdXRvUGxheVRpbWVyIiwiY3VycmVudERpcmVjdGlvbiIsImN1cnJlbnRMZWZ0IiwiY3VycmVudFNsaWRlIiwiZGlyZWN0aW9uIiwiJGRvdHMiLCJsaXN0V2lkdGgiLCJsaXN0SGVpZ2h0IiwibG9hZEluZGV4IiwiJG5leHRBcnJvdyIsIiRwcmV2QXJyb3ciLCJzY3JvbGxpbmciLCJzbGlkZUNvdW50Iiwic2xpZGVXaWR0aCIsIiRzbGlkZVRyYWNrIiwiJHNsaWRlcyIsInNsaWRpbmciLCJzbGlkZU9mZnNldCIsInN3aXBlTGVmdCIsInN3aXBpbmciLCIkbGlzdCIsInRvdWNoT2JqZWN0IiwidHJhbnNmb3Jtc0VuYWJsZWQiLCJ1bnNsaWNrZWQiLCJhY3RpdmVCcmVha3BvaW50IiwiYW5pbVR5cGUiLCJhbmltUHJvcCIsImJyZWFrcG9pbnRzIiwiYnJlYWtwb2ludFNldHRpbmdzIiwiY3NzVHJhbnNpdGlvbnMiLCJmb2N1c3NlZCIsImludGVycnVwdGVkIiwiaGlkZGVuIiwicGF1c2VkIiwicG9zaXRpb25Qcm9wIiwicm93Q291bnQiLCJzaG91bGRDbGljayIsIiRzbGlkZXIiLCIkc2xpZGVzQ2FjaGUiLCJ0cmFuc2Zvcm1UeXBlIiwidHJhbnNpdGlvblR5cGUiLCJ2aXNpYmlsaXR5Q2hhbmdlIiwid2luZG93V2lkdGgiLCJ3aW5kb3dUaW1lciIsIm9yaWdpbmFsU2V0dGluZ3MiLCJtb3pIaWRkZW4iLCJ3ZWJraXRIaWRkZW4iLCJhdXRvUGxheSIsImF1dG9QbGF5Q2xlYXIiLCJhdXRvUGxheUl0ZXJhdG9yIiwiY2hhbmdlU2xpZGUiLCJjbGlja0hhbmRsZXIiLCJzZWxlY3RIYW5kbGVyIiwic2V0UG9zaXRpb24iLCJzd2lwZUhhbmRsZXIiLCJkcmFnSGFuZGxlciIsImtleUhhbmRsZXIiLCJodG1sRXhwciIsInJlZ2lzdGVyQnJlYWtwb2ludHMiLCJpbml0IiwiYWN0aXZhdGVBREEiLCJhZGRTbGlkZSIsInNsaWNrQWRkIiwibWFya3VwIiwiaW5kZXgiLCJhZGRCZWZvcmUiLCJ1bmxvYWQiLCJpbnNlcnRCZWZvcmUiLCJlcSIsImluc2VydEFmdGVyIiwicHJlcGVuZFRvIiwiY2hpbGRyZW4iLCJkZXRhY2giLCJyZWluaXQiLCJhbmltYXRlSGVpZ2h0IiwidGFyZ2V0SGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJoZWlnaHQiLCJhbmltYXRlU2xpZGUiLCJ0YXJnZXRMZWZ0IiwiYW5pbVByb3BzIiwidG9wIiwiYW5pbVN0YXJ0IiwiZHVyYXRpb24iLCJzdGVwIiwibm93IiwiY2VpbCIsImNvbXBsZXRlIiwiYXBwbHlUcmFuc2l0aW9uIiwic2V0VGltZW91dCIsImRpc2FibGVUcmFuc2l0aW9uIiwiZ2V0TmF2VGFyZ2V0Iiwibm90Iiwic2xpY2siLCJzbGlkZUhhbmRsZXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzbGlkZVRvIiwiYnVpbGRBcnJvd3MiLCJyZW1vdmVBdHRyIiwiYWRkIiwiYnVpbGREb3RzIiwiZG90IiwiZ2V0RG90Q291bnQiLCJmaXJzdCIsImJ1aWxkT3V0Iiwid3JhcEFsbCIsIndyYXAiLCJzZXR1cEluZmluaXRlIiwidXBkYXRlRG90cyIsInNldFNsaWRlQ2xhc3NlcyIsImJ1aWxkUm93cyIsImEiLCJiIiwiYyIsIm5ld1NsaWRlcyIsIm51bU9mU2xpZGVzIiwib3JpZ2luYWxTbGlkZXMiLCJzbGlkZXNQZXJTZWN0aW9uIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsInJvdyIsImdldCIsImFwcGVuZENoaWxkIiwiZW1wdHkiLCJjaGVja1Jlc3BvbnNpdmUiLCJpbml0aWFsIiwiZm9yY2VVcGRhdGUiLCJicmVha3BvaW50IiwidGFyZ2V0QnJlYWtwb2ludCIsInJlc3BvbmRUb1dpZHRoIiwidHJpZ2dlckJyZWFrcG9pbnQiLCJzbGlkZXJXaWR0aCIsIndpZHRoIiwibWluIiwiaGFzT3duUHJvcGVydHkiLCJ1bnNsaWNrIiwicmVmcmVzaCIsImV2ZW50IiwiZG9udEFuaW1hdGUiLCJpbmRleE9mZnNldCIsInVuZXZlbk9mZnNldCIsImNsb3Nlc3QiLCJtZXNzYWdlIiwiY2hlY2tOYXZpZ2FibGUiLCJuYXZpZ2FibGVzIiwicHJldk5hdmlnYWJsZSIsImdldE5hdmlnYWJsZUluZGV4ZXMiLCJuIiwiY2xlYW5VcEV2ZW50cyIsImludGVycnVwdCIsInZpc2liaWxpdHkiLCJjbGVhblVwU2xpZGVFdmVudHMiLCJvcmllbnRhdGlvbkNoYW5nZSIsImNsZWFuVXBSb3dzIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiZGVzdHJveSIsImZhZGVTbGlkZSIsInNsaWRlSW5kZXgiLCJvcGFjaXR5IiwiZmFkZVNsaWRlT3V0IiwiZmlsdGVyU2xpZGVzIiwic2xpY2tGaWx0ZXIiLCJmaWx0ZXIiLCJmb2N1c0hhbmRsZXIiLCIkc2YiLCJnZXRDdXJyZW50Iiwic2xpY2tDdXJyZW50U2xpZGUiLCJicmVha1BvaW50IiwiY291bnRlciIsInBhZ2VyUXR5IiwiZ2V0TGVmdCIsInZlcnRpY2FsSGVpZ2h0IiwidmVydGljYWxPZmZzZXQiLCJ0YXJnZXRTbGlkZSIsImNvZWYiLCJmbG9vciIsIm9mZnNldExlZnQiLCJvdXRlcldpZHRoIiwiZ2V0T3B0aW9uIiwic2xpY2tHZXRPcHRpb24iLCJpbmRleGVzIiwibWF4IiwicHVzaCIsImdldFNsaWNrIiwiZ2V0U2xpZGVDb3VudCIsInNsaWRlc1RyYXZlcnNlZCIsInN3aXBlZFNsaWRlIiwiY2VudGVyT2Zmc2V0IiwiZ29UbyIsInNsaWNrR29UbyIsImNyZWF0aW9uIiwic2V0UHJvcHMiLCJzdGFydExvYWQiLCJsb2FkU2xpZGVyIiwiaW5pdGlhbGl6ZUV2ZW50cyIsInVwZGF0ZUFycm93cyIsImluaXRBREEiLCJudW1Eb3RHcm91cHMiLCJ0YWJDb250cm9sSW5kZXhlcyIsInZhbCIsInNsaWRlQ29udHJvbEluZGV4IiwiaW5kZXhPZiIsImFyaWFCdXR0b25Db250cm9sIiwibWFwcGVkU2xpZGVJbmRleCIsImVuZCIsImluaXRBcnJvd0V2ZW50cyIsImluaXREb3RFdmVudHMiLCJpbml0U2xpZGVFdmVudHMiLCJhY3Rpb24iLCJpbml0VUkiLCJ0YWdOYW1lIiwibWF0Y2giLCJrZXlDb2RlIiwibG9hZFJhbmdlIiwiY2xvbmVSYW5nZSIsInJhbmdlU3RhcnQiLCJyYW5nZUVuZCIsImxvYWRJbWFnZXMiLCJpbWFnZXNTY29wZSIsImltYWdlIiwiaW1hZ2VTb3VyY2UiLCJpbWFnZVNyY1NldCIsImltYWdlU2l6ZXMiLCJpbWFnZVRvTG9hZCIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJzbGljZSIsInByZXZTbGlkZSIsIm5leHRTbGlkZSIsInByb2dyZXNzaXZlTGF6eUxvYWQiLCJuZXh0Iiwic2xpY2tOZXh0IiwicGF1c2UiLCJzbGlja1BhdXNlIiwicGxheSIsInNsaWNrUGxheSIsInBvc3RTbGlkZSIsIiRjdXJyZW50U2xpZGUiLCJwcmV2Iiwic2xpY2tQcmV2IiwidHJ5Q291bnQiLCIkaW1nc1RvTG9hZCIsImluaXRpYWxpemluZyIsImxhc3RWaXNpYmxlSW5kZXgiLCJjdXJyZW50QnJlYWtwb2ludCIsImwiLCJyZXNwb25zaXZlU2V0dGluZ3MiLCJ0eXBlIiwic3BsaWNlIiwic29ydCIsImNsZWFyVGltZW91dCIsIndpbmRvd0RlbGF5IiwicmVtb3ZlU2xpZGUiLCJzbGlja1JlbW92ZSIsInJlbW92ZUJlZm9yZSIsInJlbW92ZUFsbCIsInNldENTUyIsInBvc2l0aW9uIiwicG9zaXRpb25Qcm9wcyIsIngiLCJ5Iiwic2V0RGltZW5zaW9ucyIsInBhZGRpbmciLCJvZmZzZXQiLCJzZXRGYWRlIiwic2V0SGVpZ2h0Iiwic2V0T3B0aW9uIiwic2xpY2tTZXRPcHRpb24iLCJpdGVtIiwidmFsdWUiLCJhcmd1bWVudHMiLCJvcHQiLCJib2R5U3R5bGUiLCJXZWJraXRUcmFuc2l0aW9uIiwidW5kZWZpbmVkIiwiTW96VHJhbnNpdGlvbiIsIm1zVHJhbnNpdGlvbiIsIk9UcmFuc2Zvcm0iLCJwZXJzcGVjdGl2ZVByb3BlcnR5Iiwid2Via2l0UGVyc3BlY3RpdmUiLCJNb3pUcmFuc2Zvcm0iLCJNb3pQZXJzcGVjdGl2ZSIsIndlYmtpdFRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwidHJhbnNmb3JtIiwiYWxsU2xpZGVzIiwicmVtYWluZGVyIiwiZXZlbkNvZWYiLCJpbmZpbml0ZUNvdW50IiwiY2xvbmUiLCJ0YXJnZXRFbGVtZW50IiwicGFyZW50cyIsInN5bmMiLCJhbmltU2xpZGUiLCJvbGRTbGlkZSIsInNsaWRlTGVmdCIsIm5hdlRhcmdldCIsInN3aXBlRGlyZWN0aW9uIiwieERpc3QiLCJ5RGlzdCIsInIiLCJzd2lwZUFuZ2xlIiwic3RhcnRYIiwiY3VyWCIsInN0YXJ0WSIsImN1clkiLCJhdGFuMiIsInJvdW5kIiwiUEkiLCJzd2lwZUVuZCIsInN3aXBlTGVuZ3RoIiwiZWRnZUhpdCIsIm1pblN3aXBlIiwiZmluZ2VyQ291bnQiLCJvcmlnaW5hbEV2ZW50IiwidG91Y2hlcyIsInN3aXBlU3RhcnQiLCJzd2lwZU1vdmUiLCJlZGdlV2FzSGl0IiwiY3VyTGVmdCIsInBvc2l0aW9uT2Zmc2V0IiwidmVydGljYWxTd2lwZUxlbmd0aCIsInBhZ2VYIiwiY2xpZW50WCIsInBhZ2VZIiwiY2xpZW50WSIsInNxcnQiLCJwb3ciLCJ1bmZpbHRlclNsaWRlcyIsInNsaWNrVW5maWx0ZXIiLCJmcm9tQnJlYWtwb2ludCIsImFyZ3MiLCJBcnJheSIsInJldCIsImFwcGx5IiwiVGFiIiwiJHVsIiwic2VsZWN0b3IiLCIkcHJldmlvdXMiLCJoaWRlRXZlbnQiLCJhY3RpdmF0ZSIsImNvbnRhaW5lciIsIiRhY3RpdmUiLCJ0YWIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsQ0FBQyxVQUFVQSxDQUFDLEVBQUU7RUFDWixZQUFZOztFQUVaO0VBQ0E7RUFFQSxJQUFJQyxLQUFLLEdBQUcsU0FBUkEsS0FBS0EsQ0FBYUMsT0FBTyxFQUFFQyxPQUFPLEVBQUU7SUFDdEMsSUFBSSxDQUFDQSxPQUFPLEdBQWVBLE9BQU87SUFDbEMsSUFBSSxDQUFDQyxLQUFLLEdBQWlCSixDQUFDLENBQUNLLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDO0lBQzNDLElBQUksQ0FBQ0MsUUFBUSxHQUFjUCxDQUFDLENBQUNFLE9BQU8sQ0FBQztJQUNyQyxJQUFJLENBQUNNLE9BQU8sR0FBZSxJQUFJLENBQUNELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5RCxJQUFJLENBQUNDLFNBQVMsR0FBYSxJQUFJO0lBQy9CLElBQUksQ0FBQ0MsT0FBTyxHQUFlLElBQUk7SUFDL0IsSUFBSSxDQUFDQyxlQUFlLEdBQU8sSUFBSTtJQUMvQixJQUFJLENBQUNDLGNBQWMsR0FBUSxDQUFDO0lBQzVCLElBQUksQ0FBQ0MsbUJBQW1CLEdBQUcsS0FBSztJQUVoQyxJQUFJLElBQUksQ0FBQ1gsT0FBTyxDQUFDWSxNQUFNLEVBQUU7TUFDdkIsSUFBSSxDQUFDUixRQUFRLENBQ1ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUN0Qk8sSUFBSSxDQUFDLElBQUksQ0FBQ2IsT0FBTyxDQUFDWSxNQUFNLEVBQUVmLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQyxZQUFZO1FBQzdDLElBQUksQ0FBQ1YsUUFBUSxDQUFDVyxPQUFPLENBQUMsaUJBQWlCLENBQUM7TUFDMUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2I7RUFDRixDQUFDO0VBRURqQixLQUFLLENBQUNrQixPQUFPLEdBQUksT0FBTztFQUV4QmxCLEtBQUssQ0FBQ21CLG1CQUFtQixHQUFHLEdBQUc7RUFDL0JuQixLQUFLLENBQUNvQiw0QkFBNEIsR0FBRyxHQUFHO0VBRXhDcEIsS0FBSyxDQUFDcUIsUUFBUSxHQUFHO0lBQ2ZDLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLElBQUksRUFBRTtFQUNSLENBQUM7RUFFRHhCLEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ0MsTUFBTSxHQUFHLFVBQVVDLGNBQWMsRUFBRTtJQUNqRCxPQUFPLElBQUksQ0FBQ2pCLE9BQU8sR0FBRyxJQUFJLENBQUNrQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUNKLElBQUksQ0FBQ0csY0FBYyxDQUFDO0VBQy9ELENBQUM7RUFFRDNCLEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ0QsSUFBSSxHQUFHLFVBQVVHLGNBQWMsRUFBRTtJQUMvQyxJQUFJRSxJQUFJLEdBQUcsSUFBSTtJQUNmLElBQUlDLENBQUMsR0FBTS9CLENBQUMsQ0FBQ2dDLEtBQUssQ0FBQyxlQUFlLEVBQUU7TUFBRUMsYUFBYSxFQUFFTDtJQUFlLENBQUMsQ0FBQztJQUV0RSxJQUFJLENBQUNyQixRQUFRLENBQUNXLE9BQU8sQ0FBQ2EsQ0FBQyxDQUFDO0lBRXhCLElBQUksSUFBSSxDQUFDcEIsT0FBTyxJQUFJb0IsQ0FBQyxDQUFDRyxrQkFBa0IsRUFBRSxFQUFFO0lBRTVDLElBQUksQ0FBQ3ZCLE9BQU8sR0FBRyxJQUFJO0lBRW5CLElBQUksQ0FBQ3dCLGNBQWMsRUFBRTtJQUNyQixJQUFJLENBQUNDLFlBQVksRUFBRTtJQUNuQixJQUFJLENBQUNoQyxLQUFLLENBQUNpQyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBRWpDLElBQUksQ0FBQ0MsTUFBTSxFQUFFO0lBQ2IsSUFBSSxDQUFDQyxNQUFNLEVBQUU7SUFFYixJQUFJLENBQUNoQyxRQUFRLENBQUNpQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUV4QyxDQUFDLENBQUNpQixLQUFLLENBQUMsSUFBSSxDQUFDWSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFOUYsSUFBSSxDQUFDckIsT0FBTyxDQUFDZ0MsRUFBRSxDQUFDLDRCQUE0QixFQUFFLFlBQVk7TUFDeERWLElBQUksQ0FBQ3ZCLFFBQVEsQ0FBQ2tDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxVQUFVVixDQUFDLEVBQUU7UUFDekQsSUFBSS9CLENBQUMsQ0FBQytCLENBQUMsQ0FBQ1csTUFBTSxDQUFDLENBQUNDLEVBQUUsQ0FBQ2IsSUFBSSxDQUFDdkIsUUFBUSxDQUFDLEVBQUV1QixJQUFJLENBQUNoQixtQkFBbUIsR0FBRyxJQUFJO01BQ3BFLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ1MsUUFBUSxDQUFDLFlBQVk7TUFDeEIsSUFBSXFCLFVBQVUsR0FBRzVDLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQ0QsVUFBVSxJQUFJZCxJQUFJLENBQUN2QixRQUFRLENBQUN1QyxRQUFRLENBQUMsTUFBTSxDQUFDO01BRXZFLElBQUksQ0FBQ2hCLElBQUksQ0FBQ3ZCLFFBQVEsQ0FBQ3dDLE1BQU0sRUFBRSxDQUFDQyxNQUFNLEVBQUU7UUFDbENsQixJQUFJLENBQUN2QixRQUFRLENBQUMwQyxRQUFRLENBQUNuQixJQUFJLENBQUMxQixLQUFLLENBQUMsRUFBQztNQUNyQzs7TUFFQTBCLElBQUksQ0FBQ3ZCLFFBQVEsQ0FDVmtCLElBQUksRUFBRSxDQUNOeUIsU0FBUyxDQUFDLENBQUMsQ0FBQztNQUVmcEIsSUFBSSxDQUFDcUIsWUFBWSxFQUFFO01BRW5CLElBQUlQLFVBQVUsRUFBRTtRQUNkZCxJQUFJLENBQUN2QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM2QyxXQUFXLEVBQUM7TUFDL0I7O01BRUF0QixJQUFJLENBQUN2QixRQUFRLENBQUM4QixRQUFRLENBQUMsSUFBSSxDQUFDO01BRTVCUCxJQUFJLENBQUN1QixZQUFZLEVBQUU7TUFFbkIsSUFBSXRCLENBQUMsR0FBRy9CLENBQUMsQ0FBQ2dDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUFFQyxhQUFhLEVBQUVMO01BQWUsQ0FBQyxDQUFDO01BRXBFZ0IsVUFBVSxHQUNSZCxJQUFJLENBQUN0QixPQUFPLENBQUM7TUFBQSxDQUNWaUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFlBQVk7UUFDbENYLElBQUksQ0FBQ3ZCLFFBQVEsQ0FBQ1csT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDQSxPQUFPLENBQUNhLENBQUMsQ0FBQztNQUMzQyxDQUFDLENBQUMsQ0FDRHVCLG9CQUFvQixDQUFDckQsS0FBSyxDQUFDbUIsbUJBQW1CLENBQUMsR0FDbERVLElBQUksQ0FBQ3ZCLFFBQVEsQ0FBQ1csT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDQSxPQUFPLENBQUNhLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7RUFDSixDQUFDO0VBRUQ5QixLQUFLLENBQUN5QixTQUFTLENBQUNHLElBQUksR0FBRyxVQUFVRSxDQUFDLEVBQUU7SUFDbEMsSUFBSUEsQ0FBQyxFQUFFQSxDQUFDLENBQUN3QixjQUFjLEVBQUU7SUFFekJ4QixDQUFDLEdBQUcvQixDQUFDLENBQUNnQyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBRTVCLElBQUksQ0FBQ3pCLFFBQVEsQ0FBQ1csT0FBTyxDQUFDYSxDQUFDLENBQUM7SUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQ3BCLE9BQU8sSUFBSW9CLENBQUMsQ0FBQ0csa0JBQWtCLEVBQUUsRUFBRTtJQUU3QyxJQUFJLENBQUN2QixPQUFPLEdBQUcsS0FBSztJQUVwQixJQUFJLENBQUMyQixNQUFNLEVBQUU7SUFDYixJQUFJLENBQUNDLE1BQU0sRUFBRTtJQUVidkMsQ0FBQyxDQUFDSyxRQUFRLENBQUMsQ0FBQ21ELEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztJQUVuQyxJQUFJLENBQUNqRCxRQUFRLENBQ1ZrRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQ2pCRCxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FDN0JBLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztJQUVsQyxJQUFJLENBQUNoRCxPQUFPLENBQUNnRCxHQUFHLENBQUMsNEJBQTRCLENBQUM7SUFFOUN4RCxDQUFDLENBQUM2QyxPQUFPLENBQUNELFVBQVUsSUFBSSxJQUFJLENBQUNyQyxRQUFRLENBQUN1QyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQ3BELElBQUksQ0FBQ3ZDLFFBQVEsQ0FDVmtDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRXpDLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQyxJQUFJLENBQUN5QyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDckRKLG9CQUFvQixDQUFDckQsS0FBSyxDQUFDbUIsbUJBQW1CLENBQUMsR0FDbEQsSUFBSSxDQUFDc0MsU0FBUyxFQUFFO0VBQ3BCLENBQUM7RUFFRHpELEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQzJCLFlBQVksR0FBRyxZQUFZO0lBQ3pDckQsQ0FBQyxDQUFDSyxRQUFRLENBQUMsQ0FDUm1ELEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQUEsQ0FDeEJoQixFQUFFLENBQUMsa0JBQWtCLEVBQUV4QyxDQUFDLENBQUNpQixLQUFLLENBQUMsVUFBVWMsQ0FBQyxFQUFFO01BQzNDLElBQUkxQixRQUFRLEtBQUswQixDQUFDLENBQUNXLE1BQU0sSUFDckIsSUFBSSxDQUFDbkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLd0IsQ0FBQyxDQUFDVyxNQUFNLElBQzdCLENBQUMsSUFBSSxDQUFDbkMsUUFBUSxDQUFDb0QsR0FBRyxDQUFDNUIsQ0FBQyxDQUFDVyxNQUFNLENBQUMsQ0FBQ00sTUFBTSxFQUFFO1FBQ3ZDLElBQUksQ0FBQ3pDLFFBQVEsQ0FBQ1csT0FBTyxDQUFDLE9BQU8sQ0FBQztNQUNoQztJQUNGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNiLENBQUM7RUFFRGpCLEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ1ksTUFBTSxHQUFHLFlBQVk7SUFDbkMsSUFBSSxJQUFJLENBQUMzQixPQUFPLElBQUksSUFBSSxDQUFDUixPQUFPLENBQUNxQixRQUFRLEVBQUU7TUFDekMsSUFBSSxDQUFDakIsUUFBUSxDQUFDaUMsRUFBRSxDQUFDLDBCQUEwQixFQUFFeEMsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDLFVBQVVjLENBQUMsRUFBRTtRQUNoRUEsQ0FBQyxDQUFDNkIsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMvQixJQUFJLEVBQUU7TUFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUNsQixPQUFPLEVBQUU7TUFDeEIsSUFBSSxDQUFDSixRQUFRLENBQUNpRCxHQUFHLENBQUMsMEJBQTBCLENBQUM7SUFDL0M7RUFDRixDQUFDO0VBRUR2RCxLQUFLLENBQUN5QixTQUFTLENBQUNhLE1BQU0sR0FBRyxZQUFZO0lBQ25DLElBQUksSUFBSSxDQUFDNUIsT0FBTyxFQUFFO01BQ2hCWCxDQUFDLENBQUM2RCxNQUFNLENBQUMsQ0FBQ3JCLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRXhDLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQyxJQUFJLENBQUM2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQyxNQUFNO01BQ0w5RCxDQUFDLENBQUM2RCxNQUFNLENBQUMsQ0FBQ0wsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDO0VBQ0YsQ0FBQztFQUVEdkQsS0FBSyxDQUFDeUIsU0FBUyxDQUFDZ0MsU0FBUyxHQUFHLFlBQVk7SUFDdEMsSUFBSTVCLElBQUksR0FBRyxJQUFJO0lBQ2YsSUFBSSxDQUFDdkIsUUFBUSxDQUFDc0IsSUFBSSxFQUFFO0lBQ3BCLElBQUksQ0FBQ04sUUFBUSxDQUFDLFlBQVk7TUFDeEJPLElBQUksQ0FBQzFCLEtBQUssQ0FBQ3FELFdBQVcsQ0FBQyxZQUFZLENBQUM7TUFDcEMzQixJQUFJLENBQUNpQyxnQkFBZ0IsRUFBRTtNQUN2QmpDLElBQUksQ0FBQ2tDLGNBQWMsRUFBRTtNQUNyQmxDLElBQUksQ0FBQ3ZCLFFBQVEsQ0FBQ1csT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQzFDLENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRGpCLEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ3VDLGNBQWMsR0FBRyxZQUFZO0lBQzNDLElBQUksQ0FBQ3ZELFNBQVMsSUFBSSxJQUFJLENBQUNBLFNBQVMsQ0FBQ3dELE1BQU0sRUFBRTtJQUN6QyxJQUFJLENBQUN4RCxTQUFTLEdBQUcsSUFBSTtFQUN2QixDQUFDO0VBRURULEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ0gsUUFBUSxHQUFHLFVBQVU0QyxRQUFRLEVBQUU7SUFDN0MsSUFBSXJDLElBQUksR0FBRyxJQUFJO0lBQ2YsSUFBSXNDLE9BQU8sR0FBRyxJQUFJLENBQUM3RCxRQUFRLENBQUN1QyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUU7SUFFMUQsSUFBSSxJQUFJLENBQUNuQyxPQUFPLElBQUksSUFBSSxDQUFDUixPQUFPLENBQUNvQixRQUFRLEVBQUU7TUFDekMsSUFBSThDLFNBQVMsR0FBR3JFLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQ0QsVUFBVSxJQUFJd0IsT0FBTztNQUUvQyxJQUFJLENBQUMxRCxTQUFTLEdBQUdWLENBQUMsQ0FBQ0ssUUFBUSxDQUFDaUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzlDakMsUUFBUSxDQUFDLGlCQUFpQixHQUFHK0IsT0FBTyxDQUFDLENBQ3JDbkIsUUFBUSxDQUFDLElBQUksQ0FBQzdDLEtBQUssQ0FBQztNQUV2QixJQUFJLENBQUNHLFFBQVEsQ0FBQ2lDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRXhDLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQyxVQUFVYyxDQUFDLEVBQUU7UUFDOUQsSUFBSSxJQUFJLENBQUNqQixtQkFBbUIsRUFBRTtVQUM1QixJQUFJLENBQUNBLG1CQUFtQixHQUFHLEtBQUs7VUFDaEM7UUFDRjtRQUNBLElBQUlpQixDQUFDLENBQUNXLE1BQU0sS0FBS1gsQ0FBQyxDQUFDd0MsYUFBYSxFQUFFO1FBQ2xDLElBQUksQ0FBQ3BFLE9BQU8sQ0FBQ29CLFFBQVEsSUFBSSxRQUFRLEdBQzdCLElBQUksQ0FBQ2hCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ2lFLEtBQUssRUFBRSxHQUN4QixJQUFJLENBQUMzQyxJQUFJLEVBQUU7TUFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO01BRVQsSUFBSXdDLFNBQVMsRUFBRSxJQUFJLENBQUMzRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMwQyxXQUFXLEVBQUM7O01BRTdDLElBQUksQ0FBQzFDLFNBQVMsQ0FBQzJCLFFBQVEsQ0FBQyxJQUFJLENBQUM7TUFFN0IsSUFBSSxDQUFDOEIsUUFBUSxFQUFFO01BRWZFLFNBQVMsR0FDUCxJQUFJLENBQUMzRCxTQUFTLENBQ1grQixHQUFHLENBQUMsaUJBQWlCLEVBQUUwQixRQUFRLENBQUMsQ0FDaENiLG9CQUFvQixDQUFDckQsS0FBSyxDQUFDb0IsNEJBQTRCLENBQUMsR0FDM0Q4QyxRQUFRLEVBQUU7SUFFZCxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQ3hELE9BQU8sSUFBSSxJQUFJLENBQUNELFNBQVMsRUFBRTtNQUMxQyxJQUFJLENBQUNBLFNBQVMsQ0FBQytDLFdBQVcsQ0FBQyxJQUFJLENBQUM7TUFFaEMsSUFBSWdCLGNBQWMsR0FBRyxTQUFqQkEsY0FBY0EsQ0FBQSxFQUFlO1FBQy9CM0MsSUFBSSxDQUFDbUMsY0FBYyxFQUFFO1FBQ3JCRSxRQUFRLElBQUlBLFFBQVEsRUFBRTtNQUN4QixDQUFDO01BQ0RuRSxDQUFDLENBQUM2QyxPQUFPLENBQUNELFVBQVUsSUFBSSxJQUFJLENBQUNyQyxRQUFRLENBQUN1QyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQ3BELElBQUksQ0FBQ3BDLFNBQVMsQ0FDWCtCLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRWdDLGNBQWMsQ0FBQyxDQUN0Q25CLG9CQUFvQixDQUFDckQsS0FBSyxDQUFDb0IsNEJBQTRCLENBQUMsR0FDM0RvRCxjQUFjLEVBQUU7SUFFcEIsQ0FBQyxNQUFNLElBQUlOLFFBQVEsRUFBRTtNQUNuQkEsUUFBUSxFQUFFO0lBQ1o7RUFDRixDQUFDOztFQUVEOztFQUVBbEUsS0FBSyxDQUFDeUIsU0FBUyxDQUFDb0MsWUFBWSxHQUFHLFlBQVk7SUFDekMsSUFBSSxDQUFDWCxZQUFZLEVBQUU7RUFDckIsQ0FBQztFQUVEbEQsS0FBSyxDQUFDeUIsU0FBUyxDQUFDeUIsWUFBWSxHQUFHLFlBQVk7SUFDekMsSUFBSXVCLGtCQUFrQixHQUFHLElBQUksQ0FBQ25FLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ29FLFlBQVksR0FBR3RFLFFBQVEsQ0FBQ3VFLGVBQWUsQ0FBQ0MsWUFBWTtJQUU5RixJQUFJLENBQUN0RSxRQUFRLENBQUN1RSxHQUFHLENBQUM7TUFDaEJDLFdBQVcsRUFBRyxDQUFDLElBQUksQ0FBQ0MsaUJBQWlCLElBQUlOLGtCQUFrQixHQUFHLElBQUksQ0FBQzdELGNBQWMsR0FBRyxFQUFFO01BQ3RGb0UsWUFBWSxFQUFFLElBQUksQ0FBQ0QsaUJBQWlCLElBQUksQ0FBQ04sa0JBQWtCLEdBQUcsSUFBSSxDQUFDN0QsY0FBYyxHQUFHO0lBQ3RGLENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRFosS0FBSyxDQUFDeUIsU0FBUyxDQUFDcUMsZ0JBQWdCLEdBQUcsWUFBWTtJQUM3QyxJQUFJLENBQUN4RCxRQUFRLENBQUN1RSxHQUFHLENBQUM7TUFDaEJDLFdBQVcsRUFBRSxFQUFFO01BQ2ZFLFlBQVksRUFBRTtJQUNoQixDQUFDLENBQUM7RUFDSixDQUFDO0VBRURoRixLQUFLLENBQUN5QixTQUFTLENBQUNTLGNBQWMsR0FBRyxZQUFZO0lBQzNDLElBQUkrQyxlQUFlLEdBQUdyQixNQUFNLENBQUNzQixVQUFVO0lBQ3ZDLElBQUksQ0FBQ0QsZUFBZSxFQUFFO01BQUU7TUFDdEIsSUFBSUUsbUJBQW1CLEdBQUcvRSxRQUFRLENBQUN1RSxlQUFlLENBQUNTLHFCQUFxQixFQUFFO01BQzFFSCxlQUFlLEdBQUdFLG1CQUFtQixDQUFDRSxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsR0FBRyxDQUFDSixtQkFBbUIsQ0FBQ0ssSUFBSSxDQUFDO0lBQ2xGO0lBQ0EsSUFBSSxDQUFDVCxpQkFBaUIsR0FBRzNFLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDb0YsV0FBVyxHQUFHUixlQUFlO0lBQ3BFLElBQUksQ0FBQ3JFLGNBQWMsR0FBRyxJQUFJLENBQUM4RSxnQkFBZ0IsRUFBRTtFQUMvQyxDQUFDO0VBRUQxRixLQUFLLENBQUN5QixTQUFTLENBQUNVLFlBQVksR0FBRyxZQUFZO0lBQ3pDLElBQUl3RCxPQUFPLEdBQUdDLFFBQVEsQ0FBRSxJQUFJLENBQUN6RixLQUFLLENBQUMwRSxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFHLEVBQUUsQ0FBQztJQUNsRSxJQUFJLENBQUNsRSxlQUFlLEdBQUdQLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDd0YsS0FBSyxDQUFDYixZQUFZLElBQUksRUFBRTtJQUM3RCxJQUFJLElBQUksQ0FBQ0QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDNUUsS0FBSyxDQUFDMEUsR0FBRyxDQUFDLGVBQWUsRUFBRWMsT0FBTyxHQUFHLElBQUksQ0FBQy9FLGNBQWMsQ0FBQztFQUM1RixDQUFDO0VBRURaLEtBQUssQ0FBQ3lCLFNBQVMsQ0FBQ3NDLGNBQWMsR0FBRyxZQUFZO0lBQzNDLElBQUksQ0FBQzVELEtBQUssQ0FBQzBFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDbEUsZUFBZSxDQUFDO0VBQ3ZELENBQUM7RUFFRFgsS0FBSyxDQUFDeUIsU0FBUyxDQUFDaUUsZ0JBQWdCLEdBQUcsWUFBWTtJQUFFO0lBQy9DLElBQUlJLFNBQVMsR0FBRzFGLFFBQVEsQ0FBQ2lFLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDN0N5QixTQUFTLENBQUNDLFNBQVMsR0FBRyx5QkFBeUI7SUFDL0MsSUFBSSxDQUFDNUYsS0FBSyxDQUFDNkYsTUFBTSxDQUFDRixTQUFTLENBQUM7SUFDNUIsSUFBSWxGLGNBQWMsR0FBR2tGLFNBQVMsQ0FBQzNDLFdBQVcsR0FBRzJDLFNBQVMsQ0FBQ0wsV0FBVztJQUNsRSxJQUFJLENBQUN0RixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM4RixXQUFXLENBQUNILFNBQVMsQ0FBQztJQUNwQyxPQUFPbEYsY0FBYztFQUN2QixDQUFDOztFQUdEO0VBQ0E7O0VBRUEsU0FBU3NGLE1BQU1BLENBQUNDLE1BQU0sRUFBRXhFLGNBQWMsRUFBRTtJQUN0QyxPQUFPLElBQUksQ0FBQ3lFLElBQUksQ0FBQyxZQUFZO01BQzNCLElBQUlDLEtBQUssR0FBS3RHLENBQUMsQ0FBQyxJQUFJLENBQUM7TUFDckIsSUFBSXVHLElBQUksR0FBTUQsS0FBSyxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO01BQ3BDLElBQUlwRyxPQUFPLEdBQUdILENBQUMsQ0FBQ3dHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRXZHLEtBQUssQ0FBQ3FCLFFBQVEsRUFBRWdGLEtBQUssQ0FBQ0MsSUFBSSxFQUFFLEVBQUVFLE9BQUEsQ0FBT0wsTUFBTSxLQUFJLFFBQVEsSUFBSUEsTUFBTSxDQUFDO01BRTdGLElBQUksQ0FBQ0csSUFBSSxFQUFFRCxLQUFLLENBQUNDLElBQUksQ0FBQyxVQUFVLEVBQUdBLElBQUksR0FBRyxJQUFJdEcsS0FBSyxDQUFDLElBQUksRUFBRUUsT0FBTyxDQUFDLENBQUU7TUFDcEUsSUFBSSxPQUFPaUcsTUFBTSxJQUFJLFFBQVEsRUFBRUcsSUFBSSxDQUFDSCxNQUFNLENBQUMsQ0FBQ3hFLGNBQWMsQ0FBQyxNQUN0RCxJQUFJekIsT0FBTyxDQUFDc0IsSUFBSSxFQUFFOEUsSUFBSSxDQUFDOUUsSUFBSSxDQUFDRyxjQUFjLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0VBQ0o7RUFFQSxJQUFJOEUsR0FBRyxHQUFHMUcsQ0FBQyxDQUFDMkcsRUFBRSxDQUFDQyxLQUFLO0VBRXBCNUcsQ0FBQyxDQUFDMkcsRUFBRSxDQUFDQyxLQUFLLEdBQWVULE1BQU07RUFDL0JuRyxDQUFDLENBQUMyRyxFQUFFLENBQUNDLEtBQUssQ0FBQ0MsV0FBVyxHQUFHNUcsS0FBSzs7RUFHOUI7RUFDQTs7RUFFQUQsQ0FBQyxDQUFDMkcsRUFBRSxDQUFDQyxLQUFLLENBQUNFLFVBQVUsR0FBRyxZQUFZO0lBQ2xDOUcsQ0FBQyxDQUFDMkcsRUFBRSxDQUFDQyxLQUFLLEdBQUdGLEdBQUc7SUFDaEIsT0FBTyxJQUFJO0VBQ2IsQ0FBQzs7RUFHRDtFQUNBOztFQUVBMUcsQ0FBQyxDQUFDSyxRQUFRLENBQUMsQ0FBQ21DLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSx1QkFBdUIsRUFBRSxVQUFVVCxDQUFDLEVBQUU7SUFDOUUsSUFBSXVFLEtBQUssR0FBS3RHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckIsSUFBSStHLElBQUksR0FBTVQsS0FBSyxDQUFDVSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2hDLElBQUlDLE9BQU8sR0FBR2pILENBQUMsQ0FBQ3NHLEtBQUssQ0FBQ1UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFLRCxJQUFJLElBQUlBLElBQUksQ0FBQ0csT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBRSxDQUFDLEVBQUM7SUFDM0YsSUFBSWQsTUFBTSxHQUFJYSxPQUFPLENBQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLEdBQUd2RyxDQUFDLENBQUN3RyxNQUFNLENBQUM7TUFBRXpGLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQ29HLElBQUksQ0FBQ0osSUFBSSxDQUFDLElBQUlBO0lBQUssQ0FBQyxFQUFFRSxPQUFPLENBQUNWLElBQUksRUFBRSxFQUFFRCxLQUFLLENBQUNDLElBQUksRUFBRSxDQUFDO0lBRS9ILElBQUlELEtBQUssQ0FBQzNELEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRVosQ0FBQyxDQUFDd0IsY0FBYyxFQUFFO0lBRXJDMEQsT0FBTyxDQUFDeEUsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVMkUsU0FBUyxFQUFFO01BQ2hELElBQUlBLFNBQVMsQ0FBQ2xGLGtCQUFrQixFQUFFLEVBQUUsT0FBTSxDQUFDO01BQzNDK0UsT0FBTyxDQUFDeEUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFlBQVk7UUFDekM2RCxLQUFLLENBQUMzRCxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUkyRCxLQUFLLENBQUNwRixPQUFPLENBQUMsT0FBTyxDQUFDO01BQ2hELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUNGaUYsTUFBTSxDQUFDa0IsSUFBSSxDQUFDSixPQUFPLEVBQUViLE1BQU0sRUFBRSxJQUFJLENBQUM7RUFDcEMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDa0IsTUFBTSxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ2xWVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBRSxXQUFTQyxPQUFPLEVBQUU7RUFDaEIsWUFBWTs7RUFDWixJQUFJLElBQTBDLEVBQUU7SUFDNUNDLGlDQUFPLENBQUMsMkNBQVEsQ0FBQyxvQ0FBRUQsT0FBTztBQUFBO0FBQUE7QUFBQSxvR0FBQztFQUMvQixDQUFDLE1BQU0sRUFJTjtBQUVMLENBQUMsRUFBQyxVQUFTdkgsQ0FBQyxFQUFFO0VBQ1YsWUFBWTs7RUFDWixJQUFJeUgsS0FBSyxHQUFHNUQsTUFBTSxDQUFDNEQsS0FBSyxJQUFJLENBQUMsQ0FBQztFQUU5QkEsS0FBSyxHQUFJLFlBQVc7SUFFaEIsSUFBSUMsV0FBVyxHQUFHLENBQUM7SUFFbkIsU0FBU0QsS0FBS0EsQ0FBQ3ZILE9BQU8sRUFBRXlILFFBQVEsRUFBRTtNQUU5QixJQUFJQyxDQUFDLEdBQUcsSUFBSTtRQUFFQyxZQUFZO01BRTFCRCxDQUFDLENBQUNFLFFBQVEsR0FBRztRQUNUQyxhQUFhLEVBQUUsSUFBSTtRQUNuQkMsY0FBYyxFQUFFLEtBQUs7UUFDckJDLFlBQVksRUFBRWpJLENBQUMsQ0FBQ0UsT0FBTyxDQUFDO1FBQ3hCZ0ksVUFBVSxFQUFFbEksQ0FBQyxDQUFDRSxPQUFPLENBQUM7UUFDdEJpSSxNQUFNLEVBQUUsSUFBSTtRQUNaQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxTQUFTLEVBQUUsa0ZBQWtGO1FBQzdGQyxTQUFTLEVBQUUsMEVBQTBFO1FBQ3JGQyxRQUFRLEVBQUUsS0FBSztRQUNmQyxhQUFhLEVBQUUsSUFBSTtRQUNuQkMsVUFBVSxFQUFFLEtBQUs7UUFDakJDLGFBQWEsRUFBRSxNQUFNO1FBQ3JCQyxPQUFPLEVBQUUsTUFBTTtRQUNmQyxZQUFZLEVBQUUsU0FBQUEsYUFBU0MsTUFBTSxFQUFFQyxDQUFDLEVBQUU7VUFDOUIsT0FBTzlJLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDK0ksSUFBSSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDREUsSUFBSSxFQUFFLEtBQUs7UUFDWEMsU0FBUyxFQUFFLFlBQVk7UUFDdkJDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLE1BQU0sRUFBRSxRQUFRO1FBQ2hCQyxZQUFZLEVBQUUsSUFBSTtRQUNsQkMsSUFBSSxFQUFFLEtBQUs7UUFDWEMsYUFBYSxFQUFFLEtBQUs7UUFDcEJDLGFBQWEsRUFBRSxLQUFLO1FBQ3BCQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxZQUFZLEVBQUUsQ0FBQztRQUNmQyxRQUFRLEVBQUUsVUFBVTtRQUNwQkMsV0FBVyxFQUFFLEtBQUs7UUFDbEJDLFlBQVksRUFBRSxJQUFJO1FBQ2xCQyxZQUFZLEVBQUUsSUFBSTtRQUNsQkMsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QkMsU0FBUyxFQUFFLFFBQVE7UUFDbkJDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCQyxJQUFJLEVBQUUsQ0FBQztRQUNQQyxHQUFHLEVBQUUsS0FBSztRQUNWQyxLQUFLLEVBQUUsRUFBRTtRQUNUQyxZQUFZLEVBQUUsQ0FBQztRQUNmQyxZQUFZLEVBQUUsQ0FBQztRQUNmQyxjQUFjLEVBQUUsQ0FBQztRQUNqQkMsS0FBSyxFQUFFLEdBQUc7UUFDVkMsS0FBSyxFQUFFLElBQUk7UUFDWEMsWUFBWSxFQUFFLEtBQUs7UUFDbkJDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLGNBQWMsRUFBRSxDQUFDO1FBQ2pCQyxNQUFNLEVBQUUsSUFBSTtRQUNaQyxZQUFZLEVBQUUsSUFBSTtRQUNsQkMsYUFBYSxFQUFFLEtBQUs7UUFDcEJDLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLGVBQWUsRUFBRSxLQUFLO1FBQ3RCQyxjQUFjLEVBQUUsSUFBSTtRQUNwQkMsTUFBTSxFQUFFO01BQ1osQ0FBQztNQUVEdEQsQ0FBQyxDQUFDdUQsUUFBUSxHQUFHO1FBQ1RDLFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxRQUFRLEVBQUUsS0FBSztRQUNmQyxhQUFhLEVBQUUsSUFBSTtRQUNuQkMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQkMsV0FBVyxFQUFFLElBQUk7UUFDakJDLFlBQVksRUFBRSxDQUFDO1FBQ2ZDLFNBQVMsRUFBRSxDQUFDO1FBQ1pDLEtBQUssRUFBRSxJQUFJO1FBQ1hDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCQyxTQUFTLEVBQUUsQ0FBQztRQUNaQyxVQUFVLEVBQUUsSUFBSTtRQUNoQkMsVUFBVSxFQUFFLElBQUk7UUFDaEJDLFNBQVMsRUFBRSxLQUFLO1FBQ2hCQyxVQUFVLEVBQUUsSUFBSTtRQUNoQkMsVUFBVSxFQUFFLElBQUk7UUFDaEJDLFdBQVcsRUFBRSxJQUFJO1FBQ2pCQyxPQUFPLEVBQUUsSUFBSTtRQUNiQyxPQUFPLEVBQUUsS0FBSztRQUNkQyxXQUFXLEVBQUUsQ0FBQztRQUNkQyxTQUFTLEVBQUUsSUFBSTtRQUNmQyxPQUFPLEVBQUUsS0FBSztRQUNkQyxLQUFLLEVBQUUsSUFBSTtRQUNYQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2ZDLGlCQUFpQixFQUFFLEtBQUs7UUFDeEJDLFNBQVMsRUFBRTtNQUNmLENBQUM7TUFFRDdNLENBQUMsQ0FBQ3dHLE1BQU0sQ0FBQ29CLENBQUMsRUFBRUEsQ0FBQyxDQUFDdUQsUUFBUSxDQUFDO01BRXZCdkQsQ0FBQyxDQUFDa0YsZ0JBQWdCLEdBQUcsSUFBSTtNQUN6QmxGLENBQUMsQ0FBQ21GLFFBQVEsR0FBRyxJQUFJO01BQ2pCbkYsQ0FBQyxDQUFDb0YsUUFBUSxHQUFHLElBQUk7TUFDakJwRixDQUFDLENBQUNxRixXQUFXLEdBQUcsRUFBRTtNQUNsQnJGLENBQUMsQ0FBQ3NGLGtCQUFrQixHQUFHLEVBQUU7TUFDekJ0RixDQUFDLENBQUN1RixjQUFjLEdBQUcsS0FBSztNQUN4QnZGLENBQUMsQ0FBQ3dGLFFBQVEsR0FBRyxLQUFLO01BQ2xCeEYsQ0FBQyxDQUFDeUYsV0FBVyxHQUFHLEtBQUs7TUFDckJ6RixDQUFDLENBQUMwRixNQUFNLEdBQUcsUUFBUTtNQUNuQjFGLENBQUMsQ0FBQzJGLE1BQU0sR0FBRyxJQUFJO01BQ2YzRixDQUFDLENBQUM0RixZQUFZLEdBQUcsSUFBSTtNQUNyQjVGLENBQUMsQ0FBQ21DLFNBQVMsR0FBRyxJQUFJO01BQ2xCbkMsQ0FBQyxDQUFDNkYsUUFBUSxHQUFHLENBQUM7TUFDZDdGLENBQUMsQ0FBQzhGLFdBQVcsR0FBRyxJQUFJO01BQ3BCOUYsQ0FBQyxDQUFDK0YsT0FBTyxHQUFHM04sQ0FBQyxDQUFDRSxPQUFPLENBQUM7TUFDdEIwSCxDQUFDLENBQUNnRyxZQUFZLEdBQUcsSUFBSTtNQUNyQmhHLENBQUMsQ0FBQ2lHLGFBQWEsR0FBRyxJQUFJO01BQ3RCakcsQ0FBQyxDQUFDa0csY0FBYyxHQUFHLElBQUk7TUFDdkJsRyxDQUFDLENBQUNtRyxnQkFBZ0IsR0FBRyxrQkFBa0I7TUFDdkNuRyxDQUFDLENBQUNvRyxXQUFXLEdBQUcsQ0FBQztNQUNqQnBHLENBQUMsQ0FBQ3FHLFdBQVcsR0FBRyxJQUFJO01BRXBCcEcsWUFBWSxHQUFHN0gsQ0FBQyxDQUFDRSxPQUFPLENBQUMsQ0FBQ3FHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7TUFFN0NxQixDQUFDLENBQUN6SCxPQUFPLEdBQUdILENBQUMsQ0FBQ3dHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRW9CLENBQUMsQ0FBQ0UsUUFBUSxFQUFFSCxRQUFRLEVBQUVFLFlBQVksQ0FBQztNQUU1REQsQ0FBQyxDQUFDNkQsWUFBWSxHQUFHN0QsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0osWUFBWTtNQUV2QzdCLENBQUMsQ0FBQ3NHLGdCQUFnQixHQUFHdEcsQ0FBQyxDQUFDekgsT0FBTztNQUU5QixJQUFJLE9BQU9FLFFBQVEsQ0FBQzhOLFNBQVMsS0FBSyxXQUFXLEVBQUU7UUFDM0N2RyxDQUFDLENBQUMwRixNQUFNLEdBQUcsV0FBVztRQUN0QjFGLENBQUMsQ0FBQ21HLGdCQUFnQixHQUFHLHFCQUFxQjtNQUM5QyxDQUFDLE1BQU0sSUFBSSxPQUFPMU4sUUFBUSxDQUFDK04sWUFBWSxLQUFLLFdBQVcsRUFBRTtRQUNyRHhHLENBQUMsQ0FBQzBGLE1BQU0sR0FBRyxjQUFjO1FBQ3pCMUYsQ0FBQyxDQUFDbUcsZ0JBQWdCLEdBQUcsd0JBQXdCO01BQ2pEO01BRUFuRyxDQUFDLENBQUN5RyxRQUFRLEdBQUdyTyxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUN5RyxRQUFRLEVBQUV6RyxDQUFDLENBQUM7TUFDbkNBLENBQUMsQ0FBQzBHLGFBQWEsR0FBR3RPLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQzJHLENBQUMsQ0FBQzBHLGFBQWEsRUFBRTFHLENBQUMsQ0FBQztNQUM3Q0EsQ0FBQyxDQUFDMkcsZ0JBQWdCLEdBQUd2TyxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUMyRyxnQkFBZ0IsRUFBRTNHLENBQUMsQ0FBQztNQUNuREEsQ0FBQyxDQUFDNEcsV0FBVyxHQUFHeE8sQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDNEcsV0FBVyxFQUFFNUcsQ0FBQyxDQUFDO01BQ3pDQSxDQUFDLENBQUM2RyxZQUFZLEdBQUd6TyxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUM2RyxZQUFZLEVBQUU3RyxDQUFDLENBQUM7TUFDM0NBLENBQUMsQ0FBQzhHLGFBQWEsR0FBRzFPLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQzJHLENBQUMsQ0FBQzhHLGFBQWEsRUFBRTlHLENBQUMsQ0FBQztNQUM3Q0EsQ0FBQyxDQUFDK0csV0FBVyxHQUFHM08sQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDK0csV0FBVyxFQUFFL0csQ0FBQyxDQUFDO01BQ3pDQSxDQUFDLENBQUNnSCxZQUFZLEdBQUc1TyxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUNnSCxZQUFZLEVBQUVoSCxDQUFDLENBQUM7TUFDM0NBLENBQUMsQ0FBQ2lILFdBQVcsR0FBRzdPLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQzJHLENBQUMsQ0FBQ2lILFdBQVcsRUFBRWpILENBQUMsQ0FBQztNQUN6Q0EsQ0FBQyxDQUFDa0gsVUFBVSxHQUFHOU8sQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDa0gsVUFBVSxFQUFFbEgsQ0FBQyxDQUFDO01BRXZDQSxDQUFDLENBQUNGLFdBQVcsR0FBR0EsV0FBVyxFQUFFOztNQUU3QjtNQUNBO01BQ0E7TUFDQUUsQ0FBQyxDQUFDbUgsUUFBUSxHQUFHLDJCQUEyQjtNQUd4Q25ILENBQUMsQ0FBQ29ILG1CQUFtQixFQUFFO01BQ3ZCcEgsQ0FBQyxDQUFDcUgsSUFBSSxDQUFDLElBQUksQ0FBQztJQUVoQjtJQUVBLE9BQU94SCxLQUFLO0VBRWhCLENBQUMsRUFBRztFQUVKQSxLQUFLLENBQUMvRixTQUFTLENBQUN3TixXQUFXLEdBQUcsWUFBVztJQUNyQyxJQUFJdEgsQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDM0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDdUcsSUFBSSxDQUFDO01BQ3JDLGFBQWEsRUFBRTtJQUNuQixDQUFDLENBQUMsQ0FBQ3ZHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDdUcsSUFBSSxDQUFDO01BQ3JDLFVBQVUsRUFBRTtJQUNoQixDQUFDLENBQUM7RUFFTixDQUFDO0VBRURTLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3lOLFFBQVEsR0FBRzFILEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBOLFFBQVEsR0FBRyxVQUFTQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsU0FBUyxFQUFFO0lBRXJGLElBQUkzSCxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUksT0FBTzBILEtBQU0sS0FBSyxTQUFTLEVBQUU7TUFDN0JDLFNBQVMsR0FBR0QsS0FBSztNQUNqQkEsS0FBSyxHQUFHLElBQUk7SUFDaEIsQ0FBQyxNQUFNLElBQUlBLEtBQUssR0FBRyxDQUFDLElBQUtBLEtBQUssSUFBSTFILENBQUMsQ0FBQ3NFLFVBQVcsRUFBRTtNQUM3QyxPQUFPLEtBQUs7SUFDaEI7SUFFQXRFLENBQUMsQ0FBQzRILE1BQU0sRUFBRTtJQUVWLElBQUksT0FBT0YsS0FBTSxLQUFLLFFBQVEsRUFBRTtNQUM1QixJQUFJQSxLQUFLLEtBQUssQ0FBQyxJQUFJMUgsQ0FBQyxDQUFDeUUsT0FBTyxDQUFDckosTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN2Q2hELENBQUMsQ0FBQ3FQLE1BQU0sQ0FBQyxDQUFDcE0sUUFBUSxDQUFDMkUsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDO01BQ3JDLENBQUMsTUFBTSxJQUFJbUQsU0FBUyxFQUFFO1FBQ2xCdlAsQ0FBQyxDQUFDcVAsTUFBTSxDQUFDLENBQUNJLFlBQVksQ0FBQzdILENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQ0osS0FBSyxDQUFDLENBQUM7TUFDL0MsQ0FBQyxNQUFNO1FBQ0h0UCxDQUFDLENBQUNxUCxNQUFNLENBQUMsQ0FBQ00sV0FBVyxDQUFDL0gsQ0FBQyxDQUFDeUUsT0FBTyxDQUFDcUQsRUFBRSxDQUFDSixLQUFLLENBQUMsQ0FBQztNQUM5QztJQUNKLENBQUMsTUFBTTtNQUNILElBQUlDLFNBQVMsS0FBSyxJQUFJLEVBQUU7UUFDcEJ2UCxDQUFDLENBQUNxUCxNQUFNLENBQUMsQ0FBQ08sU0FBUyxDQUFDaEksQ0FBQyxDQUFDd0UsV0FBVyxDQUFDO01BQ3RDLENBQUMsTUFBTTtRQUNIcE0sQ0FBQyxDQUFDcVAsTUFBTSxDQUFDLENBQUNwTSxRQUFRLENBQUMyRSxDQUFDLENBQUN3RSxXQUFXLENBQUM7TUFDckM7SUFDSjtJQUVBeEUsQ0FBQyxDQUFDeUUsT0FBTyxHQUFHekUsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLElBQUksQ0FBQzFQLE9BQU8sQ0FBQ2dLLEtBQUssQ0FBQztJQUV0RHZDLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3lELFFBQVEsQ0FBQyxJQUFJLENBQUMxUCxPQUFPLENBQUNnSyxLQUFLLENBQUMsQ0FBQzJGLE1BQU0sRUFBRTtJQUVuRGxJLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ25HLE1BQU0sQ0FBQzJCLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQztJQUUvQnpFLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ2hHLElBQUksQ0FBQyxVQUFTaUosS0FBSyxFQUFFcFAsT0FBTyxFQUFFO01BQ3BDRixDQUFDLENBQUNFLE9BQU8sQ0FBQyxDQUFDOEcsSUFBSSxDQUFDLGtCQUFrQixFQUFFc0ksS0FBSyxDQUFDO0lBQzlDLENBQUMsQ0FBQztJQUVGMUgsQ0FBQyxDQUFDZ0csWUFBWSxHQUFHaEcsQ0FBQyxDQUFDeUUsT0FBTztJQUUxQnpFLENBQUMsQ0FBQ21JLE1BQU0sRUFBRTtFQUVkLENBQUM7RUFFRHRJLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3NPLGFBQWEsR0FBRyxZQUFXO0lBQ3ZDLElBQUlwSSxDQUFDLEdBQUcsSUFBSTtJQUNaLElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksS0FBSyxDQUFDLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUM2SCxjQUFjLEtBQUssSUFBSSxJQUFJSixDQUFDLENBQUN6SCxPQUFPLENBQUM0SyxRQUFRLEtBQUssS0FBSyxFQUFFO01BQ25HLElBQUlrRixZQUFZLEdBQUdySSxDQUFDLENBQUN5RSxPQUFPLENBQUNxRCxFQUFFLENBQUM5SCxDQUFDLENBQUM2RCxZQUFZLENBQUMsQ0FBQ3lFLFdBQVcsQ0FBQyxJQUFJLENBQUM7TUFDakV0SSxDQUFDLENBQUM4RSxLQUFLLENBQUN0SSxPQUFPLENBQUM7UUFDWitMLE1BQU0sRUFBRUY7TUFDWixDQUFDLEVBQUVySSxDQUFDLENBQUN6SCxPQUFPLENBQUNvSyxLQUFLLENBQUM7SUFDdkI7RUFDSixDQUFDO0VBRUQ5QyxLQUFLLENBQUMvRixTQUFTLENBQUMwTyxZQUFZLEdBQUcsVUFBU0MsVUFBVSxFQUFFbE0sUUFBUSxFQUFFO0lBRTFELElBQUltTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO01BQ2QxSSxDQUFDLEdBQUcsSUFBSTtJQUVaQSxDQUFDLENBQUNvSSxhQUFhLEVBQUU7SUFFakIsSUFBSXBJLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytKLEdBQUcsS0FBSyxJQUFJLElBQUl0QyxDQUFDLENBQUN6SCxPQUFPLENBQUM0SyxRQUFRLEtBQUssS0FBSyxFQUFFO01BQ3hEc0YsVUFBVSxHQUFHLENBQUNBLFVBQVU7SUFDNUI7SUFDQSxJQUFJekksQ0FBQyxDQUFDZ0YsaUJBQWlCLEtBQUssS0FBSyxFQUFFO01BQy9CLElBQUloRixDQUFDLENBQUN6SCxPQUFPLENBQUM0SyxRQUFRLEtBQUssS0FBSyxFQUFFO1FBQzlCbkQsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDaEksT0FBTyxDQUFDO1VBQ2xCcUIsSUFBSSxFQUFFNEs7UUFDVixDQUFDLEVBQUV6SSxDQUFDLENBQUN6SCxPQUFPLENBQUNvSyxLQUFLLEVBQUUzQyxDQUFDLENBQUN6SCxPQUFPLENBQUNnSixNQUFNLEVBQUVoRixRQUFRLENBQUM7TUFDbkQsQ0FBQyxNQUFNO1FBQ0h5RCxDQUFDLENBQUN3RSxXQUFXLENBQUNoSSxPQUFPLENBQUM7VUFDbEJtTSxHQUFHLEVBQUVGO1FBQ1QsQ0FBQyxFQUFFekksQ0FBQyxDQUFDekgsT0FBTyxDQUFDb0ssS0FBSyxFQUFFM0MsQ0FBQyxDQUFDekgsT0FBTyxDQUFDZ0osTUFBTSxFQUFFaEYsUUFBUSxDQUFDO01BQ25EO0lBRUosQ0FBQyxNQUFNO01BRUgsSUFBSXlELENBQUMsQ0FBQ3VGLGNBQWMsS0FBSyxLQUFLLEVBQUU7UUFDNUIsSUFBSXZGLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytKLEdBQUcsS0FBSyxJQUFJLEVBQUU7VUFDeEJ0QyxDQUFDLENBQUM0RCxXQUFXLEdBQUcsQ0FBRTVELENBQUMsQ0FBQzRELFdBQVk7UUFDcEM7UUFDQXhMLENBQUMsQ0FBQztVQUNFd1EsU0FBUyxFQUFFNUksQ0FBQyxDQUFDNEQ7UUFDakIsQ0FBQyxDQUFDLENBQUNwSCxPQUFPLENBQUM7VUFDUG9NLFNBQVMsRUFBRUg7UUFDZixDQUFDLEVBQUU7VUFDQ0ksUUFBUSxFQUFFN0ksQ0FBQyxDQUFDekgsT0FBTyxDQUFDb0ssS0FBSztVQUN6QnBCLE1BQU0sRUFBRXZCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2dKLE1BQU07VUFDeEJ1SCxJQUFJLEVBQUUsU0FBQUEsS0FBU0MsR0FBRyxFQUFFO1lBQ2hCQSxHQUFHLEdBQUdwTCxJQUFJLENBQUNxTCxJQUFJLENBQUNELEdBQUcsQ0FBQztZQUNwQixJQUFJL0ksQ0FBQyxDQUFDekgsT0FBTyxDQUFDNEssUUFBUSxLQUFLLEtBQUssRUFBRTtjQUM5QnVGLFNBQVMsQ0FBQzFJLENBQUMsQ0FBQ21GLFFBQVEsQ0FBQyxHQUFHLFlBQVksR0FDaEM0RCxHQUFHLEdBQUcsVUFBVTtjQUNwQi9JLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3RILEdBQUcsQ0FBQ3dMLFNBQVMsQ0FBQztZQUNoQyxDQUFDLE1BQU07Y0FDSEEsU0FBUyxDQUFDMUksQ0FBQyxDQUFDbUYsUUFBUSxDQUFDLEdBQUcsZ0JBQWdCLEdBQ3BDNEQsR0FBRyxHQUFHLEtBQUs7Y0FDZi9JLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3RILEdBQUcsQ0FBQ3dMLFNBQVMsQ0FBQztZQUNoQztVQUNKLENBQUM7VUFDRE8sUUFBUSxFQUFFLFNBQUFBLFNBQUEsRUFBVztZQUNqQixJQUFJMU0sUUFBUSxFQUFFO2NBQ1ZBLFFBQVEsQ0FBQ2tELElBQUksRUFBRTtZQUNuQjtVQUNKO1FBQ0osQ0FBQyxDQUFDO01BRU4sQ0FBQyxNQUFNO1FBRUhPLENBQUMsQ0FBQ2tKLGVBQWUsRUFBRTtRQUNuQlQsVUFBVSxHQUFHOUssSUFBSSxDQUFDcUwsSUFBSSxDQUFDUCxVQUFVLENBQUM7UUFFbEMsSUFBSXpJLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRLLFFBQVEsS0FBSyxLQUFLLEVBQUU7VUFDOUJ1RixTQUFTLENBQUMxSSxDQUFDLENBQUNtRixRQUFRLENBQUMsR0FBRyxjQUFjLEdBQUdzRCxVQUFVLEdBQUcsZUFBZTtRQUN6RSxDQUFDLE1BQU07VUFDSEMsU0FBUyxDQUFDMUksQ0FBQyxDQUFDbUYsUUFBUSxDQUFDLEdBQUcsa0JBQWtCLEdBQUdzRCxVQUFVLEdBQUcsVUFBVTtRQUN4RTtRQUNBekksQ0FBQyxDQUFDd0UsV0FBVyxDQUFDdEgsR0FBRyxDQUFDd0wsU0FBUyxDQUFDO1FBRTVCLElBQUluTSxRQUFRLEVBQUU7VUFDVjRNLFVBQVUsQ0FBQyxZQUFXO1lBRWxCbkosQ0FBQyxDQUFDb0osaUJBQWlCLEVBQUU7WUFFckI3TSxRQUFRLENBQUNrRCxJQUFJLEVBQUU7VUFDbkIsQ0FBQyxFQUFFTyxDQUFDLENBQUN6SCxPQUFPLENBQUNvSyxLQUFLLENBQUM7UUFDdkI7TUFFSjtJQUVKO0VBRUosQ0FBQztFQUVEOUMsS0FBSyxDQUFDL0YsU0FBUyxDQUFDdVAsWUFBWSxHQUFHLFlBQVc7SUFFdEMsSUFBSXJKLENBQUMsR0FBRyxJQUFJO01BQ1JRLFFBQVEsR0FBR1IsQ0FBQyxDQUFDekgsT0FBTyxDQUFDaUksUUFBUTtJQUVqQyxJQUFLQSxRQUFRLElBQUlBLFFBQVEsS0FBSyxJQUFJLEVBQUc7TUFDakNBLFFBQVEsR0FBR3BJLENBQUMsQ0FBQ29JLFFBQVEsQ0FBQyxDQUFDOEksR0FBRyxDQUFDdEosQ0FBQyxDQUFDK0YsT0FBTyxDQUFDO0lBQ3pDO0lBRUEsT0FBT3ZGLFFBQVE7RUFFbkIsQ0FBQztFQUVEWCxLQUFLLENBQUMvRixTQUFTLENBQUMwRyxRQUFRLEdBQUcsVUFBU2tILEtBQUssRUFBRTtJQUV2QyxJQUFJMUgsQ0FBQyxHQUFHLElBQUk7TUFDUlEsUUFBUSxHQUFHUixDQUFDLENBQUNxSixZQUFZLEVBQUU7SUFFL0IsSUFBSzdJLFFBQVEsS0FBSyxJQUFJLElBQUkzQixPQUFBLENBQU8yQixRQUFRLE1BQUssUUFBUSxFQUFHO01BQ3JEQSxRQUFRLENBQUMvQixJQUFJLENBQUMsWUFBVztRQUNyQixJQUFJM0QsTUFBTSxHQUFHMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDbVIsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFHLENBQUN6TyxNQUFNLENBQUNtSyxTQUFTLEVBQUU7VUFDbEJuSyxNQUFNLENBQUMwTyxZQUFZLENBQUM5QixLQUFLLEVBQUUsSUFBSSxDQUFDO1FBQ3BDO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFFSixDQUFDO0VBRUQ3SCxLQUFLLENBQUMvRixTQUFTLENBQUNvUCxlQUFlLEdBQUcsVUFBUzNHLEtBQUssRUFBRTtJQUU5QyxJQUFJdkMsQ0FBQyxHQUFHLElBQUk7TUFDUmhGLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFFbkIsSUFBSWdGLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tKLElBQUksS0FBSyxLQUFLLEVBQUU7TUFDMUJ6RyxVQUFVLENBQUNnRixDQUFDLENBQUNrRyxjQUFjLENBQUMsR0FBR2xHLENBQUMsQ0FBQ2lHLGFBQWEsR0FBRyxHQUFHLEdBQUdqRyxDQUFDLENBQUN6SCxPQUFPLENBQUNvSyxLQUFLLEdBQUcsS0FBSyxHQUFHM0MsQ0FBQyxDQUFDekgsT0FBTyxDQUFDd0ksT0FBTztJQUN0RyxDQUFDLE1BQU07TUFDSC9GLFVBQVUsQ0FBQ2dGLENBQUMsQ0FBQ2tHLGNBQWMsQ0FBQyxHQUFHLFVBQVUsR0FBR2xHLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29LLEtBQUssR0FBRyxLQUFLLEdBQUczQyxDQUFDLENBQUN6SCxPQUFPLENBQUN3SSxPQUFPO0lBQzNGO0lBRUEsSUFBSWYsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0osSUFBSSxLQUFLLEtBQUssRUFBRTtNQUMxQnpCLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3RILEdBQUcsQ0FBQ2xDLFVBQVUsQ0FBQztJQUNqQyxDQUFDLE1BQU07TUFDSGdGLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQ3ZGLEtBQUssQ0FBQyxDQUFDckYsR0FBRyxDQUFDbEMsVUFBVSxDQUFDO0lBQ3ZDO0VBRUosQ0FBQztFQUVENkUsS0FBSyxDQUFDL0YsU0FBUyxDQUFDMk0sUUFBUSxHQUFHLFlBQVc7SUFFbEMsSUFBSXpHLENBQUMsR0FBRyxJQUFJO0lBRVpBLENBQUMsQ0FBQzBHLGFBQWEsRUFBRTtJQUVqQixJQUFLMUcsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFHO01BQ3pDekMsQ0FBQyxDQUFDMEQsYUFBYSxHQUFHK0YsV0FBVyxDQUFFekosQ0FBQyxDQUFDMkcsZ0JBQWdCLEVBQUUzRyxDQUFDLENBQUN6SCxPQUFPLENBQUNxSSxhQUFhLENBQUU7SUFDaEY7RUFFSixDQUFDO0VBRURmLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzRNLGFBQWEsR0FBRyxZQUFXO0lBRXZDLElBQUkxRyxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUlBLENBQUMsQ0FBQzBELGFBQWEsRUFBRTtNQUNqQmdHLGFBQWEsQ0FBQzFKLENBQUMsQ0FBQzBELGFBQWEsQ0FBQztJQUNsQztFQUVKLENBQUM7RUFFRDdELEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzZNLGdCQUFnQixHQUFHLFlBQVc7SUFFMUMsSUFBSTNHLENBQUMsR0FBRyxJQUFJO01BQ1IySixPQUFPLEdBQUczSixDQUFDLENBQUM2RCxZQUFZLEdBQUc3RCxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjO0lBRXZELElBQUssQ0FBQzFDLENBQUMsQ0FBQzJGLE1BQU0sSUFBSSxDQUFDM0YsQ0FBQyxDQUFDeUYsV0FBVyxJQUFJLENBQUN6RixDQUFDLENBQUN3RixRQUFRLEVBQUc7TUFFOUMsSUFBS3hGLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3FKLFFBQVEsS0FBSyxLQUFLLEVBQUc7UUFFaEMsSUFBSzVCLENBQUMsQ0FBQzhELFNBQVMsS0FBSyxDQUFDLElBQU05RCxDQUFDLENBQUM2RCxZQUFZLEdBQUcsQ0FBQyxLQUFTN0QsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHLENBQUcsRUFBRTtVQUN2RXRFLENBQUMsQ0FBQzhELFNBQVMsR0FBRyxDQUFDO1FBQ25CLENBQUMsTUFFSSxJQUFLOUQsQ0FBQyxDQUFDOEQsU0FBUyxLQUFLLENBQUMsRUFBRztVQUUxQjZGLE9BQU8sR0FBRzNKLENBQUMsQ0FBQzZELFlBQVksR0FBRzdELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWM7VUFFbkQsSUFBSzFDLENBQUMsQ0FBQzZELFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFHO1lBQzVCN0QsQ0FBQyxDQUFDOEQsU0FBUyxHQUFHLENBQUM7VUFDbkI7UUFFSjtNQUVKO01BRUE5RCxDQUFDLENBQUN3SixZQUFZLENBQUVHLE9BQU8sQ0FBRTtJQUU3QjtFQUVKLENBQUM7RUFFRDlKLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzhQLFdBQVcsR0FBRyxZQUFXO0lBRXJDLElBQUk1SixDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2dJLE1BQU0sS0FBSyxJQUFJLEVBQUc7TUFFNUJQLENBQUMsQ0FBQ29FLFVBQVUsR0FBR2hNLENBQUMsQ0FBQzRILENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tJLFNBQVMsQ0FBQyxDQUFDaEcsUUFBUSxDQUFDLGFBQWEsQ0FBQztNQUM3RHVGLENBQUMsQ0FBQ21FLFVBQVUsR0FBRy9MLENBQUMsQ0FBQzRILENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21JLFNBQVMsQ0FBQyxDQUFDakcsUUFBUSxDQUFDLGFBQWEsQ0FBQztNQUU3RCxJQUFJdUYsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFHO1FBRXhDekMsQ0FBQyxDQUFDb0UsVUFBVSxDQUFDdkksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDZ08sVUFBVSxDQUFDLHNCQUFzQixDQUFDO1FBQzNFN0osQ0FBQyxDQUFDbUUsVUFBVSxDQUFDdEksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDZ08sVUFBVSxDQUFDLHNCQUFzQixDQUFDO1FBRTNFLElBQUk3SixDQUFDLENBQUNtSCxRQUFRLENBQUM1SCxJQUFJLENBQUNTLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tJLFNBQVMsQ0FBQyxFQUFFO1VBQ3RDVCxDQUFDLENBQUNvRSxVQUFVLENBQUM0RCxTQUFTLENBQUNoSSxDQUFDLENBQUN6SCxPQUFPLENBQUM4SCxZQUFZLENBQUM7UUFDbEQ7UUFFQSxJQUFJTCxDQUFDLENBQUNtSCxRQUFRLENBQUM1SCxJQUFJLENBQUNTLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21JLFNBQVMsQ0FBQyxFQUFFO1VBQ3RDVixDQUFDLENBQUNtRSxVQUFVLENBQUM5SSxRQUFRLENBQUMyRSxDQUFDLENBQUN6SCxPQUFPLENBQUM4SCxZQUFZLENBQUM7UUFDakQ7UUFFQSxJQUFJTCxDQUFDLENBQUN6SCxPQUFPLENBQUNxSixRQUFRLEtBQUssSUFBSSxFQUFFO1VBQzdCNUIsQ0FBQyxDQUFDb0UsVUFBVSxDQUNQM0osUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQzFCMkUsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7UUFDdEM7TUFFSixDQUFDLE1BQU07UUFFSFksQ0FBQyxDQUFDb0UsVUFBVSxDQUFDMEYsR0FBRyxDQUFFOUosQ0FBQyxDQUFDbUUsVUFBVSxDQUFFLENBRTNCMUosUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUN4QjJFLElBQUksQ0FBQztVQUNGLGVBQWUsRUFBRSxNQUFNO1VBQ3ZCLFVBQVUsRUFBRTtRQUNoQixDQUFDLENBQUM7TUFFVjtJQUVKO0VBRUosQ0FBQztFQUVEUyxLQUFLLENBQUMvRixTQUFTLENBQUNpUSxTQUFTLEdBQUcsWUFBVztJQUVuQyxJQUFJL0osQ0FBQyxHQUFHLElBQUk7TUFDUmtCLENBQUM7TUFBRThJLEdBQUc7SUFFVixJQUFJaEssQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkksSUFBSSxLQUFLLElBQUksSUFBSXBCLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtNQUVsRXpDLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ3RMLFFBQVEsQ0FBQyxjQUFjLENBQUM7TUFFbEN1UCxHQUFHLEdBQUc1UixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUNxQyxRQUFRLENBQUN1RixDQUFDLENBQUN6SCxPQUFPLENBQUM4SSxTQUFTLENBQUM7TUFFL0MsS0FBS0gsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJbEIsQ0FBQyxDQUFDaUssV0FBVyxFQUFFLEVBQUUvSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3RDOEksR0FBRyxDQUFDM0wsTUFBTSxDQUFDakcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDaUcsTUFBTSxDQUFDMkIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDeUksWUFBWSxDQUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRU8sQ0FBQyxFQUFFa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUMzRTtNQUVBbEIsQ0FBQyxDQUFDK0QsS0FBSyxHQUFHaUcsR0FBRyxDQUFDM08sUUFBUSxDQUFDMkUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0gsVUFBVSxDQUFDO01BRTVDTixDQUFDLENBQUMrRCxLQUFLLENBQUNsTCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUNxUixLQUFLLEVBQUUsQ0FBQ3pQLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFFdkQ7RUFFSixDQUFDO0VBRURvRixLQUFLLENBQUMvRixTQUFTLENBQUNxUSxRQUFRLEdBQUcsWUFBVztJQUVsQyxJQUFJbkssQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDeUUsT0FBTyxHQUNMekUsQ0FBQyxDQUFDK0YsT0FBTyxDQUNKa0MsUUFBUSxDQUFFakksQ0FBQyxDQUFDekgsT0FBTyxDQUFDZ0ssS0FBSyxHQUFHLHFCQUFxQixDQUFDLENBQ2xEOUgsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUVoQ3VGLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3JKLE1BQU07SUFFL0I0RSxDQUFDLENBQUN5RSxPQUFPLENBQUNoRyxJQUFJLENBQUMsVUFBU2lKLEtBQUssRUFBRXBQLE9BQU8sRUFBRTtNQUNwQ0YsQ0FBQyxDQUFDRSxPQUFPLENBQUMsQ0FDTDhHLElBQUksQ0FBQyxrQkFBa0IsRUFBRXNJLEtBQUssQ0FBQyxDQUMvQi9JLElBQUksQ0FBQyxpQkFBaUIsRUFBRXZHLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUM4RyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hFLENBQUMsQ0FBQztJQUVGWSxDQUFDLENBQUMrRixPQUFPLENBQUN0TCxRQUFRLENBQUMsY0FBYyxDQUFDO0lBRWxDdUYsQ0FBQyxDQUFDd0UsV0FBVyxHQUFJeEUsQ0FBQyxDQUFDc0UsVUFBVSxLQUFLLENBQUMsR0FDL0JsTSxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ2lELFFBQVEsQ0FBQzJFLENBQUMsQ0FBQytGLE9BQU8sQ0FBQyxHQUNuRC9GLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQzJGLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDalAsTUFBTSxFQUFFO0lBRTVENkUsQ0FBQyxDQUFDOEUsS0FBSyxHQUFHOUUsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDNkYsSUFBSSxDQUN4QiwyQkFBMkIsQ0FBQyxDQUFDbFAsTUFBTSxFQUFFO0lBQ3pDNkUsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDdEgsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFFL0IsSUFBSThDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLElBQUliLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NLLFlBQVksS0FBSyxJQUFJLEVBQUU7TUFDbEU3QyxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjLEdBQUcsQ0FBQztJQUNoQztJQUVBdEssQ0FBQyxDQUFDLGdCQUFnQixFQUFFNEgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDLENBQUN1RCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM3TyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBRXJFdUYsQ0FBQyxDQUFDc0ssYUFBYSxFQUFFO0lBRWpCdEssQ0FBQyxDQUFDNEosV0FBVyxFQUFFO0lBRWY1SixDQUFDLENBQUMrSixTQUFTLEVBQUU7SUFFYi9KLENBQUMsQ0FBQ3VLLFVBQVUsRUFBRTtJQUdkdkssQ0FBQyxDQUFDd0ssZUFBZSxDQUFDLE9BQU94SyxDQUFDLENBQUM2RCxZQUFZLEtBQUssUUFBUSxHQUFHN0QsQ0FBQyxDQUFDNkQsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUUxRSxJQUFJN0QsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0ksU0FBUyxLQUFLLElBQUksRUFBRTtNQUM5QnRCLENBQUMsQ0FBQzhFLEtBQUssQ0FBQ3JLLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDakM7RUFFSixDQUFDO0VBRURvRixLQUFLLENBQUMvRixTQUFTLENBQUMyUSxTQUFTLEdBQUcsWUFBVztJQUVuQyxJQUFJekssQ0FBQyxHQUFHLElBQUk7TUFBRTBLLENBQUM7TUFBRUMsQ0FBQztNQUFFQyxDQUFDO01BQUVDLFNBQVM7TUFBRUMsV0FBVztNQUFFQyxjQUFjO01BQUNDLGdCQUFnQjtJQUU5RUgsU0FBUyxHQUFHcFMsUUFBUSxDQUFDd1Msc0JBQXNCLEVBQUU7SUFDN0NGLGNBQWMsR0FBRy9LLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ2tDLFFBQVEsRUFBRTtJQUVyQyxJQUFHakksQ0FBQyxDQUFDekgsT0FBTyxDQUFDOEosSUFBSSxHQUFHLENBQUMsRUFBRTtNQUVuQjJJLGdCQUFnQixHQUFHaEwsQ0FBQyxDQUFDekgsT0FBTyxDQUFDaUssWUFBWSxHQUFHeEMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDOEosSUFBSTtNQUMxRHlJLFdBQVcsR0FBR25OLElBQUksQ0FBQ3FMLElBQUksQ0FDbkIrQixjQUFjLENBQUMzUCxNQUFNLEdBQUc0UCxnQkFBZ0IsQ0FDM0M7TUFFRCxLQUFJTixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdJLFdBQVcsRUFBRUosQ0FBQyxFQUFFLEVBQUM7UUFDNUIsSUFBSW5JLEtBQUssR0FBRzlKLFFBQVEsQ0FBQ2lFLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekMsS0FBSWlPLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzNLLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzhKLElBQUksRUFBRXNJLENBQUMsRUFBRSxFQUFFO1VBQ2hDLElBQUlPLEdBQUcsR0FBR3pTLFFBQVEsQ0FBQ2lFLGFBQWEsQ0FBQyxLQUFLLENBQUM7VUFDdkMsS0FBSWtPLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzVLLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2lLLFlBQVksRUFBRW9JLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUk5UCxNQUFNLEdBQUk0UCxDQUFDLEdBQUdNLGdCQUFnQixJQUFLTCxDQUFDLEdBQUczSyxDQUFDLENBQUN6SCxPQUFPLENBQUNpSyxZQUFZLEdBQUlvSSxDQUFDLENBQUU7WUFDeEUsSUFBSUcsY0FBYyxDQUFDSSxHQUFHLENBQUNyUSxNQUFNLENBQUMsRUFBRTtjQUM1Qm9RLEdBQUcsQ0FBQ0UsV0FBVyxDQUFDTCxjQUFjLENBQUNJLEdBQUcsQ0FBQ3JRLE1BQU0sQ0FBQyxDQUFDO1lBQy9DO1VBQ0o7VUFDQXlILEtBQUssQ0FBQzZJLFdBQVcsQ0FBQ0YsR0FBRyxDQUFDO1FBQzFCO1FBQ0FMLFNBQVMsQ0FBQ08sV0FBVyxDQUFDN0ksS0FBSyxDQUFDO01BQ2hDO01BRUF2QyxDQUFDLENBQUMrRixPQUFPLENBQUNzRixLQUFLLEVBQUUsQ0FBQ2hOLE1BQU0sQ0FBQ3dNLFNBQVMsQ0FBQztNQUNuQzdLLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ2tDLFFBQVEsRUFBRSxDQUFDQSxRQUFRLEVBQUUsQ0FBQ0EsUUFBUSxFQUFFLENBQ3JDL0ssR0FBRyxDQUFDO1FBQ0QsT0FBTyxFQUFFLEdBQUcsR0FBRzhDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2lLLFlBQVksR0FBSSxHQUFHO1FBQzVDLFNBQVMsRUFBRTtNQUNmLENBQUMsQ0FBQztJQUVWO0VBRUosQ0FBQztFQUVEM0MsS0FBSyxDQUFDL0YsU0FBUyxDQUFDd1IsZUFBZSxHQUFHLFVBQVNDLE9BQU8sRUFBRUMsV0FBVyxFQUFFO0lBRTdELElBQUl4TCxDQUFDLEdBQUcsSUFBSTtNQUNSeUwsVUFBVTtNQUFFQyxnQkFBZ0I7TUFBRUMsY0FBYztNQUFFQyxpQkFBaUIsR0FBRyxLQUFLO0lBQzNFLElBQUlDLFdBQVcsR0FBRzdMLENBQUMsQ0FBQytGLE9BQU8sQ0FBQytGLEtBQUssRUFBRTtJQUNuQyxJQUFJMUYsV0FBVyxHQUFHbkssTUFBTSxDQUFDc0IsVUFBVSxJQUFJbkYsQ0FBQyxDQUFDNkQsTUFBTSxDQUFDLENBQUM2UCxLQUFLLEVBQUU7SUFFeEQsSUFBSTlMLENBQUMsQ0FBQ21DLFNBQVMsS0FBSyxRQUFRLEVBQUU7TUFDMUJ3SixjQUFjLEdBQUd2RixXQUFXO0lBQ2hDLENBQUMsTUFBTSxJQUFJcEcsQ0FBQyxDQUFDbUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtNQUNqQ3dKLGNBQWMsR0FBR0UsV0FBVztJQUNoQyxDQUFDLE1BQU0sSUFBSTdMLENBQUMsQ0FBQ21DLFNBQVMsS0FBSyxLQUFLLEVBQUU7TUFDOUJ3SixjQUFjLEdBQUdoTyxJQUFJLENBQUNvTyxHQUFHLENBQUMzRixXQUFXLEVBQUV5RixXQUFXLENBQUM7SUFDdkQ7SUFFQSxJQUFLN0wsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkosVUFBVSxJQUNyQnBDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZKLFVBQVUsQ0FBQ2hILE1BQU0sSUFDM0I0RSxDQUFDLENBQUN6SCxPQUFPLENBQUM2SixVQUFVLEtBQUssSUFBSSxFQUFFO01BRS9Cc0osZ0JBQWdCLEdBQUcsSUFBSTtNQUV2QixLQUFLRCxVQUFVLElBQUl6TCxDQUFDLENBQUNxRixXQUFXLEVBQUU7UUFDOUIsSUFBSXJGLENBQUMsQ0FBQ3FGLFdBQVcsQ0FBQzJHLGNBQWMsQ0FBQ1AsVUFBVSxDQUFDLEVBQUU7VUFDMUMsSUFBSXpMLENBQUMsQ0FBQ3NHLGdCQUFnQixDQUFDdkUsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUMxQyxJQUFJNEosY0FBYyxHQUFHM0wsQ0FBQyxDQUFDcUYsV0FBVyxDQUFDb0csVUFBVSxDQUFDLEVBQUU7Y0FDNUNDLGdCQUFnQixHQUFHMUwsQ0FBQyxDQUFDcUYsV0FBVyxDQUFDb0csVUFBVSxDQUFDO1lBQ2hEO1VBQ0osQ0FBQyxNQUFNO1lBQ0gsSUFBSUUsY0FBYyxHQUFHM0wsQ0FBQyxDQUFDcUYsV0FBVyxDQUFDb0csVUFBVSxDQUFDLEVBQUU7Y0FDNUNDLGdCQUFnQixHQUFHMUwsQ0FBQyxDQUFDcUYsV0FBVyxDQUFDb0csVUFBVSxDQUFDO1lBQ2hEO1VBQ0o7UUFDSjtNQUNKO01BRUEsSUFBSUMsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1FBQzNCLElBQUkxTCxDQUFDLENBQUNrRixnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7VUFDN0IsSUFBSXdHLGdCQUFnQixLQUFLMUwsQ0FBQyxDQUFDa0YsZ0JBQWdCLElBQUlzRyxXQUFXLEVBQUU7WUFDeER4TCxDQUFDLENBQUNrRixnQkFBZ0IsR0FDZHdHLGdCQUFnQjtZQUNwQixJQUFJMUwsQ0FBQyxDQUFDc0Ysa0JBQWtCLENBQUNvRyxnQkFBZ0IsQ0FBQyxLQUFLLFNBQVMsRUFBRTtjQUN0RDFMLENBQUMsQ0FBQ2lNLE9BQU8sQ0FBQ1AsZ0JBQWdCLENBQUM7WUFDL0IsQ0FBQyxNQUFNO2NBQ0gxTCxDQUFDLENBQUN6SCxPQUFPLEdBQUdILENBQUMsQ0FBQ3dHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRW9CLENBQUMsQ0FBQ3NHLGdCQUFnQixFQUN2Q3RHLENBQUMsQ0FBQ3NGLGtCQUFrQixDQUNoQm9HLGdCQUFnQixDQUFDLENBQUM7Y0FDMUIsSUFBSUgsT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDbEJ2TCxDQUFDLENBQUM2RCxZQUFZLEdBQUc3RCxDQUFDLENBQUN6SCxPQUFPLENBQUNzSixZQUFZO2NBQzNDO2NBQ0E3QixDQUFDLENBQUNrTSxPQUFPLENBQUNYLE9BQU8sQ0FBQztZQUN0QjtZQUNBSyxpQkFBaUIsR0FBR0YsZ0JBQWdCO1VBQ3hDO1FBQ0osQ0FBQyxNQUFNO1VBQ0gxTCxDQUFDLENBQUNrRixnQkFBZ0IsR0FBR3dHLGdCQUFnQjtVQUNyQyxJQUFJMUwsQ0FBQyxDQUFDc0Ysa0JBQWtCLENBQUNvRyxnQkFBZ0IsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN0RDFMLENBQUMsQ0FBQ2lNLE9BQU8sQ0FBQ1AsZ0JBQWdCLENBQUM7VUFDL0IsQ0FBQyxNQUFNO1lBQ0gxTCxDQUFDLENBQUN6SCxPQUFPLEdBQUdILENBQUMsQ0FBQ3dHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRW9CLENBQUMsQ0FBQ3NHLGdCQUFnQixFQUN2Q3RHLENBQUMsQ0FBQ3NGLGtCQUFrQixDQUNoQm9HLGdCQUFnQixDQUFDLENBQUM7WUFDMUIsSUFBSUgsT0FBTyxLQUFLLElBQUksRUFBRTtjQUNsQnZMLENBQUMsQ0FBQzZELFlBQVksR0FBRzdELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NKLFlBQVk7WUFDM0M7WUFDQTdCLENBQUMsQ0FBQ2tNLE9BQU8sQ0FBQ1gsT0FBTyxDQUFDO1VBQ3RCO1VBQ0FLLGlCQUFpQixHQUFHRixnQkFBZ0I7UUFDeEM7TUFDSixDQUFDLE1BQU07UUFDSCxJQUFJMUwsQ0FBQyxDQUFDa0YsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1VBQzdCbEYsQ0FBQyxDQUFDa0YsZ0JBQWdCLEdBQUcsSUFBSTtVQUN6QmxGLENBQUMsQ0FBQ3pILE9BQU8sR0FBR3lILENBQUMsQ0FBQ3NHLGdCQUFnQjtVQUM5QixJQUFJaUYsT0FBTyxLQUFLLElBQUksRUFBRTtZQUNsQnZMLENBQUMsQ0FBQzZELFlBQVksR0FBRzdELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NKLFlBQVk7VUFDM0M7VUFDQTdCLENBQUMsQ0FBQ2tNLE9BQU8sQ0FBQ1gsT0FBTyxDQUFDO1VBQ2xCSyxpQkFBaUIsR0FBR0YsZ0JBQWdCO1FBQ3hDO01BQ0o7O01BRUE7TUFDQSxJQUFJLENBQUNILE9BQU8sSUFBSUssaUJBQWlCLEtBQUssS0FBSyxFQUFHO1FBQzFDNUwsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDek0sT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDMEcsQ0FBQyxFQUFFNEwsaUJBQWlCLENBQUMsQ0FBQztNQUMzRDtJQUNKO0VBRUosQ0FBQztFQUVEL0wsS0FBSyxDQUFDL0YsU0FBUyxDQUFDOE0sV0FBVyxHQUFHLFVBQVN1RixLQUFLLEVBQUVDLFdBQVcsRUFBRTtJQUV2RCxJQUFJcE0sQ0FBQyxHQUFHLElBQUk7TUFDUlgsT0FBTyxHQUFHakgsQ0FBQyxDQUFDK1QsS0FBSyxDQUFDeFAsYUFBYSxDQUFDO01BQ2hDMFAsV0FBVztNQUFFMUgsV0FBVztNQUFFMkgsWUFBWTs7SUFFMUM7SUFDQSxJQUFHak4sT0FBTyxDQUFDdEUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ2hCb1IsS0FBSyxDQUFDeFEsY0FBYyxFQUFFO0lBQzFCOztJQUVBO0lBQ0EsSUFBRyxDQUFDMEQsT0FBTyxDQUFDdEUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQ2xCc0UsT0FBTyxHQUFHQSxPQUFPLENBQUNrTixPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ25DO0lBRUFELFlBQVksR0FBSXRNLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsS0FBSyxDQUFFO0lBQzlEMkosV0FBVyxHQUFHQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUN0TSxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUM2RCxZQUFZLElBQUk3RCxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjO0lBRTNGLFFBQVF5SixLQUFLLENBQUN4TixJQUFJLENBQUM2TixPQUFPO01BRXRCLEtBQUssVUFBVTtRQUNYN0gsV0FBVyxHQUFHMEgsV0FBVyxLQUFLLENBQUMsR0FBR3JNLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsR0FBRzFDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRzRKLFdBQVc7UUFDakcsSUFBSXJNLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtVQUN2Q3pDLENBQUMsQ0FBQ3dKLFlBQVksQ0FBQ3hKLENBQUMsQ0FBQzZELFlBQVksR0FBR2MsV0FBVyxFQUFFLEtBQUssRUFBRXlILFdBQVcsQ0FBQztRQUNwRTtRQUNBO01BRUosS0FBSyxNQUFNO1FBQ1B6SCxXQUFXLEdBQUcwSCxXQUFXLEtBQUssQ0FBQyxHQUFHck0sQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxHQUFHMkosV0FBVztRQUN4RSxJQUFJck0sQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1VBQ3ZDekMsQ0FBQyxDQUFDd0osWUFBWSxDQUFDeEosQ0FBQyxDQUFDNkQsWUFBWSxHQUFHYyxXQUFXLEVBQUUsS0FBSyxFQUFFeUgsV0FBVyxDQUFDO1FBQ3BFO1FBQ0E7TUFFSixLQUFLLE9BQU87UUFDUixJQUFJMUUsS0FBSyxHQUFHeUUsS0FBSyxDQUFDeE4sSUFBSSxDQUFDK0ksS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQ2xDeUUsS0FBSyxDQUFDeE4sSUFBSSxDQUFDK0ksS0FBSyxJQUFJckksT0FBTyxDQUFDcUksS0FBSyxFQUFFLEdBQUcxSCxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjO1FBRWxFMUMsQ0FBQyxDQUFDd0osWUFBWSxDQUFDeEosQ0FBQyxDQUFDeU0sY0FBYyxDQUFDL0UsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFMEUsV0FBVyxDQUFDO1FBQzNEL00sT0FBTyxDQUFDNEksUUFBUSxFQUFFLENBQUMzTyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25DO01BRUo7UUFDSTtJQUFPO0VBR25CLENBQUM7RUFFRHVHLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzJTLGNBQWMsR0FBRyxVQUFTL0UsS0FBSyxFQUFFO0lBRTdDLElBQUkxSCxDQUFDLEdBQUcsSUFBSTtNQUNSME0sVUFBVTtNQUFFQyxhQUFhO0lBRTdCRCxVQUFVLEdBQUcxTSxDQUFDLENBQUM0TSxtQkFBbUIsRUFBRTtJQUNwQ0QsYUFBYSxHQUFHLENBQUM7SUFDakIsSUFBSWpGLEtBQUssR0FBR2dGLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDdFIsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO01BQzNDc00sS0FBSyxHQUFHZ0YsVUFBVSxDQUFDQSxVQUFVLENBQUN0UixNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUMsTUFBTTtNQUNILEtBQUssSUFBSXlSLENBQUMsSUFBSUgsVUFBVSxFQUFFO1FBQ3RCLElBQUloRixLQUFLLEdBQUdnRixVQUFVLENBQUNHLENBQUMsQ0FBQyxFQUFFO1VBQ3ZCbkYsS0FBSyxHQUFHaUYsYUFBYTtVQUNyQjtRQUNKO1FBQ0FBLGFBQWEsR0FBR0QsVUFBVSxDQUFDRyxDQUFDLENBQUM7TUFDakM7SUFDSjtJQUVBLE9BQU9uRixLQUFLO0VBQ2hCLENBQUM7RUFFRDdILEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ2dULGFBQWEsR0FBRyxZQUFXO0lBRXZDLElBQUk5TSxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZJLElBQUksSUFBSXBCLENBQUMsQ0FBQytELEtBQUssS0FBSyxJQUFJLEVBQUU7TUFFcEMzTCxDQUFDLENBQUMsSUFBSSxFQUFFNEgsQ0FBQyxDQUFDK0QsS0FBSyxDQUFDLENBQ1huSSxHQUFHLENBQUMsYUFBYSxFQUFFb0UsQ0FBQyxDQUFDNEcsV0FBVyxDQUFDLENBQ2pDaEwsR0FBRyxDQUFDLGtCQUFrQixFQUFFeEQsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDK00sU0FBUyxFQUFFL00sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQ3REcEUsR0FBRyxDQUFDLGtCQUFrQixFQUFFeEQsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDK00sU0FBUyxFQUFFL00sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO01BRTVELElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRILGFBQWEsS0FBSyxJQUFJLEVBQUU7UUFDbENILENBQUMsQ0FBQytELEtBQUssQ0FBQ25JLEdBQUcsQ0FBQyxlQUFlLEVBQUVvRSxDQUFDLENBQUNrSCxVQUFVLENBQUM7TUFDOUM7SUFDSjtJQUVBbEgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDbkssR0FBRyxDQUFDLHdCQUF3QixDQUFDO0lBRXZDLElBQUlvRSxDQUFDLENBQUN6SCxPQUFPLENBQUNnSSxNQUFNLEtBQUssSUFBSSxJQUFJUCxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFDcEV6QyxDQUFDLENBQUNvRSxVQUFVLElBQUlwRSxDQUFDLENBQUNvRSxVQUFVLENBQUN4SSxHQUFHLENBQUMsYUFBYSxFQUFFb0UsQ0FBQyxDQUFDNEcsV0FBVyxDQUFDO01BQzlENUcsQ0FBQyxDQUFDbUUsVUFBVSxJQUFJbkUsQ0FBQyxDQUFDbUUsVUFBVSxDQUFDdkksR0FBRyxDQUFDLGFBQWEsRUFBRW9FLENBQUMsQ0FBQzRHLFdBQVcsQ0FBQztNQUU5RCxJQUFJNUcsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNEgsYUFBYSxLQUFLLElBQUksRUFBRTtRQUNsQ0gsQ0FBQyxDQUFDb0UsVUFBVSxJQUFJcEUsQ0FBQyxDQUFDb0UsVUFBVSxDQUFDeEksR0FBRyxDQUFDLGVBQWUsRUFBRW9FLENBQUMsQ0FBQ2tILFVBQVUsQ0FBQztRQUMvRGxILENBQUMsQ0FBQ21FLFVBQVUsSUFBSW5FLENBQUMsQ0FBQ21FLFVBQVUsQ0FBQ3ZJLEdBQUcsQ0FBQyxlQUFlLEVBQUVvRSxDQUFDLENBQUNrSCxVQUFVLENBQUM7TUFDbkU7SUFDSjtJQUVBbEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEosR0FBRyxDQUFDLGtDQUFrQyxFQUFFb0UsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBQy9EaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEosR0FBRyxDQUFDLGlDQUFpQyxFQUFFb0UsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBQzlEaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEosR0FBRyxDQUFDLDhCQUE4QixFQUFFb0UsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBQzNEaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEosR0FBRyxDQUFDLG9DQUFvQyxFQUFFb0UsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBRWpFaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEosR0FBRyxDQUFDLGFBQWEsRUFBRW9FLENBQUMsQ0FBQzZHLFlBQVksQ0FBQztJQUUxQ3pPLENBQUMsQ0FBQ0ssUUFBUSxDQUFDLENBQUNtRCxHQUFHLENBQUNvRSxDQUFDLENBQUNtRyxnQkFBZ0IsRUFBRW5HLENBQUMsQ0FBQ2dOLFVBQVUsQ0FBQztJQUVqRGhOLENBQUMsQ0FBQ2lOLGtCQUFrQixFQUFFO0lBRXRCLElBQUlqTixDQUFDLENBQUN6SCxPQUFPLENBQUM0SCxhQUFhLEtBQUssSUFBSSxFQUFFO01BQ2xDSCxDQUFDLENBQUM4RSxLQUFLLENBQUNsSixHQUFHLENBQUMsZUFBZSxFQUFFb0UsQ0FBQyxDQUFDa0gsVUFBVSxDQUFDO0lBQzlDO0lBRUEsSUFBSWxILENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21KLGFBQWEsS0FBSyxJQUFJLEVBQUU7TUFDbEN0SixDQUFDLENBQUM0SCxDQUFDLENBQUN3RSxXQUFXLENBQUMsQ0FBQ3lELFFBQVEsRUFBRSxDQUFDck0sR0FBRyxDQUFDLGFBQWEsRUFBRW9FLENBQUMsQ0FBQzhHLGFBQWEsQ0FBQztJQUNuRTtJQUVBMU8sQ0FBQyxDQUFDNkQsTUFBTSxDQUFDLENBQUNMLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBR29FLENBQUMsQ0FBQ0YsV0FBVyxFQUFFRSxDQUFDLENBQUNrTixpQkFBaUIsQ0FBQztJQUVwRjlVLENBQUMsQ0FBQzZELE1BQU0sQ0FBQyxDQUFDTCxHQUFHLENBQUMscUJBQXFCLEdBQUdvRSxDQUFDLENBQUNGLFdBQVcsRUFBRUUsQ0FBQyxDQUFDckYsTUFBTSxDQUFDO0lBRTlEdkMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFNEgsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDLENBQUM1SSxHQUFHLENBQUMsV0FBVyxFQUFFb0UsQ0FBQyxDQUFDckUsY0FBYyxDQUFDO0lBRXhFdkQsQ0FBQyxDQUFDNkQsTUFBTSxDQUFDLENBQUNMLEdBQUcsQ0FBQyxtQkFBbUIsR0FBR29FLENBQUMsQ0FBQ0YsV0FBVyxFQUFFRSxDQUFDLENBQUMrRyxXQUFXLENBQUM7RUFFckUsQ0FBQztFQUVEbEgsS0FBSyxDQUFDL0YsU0FBUyxDQUFDbVQsa0JBQWtCLEdBQUcsWUFBVztJQUU1QyxJQUFJak4sQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEosR0FBRyxDQUFDLGtCQUFrQixFQUFFeEQsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDK00sU0FBUyxFQUFFL00sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlEQSxDQUFDLENBQUM4RSxLQUFLLENBQUNsSixHQUFHLENBQUMsa0JBQWtCLEVBQUV4RCxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUMrTSxTQUFTLEVBQUUvTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFFbkUsQ0FBQztFQUVESCxLQUFLLENBQUMvRixTQUFTLENBQUNxVCxXQUFXLEdBQUcsWUFBVztJQUVyQyxJQUFJbk4sQ0FBQyxHQUFHLElBQUk7TUFBRStLLGNBQWM7SUFFNUIsSUFBRy9LLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzhKLElBQUksR0FBRyxDQUFDLEVBQUU7TUFDbkIwSSxjQUFjLEdBQUcvSyxDQUFDLENBQUN5RSxPQUFPLENBQUN3RCxRQUFRLEVBQUUsQ0FBQ0EsUUFBUSxFQUFFO01BQ2hEOEMsY0FBYyxDQUFDbEIsVUFBVSxDQUFDLE9BQU8sQ0FBQztNQUNsQzdKLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ3NGLEtBQUssRUFBRSxDQUFDaE4sTUFBTSxDQUFDME0sY0FBYyxDQUFDO0lBQzVDO0VBRUosQ0FBQztFQUVEbEwsS0FBSyxDQUFDL0YsU0FBUyxDQUFDK00sWUFBWSxHQUFHLFVBQVNzRixLQUFLLEVBQUU7SUFFM0MsSUFBSW5NLENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSUEsQ0FBQyxDQUFDOEYsV0FBVyxLQUFLLEtBQUssRUFBRTtNQUN6QnFHLEtBQUssQ0FBQ2lCLHdCQUF3QixFQUFFO01BQ2hDakIsS0FBSyxDQUFDa0IsZUFBZSxFQUFFO01BQ3ZCbEIsS0FBSyxDQUFDeFEsY0FBYyxFQUFFO0lBQzFCO0VBRUosQ0FBQztFQUVEa0UsS0FBSyxDQUFDL0YsU0FBUyxDQUFDd1QsT0FBTyxHQUFHLFVBQVNwQixPQUFPLEVBQUU7SUFFeEMsSUFBSWxNLENBQUMsR0FBRyxJQUFJO0lBRVpBLENBQUMsQ0FBQzBHLGFBQWEsRUFBRTtJQUVqQjFHLENBQUMsQ0FBQytFLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFbEIvRSxDQUFDLENBQUM4TSxhQUFhLEVBQUU7SUFFakIxVSxDQUFDLENBQUMsZUFBZSxFQUFFNEgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDLENBQUNtQyxNQUFNLEVBQUU7SUFFdEMsSUFBSWxJLENBQUMsQ0FBQytELEtBQUssRUFBRTtNQUNUL0QsQ0FBQyxDQUFDK0QsS0FBSyxDQUFDekgsTUFBTSxFQUFFO0lBQ3BCO0lBRUEsSUFBSzBELENBQUMsQ0FBQ29FLFVBQVUsSUFBSXBFLENBQUMsQ0FBQ29FLFVBQVUsQ0FBQ2hKLE1BQU0sRUFBRztNQUV2QzRFLENBQUMsQ0FBQ29FLFVBQVUsQ0FDUHZJLFdBQVcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUN0RGdPLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUNoRDNNLEdBQUcsQ0FBQyxTQUFTLEVBQUMsRUFBRSxDQUFDO01BRXRCLElBQUs4QyxDQUFDLENBQUNtSCxRQUFRLENBQUM1SCxJQUFJLENBQUVTLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tJLFNBQVMsQ0FBRSxFQUFFO1FBQ3pDVCxDQUFDLENBQUNvRSxVQUFVLENBQUM5SCxNQUFNLEVBQUU7TUFDekI7SUFDSjtJQUVBLElBQUswRCxDQUFDLENBQUNtRSxVQUFVLElBQUluRSxDQUFDLENBQUNtRSxVQUFVLENBQUMvSSxNQUFNLEVBQUc7TUFFdkM0RSxDQUFDLENBQUNtRSxVQUFVLENBQ1B0SSxXQUFXLENBQUMseUNBQXlDLENBQUMsQ0FDdERnTyxVQUFVLENBQUMsb0NBQW9DLENBQUMsQ0FDaEQzTSxHQUFHLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQztNQUV0QixJQUFLOEMsQ0FBQyxDQUFDbUgsUUFBUSxDQUFDNUgsSUFBSSxDQUFFUyxDQUFDLENBQUN6SCxPQUFPLENBQUNtSSxTQUFTLENBQUUsRUFBRTtRQUN6Q1YsQ0FBQyxDQUFDbUUsVUFBVSxDQUFDN0gsTUFBTSxFQUFFO01BQ3pCO0lBQ0o7SUFHQSxJQUFJMEQsQ0FBQyxDQUFDeUUsT0FBTyxFQUFFO01BRVh6RSxDQUFDLENBQUN5RSxPQUFPLENBQ0o1SSxXQUFXLENBQUMsbUVBQW1FLENBQUMsQ0FDaEZnTyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQ3pCQSxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FDOUJwTCxJQUFJLENBQUMsWUFBVTtRQUNackcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDZ0gsSUFBSSxDQUFDLE9BQU8sRUFBRWhILENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ3VHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO01BQzFELENBQUMsQ0FBQztNQUVOcUIsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLElBQUksQ0FBQzFQLE9BQU8sQ0FBQ2dLLEtBQUssQ0FBQyxDQUFDMkYsTUFBTSxFQUFFO01BRW5EbEksQ0FBQyxDQUFDd0UsV0FBVyxDQUFDMEQsTUFBTSxFQUFFO01BRXRCbEksQ0FBQyxDQUFDOEUsS0FBSyxDQUFDb0QsTUFBTSxFQUFFO01BRWhCbEksQ0FBQyxDQUFDK0YsT0FBTyxDQUFDMUgsTUFBTSxDQUFDMkIsQ0FBQyxDQUFDeUUsT0FBTyxDQUFDO0lBQy9CO0lBRUF6RSxDQUFDLENBQUNtTixXQUFXLEVBQUU7SUFFZm5OLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ2xLLFdBQVcsQ0FBQyxjQUFjLENBQUM7SUFDckNtRSxDQUFDLENBQUMrRixPQUFPLENBQUNsSyxXQUFXLENBQUMsbUJBQW1CLENBQUM7SUFDMUNtRSxDQUFDLENBQUMrRixPQUFPLENBQUNsSyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBRXJDbUUsQ0FBQyxDQUFDaUYsU0FBUyxHQUFHLElBQUk7SUFFbEIsSUFBRyxDQUFDaUgsT0FBTyxFQUFFO01BQ1RsTSxDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMwRyxDQUFDLENBQUMsQ0FBQztJQUNyQztFQUVKLENBQUM7RUFFREgsS0FBSyxDQUFDL0YsU0FBUyxDQUFDc1AsaUJBQWlCLEdBQUcsVUFBUzdHLEtBQUssRUFBRTtJQUVoRCxJQUFJdkMsQ0FBQyxHQUFHLElBQUk7TUFDUmhGLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFFbkJBLFVBQVUsQ0FBQ2dGLENBQUMsQ0FBQ2tHLGNBQWMsQ0FBQyxHQUFHLEVBQUU7SUFFakMsSUFBSWxHLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tKLElBQUksS0FBSyxLQUFLLEVBQUU7TUFDMUJ6QixDQUFDLENBQUN3RSxXQUFXLENBQUN0SCxHQUFHLENBQUNsQyxVQUFVLENBQUM7SUFDakMsQ0FBQyxNQUFNO01BQ0hnRixDQUFDLENBQUN5RSxPQUFPLENBQUNxRCxFQUFFLENBQUN2RixLQUFLLENBQUMsQ0FBQ3JGLEdBQUcsQ0FBQ2xDLFVBQVUsQ0FBQztJQUN2QztFQUVKLENBQUM7RUFFRDZFLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3lULFNBQVMsR0FBRyxVQUFTQyxVQUFVLEVBQUVqUixRQUFRLEVBQUU7SUFFdkQsSUFBSXlELENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSUEsQ0FBQyxDQUFDdUYsY0FBYyxLQUFLLEtBQUssRUFBRTtNQUU1QnZGLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQzBGLFVBQVUsQ0FBQyxDQUFDdFEsR0FBRyxDQUFDO1FBQ3pCb0csTUFBTSxFQUFFdEQsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0s7TUFDdEIsQ0FBQyxDQUFDO01BRUZ0RCxDQUFDLENBQUN5RSxPQUFPLENBQUNxRCxFQUFFLENBQUMwRixVQUFVLENBQUMsQ0FBQ2hSLE9BQU8sQ0FBQztRQUM3QmlSLE9BQU8sRUFBRTtNQUNiLENBQUMsRUFBRXpOLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29LLEtBQUssRUFBRTNDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2dKLE1BQU0sRUFBRWhGLFFBQVEsQ0FBQztJQUVuRCxDQUFDLE1BQU07TUFFSHlELENBQUMsQ0FBQ2tKLGVBQWUsQ0FBQ3NFLFVBQVUsQ0FBQztNQUU3QnhOLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQzBGLFVBQVUsQ0FBQyxDQUFDdFEsR0FBRyxDQUFDO1FBQ3pCdVEsT0FBTyxFQUFFLENBQUM7UUFDVm5LLE1BQU0sRUFBRXRELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytLO01BQ3RCLENBQUMsQ0FBQztNQUVGLElBQUkvRyxRQUFRLEVBQUU7UUFDVjRNLFVBQVUsQ0FBQyxZQUFXO1VBRWxCbkosQ0FBQyxDQUFDb0osaUJBQWlCLENBQUNvRSxVQUFVLENBQUM7VUFFL0JqUixRQUFRLENBQUNrRCxJQUFJLEVBQUU7UUFDbkIsQ0FBQyxFQUFFTyxDQUFDLENBQUN6SCxPQUFPLENBQUNvSyxLQUFLLENBQUM7TUFDdkI7SUFFSjtFQUVKLENBQUM7RUFFRDlDLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzRULFlBQVksR0FBRyxVQUFTRixVQUFVLEVBQUU7SUFFaEQsSUFBSXhOLENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSUEsQ0FBQyxDQUFDdUYsY0FBYyxLQUFLLEtBQUssRUFBRTtNQUU1QnZGLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQzBGLFVBQVUsQ0FBQyxDQUFDaFIsT0FBTyxDQUFDO1FBQzdCaVIsT0FBTyxFQUFFLENBQUM7UUFDVm5LLE1BQU0sRUFBRXRELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytLLE1BQU0sR0FBRztNQUMvQixDQUFDLEVBQUV0RCxDQUFDLENBQUN6SCxPQUFPLENBQUNvSyxLQUFLLEVBQUUzQyxDQUFDLENBQUN6SCxPQUFPLENBQUNnSixNQUFNLENBQUM7SUFFekMsQ0FBQyxNQUFNO01BRUh2QixDQUFDLENBQUNrSixlQUFlLENBQUNzRSxVQUFVLENBQUM7TUFFN0J4TixDQUFDLENBQUN5RSxPQUFPLENBQUNxRCxFQUFFLENBQUMwRixVQUFVLENBQUMsQ0FBQ3RRLEdBQUcsQ0FBQztRQUN6QnVRLE9BQU8sRUFBRSxDQUFDO1FBQ1ZuSyxNQUFNLEVBQUV0RCxDQUFDLENBQUN6SCxPQUFPLENBQUMrSyxNQUFNLEdBQUc7TUFDL0IsQ0FBQyxDQUFDO0lBRU47RUFFSixDQUFDO0VBRUR6RCxLQUFLLENBQUMvRixTQUFTLENBQUM2VCxZQUFZLEdBQUc5TixLQUFLLENBQUMvRixTQUFTLENBQUM4VCxXQUFXLEdBQUcsVUFBU0MsTUFBTSxFQUFFO0lBRTFFLElBQUk3TixDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUk2TixNQUFNLEtBQUssSUFBSSxFQUFFO01BRWpCN04sQ0FBQyxDQUFDZ0csWUFBWSxHQUFHaEcsQ0FBQyxDQUFDeUUsT0FBTztNQUUxQnpFLENBQUMsQ0FBQzRILE1BQU0sRUFBRTtNQUVWNUgsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLElBQUksQ0FBQzFQLE9BQU8sQ0FBQ2dLLEtBQUssQ0FBQyxDQUFDMkYsTUFBTSxFQUFFO01BRW5EbEksQ0FBQyxDQUFDZ0csWUFBWSxDQUFDNkgsTUFBTSxDQUFDQSxNQUFNLENBQUMsQ0FBQ3hTLFFBQVEsQ0FBQzJFLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQztNQUVyRHhFLENBQUMsQ0FBQ21JLE1BQU0sRUFBRTtJQUVkO0VBRUosQ0FBQztFQUVEdEksS0FBSyxDQUFDL0YsU0FBUyxDQUFDZ1UsWUFBWSxHQUFHLFlBQVc7SUFFdEMsSUFBSTlOLENBQUMsR0FBRyxJQUFJO0lBRVpBLENBQUMsQ0FBQytGLE9BQU8sQ0FDSm5LLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUM3QmhCLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsVUFBU3VSLEtBQUssRUFBRTtNQUVuREEsS0FBSyxDQUFDaUIsd0JBQXdCLEVBQUU7TUFDaEMsSUFBSVcsR0FBRyxHQUFHM1YsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUVqQitRLFVBQVUsQ0FBQyxZQUFXO1FBRWxCLElBQUluSixDQUFDLENBQUN6SCxPQUFPLENBQUMwSixZQUFZLEVBQUc7VUFDekJqQyxDQUFDLENBQUN3RixRQUFRLEdBQUd1SSxHQUFHLENBQUNoVCxFQUFFLENBQUMsUUFBUSxDQUFDO1VBQzdCaUYsQ0FBQyxDQUFDeUcsUUFBUSxFQUFFO1FBQ2hCO01BRUosQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVULENBQUMsQ0FBQztFQUNOLENBQUM7RUFFRDVHLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ2tVLFVBQVUsR0FBR25PLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ21VLGlCQUFpQixHQUFHLFlBQVc7SUFFeEUsSUFBSWpPLENBQUMsR0FBRyxJQUFJO0lBQ1osT0FBT0EsQ0FBQyxDQUFDNkQsWUFBWTtFQUV6QixDQUFDO0VBRURoRSxLQUFLLENBQUMvRixTQUFTLENBQUNtUSxXQUFXLEdBQUcsWUFBVztJQUVyQyxJQUFJakssQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFJa08sVUFBVSxHQUFHLENBQUM7SUFDbEIsSUFBSUMsT0FBTyxHQUFHLENBQUM7SUFDZixJQUFJQyxRQUFRLEdBQUcsQ0FBQztJQUVoQixJQUFJcE8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxLQUFLLElBQUksRUFBRTtNQUM3QixJQUFJNUIsQ0FBQyxDQUFDc0UsVUFBVSxJQUFJdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1FBQ3ZDLEVBQUUyTCxRQUFRO01BQ2YsQ0FBQyxNQUFNO1FBQ0gsT0FBT0YsVUFBVSxHQUFHbE8sQ0FBQyxDQUFDc0UsVUFBVSxFQUFFO1VBQzlCLEVBQUU4SixRQUFRO1VBQ1ZGLFVBQVUsR0FBR0MsT0FBTyxHQUFHbk8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYztVQUMvQ3lMLE9BQU8sSUFBSW5PLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsSUFBSTFDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBR3pDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsR0FBRzFDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVk7UUFDckg7TUFDSjtJQUNKLENBQUMsTUFBTSxJQUFJekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0ksVUFBVSxLQUFLLElBQUksRUFBRTtNQUN0Q3VOLFFBQVEsR0FBR3BPLENBQUMsQ0FBQ3NFLFVBQVU7SUFDM0IsQ0FBQyxNQUFNLElBQUcsQ0FBQ3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2lJLFFBQVEsRUFBRTtNQUMzQjROLFFBQVEsR0FBRyxDQUFDLEdBQUd6USxJQUFJLENBQUNxTCxJQUFJLENBQUMsQ0FBQ2hKLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksSUFBSXpDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsQ0FBQztJQUNoRyxDQUFDLE1BQUs7TUFDRixPQUFPd0wsVUFBVSxHQUFHbE8sQ0FBQyxDQUFDc0UsVUFBVSxFQUFFO1FBQzlCLEVBQUU4SixRQUFRO1FBQ1ZGLFVBQVUsR0FBR0MsT0FBTyxHQUFHbk8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYztRQUMvQ3lMLE9BQU8sSUFBSW5PLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsSUFBSTFDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBR3pDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsR0FBRzFDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVk7TUFDckg7SUFDSjtJQUVBLE9BQU8yTCxRQUFRLEdBQUcsQ0FBQztFQUV2QixDQUFDO0VBRUR2TyxLQUFLLENBQUMvRixTQUFTLENBQUN1VSxPQUFPLEdBQUcsVUFBU2IsVUFBVSxFQUFFO0lBRTNDLElBQUl4TixDQUFDLEdBQUcsSUFBSTtNQUNSeUksVUFBVTtNQUNWNkYsY0FBYztNQUNkQyxjQUFjLEdBQUcsQ0FBQztNQUNsQkMsV0FBVztNQUNYQyxJQUFJO0lBRVJ6TyxDQUFDLENBQUMyRSxXQUFXLEdBQUcsQ0FBQztJQUNqQjJKLGNBQWMsR0FBR3RPLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3lGLEtBQUssRUFBRSxDQUFDNUIsV0FBVyxDQUFDLElBQUksQ0FBQztJQUVwRCxJQUFJdEksQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxLQUFLLElBQUksRUFBRTtNQUM3QixJQUFJNUIsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1FBQ3ZDekMsQ0FBQyxDQUFDMkUsV0FBVyxHQUFJM0UsQ0FBQyxDQUFDdUUsVUFBVSxHQUFHdkUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFJLENBQUMsQ0FBQztRQUM1RGdNLElBQUksR0FBRyxDQUFDLENBQUM7UUFFVCxJQUFJek8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDNEssUUFBUSxLQUFLLElBQUksSUFBSW5ELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLEVBQUU7VUFDOUQsSUFBSWIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxLQUFLLENBQUMsRUFBRTtZQUM5QmdNLElBQUksR0FBRyxDQUFDLEdBQUc7VUFDZixDQUFDLE1BQU0sSUFBSXpPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDckNnTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1VBQ2I7UUFDSjtRQUNBRixjQUFjLEdBQUlELGNBQWMsR0FBR3RPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBSWdNLElBQUk7TUFDckU7TUFDQSxJQUFJek8sQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxLQUFLLENBQUMsRUFBRTtRQUMvQyxJQUFJOEssVUFBVSxHQUFHeE4sQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxHQUFHMUMsQ0FBQyxDQUFDc0UsVUFBVSxJQUFJdEUsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1VBQy9GLElBQUkrSyxVQUFVLEdBQUd4TixDQUFDLENBQUNzRSxVQUFVLEVBQUU7WUFDM0J0RSxDQUFDLENBQUMyRSxXQUFXLEdBQUksQ0FBQzNFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksSUFBSStLLFVBQVUsR0FBR3hOLENBQUMsQ0FBQ3NFLFVBQVUsQ0FBQyxJQUFJdEUsQ0FBQyxDQUFDdUUsVUFBVSxHQUFJLENBQUMsQ0FBQztZQUM1RmdLLGNBQWMsR0FBSSxDQUFDdk8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxJQUFJK0ssVUFBVSxHQUFHeE4sQ0FBQyxDQUFDc0UsVUFBVSxDQUFDLElBQUlnSyxjQUFjLEdBQUksQ0FBQyxDQUFDO1VBQ25HLENBQUMsTUFBTTtZQUNIdE8sQ0FBQyxDQUFDMkUsV0FBVyxHQUFLM0UsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxHQUFJMUMsQ0FBQyxDQUFDdUUsVUFBVSxHQUFJLENBQUMsQ0FBQztZQUMvRWdLLGNBQWMsR0FBS3ZPLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsR0FBSTRMLGNBQWMsR0FBSSxDQUFDLENBQUM7VUFDdEY7UUFDSjtNQUNKO0lBQ0osQ0FBQyxNQUFNO01BQ0gsSUFBSWQsVUFBVSxHQUFHeE4sQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHekMsQ0FBQyxDQUFDc0UsVUFBVSxFQUFFO1FBQ3BEdEUsQ0FBQyxDQUFDMkUsV0FBVyxHQUFHLENBQUU2SSxVQUFVLEdBQUd4TixDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEdBQUl6QyxDQUFDLENBQUNzRSxVQUFVLElBQUl0RSxDQUFDLENBQUN1RSxVQUFVO1FBQ3JGZ0ssY0FBYyxHQUFHLENBQUVmLFVBQVUsR0FBR3hOLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBSXpDLENBQUMsQ0FBQ3NFLFVBQVUsSUFBSWdLLGNBQWM7TUFDNUY7SUFDSjtJQUVBLElBQUl0TyxDQUFDLENBQUNzRSxVQUFVLElBQUl0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFDeEN6QyxDQUFDLENBQUMyRSxXQUFXLEdBQUcsQ0FBQztNQUNqQjRKLGNBQWMsR0FBRyxDQUFDO0lBQ3RCO0lBRUEsSUFBSXZPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLElBQUliLENBQUMsQ0FBQ3NFLFVBQVUsSUFBSXRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtNQUN6RXpDLENBQUMsQ0FBQzJFLFdBQVcsR0FBSzNFLENBQUMsQ0FBQ3VFLFVBQVUsR0FBRzVHLElBQUksQ0FBQytRLEtBQUssQ0FBQzFPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksQ0FBQyxHQUFJLENBQUMsR0FBTXpDLENBQUMsQ0FBQ3VFLFVBQVUsR0FBR3ZFLENBQUMsQ0FBQ3NFLFVBQVUsR0FBSSxDQUFFO0lBQ25ILENBQUMsTUFBTSxJQUFJdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0ksVUFBVSxLQUFLLElBQUksSUFBSWIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxLQUFLLElBQUksRUFBRTtNQUNyRTVCLENBQUMsQ0FBQzJFLFdBQVcsSUFBSTNFLENBQUMsQ0FBQ3VFLFVBQVUsR0FBRzVHLElBQUksQ0FBQytRLEtBQUssQ0FBQzFPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBR3pDLENBQUMsQ0FBQ3VFLFVBQVU7SUFDekYsQ0FBQyxNQUFNLElBQUl2RSxDQUFDLENBQUN6SCxPQUFPLENBQUNzSSxVQUFVLEtBQUssSUFBSSxFQUFFO01BQ3RDYixDQUFDLENBQUMyRSxXQUFXLEdBQUcsQ0FBQztNQUNqQjNFLENBQUMsQ0FBQzJFLFdBQVcsSUFBSTNFLENBQUMsQ0FBQ3VFLFVBQVUsR0FBRzVHLElBQUksQ0FBQytRLEtBQUssQ0FBQzFPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUU7SUFFQSxJQUFJekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNEssUUFBUSxLQUFLLEtBQUssRUFBRTtNQUM5QnNGLFVBQVUsR0FBSytFLFVBQVUsR0FBR3hOLENBQUMsQ0FBQ3VFLFVBQVUsR0FBSSxDQUFDLENBQUMsR0FBSXZFLENBQUMsQ0FBQzJFLFdBQVc7SUFDbkUsQ0FBQyxNQUFNO01BQ0g4RCxVQUFVLEdBQUsrRSxVQUFVLEdBQUdjLGNBQWMsR0FBSSxDQUFDLENBQUMsR0FBSUMsY0FBYztJQUN0RTtJQUVBLElBQUl2TyxDQUFDLENBQUN6SCxPQUFPLENBQUMySyxhQUFhLEtBQUssSUFBSSxFQUFFO01BRWxDLElBQUlsRCxDQUFDLENBQUNzRSxVQUFVLElBQUl0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUNxSixRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ3hFNE0sV0FBVyxHQUFHeE8sQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDSCxFQUFFLENBQUMwRixVQUFVLENBQUM7TUFDdkUsQ0FBQyxNQUFNO1FBQ0hnQixXQUFXLEdBQUd4TyxDQUFDLENBQUN3RSxXQUFXLENBQUN5RCxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUNILEVBQUUsQ0FBQzBGLFVBQVUsR0FBR3hOLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksQ0FBQztNQUNoRztNQUVBLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssSUFBSSxFQUFFO1FBQ3hCLElBQUlrTSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7VUFDaEIvRixVQUFVLEdBQUcsQ0FBQ3pJLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3NILEtBQUssRUFBRSxHQUFHMEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDRyxVQUFVLEdBQUdILFdBQVcsQ0FBQzFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRixDQUFDLE1BQU07VUFDSHJELFVBQVUsR0FBSSxDQUFDO1FBQ25CO01BQ0osQ0FBQyxNQUFNO1FBQ0hBLFVBQVUsR0FBRytGLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztNQUNwRTtNQUVBLElBQUkzTyxDQUFDLENBQUN6SCxPQUFPLENBQUNzSSxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQy9CLElBQUliLENBQUMsQ0FBQ3NFLFVBQVUsSUFBSXRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksSUFBSXpDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3FKLFFBQVEsS0FBSyxLQUFLLEVBQUU7VUFDeEU0TSxXQUFXLEdBQUd4TyxDQUFDLENBQUN3RSxXQUFXLENBQUN5RCxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUNILEVBQUUsQ0FBQzBGLFVBQVUsQ0FBQztRQUN2RSxDQUFDLE1BQU07VUFDSGdCLFdBQVcsR0FBR3hPLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3lELFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQ0gsRUFBRSxDQUFDMEYsVUFBVSxHQUFHeE4sQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNwRztRQUVBLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssSUFBSSxFQUFFO1VBQ3hCLElBQUlrTSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEIvRixVQUFVLEdBQUcsQ0FBQ3pJLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3NILEtBQUssRUFBRSxHQUFHMEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDRyxVQUFVLEdBQUdILFdBQVcsQ0FBQzFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztVQUMvRixDQUFDLE1BQU07WUFDSHJELFVBQVUsR0FBSSxDQUFDO1VBQ25CO1FBQ0osQ0FBQyxNQUFNO1VBQ0hBLFVBQVUsR0FBRytGLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0EsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNwRTtRQUVBbEcsVUFBVSxJQUFJLENBQUN6SSxDQUFDLENBQUM4RSxLQUFLLENBQUNnSCxLQUFLLEVBQUUsR0FBRzBDLFdBQVcsQ0FBQ0ksVUFBVSxFQUFFLElBQUksQ0FBQztNQUNsRTtJQUNKO0lBRUEsT0FBT25HLFVBQVU7RUFFckIsQ0FBQztFQUVENUksS0FBSyxDQUFDL0YsU0FBUyxDQUFDK1UsU0FBUyxHQUFHaFAsS0FBSyxDQUFDL0YsU0FBUyxDQUFDZ1YsY0FBYyxHQUFHLFVBQVN0USxNQUFNLEVBQUU7SUFFMUUsSUFBSXdCLENBQUMsR0FBRyxJQUFJO0lBRVosT0FBT0EsQ0FBQyxDQUFDekgsT0FBTyxDQUFDaUcsTUFBTSxDQUFDO0VBRTVCLENBQUM7RUFFRHFCLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzhTLG1CQUFtQixHQUFHLFlBQVc7SUFFN0MsSUFBSTVNLENBQUMsR0FBRyxJQUFJO01BQ1JrTyxVQUFVLEdBQUcsQ0FBQztNQUNkQyxPQUFPLEdBQUcsQ0FBQztNQUNYWSxPQUFPLEdBQUcsRUFBRTtNQUNaQyxHQUFHO0lBRVAsSUFBSWhQLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3FKLFFBQVEsS0FBSyxLQUFLLEVBQUU7TUFDOUJvTixHQUFHLEdBQUdoUCxDQUFDLENBQUNzRSxVQUFVO0lBQ3RCLENBQUMsTUFBTTtNQUNINEosVUFBVSxHQUFHbE8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxHQUFHLENBQUMsQ0FBQztNQUMxQ3lMLE9BQU8sR0FBR25PLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsR0FBRyxDQUFDLENBQUM7TUFDdkNzTSxHQUFHLEdBQUdoUCxDQUFDLENBQUNzRSxVQUFVLEdBQUcsQ0FBQztJQUMxQjtJQUVBLE9BQU80SixVQUFVLEdBQUdjLEdBQUcsRUFBRTtNQUNyQkQsT0FBTyxDQUFDRSxJQUFJLENBQUNmLFVBQVUsQ0FBQztNQUN4QkEsVUFBVSxHQUFHQyxPQUFPLEdBQUduTyxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjO01BQy9DeUwsT0FBTyxJQUFJbk8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxJQUFJMUMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxHQUFHMUMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWTtJQUNySDtJQUVBLE9BQU9zTSxPQUFPO0VBRWxCLENBQUM7RUFFRGxQLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ29WLFFBQVEsR0FBRyxZQUFXO0lBRWxDLE9BQU8sSUFBSTtFQUVmLENBQUM7RUFFRHJQLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3FWLGFBQWEsR0FBRyxZQUFXO0lBRXZDLElBQUluUCxDQUFDLEdBQUcsSUFBSTtNQUNSb1AsZUFBZTtNQUFFQyxXQUFXO01BQUVDLFlBQVk7SUFFOUNBLFlBQVksR0FBR3RQLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLEdBQUdiLENBQUMsQ0FBQ3VFLFVBQVUsR0FBRzVHLElBQUksQ0FBQytRLEtBQUssQ0FBQzFPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBRXhHLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUNzSyxZQUFZLEtBQUssSUFBSSxFQUFFO01BQ2pDN0MsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDM0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDNEYsSUFBSSxDQUFDLFVBQVNpSixLQUFLLEVBQUVuRixLQUFLLEVBQUU7UUFDM0QsSUFBSUEsS0FBSyxDQUFDb00sVUFBVSxHQUFHVyxZQUFZLEdBQUlsWCxDQUFDLENBQUNtSyxLQUFLLENBQUMsQ0FBQ3FNLFVBQVUsRUFBRSxHQUFHLENBQUUsR0FBSTVPLENBQUMsQ0FBQzRFLFNBQVMsR0FBRyxDQUFDLENBQUUsRUFBRTtVQUNwRnlLLFdBQVcsR0FBRzlNLEtBQUs7VUFDbkIsT0FBTyxLQUFLO1FBQ2hCO01BQ0osQ0FBQyxDQUFDO01BRUY2TSxlQUFlLEdBQUd6UixJQUFJLENBQUNDLEdBQUcsQ0FBQ3hGLENBQUMsQ0FBQ2lYLFdBQVcsQ0FBQyxDQUFDalEsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUdZLENBQUMsQ0FBQzZELFlBQVksQ0FBQyxJQUFJLENBQUM7TUFFekYsT0FBT3VMLGVBQWU7SUFFMUIsQ0FBQyxNQUFNO01BQ0gsT0FBT3BQLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWM7SUFDbkM7RUFFSixDQUFDO0VBRUQ3QyxLQUFLLENBQUMvRixTQUFTLENBQUN5VixJQUFJLEdBQUcxUCxLQUFLLENBQUMvRixTQUFTLENBQUMwVixTQUFTLEdBQUcsVUFBU2pOLEtBQUssRUFBRTZKLFdBQVcsRUFBRTtJQUU1RSxJQUFJcE0sQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDNEcsV0FBVyxDQUFDO01BQ1ZqSSxJQUFJLEVBQUU7UUFDRjZOLE9BQU8sRUFBRSxPQUFPO1FBQ2hCOUUsS0FBSyxFQUFFekosUUFBUSxDQUFDc0UsS0FBSztNQUN6QjtJQUNKLENBQUMsRUFBRTZKLFdBQVcsQ0FBQztFQUVuQixDQUFDO0VBRUR2TSxLQUFLLENBQUMvRixTQUFTLENBQUN1TixJQUFJLEdBQUcsVUFBU29JLFFBQVEsRUFBRTtJQUV0QyxJQUFJelAsQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFJLENBQUM1SCxDQUFDLENBQUM0SCxDQUFDLENBQUMrRixPQUFPLENBQUMsQ0FBQzdLLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO01BRTdDOUMsQ0FBQyxDQUFDNEgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDLENBQUN0TCxRQUFRLENBQUMsbUJBQW1CLENBQUM7TUFFMUN1RixDQUFDLENBQUN5SyxTQUFTLEVBQUU7TUFDYnpLLENBQUMsQ0FBQ21LLFFBQVEsRUFBRTtNQUNabkssQ0FBQyxDQUFDMFAsUUFBUSxFQUFFO01BQ1oxUCxDQUFDLENBQUMyUCxTQUFTLEVBQUU7TUFDYjNQLENBQUMsQ0FBQzRQLFVBQVUsRUFBRTtNQUNkNVAsQ0FBQyxDQUFDNlAsZ0JBQWdCLEVBQUU7TUFDcEI3UCxDQUFDLENBQUM4UCxZQUFZLEVBQUU7TUFDaEI5UCxDQUFDLENBQUN1SyxVQUFVLEVBQUU7TUFDZHZLLENBQUMsQ0FBQ3NMLGVBQWUsQ0FBQyxJQUFJLENBQUM7TUFDdkJ0TCxDQUFDLENBQUM4TixZQUFZLEVBQUU7SUFFcEI7SUFFQSxJQUFJMkIsUUFBUSxFQUFFO01BQ1Z6UCxDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMwRyxDQUFDLENBQUMsQ0FBQztJQUNsQztJQUVBLElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRILGFBQWEsS0FBSyxJQUFJLEVBQUU7TUFDbENILENBQUMsQ0FBQytQLE9BQU8sRUFBRTtJQUNmO0lBRUEsSUFBSy9QLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29JLFFBQVEsRUFBRztNQUV0QlgsQ0FBQyxDQUFDMkYsTUFBTSxHQUFHLEtBQUs7TUFDaEIzRixDQUFDLENBQUN5RyxRQUFRLEVBQUU7SUFFaEI7RUFFSixDQUFDO0VBRUQ1RyxLQUFLLENBQUMvRixTQUFTLENBQUNpVyxPQUFPLEdBQUcsWUFBVztJQUNqQyxJQUFJL1AsQ0FBQyxHQUFHLElBQUk7TUFDSmdRLFlBQVksR0FBR3JTLElBQUksQ0FBQ3FMLElBQUksQ0FBQ2hKLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksQ0FBQztNQUMvRHdOLGlCQUFpQixHQUFHalEsQ0FBQyxDQUFDNE0sbUJBQW1CLEVBQUUsQ0FBQ2lCLE1BQU0sQ0FBQyxVQUFTcUMsR0FBRyxFQUFFO1FBQzdELE9BQVFBLEdBQUcsSUFBSSxDQUFDLElBQU1BLEdBQUcsR0FBR2xRLENBQUMsQ0FBQ3NFLFVBQVc7TUFDN0MsQ0FBQyxDQUFDO0lBRVZ0RSxDQUFDLENBQUN5RSxPQUFPLENBQUNxRixHQUFHLENBQUM5SixDQUFDLENBQUN3RSxXQUFXLENBQUMzTCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQ3VHLElBQUksQ0FBQztNQUNwRCxhQUFhLEVBQUUsTUFBTTtNQUNyQixVQUFVLEVBQUU7SUFDaEIsQ0FBQyxDQUFDLENBQUN2RyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQ3VHLElBQUksQ0FBQztNQUNyQyxVQUFVLEVBQUU7SUFDaEIsQ0FBQyxDQUFDO0lBRUYsSUFBSVksQ0FBQyxDQUFDK0QsS0FBSyxLQUFLLElBQUksRUFBRTtNQUNsQi9ELENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQzZFLEdBQUcsQ0FBQ3RKLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQzNMLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDNEYsSUFBSSxDQUFDLFVBQVN5QyxDQUFDLEVBQUU7UUFDaEUsSUFBSWlQLGlCQUFpQixHQUFHRixpQkFBaUIsQ0FBQ0csT0FBTyxDQUFDbFAsQ0FBQyxDQUFDO1FBRXBEOUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDZ0gsSUFBSSxDQUFDO1VBQ1QsTUFBTSxFQUFFLFVBQVU7VUFDbEIsSUFBSSxFQUFFLGFBQWEsR0FBR1ksQ0FBQyxDQUFDRixXQUFXLEdBQUdvQixDQUFDO1VBQ3ZDLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQztRQUVGLElBQUlpUCxpQkFBaUIsS0FBSyxDQUFDLENBQUMsRUFBRTtVQUMzQixJQUFJRSxpQkFBaUIsR0FBRyxxQkFBcUIsR0FBR3JRLENBQUMsQ0FBQ0YsV0FBVyxHQUFHcVEsaUJBQWlCO1VBQ2pGLElBQUkvWCxDQUFDLENBQUMsR0FBRyxHQUFHaVksaUJBQWlCLENBQUMsQ0FBQ2pWLE1BQU0sRUFBRTtZQUNyQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2dILElBQUksQ0FBQztjQUNULGtCQUFrQixFQUFFaVI7WUFDeEIsQ0FBQyxDQUFDO1VBQ0o7UUFDSDtNQUNKLENBQUMsQ0FBQztNQUVGclEsQ0FBQyxDQUFDK0QsS0FBSyxDQUFDM0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQ3ZHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzRGLElBQUksQ0FBQyxVQUFTeUMsQ0FBQyxFQUFFO1FBQ3hELElBQUlvUCxnQkFBZ0IsR0FBR0wsaUJBQWlCLENBQUMvTyxDQUFDLENBQUM7UUFFM0M5SSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNnSCxJQUFJLENBQUM7VUFDVCxNQUFNLEVBQUU7UUFDWixDQUFDLENBQUM7UUFFRmhILENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDcVIsS0FBSyxFQUFFLENBQUM5SyxJQUFJLENBQUM7VUFDaEMsTUFBTSxFQUFFLEtBQUs7VUFDYixJQUFJLEVBQUUscUJBQXFCLEdBQUdZLENBQUMsQ0FBQ0YsV0FBVyxHQUFHb0IsQ0FBQztVQUMvQyxlQUFlLEVBQUUsYUFBYSxHQUFHbEIsQ0FBQyxDQUFDRixXQUFXLEdBQUd3USxnQkFBZ0I7VUFDakUsWUFBWSxFQUFHcFAsQ0FBQyxHQUFHLENBQUMsR0FBSSxNQUFNLEdBQUc4TyxZQUFZO1VBQzdDLGVBQWUsRUFBRSxJQUFJO1VBQ3JCLFVBQVUsRUFBRTtRQUNoQixDQUFDLENBQUM7TUFFTixDQUFDLENBQUMsQ0FBQ2xJLEVBQUUsQ0FBQzlILENBQUMsQ0FBQzZELFlBQVksQ0FBQyxDQUFDaEwsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDdUcsSUFBSSxDQUFDO1FBQ3RDLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLFVBQVUsRUFBRTtNQUNoQixDQUFDLENBQUMsQ0FBQ21SLEdBQUcsRUFBRTtJQUNaO0lBRUEsS0FBSyxJQUFJclAsQ0FBQyxHQUFDbEIsQ0FBQyxDQUFDNkQsWUFBWSxFQUFFbUwsR0FBRyxHQUFDOU4sQ0FBQyxHQUFDbEIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFdkIsQ0FBQyxHQUFHOE4sR0FBRyxFQUFFOU4sQ0FBQyxFQUFFLEVBQUU7TUFDckUsSUFBSWxCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29KLGFBQWEsRUFBRTtRQUMzQjNCLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQzVHLENBQUMsQ0FBQyxDQUFDOUIsSUFBSSxDQUFDO1VBQUMsVUFBVSxFQUFFO1FBQUcsQ0FBQyxDQUFDO01BQ3pDLENBQUMsTUFBTTtRQUNMWSxDQUFDLENBQUN5RSxPQUFPLENBQUNxRCxFQUFFLENBQUM1RyxDQUFDLENBQUMsQ0FBQzJJLFVBQVUsQ0FBQyxVQUFVLENBQUM7TUFDeEM7SUFDRjtJQUVBN0osQ0FBQyxDQUFDc0gsV0FBVyxFQUFFO0VBRW5CLENBQUM7RUFFRHpILEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBXLGVBQWUsR0FBRyxZQUFXO0lBRXpDLElBQUl4USxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2dJLE1BQU0sS0FBSyxJQUFJLElBQUlQLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtNQUNwRXpDLENBQUMsQ0FBQ29FLFVBQVUsQ0FDUnhJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FDbEJoQixFQUFFLENBQUMsYUFBYSxFQUFFO1FBQ2Q0UixPQUFPLEVBQUU7TUFDZCxDQUFDLEVBQUV4TSxDQUFDLENBQUM0RyxXQUFXLENBQUM7TUFDcEI1RyxDQUFDLENBQUNtRSxVQUFVLENBQ1J2SSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQ2xCaEIsRUFBRSxDQUFDLGFBQWEsRUFBRTtRQUNkNFIsT0FBTyxFQUFFO01BQ2QsQ0FBQyxFQUFFeE0sQ0FBQyxDQUFDNEcsV0FBVyxDQUFDO01BRXBCLElBQUk1RyxDQUFDLENBQUN6SCxPQUFPLENBQUM0SCxhQUFhLEtBQUssSUFBSSxFQUFFO1FBQ2xDSCxDQUFDLENBQUNvRSxVQUFVLENBQUN4SixFQUFFLENBQUMsZUFBZSxFQUFFb0YsQ0FBQyxDQUFDa0gsVUFBVSxDQUFDO1FBQzlDbEgsQ0FBQyxDQUFDbUUsVUFBVSxDQUFDdkosRUFBRSxDQUFDLGVBQWUsRUFBRW9GLENBQUMsQ0FBQ2tILFVBQVUsQ0FBQztNQUNsRDtJQUNKO0VBRUosQ0FBQztFQUVEckgsS0FBSyxDQUFDL0YsU0FBUyxDQUFDMlcsYUFBYSxHQUFHLFlBQVc7SUFFdkMsSUFBSXpRLENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSUEsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkksSUFBSSxLQUFLLElBQUksSUFBSXBCLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtNQUNsRXJLLENBQUMsQ0FBQyxJQUFJLEVBQUU0SCxDQUFDLENBQUMrRCxLQUFLLENBQUMsQ0FBQ25KLEVBQUUsQ0FBQyxhQUFhLEVBQUU7UUFDL0I0UixPQUFPLEVBQUU7TUFDYixDQUFDLEVBQUV4TSxDQUFDLENBQUM0RyxXQUFXLENBQUM7TUFFakIsSUFBSTVHLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRILGFBQWEsS0FBSyxJQUFJLEVBQUU7UUFDbENILENBQUMsQ0FBQytELEtBQUssQ0FBQ25KLEVBQUUsQ0FBQyxlQUFlLEVBQUVvRixDQUFDLENBQUNrSCxVQUFVLENBQUM7TUFDN0M7SUFDSjtJQUVBLElBQUlsSCxDQUFDLENBQUN6SCxPQUFPLENBQUM2SSxJQUFJLEtBQUssSUFBSSxJQUFJcEIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDMkosZ0JBQWdCLEtBQUssSUFBSSxJQUFJbEMsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO01BRXpHckssQ0FBQyxDQUFDLElBQUksRUFBRTRILENBQUMsQ0FBQytELEtBQUssQ0FBQyxDQUNYbkosRUFBRSxDQUFDLGtCQUFrQixFQUFFeEMsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDK00sU0FBUyxFQUFFL00sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQ3JEcEYsRUFBRSxDQUFDLGtCQUFrQixFQUFFeEMsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDK00sU0FBUyxFQUFFL00sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRS9EO0VBRUosQ0FBQztFQUVESCxLQUFLLENBQUMvRixTQUFTLENBQUM0VyxlQUFlLEdBQUcsWUFBVztJQUV6QyxJQUFJMVEsQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFLQSxDQUFDLENBQUN6SCxPQUFPLENBQUN5SixZQUFZLEVBQUc7TUFFMUJoQyxDQUFDLENBQUM4RSxLQUFLLENBQUNsSyxFQUFFLENBQUMsa0JBQWtCLEVBQUV4QyxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUMrTSxTQUFTLEVBQUUvTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDN0RBLENBQUMsQ0FBQzhFLEtBQUssQ0FBQ2xLLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRXhDLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQzJHLENBQUMsQ0FBQytNLFNBQVMsRUFBRS9NLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVsRTtFQUVKLENBQUM7RUFFREgsS0FBSyxDQUFDL0YsU0FBUyxDQUFDK1YsZ0JBQWdCLEdBQUcsWUFBVztJQUUxQyxJQUFJN1AsQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDd1EsZUFBZSxFQUFFO0lBRW5CeFEsQ0FBQyxDQUFDeVEsYUFBYSxFQUFFO0lBQ2pCelEsQ0FBQyxDQUFDMFEsZUFBZSxFQUFFO0lBRW5CMVEsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEssRUFBRSxDQUFDLGtDQUFrQyxFQUFFO01BQzNDK1YsTUFBTSxFQUFFO0lBQ1osQ0FBQyxFQUFFM1EsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBQ2xCaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEssRUFBRSxDQUFDLGlDQUFpQyxFQUFFO01BQzFDK1YsTUFBTSxFQUFFO0lBQ1osQ0FBQyxFQUFFM1EsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBQ2xCaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEssRUFBRSxDQUFDLDhCQUE4QixFQUFFO01BQ3ZDK1YsTUFBTSxFQUFFO0lBQ1osQ0FBQyxFQUFFM1EsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBQ2xCaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEssRUFBRSxDQUFDLG9DQUFvQyxFQUFFO01BQzdDK1YsTUFBTSxFQUFFO0lBQ1osQ0FBQyxFQUFFM1EsQ0FBQyxDQUFDZ0gsWUFBWSxDQUFDO0lBRWxCaEgsQ0FBQyxDQUFDOEUsS0FBSyxDQUFDbEssRUFBRSxDQUFDLGFBQWEsRUFBRW9GLENBQUMsQ0FBQzZHLFlBQVksQ0FBQztJQUV6Q3pPLENBQUMsQ0FBQ0ssUUFBUSxDQUFDLENBQUNtQyxFQUFFLENBQUNvRixDQUFDLENBQUNtRyxnQkFBZ0IsRUFBRS9OLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQzJHLENBQUMsQ0FBQ2dOLFVBQVUsRUFBRWhOLENBQUMsQ0FBQyxDQUFDO0lBRTVELElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRILGFBQWEsS0FBSyxJQUFJLEVBQUU7TUFDbENILENBQUMsQ0FBQzhFLEtBQUssQ0FBQ2xLLEVBQUUsQ0FBQyxlQUFlLEVBQUVvRixDQUFDLENBQUNrSCxVQUFVLENBQUM7SUFDN0M7SUFFQSxJQUFJbEgsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUosYUFBYSxLQUFLLElBQUksRUFBRTtNQUNsQ3RKLENBQUMsQ0FBQzRILENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQyxDQUFDeUQsUUFBUSxFQUFFLENBQUNyTixFQUFFLENBQUMsYUFBYSxFQUFFb0YsQ0FBQyxDQUFDOEcsYUFBYSxDQUFDO0lBQ2xFO0lBRUExTyxDQUFDLENBQUM2RCxNQUFNLENBQUMsQ0FBQ3JCLEVBQUUsQ0FBQyxnQ0FBZ0MsR0FBR29GLENBQUMsQ0FBQ0YsV0FBVyxFQUFFMUgsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDMkcsQ0FBQyxDQUFDa04saUJBQWlCLEVBQUVsTixDQUFDLENBQUMsQ0FBQztJQUUvRjVILENBQUMsQ0FBQzZELE1BQU0sQ0FBQyxDQUFDckIsRUFBRSxDQUFDLHFCQUFxQixHQUFHb0YsQ0FBQyxDQUFDRixXQUFXLEVBQUUxSCxDQUFDLENBQUNpQixLQUFLLENBQUMyRyxDQUFDLENBQUNyRixNQUFNLEVBQUVxRixDQUFDLENBQUMsQ0FBQztJQUV6RTVILENBQUMsQ0FBQyxtQkFBbUIsRUFBRTRILENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQyxDQUFDNUosRUFBRSxDQUFDLFdBQVcsRUFBRW9GLENBQUMsQ0FBQ3JFLGNBQWMsQ0FBQztJQUV2RXZELENBQUMsQ0FBQzZELE1BQU0sQ0FBQyxDQUFDckIsRUFBRSxDQUFDLG1CQUFtQixHQUFHb0YsQ0FBQyxDQUFDRixXQUFXLEVBQUVFLENBQUMsQ0FBQytHLFdBQVcsQ0FBQztJQUNoRTNPLENBQUMsQ0FBQzRILENBQUMsQ0FBQytHLFdBQVcsQ0FBQztFQUVwQixDQUFDO0VBRURsSCxLQUFLLENBQUMvRixTQUFTLENBQUM4VyxNQUFNLEdBQUcsWUFBVztJQUVoQyxJQUFJNVEsQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFJQSxDQUFDLENBQUN6SCxPQUFPLENBQUNnSSxNQUFNLEtBQUssSUFBSSxJQUFJUCxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFFcEV6QyxDQUFDLENBQUNvRSxVQUFVLENBQUN2SyxJQUFJLEVBQUU7TUFDbkJtRyxDQUFDLENBQUNtRSxVQUFVLENBQUN0SyxJQUFJLEVBQUU7SUFFdkI7SUFFQSxJQUFJbUcsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkksSUFBSSxLQUFLLElBQUksSUFBSXBCLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtNQUVsRXpDLENBQUMsQ0FBQytELEtBQUssQ0FBQ2xLLElBQUksRUFBRTtJQUVsQjtFQUVKLENBQUM7RUFFRGdHLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ29OLFVBQVUsR0FBRyxVQUFTaUYsS0FBSyxFQUFFO0lBRXpDLElBQUluTSxDQUFDLEdBQUcsSUFBSTtJQUNYO0lBQ0QsSUFBRyxDQUFDbU0sS0FBSyxDQUFDclIsTUFBTSxDQUFDK1YsT0FBTyxDQUFDQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFBRTtNQUNyRCxJQUFJM0UsS0FBSyxDQUFDNEUsT0FBTyxLQUFLLEVBQUUsSUFBSS9RLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRILGFBQWEsS0FBSyxJQUFJLEVBQUU7UUFDMURILENBQUMsQ0FBQzRHLFdBQVcsQ0FBQztVQUNWakksSUFBSSxFQUFFO1lBQ0Y2TixPQUFPLEVBQUV4TSxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssSUFBSSxHQUFHLE1BQU0sR0FBSTtVQUNoRDtRQUNKLENBQUMsQ0FBQztNQUNOLENBQUMsTUFBTSxJQUFJNkosS0FBSyxDQUFDNEUsT0FBTyxLQUFLLEVBQUUsSUFBSS9RLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRILGFBQWEsS0FBSyxJQUFJLEVBQUU7UUFDakVILENBQUMsQ0FBQzRHLFdBQVcsQ0FBQztVQUNWakksSUFBSSxFQUFFO1lBQ0Y2TixPQUFPLEVBQUV4TSxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssSUFBSSxHQUFHLFVBQVUsR0FBRztVQUNuRDtRQUNKLENBQUMsQ0FBQztNQUNOO0lBQ0o7RUFFSixDQUFDO0VBRUR6QyxLQUFLLENBQUMvRixTQUFTLENBQUNnSSxRQUFRLEdBQUcsWUFBVztJQUVsQyxJQUFJOUIsQ0FBQyxHQUFHLElBQUk7TUFDUmdSLFNBQVM7TUFBRUMsVUFBVTtNQUFFQyxVQUFVO01BQUVDLFFBQVE7SUFFL0MsU0FBU0MsVUFBVUEsQ0FBQ0MsV0FBVyxFQUFFO01BRTdCalosQ0FBQyxDQUFDLGdCQUFnQixFQUFFaVosV0FBVyxDQUFDLENBQUM1UyxJQUFJLENBQUMsWUFBVztRQUU3QyxJQUFJNlMsS0FBSyxHQUFHbFosQ0FBQyxDQUFDLElBQUksQ0FBQztVQUNmbVosV0FBVyxHQUFHblosQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDZ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQztVQUN2Q29TLFdBQVcsR0FBR3BaLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2dILElBQUksQ0FBQyxhQUFhLENBQUM7VUFDekNxUyxVQUFVLEdBQUlyWixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNnSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUlZLENBQUMsQ0FBQytGLE9BQU8sQ0FBQzNHLElBQUksQ0FBQyxZQUFZLENBQUM7VUFDeEVzUyxXQUFXLEdBQUdqWixRQUFRLENBQUNpRSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBRS9DZ1YsV0FBVyxDQUFDQyxNQUFNLEdBQUcsWUFBVztVQUU1QkwsS0FBSyxDQUNBOVUsT0FBTyxDQUFDO1lBQUVpUixPQUFPLEVBQUU7VUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFlBQVc7WUFFckMsSUFBSStELFdBQVcsRUFBRTtjQUNiRixLQUFLLENBQ0FsUyxJQUFJLENBQUMsUUFBUSxFQUFFb1MsV0FBVyxDQUFFO2NBRWpDLElBQUlDLFVBQVUsRUFBRTtnQkFDWkgsS0FBSyxDQUNBbFMsSUFBSSxDQUFDLE9BQU8sRUFBRXFTLFVBQVUsQ0FBRTtjQUNuQztZQUNKO1lBRUFILEtBQUssQ0FDQWxTLElBQUksQ0FBQyxLQUFLLEVBQUVtUyxXQUFXLENBQUMsQ0FDeEIvVSxPQUFPLENBQUM7Y0FBRWlSLE9BQU8sRUFBRTtZQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBVztjQUNyQzZELEtBQUssQ0FDQXpILFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUM5Q2hPLFdBQVcsQ0FBQyxlQUFlLENBQUM7WUFDckMsQ0FBQyxDQUFDO1lBQ05tRSxDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMwRyxDQUFDLEVBQUVzUixLQUFLLEVBQUVDLFdBQVcsQ0FBQyxDQUFDO1VBQzVELENBQUMsQ0FBQztRQUVWLENBQUM7UUFFREcsV0FBVyxDQUFDRSxPQUFPLEdBQUcsWUFBVztVQUU3Qk4sS0FBSyxDQUNBekgsVUFBVSxDQUFFLFdBQVcsQ0FBRSxDQUN6QmhPLFdBQVcsQ0FBRSxlQUFlLENBQUUsQ0FDOUJwQixRQUFRLENBQUUsc0JBQXNCLENBQUU7VUFFdkN1RixDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUUwRyxDQUFDLEVBQUVzUixLQUFLLEVBQUVDLFdBQVcsQ0FBRSxDQUFDO1FBRWpFLENBQUM7UUFFREcsV0FBVyxDQUFDRyxHQUFHLEdBQUdOLFdBQVc7TUFFakMsQ0FBQyxDQUFDO0lBRU47SUFFQSxJQUFJdlIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0ksVUFBVSxLQUFLLElBQUksRUFBRTtNQUMvQixJQUFJYixDQUFDLENBQUN6SCxPQUFPLENBQUNxSixRQUFRLEtBQUssSUFBSSxFQUFFO1FBQzdCc1AsVUFBVSxHQUFHbFIsQ0FBQyxDQUFDNkQsWUFBWSxJQUFJN0QsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQwTyxRQUFRLEdBQUdELFVBQVUsR0FBR2xSLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRyxDQUFDO01BQ3RELENBQUMsTUFBTTtRQUNIeU8sVUFBVSxHQUFHdlQsSUFBSSxDQUFDcVIsR0FBRyxDQUFDLENBQUMsRUFBRWhQLENBQUMsQ0FBQzZELFlBQVksSUFBSTdELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UwTyxRQUFRLEdBQUcsQ0FBQyxJQUFJblIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBR3pDLENBQUMsQ0FBQzZELFlBQVk7TUFDcEU7SUFDSixDQUFDLE1BQU07TUFDSHFOLFVBQVUsR0FBR2xSLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3FKLFFBQVEsR0FBRzVCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBR3pDLENBQUMsQ0FBQzZELFlBQVksR0FBRzdELENBQUMsQ0FBQzZELFlBQVk7TUFDMUZzTixRQUFRLEdBQUd4VCxJQUFJLENBQUNxTCxJQUFJLENBQUNrSSxVQUFVLEdBQUdsUixDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLENBQUM7TUFDekQsSUFBSXpDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tKLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDekIsSUFBSXlQLFVBQVUsR0FBRyxDQUFDLEVBQUVBLFVBQVUsRUFBRTtRQUNoQyxJQUFJQyxRQUFRLElBQUluUixDQUFDLENBQUNzRSxVQUFVLEVBQUU2TSxRQUFRLEVBQUU7TUFDNUM7SUFDSjtJQUVBSCxTQUFTLEdBQUdoUixDQUFDLENBQUMrRixPQUFPLENBQUNsTixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUNpWixLQUFLLENBQUNaLFVBQVUsRUFBRUMsUUFBUSxDQUFDO0lBRXRFLElBQUluUixDQUFDLENBQUN6SCxPQUFPLENBQUN1SixRQUFRLEtBQUssYUFBYSxFQUFFO01BQ3RDLElBQUlpUSxTQUFTLEdBQUdiLFVBQVUsR0FBRyxDQUFDO1FBQzFCYyxTQUFTLEdBQUdiLFFBQVE7UUFDcEIxTSxPQUFPLEdBQUd6RSxDQUFDLENBQUMrRixPQUFPLENBQUNsTixJQUFJLENBQUMsY0FBYyxDQUFDO01BRTVDLEtBQUssSUFBSXFJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2xCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsRUFBRXhCLENBQUMsRUFBRSxFQUFFO1FBQy9DLElBQUk2USxTQUFTLEdBQUcsQ0FBQyxFQUFFQSxTQUFTLEdBQUcvUixDQUFDLENBQUNzRSxVQUFVLEdBQUcsQ0FBQztRQUMvQzBNLFNBQVMsR0FBR0EsU0FBUyxDQUFDbEgsR0FBRyxDQUFDckYsT0FBTyxDQUFDcUQsRUFBRSxDQUFDaUssU0FBUyxDQUFDLENBQUM7UUFDaERmLFNBQVMsR0FBR0EsU0FBUyxDQUFDbEgsR0FBRyxDQUFDckYsT0FBTyxDQUFDcUQsRUFBRSxDQUFDa0ssU0FBUyxDQUFDLENBQUM7UUFDaERELFNBQVMsRUFBRTtRQUNYQyxTQUFTLEVBQUU7TUFDZjtJQUNKO0lBRUFaLFVBQVUsQ0FBQ0osU0FBUyxDQUFDO0lBRXJCLElBQUloUixDQUFDLENBQUNzRSxVQUFVLElBQUl0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFDeEN3TyxVQUFVLEdBQUdqUixDQUFDLENBQUMrRixPQUFPLENBQUNsTixJQUFJLENBQUMsY0FBYyxDQUFDO01BQzNDdVksVUFBVSxDQUFDSCxVQUFVLENBQUM7SUFDMUIsQ0FBQyxNQUNELElBQUlqUixDQUFDLENBQUM2RCxZQUFZLElBQUk3RCxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFDekR3TyxVQUFVLEdBQUdqUixDQUFDLENBQUMrRixPQUFPLENBQUNsTixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUNpWixLQUFLLENBQUMsQ0FBQyxFQUFFOVIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxDQUFDO01BQzdFMk8sVUFBVSxDQUFDSCxVQUFVLENBQUM7SUFDMUIsQ0FBQyxNQUFNLElBQUlqUixDQUFDLENBQUM2RCxZQUFZLEtBQUssQ0FBQyxFQUFFO01BQzdCb04sVUFBVSxHQUFHalIsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDbE4sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDaVosS0FBSyxDQUFDOVIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQy9FMk8sVUFBVSxDQUFDSCxVQUFVLENBQUM7SUFDMUI7RUFFSixDQUFDO0VBRURwUixLQUFLLENBQUMvRixTQUFTLENBQUM4VixVQUFVLEdBQUcsWUFBVztJQUVwQyxJQUFJNVAsQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDK0csV0FBVyxFQUFFO0lBRWYvRyxDQUFDLENBQUN3RSxXQUFXLENBQUN0SCxHQUFHLENBQUM7TUFDZHVRLE9BQU8sRUFBRTtJQUNiLENBQUMsQ0FBQztJQUVGek4sQ0FBQyxDQUFDK0YsT0FBTyxDQUFDbEssV0FBVyxDQUFDLGVBQWUsQ0FBQztJQUV0Q21FLENBQUMsQ0FBQzRRLE1BQU0sRUFBRTtJQUVWLElBQUk1USxDQUFDLENBQUN6SCxPQUFPLENBQUN1SixRQUFRLEtBQUssYUFBYSxFQUFFO01BQ3RDOUIsQ0FBQyxDQUFDaVMsbUJBQW1CLEVBQUU7SUFDM0I7RUFFSixDQUFDO0VBRURwUyxLQUFLLENBQUMvRixTQUFTLENBQUNvWSxJQUFJLEdBQUdyUyxLQUFLLENBQUMvRixTQUFTLENBQUNxWSxTQUFTLEdBQUcsWUFBVztJQUUxRCxJQUFJblMsQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDNEcsV0FBVyxDQUFDO01BQ1ZqSSxJQUFJLEVBQUU7UUFDRjZOLE9BQU8sRUFBRTtNQUNiO0lBQ0osQ0FBQyxDQUFDO0VBRU4sQ0FBQztFQUVEM00sS0FBSyxDQUFDL0YsU0FBUyxDQUFDb1QsaUJBQWlCLEdBQUcsWUFBVztJQUUzQyxJQUFJbE4sQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDc0wsZUFBZSxFQUFFO0lBQ25CdEwsQ0FBQyxDQUFDK0csV0FBVyxFQUFFO0VBRW5CLENBQUM7RUFFRGxILEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3NZLEtBQUssR0FBR3ZTLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3VZLFVBQVUsR0FBRyxZQUFXO0lBRTVELElBQUlyUyxDQUFDLEdBQUcsSUFBSTtJQUVaQSxDQUFDLENBQUMwRyxhQUFhLEVBQUU7SUFDakIxRyxDQUFDLENBQUMyRixNQUFNLEdBQUcsSUFBSTtFQUVuQixDQUFDO0VBRUQ5RixLQUFLLENBQUMvRixTQUFTLENBQUN3WSxJQUFJLEdBQUd6UyxLQUFLLENBQUMvRixTQUFTLENBQUN5WSxTQUFTLEdBQUcsWUFBVztJQUUxRCxJQUFJdlMsQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDeUcsUUFBUSxFQUFFO0lBQ1p6RyxDQUFDLENBQUN6SCxPQUFPLENBQUNvSSxRQUFRLEdBQUcsSUFBSTtJQUN6QlgsQ0FBQyxDQUFDMkYsTUFBTSxHQUFHLEtBQUs7SUFDaEIzRixDQUFDLENBQUN3RixRQUFRLEdBQUcsS0FBSztJQUNsQnhGLENBQUMsQ0FBQ3lGLFdBQVcsR0FBRyxLQUFLO0VBRXpCLENBQUM7RUFFRDVGLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBZLFNBQVMsR0FBRyxVQUFTOUssS0FBSyxFQUFFO0lBRXhDLElBQUkxSCxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUksQ0FBQ0EsQ0FBQyxDQUFDaUYsU0FBUyxFQUFHO01BRWZqRixDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMwRyxDQUFDLEVBQUUwSCxLQUFLLENBQUMsQ0FBQztNQUU1QzFILENBQUMsQ0FBQ3dELFNBQVMsR0FBRyxLQUFLO01BRW5CLElBQUl4RCxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7UUFDdkN6QyxDQUFDLENBQUMrRyxXQUFXLEVBQUU7TUFDbkI7TUFFQS9HLENBQUMsQ0FBQzRFLFNBQVMsR0FBRyxJQUFJO01BRWxCLElBQUs1RSxDQUFDLENBQUN6SCxPQUFPLENBQUNvSSxRQUFRLEVBQUc7UUFDdEJYLENBQUMsQ0FBQ3lHLFFBQVEsRUFBRTtNQUNoQjtNQUVBLElBQUl6RyxDQUFDLENBQUN6SCxPQUFPLENBQUM0SCxhQUFhLEtBQUssSUFBSSxFQUFFO1FBQ2xDSCxDQUFDLENBQUMrUCxPQUFPLEVBQUU7UUFFWCxJQUFJL1AsQ0FBQyxDQUFDekgsT0FBTyxDQUFDb0osYUFBYSxFQUFFO1VBQ3pCLElBQUk4USxhQUFhLEdBQUdyYSxDQUFDLENBQUM0SCxDQUFDLENBQUN5RSxPQUFPLENBQUMwRyxHQUFHLENBQUNuTCxDQUFDLENBQUM2RCxZQUFZLENBQUMsQ0FBQztVQUNwRDRPLGFBQWEsQ0FBQ3JULElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUN4QyxLQUFLLEVBQUU7UUFDN0M7TUFDSjtJQUVKO0VBRUosQ0FBQztFQUVEaUQsS0FBSyxDQUFDL0YsU0FBUyxDQUFDNFksSUFBSSxHQUFHN1MsS0FBSyxDQUFDL0YsU0FBUyxDQUFDNlksU0FBUyxHQUFHLFlBQVc7SUFFMUQsSUFBSTNTLENBQUMsR0FBRyxJQUFJO0lBRVpBLENBQUMsQ0FBQzRHLFdBQVcsQ0FBQztNQUNWakksSUFBSSxFQUFFO1FBQ0Y2TixPQUFPLEVBQUU7TUFDYjtJQUNKLENBQUMsQ0FBQztFQUVOLENBQUM7RUFFRDNNLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzZCLGNBQWMsR0FBRyxVQUFTd1EsS0FBSyxFQUFFO0lBRTdDQSxLQUFLLENBQUN4USxjQUFjLEVBQUU7RUFFMUIsQ0FBQztFQUVEa0UsS0FBSyxDQUFDL0YsU0FBUyxDQUFDbVksbUJBQW1CLEdBQUcsVUFBVVcsUUFBUSxFQUFHO0lBRXZEQSxRQUFRLEdBQUdBLFFBQVEsSUFBSSxDQUFDO0lBRXhCLElBQUk1UyxDQUFDLEdBQUcsSUFBSTtNQUNSNlMsV0FBVyxHQUFHemEsQ0FBQyxDQUFFLGdCQUFnQixFQUFFNEgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFFO01BQzlDdUwsS0FBSztNQUNMQyxXQUFXO01BQ1hDLFdBQVc7TUFDWEMsVUFBVTtNQUNWQyxXQUFXO0lBRWYsSUFBS21CLFdBQVcsQ0FBQ3pYLE1BQU0sRUFBRztNQUV0QmtXLEtBQUssR0FBR3VCLFdBQVcsQ0FBQzNJLEtBQUssRUFBRTtNQUMzQnFILFdBQVcsR0FBR0QsS0FBSyxDQUFDbFMsSUFBSSxDQUFDLFdBQVcsQ0FBQztNQUNyQ29TLFdBQVcsR0FBR0YsS0FBSyxDQUFDbFMsSUFBSSxDQUFDLGFBQWEsQ0FBQztNQUN2Q3FTLFVBQVUsR0FBSUgsS0FBSyxDQUFDbFMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJWSxDQUFDLENBQUMrRixPQUFPLENBQUMzRyxJQUFJLENBQUMsWUFBWSxDQUFDO01BQ3RFc1MsV0FBVyxHQUFHalosUUFBUSxDQUFDaUUsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUUzQ2dWLFdBQVcsQ0FBQ0MsTUFBTSxHQUFHLFlBQVc7UUFFNUIsSUFBSUgsV0FBVyxFQUFFO1VBQ2JGLEtBQUssQ0FDQWxTLElBQUksQ0FBQyxRQUFRLEVBQUVvUyxXQUFXLENBQUU7VUFFakMsSUFBSUMsVUFBVSxFQUFFO1lBQ1pILEtBQUssQ0FDQWxTLElBQUksQ0FBQyxPQUFPLEVBQUVxUyxVQUFVLENBQUU7VUFDbkM7UUFDSjtRQUVBSCxLQUFLLENBQ0FsUyxJQUFJLENBQUUsS0FBSyxFQUFFbVMsV0FBVyxDQUFFLENBQzFCMUgsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQzlDaE8sV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUVqQyxJQUFLbUUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkgsY0FBYyxLQUFLLElBQUksRUFBRztVQUNyQ0osQ0FBQyxDQUFDK0csV0FBVyxFQUFFO1FBQ25CO1FBRUEvRyxDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUUwRyxDQUFDLEVBQUVzUixLQUFLLEVBQUVDLFdBQVcsQ0FBRSxDQUFDO1FBQzFEdlIsQ0FBQyxDQUFDaVMsbUJBQW1CLEVBQUU7TUFFM0IsQ0FBQztNQUVEUCxXQUFXLENBQUNFLE9BQU8sR0FBRyxZQUFXO1FBRTdCLElBQUtnQixRQUFRLEdBQUcsQ0FBQyxFQUFHO1VBRWhCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO1VBQ29CekosVUFBVSxDQUFFLFlBQVc7WUFDbkJuSixDQUFDLENBQUNpUyxtQkFBbUIsQ0FBRVcsUUFBUSxHQUFHLENBQUMsQ0FBRTtVQUN6QyxDQUFDLEVBQUUsR0FBRyxDQUFFO1FBRVosQ0FBQyxNQUFNO1VBRUh0QixLQUFLLENBQ0F6SCxVQUFVLENBQUUsV0FBVyxDQUFFLENBQ3pCaE8sV0FBVyxDQUFFLGVBQWUsQ0FBRSxDQUM5QnBCLFFBQVEsQ0FBRSxzQkFBc0IsQ0FBRTtVQUV2Q3VGLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ3pNLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBRTBHLENBQUMsRUFBRXNSLEtBQUssRUFBRUMsV0FBVyxDQUFFLENBQUM7VUFFN0R2UixDQUFDLENBQUNpUyxtQkFBbUIsRUFBRTtRQUUzQjtNQUVKLENBQUM7TUFFRFAsV0FBVyxDQUFDRyxHQUFHLEdBQUdOLFdBQVc7SUFFakMsQ0FBQyxNQUFNO01BRUh2UixDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBRTBHLENBQUMsQ0FBRSxDQUFDO0lBRS9DO0VBRUosQ0FBQztFQUVESCxLQUFLLENBQUMvRixTQUFTLENBQUNvUyxPQUFPLEdBQUcsVUFBVTRHLFlBQVksRUFBRztJQUUvQyxJQUFJOVMsQ0FBQyxHQUFHLElBQUk7TUFBRTZELFlBQVk7TUFBRWtQLGdCQUFnQjtJQUU1Q0EsZ0JBQWdCLEdBQUcvUyxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZOztJQUV4RDtJQUNBO0lBQ0EsSUFBSSxDQUFDekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxJQUFNNUIsQ0FBQyxDQUFDNkQsWUFBWSxHQUFHa1AsZ0JBQWtCLEVBQUU7TUFDOUQvUyxDQUFDLENBQUM2RCxZQUFZLEdBQUdrUCxnQkFBZ0I7SUFDckM7O0lBRUE7SUFDQSxJQUFLL1MsQ0FBQyxDQUFDc0UsVUFBVSxJQUFJdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFHO01BQzFDekMsQ0FBQyxDQUFDNkQsWUFBWSxHQUFHLENBQUM7SUFFdEI7SUFFQUEsWUFBWSxHQUFHN0QsQ0FBQyxDQUFDNkQsWUFBWTtJQUU3QjdELENBQUMsQ0FBQ3NOLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFFZmxWLENBQUMsQ0FBQ3dHLE1BQU0sQ0FBQ29CLENBQUMsRUFBRUEsQ0FBQyxDQUFDdUQsUUFBUSxFQUFFO01BQUVNLFlBQVksRUFBRUE7SUFBYSxDQUFDLENBQUM7SUFFdkQ3RCxDQUFDLENBQUNxSCxJQUFJLEVBQUU7SUFFUixJQUFJLENBQUN5TCxZQUFZLEVBQUc7TUFFaEI5UyxDQUFDLENBQUM0RyxXQUFXLENBQUM7UUFDVmpJLElBQUksRUFBRTtVQUNGNk4sT0FBTyxFQUFFLE9BQU87VUFDaEI5RSxLQUFLLEVBQUU3RDtRQUNYO01BQ0osQ0FBQyxFQUFFLEtBQUssQ0FBQztJQUViO0VBRUosQ0FBQztFQUVEaEUsS0FBSyxDQUFDL0YsU0FBUyxDQUFDc04sbUJBQW1CLEdBQUcsWUFBVztJQUU3QyxJQUFJcEgsQ0FBQyxHQUFHLElBQUk7TUFBRXlMLFVBQVU7TUFBRXVILGlCQUFpQjtNQUFFQyxDQUFDO01BQzFDQyxrQkFBa0IsR0FBR2xULENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZKLFVBQVUsSUFBSSxJQUFJO0lBRXJELElBQUtoSyxDQUFDLENBQUMrYSxJQUFJLENBQUNELGtCQUFrQixDQUFDLEtBQUssT0FBTyxJQUFJQSxrQkFBa0IsQ0FBQzlYLE1BQU0sRUFBRztNQUV2RTRFLENBQUMsQ0FBQ21DLFNBQVMsR0FBR25DLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRKLFNBQVMsSUFBSSxRQUFRO01BRTdDLEtBQU1zSixVQUFVLElBQUl5SCxrQkFBa0IsRUFBRztRQUVyQ0QsQ0FBQyxHQUFHalQsQ0FBQyxDQUFDcUYsV0FBVyxDQUFDakssTUFBTSxHQUFDLENBQUM7UUFFMUIsSUFBSThYLGtCQUFrQixDQUFDbEgsY0FBYyxDQUFDUCxVQUFVLENBQUMsRUFBRTtVQUMvQ3VILGlCQUFpQixHQUFHRSxrQkFBa0IsQ0FBQ3pILFVBQVUsQ0FBQyxDQUFDQSxVQUFVOztVQUU3RDtVQUNBO1VBQ0EsT0FBT3dILENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDWixJQUFJalQsQ0FBQyxDQUFDcUYsV0FBVyxDQUFDNE4sQ0FBQyxDQUFDLElBQUlqVCxDQUFDLENBQUNxRixXQUFXLENBQUM0TixDQUFDLENBQUMsS0FBS0QsaUJBQWlCLEVBQUc7Y0FDN0RoVCxDQUFDLENBQUNxRixXQUFXLENBQUMrTixNQUFNLENBQUNILENBQUMsRUFBQyxDQUFDLENBQUM7WUFDN0I7WUFDQUEsQ0FBQyxFQUFFO1VBQ1A7VUFFQWpULENBQUMsQ0FBQ3FGLFdBQVcsQ0FBQzRKLElBQUksQ0FBQytELGlCQUFpQixDQUFDO1VBQ3JDaFQsQ0FBQyxDQUFDc0Ysa0JBQWtCLENBQUMwTixpQkFBaUIsQ0FBQyxHQUFHRSxrQkFBa0IsQ0FBQ3pILFVBQVUsQ0FBQyxDQUFDMUwsUUFBUTtRQUVyRjtNQUVKO01BRUFDLENBQUMsQ0FBQ3FGLFdBQVcsQ0FBQ2dPLElBQUksQ0FBQyxVQUFTM0ksQ0FBQyxFQUFFQyxDQUFDLEVBQUU7UUFDOUIsT0FBUzNLLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3dKLFdBQVcsR0FBSzJJLENBQUMsR0FBQ0MsQ0FBQyxHQUFHQSxDQUFDLEdBQUNELENBQUM7TUFDaEQsQ0FBQyxDQUFDO0lBRU47RUFFSixDQUFDO0VBRUQ3SyxLQUFLLENBQUMvRixTQUFTLENBQUNxTyxNQUFNLEdBQUcsWUFBVztJQUVoQyxJQUFJbkksQ0FBQyxHQUFHLElBQUk7SUFFWkEsQ0FBQyxDQUFDeUUsT0FBTyxHQUNMekUsQ0FBQyxDQUFDd0UsV0FBVyxDQUNSeUQsUUFBUSxDQUFDakksQ0FBQyxDQUFDekgsT0FBTyxDQUFDZ0ssS0FBSyxDQUFDLENBQ3pCOUgsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUVoQ3VGLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3JKLE1BQU07SUFFL0IsSUFBSTRFLENBQUMsQ0FBQzZELFlBQVksSUFBSTdELENBQUMsQ0FBQ3NFLFVBQVUsSUFBSXRFLENBQUMsQ0FBQzZELFlBQVksS0FBSyxDQUFDLEVBQUU7TUFDeEQ3RCxDQUFDLENBQUM2RCxZQUFZLEdBQUc3RCxDQUFDLENBQUM2RCxZQUFZLEdBQUc3RCxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjO0lBQzlEO0lBRUEsSUFBSTFDLENBQUMsQ0FBQ3NFLFVBQVUsSUFBSXRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtNQUN4Q3pDLENBQUMsQ0FBQzZELFlBQVksR0FBRyxDQUFDO0lBQ3RCO0lBRUE3RCxDQUFDLENBQUNvSCxtQkFBbUIsRUFBRTtJQUV2QnBILENBQUMsQ0FBQzBQLFFBQVEsRUFBRTtJQUNaMVAsQ0FBQyxDQUFDc0ssYUFBYSxFQUFFO0lBQ2pCdEssQ0FBQyxDQUFDNEosV0FBVyxFQUFFO0lBQ2Y1SixDQUFDLENBQUM4UCxZQUFZLEVBQUU7SUFDaEI5UCxDQUFDLENBQUN3USxlQUFlLEVBQUU7SUFDbkJ4USxDQUFDLENBQUMrSixTQUFTLEVBQUU7SUFDYi9KLENBQUMsQ0FBQ3VLLFVBQVUsRUFBRTtJQUNkdkssQ0FBQyxDQUFDeVEsYUFBYSxFQUFFO0lBQ2pCelEsQ0FBQyxDQUFDaU4sa0JBQWtCLEVBQUU7SUFDdEJqTixDQUFDLENBQUMwUSxlQUFlLEVBQUU7SUFFbkIxUSxDQUFDLENBQUNzTCxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztJQUU5QixJQUFJdEwsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUosYUFBYSxLQUFLLElBQUksRUFBRTtNQUNsQ3RKLENBQUMsQ0FBQzRILENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQyxDQUFDeUQsUUFBUSxFQUFFLENBQUNyTixFQUFFLENBQUMsYUFBYSxFQUFFb0YsQ0FBQyxDQUFDOEcsYUFBYSxDQUFDO0lBQ2xFO0lBRUE5RyxDQUFDLENBQUN3SyxlQUFlLENBQUMsT0FBT3hLLENBQUMsQ0FBQzZELFlBQVksS0FBSyxRQUFRLEdBQUc3RCxDQUFDLENBQUM2RCxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRTFFN0QsQ0FBQyxDQUFDK0csV0FBVyxFQUFFO0lBQ2YvRyxDQUFDLENBQUM4TixZQUFZLEVBQUU7SUFFaEI5TixDQUFDLENBQUMyRixNQUFNLEdBQUcsQ0FBQzNGLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29JLFFBQVE7SUFDOUJYLENBQUMsQ0FBQ3lHLFFBQVEsRUFBRTtJQUVaekcsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDek0sT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDMEcsQ0FBQyxDQUFDLENBQUM7RUFFcEMsQ0FBQztFQUVESCxLQUFLLENBQUMvRixTQUFTLENBQUNhLE1BQU0sR0FBRyxZQUFXO0lBRWhDLElBQUlxRixDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUk1SCxDQUFDLENBQUM2RCxNQUFNLENBQUMsQ0FBQzZQLEtBQUssRUFBRSxLQUFLOUwsQ0FBQyxDQUFDb0csV0FBVyxFQUFFO01BQ3JDa04sWUFBWSxDQUFDdFQsQ0FBQyxDQUFDdVQsV0FBVyxDQUFDO01BQzNCdlQsQ0FBQyxDQUFDdVQsV0FBVyxHQUFHdFgsTUFBTSxDQUFDa04sVUFBVSxDQUFDLFlBQVc7UUFDekNuSixDQUFDLENBQUNvRyxXQUFXLEdBQUdoTyxDQUFDLENBQUM2RCxNQUFNLENBQUMsQ0FBQzZQLEtBQUssRUFBRTtRQUNqQzlMLENBQUMsQ0FBQ3NMLGVBQWUsRUFBRTtRQUNuQixJQUFJLENBQUN0TCxDQUFDLENBQUNpRixTQUFTLEVBQUc7VUFBRWpGLENBQUMsQ0FBQytHLFdBQVcsRUFBRTtRQUFFO01BQzFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDVjtFQUNKLENBQUM7RUFFRGxILEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBaLFdBQVcsR0FBRzNULEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzJaLFdBQVcsR0FBRyxVQUFTL0wsS0FBSyxFQUFFZ00sWUFBWSxFQUFFQyxTQUFTLEVBQUU7SUFFakcsSUFBSTNULENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSSxPQUFPMEgsS0FBTSxLQUFLLFNBQVMsRUFBRTtNQUM3QmdNLFlBQVksR0FBR2hNLEtBQUs7TUFDcEJBLEtBQUssR0FBR2dNLFlBQVksS0FBSyxJQUFJLEdBQUcsQ0FBQyxHQUFHMVQsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHLENBQUM7SUFDeEQsQ0FBQyxNQUFNO01BQ0hvRCxLQUFLLEdBQUdnTSxZQUFZLEtBQUssSUFBSSxHQUFHLEVBQUVoTSxLQUFLLEdBQUdBLEtBQUs7SUFDbkQ7SUFFQSxJQUFJMUgsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHLENBQUMsSUFBSW9ELEtBQUssR0FBRyxDQUFDLElBQUlBLEtBQUssR0FBRzFILENBQUMsQ0FBQ3NFLFVBQVUsR0FBRyxDQUFDLEVBQUU7TUFDM0QsT0FBTyxLQUFLO0lBQ2hCO0lBRUF0RSxDQUFDLENBQUM0SCxNQUFNLEVBQUU7SUFFVixJQUFJK0wsU0FBUyxLQUFLLElBQUksRUFBRTtNQUNwQjNULENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3lELFFBQVEsRUFBRSxDQUFDM0wsTUFBTSxFQUFFO0lBQ3JDLENBQUMsTUFBTTtNQUNIMEQsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLElBQUksQ0FBQzFQLE9BQU8sQ0FBQ2dLLEtBQUssQ0FBQyxDQUFDdUYsRUFBRSxDQUFDSixLQUFLLENBQUMsQ0FBQ3BMLE1BQU0sRUFBRTtJQUNqRTtJQUVBMEQsQ0FBQyxDQUFDeUUsT0FBTyxHQUFHekUsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLElBQUksQ0FBQzFQLE9BQU8sQ0FBQ2dLLEtBQUssQ0FBQztJQUV0RHZDLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3lELFFBQVEsQ0FBQyxJQUFJLENBQUMxUCxPQUFPLENBQUNnSyxLQUFLLENBQUMsQ0FBQzJGLE1BQU0sRUFBRTtJQUVuRGxJLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ25HLE1BQU0sQ0FBQzJCLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQztJQUUvQnpFLENBQUMsQ0FBQ2dHLFlBQVksR0FBR2hHLENBQUMsQ0FBQ3lFLE9BQU87SUFFMUJ6RSxDQUFDLENBQUNtSSxNQUFNLEVBQUU7RUFFZCxDQUFDO0VBRUR0SSxLQUFLLENBQUMvRixTQUFTLENBQUM4WixNQUFNLEdBQUcsVUFBU0MsUUFBUSxFQUFFO0lBRXhDLElBQUk3VCxDQUFDLEdBQUcsSUFBSTtNQUNSOFQsYUFBYSxHQUFHLENBQUMsQ0FBQztNQUNsQkMsQ0FBQztNQUFFQyxDQUFDO0lBRVIsSUFBSWhVLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytKLEdBQUcsS0FBSyxJQUFJLEVBQUU7TUFDeEJ1UixRQUFRLEdBQUcsQ0FBQ0EsUUFBUTtJQUN4QjtJQUNBRSxDQUFDLEdBQUcvVCxDQUFDLENBQUM0RixZQUFZLElBQUksTUFBTSxHQUFHakksSUFBSSxDQUFDcUwsSUFBSSxDQUFDNkssUUFBUSxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUs7SUFDakVHLENBQUMsR0FBR2hVLENBQUMsQ0FBQzRGLFlBQVksSUFBSSxLQUFLLEdBQUdqSSxJQUFJLENBQUNxTCxJQUFJLENBQUM2SyxRQUFRLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSztJQUVoRUMsYUFBYSxDQUFDOVQsQ0FBQyxDQUFDNEYsWUFBWSxDQUFDLEdBQUdpTyxRQUFRO0lBRXhDLElBQUk3VCxDQUFDLENBQUNnRixpQkFBaUIsS0FBSyxLQUFLLEVBQUU7TUFDL0JoRixDQUFDLENBQUN3RSxXQUFXLENBQUN0SCxHQUFHLENBQUM0VyxhQUFhLENBQUM7SUFDcEMsQ0FBQyxNQUFNO01BQ0hBLGFBQWEsR0FBRyxDQUFDLENBQUM7TUFDbEIsSUFBSTlULENBQUMsQ0FBQ3VGLGNBQWMsS0FBSyxLQUFLLEVBQUU7UUFDNUJ1TyxhQUFhLENBQUM5VCxDQUFDLENBQUNtRixRQUFRLENBQUMsR0FBRyxZQUFZLEdBQUc0TyxDQUFDLEdBQUcsSUFBSSxHQUFHQyxDQUFDLEdBQUcsR0FBRztRQUM3RGhVLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3RILEdBQUcsQ0FBQzRXLGFBQWEsQ0FBQztNQUNwQyxDQUFDLE1BQU07UUFDSEEsYUFBYSxDQUFDOVQsQ0FBQyxDQUFDbUYsUUFBUSxDQUFDLEdBQUcsY0FBYyxHQUFHNE8sQ0FBQyxHQUFHLElBQUksR0FBR0MsQ0FBQyxHQUFHLFFBQVE7UUFDcEVoVSxDQUFDLENBQUN3RSxXQUFXLENBQUN0SCxHQUFHLENBQUM0VyxhQUFhLENBQUM7TUFDcEM7SUFDSjtFQUVKLENBQUM7RUFFRGpVLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ21hLGFBQWEsR0FBRyxZQUFXO0lBRXZDLElBQUlqVSxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUlBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzRLLFFBQVEsS0FBSyxLQUFLLEVBQUU7TUFDOUIsSUFBSW5ELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFDL0JiLENBQUMsQ0FBQzhFLEtBQUssQ0FBQzVILEdBQUcsQ0FBQztVQUNSZ1gsT0FBTyxFQUFHLE1BQU0sR0FBR2xVLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3VJO1FBQ2pDLENBQUMsQ0FBQztNQUNOO0lBQ0osQ0FBQyxNQUFNO01BQ0hkLENBQUMsQ0FBQzhFLEtBQUssQ0FBQ3lELE1BQU0sQ0FBQ3ZJLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3lGLEtBQUssRUFBRSxDQUFDNUIsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHdEksQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxDQUFDO01BQzVFLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUNzSSxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQy9CYixDQUFDLENBQUM4RSxLQUFLLENBQUM1SCxHQUFHLENBQUM7VUFDUmdYLE9BQU8sRUFBR2xVLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3VJLGFBQWEsR0FBRztRQUN4QyxDQUFDLENBQUM7TUFDTjtJQUNKO0lBRUFkLENBQUMsQ0FBQ2dFLFNBQVMsR0FBR2hFLENBQUMsQ0FBQzhFLEtBQUssQ0FBQ2dILEtBQUssRUFBRTtJQUM3QjlMLENBQUMsQ0FBQ2lFLFVBQVUsR0FBR2pFLENBQUMsQ0FBQzhFLEtBQUssQ0FBQ3lELE1BQU0sRUFBRTtJQUcvQixJQUFJdkksQ0FBQyxDQUFDekgsT0FBTyxDQUFDNEssUUFBUSxLQUFLLEtBQUssSUFBSW5ELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzJLLGFBQWEsS0FBSyxLQUFLLEVBQUU7TUFDbkVsRCxDQUFDLENBQUN1RSxVQUFVLEdBQUc1RyxJQUFJLENBQUNxTCxJQUFJLENBQUNoSixDQUFDLENBQUNnRSxTQUFTLEdBQUdoRSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLENBQUM7TUFDOUR6QyxDQUFDLENBQUN3RSxXQUFXLENBQUNzSCxLQUFLLENBQUNuTyxJQUFJLENBQUNxTCxJQUFJLENBQUVoSixDQUFDLENBQUN1RSxVQUFVLEdBQUd2RSxDQUFDLENBQUN3RSxXQUFXLENBQUN5RCxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM3TSxNQUFNLENBQUUsQ0FBQztJQUVsRyxDQUFDLE1BQU0sSUFBSTRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzJLLGFBQWEsS0FBSyxJQUFJLEVBQUU7TUFDekNsRCxDQUFDLENBQUN3RSxXQUFXLENBQUNzSCxLQUFLLENBQUMsSUFBSSxHQUFHOUwsQ0FBQyxDQUFDc0UsVUFBVSxDQUFDO0lBQzVDLENBQUMsTUFBTTtNQUNIdEUsQ0FBQyxDQUFDdUUsVUFBVSxHQUFHNUcsSUFBSSxDQUFDcUwsSUFBSSxDQUFDaEosQ0FBQyxDQUFDZ0UsU0FBUyxDQUFDO01BQ3JDaEUsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDK0QsTUFBTSxDQUFDNUssSUFBSSxDQUFDcUwsSUFBSSxDQUFFaEosQ0FBQyxDQUFDeUUsT0FBTyxDQUFDeUYsS0FBSyxFQUFFLENBQUM1QixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUd0SSxDQUFDLENBQUN3RSxXQUFXLENBQUN5RCxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM3TSxNQUFNLENBQUUsQ0FBQztJQUMxSDtJQUVBLElBQUkrWSxNQUFNLEdBQUduVSxDQUFDLENBQUN5RSxPQUFPLENBQUN5RixLQUFLLEVBQUUsQ0FBQzBFLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRzVPLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3lGLEtBQUssRUFBRSxDQUFDNEIsS0FBSyxFQUFFO0lBQzNFLElBQUk5TCxDQUFDLENBQUN6SCxPQUFPLENBQUMySyxhQUFhLEtBQUssS0FBSyxFQUFFbEQsQ0FBQyxDQUFDd0UsV0FBVyxDQUFDeUQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDNkQsS0FBSyxDQUFDOUwsQ0FBQyxDQUFDdUUsVUFBVSxHQUFHNFAsTUFBTSxDQUFDO0VBRTlHLENBQUM7RUFFRHRVLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3NhLE9BQU8sR0FBRyxZQUFXO0lBRWpDLElBQUlwVSxDQUFDLEdBQUcsSUFBSTtNQUNSeUksVUFBVTtJQUVkekksQ0FBQyxDQUFDeUUsT0FBTyxDQUFDaEcsSUFBSSxDQUFDLFVBQVNpSixLQUFLLEVBQUVwUCxPQUFPLEVBQUU7TUFDcENtUSxVQUFVLEdBQUl6SSxDQUFDLENBQUN1RSxVQUFVLEdBQUdtRCxLQUFLLEdBQUksQ0FBQyxDQUFDO01BQ3hDLElBQUkxSCxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssSUFBSSxFQUFFO1FBQ3hCbEssQ0FBQyxDQUFDRSxPQUFPLENBQUMsQ0FBQzRFLEdBQUcsQ0FBQztVQUNYMlcsUUFBUSxFQUFFLFVBQVU7VUFDcEJuVyxLQUFLLEVBQUUrSyxVQUFVO1VBQ2pCRSxHQUFHLEVBQUUsQ0FBQztVQUNOckYsTUFBTSxFQUFFdEQsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0ssTUFBTSxHQUFHLENBQUM7VUFDNUJtSyxPQUFPLEVBQUU7UUFDYixDQUFDLENBQUM7TUFDTixDQUFDLE1BQU07UUFDSHJWLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUM0RSxHQUFHLENBQUM7VUFDWDJXLFFBQVEsRUFBRSxVQUFVO1VBQ3BCaFcsSUFBSSxFQUFFNEssVUFBVTtVQUNoQkUsR0FBRyxFQUFFLENBQUM7VUFDTnJGLE1BQU0sRUFBRXRELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytLLE1BQU0sR0FBRyxDQUFDO1VBQzVCbUssT0FBTyxFQUFFO1FBQ2IsQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7SUFFRnpOLENBQUMsQ0FBQ3lFLE9BQU8sQ0FBQ3FELEVBQUUsQ0FBQzlILENBQUMsQ0FBQzZELFlBQVksQ0FBQyxDQUFDM0csR0FBRyxDQUFDO01BQzdCb0csTUFBTSxFQUFFdEQsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0ssTUFBTSxHQUFHLENBQUM7TUFDNUJtSyxPQUFPLEVBQUU7SUFDYixDQUFDLENBQUM7RUFFTixDQUFDO0VBRUQ1TixLQUFLLENBQUMvRixTQUFTLENBQUN1YSxTQUFTLEdBQUcsWUFBVztJQUVuQyxJQUFJclUsQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFJQSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEtBQUssQ0FBQyxJQUFJekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkgsY0FBYyxLQUFLLElBQUksSUFBSUosQ0FBQyxDQUFDekgsT0FBTyxDQUFDNEssUUFBUSxLQUFLLEtBQUssRUFBRTtNQUNuRyxJQUFJa0YsWUFBWSxHQUFHckksQ0FBQyxDQUFDeUUsT0FBTyxDQUFDcUQsRUFBRSxDQUFDOUgsQ0FBQyxDQUFDNkQsWUFBWSxDQUFDLENBQUN5RSxXQUFXLENBQUMsSUFBSSxDQUFDO01BQ2pFdEksQ0FBQyxDQUFDOEUsS0FBSyxDQUFDNUgsR0FBRyxDQUFDLFFBQVEsRUFBRW1MLFlBQVksQ0FBQztJQUN2QztFQUVKLENBQUM7RUFFRHhJLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3dhLFNBQVMsR0FDekJ6VSxLQUFLLENBQUMvRixTQUFTLENBQUN5YSxjQUFjLEdBQUcsWUFBVztJQUV4QztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRVEsSUFBSXZVLENBQUMsR0FBRyxJQUFJO01BQUVpVCxDQUFDO01BQUV1QixJQUFJO01BQUVoVyxNQUFNO01BQUVpVyxLQUFLO01BQUV2SSxPQUFPLEdBQUcsS0FBSztNQUFFaUgsSUFBSTtJQUUzRCxJQUFJL2EsQ0FBQyxDQUFDK2EsSUFBSSxDQUFFdUIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQUssUUFBUSxFQUFHO01BRXRDbFcsTUFBTSxHQUFJa1csU0FBUyxDQUFDLENBQUMsQ0FBQztNQUN0QnhJLE9BQU8sR0FBR3dJLFNBQVMsQ0FBQyxDQUFDLENBQUM7TUFDdEJ2QixJQUFJLEdBQUcsVUFBVTtJQUVyQixDQUFDLE1BQU0sSUFBSy9hLENBQUMsQ0FBQythLElBQUksQ0FBRXVCLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxLQUFLLFFBQVEsRUFBRztNQUU5Q2xXLE1BQU0sR0FBSWtXLFNBQVMsQ0FBQyxDQUFDLENBQUM7TUFDdEJELEtBQUssR0FBR0MsU0FBUyxDQUFDLENBQUMsQ0FBQztNQUNwQnhJLE9BQU8sR0FBR3dJLFNBQVMsQ0FBQyxDQUFDLENBQUM7TUFFdEIsSUFBS0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksSUFBSXRjLENBQUMsQ0FBQythLElBQUksQ0FBRXVCLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxLQUFLLE9BQU8sRUFBRztRQUV2RXZCLElBQUksR0FBRyxZQUFZO01BRXZCLENBQUMsTUFBTSxJQUFLLE9BQU91QixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFHO1FBRTlDdkIsSUFBSSxHQUFHLFFBQVE7TUFFbkI7SUFFSjtJQUVBLElBQUtBLElBQUksS0FBSyxRQUFRLEVBQUc7TUFFckJuVCxDQUFDLENBQUN6SCxPQUFPLENBQUNpRyxNQUFNLENBQUMsR0FBR2lXLEtBQUs7SUFHN0IsQ0FBQyxNQUFNLElBQUt0QixJQUFJLEtBQUssVUFBVSxFQUFHO01BRTlCL2EsQ0FBQyxDQUFDcUcsSUFBSSxDQUFFRCxNQUFNLEVBQUcsVUFBVW1XLEdBQUcsRUFBRXpFLEdBQUcsRUFBRztRQUVsQ2xRLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29jLEdBQUcsQ0FBQyxHQUFHekUsR0FBRztNQUV4QixDQUFDLENBQUM7SUFHTixDQUFDLE1BQU0sSUFBS2lELElBQUksS0FBSyxZQUFZLEVBQUc7TUFFaEMsS0FBTXFCLElBQUksSUFBSUMsS0FBSyxFQUFHO1FBRWxCLElBQUlyYyxDQUFDLENBQUMrYSxJQUFJLENBQUVuVCxDQUFDLENBQUN6SCxPQUFPLENBQUM2SixVQUFVLENBQUUsS0FBSyxPQUFPLEVBQUc7VUFFN0NwQyxDQUFDLENBQUN6SCxPQUFPLENBQUM2SixVQUFVLEdBQUcsQ0FBRXFTLEtBQUssQ0FBQ0QsSUFBSSxDQUFDLENBQUU7UUFFMUMsQ0FBQyxNQUFNO1VBRUh2QixDQUFDLEdBQUdqVCxDQUFDLENBQUN6SCxPQUFPLENBQUM2SixVQUFVLENBQUNoSCxNQUFNLEdBQUMsQ0FBQzs7VUFFakM7VUFDQSxPQUFPNlgsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUVaLElBQUlqVCxDQUFDLENBQUN6SCxPQUFPLENBQUM2SixVQUFVLENBQUM2USxDQUFDLENBQUMsQ0FBQ3hILFVBQVUsS0FBS2dKLEtBQUssQ0FBQ0QsSUFBSSxDQUFDLENBQUMvSSxVQUFVLEVBQUc7Y0FFaEV6TCxDQUFDLENBQUN6SCxPQUFPLENBQUM2SixVQUFVLENBQUNnUixNQUFNLENBQUNILENBQUMsRUFBQyxDQUFDLENBQUM7WUFFcEM7WUFFQUEsQ0FBQyxFQUFFO1VBRVA7VUFFQWpULENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZKLFVBQVUsQ0FBQzZNLElBQUksQ0FBRXdGLEtBQUssQ0FBQ0QsSUFBSSxDQUFDLENBQUU7UUFFNUM7TUFFSjtJQUVKO0lBRUEsSUFBS3RJLE9BQU8sRUFBRztNQUVYbE0sQ0FBQyxDQUFDNEgsTUFBTSxFQUFFO01BQ1Y1SCxDQUFDLENBQUNtSSxNQUFNLEVBQUU7SUFFZDtFQUVKLENBQUM7RUFFRHRJLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ2lOLFdBQVcsR0FBRyxZQUFXO0lBRXJDLElBQUkvRyxDQUFDLEdBQUcsSUFBSTtJQUVaQSxDQUFDLENBQUNpVSxhQUFhLEVBQUU7SUFFakJqVSxDQUFDLENBQUNxVSxTQUFTLEVBQUU7SUFFYixJQUFJclUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0osSUFBSSxLQUFLLEtBQUssRUFBRTtNQUMxQnpCLENBQUMsQ0FBQzRULE1BQU0sQ0FBQzVULENBQUMsQ0FBQ3FPLE9BQU8sQ0FBQ3JPLENBQUMsQ0FBQzZELFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsTUFBTTtNQUNIN0QsQ0FBQyxDQUFDb1UsT0FBTyxFQUFFO0lBQ2Y7SUFFQXBVLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ3pNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQzBHLENBQUMsQ0FBQyxDQUFDO0VBRXpDLENBQUM7RUFFREgsS0FBSyxDQUFDL0YsU0FBUyxDQUFDNFYsUUFBUSxHQUFHLFlBQVc7SUFFbEMsSUFBSTFQLENBQUMsR0FBRyxJQUFJO01BQ1I0VSxTQUFTLEdBQUduYyxRQUFRLENBQUNDLElBQUksQ0FBQ3dGLEtBQUs7SUFFbkM4QixDQUFDLENBQUM0RixZQUFZLEdBQUc1RixDQUFDLENBQUN6SCxPQUFPLENBQUM0SyxRQUFRLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxNQUFNO0lBRTdELElBQUluRCxDQUFDLENBQUM0RixZQUFZLEtBQUssS0FBSyxFQUFFO01BQzFCNUYsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDdEwsUUFBUSxDQUFDLGdCQUFnQixDQUFDO0lBQ3hDLENBQUMsTUFBTTtNQUNIdUYsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDbEssV0FBVyxDQUFDLGdCQUFnQixDQUFDO0lBQzNDO0lBRUEsSUFBSStZLFNBQVMsQ0FBQ0MsZ0JBQWdCLEtBQUtDLFNBQVMsSUFDeENGLFNBQVMsQ0FBQ0csYUFBYSxLQUFLRCxTQUFTLElBQ3JDRixTQUFTLENBQUNJLFlBQVksS0FBS0YsU0FBUyxFQUFFO01BQ3RDLElBQUk5VSxDQUFDLENBQUN6SCxPQUFPLENBQUN5SyxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQzNCaEQsQ0FBQyxDQUFDdUYsY0FBYyxHQUFHLElBQUk7TUFDM0I7SUFDSjtJQUVBLElBQUt2RixDQUFDLENBQUN6SCxPQUFPLENBQUNrSixJQUFJLEVBQUc7TUFDbEIsSUFBSyxPQUFPekIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0ssTUFBTSxLQUFLLFFBQVEsRUFBRztRQUN4QyxJQUFJdEQsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0ssTUFBTSxHQUFHLENBQUMsRUFBRztVQUN2QnRELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytLLE1BQU0sR0FBRyxDQUFDO1FBQ3hCO01BQ0osQ0FBQyxNQUFNO1FBQ0h0RCxDQUFDLENBQUN6SCxPQUFPLENBQUMrSyxNQUFNLEdBQUd0RCxDQUFDLENBQUNFLFFBQVEsQ0FBQ29ELE1BQU07TUFDeEM7SUFDSjtJQUVBLElBQUlzUixTQUFTLENBQUNLLFVBQVUsS0FBS0gsU0FBUyxFQUFFO01BQ3BDOVUsQ0FBQyxDQUFDbUYsUUFBUSxHQUFHLFlBQVk7TUFDekJuRixDQUFDLENBQUNpRyxhQUFhLEdBQUcsY0FBYztNQUNoQ2pHLENBQUMsQ0FBQ2tHLGNBQWMsR0FBRyxhQUFhO01BQ2hDLElBQUkwTyxTQUFTLENBQUNNLG1CQUFtQixLQUFLSixTQUFTLElBQUlGLFNBQVMsQ0FBQ08saUJBQWlCLEtBQUtMLFNBQVMsRUFBRTlVLENBQUMsQ0FBQ21GLFFBQVEsR0FBRyxLQUFLO0lBQ3BIO0lBQ0EsSUFBSXlQLFNBQVMsQ0FBQ1EsWUFBWSxLQUFLTixTQUFTLEVBQUU7TUFDdEM5VSxDQUFDLENBQUNtRixRQUFRLEdBQUcsY0FBYztNQUMzQm5GLENBQUMsQ0FBQ2lHLGFBQWEsR0FBRyxnQkFBZ0I7TUFDbENqRyxDQUFDLENBQUNrRyxjQUFjLEdBQUcsZUFBZTtNQUNsQyxJQUFJME8sU0FBUyxDQUFDTSxtQkFBbUIsS0FBS0osU0FBUyxJQUFJRixTQUFTLENBQUNTLGNBQWMsS0FBS1AsU0FBUyxFQUFFOVUsQ0FBQyxDQUFDbUYsUUFBUSxHQUFHLEtBQUs7SUFDakg7SUFDQSxJQUFJeVAsU0FBUyxDQUFDVSxlQUFlLEtBQUtSLFNBQVMsRUFBRTtNQUN6QzlVLENBQUMsQ0FBQ21GLFFBQVEsR0FBRyxpQkFBaUI7TUFDOUJuRixDQUFDLENBQUNpRyxhQUFhLEdBQUcsbUJBQW1CO01BQ3JDakcsQ0FBQyxDQUFDa0csY0FBYyxHQUFHLGtCQUFrQjtNQUNyQyxJQUFJME8sU0FBUyxDQUFDTSxtQkFBbUIsS0FBS0osU0FBUyxJQUFJRixTQUFTLENBQUNPLGlCQUFpQixLQUFLTCxTQUFTLEVBQUU5VSxDQUFDLENBQUNtRixRQUFRLEdBQUcsS0FBSztJQUNwSDtJQUNBLElBQUl5UCxTQUFTLENBQUNXLFdBQVcsS0FBS1QsU0FBUyxFQUFFO01BQ3JDOVUsQ0FBQyxDQUFDbUYsUUFBUSxHQUFHLGFBQWE7TUFDMUJuRixDQUFDLENBQUNpRyxhQUFhLEdBQUcsZUFBZTtNQUNqQ2pHLENBQUMsQ0FBQ2tHLGNBQWMsR0FBRyxjQUFjO01BQ2pDLElBQUkwTyxTQUFTLENBQUNXLFdBQVcsS0FBS1QsU0FBUyxFQUFFOVUsQ0FBQyxDQUFDbUYsUUFBUSxHQUFHLEtBQUs7SUFDL0Q7SUFDQSxJQUFJeVAsU0FBUyxDQUFDWSxTQUFTLEtBQUtWLFNBQVMsSUFBSTlVLENBQUMsQ0FBQ21GLFFBQVEsS0FBSyxLQUFLLEVBQUU7TUFDM0RuRixDQUFDLENBQUNtRixRQUFRLEdBQUcsV0FBVztNQUN4Qm5GLENBQUMsQ0FBQ2lHLGFBQWEsR0FBRyxXQUFXO01BQzdCakcsQ0FBQyxDQUFDa0csY0FBYyxHQUFHLFlBQVk7SUFDbkM7SUFDQWxHLENBQUMsQ0FBQ2dGLGlCQUFpQixHQUFHaEYsQ0FBQyxDQUFDekgsT0FBTyxDQUFDMEssWUFBWSxJQUFLakQsQ0FBQyxDQUFDbUYsUUFBUSxLQUFLLElBQUksSUFBSW5GLENBQUMsQ0FBQ21GLFFBQVEsS0FBSyxLQUFNO0VBQ2pHLENBQUM7RUFHRHRGLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBRLGVBQWUsR0FBRyxVQUFTOUMsS0FBSyxFQUFFO0lBRTlDLElBQUkxSCxDQUFDLEdBQUcsSUFBSTtNQUNSc1AsWUFBWTtNQUFFbUcsU0FBUztNQUFFcEosV0FBVztNQUFFcUosU0FBUztJQUVuREQsU0FBUyxHQUFHelYsQ0FBQyxDQUFDK0YsT0FBTyxDQUNoQmxOLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FDcEJnRCxXQUFXLENBQUMseUNBQXlDLENBQUMsQ0FDdER1RCxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQztJQUVoQ1ksQ0FBQyxDQUFDeUUsT0FBTyxDQUNKcUQsRUFBRSxDQUFDSixLQUFLLENBQUMsQ0FDVGpOLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFFOUIsSUFBSXVGLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLEVBQUU7TUFFL0IsSUFBSThVLFFBQVEsR0FBRzNWLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO01BRXZENk0sWUFBWSxHQUFHM1IsSUFBSSxDQUFDK1EsS0FBSyxDQUFDMU8sQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHLENBQUMsQ0FBQztNQUVyRCxJQUFJekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxLQUFLLElBQUksRUFBRTtRQUU3QixJQUFJOEYsS0FBSyxJQUFJNEgsWUFBWSxJQUFJNUgsS0FBSyxJQUFLMUgsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHLENBQUMsR0FBSWdMLFlBQVksRUFBRTtVQUNyRXRQLENBQUMsQ0FBQ3lFLE9BQU8sQ0FDSnFOLEtBQUssQ0FBQ3BLLEtBQUssR0FBRzRILFlBQVksR0FBR3FHLFFBQVEsRUFBRWpPLEtBQUssR0FBRzRILFlBQVksR0FBRyxDQUFDLENBQUMsQ0FDaEU3VSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQ3hCMkUsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7UUFFckMsQ0FBQyxNQUFNO1VBRUhpTixXQUFXLEdBQUdyTSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEdBQUdpRixLQUFLO1VBQzVDK04sU0FBUyxDQUNKM0QsS0FBSyxDQUFDekYsV0FBVyxHQUFHaUQsWUFBWSxHQUFHLENBQUMsR0FBR3FHLFFBQVEsRUFBRXRKLFdBQVcsR0FBR2lELFlBQVksR0FBRyxDQUFDLENBQUMsQ0FDaEY3VSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQ3hCMkUsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7UUFFckM7UUFFQSxJQUFJc0ksS0FBSyxLQUFLLENBQUMsRUFBRTtVQUViK04sU0FBUyxDQUNKM04sRUFBRSxDQUFDMk4sU0FBUyxDQUFDcmEsTUFBTSxHQUFHLENBQUMsR0FBRzRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksQ0FBQyxDQUNqRGhJLFFBQVEsQ0FBQyxjQUFjLENBQUM7UUFFakMsQ0FBQyxNQUFNLElBQUlpTixLQUFLLEtBQUsxSCxDQUFDLENBQUNzRSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1VBRW5DbVIsU0FBUyxDQUNKM04sRUFBRSxDQUFDOUgsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxDQUFDLENBQzFCaEksUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUVqQztNQUVKO01BRUF1RixDQUFDLENBQUN5RSxPQUFPLENBQ0pxRCxFQUFFLENBQUNKLEtBQUssQ0FBQyxDQUNUak4sUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUVqQyxDQUFDLE1BQU07TUFFSCxJQUFJaU4sS0FBSyxJQUFJLENBQUMsSUFBSUEsS0FBSyxJQUFLMUgsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBYSxFQUFFO1FBRWhFekMsQ0FBQyxDQUFDeUUsT0FBTyxDQUNKcU4sS0FBSyxDQUFDcEssS0FBSyxFQUFFQSxLQUFLLEdBQUcxSCxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLENBQUMsQ0FDNUNoSSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQ3hCMkUsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7TUFFckMsQ0FBQyxNQUFNLElBQUlxVyxTQUFTLENBQUNyYSxNQUFNLElBQUk0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7UUFFbkRnVCxTQUFTLENBQ0poYixRQUFRLENBQUMsY0FBYyxDQUFDLENBQ3hCMkUsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7TUFFckMsQ0FBQyxNQUFNO1FBRUhzVyxTQUFTLEdBQUcxVixDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZO1FBQ2pENEosV0FBVyxHQUFHck0sQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxLQUFLLElBQUksR0FBRzVCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksR0FBR2lGLEtBQUssR0FBR0EsS0FBSztRQUVsRixJQUFJMUgsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxJQUFJekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxJQUFLMUMsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHb0QsS0FBSyxHQUFJMUgsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1VBRXZHZ1QsU0FBUyxDQUNKM0QsS0FBSyxDQUFDekYsV0FBVyxJQUFJck0sQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHaVQsU0FBUyxDQUFDLEVBQUVySixXQUFXLEdBQUdxSixTQUFTLENBQUMsQ0FDbEZqYixRQUFRLENBQUMsY0FBYyxDQUFDLENBQ3hCMkUsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7UUFFckMsQ0FBQyxNQUFNO1VBRUhxVyxTQUFTLENBQ0ozRCxLQUFLLENBQUN6RixXQUFXLEVBQUVBLFdBQVcsR0FBR3JNLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksQ0FBQyxDQUN4RGhJLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FDeEIyRSxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztRQUVyQztNQUVKO0lBRUo7SUFFQSxJQUFJWSxDQUFDLENBQUN6SCxPQUFPLENBQUN1SixRQUFRLEtBQUssVUFBVSxJQUFJOUIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDdUosUUFBUSxLQUFLLGFBQWEsRUFBRTtNQUMzRTlCLENBQUMsQ0FBQzhCLFFBQVEsRUFBRTtJQUNoQjtFQUNKLENBQUM7RUFFRGpDLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3dRLGFBQWEsR0FBRyxZQUFXO0lBRXZDLElBQUl0SyxDQUFDLEdBQUcsSUFBSTtNQUNSa0IsQ0FBQztNQUFFc00sVUFBVTtNQUFFb0ksYUFBYTtJQUVoQyxJQUFJNVYsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0osSUFBSSxLQUFLLElBQUksRUFBRTtNQUN6QnpCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsR0FBRyxLQUFLO0lBQ2hDO0lBRUEsSUFBSWIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxLQUFLLElBQUksSUFBSTVCLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tKLElBQUksS0FBSyxLQUFLLEVBQUU7TUFFekQrTCxVQUFVLEdBQUcsSUFBSTtNQUVqQixJQUFJeE4sQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1FBRXZDLElBQUl6QyxDQUFDLENBQUN6SCxPQUFPLENBQUNzSSxVQUFVLEtBQUssSUFBSSxFQUFFO1VBQy9CK1UsYUFBYSxHQUFHNVYsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxHQUFHLENBQUM7UUFDOUMsQ0FBQyxNQUFNO1VBQ0htVCxhQUFhLEdBQUc1VixDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZO1FBQzFDO1FBRUEsS0FBS3ZCLENBQUMsR0FBR2xCLENBQUMsQ0FBQ3NFLFVBQVUsRUFBRXBELENBQUMsR0FBSWxCLENBQUMsQ0FBQ3NFLFVBQVUsR0FDaENzUixhQUFjLEVBQUUxVSxDQUFDLElBQUksQ0FBQyxFQUFFO1VBQzVCc00sVUFBVSxHQUFHdE0sQ0FBQyxHQUFHLENBQUM7VUFDbEI5SSxDQUFDLENBQUM0SCxDQUFDLENBQUN5RSxPQUFPLENBQUMrSSxVQUFVLENBQUMsQ0FBQyxDQUFDcUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDelcsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FDOUNBLElBQUksQ0FBQyxrQkFBa0IsRUFBRW9PLFVBQVUsR0FBR3hOLENBQUMsQ0FBQ3NFLFVBQVUsQ0FBQyxDQUNuRDBELFNBQVMsQ0FBQ2hJLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQyxDQUFDL0osUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUMxRDtRQUNBLEtBQUt5RyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcwVSxhQUFhLEdBQUk1VixDQUFDLENBQUNzRSxVQUFVLEVBQUVwRCxDQUFDLElBQUksQ0FBQyxFQUFFO1VBQ25Ec00sVUFBVSxHQUFHdE0sQ0FBQztVQUNkOUksQ0FBQyxDQUFDNEgsQ0FBQyxDQUFDeUUsT0FBTyxDQUFDK0ksVUFBVSxDQUFDLENBQUMsQ0FBQ3FJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQ3pXLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQzlDQSxJQUFJLENBQUMsa0JBQWtCLEVBQUVvTyxVQUFVLEdBQUd4TixDQUFDLENBQUNzRSxVQUFVLENBQUMsQ0FDbkRqSixRQUFRLENBQUMyRSxDQUFDLENBQUN3RSxXQUFXLENBQUMsQ0FBQy9KLFFBQVEsQ0FBQyxjQUFjLENBQUM7UUFDekQ7UUFDQXVGLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQzNMLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDNEYsSUFBSSxDQUFDLFlBQVc7VUFDN0RyRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNnSCxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUM7TUFFTjtJQUVKO0VBRUosQ0FBQztFQUVEUyxLQUFLLENBQUMvRixTQUFTLENBQUNpVCxTQUFTLEdBQUcsVUFBVWhULE1BQU0sRUFBRztJQUUzQyxJQUFJaUcsQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFJLENBQUNqRyxNQUFNLEVBQUc7TUFDVmlHLENBQUMsQ0FBQ3lHLFFBQVEsRUFBRTtJQUNoQjtJQUNBekcsQ0FBQyxDQUFDeUYsV0FBVyxHQUFHMUwsTUFBTTtFQUUxQixDQUFDO0VBRUQ4RixLQUFLLENBQUMvRixTQUFTLENBQUNnTixhQUFhLEdBQUcsVUFBU3FGLEtBQUssRUFBRTtJQUU1QyxJQUFJbk0sQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFJOFYsYUFBYSxHQUNiMWQsQ0FBQyxDQUFDK1QsS0FBSyxDQUFDclIsTUFBTSxDQUFDLENBQUNDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FDOUIzQyxDQUFDLENBQUMrVCxLQUFLLENBQUNyUixNQUFNLENBQUMsR0FDZjFDLENBQUMsQ0FBQytULEtBQUssQ0FBQ3JSLE1BQU0sQ0FBQyxDQUFDaWIsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUUvQyxJQUFJck8sS0FBSyxHQUFHekosUUFBUSxDQUFDNlgsYUFBYSxDQUFDMVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFNUQsSUFBSSxDQUFDc0ksS0FBSyxFQUFFQSxLQUFLLEdBQUcsQ0FBQztJQUVyQixJQUFJMUgsQ0FBQyxDQUFDc0UsVUFBVSxJQUFJdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO01BRXhDekMsQ0FBQyxDQUFDd0osWUFBWSxDQUFDOUIsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7TUFDbEM7SUFFSjtJQUVBMUgsQ0FBQyxDQUFDd0osWUFBWSxDQUFDOUIsS0FBSyxDQUFDO0VBRXpCLENBQUM7RUFFRDdILEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBQLFlBQVksR0FBRyxVQUFTOUIsS0FBSyxFQUFFc08sSUFBSSxFQUFFNUosV0FBVyxFQUFFO0lBRTlELElBQUlvQyxXQUFXO01BQUV5SCxTQUFTO01BQUVDLFFBQVE7TUFBRUMsU0FBUztNQUFFMU4sVUFBVSxHQUFHLElBQUk7TUFDOUR6SSxDQUFDLEdBQUcsSUFBSTtNQUFFb1csU0FBUztJQUV2QkosSUFBSSxHQUFHQSxJQUFJLElBQUksS0FBSztJQUVwQixJQUFJaFcsQ0FBQyxDQUFDd0QsU0FBUyxLQUFLLElBQUksSUFBSXhELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzhLLGNBQWMsS0FBSyxJQUFJLEVBQUU7TUFDM0Q7SUFDSjtJQUVBLElBQUlyRCxDQUFDLENBQUN6SCxPQUFPLENBQUNrSixJQUFJLEtBQUssSUFBSSxJQUFJekIsQ0FBQyxDQUFDNkQsWUFBWSxLQUFLNkQsS0FBSyxFQUFFO01BQ3JEO0lBQ0o7SUFFQSxJQUFJc08sSUFBSSxLQUFLLEtBQUssRUFBRTtNQUNoQmhXLENBQUMsQ0FBQ1EsUUFBUSxDQUFDa0gsS0FBSyxDQUFDO0lBQ3JCO0lBRUE4RyxXQUFXLEdBQUc5RyxLQUFLO0lBQ25CZSxVQUFVLEdBQUd6SSxDQUFDLENBQUNxTyxPQUFPLENBQUNHLFdBQVcsQ0FBQztJQUNuQzJILFNBQVMsR0FBR25XLENBQUMsQ0FBQ3FPLE9BQU8sQ0FBQ3JPLENBQUMsQ0FBQzZELFlBQVksQ0FBQztJQUVyQzdELENBQUMsQ0FBQzRELFdBQVcsR0FBRzVELENBQUMsQ0FBQzRFLFNBQVMsS0FBSyxJQUFJLEdBQUd1UixTQUFTLEdBQUduVyxDQUFDLENBQUM0RSxTQUFTO0lBRTlELElBQUk1RSxDQUFDLENBQUN6SCxPQUFPLENBQUNxSixRQUFRLEtBQUssS0FBSyxJQUFJNUIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0ksVUFBVSxLQUFLLEtBQUssS0FBSzZHLEtBQUssR0FBRyxDQUFDLElBQUlBLEtBQUssR0FBRzFILENBQUMsQ0FBQ2lLLFdBQVcsRUFBRSxHQUFHakssQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBYyxDQUFDLEVBQUU7TUFDckksSUFBSTFDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tKLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDMUIrTSxXQUFXLEdBQUd4TyxDQUFDLENBQUM2RCxZQUFZO1FBQzVCLElBQUl1SSxXQUFXLEtBQUssSUFBSSxJQUFJcE0sQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO1VBQy9EekMsQ0FBQyxDQUFDd0ksWUFBWSxDQUFDMk4sU0FBUyxFQUFFLFlBQVc7WUFDakNuVyxDQUFDLENBQUN3UyxTQUFTLENBQUNoRSxXQUFXLENBQUM7VUFDNUIsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxNQUFNO1VBQ0h4TyxDQUFDLENBQUN3UyxTQUFTLENBQUNoRSxXQUFXLENBQUM7UUFDNUI7TUFDSjtNQUNBO0lBQ0osQ0FBQyxNQUFNLElBQUl4TyxDQUFDLENBQUN6SCxPQUFPLENBQUNxSixRQUFRLEtBQUssS0FBSyxJQUFJNUIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0ksVUFBVSxLQUFLLElBQUksS0FBSzZHLEtBQUssR0FBRyxDQUFDLElBQUlBLEtBQUssR0FBSTFILENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWUsQ0FBQyxFQUFFO01BQzFJLElBQUkxQyxDQUFDLENBQUN6SCxPQUFPLENBQUNrSixJQUFJLEtBQUssS0FBSyxFQUFFO1FBQzFCK00sV0FBVyxHQUFHeE8sQ0FBQyxDQUFDNkQsWUFBWTtRQUM1QixJQUFJdUksV0FBVyxLQUFLLElBQUksSUFBSXBNLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR3RFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2tLLFlBQVksRUFBRTtVQUMvRHpDLENBQUMsQ0FBQ3dJLFlBQVksQ0FBQzJOLFNBQVMsRUFBRSxZQUFXO1lBQ2pDblcsQ0FBQyxDQUFDd1MsU0FBUyxDQUFDaEUsV0FBVyxDQUFDO1VBQzVCLENBQUMsQ0FBQztRQUNOLENBQUMsTUFBTTtVQUNIeE8sQ0FBQyxDQUFDd1MsU0FBUyxDQUFDaEUsV0FBVyxDQUFDO1FBQzVCO01BQ0o7TUFDQTtJQUNKO0lBRUEsSUFBS3hPLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29JLFFBQVEsRUFBRztNQUN0QitJLGFBQWEsQ0FBQzFKLENBQUMsQ0FBQzBELGFBQWEsQ0FBQztJQUNsQztJQUVBLElBQUk4SyxXQUFXLEdBQUcsQ0FBQyxFQUFFO01BQ2pCLElBQUl4TyxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjLEtBQUssQ0FBQyxFQUFFO1FBQy9DdVQsU0FBUyxHQUFHalcsQ0FBQyxDQUFDc0UsVUFBVSxHQUFJdEUsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDbUssY0FBZTtNQUN4RSxDQUFDLE1BQU07UUFDSHVULFNBQVMsR0FBR2pXLENBQUMsQ0FBQ3NFLFVBQVUsR0FBR2tLLFdBQVc7TUFDMUM7SUFDSixDQUFDLE1BQU0sSUFBSUEsV0FBVyxJQUFJeE8sQ0FBQyxDQUFDc0UsVUFBVSxFQUFFO01BQ3BDLElBQUl0RSxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNtSyxjQUFjLEtBQUssQ0FBQyxFQUFFO1FBQy9DdVQsU0FBUyxHQUFHLENBQUM7TUFDakIsQ0FBQyxNQUFNO1FBQ0hBLFNBQVMsR0FBR3pILFdBQVcsR0FBR3hPLENBQUMsQ0FBQ3NFLFVBQVU7TUFDMUM7SUFDSixDQUFDLE1BQU07TUFDSDJSLFNBQVMsR0FBR3pILFdBQVc7SUFDM0I7SUFFQXhPLENBQUMsQ0FBQ3dELFNBQVMsR0FBRyxJQUFJO0lBRWxCeEQsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDek0sT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDMEcsQ0FBQyxFQUFFQSxDQUFDLENBQUM2RCxZQUFZLEVBQUVvUyxTQUFTLENBQUMsQ0FBQztJQUVqRUMsUUFBUSxHQUFHbFcsQ0FBQyxDQUFDNkQsWUFBWTtJQUN6QjdELENBQUMsQ0FBQzZELFlBQVksR0FBR29TLFNBQVM7SUFFMUJqVyxDQUFDLENBQUN3SyxlQUFlLENBQUN4SyxDQUFDLENBQUM2RCxZQUFZLENBQUM7SUFFakMsSUFBSzdELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ2lJLFFBQVEsRUFBRztNQUV0QjRWLFNBQVMsR0FBR3BXLENBQUMsQ0FBQ3FKLFlBQVksRUFBRTtNQUM1QitNLFNBQVMsR0FBR0EsU0FBUyxDQUFDN00sS0FBSyxDQUFDLFVBQVUsQ0FBQztNQUV2QyxJQUFLNk0sU0FBUyxDQUFDOVIsVUFBVSxJQUFJOFIsU0FBUyxDQUFDN2QsT0FBTyxDQUFDa0ssWUFBWSxFQUFHO1FBQzFEMlQsU0FBUyxDQUFDNUwsZUFBZSxDQUFDeEssQ0FBQyxDQUFDNkQsWUFBWSxDQUFDO01BQzdDO0lBRUo7SUFFQTdELENBQUMsQ0FBQ3VLLFVBQVUsRUFBRTtJQUNkdkssQ0FBQyxDQUFDOFAsWUFBWSxFQUFFO0lBRWhCLElBQUk5UCxDQUFDLENBQUN6SCxPQUFPLENBQUNrSixJQUFJLEtBQUssSUFBSSxFQUFFO01BQ3pCLElBQUkySyxXQUFXLEtBQUssSUFBSSxFQUFFO1FBRXRCcE0sQ0FBQyxDQUFDME4sWUFBWSxDQUFDd0ksUUFBUSxDQUFDO1FBRXhCbFcsQ0FBQyxDQUFDdU4sU0FBUyxDQUFDMEksU0FBUyxFQUFFLFlBQVc7VUFDOUJqVyxDQUFDLENBQUN3UyxTQUFTLENBQUN5RCxTQUFTLENBQUM7UUFDMUIsQ0FBQyxDQUFDO01BRU4sQ0FBQyxNQUFNO1FBQ0hqVyxDQUFDLENBQUN3UyxTQUFTLENBQUN5RCxTQUFTLENBQUM7TUFDMUI7TUFDQWpXLENBQUMsQ0FBQ29JLGFBQWEsRUFBRTtNQUNqQjtJQUNKO0lBRUEsSUFBSWdFLFdBQVcsS0FBSyxJQUFJLElBQUlwTSxDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFDL0R6QyxDQUFDLENBQUN3SSxZQUFZLENBQUNDLFVBQVUsRUFBRSxZQUFXO1FBQ2xDekksQ0FBQyxDQUFDd1MsU0FBUyxDQUFDeUQsU0FBUyxDQUFDO01BQzFCLENBQUMsQ0FBQztJQUNOLENBQUMsTUFBTTtNQUNIalcsQ0FBQyxDQUFDd1MsU0FBUyxDQUFDeUQsU0FBUyxDQUFDO0lBQzFCO0VBRUosQ0FBQztFQUVEcFcsS0FBSyxDQUFDL0YsU0FBUyxDQUFDNlYsU0FBUyxHQUFHLFlBQVc7SUFFbkMsSUFBSTNQLENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSUEsQ0FBQyxDQUFDekgsT0FBTyxDQUFDZ0ksTUFBTSxLQUFLLElBQUksSUFBSVAsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxFQUFFO01BRXBFekMsQ0FBQyxDQUFDb0UsVUFBVSxDQUFDbkssSUFBSSxFQUFFO01BQ25CK0YsQ0FBQyxDQUFDbUUsVUFBVSxDQUFDbEssSUFBSSxFQUFFO0lBRXZCO0lBRUEsSUFBSStGLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZJLElBQUksS0FBSyxJQUFJLElBQUlwQixDQUFDLENBQUNzRSxVQUFVLEdBQUd0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFFbEV6QyxDQUFDLENBQUMrRCxLQUFLLENBQUM5SixJQUFJLEVBQUU7SUFFbEI7SUFFQStGLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ3RMLFFBQVEsQ0FBQyxlQUFlLENBQUM7RUFFdkMsQ0FBQztFQUVEb0YsS0FBSyxDQUFDL0YsU0FBUyxDQUFDdWMsY0FBYyxHQUFHLFlBQVc7SUFFeEMsSUFBSUMsS0FBSztNQUFFQyxLQUFLO01BQUVDLENBQUM7TUFBRUMsVUFBVTtNQUFFelcsQ0FBQyxHQUFHLElBQUk7SUFFekNzVyxLQUFLLEdBQUd0VyxDQUFDLENBQUMrRSxXQUFXLENBQUMyUixNQUFNLEdBQUcxVyxDQUFDLENBQUMrRSxXQUFXLENBQUM0UixJQUFJO0lBQ2pESixLQUFLLEdBQUd2VyxDQUFDLENBQUMrRSxXQUFXLENBQUM2UixNQUFNLEdBQUc1VyxDQUFDLENBQUMrRSxXQUFXLENBQUM4UixJQUFJO0lBQ2pETCxDQUFDLEdBQUc3WSxJQUFJLENBQUNtWixLQUFLLENBQUNQLEtBQUssRUFBRUQsS0FBSyxDQUFDO0lBRTVCRyxVQUFVLEdBQUc5WSxJQUFJLENBQUNvWixLQUFLLENBQUNQLENBQUMsR0FBRyxHQUFHLEdBQUc3WSxJQUFJLENBQUNxWixFQUFFLENBQUM7SUFDMUMsSUFBSVAsVUFBVSxHQUFHLENBQUMsRUFBRTtNQUNoQkEsVUFBVSxHQUFHLEdBQUcsR0FBRzlZLElBQUksQ0FBQ0MsR0FBRyxDQUFDNlksVUFBVSxDQUFDO0lBQzNDO0lBRUEsSUFBS0EsVUFBVSxJQUFJLEVBQUUsSUFBTUEsVUFBVSxJQUFJLENBQUUsRUFBRTtNQUN6QyxPQUFRelcsQ0FBQyxDQUFDekgsT0FBTyxDQUFDK0osR0FBRyxLQUFLLEtBQUssR0FBRyxNQUFNLEdBQUcsT0FBTztJQUN0RDtJQUNBLElBQUttVSxVQUFVLElBQUksR0FBRyxJQUFNQSxVQUFVLElBQUksR0FBSSxFQUFFO01BQzVDLE9BQVF6VyxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssS0FBSyxHQUFHLE1BQU0sR0FBRyxPQUFPO0lBQ3REO0lBQ0EsSUFBS21VLFVBQVUsSUFBSSxHQUFHLElBQU1BLFVBQVUsSUFBSSxHQUFJLEVBQUU7TUFDNUMsT0FBUXpXLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytKLEdBQUcsS0FBSyxLQUFLLEdBQUcsT0FBTyxHQUFHLE1BQU07SUFDdEQ7SUFDQSxJQUFJdEMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkssZUFBZSxLQUFLLElBQUksRUFBRTtNQUNwQyxJQUFLcVQsVUFBVSxJQUFJLEVBQUUsSUFBTUEsVUFBVSxJQUFJLEdBQUksRUFBRTtRQUMzQyxPQUFPLE1BQU07TUFDakIsQ0FBQyxNQUFNO1FBQ0gsT0FBTyxJQUFJO01BQ2Y7SUFDSjtJQUVBLE9BQU8sVUFBVTtFQUVyQixDQUFDO0VBRUQ1VyxLQUFLLENBQUMvRixTQUFTLENBQUNtZCxRQUFRLEdBQUcsVUFBUzlLLEtBQUssRUFBRTtJQUV2QyxJQUFJbk0sQ0FBQyxHQUFHLElBQUk7TUFDUnNFLFVBQVU7TUFDVlIsU0FBUztJQUViOUQsQ0FBQyxDQUFDeUQsUUFBUSxHQUFHLEtBQUs7SUFDbEJ6RCxDQUFDLENBQUM2RSxPQUFPLEdBQUcsS0FBSztJQUVqQixJQUFJN0UsQ0FBQyxDQUFDcUUsU0FBUyxFQUFFO01BQ2JyRSxDQUFDLENBQUNxRSxTQUFTLEdBQUcsS0FBSztNQUNuQixPQUFPLEtBQUs7SUFDaEI7SUFFQXJFLENBQUMsQ0FBQ3lGLFdBQVcsR0FBRyxLQUFLO0lBQ3JCekYsQ0FBQyxDQUFDOEYsV0FBVyxHQUFLOUYsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDbVMsV0FBVyxHQUFHLEVBQUUsR0FBSyxLQUFLLEdBQUcsSUFBSTtJQUVqRSxJQUFLbFgsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDNFIsSUFBSSxLQUFLN0IsU0FBUyxFQUFHO01BQ3BDLE9BQU8sS0FBSztJQUNoQjtJQUVBLElBQUs5VSxDQUFDLENBQUMrRSxXQUFXLENBQUNvUyxPQUFPLEtBQUssSUFBSSxFQUFHO01BQ2xDblgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDek0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDMEcsQ0FBQyxFQUFFQSxDQUFDLENBQUNxVyxjQUFjLEVBQUUsQ0FBRSxDQUFDO0lBQ3ZEO0lBRUEsSUFBS3JXLENBQUMsQ0FBQytFLFdBQVcsQ0FBQ21TLFdBQVcsSUFBSWxYLENBQUMsQ0FBQytFLFdBQVcsQ0FBQ3FTLFFBQVEsRUFBRztNQUV2RHRULFNBQVMsR0FBRzlELENBQUMsQ0FBQ3FXLGNBQWMsRUFBRTtNQUU5QixRQUFTdlMsU0FBUztRQUVkLEtBQUssTUFBTTtRQUNYLEtBQUssTUFBTTtVQUVQUSxVQUFVLEdBQ050RSxDQUFDLENBQUN6SCxPQUFPLENBQUNzSyxZQUFZLEdBQ2xCN0MsQ0FBQyxDQUFDeU0sY0FBYyxDQUFFek0sQ0FBQyxDQUFDNkQsWUFBWSxHQUFHN0QsQ0FBQyxDQUFDbVAsYUFBYSxFQUFFLENBQUUsR0FDdERuUCxDQUFDLENBQUM2RCxZQUFZLEdBQUc3RCxDQUFDLENBQUNtUCxhQUFhLEVBQUU7VUFFMUNuUCxDQUFDLENBQUMyRCxnQkFBZ0IsR0FBRyxDQUFDO1VBRXRCO1FBRUosS0FBSyxPQUFPO1FBQ1osS0FBSyxJQUFJO1VBRUxXLFVBQVUsR0FDTnRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NLLFlBQVksR0FDbEI3QyxDQUFDLENBQUN5TSxjQUFjLENBQUV6TSxDQUFDLENBQUM2RCxZQUFZLEdBQUc3RCxDQUFDLENBQUNtUCxhQUFhLEVBQUUsQ0FBRSxHQUN0RG5QLENBQUMsQ0FBQzZELFlBQVksR0FBRzdELENBQUMsQ0FBQ21QLGFBQWEsRUFBRTtVQUUxQ25QLENBQUMsQ0FBQzJELGdCQUFnQixHQUFHLENBQUM7VUFFdEI7UUFFSjtNQUFRO01BS1osSUFBSUcsU0FBUyxJQUFJLFVBQVUsRUFBRztRQUUxQjlELENBQUMsQ0FBQ3dKLFlBQVksQ0FBRWxGLFVBQVUsQ0FBRTtRQUM1QnRFLENBQUMsQ0FBQytFLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDbEIvRSxDQUFDLENBQUMrRixPQUFPLENBQUN6TSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMwRyxDQUFDLEVBQUU4RCxTQUFTLENBQUUsQ0FBQztNQUUvQztJQUVKLENBQUMsTUFBTTtNQUVILElBQUs5RCxDQUFDLENBQUMrRSxXQUFXLENBQUMyUixNQUFNLEtBQUsxVyxDQUFDLENBQUMrRSxXQUFXLENBQUM0UixJQUFJLEVBQUc7UUFFL0MzVyxDQUFDLENBQUN3SixZQUFZLENBQUV4SixDQUFDLENBQUM2RCxZQUFZLENBQUU7UUFDaEM3RCxDQUFDLENBQUMrRSxXQUFXLEdBQUcsQ0FBQyxDQUFDO01BRXRCO0lBRUo7RUFFSixDQUFDO0VBRURsRixLQUFLLENBQUMvRixTQUFTLENBQUNrTixZQUFZLEdBQUcsVUFBU21GLEtBQUssRUFBRTtJQUUzQyxJQUFJbk0sQ0FBQyxHQUFHLElBQUk7SUFFWixJQUFLQSxDQUFDLENBQUN6SCxPQUFPLENBQUNxSyxLQUFLLEtBQUssS0FBSyxJQUFNLFlBQVksSUFBSW5LLFFBQVEsSUFBSXVILENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3FLLEtBQUssS0FBSyxLQUFNLEVBQUU7TUFDeEY7SUFDSixDQUFDLE1BQU0sSUFBSTVDLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQytJLFNBQVMsS0FBSyxLQUFLLElBQUk2SyxLQUFLLENBQUNnSCxJQUFJLENBQUMvQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7TUFDNUU7SUFDSjtJQUVBcFEsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDc1MsV0FBVyxHQUFHbEwsS0FBSyxDQUFDbUwsYUFBYSxJQUFJbkwsS0FBSyxDQUFDbUwsYUFBYSxDQUFDQyxPQUFPLEtBQUt6QyxTQUFTLEdBQ3hGM0ksS0FBSyxDQUFDbUwsYUFBYSxDQUFDQyxPQUFPLENBQUNuYyxNQUFNLEdBQUcsQ0FBQztJQUUxQzRFLENBQUMsQ0FBQytFLFdBQVcsQ0FBQ3FTLFFBQVEsR0FBR3BYLENBQUMsQ0FBQ2dFLFNBQVMsR0FBR2hFLENBQUMsQ0FBQ3pILE9BQU8sQ0FDM0N3SyxjQUFjO0lBRW5CLElBQUkvQyxDQUFDLENBQUN6SCxPQUFPLENBQUM2SyxlQUFlLEtBQUssSUFBSSxFQUFFO01BQ3BDcEQsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDcVMsUUFBUSxHQUFHcFgsQ0FBQyxDQUFDaUUsVUFBVSxHQUFHakUsQ0FBQyxDQUFDekgsT0FBTyxDQUM1Q3dLLGNBQWM7SUFDdkI7SUFFQSxRQUFRb0osS0FBSyxDQUFDeE4sSUFBSSxDQUFDZ1MsTUFBTTtNQUVyQixLQUFLLE9BQU87UUFDUjNRLENBQUMsQ0FBQ3dYLFVBQVUsQ0FBQ3JMLEtBQUssQ0FBQztRQUNuQjtNQUVKLEtBQUssTUFBTTtRQUNQbk0sQ0FBQyxDQUFDeVgsU0FBUyxDQUFDdEwsS0FBSyxDQUFDO1FBQ2xCO01BRUosS0FBSyxLQUFLO1FBQ05uTSxDQUFDLENBQUNpWCxRQUFRLENBQUM5SyxLQUFLLENBQUM7UUFDakI7SUFBTTtFQUlsQixDQUFDO0VBRUR0TSxLQUFLLENBQUMvRixTQUFTLENBQUMyZCxTQUFTLEdBQUcsVUFBU3RMLEtBQUssRUFBRTtJQUV4QyxJQUFJbk0sQ0FBQyxHQUFHLElBQUk7TUFDUjBYLFVBQVUsR0FBRyxLQUFLO01BQ2xCQyxPQUFPO01BQUV0QixjQUFjO01BQUVhLFdBQVc7TUFBRVUsY0FBYztNQUFFTCxPQUFPO01BQUVNLG1CQUFtQjtJQUV0Rk4sT0FBTyxHQUFHcEwsS0FBSyxDQUFDbUwsYUFBYSxLQUFLeEMsU0FBUyxHQUFHM0ksS0FBSyxDQUFDbUwsYUFBYSxDQUFDQyxPQUFPLEdBQUcsSUFBSTtJQUVoRixJQUFJLENBQUN2WCxDQUFDLENBQUN5RCxRQUFRLElBQUl6RCxDQUFDLENBQUNxRSxTQUFTLElBQUlrVCxPQUFPLElBQUlBLE9BQU8sQ0FBQ25jLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDL0QsT0FBTyxLQUFLO0lBQ2hCO0lBRUF1YyxPQUFPLEdBQUczWCxDQUFDLENBQUNxTyxPQUFPLENBQUNyTyxDQUFDLENBQUM2RCxZQUFZLENBQUM7SUFFbkM3RCxDQUFDLENBQUMrRSxXQUFXLENBQUM0UixJQUFJLEdBQUdZLE9BQU8sS0FBS3pDLFNBQVMsR0FBR3lDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ08sS0FBSyxHQUFHM0wsS0FBSyxDQUFDNEwsT0FBTztJQUM3RS9YLENBQUMsQ0FBQytFLFdBQVcsQ0FBQzhSLElBQUksR0FBR1UsT0FBTyxLQUFLekMsU0FBUyxHQUFHeUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDUyxLQUFLLEdBQUc3TCxLQUFLLENBQUM4TCxPQUFPO0lBRTdFalksQ0FBQyxDQUFDK0UsV0FBVyxDQUFDbVMsV0FBVyxHQUFHdlosSUFBSSxDQUFDb1osS0FBSyxDQUFDcFosSUFBSSxDQUFDdWEsSUFBSSxDQUM1Q3ZhLElBQUksQ0FBQ3dhLEdBQUcsQ0FBQ25ZLENBQUMsQ0FBQytFLFdBQVcsQ0FBQzRSLElBQUksR0FBRzNXLENBQUMsQ0FBQytFLFdBQVcsQ0FBQzJSLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVEbUIsbUJBQW1CLEdBQUdsYSxJQUFJLENBQUNvWixLQUFLLENBQUNwWixJQUFJLENBQUN1YSxJQUFJLENBQ3RDdmEsSUFBSSxDQUFDd2EsR0FBRyxDQUFDblksQ0FBQyxDQUFDK0UsV0FBVyxDQUFDOFIsSUFBSSxHQUFHN1csQ0FBQyxDQUFDK0UsV0FBVyxDQUFDNlIsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsSUFBSSxDQUFDNVcsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkssZUFBZSxJQUFJLENBQUNwRCxDQUFDLENBQUM2RSxPQUFPLElBQUlnVCxtQkFBbUIsR0FBRyxDQUFDLEVBQUU7TUFDckU3WCxDQUFDLENBQUNxRSxTQUFTLEdBQUcsSUFBSTtNQUNsQixPQUFPLEtBQUs7SUFDaEI7SUFFQSxJQUFJckUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDNkssZUFBZSxLQUFLLElBQUksRUFBRTtNQUNwQ3BELENBQUMsQ0FBQytFLFdBQVcsQ0FBQ21TLFdBQVcsR0FBR1csbUJBQW1CO0lBQ25EO0lBRUF4QixjQUFjLEdBQUdyVyxDQUFDLENBQUNxVyxjQUFjLEVBQUU7SUFFbkMsSUFBSWxLLEtBQUssQ0FBQ21MLGFBQWEsS0FBS3hDLFNBQVMsSUFBSTlVLENBQUMsQ0FBQytFLFdBQVcsQ0FBQ21TLFdBQVcsR0FBRyxDQUFDLEVBQUU7TUFDcEVsWCxDQUFDLENBQUM2RSxPQUFPLEdBQUcsSUFBSTtNQUNoQnNILEtBQUssQ0FBQ3hRLGNBQWMsRUFBRTtJQUMxQjtJQUVBaWMsY0FBYyxHQUFHLENBQUM1WCxDQUFDLENBQUN6SCxPQUFPLENBQUMrSixHQUFHLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBS3RDLENBQUMsQ0FBQytFLFdBQVcsQ0FBQzRSLElBQUksR0FBRzNXLENBQUMsQ0FBQytFLFdBQVcsQ0FBQzJSLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUcsSUFBSTFXLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZLLGVBQWUsS0FBSyxJQUFJLEVBQUU7TUFDcEN3VSxjQUFjLEdBQUc1WCxDQUFDLENBQUMrRSxXQUFXLENBQUM4UixJQUFJLEdBQUc3VyxDQUFDLENBQUMrRSxXQUFXLENBQUM2UixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RTtJQUdBTSxXQUFXLEdBQUdsWCxDQUFDLENBQUMrRSxXQUFXLENBQUNtUyxXQUFXO0lBRXZDbFgsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDb1MsT0FBTyxHQUFHLEtBQUs7SUFFN0IsSUFBSW5YLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3FKLFFBQVEsS0FBSyxLQUFLLEVBQUU7TUFDOUIsSUFBSzVCLENBQUMsQ0FBQzZELFlBQVksS0FBSyxDQUFDLElBQUl3UyxjQUFjLEtBQUssT0FBTyxJQUFNclcsQ0FBQyxDQUFDNkQsWUFBWSxJQUFJN0QsQ0FBQyxDQUFDaUssV0FBVyxFQUFFLElBQUlvTSxjQUFjLEtBQUssTUFBTyxFQUFFO1FBQzFIYSxXQUFXLEdBQUdsWCxDQUFDLENBQUMrRSxXQUFXLENBQUNtUyxXQUFXLEdBQUdsWCxDQUFDLENBQUN6SCxPQUFPLENBQUNpSixZQUFZO1FBQ2hFeEIsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDb1MsT0FBTyxHQUFHLElBQUk7TUFDaEM7SUFDSjtJQUVBLElBQUluWCxDQUFDLENBQUN6SCxPQUFPLENBQUM0SyxRQUFRLEtBQUssS0FBSyxFQUFFO01BQzlCbkQsQ0FBQyxDQUFDNEUsU0FBUyxHQUFHK1MsT0FBTyxHQUFHVCxXQUFXLEdBQUdVLGNBQWM7SUFDeEQsQ0FBQyxNQUFNO01BQ0g1WCxDQUFDLENBQUM0RSxTQUFTLEdBQUcrUyxPQUFPLEdBQUlULFdBQVcsSUFBSWxYLENBQUMsQ0FBQzhFLEtBQUssQ0FBQ3lELE1BQU0sRUFBRSxHQUFHdkksQ0FBQyxDQUFDZ0UsU0FBUyxDQUFDLEdBQUk0VCxjQUFjO0lBQzdGO0lBQ0EsSUFBSTVYLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQzZLLGVBQWUsS0FBSyxJQUFJLEVBQUU7TUFDcENwRCxDQUFDLENBQUM0RSxTQUFTLEdBQUcrUyxPQUFPLEdBQUdULFdBQVcsR0FBR1UsY0FBYztJQUN4RDtJQUVBLElBQUk1WCxDQUFDLENBQUN6SCxPQUFPLENBQUNrSixJQUFJLEtBQUssSUFBSSxJQUFJekIsQ0FBQyxDQUFDekgsT0FBTyxDQUFDdUssU0FBUyxLQUFLLEtBQUssRUFBRTtNQUMxRCxPQUFPLEtBQUs7SUFDaEI7SUFFQSxJQUFJOUMsQ0FBQyxDQUFDd0QsU0FBUyxLQUFLLElBQUksRUFBRTtNQUN0QnhELENBQUMsQ0FBQzRFLFNBQVMsR0FBRyxJQUFJO01BQ2xCLE9BQU8sS0FBSztJQUNoQjtJQUVBNUUsQ0FBQyxDQUFDNFQsTUFBTSxDQUFDNVQsQ0FBQyxDQUFDNEUsU0FBUyxDQUFDO0VBRXpCLENBQUM7RUFFRC9FLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQzBkLFVBQVUsR0FBRyxVQUFTckwsS0FBSyxFQUFFO0lBRXpDLElBQUluTSxDQUFDLEdBQUcsSUFBSTtNQUNSdVgsT0FBTztJQUVYdlgsQ0FBQyxDQUFDeUYsV0FBVyxHQUFHLElBQUk7SUFFcEIsSUFBSXpGLENBQUMsQ0FBQytFLFdBQVcsQ0FBQ3NTLFdBQVcsS0FBSyxDQUFDLElBQUlyWCxDQUFDLENBQUNzRSxVQUFVLElBQUl0RSxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEVBQUU7TUFDM0V6QyxDQUFDLENBQUMrRSxXQUFXLEdBQUcsQ0FBQyxDQUFDO01BQ2xCLE9BQU8sS0FBSztJQUNoQjtJQUVBLElBQUlvSCxLQUFLLENBQUNtTCxhQUFhLEtBQUt4QyxTQUFTLElBQUkzSSxLQUFLLENBQUNtTCxhQUFhLENBQUNDLE9BQU8sS0FBS3pDLFNBQVMsRUFBRTtNQUNoRnlDLE9BQU8sR0FBR3BMLEtBQUssQ0FBQ21MLGFBQWEsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM1QztJQUVBdlgsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDMlIsTUFBTSxHQUFHMVcsQ0FBQyxDQUFDK0UsV0FBVyxDQUFDNFIsSUFBSSxHQUFHWSxPQUFPLEtBQUt6QyxTQUFTLEdBQUd5QyxPQUFPLENBQUNPLEtBQUssR0FBRzNMLEtBQUssQ0FBQzRMLE9BQU87SUFDakcvWCxDQUFDLENBQUMrRSxXQUFXLENBQUM2UixNQUFNLEdBQUc1VyxDQUFDLENBQUMrRSxXQUFXLENBQUM4UixJQUFJLEdBQUdVLE9BQU8sS0FBS3pDLFNBQVMsR0FBR3lDLE9BQU8sQ0FBQ1MsS0FBSyxHQUFHN0wsS0FBSyxDQUFDOEwsT0FBTztJQUVqR2pZLENBQUMsQ0FBQ3lELFFBQVEsR0FBRyxJQUFJO0VBRXJCLENBQUM7RUFFRDVELEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3NlLGNBQWMsR0FBR3ZZLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ3VlLGFBQWEsR0FBRyxZQUFXO0lBRXhFLElBQUlyWSxDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUlBLENBQUMsQ0FBQ2dHLFlBQVksS0FBSyxJQUFJLEVBQUU7TUFFekJoRyxDQUFDLENBQUM0SCxNQUFNLEVBQUU7TUFFVjVILENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQ3lELFFBQVEsQ0FBQyxJQUFJLENBQUMxUCxPQUFPLENBQUNnSyxLQUFLLENBQUMsQ0FBQzJGLE1BQU0sRUFBRTtNQUVuRGxJLENBQUMsQ0FBQ2dHLFlBQVksQ0FBQzNLLFFBQVEsQ0FBQzJFLENBQUMsQ0FBQ3dFLFdBQVcsQ0FBQztNQUV0Q3hFLENBQUMsQ0FBQ21JLE1BQU0sRUFBRTtJQUVkO0VBRUosQ0FBQztFQUVEdEksS0FBSyxDQUFDL0YsU0FBUyxDQUFDOE4sTUFBTSxHQUFHLFlBQVc7SUFFaEMsSUFBSTVILENBQUMsR0FBRyxJQUFJO0lBRVo1SCxDQUFDLENBQUMsZUFBZSxFQUFFNEgsQ0FBQyxDQUFDK0YsT0FBTyxDQUFDLENBQUN6SixNQUFNLEVBQUU7SUFFdEMsSUFBSTBELENBQUMsQ0FBQytELEtBQUssRUFBRTtNQUNUL0QsQ0FBQyxDQUFDK0QsS0FBSyxDQUFDekgsTUFBTSxFQUFFO0lBQ3BCO0lBRUEsSUFBSTBELENBQUMsQ0FBQ29FLFVBQVUsSUFBSXBFLENBQUMsQ0FBQ21ILFFBQVEsQ0FBQzVILElBQUksQ0FBQ1MsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ksU0FBUyxDQUFDLEVBQUU7TUFDdERULENBQUMsQ0FBQ29FLFVBQVUsQ0FBQzlILE1BQU0sRUFBRTtJQUN6QjtJQUVBLElBQUkwRCxDQUFDLENBQUNtRSxVQUFVLElBQUluRSxDQUFDLENBQUNtSCxRQUFRLENBQUM1SCxJQUFJLENBQUNTLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21JLFNBQVMsQ0FBQyxFQUFFO01BQ3REVixDQUFDLENBQUNtRSxVQUFVLENBQUM3SCxNQUFNLEVBQUU7SUFDekI7SUFFQTBELENBQUMsQ0FBQ3lFLE9BQU8sQ0FDSjVJLFdBQVcsQ0FBQyxzREFBc0QsQ0FBQyxDQUNuRXVELElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQzNCbEMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7RUFFekIsQ0FBQztFQUVEMkMsS0FBSyxDQUFDL0YsU0FBUyxDQUFDbVMsT0FBTyxHQUFHLFVBQVNxTSxjQUFjLEVBQUU7SUFFL0MsSUFBSXRZLENBQUMsR0FBRyxJQUFJO0lBQ1pBLENBQUMsQ0FBQytGLE9BQU8sQ0FBQ3pNLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQzBHLENBQUMsRUFBRXNZLGNBQWMsQ0FBQyxDQUFDO0lBQ2pEdFksQ0FBQyxDQUFDc04sT0FBTyxFQUFFO0VBRWYsQ0FBQztFQUVEek4sS0FBSyxDQUFDL0YsU0FBUyxDQUFDZ1csWUFBWSxHQUFHLFlBQVc7SUFFdEMsSUFBSTlQLENBQUMsR0FBRyxJQUFJO01BQ1JzUCxZQUFZO0lBRWhCQSxZQUFZLEdBQUczUixJQUFJLENBQUMrUSxLQUFLLENBQUMxTyxDQUFDLENBQUN6SCxPQUFPLENBQUNrSyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRXJELElBQUt6QyxDQUFDLENBQUN6SCxPQUFPLENBQUNnSSxNQUFNLEtBQUssSUFBSSxJQUMxQlAsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxJQUNyQyxDQUFDekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDcUosUUFBUSxFQUFHO01BRXRCNUIsQ0FBQyxDQUFDb0UsVUFBVSxDQUFDdkksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUN1RCxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUN6RVksQ0FBQyxDQUFDbUUsVUFBVSxDQUFDdEksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUN1RCxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUV6RSxJQUFJWSxDQUFDLENBQUM2RCxZQUFZLEtBQUssQ0FBQyxFQUFFO1FBRXRCN0QsQ0FBQyxDQUFDb0UsVUFBVSxDQUFDM0osUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMyRSxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztRQUNyRVksQ0FBQyxDQUFDbUUsVUFBVSxDQUFDdEksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUN1RCxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUU3RSxDQUFDLE1BQU0sSUFBSVksQ0FBQyxDQUFDNkQsWUFBWSxJQUFJN0QsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHdEUsQ0FBQyxDQUFDekgsT0FBTyxDQUFDa0ssWUFBWSxJQUFJekMsQ0FBQyxDQUFDekgsT0FBTyxDQUFDc0ksVUFBVSxLQUFLLEtBQUssRUFBRTtRQUVsR2IsQ0FBQyxDQUFDbUUsVUFBVSxDQUFDMUosUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMyRSxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztRQUNyRVksQ0FBQyxDQUFDb0UsVUFBVSxDQUFDdkksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUN1RCxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztNQUU3RSxDQUFDLE1BQU0sSUFBSVksQ0FBQyxDQUFDNkQsWUFBWSxJQUFJN0QsQ0FBQyxDQUFDc0UsVUFBVSxHQUFHLENBQUMsSUFBSXRFLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ3NJLFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFFNUViLENBQUMsQ0FBQ21FLFVBQVUsQ0FBQzFKLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDMkUsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7UUFDckVZLENBQUMsQ0FBQ29FLFVBQVUsQ0FBQ3ZJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDdUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7TUFFN0U7SUFFSjtFQUVKLENBQUM7RUFFRFMsS0FBSyxDQUFDL0YsU0FBUyxDQUFDeVEsVUFBVSxHQUFHLFlBQVc7SUFFcEMsSUFBSXZLLENBQUMsR0FBRyxJQUFJO0lBRVosSUFBSUEsQ0FBQyxDQUFDK0QsS0FBSyxLQUFLLElBQUksRUFBRTtNQUVsQi9ELENBQUMsQ0FBQytELEtBQUssQ0FDRmxMLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDTmdELFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FDM0IwVSxHQUFHLEVBQUU7TUFFZHZRLENBQUMsQ0FBQytELEtBQUssQ0FDRmxMLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDVmlQLEVBQUUsQ0FBQ25LLElBQUksQ0FBQytRLEtBQUssQ0FBQzFPLENBQUMsQ0FBQzZELFlBQVksR0FBRzdELENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ21LLGNBQWMsQ0FBQyxDQUFDLENBQ3pEakksUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUVqQztFQUVKLENBQUM7RUFFRG9GLEtBQUssQ0FBQy9GLFNBQVMsQ0FBQ2tULFVBQVUsR0FBRyxZQUFXO0lBRXBDLElBQUloTixDQUFDLEdBQUcsSUFBSTtJQUVaLElBQUtBLENBQUMsQ0FBQ3pILE9BQU8sQ0FBQ29JLFFBQVEsRUFBRztNQUV0QixJQUFLbEksUUFBUSxDQUFDdUgsQ0FBQyxDQUFDMEYsTUFBTSxDQUFDLEVBQUc7UUFFdEIxRixDQUFDLENBQUN5RixXQUFXLEdBQUcsSUFBSTtNQUV4QixDQUFDLE1BQU07UUFFSHpGLENBQUMsQ0FBQ3lGLFdBQVcsR0FBRyxLQUFLO01BRXpCO0lBRUo7RUFFSixDQUFDO0VBRURyTixDQUFDLENBQUMyRyxFQUFFLENBQUN3SyxLQUFLLEdBQUcsWUFBVztJQUNwQixJQUFJdkosQ0FBQyxHQUFHLElBQUk7TUFDUjJVLEdBQUcsR0FBR0QsU0FBUyxDQUFDLENBQUMsQ0FBQztNQUNsQjZELElBQUksR0FBR0MsS0FBSyxDQUFDMWUsU0FBUyxDQUFDZ1ksS0FBSyxDQUFDclMsSUFBSSxDQUFDaVYsU0FBUyxFQUFFLENBQUMsQ0FBQztNQUMvQ3pCLENBQUMsR0FBR2pULENBQUMsQ0FBQzVFLE1BQU07TUFDWjhGLENBQUM7TUFDRHVYLEdBQUc7SUFDUCxLQUFLdlgsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHK1IsQ0FBQyxFQUFFL1IsQ0FBQyxFQUFFLEVBQUU7TUFDcEIsSUFBSXJDLE9BQUEsQ0FBTzhWLEdBQUcsS0FBSSxRQUFRLElBQUksT0FBT0EsR0FBRyxJQUFJLFdBQVcsRUFDbkQzVSxDQUFDLENBQUNrQixDQUFDLENBQUMsQ0FBQ3FJLEtBQUssR0FBRyxJQUFJMUosS0FBSyxDQUFDRyxDQUFDLENBQUNrQixDQUFDLENBQUMsRUFBRXlULEdBQUcsQ0FBQyxDQUFDLEtBRWxDOEQsR0FBRyxHQUFHelksQ0FBQyxDQUFDa0IsQ0FBQyxDQUFDLENBQUNxSSxLQUFLLENBQUNvTCxHQUFHLENBQUMsQ0FBQytELEtBQUssQ0FBQzFZLENBQUMsQ0FBQ2tCLENBQUMsQ0FBQyxDQUFDcUksS0FBSyxFQUFFZ1AsSUFBSSxDQUFDO01BQ2pELElBQUksT0FBT0UsR0FBRyxJQUFJLFdBQVcsRUFBRSxPQUFPQSxHQUFHO0lBQzdDO0lBQ0EsT0FBT3pZLENBQUM7RUFDWixDQUFDO0FBRUwsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7O0FDbDhGRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxDQUFDLFVBQVU1SCxDQUFDLEVBQUU7RUFDWixZQUFZOztFQUVaO0VBQ0E7RUFFQSxJQUFJdWdCLEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFhcmdCLE9BQU8sRUFBRTtJQUMzQjtJQUNBLElBQUksQ0FBQ0EsT0FBTyxHQUFHRixDQUFDLENBQUNFLE9BQU8sQ0FBQztJQUN6QjtFQUNGLENBQUM7O0VBRURxZ0IsR0FBRyxDQUFDcGYsT0FBTyxHQUFHLE9BQU87RUFFckJvZixHQUFHLENBQUNuZixtQkFBbUIsR0FBRyxHQUFHO0VBRTdCbWYsR0FBRyxDQUFDN2UsU0FBUyxDQUFDRCxJQUFJLEdBQUcsWUFBWTtJQUMvQixJQUFJNkUsS0FBSyxHQUFNLElBQUksQ0FBQ3BHLE9BQU87SUFDM0IsSUFBSXNnQixHQUFHLEdBQVFsYSxLQUFLLENBQUM2TixPQUFPLENBQUMsd0JBQXdCLENBQUM7SUFDdEQsSUFBSXNNLFFBQVEsR0FBR25hLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUVuQyxJQUFJLENBQUNrYSxRQUFRLEVBQUU7TUFDYkEsUUFBUSxHQUFHbmEsS0FBSyxDQUFDVSxJQUFJLENBQUMsTUFBTSxDQUFDO01BQzdCeVosUUFBUSxHQUFHQSxRQUFRLElBQUlBLFFBQVEsQ0FBQ3ZaLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFBQztJQUNoRTs7SUFFQSxJQUFJWixLQUFLLENBQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUUzQyxJQUFJNGQsU0FBUyxHQUFHRixHQUFHLENBQUMvZixJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDMUMsSUFBSWtnQixTQUFTLEdBQUczZ0IsQ0FBQyxDQUFDZ0MsS0FBSyxDQUFDLGFBQWEsRUFBRTtNQUNyQ0MsYUFBYSxFQUFFcUUsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSWMsU0FBUyxHQUFHcEgsQ0FBQyxDQUFDZ0MsS0FBSyxDQUFDLGFBQWEsRUFBRTtNQUNyQ0MsYUFBYSxFQUFFeWUsU0FBUyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0lBRUZBLFNBQVMsQ0FBQ3hmLE9BQU8sQ0FBQ3lmLFNBQVMsQ0FBQztJQUM1QnJhLEtBQUssQ0FBQ3BGLE9BQU8sQ0FBQ2tHLFNBQVMsQ0FBQztJQUV4QixJQUFJQSxTQUFTLENBQUNsRixrQkFBa0IsRUFBRSxJQUFJeWUsU0FBUyxDQUFDemUsa0JBQWtCLEVBQUUsRUFBRTtJQUV0RSxJQUFJK0UsT0FBTyxHQUFHakgsQ0FBQyxDQUFDeWdCLFFBQVEsQ0FBQztJQUV6QixJQUFJLENBQUNHLFFBQVEsQ0FBQ3RhLEtBQUssQ0FBQzZOLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRXFNLEdBQUcsQ0FBQztJQUN2QyxJQUFJLENBQUNJLFFBQVEsQ0FBQzNaLE9BQU8sRUFBRUEsT0FBTyxDQUFDbEUsTUFBTSxFQUFFLEVBQUUsWUFBWTtNQUNuRDJkLFNBQVMsQ0FBQ3hmLE9BQU8sQ0FBQztRQUNoQjZaLElBQUksRUFBRSxlQUFlO1FBQ3JCOVksYUFBYSxFQUFFcUUsS0FBSyxDQUFDLENBQUM7TUFDeEIsQ0FBQyxDQUFDO01BQ0ZBLEtBQUssQ0FBQ3BGLE9BQU8sQ0FBQztRQUNaNlosSUFBSSxFQUFFLGNBQWM7UUFDcEI5WSxhQUFhLEVBQUV5ZSxTQUFTLENBQUMsQ0FBQztNQUM1QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSixDQUFDO0VBRURILEdBQUcsQ0FBQzdlLFNBQVMsQ0FBQ2tmLFFBQVEsR0FBRyxVQUFVMWdCLE9BQU8sRUFBRTJnQixTQUFTLEVBQUUxYyxRQUFRLEVBQUU7SUFDL0QsSUFBSTJjLE9BQU8sR0FBTUQsU0FBUyxDQUFDcGdCLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUMsSUFBSW1DLFVBQVUsR0FBR3VCLFFBQVEsSUFDcEJuRSxDQUFDLENBQUM2QyxPQUFPLENBQUNELFVBQVUsS0FDbkJrZSxPQUFPLENBQUM5ZCxNQUFNLElBQUk4ZCxPQUFPLENBQUNoZSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDK2QsU0FBUyxDQUFDcGdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQ3VDLE1BQU0sQ0FBQztJQUV2RixTQUFTOFcsSUFBSUEsQ0FBQSxFQUFHO01BQ2RnSCxPQUFPLENBQ0pyZCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQ3JCaEQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQ2hDZ0QsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUN2QjBVLEdBQUcsRUFBRSxDQUNMMVgsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQ3pCdUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7TUFFakM5RyxPQUFPLENBQ0ptQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ2xCNUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQ3pCdUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUM7TUFFaEMsSUFBSXBFLFVBQVUsRUFBRTtRQUNkMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDa0QsV0FBVyxFQUFDO1FBQ3ZCbEQsT0FBTyxDQUFDbUMsUUFBUSxDQUFDLElBQUksQ0FBQztNQUN4QixDQUFDLE1BQU07UUFDTG5DLE9BQU8sQ0FBQ3VELFdBQVcsQ0FBQyxNQUFNLENBQUM7TUFDN0I7TUFFQSxJQUFJdkQsT0FBTyxDQUFDNkMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUNDLE1BQU0sRUFBRTtRQUMzQzlDLE9BQU8sQ0FDSmlVLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDcEI5UixRQUFRLENBQUMsUUFBUSxDQUFDLENBQ3BCOFYsR0FBRyxFQUFFLENBQ0wxWCxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FDekJ1RyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQztNQUNsQztNQUVBN0MsUUFBUSxJQUFJQSxRQUFRLEVBQUU7SUFDeEI7SUFFQTJjLE9BQU8sQ0FBQzlkLE1BQU0sSUFBSUosVUFBVSxHQUMxQmtlLE9BQU8sQ0FDSnJlLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRXFYLElBQUksQ0FBQyxDQUM1QnhXLG9CQUFvQixDQUFDaWQsR0FBRyxDQUFDbmYsbUJBQW1CLENBQUMsR0FDaEQwWSxJQUFJLEVBQUU7SUFFUmdILE9BQU8sQ0FBQ3JkLFdBQVcsQ0FBQyxJQUFJLENBQUM7RUFDM0IsQ0FBQzs7RUFHRDtFQUNBOztFQUVBLFNBQVMwQyxNQUFNQSxDQUFDQyxNQUFNLEVBQUU7SUFDdEIsT0FBTyxJQUFJLENBQUNDLElBQUksQ0FBQyxZQUFZO01BQzNCLElBQUlDLEtBQUssR0FBR3RHLENBQUMsQ0FBQyxJQUFJLENBQUM7TUFDbkIsSUFBSXVHLElBQUksR0FBSUQsS0FBSyxDQUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDO01BRWhDLElBQUksQ0FBQ0EsSUFBSSxFQUFFRCxLQUFLLENBQUNDLElBQUksQ0FBQyxRQUFRLEVBQUdBLElBQUksR0FBRyxJQUFJZ2EsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFFO01BQ3ZELElBQUksT0FBT25hLE1BQU0sSUFBSSxRQUFRLEVBQUVHLElBQUksQ0FBQ0gsTUFBTSxDQUFDLEVBQUU7SUFDL0MsQ0FBQyxDQUFDO0VBQ0o7RUFFQSxJQUFJTSxHQUFHLEdBQUcxRyxDQUFDLENBQUMyRyxFQUFFLENBQUNvYSxHQUFHO0VBRWxCL2dCLENBQUMsQ0FBQzJHLEVBQUUsQ0FBQ29hLEdBQUcsR0FBZTVhLE1BQU07RUFDN0JuRyxDQUFDLENBQUMyRyxFQUFFLENBQUNvYSxHQUFHLENBQUNsYSxXQUFXLEdBQUcwWixHQUFHOztFQUcxQjtFQUNBOztFQUVBdmdCLENBQUMsQ0FBQzJHLEVBQUUsQ0FBQ29hLEdBQUcsQ0FBQ2phLFVBQVUsR0FBRyxZQUFZO0lBQ2hDOUcsQ0FBQyxDQUFDMkcsRUFBRSxDQUFDb2EsR0FBRyxHQUFHcmEsR0FBRztJQUNkLE9BQU8sSUFBSTtFQUNiLENBQUM7O0VBR0Q7RUFDQTs7RUFFQSxJQUFJK0gsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQWExTSxDQUFDLEVBQUU7SUFDOUJBLENBQUMsQ0FBQ3dCLGNBQWMsRUFBRTtJQUNsQjRDLE1BQU0sQ0FBQ2tCLElBQUksQ0FBQ3JILENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUM7RUFDOUIsQ0FBQztFQUVEQSxDQUFDLENBQUNLLFFBQVEsQ0FBQyxDQUNSbUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFaU0sWUFBWSxDQUFDLENBQ2hFak0sRUFBRSxDQUFDLHVCQUF1QixFQUFFLHNCQUFzQixFQUFFaU0sWUFBWSxDQUFDO0FBRXRFLENBQUMsQ0FBQ25ILE1BQU0sQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUMxSlQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRGpCLHdCIiwiZmlsZSI6InZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBtb2RhbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI21vZGFsc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE1PREFMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zICAgICAgICAgICAgID0gb3B0aW9uc1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kZGlhbG9nICAgICAgICAgICAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcubW9kYWwtZGlhbG9nJylcbiAgICB0aGlzLiRiYWNrZHJvcCAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5pc1Nob3duICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkICAgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoICAgICAgPSAwXG4gICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3RlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5maW5kKCcubW9kYWwtY29udGVudCcpXG4gICAgICAgIC5sb2FkKHRoaXMub3B0aW9ucy5yZW1vdGUsICQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignbG9hZGVkLmJzLm1vZGFsJylcbiAgICAgICAgfSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9uKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub25lKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhhdC4kZWxlbWVudCkpIHRoYXQuaWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICB0aGF0LmFkanVzdERpYWxvZygpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZGlhbG9nIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICAgIC5vZmYoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRkaWFsb2cub2ZmKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBlLnRhcmdldCAmJlxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLndoaWNoID09IDI3ICYmIHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuaGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJylcbiAgICAgIHRoYXQucmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGF0LnJlc2V0U2Nyb2xsYmFyKClcbiAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm1vZGFsJylcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wICYmIHRoaXMuJGJhY2tkcm9wLnJlbW92ZSgpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYmFja2Ryb3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgYW5pbWF0ZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/ICdmYWRlJyA6ICcnXG5cbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgdmFyIGRvQW5pbWF0ZSA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIGFuaW1hdGVcblxuICAgICAgdGhpcy4kYmFja2Ryb3AgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAuYWRkQ2xhc3MoJ21vZGFsLWJhY2tkcm9wICcgKyBhbmltYXRlKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy4kYm9keSlcblxuICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICB0aGlzLm9wdGlvbnMuYmFja2Ryb3AgPT0gJ3N0YXRpYydcbiAgICAgICAgICA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMoKVxuICAgICAgICAgIDogdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuXG4gICAgICBpZiAoZG9BbmltYXRlKSB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuXG5cbiAgICAgIGRvQW5pbWF0ZSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQucmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcblxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICAvLyB0aGVzZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG5cbiAgTW9kYWwucHJvdG90eXBlLmhhbmRsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFkanVzdERpYWxvZygpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RhbElzT3ZlcmZsb3dpbmcgPSB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAgIXRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiB0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZ1bGxXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgaWYgKCFmdWxsV2luZG93V2lkdGgpIHsgLy8gd29ya2Fyb3VuZCBmb3IgbWlzc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBpbiBJRThcbiAgICAgIHZhciBkb2N1bWVudEVsZW1lbnRSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBmdWxsV2luZG93V2lkdGggPSBkb2N1bWVudEVsZW1lbnRSZWN0LnJpZ2h0IC0gTWF0aC5hYnMoZG9jdW1lbnRFbGVtZW50UmVjdC5sZWZ0KVxuICAgIH1cbiAgICB0aGlzLmJvZHlJc092ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IGZ1bGxXaW5kb3dXaWR0aFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm9keVBhZCA9IHBhcnNlSW50KCh0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcpIHx8IDApLCAxMClcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0IHx8ICcnXG4gICAgaWYgKHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcpIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYm9keVBhZCArIHRoaXMuc2Nyb2xsYmFyV2lkdGgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCB0aGlzLm9yaWdpbmFsQm9keVBhZClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkgeyAvLyB0aHggd2Fsc2hcbiAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJ1xuICAgIHRoaXMuJGJvZHkuYXBwZW5kKHNjcm9sbERpdilcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICB0aGlzLiRib2R5WzBdLnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG5cbiAgLy8gTU9EQUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uLCBfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLm1vZGFsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLm1vZGFsJywgKGRhdGEgPSBuZXcgTW9kYWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXShfcmVsYXRlZFRhcmdldClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvdykgZGF0YS5zaG93KF9yZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5tb2RhbFxuXG4gICQuZm4ubW9kYWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5tb2RhbC5Db25zdHJ1Y3RvciA9IE1vZGFsXG5cblxuICAvLyBNT0RBTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ubW9kYWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLm1vZGFsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gTU9EQUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMubW9kYWwuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciBocmVmICAgID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbiAgPSAkdGFyZ2V0LmRhdGEoJ2JzLm1vZGFsJykgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHsgcmVtb3RlOiAhLyMvLnRlc3QoaHJlZikgJiYgaHJlZiB9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuXG4gICAgaWYgKCR0aGlzLmlzKCdhJykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJHRhcmdldC5vbmUoJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoc2hvd0V2ZW50KSB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm4gLy8gb25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgJHRhcmdldC5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRoaXMuaXMoJzp2aXNpYmxlJykgJiYgJHRoaXMudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfSlcbiAgICB9KVxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbiwgdGhpcylcbiAgfSlcblxufShqUXVlcnkpOyIsIi8qXG4gICAgIF8gXyAgICAgIF8gICAgICAgX1xuIF9fX3wgKF8pIF9fX3wgfCBfXyAgKF8pX19fXG4vIF9ffCB8IHwvIF9ffCB8LyAvICB8IC8gX198XG5cXF9fIFxcIHwgfCAoX198ICAgPCBfIHwgXFxfXyBcXFxufF9fXy9ffF98XFxfX198X3xcXF8oXykvIHxfX18vXG4gICAgICAgICAgICAgICAgICAgfF9fL1xuXG4gVmVyc2lvbjogMS44LjBcbiAgQXV0aG9yOiBLZW4gV2hlZWxlclxuIFdlYnNpdGU6IGh0dHA6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pb1xuICAgIERvY3M6IGh0dHA6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGlja1xuICAgIFJlcG86IGh0dHA6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2tcbiAgSXNzdWVzOiBodHRwOi8vZ2l0aHViLmNvbS9rZW53aGVlbGVyL3NsaWNrL2lzc3Vlc1xuXG4gKi9cbi8qIGdsb2JhbCB3aW5kb3csIGRvY3VtZW50LCBkZWZpbmUsIGpRdWVyeSwgc2V0SW50ZXJ2YWwsIGNsZWFySW50ZXJ2YWwgKi9cbjsoZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG5cbn0oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgU2xpY2sgPSB3aW5kb3cuU2xpY2sgfHwge307XG5cbiAgICBTbGljayA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgaW5zdGFuY2VVaWQgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIFNsaWNrKGVsZW1lbnQsIHNldHRpbmdzKSB7XG5cbiAgICAgICAgICAgIHZhciBfID0gdGhpcywgZGF0YVNldHRpbmdzO1xuXG4gICAgICAgICAgICBfLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogJChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBhcHBlbmREb3RzOiAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwic2xpY2stcHJldlwiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj5QcmV2aW91czwvYnV0dG9uPicsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cInNsaWNrLW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHR5cGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2Vhc2UnLFxuICAgICAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAvPicpLnRleHQoaSArIDEpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZG90c0NsYXNzOiAnc2xpY2stZG90cycsXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgZWRnZUZyaWN0aW9uOiAwLjM1LFxuICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25DaGFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uRG90c0hvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXNwb25kVG86ICd3aW5kb3cnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcm93czogMSxcbiAgICAgICAgICAgICAgICBydGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlOiAnJyxcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJSb3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICAgICAgc3dpcGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3dpcGVUb1NsaWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3VjaE1vdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2hUaHJlc2hvbGQ6IDUsXG4gICAgICAgICAgICAgICAgdXNlQ1NTOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3YWl0Rm9yQW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIF8uaW5pdGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b1BsYXlUaW1lcjogbnVsbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZWZ0OiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgJGRvdHM6IG51bGwsXG4gICAgICAgICAgICAgICAgbGlzdFdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpc3RIZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9hZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgICRuZXh0QXJyb3c6IG51bGwsXG4gICAgICAgICAgICAgICAgJHByZXZBcnJvdzogbnVsbCxcbiAgICAgICAgICAgICAgICBzY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlQ291bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgc2xpZGVXaWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICAkc2xpZGVUcmFjazogbnVsbCxcbiAgICAgICAgICAgICAgICAkc2xpZGVzOiBudWxsLFxuICAgICAgICAgICAgICAgIHNsaWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIHN3aXBlTGVmdDogbnVsbCxcbiAgICAgICAgICAgICAgICBzd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAkbGlzdDogbnVsbCxcbiAgICAgICAgICAgICAgICB0b3VjaE9iamVjdDoge30sXG4gICAgICAgICAgICAgICAgdHJhbnNmb3Jtc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVuc2xpY2tlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICQuZXh0ZW5kKF8sIF8uaW5pdGlhbHMpO1xuXG4gICAgICAgICAgICBfLmFjdGl2ZUJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLmFuaW1Qcm9wID0gbnVsbDtcbiAgICAgICAgICAgIF8uYnJlYWtwb2ludHMgPSBbXTtcbiAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzID0gW107XG4gICAgICAgICAgICBfLmNzc1RyYW5zaXRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICBfLmZvY3Vzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmhpZGRlbiA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5wb3NpdGlvblByb3AgPSBudWxsO1xuICAgICAgICAgICAgXy5yZXNwb25kVG8gPSBudWxsO1xuICAgICAgICAgICAgXy5yb3dDb3VudCA9IDE7XG4gICAgICAgICAgICBfLnNob3VsZENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIF8uJHNsaWRlciA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IG51bGw7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICBfLndpbmRvd1dpZHRoID0gMDtcbiAgICAgICAgICAgIF8ud2luZG93VGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBkYXRhU2V0dGluZ3MgPSAkKGVsZW1lbnQpLmRhdGEoJ3NsaWNrJykgfHwge307XG5cbiAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLmRlZmF1bHRzLCBzZXR0aW5ncywgZGF0YVNldHRpbmdzKTtcblxuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuXG4gICAgICAgICAgICBfLm9yaWdpbmFsU2V0dGluZ3MgPSBfLm9wdGlvbnM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF8uaGlkZGVuID0gJ21vekhpZGRlbic7XG4gICAgICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF8uaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLmF1dG9QbGF5ID0gJC5wcm94eShfLmF1dG9QbGF5LCBfKTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlDbGVhciA9ICQucHJveHkoXy5hdXRvUGxheUNsZWFyLCBfKTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlJdGVyYXRvciA9ICQucHJveHkoXy5hdXRvUGxheUl0ZXJhdG9yLCBfKTtcbiAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUgPSAkLnByb3h5KF8uY2hhbmdlU2xpZGUsIF8pO1xuICAgICAgICAgICAgXy5jbGlja0hhbmRsZXIgPSAkLnByb3h5KF8uY2xpY2tIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uc2VsZWN0SGFuZGxlciA9ICQucHJveHkoXy5zZWxlY3RIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uc2V0UG9zaXRpb24gPSAkLnByb3h5KF8uc2V0UG9zaXRpb24sIF8pO1xuICAgICAgICAgICAgXy5zd2lwZUhhbmRsZXIgPSAkLnByb3h5KF8uc3dpcGVIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uZHJhZ0hhbmRsZXIgPSAkLnByb3h5KF8uZHJhZ0hhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5rZXlIYW5kbGVyID0gJC5wcm94eShfLmtleUhhbmRsZXIsIF8pO1xuXG4gICAgICAgICAgICBfLmluc3RhbmNlVWlkID0gaW5zdGFuY2VVaWQrKztcblxuICAgICAgICAgICAgLy8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3NcbiAgICAgICAgICAgIC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uIChtdXN0IHN0YXJ0IHdpdGggPClcbiAgICAgICAgICAgIC8vIEV4dHJhY3RlZCBmcm9tIGpRdWVyeSB2MS4xMSBzb3VyY2VcbiAgICAgICAgICAgIF8uaHRtbEV4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSopJC87XG5cblxuICAgICAgICAgICAgXy5yZWdpc3RlckJyZWFrcG9pbnRzKCk7XG4gICAgICAgICAgICBfLmluaXQodHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBTbGljaztcblxuICAgIH0oKSk7XG5cbiAgICBTbGljay5wcm90b3R5cGUuYWN0aXZhdGVBREEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWFjdGl2ZScpLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ2ZhbHNlJ1xuICAgICAgICB9KS5maW5kKCdhLCBpbnB1dCwgYnV0dG9uLCBzZWxlY3QnKS5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYWRkU2xpZGUgPSBTbGljay5wcm90b3R5cGUuc2xpY2tBZGQgPSBmdW5jdGlvbihtYXJrdXAsIGluZGV4LCBhZGRCZWZvcmUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbmRleCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgYWRkQmVmb3JlID0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwIHx8IChpbmRleCA+PSBfLnNsaWRlQ291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfLnVubG9hZCgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIF8uJHNsaWRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFkZEJlZm9yZSkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5pbnNlcnRCZWZvcmUoXy4kc2xpZGVzLmVxKGluZGV4KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5pbnNlcnRBZnRlcihfLiRzbGlkZXMuZXEoaW5kZXgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGRCZWZvcmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkucHJlcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXMgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suYXBwZW5kKF8uJHNsaWRlcyk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgXy5yZWluaXQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYW5pbWF0ZUhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0YXJnZXRIZWlnaHRcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFuaW1hdGVTbGlkZSA9IGZ1bmN0aW9uKHRhcmdldExlZnQsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdmFyIGFuaW1Qcm9wcyA9IHt9LFxuICAgICAgICAgICAgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUgJiYgXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IC10YXJnZXRMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLnRyYW5zZm9ybXNFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudExlZnQgPSAtKF8uY3VycmVudExlZnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVN0YXJ0OiBfLmN1cnJlbnRMZWZ0XG4gICAgICAgICAgICAgICAgfSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1TdGFydDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IF8ub3B0aW9ucy5zcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBfLm9wdGlvbnMuZWFzaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdyA9IE1hdGguY2VpbChub3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3cgKyAncHgsIDBweCknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoMHB4LCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3cgKyAncHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IE1hdGguY2VpbCh0YXJnZXRMZWZ0KTtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgnICsgdGFyZ2V0TGVmdCArICdweCwgMHB4LCAwcHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoMHB4LCcgKyB0YXJnZXRMZWZ0ICsgJ3B4LCAwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRpc2FibGVUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE5hdlRhcmdldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gXy5vcHRpb25zLmFzTmF2Rm9yO1xuXG4gICAgICAgIGlmICggYXNOYXZGb3IgJiYgYXNOYXZGb3IgIT09IG51bGwgKSB7XG4gICAgICAgICAgICBhc05hdkZvciA9ICQoYXNOYXZGb3IpLm5vdChfLiRzbGlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzTmF2Rm9yO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hc05hdkZvciA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYXNOYXZGb3IgPSBfLmdldE5hdlRhcmdldCgpO1xuXG4gICAgICAgIGlmICggYXNOYXZGb3IgIT09IG51bGwgJiYgdHlwZW9mIGFzTmF2Rm9yID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGFzTmF2Rm9yLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuc2xpY2soJ2dldFNsaWNrJyk7XG4gICAgICAgICAgICAgICAgaWYoIXRhcmdldC51bnNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNsaWRlSGFuZGxlcihpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXBwbHlUcmFuc2l0aW9uID0gZnVuY3Rpb24oc2xpZGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uID0ge307XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9IF8udHJhbnNmb3JtVHlwZSArICcgJyArIF8ub3B0aW9ucy5zcGVlZCArICdtcyAnICsgXy5vcHRpb25zLmNzc0Vhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gJ29wYWNpdHkgJyArIF8ub3B0aW9ucy5zcGVlZCArICdtcyAnICsgXy5vcHRpb25zLmNzc0Vhc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZSkuY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuXG4gICAgICAgIGlmICggXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlUaW1lciA9IHNldEludGVydmFsKCBfLmF1dG9QbGF5SXRlcmF0b3IsIF8ub3B0aW9ucy5hdXRvcGxheVNwZWVkICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXlDbGVhciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5hdXRvUGxheVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF8uYXV0b1BsYXlUaW1lcik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXlJdGVyYXRvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlVG8gPSBfLmN1cnJlbnRTbGlkZSArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICBpZiAoICFfLnBhdXNlZCAmJiAhXy5pbnRlcnJ1cHRlZCAmJiAhXy5mb2N1c3NlZCApIHtcblxuICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfLmRpcmVjdGlvbiA9PT0gMSAmJiAoIF8uY3VycmVudFNsaWRlICsgMSApID09PSAoIF8uc2xpZGVDb3VudCAtIDEgKSkge1xuICAgICAgICAgICAgICAgICAgICBfLmRpcmVjdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIF8uZGlyZWN0aW9uID09PSAwICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVG8gPSBfLmN1cnJlbnRTbGlkZSAtIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIF8uY3VycmVudFNsaWRlIC0gMSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBzbGlkZVRvICk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZEFycm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSApIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93ID0gJChfLm9wdGlvbnMucHJldkFycm93KS5hZGRDbGFzcygnc2xpY2stYXJyb3cnKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdyA9ICQoXy5vcHRpb25zLm5leHRBcnJvdykuYWRkQ2xhc3MoJ3NsaWNrLWFycm93Jyk7XG5cbiAgICAgICAgICAgIGlmKCBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1oaWRkZW4nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2staGlkZGVuJykucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gdGFiaW5kZXgnKTtcblxuICAgICAgICAgICAgICAgIGlmIChfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLnByZXZBcnJvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnByZXBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kQXJyb3dzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5uZXh0QXJyb3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5hcHBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kQXJyb3dzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LmFkZCggXy4kbmV4dEFycm93IClcblxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWRpc2FibGVkJzogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGREb3RzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgaSwgZG90O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stZG90dGVkJyk7XG5cbiAgICAgICAgICAgIGRvdCA9ICQoJzx1bCAvPicpLmFkZENsYXNzKF8ub3B0aW9ucy5kb3RzQ2xhc3MpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IF8uZ2V0RG90Q291bnQoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZG90LmFwcGVuZCgkKCc8bGkgLz4nKS5hcHBlbmQoXy5vcHRpb25zLmN1c3RvbVBhZ2luZy5jYWxsKHRoaXMsIF8sIGkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uJGRvdHMgPSBkb3QuYXBwZW5kVG8oXy5vcHRpb25zLmFwcGVuZERvdHMpO1xuXG4gICAgICAgICAgICBfLiRkb3RzLmZpbmQoJ2xpJykuZmlyc3QoKS5hZGRDbGFzcygnc2xpY2stYWN0aXZlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZE91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXMgPVxuICAgICAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCBfLm9wdGlvbnMuc2xpZGUgKyAnOm5vdCguc2xpY2stY2xvbmVkKScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1zbGlkZScpO1xuXG4gICAgICAgIF8uc2xpZGVDb3VudCA9IF8uJHNsaWRlcy5sZW5ndGg7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgICAgIC5kYXRhKCdvcmlnaW5hbFN0eWxpbmcnLCAkKGVsZW1lbnQpLmF0dHIoJ3N0eWxlJykgfHwgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2sgPSAoXy5zbGlkZUNvdW50ID09PSAwKSA/XG4gICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykuYXBwZW5kVG8oXy4kc2xpZGVyKSA6XG4gICAgICAgICAgICBfLiRzbGlkZXMud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWNrLXRyYWNrXCIvPicpLnBhcmVudCgpO1xuXG4gICAgICAgIF8uJGxpc3QgPSBfLiRzbGlkZVRyYWNrLndyYXAoXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNsaWNrLWxpc3RcIi8+JykucGFyZW50KCk7XG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlIHx8IF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIF8uJHNsaWRlcikubm90KCdbc3JjXScpLmFkZENsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5zZXR1cEluZmluaXRlKCk7XG5cbiAgICAgICAgXy5idWlsZEFycm93cygpO1xuXG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG5cbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG5cblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3Nlcyh0eXBlb2YgXy5jdXJyZW50U2xpZGUgPT09ICdudW1iZXInID8gXy5jdXJyZW50U2xpZGUgOiAwKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRyYWdnYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5hZGRDbGFzcygnZHJhZ2dhYmxlJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRSb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBhLCBiLCBjLCBuZXdTbGlkZXMsIG51bU9mU2xpZGVzLCBvcmlnaW5hbFNsaWRlcyxzbGlkZXNQZXJTZWN0aW9uO1xuXG4gICAgICAgIG5ld1NsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXIuY2hpbGRyZW4oKTtcblxuICAgICAgICBpZihfLm9wdGlvbnMucm93cyA+IDApIHtcblxuICAgICAgICAgICAgc2xpZGVzUGVyU2VjdGlvbiA9IF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cgKiBfLm9wdGlvbnMucm93cztcbiAgICAgICAgICAgIG51bU9mU2xpZGVzID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzLmxlbmd0aCAvIHNsaWRlc1BlclNlY3Rpb25cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZvcihhID0gMDsgYSA8IG51bU9mU2xpZGVzOyBhKyspe1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcihiID0gMDsgYiA8IF8ub3B0aW9ucy5yb3dzOyBiKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBmb3IoYyA9IDA7IGMgPCBfLm9wdGlvbnMuc2xpZGVzUGVyUm93OyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoYSAqIHNsaWRlc1BlclNlY3Rpb24gKyAoKGIgKiBfLm9wdGlvbnMuc2xpZGVzUGVyUm93KSArIGMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3U2xpZGVzLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKG5ld1NsaWRlcyk7XG4gICAgICAgICAgICBfLiRzbGlkZXIuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzooMTAwIC8gXy5vcHRpb25zLnNsaWRlc1BlclJvdykgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoZWNrUmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKGluaXRpYWwsIGZvcmNlVXBkYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYnJlYWtwb2ludCwgdGFyZ2V0QnJlYWtwb2ludCwgcmVzcG9uZFRvV2lkdGgsIHRyaWdnZXJCcmVha3BvaW50ID0gZmFsc2U7XG4gICAgICAgIHZhciBzbGlkZXJXaWR0aCA9IF8uJHNsaWRlci53aWR0aCgpO1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCAkKHdpbmRvdykud2lkdGgoKTtcblxuICAgICAgICBpZiAoXy5yZXNwb25kVG8gPT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ucmVzcG9uZFRvID09PSAnc2xpZGVyJykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSBzbGlkZXJXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLnJlc3BvbmRUbyA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gTWF0aC5taW4od2luZG93V2lkdGgsIHNsaWRlcldpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLnJlc3BvbnNpdmUgJiZcbiAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aCAmJlxuICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAoYnJlYWtwb2ludCBpbiBfLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludHMuaGFzT3duUHJvcGVydHkoYnJlYWtwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3JpZ2luYWxTZXR0aW5ncy5tb2JpbGVGaXJzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA8IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA+IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhcmdldEJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRCcmVha3BvaW50ICE9PSBfLmFjdGl2ZUJyZWFrcG9pbnQgfHwgZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy51bnNsaWNrKHRhcmdldEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnVuc2xpY2sodGFyZ2V0QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9IF8ub3JpZ2luYWxTZXR0aW5ncztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfLnJlZnJlc2goaW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgdHJpZ2dlciBicmVha3BvaW50cyBkdXJpbmcgYW4gYWN0dWFsIGJyZWFrLiBub3Qgb24gaW5pdGlhbGl6ZS5cbiAgICAgICAgICAgIGlmKCAhaW5pdGlhbCAmJiB0cmlnZ2VyQnJlYWtwb2ludCAhPT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2JyZWFrcG9pbnQnLCBbXywgdHJpZ2dlckJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGV2ZW50LCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQsIHNsaWRlT2Zmc2V0LCB1bmV2ZW5PZmZzZXQ7XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIGEgbGluaywgcHJldmVudCBkZWZhdWx0IGFjdGlvbi5cbiAgICAgICAgaWYoJHRhcmdldC5pcygnYScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIG5vdCB0aGUgPGxpPiBlbGVtZW50IChpZTogYSBjaGlsZCksIGZpbmQgdGhlIDxsaT4uXG4gICAgICAgIGlmKCEkdGFyZ2V0LmlzKCdsaScpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5jbG9zZXN0KCdsaScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdW5ldmVuT2Zmc2V0ID0gKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCk7XG4gICAgICAgIGluZGV4T2Zmc2V0ID0gdW5ldmVuT2Zmc2V0ID8gMCA6IChfLnNsaWRlQ291bnQgLSBfLmN1cnJlbnRTbGlkZSkgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhLm1lc3NhZ2UpIHtcblxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoXy5jdXJyZW50U2xpZGUgLSBzbGlkZU9mZnNldCwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBpbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmN1cnJlbnRTbGlkZSArIHNsaWRlT2Zmc2V0LCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnaW5kZXgnOlxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRhdGEuaW5kZXggPT09IDAgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleCB8fCAkdGFyZ2V0LmluZGV4KCkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmNoZWNrTmF2aWdhYmxlKGluZGV4KSwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmNoaWxkcmVuKCkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hlY2tOYXZpZ2FibGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIG5hdmlnYWJsZXMsIHByZXZOYXZpZ2FibGU7XG5cbiAgICAgICAgbmF2aWdhYmxlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpO1xuICAgICAgICBwcmV2TmF2aWdhYmxlID0gMDtcbiAgICAgICAgaWYgKGluZGV4ID4gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBpbmRleCA9IG5hdmlnYWJsZXNbbmF2aWdhYmxlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gaW4gbmF2aWdhYmxlcykge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IG5hdmlnYWJsZXNbbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBwcmV2TmF2aWdhYmxlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldk5hdmlnYWJsZSA9IG5hdmlnYWJsZXNbbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyAmJiBfLiRkb3RzICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICQoJ2xpJywgXy4kZG90cylcbiAgICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpXG4gICAgICAgICAgICAgICAgLm9mZignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vZmYoJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRkb3RzLm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJyk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdyAmJiBfLiRuZXh0QXJyb3cub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9mZignY2xpY2suc2xpY2snLCBfLmNsaWNrSGFuZGxlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub2ZmKF8udmlzaWJpbGl0eUNoYW5nZSwgXy52aXNpYmlsaXR5KTtcblxuICAgICAgICBfLmNsZWFuVXBTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub2ZmKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5vcmllbnRhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnJlc2l6ZSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vZmYoJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vZmYoJ2xvYWQuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8uc2V0UG9zaXRpb24pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwU2xpZGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kbGlzdC5vZmYoJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSk7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xlYW5VcFJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIG9yaWdpbmFsU2xpZGVzO1xuXG4gICAgICAgIGlmKF8ub3B0aW9ucy5yb3dzID4gMCkge1xuICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXMuY2hpbGRyZW4oKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIF8uJHNsaWRlci5lbXB0eSgpLmFwcGVuZChvcmlnaW5hbFNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uc2hvdWxkQ2xpY2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24ocmVmcmVzaCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG5cbiAgICAgICAgXy5jbGVhblVwRXZlbnRzKCk7XG5cbiAgICAgICAgJCgnLnNsaWNrLWNsb25lZCcsIF8uJHNsaWRlcikuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMpIHtcbiAgICAgICAgICAgIF8uJGRvdHMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8uJHByZXZBcnJvdyAmJiBfLiRwcmV2QXJyb3cubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkIHNsaWNrLWFycm93IHNsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXgnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCcnKTtcblxuICAgICAgICAgICAgaWYgKCBfLmh0bWxFeHByLnRlc3QoIF8ub3B0aW9ucy5wcmV2QXJyb3cgKSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8uJG5leHRBcnJvd1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gYXJpYS1kaXNhYmxlZCB0YWJpbmRleCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsJycpO1xuXG4gICAgICAgICAgICBpZiAoIF8uaHRtbEV4cHIudGVzdCggXy5vcHRpb25zLm5leHRBcnJvdyApKSB7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoXy4kc2xpZGVzKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stc2xpZGUgc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29yaWdpbmFsU3R5bGluZycpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRsaXN0LmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIuYXBwZW5kKF8uJHNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfLmNsZWFuVXBSb3dzKCk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZXInKTtcbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1pbml0aWFsaXplZCcpO1xuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRvdHRlZCcpO1xuXG4gICAgICAgIF8udW5zbGlja2VkID0gdHJ1ZTtcblxuICAgICAgICBpZighcmVmcmVzaCkge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3knLCBbX10pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmRpc2FibGVUcmFuc2l0aW9uID0gZnVuY3Rpb24oc2xpZGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uID0ge307XG5cbiAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9ICcnO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlKS5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmFkZVNsaWRlID0gZnVuY3Rpb24oc2xpZGVJbmRleCwgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLmFwcGx5VHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIF8uZGlzYWJsZVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mYWRlU2xpZGVPdXQgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyXG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmlsdGVyU2xpZGVzID0gU2xpY2sucHJvdG90eXBlLnNsaWNrRmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUuZmlsdGVyKGZpbHRlcikuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG5cbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJylcbiAgICAgICAgICAgIC5vbignZm9jdXMuc2xpY2sgYmx1ci5zbGljaycsICcqJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgJHNmID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucGF1c2VPbkZvY3VzICkge1xuICAgICAgICAgICAgICAgICAgICBfLmZvY3Vzc2VkID0gJHNmLmlzKCc6Zm9jdXMnKTtcbiAgICAgICAgICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRDdXJyZW50ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrQ3VycmVudFNsaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gXy5jdXJyZW50U2xpZGU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldERvdENvdW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHZhciBicmVha1BvaW50ID0gMDtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICB2YXIgcGFnZXJRdHkgPSAwO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwYWdlclF0eSA9IF8uc2xpZGVDb3VudDtcbiAgICAgICAgfSBlbHNlIGlmKCFfLm9wdGlvbnMuYXNOYXZGb3IpIHtcbiAgICAgICAgICAgIHBhZ2VyUXR5ID0gMSArIE1hdGguY2VpbCgoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgLyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZXJRdHkgLSAxO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRMZWZ0ID0gZnVuY3Rpb24oc2xpZGVJbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldExlZnQsXG4gICAgICAgICAgICB2ZXJ0aWNhbEhlaWdodCxcbiAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIHRhcmdldFNsaWRlLFxuICAgICAgICAgICAgY29lZjtcblxuICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgdmVydGljYWxIZWlnaHQgPSBfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoXy5zbGlkZVdpZHRoICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgKiAtMTtcbiAgICAgICAgICAgICAgICBjb2VmID0gLTFcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZWYgPSAtMS41O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZWYgPSAtMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKHZlcnRpY2FsSGVpZ2h0ICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgKiBjb2VmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsID4gXy5zbGlkZUNvdW50ICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPiBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogdmVydGljYWxIZWlnaHQpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkgKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA+IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiBfLnNsaWRlV2lkdGg7XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiB2ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIC8gMikgLSAoKF8uc2xpZGVXaWR0aCAqIF8uc2xpZGVDb3VudCkgLyAyKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgKz0gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMikgLSBfLnNsaWRlV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCArPSBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKChzbGlkZUluZGV4ICogXy5zbGlkZVdpZHRoKSAqIC0xKSArIF8uc2xpZGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKChzbGlkZUluZGV4ICogdmVydGljYWxIZWlnaHQpICogLTEpICsgdmVydGljYWxPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IHRydWUpIHtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IHx8IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U2xpZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IChfLiRzbGlkZVRyYWNrLndpZHRoKCkgLSB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0IC0gdGFyZ2V0U2xpZGUud2lkdGgoKSkgKiAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gdGFyZ2V0U2xpZGVbMF0gPyB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0ICogLTEgOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U2xpZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy4kc2xpZGVUcmFjay53aWR0aCgpIC0gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAtIHRhcmdldFNsaWRlLndpZHRoKCkpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gdGFyZ2V0U2xpZGVbMF0gPyB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0ICogLTEgOiAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgKz0gKF8uJGxpc3Qud2lkdGgoKSAtIHRhcmdldFNsaWRlLm91dGVyV2lkdGgoKSkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldExlZnQ7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE9wdGlvbiA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0dldE9wdGlvbiA9IGZ1bmN0aW9uKG9wdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICByZXR1cm4gXy5vcHRpb25zW29wdGlvbl07XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE5hdmlnYWJsZUluZGV4ZXMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBicmVha1BvaW50ID0gMCxcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdLFxuICAgICAgICAgICAgbWF4O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBtYXggPSBfLnNsaWRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVha1BvaW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICogLTE7XG4gICAgICAgICAgICBjb3VudGVyID0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICogLTE7XG4gICAgICAgICAgICBtYXggPSBfLnNsaWRlQ291bnQgKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGJyZWFrUG9pbnQgPCBtYXgpIHtcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChicmVha1BvaW50KTtcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBjb3VudGVyICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhlcztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0U2xpY2sgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0U2xpZGVDb3VudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlc1RyYXZlcnNlZCwgc3dpcGVkU2xpZGUsIGNlbnRlck9mZnNldDtcblxuICAgICAgICBjZW50ZXJPZmZzZXQgPSBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSA/IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpIDogMDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stc2xpZGUnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBzbGlkZSkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZS5vZmZzZXRMZWZ0IC0gY2VudGVyT2Zmc2V0ICsgKCQoc2xpZGUpLm91dGVyV2lkdGgoKSAvIDIpID4gKF8uc3dpcGVMZWZ0ICogLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXBlZFNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2xpZGVzVHJhdmVyc2VkID0gTWF0aC5hYnMoJChzd2lwZWRTbGlkZSkuYXR0cignZGF0YS1zbGljay1pbmRleCcpIC0gXy5jdXJyZW50U2xpZGUpIHx8IDE7XG5cbiAgICAgICAgICAgIHJldHVybiBzbGlkZXNUcmF2ZXJzZWQ7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ29UbyA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0dvVG8gPSBmdW5jdGlvbihzbGlkZSwgZG9udEFuaW1hdGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4JyxcbiAgICAgICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoc2xpZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRvbnRBbmltYXRlKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGNyZWF0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICghJChfLiRzbGlkZXIpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG5cbiAgICAgICAgICAgICQoXy4kc2xpZGVyKS5hZGRDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKTtcblxuICAgICAgICAgICAgXy5idWlsZFJvd3MoKTtcbiAgICAgICAgICAgIF8uYnVpbGRPdXQoKTtcbiAgICAgICAgICAgIF8uc2V0UHJvcHMoKTtcbiAgICAgICAgICAgIF8uc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICBfLmxvYWRTbGlkZXIoKTtcbiAgICAgICAgICAgIF8uaW5pdGlhbGl6ZUV2ZW50cygpO1xuICAgICAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcbiAgICAgICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUodHJ1ZSk7XG4gICAgICAgICAgICBfLmZvY3VzSGFuZGxlcigpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3JlYXRpb24pIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdpbml0JywgW19dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5pbml0QURBKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcblxuICAgICAgICAgICAgXy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRBREEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgICAgIG51bURvdEdyb3VwcyA9IE1hdGguY2VpbChfLnNsaWRlQ291bnQgLyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSxcbiAgICAgICAgICAgICAgICB0YWJDb250cm9sSW5kZXhlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpLmZpbHRlcihmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2YWwgPj0gMCkgJiYgKHZhbCA8IF8uc2xpZGVDb3VudCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmFkZChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgIH0pLmZpbmQoJ2EsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgXy4kc2xpZGVzLm5vdChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlQ29udHJvbEluZGV4ID0gdGFiQ29udHJvbEluZGV4ZXMuaW5kZXhPZihpKTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBpLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlQ29udHJvbEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgIHZhciBhcmlhQnV0dG9uQ29udHJvbCA9ICdzbGljay1zbGlkZS1jb250cm9sJyArIF8uaW5zdGFuY2VVaWQgKyBzbGlkZUNvbnRyb2xJbmRleFxuICAgICAgICAgICAgICAgICAgIGlmICgkKCcjJyArIGFyaWFCdXR0b25Db250cm9sKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiBhcmlhQnV0dG9uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRkb3RzLmF0dHIoJ3JvbGUnLCAndGFibGlzdCcpLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hcHBlZFNsaWRlSW5kZXggPSB0YWJDb250cm9sSW5kZXhlc1tpXTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnYnV0dG9uJykuZmlyc3QoKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ3NsaWNrLXNsaWRlLWNvbnRyb2wnICsgXy5pbnN0YW5jZVVpZCArIGksXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBtYXBwZWRTbGlkZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IChpICsgMSkgKyAnIG9mICcgKyBudW1Eb3RHcm91cHMsXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KS5lcShfLmN1cnJlbnRTbGlkZSkuZmluZCgnYnV0dG9uJykuYXR0cih7XG4gICAgICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICAgICAgICB9KS5lbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGk9Xy5jdXJyZW50U2xpZGUsIG1heD1pK18ub3B0aW9ucy5zbGlkZXNUb1Nob3c7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPbkNoYW5nZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKGkpLmF0dHIoeyd0YWJpbmRleCc6ICcwJ30pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoaSkucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLmFjdGl2YXRlQURBKCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRBcnJvd0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdwcmV2aW91cydcbiAgICAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93XG4gICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycpXG4gICAgICAgICAgICAgICAub24oJ2NsaWNrLnNsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdERvdEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKS5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4J1xuICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGRvdHMub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8ub3B0aW9ucy5wYXVzZU9uRG90c0hvdmVyID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0U2xpZGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMucGF1c2VPbkhvdmVyICkge1xuXG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpO1xuICAgICAgICAgICAgXy4kbGlzdC5vbignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0aWFsaXplRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG5cbiAgICAgICAgXy5pbml0RG90RXZlbnRzKCk7XG4gICAgICAgIF8uaW5pdFNsaWRlRXZlbnRzKCk7XG5cbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hzdGFydC5zbGljayBtb3VzZWRvd24uc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdzdGFydCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaG1vdmUuc2xpY2sgbW91c2Vtb3ZlLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnbW92ZSdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnZW5kJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoY2FuY2VsLnNsaWNrIG1vdXNlbGVhdmUuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdlbmQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9uKCdjbGljay5zbGljaycsIF8uY2xpY2tIYW5kbGVyKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihfLnZpc2liaWxpdHlDaGFuZ2UsICQucHJveHkoXy52aXNpYmlsaXR5LCBfKSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPblNlbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJChfLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9uKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub24oJ29yaWVudGF0aW9uY2hhbmdlLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCAkLnByb3h5KF8ub3JpZW50YXRpb25DaGFuZ2UsIF8pKTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgJC5wcm94eShfLnJlc2l6ZSwgXykpO1xuXG4gICAgICAgICQoJ1tkcmFnZ2FibGUhPXRydWVdJywgXy4kc2xpZGVUcmFjaykub24oJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vbignbG9hZC5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5zZXRQb3NpdGlvbik7XG4gICAgICAgICQoXy5zZXRQb3NpdGlvbik7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRVSSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5zaG93KCk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cuc2hvdygpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRkb3RzLnNob3coKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmtleUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgIC8vRG9udCBzbGlkZSBpZiB0aGUgY3Vyc29yIGlzIGluc2lkZSB0aGUgZm9ybSBmaWVsZHMgYW5kIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgaWYoIWV2ZW50LnRhcmdldC50YWdOYW1lLm1hdGNoKCdURVhUQVJFQXxJTlBVVHxTRUxFQ1QnKSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICYmIF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8ub3B0aW9ucy5ydGwgPT09IHRydWUgPyAnbmV4dCcgOiAgJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8ub3B0aW9ucy5ydGwgPT09IHRydWUgPyAncHJldmlvdXMnIDogJ25leHQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5sYXp5TG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGxvYWRSYW5nZSwgY2xvbmVSYW5nZSwgcmFuZ2VTdGFydCwgcmFuZ2VFbmQ7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9hZEltYWdlcyhpbWFnZXNTY29wZSkge1xuXG4gICAgICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIGltYWdlc1Njb3BlKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbGF6eScpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyY1NldCA9ICQodGhpcykuYXR0cignZGF0YS1zcmNzZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTaXplcyAgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc2l6ZXMnKSB8fCBfLiRzbGlkZXIuYXR0cignZGF0YS1zaXplcycpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsgb3BhY2l0eTogMCB9LCAxMDAsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU3JjU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Jjc2V0JywgaW1hZ2VTcmNTZXQgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2l6ZXMnLCBpbWFnZVNpemVzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgaW1hZ2VTb3VyY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1sYXp5IGRhdGEtc3Jjc2V0IGRhdGEtc2l6ZXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRlZCcsIFtfLCBpbWFnZSwgaW1hZ2VTb3VyY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoICdkYXRhLWxhenknIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ3NsaWNrLWxvYWRpbmcnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ3NsaWNrLWxhenlsb2FkLWVycm9yJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZEVycm9yJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0ID0gXy5jdXJyZW50U2xpZGUgKyAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKTtcbiAgICAgICAgICAgICAgICByYW5nZUVuZCA9IHJhbmdlU3RhcnQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydCA9IE1hdGgubWF4KDAsIF8uY3VycmVudFNsaWRlIC0gKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSkpO1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gMiArIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpICsgXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gXy5vcHRpb25zLmluZmluaXRlID8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIF8uY3VycmVudFNsaWRlIDogXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICByYW5nZUVuZCA9IE1hdGguY2VpbChyYW5nZVN0YXJ0ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VTdGFydCA+IDApIHJhbmdlU3RhcnQtLTtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VFbmQgPD0gXy5zbGlkZUNvdW50KSByYW5nZUVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpLnNsaWNlKHJhbmdlU3RhcnQsIHJhbmdlRW5kKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAnYW50aWNpcGF0ZWQnKSB7XG4gICAgICAgICAgICB2YXIgcHJldlNsaWRlID0gcmFuZ2VTdGFydCAtIDEsXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gcmFuZ2VFbmQsXG4gICAgICAgICAgICAgICAgJHNsaWRlcyA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2U2xpZGUgPCAwKSBwcmV2U2xpZGUgPSBfLnNsaWRlQ291bnQgLSAxO1xuICAgICAgICAgICAgICAgIGxvYWRSYW5nZSA9IGxvYWRSYW5nZS5hZGQoJHNsaWRlcy5lcShwcmV2U2xpZGUpKTtcbiAgICAgICAgICAgICAgICBsb2FkUmFuZ2UgPSBsb2FkUmFuZ2UuYWRkKCRzbGlkZXMuZXEobmV4dFNsaWRlKSk7XG4gICAgICAgICAgICAgICAgcHJldlNsaWRlLS07XG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkSW1hZ2VzKGxvYWRSYW5nZSk7XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1jbG9uZWQnKS5zbGljZSgwLCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLWNsb25lZCcpLnNsaWNlKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKiAtMSk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxvYWRTbGlkZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5pbml0VUkoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAncHJvZ3Jlc3NpdmUnKSB7XG4gICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5uZXh0ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrTmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLm9yaWVudGF0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKCk7XG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucGF1c2UgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcbiAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wbGF5ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUGxheSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgIF8ub3B0aW9ucy5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgIF8ucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIF8uZm9jdXNzZWQgPSBmYWxzZTtcbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wb3N0U2xpZGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiggIV8udW5zbGlja2VkICkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWZ0ZXJDaGFuZ2UnLCBbXywgaW5kZXhdKTtcblxuICAgICAgICAgICAgXy5hbmltYXRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG4gICAgICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmluaXRBREEoKTtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9ICQoXy4kc2xpZGVzLmdldChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmF0dHIoJ3RhYmluZGV4JywgMCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUHJldiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAncHJldmlvdXMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucHJvZ3Jlc3NpdmVMYXp5TG9hZCA9IGZ1bmN0aW9uKCB0cnlDb3VudCApIHtcblxuICAgICAgICB0cnlDb3VudCA9IHRyeUNvdW50IHx8IDE7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgJGltZ3NUb0xvYWQgPSAkKCAnaW1nW2RhdGEtbGF6eV0nLCBfLiRzbGlkZXIgKSxcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgaW1hZ2VTb3VyY2UsXG4gICAgICAgICAgICBpbWFnZVNyY1NldCxcbiAgICAgICAgICAgIGltYWdlU2l6ZXMsXG4gICAgICAgICAgICBpbWFnZVRvTG9hZDtcblxuICAgICAgICBpZiAoICRpbWdzVG9Mb2FkLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgaW1hZ2UgPSAkaW1nc1RvTG9hZC5maXJzdCgpO1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSBpbWFnZS5hdHRyKCdkYXRhLWxhenknKTtcbiAgICAgICAgICAgIGltYWdlU3JjU2V0ID0gaW1hZ2UuYXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICAgIGltYWdlU2l6ZXMgID0gaW1hZ2UuYXR0cignZGF0YS1zaXplcycpIHx8IF8uJHNsaWRlci5hdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgICBpbWFnZVRvTG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbWFnZVNyY1NldCkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyY3NldCcsIGltYWdlU3JjU2V0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NpemVzJywgaW1hZ2VTaXplcyApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoICdzcmMnLCBpbWFnZVNvdXJjZSApXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWxhenkgZGF0YS1zcmNzZXQgZGF0YS1zaXplcycpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRlZCcsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRyeUNvdW50IDwgMyApIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogdHJ5IHRvIGxvYWQgdGhlIGltYWdlIDMgdGltZXMsXG4gICAgICAgICAgICAgICAgICAgICAqIGxlYXZlIGEgc2xpZ2h0IGRlbGF5IHNvIHdlIGRvbid0IGdldFxuICAgICAgICAgICAgICAgICAgICAgKiBzZXJ2ZXJzIGJsb2NraW5nIHRoZSByZXF1ZXN0LlxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoIHRyeUNvdW50ICsgMSApO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCAnZGF0YS1sYXp5JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdzbGljay1sb2FkaW5nJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdzbGljay1sYXp5bG9hZC1lcnJvcicgKTtcblxuICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRFcnJvcicsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWxsSW1hZ2VzTG9hZGVkJywgWyBfIF0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKCBpbml0aWFsaXppbmcgKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBjdXJyZW50U2xpZGUsIGxhc3RWaXNpYmxlSW5kZXg7XG5cbiAgICAgICAgbGFzdFZpc2libGVJbmRleCA9IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG5cbiAgICAgICAgLy8gaW4gbm9uLWluZmluaXRlIHNsaWRlcnMsIHdlIGRvbid0IHdhbnQgdG8gZ28gcGFzdCB0aGVcbiAgICAgICAgLy8gbGFzdCB2aXNpYmxlIGluZGV4LlxuICAgICAgICBpZiggIV8ub3B0aW9ucy5pbmZpbml0ZSAmJiAoIF8uY3VycmVudFNsaWRlID4gbGFzdFZpc2libGVJbmRleCApKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGxhc3RWaXNpYmxlSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsZXNzIHNsaWRlcyB0aGFuIHRvIHNob3csIGdvIHRvIHN0YXJ0LlxuICAgICAgICBpZiAoIF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSAwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50U2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcblxuICAgICAgICBfLmRlc3Ryb3kodHJ1ZSk7XG5cbiAgICAgICAgJC5leHRlbmQoXywgXy5pbml0aWFscywgeyBjdXJyZW50U2xpZGU6IGN1cnJlbnRTbGlkZSB9KTtcblxuICAgICAgICBfLmluaXQoKTtcblxuICAgICAgICBpZiggIWluaXRpYWxpemluZyApIHtcblxuICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogY3VycmVudFNsaWRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVnaXN0ZXJCcmVha3BvaW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgYnJlYWtwb2ludCwgY3VycmVudEJyZWFrcG9pbnQsIGwsXG4gICAgICAgICAgICByZXNwb25zaXZlU2V0dGluZ3MgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZSB8fCBudWxsO1xuXG4gICAgICAgIGlmICggJC50eXBlKHJlc3BvbnNpdmVTZXR0aW5ncykgPT09ICdhcnJheScgJiYgcmVzcG9uc2l2ZVNldHRpbmdzLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgXy5yZXNwb25kVG8gPSBfLm9wdGlvbnMucmVzcG9uZFRvIHx8ICd3aW5kb3cnO1xuXG4gICAgICAgICAgICBmb3IgKCBicmVha3BvaW50IGluIHJlc3BvbnNpdmVTZXR0aW5ncyApIHtcblxuICAgICAgICAgICAgICAgIGwgPSBfLmJyZWFrcG9pbnRzLmxlbmd0aC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNpdmVTZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShicmVha3BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IHJlc3BvbnNpdmVTZXR0aW5nc1ticmVha3BvaW50XS5icmVha3BvaW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYnJlYWtwb2ludHMgYW5kIGN1dCBvdXQgYW55IGV4aXN0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uZXMgd2l0aCB0aGUgc2FtZSBicmVha3BvaW50IG51bWJlciwgd2UgZG9uJ3Qgd2FudCBkdXBlcy5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoIGwgPj0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLmJyZWFrcG9pbnRzW2xdICYmIF8uYnJlYWtwb2ludHNbbF0gPT09IGN1cnJlbnRCcmVha3BvaW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludHMuc3BsaWNlKGwsMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsLS07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnB1c2goY3VycmVudEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tjdXJyZW50QnJlYWtwb2ludF0gPSByZXNwb25zaXZlU2V0dGluZ3NbYnJlYWtwb2ludF0uc2V0dGluZ3M7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5icmVha3BvaW50cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBfLm9wdGlvbnMubW9iaWxlRmlyc3QgKSA/IGEtYiA6IGItYTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVpbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlcyA9XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKF8ub3B0aW9ucy5zbGlkZSlcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgXy5zbGlkZUNvdW50ID0gXy4kc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50ICYmIF8uY3VycmVudFNsaWRlICE9PSAwKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8uY3VycmVudFNsaWRlIC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBfLnJlZ2lzdGVyQnJlYWtwb2ludHMoKTtcblxuICAgICAgICBfLnNldFByb3BzKCk7XG4gICAgICAgIF8uc2V0dXBJbmZpbml0ZSgpO1xuICAgICAgICBfLmJ1aWxkQXJyb3dzKCk7XG4gICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5jbGVhblVwU2xpZGVFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZShmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKHR5cGVvZiBfLmN1cnJlbnRTbGlkZSA9PT0gJ251bWJlcicgPyBfLmN1cnJlbnRTbGlkZSA6IDApO1xuXG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgXy5mb2N1c0hhbmRsZXIoKTtcblxuICAgICAgICBfLnBhdXNlZCA9ICFfLm9wdGlvbnMuYXV0b3BsYXk7XG4gICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcigncmVJbml0JywgW19dKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSAhPT0gXy53aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF8ud2luZG93RGVsYXkpO1xuICAgICAgICAgICAgXy53aW5kb3dEZWxheSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ud2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSgpO1xuICAgICAgICAgICAgICAgIGlmKCAhXy51bnNsaWNrZWQgKSB7IF8uc2V0UG9zaXRpb24oKTsgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZW1vdmVTbGlkZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1JlbW92ZSA9IGZ1bmN0aW9uKGluZGV4LCByZW1vdmVCZWZvcmUsIHJlbW92ZUFsbCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZW1vdmVCZWZvcmUgPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gcmVtb3ZlQmVmb3JlID09PSB0cnVlID8gMCA6IF8uc2xpZGVDb3VudCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHJlbW92ZUJlZm9yZSA9PT0gdHJ1ZSA/IC0taW5kZXggOiBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPCAxIHx8IGluZGV4IDwgMCB8fCBpbmRleCA+IF8uc2xpZGVDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUFsbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmVxKGluZGV4KS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlcyA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5hcHBlbmQoXy4kc2xpZGVzKTtcblxuICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRDU1MgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIHgsIHk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gLXBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHggPSBfLnBvc2l0aW9uUHJvcCA9PSAnbGVmdCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuICAgICAgICB5ID0gXy5wb3NpdGlvblByb3AgPT0gJ3RvcCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuXG4gICAgICAgIHBvc2l0aW9uUHJvcHNbXy5wb3NpdGlvblByb3BdID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF8udHJhbnNmb3Jtc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fTtcbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgKyB4ICsgJywgJyArIHkgKyAnKSc7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAnLCAnICsgeSArICcsIDBweCknO1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldERpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKCcwcHggJyArIF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kbGlzdC5oZWlnaHQoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nICsgJyAwcHgnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy5saXN0V2lkdGggPSBfLiRsaXN0LndpZHRoKCk7XG4gICAgICAgIF8ubGlzdEhlaWdodCA9IF8uJGxpc3QuaGVpZ2h0KCk7XG5cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiBfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2xpZGVXaWR0aCA9IE1hdGguY2VpbChfLmxpc3RXaWR0aCAvIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay53aWR0aChNYXRoLmNlaWwoKF8uc2xpZGVXaWR0aCAqIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmxlbmd0aCkpKTtcblxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLndpZHRoKDUwMDAgKiBfLnNsaWRlQ291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zbGlkZVdpZHRoID0gTWF0aC5jZWlsKF8ubGlzdFdpZHRoKTtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suaGVpZ2h0KE1hdGguY2VpbCgoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5sZW5ndGgpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2Zmc2V0ID0gXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJXaWR0aCh0cnVlKSAtIF8uJHNsaWRlcy5maXJzdCgpLndpZHRoKCk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLndpZHRoKF8uc2xpZGVXaWR0aCAtIG9mZnNldCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldEZhZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRMZWZ0O1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uc2xpZGVXaWR0aCAqIGluZGV4KSAqIC0xO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLmNzcyh7XG4gICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAxLFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuY3NzKCdoZWlnaHQnLCB0YXJnZXRIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldE9wdGlvbiA9XG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWNrU2V0T3B0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjY2VwdHMgYXJndW1lbnRzIGluIGZvcm1hdCBvZjpcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIGNoYW5naW5nIGEgc2luZ2xlIG9wdGlvbidzIHZhbHVlOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggKVxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgY2hhbmdpbmcgYSBzZXQgb2YgcmVzcG9uc2l2ZSBvcHRpb25zOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsICdyZXNwb25zaXZlJywgW3t9LCAuLi5dLCByZWZyZXNoIClcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIHVwZGF0aW5nIG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlIChub3QgcmVzcG9uc2l2ZSlcbiAgICAgICAgICogICAgIC5zbGljayhcInNldE9wdGlvblwiLCB7ICdvcHRpb24nOiB2YWx1ZSwgLi4uIH0sIHJlZnJlc2ggKVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGwsIGl0ZW0sIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggPSBmYWxzZSwgdHlwZTtcblxuICAgICAgICBpZiggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ29iamVjdCcgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICByZWZyZXNoID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgdHlwZSA9ICdtdWx0aXBsZSc7XG5cbiAgICAgICAgfSBlbHNlIGlmICggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ3N0cmluZycgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YWx1ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHJlZnJlc2ggPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgIGlmICggYXJndW1lbnRzWzBdID09PSAncmVzcG9uc2l2ZScgJiYgJC50eXBlKCBhcmd1bWVudHNbMV0gKSA9PT0gJ2FycmF5JyApIHtcblxuICAgICAgICAgICAgICAgIHR5cGUgPSAncmVzcG9uc2l2ZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBhcmd1bWVudHNbMV0gIT09ICd1bmRlZmluZWQnICkge1xuXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdzaW5nbGUnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3NpbmdsZScgKSB7XG5cbiAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRpb25dID0gdmFsdWU7XG5cblxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnbXVsdGlwbGUnICkge1xuXG4gICAgICAgICAgICAkLmVhY2goIG9wdGlvbiAsIGZ1bmN0aW9uKCBvcHQsIHZhbCApIHtcblxuICAgICAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRdID0gdmFsO1xuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdyZXNwb25zaXZlJyApIHtcblxuICAgICAgICAgICAgZm9yICggaXRlbSBpbiB2YWx1ZSApIHtcblxuICAgICAgICAgICAgICAgIGlmKCAkLnR5cGUoIF8ub3B0aW9ucy5yZXNwb25zaXZlICkgIT09ICdhcnJheScgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgPSBbIHZhbHVlW2l0ZW1dIF07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGwgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHJlc3BvbnNpdmUgb2JqZWN0IGFuZCBzcGxpY2Ugb3V0IGR1cGxpY2F0ZXMuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKCBsID49IDAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucmVzcG9uc2l2ZVtsXS5icmVha3BvaW50ID09PSB2YWx1ZVtpdGVtXS5icmVha3BvaW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUuc3BsaWNlKGwsMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbC0tO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5wdXNoKCB2YWx1ZVtpdGVtXSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcmVmcmVzaCApIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLnNldERpbWVuc2lvbnMoKTtcblxuICAgICAgICBfLnNldEhlaWdodCgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2V0Q1NTKF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zZXRGYWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc2V0UG9zaXRpb24nLCBbX10pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQcm9wcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG5cbiAgICAgICAgXy5wb3NpdGlvblByb3AgPSBfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgPyAndG9wJyA6ICdsZWZ0JztcblxuICAgICAgICBpZiAoXy5wb3NpdGlvblByb3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLk1velRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLm1zVHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnVzZUNTUyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uY3NzVHJhbnNpdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuZmFkZSApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIF8ub3B0aW9ucy56SW5kZXggPT09ICdudW1iZXInICkge1xuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMuekluZGV4IDwgMyApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnpJbmRleCA9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLm9wdGlvbnMuekluZGV4ID0gXy5kZWZhdWx0cy56SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLk9UcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdPVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctby10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdPVHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnTW96VHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbW96LXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ01velRyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLk1velBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ3dlYmtpdFRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLXdlYmtpdC10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd3ZWJraXRUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5tc1RyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ21zVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbXMtdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnbXNUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUubXNUcmFuc2Zvcm0gPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQgJiYgXy5hbmltVHlwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAndHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd0cmFuc2l0aW9uJztcbiAgICAgICAgfVxuICAgICAgICBfLnRyYW5zZm9ybXNFbmFibGVkID0gXy5vcHRpb25zLnVzZVRyYW5zZm9ybSAmJiAoXy5hbmltVHlwZSAhPT0gbnVsbCAmJiBfLmFuaW1UeXBlICE9PSBmYWxzZSk7XG4gICAgfTtcblxuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFNsaWRlQ2xhc3NlcyA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0LCBhbGxTbGlkZXMsIGluZGV4T2Zmc2V0LCByZW1haW5kZXI7XG5cbiAgICAgICAgYWxsU2xpZGVzID0gXy4kc2xpZGVyXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWN1cnJlbnQnKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgdmFyIGV2ZW5Db2VmID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAlIDIgPT09IDAgPyAxIDogMDtcblxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBjZW50ZXJPZmZzZXQgJiYgaW5kZXggPD0gKF8uc2xpZGVDb3VudCAtIDEpIC0gY2VudGVyT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4IC0gY2VudGVyT2Zmc2V0ICsgZXZlbkNvZWYsIGluZGV4ICsgY2VudGVyT2Zmc2V0ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSBjZW50ZXJPZmZzZXQgKyAxICsgZXZlbkNvZWYsIGluZGV4T2Zmc2V0ICsgY2VudGVyT2Zmc2V0ICsgMilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoYWxsU2xpZGVzLmxlbmd0aCAtIDEgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IF8uc2xpZGVDb3VudCAtIDEpIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSAoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcblxuICAgICAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXgsIGluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxTbGlkZXMubGVuZ3RoIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyID0gXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSA/IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleCA6IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICYmIChfLnNsaWRlQ291bnQgLSBpbmRleCkgPCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIHJlbWFpbmRlciksIGluZGV4T2Zmc2V0ICsgcmVtYWluZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4T2Zmc2V0LCBpbmRleE9mZnNldCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAnb25kZW1hbmQnIHx8IF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ2FudGljaXBhdGVkJykge1xuICAgICAgICAgICAgXy5sYXp5TG9hZCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXR1cEluZmluaXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgaSwgc2xpZGVJbmRleCwgaW5maW5pdGVDb3VudDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5jZW50ZXJNb2RlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlICYmIF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBzbGlkZUluZGV4ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGVDb3VudCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gXy5zbGlkZUNvdW50OyBpID4gKF8uc2xpZGVDb3VudCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50KTsgaSAtPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgJChfLiRzbGlkZXNbc2xpZGVJbmRleF0pLmNsb25lKHRydWUpLmF0dHIoJ2lkJywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIHNsaWRlSW5kZXggLSBfLnNsaWRlQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJlcGVuZFRvKF8uJHNsaWRlVHJhY2spLmFkZENsYXNzKCdzbGljay1jbG9uZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluZmluaXRlQ291bnQgICsgXy5zbGlkZUNvdW50OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICQoXy4kc2xpZGVzW3NsaWRlSW5kZXhdKS5jbG9uZSh0cnVlKS5hdHRyKCdpZCcsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBzbGlkZUluZGV4ICsgXy5zbGlkZUNvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spLmFkZENsYXNzKCdzbGljay1jbG9uZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stY2xvbmVkJykuZmluZCgnW2lkXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignaWQnLCAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmludGVycnVwdCA9IGZ1bmN0aW9uKCB0b2dnbGUgKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmKCAhdG9nZ2xlICkge1xuICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0b2dnbGU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNlbGVjdEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9XG4gICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuaXMoJy5zbGljay1zbGlkZScpID9cbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkgOlxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludCh0YXJnZXRFbGVtZW50LmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKSk7XG5cbiAgICAgICAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihpbmRleCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBfLnNsaWRlSGFuZGxlcihpbmRleCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWRlSGFuZGxlciA9IGZ1bmN0aW9uKGluZGV4LCBzeW5jLCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciB0YXJnZXRTbGlkZSwgYW5pbVNsaWRlLCBvbGRTbGlkZSwgc2xpZGVMZWZ0LCB0YXJnZXRMZWZ0ID0gbnVsbCxcbiAgICAgICAgICAgIF8gPSB0aGlzLCBuYXZUYXJnZXQ7XG5cbiAgICAgICAgc3luYyA9IHN5bmMgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKF8uYW5pbWF0aW5nID09PSB0cnVlICYmIF8ub3B0aW9ucy53YWl0Rm9yQW5pbWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlICYmIF8uY3VycmVudFNsaWRlID09PSBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLmFzTmF2Rm9yKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFNsaWRlID0gaW5kZXg7XG4gICAgICAgIHRhcmdldExlZnQgPSBfLmdldExlZnQodGFyZ2V0U2xpZGUpO1xuICAgICAgICBzbGlkZUxlZnQgPSBfLmdldExlZnQoXy5jdXJyZW50U2xpZGUpO1xuXG4gICAgICAgIF8uY3VycmVudExlZnQgPSBfLnN3aXBlTGVmdCA9PT0gbnVsbCA/IHNsaWRlTGVmdCA6IF8uc3dpcGVMZWZ0O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSBmYWxzZSAmJiAoaW5kZXggPCAwIHx8IGluZGV4ID4gXy5nZXREb3RDb3VudCgpICogXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUoc2xpZGVMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlICYmIChpbmRleCA8IDAgfHwgaW5kZXggPiAoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHNsaWRlTGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoXy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRTbGlkZSA8IDApIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSBfLnNsaWRlQ291bnQgLSAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gXy5zbGlkZUNvdW50ICsgdGFyZ2V0U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2xpZGUgPj0gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gdGFyZ2V0U2xpZGUgLSBfLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmltU2xpZGUgPSB0YXJnZXRTbGlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYmVmb3JlQ2hhbmdlJywgW18sIF8uY3VycmVudFNsaWRlLCBhbmltU2xpZGVdKTtcblxuICAgICAgICBvbGRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGFuaW1TbGlkZTtcblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3NlcyhfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXNOYXZGb3IgKSB7XG5cbiAgICAgICAgICAgIG5hdlRhcmdldCA9IF8uZ2V0TmF2VGFyZ2V0KCk7XG4gICAgICAgICAgICBuYXZUYXJnZXQgPSBuYXZUYXJnZXQuc2xpY2soJ2dldFNsaWNrJyk7XG5cbiAgICAgICAgICAgIGlmICggbmF2VGFyZ2V0LnNsaWRlQ291bnQgPD0gbmF2VGFyZ2V0Lm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgICAgIG5hdlRhcmdldC5zZXRTbGlkZUNsYXNzZXMoXy5jdXJyZW50U2xpZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGVPdXQob2xkU2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGUoYW5pbVNsaWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUodGFyZ2V0TGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zdGFydExvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cuaGlkZSgpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LmhpZGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kZG90cy5oaWRlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZURpcmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciB4RGlzdCwgeURpc3QsIHIsIHN3aXBlQW5nbGUsIF8gPSB0aGlzO1xuXG4gICAgICAgIHhEaXN0ID0gXy50b3VjaE9iamVjdC5zdGFydFggLSBfLnRvdWNoT2JqZWN0LmN1clg7XG4gICAgICAgIHlEaXN0ID0gXy50b3VjaE9iamVjdC5zdGFydFkgLSBfLnRvdWNoT2JqZWN0LmN1clk7XG4gICAgICAgIHIgPSBNYXRoLmF0YW4yKHlEaXN0LCB4RGlzdCk7XG5cbiAgICAgICAgc3dpcGVBbmdsZSA9IE1hdGgucm91bmQociAqIDE4MCAvIE1hdGguUEkpO1xuICAgICAgICBpZiAoc3dpcGVBbmdsZSA8IDApIHtcbiAgICAgICAgICAgIHN3aXBlQW5nbGUgPSAzNjAgLSBNYXRoLmFicyhzd2lwZUFuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA8PSA0NSkgJiYgKHN3aXBlQW5nbGUgPj0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPD0gMzYwKSAmJiAoc3dpcGVBbmdsZSA+PSAzMTUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ2xlZnQnIDogJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlID49IDEzNSkgJiYgKHN3aXBlQW5nbGUgPD0gMjI1KSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdyaWdodCcgOiAnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPj0gMzUpICYmIChzd2lwZUFuZ2xlIDw9IDEzNSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3VwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAndmVydGljYWwnO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZUVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVDb3VudCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjtcblxuICAgICAgICBfLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIF8uc3dpcGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChfLnNjcm9sbGluZykge1xuICAgICAgICAgICAgXy5zY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgXy5zaG91bGRDbGljayA9ICggXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+IDEwICkgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LmN1clggPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5lZGdlSGl0ID09PSB0cnVlICkge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2VkZ2UnLCBbXywgXy5zd2lwZURpcmVjdGlvbigpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID49IF8udG91Y2hPYmplY3QubWluU3dpcGUgKSB7XG5cbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IF8uc3dpcGVEaXJlY3Rpb24oKTtcblxuICAgICAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uICkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrTmF2aWdhYmxlKCBfLmN1cnJlbnRTbGlkZSArIF8uZ2V0U2xpZGVDb3VudCgpICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlICsgXy5nZXRTbGlkZUNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50RGlyZWN0aW9uID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrTmF2aWdhYmxlKCBfLmN1cnJlbnRTbGlkZSAtIF8uZ2V0U2xpZGVDb3VudCgpICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlIC0gXy5nZXRTbGlkZUNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50RGlyZWN0aW9uID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggZGlyZWN0aW9uICE9ICd2ZXJ0aWNhbCcgKSB7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggc2xpZGVDb3VudCApO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc3dpcGUnLCBbXywgZGlyZWN0aW9uIF0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LnN0YXJ0WCAhPT0gXy50b3VjaE9iamVjdC5jdXJYICkge1xuXG4gICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIF8uY3VycmVudFNsaWRlICk7XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoKF8ub3B0aW9ucy5zd2lwZSA9PT0gZmFsc2UpIHx8ICgnb250b3VjaGVuZCcgaW4gZG9jdW1lbnQgJiYgXy5vcHRpb25zLnN3aXBlID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuZHJhZ2dhYmxlID09PSBmYWxzZSAmJiBldmVudC50eXBlLmluZGV4T2YoJ21vdXNlJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoIDogMTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlID0gXy5saXN0V2lkdGggLyBfLm9wdGlvbnNcbiAgICAgICAgICAgIC50b3VjaFRocmVzaG9sZDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5taW5Td2lwZSA9IF8ubGlzdEhlaWdodCAvIF8ub3B0aW9uc1xuICAgICAgICAgICAgICAgIC50b3VjaFRocmVzaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YS5hY3Rpb24pIHtcblxuICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVTdGFydChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlRW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgZWRnZVdhc0hpdCA9IGZhbHNlLFxuICAgICAgICAgICAgY3VyTGVmdCwgc3dpcGVEaXJlY3Rpb24sIHN3aXBlTGVuZ3RoLCBwb3NpdGlvbk9mZnNldCwgdG91Y2hlcywgdmVydGljYWxTd2lwZUxlbmd0aDtcblxuICAgICAgICB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkID8gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzIDogbnVsbDtcblxuICAgICAgICBpZiAoIV8uZHJhZ2dpbmcgfHwgXy5zY3JvbGxpbmcgfHwgdG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VyTGVmdCA9IF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5jdXJYID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlc1swXS5wYWdlWCA6IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF8udG91Y2hPYmplY3QuY3VyWSA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXNbMF0ucGFnZVkgOiBldmVudC5jbGllbnRZO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWCAtIF8udG91Y2hPYmplY3Quc3RhcnRYLCAyKSkpO1xuXG4gICAgICAgIHZlcnRpY2FsU3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWSAtIF8udG91Y2hPYmplY3Quc3RhcnRZLCAyKSkpO1xuXG4gICAgICAgIGlmICghXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyAmJiAhXy5zd2lwaW5nICYmIHZlcnRpY2FsU3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBfLnNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA9IHZlcnRpY2FsU3dpcGVMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZURpcmVjdGlvbiA9IF8uc3dpcGVEaXJlY3Rpb24oKTtcblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBfLnN3aXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gMSA6IC0xKSAqIChfLnRvdWNoT2JqZWN0LmN1clggPiBfLnRvdWNoT2JqZWN0LnN0YXJ0WCA/IDEgOiAtMSk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbk9mZnNldCA9IF8udG91Y2hPYmplY3QuY3VyWSA+IF8udG91Y2hPYmplY3Quc3RhcnRZID8gMSA6IC0xO1xuICAgICAgICB9XG5cblxuICAgICAgICBzd2lwZUxlbmd0aCA9IF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGg7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5lZGdlSGl0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICgoXy5jdXJyZW50U2xpZGUgPT09IDAgJiYgc3dpcGVEaXJlY3Rpb24gPT09ICdyaWdodCcpIHx8IChfLmN1cnJlbnRTbGlkZSA+PSBfLmdldERvdENvdW50KCkgJiYgc3dpcGVEaXJlY3Rpb24gPT09ICdsZWZ0JykpIHtcbiAgICAgICAgICAgICAgICBzd2lwZUxlbmd0aCA9IF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggKiBfLm9wdGlvbnMuZWRnZUZyaWN0aW9uO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QuZWRnZUhpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgc3dpcGVMZW5ndGggKiBwb3NpdGlvbk9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIChzd2lwZUxlbmd0aCAqIChfLiRsaXN0LmhlaWdodCgpIC8gXy5saXN0V2lkdGgpKSAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyBzd2lwZUxlbmd0aCAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlIHx8IF8ub3B0aW9ucy50b3VjaE1vdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5hbmltYXRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0Q1NTKF8uc3dpcGVMZWZ0KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVTdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2hlcztcblxuICAgICAgICBfLmludGVycnVwdGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoXy50b3VjaE9iamVjdC5maW5nZXJDb3VudCAhPT0gMSB8fCBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udG91Y2hPYmplY3Quc3RhcnRYID0gXy50b3VjaE9iamVjdC5jdXJYID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlcy5wYWdlWCA6IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF8udG91Y2hPYmplY3Quc3RhcnRZID0gXy50b3VjaE9iamVjdC5jdXJZID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlcy5wYWdlWSA6IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgXy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVuZmlsdGVyU2xpZGVzID0gU2xpY2sucHJvdG90eXBlLnNsaWNrVW5maWx0ZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uJHNsaWRlc0NhY2hlICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG5cbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgJCgnLnNsaWNrLWNsb25lZCcsIF8uJHNsaWRlcikucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMpIHtcbiAgICAgICAgICAgIF8uJGRvdHMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy4kcHJldkFycm93ICYmIF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMucHJldkFycm93KSkge1xuICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uJG5leHRBcnJvdyAmJiBfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLm5leHRBcnJvdykpIHtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stdmlzaWJsZSBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgJycpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bnNsaWNrID0gZnVuY3Rpb24oZnJvbUJyZWFrcG9pbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCd1bnNsaWNrJywgW18sIGZyb21CcmVha3BvaW50XSk7XG4gICAgICAgIF8uZGVzdHJveSgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51cGRhdGVBcnJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQ7XG5cbiAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmXG4gICAgICAgICAgICBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICYmXG4gICAgICAgICAgICAhXy5vcHRpb25zLmluZmluaXRlICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgaWYgKF8uY3VycmVudFNsaWRlID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50IC0gMSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVwZGF0ZURvdHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy4kZG90c1xuICAgICAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpO1xuXG4gICAgICAgICAgICBfLiRkb3RzXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAuZXEoTWF0aC5mbG9vcihfLmN1cnJlbnRTbGlkZSAvIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnZpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgIGlmICggZG9jdW1lbnRbXy5oaWRkZW5dICkge1xuXG4gICAgICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJC5mbi5zbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGwgPSBfLmxlbmd0aCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICByZXQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBvcHQgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgX1tpXS5zbGljayA9IG5ldyBTbGljayhfW2ldLCBvcHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldCA9IF9baV0uc2xpY2tbb3B0XS5hcHBseShfW2ldLnNsaWNrLCBhcmdzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0ICE9ICd1bmRlZmluZWQnKSByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH07XG5cbn0pKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0YWIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0YWJzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVEFCIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBqc2NzOmRpc2FibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpXG4gICAgLy8ganNjczplbmFibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgfVxuXG4gIFRhYi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIFRhYi5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVGFiLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyAgICA9IHRoaXMuZWxlbWVudFxuICAgIHZhciAkdWwgICAgICA9ICR0aGlzLmNsb3Nlc3QoJ3VsOm5vdCguZHJvcGRvd24tbWVudSknKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciAkcHJldmlvdXMgPSAkdWwuZmluZCgnLmFjdGl2ZTpsYXN0IGEnKVxuICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgfSlcbiAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICB9KVxuXG4gICAgJHByZXZpb3VzLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdmFyICR0YXJnZXQgPSAkKHNlbGVjdG9yKVxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGhpcy5jbG9zZXN0KCdsaScpLCAkdWwpXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGFyZ2V0LCAkdGFyZ2V0LnBhcmVudCgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkcHJldmlvdXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICAgIH0pXG4gICAgICAkdGhpcy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ3Nob3duLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgKCRhY3RpdmUubGVuZ3RoICYmICRhY3RpdmUuaGFzQ2xhc3MoJ2ZhZGUnKSB8fCAhIWNvbnRhaW5lci5maW5kKCc+IC5mYWRlJykubGVuZ3RoKVxuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnPiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICAgIGVsZW1lbnRcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gcmVmbG93IGZvciB0cmFuc2l0aW9uXG4gICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZhZGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgJGFjdGl2ZS5sZW5ndGggJiYgdHJhbnNpdGlvbiA/XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIG5leHQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUYWIuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgbmV4dCgpXG5cbiAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdpbicpXG4gIH1cblxuXG4gIC8vIFRBQiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy50YWInKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRhYicsIChkYXRhID0gbmV3IFRhYih0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udGFiXG5cbiAgJC5mbi50YWIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50YWIuQ29uc3RydWN0b3IgPSBUYWJcblxuXG4gIC8vIFRBQiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkLmZuLnRhYi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4udGFiID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gVEFCIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIFBsdWdpbi5jYWxsKCQodGhpcyksICdzaG93JylcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy50YWIuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLCBjbGlja0hhbmRsZXIpXG5cbn0oalF1ZXJ5KTtcbiIsImltcG9ydCAnLi9zbGljayc7XG5pbXBvcnQgJy4vbW9kYWwnO1xuaW1wb3J0ICcuL3RhYic7IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sInNvdXJjZVJvb3QiOiIifQ==