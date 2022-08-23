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
  'use strict'; // MODAL CLASS DEFINITION
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
  }; // these following methods are used to handle overflowing modals


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
  }; // MODAL PLUGIN DEFINITION
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
  $.fn.modal.Constructor = Modal; // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  }; // MODAL DATA-API
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
      _.instanceUid = instanceUid++; // A simple way to check for HTML strings
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
      } // only trigger breakpoints during an actual break. not on initialize.


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
        unevenOffset; // If target is a link, prevent default action.


    if ($target.is('a')) {
      event.preventDefault();
    } // If target is not the <li> element (ie: a child), find the <li>.


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
    var _ = this; //Dont slide if the cursor is inside the form fields and arrow keys are pressed


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

    lastVisibleIndex = _.slideCount - _.options.slidesToShow; // in non-infinite sliders, we don't want to go past the
    // last visible index.

    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    } // if less slides than to show, go to start.


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
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint; // loop through the breakpoints and cut out any existing
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
          l = _.options.responsive.length - 1; // loop through the responsive object and splice out duplicates.

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
  'use strict'; // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element); // jscs:enable requireDollarBeforejQueryAssignment
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
  }; // TAB PLUGIN DEFINITION
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
  $.fn.tab.Constructor = Tab; // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  }; // TAB DATA-API
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

module.exports = __webpack_require__(/*! /Users/lightstream_station14/vvv-local/www/lsg-271/public_html/wp-content/themes/boiler/src/js/vendor/vendor.js */"./src/js/vendor/vendor.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlbmRvci9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVuZG9yL3NsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZW5kb3IvdGFiLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZW5kb3IvdmVuZG9yLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbIiQiLCJNb2RhbCIsImVsZW1lbnQiLCJvcHRpb25zIiwiJGJvZHkiLCJkb2N1bWVudCIsImJvZHkiLCIkZWxlbWVudCIsIiRkaWFsb2ciLCJmaW5kIiwiJGJhY2tkcm9wIiwiaXNTaG93biIsIm9yaWdpbmFsQm9keVBhZCIsInNjcm9sbGJhcldpZHRoIiwiaWdub3JlQmFja2Ryb3BDbGljayIsInJlbW90ZSIsImxvYWQiLCJwcm94eSIsInRyaWdnZXIiLCJWRVJTSU9OIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJERUZBVUxUUyIsImJhY2tkcm9wIiwia2V5Ym9hcmQiLCJzaG93IiwicHJvdG90eXBlIiwidG9nZ2xlIiwiX3JlbGF0ZWRUYXJnZXQiLCJoaWRlIiwidGhhdCIsImUiLCJFdmVudCIsInJlbGF0ZWRUYXJnZXQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJjaGVja1Njcm9sbGJhciIsInNldFNjcm9sbGJhciIsImFkZENsYXNzIiwiZXNjYXBlIiwicmVzaXplIiwib24iLCJvbmUiLCJ0YXJnZXQiLCJpcyIsInRyYW5zaXRpb24iLCJzdXBwb3J0IiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJsZW5ndGgiLCJhcHBlbmRUbyIsInNjcm9sbFRvcCIsImFkanVzdERpYWxvZyIsIm9mZnNldFdpZHRoIiwiZW5mb3JjZUZvY3VzIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJwcmV2ZW50RGVmYXVsdCIsIm9mZiIsInJlbW92ZUNsYXNzIiwiaGlkZU1vZGFsIiwiaGFzIiwid2hpY2giLCJ3aW5kb3ciLCJoYW5kbGVVcGRhdGUiLCJyZXNldEFkanVzdG1lbnRzIiwicmVzZXRTY3JvbGxiYXIiLCJyZW1vdmVCYWNrZHJvcCIsInJlbW92ZSIsImNhbGxiYWNrIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsYmFja1JlbW92ZSIsIm1vZGFsSXNPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsImNzcyIsInBhZGRpbmdMZWZ0IiwiYm9keUlzT3ZlcmZsb3dpbmciLCJwYWRkaW5nUmlnaHQiLCJmdWxsV2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiTWF0aCIsImFicyIsImxlZnQiLCJjbGllbnRXaWR0aCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJzdHlsZSIsInNjcm9sbERpdiIsImNsYXNzTmFtZSIsImFwcGVuZCIsInJlbW92ZUNoaWxkIiwiUGx1Z2luIiwib3B0aW9uIiwiZWFjaCIsIiR0aGlzIiwiZGF0YSIsImV4dGVuZCIsIm9sZCIsImZuIiwibW9kYWwiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiLCJocmVmIiwiYXR0ciIsIiR0YXJnZXQiLCJyZXBsYWNlIiwidGVzdCIsInNob3dFdmVudCIsImNhbGwiLCJqUXVlcnkiLCJmYWN0b3J5IiwiZGVmaW5lIiwiU2xpY2siLCJpbnN0YW5jZVVpZCIsInNldHRpbmdzIiwiXyIsImRhdGFTZXR0aW5ncyIsImRlZmF1bHRzIiwiYWNjZXNzaWJpbGl0eSIsImFkYXB0aXZlSGVpZ2h0IiwiYXBwZW5kQXJyb3dzIiwiYXBwZW5kRG90cyIsImFycm93cyIsImFzTmF2Rm9yIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwiY2VudGVyTW9kZSIsImNlbnRlclBhZGRpbmciLCJjc3NFYXNlIiwiY3VzdG9tUGFnaW5nIiwic2xpZGVyIiwiaSIsInRleHQiLCJkb3RzIiwiZG90c0NsYXNzIiwiZHJhZ2dhYmxlIiwiZWFzaW5nIiwiZWRnZUZyaWN0aW9uIiwiZmFkZSIsImZvY3VzT25TZWxlY3QiLCJmb2N1c09uQ2hhbmdlIiwiaW5maW5pdGUiLCJpbml0aWFsU2xpZGUiLCJsYXp5TG9hZCIsIm1vYmlsZUZpcnN0IiwicGF1c2VPbkhvdmVyIiwicGF1c2VPbkZvY3VzIiwicGF1c2VPbkRvdHNIb3ZlciIsInJlc3BvbmRUbyIsInJlc3BvbnNpdmUiLCJyb3dzIiwicnRsIiwic2xpZGUiLCJzbGlkZXNQZXJSb3ciLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwic3dpcGUiLCJzd2lwZVRvU2xpZGUiLCJ0b3VjaE1vdmUiLCJ0b3VjaFRocmVzaG9sZCIsInVzZUNTUyIsInVzZVRyYW5zZm9ybSIsInZhcmlhYmxlV2lkdGgiLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsU3dpcGluZyIsIndhaXRGb3JBbmltYXRlIiwiekluZGV4IiwiaW5pdGlhbHMiLCJhbmltYXRpbmciLCJkcmFnZ2luZyIsImF1dG9QbGF5VGltZXIiLCJjdXJyZW50RGlyZWN0aW9uIiwiY3VycmVudExlZnQiLCJjdXJyZW50U2xpZGUiLCJkaXJlY3Rpb24iLCIkZG90cyIsImxpc3RXaWR0aCIsImxpc3RIZWlnaHQiLCJsb2FkSW5kZXgiLCIkbmV4dEFycm93IiwiJHByZXZBcnJvdyIsInNjcm9sbGluZyIsInNsaWRlQ291bnQiLCJzbGlkZVdpZHRoIiwiJHNsaWRlVHJhY2siLCIkc2xpZGVzIiwic2xpZGluZyIsInNsaWRlT2Zmc2V0Iiwic3dpcGVMZWZ0Iiwic3dpcGluZyIsIiRsaXN0IiwidG91Y2hPYmplY3QiLCJ0cmFuc2Zvcm1zRW5hYmxlZCIsInVuc2xpY2tlZCIsImFjdGl2ZUJyZWFrcG9pbnQiLCJhbmltVHlwZSIsImFuaW1Qcm9wIiwiYnJlYWtwb2ludHMiLCJicmVha3BvaW50U2V0dGluZ3MiLCJjc3NUcmFuc2l0aW9ucyIsImZvY3Vzc2VkIiwiaW50ZXJydXB0ZWQiLCJoaWRkZW4iLCJwYXVzZWQiLCJwb3NpdGlvblByb3AiLCJyb3dDb3VudCIsInNob3VsZENsaWNrIiwiJHNsaWRlciIsIiRzbGlkZXNDYWNoZSIsInRyYW5zZm9ybVR5cGUiLCJ0cmFuc2l0aW9uVHlwZSIsInZpc2liaWxpdHlDaGFuZ2UiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd1RpbWVyIiwib3JpZ2luYWxTZXR0aW5ncyIsIm1vekhpZGRlbiIsIndlYmtpdEhpZGRlbiIsImF1dG9QbGF5IiwiYXV0b1BsYXlDbGVhciIsImF1dG9QbGF5SXRlcmF0b3IiLCJjaGFuZ2VTbGlkZSIsImNsaWNrSGFuZGxlciIsInNlbGVjdEhhbmRsZXIiLCJzZXRQb3NpdGlvbiIsInN3aXBlSGFuZGxlciIsImRyYWdIYW5kbGVyIiwia2V5SGFuZGxlciIsImh0bWxFeHByIiwicmVnaXN0ZXJCcmVha3BvaW50cyIsImluaXQiLCJhY3RpdmF0ZUFEQSIsImFkZFNsaWRlIiwic2xpY2tBZGQiLCJtYXJrdXAiLCJpbmRleCIsImFkZEJlZm9yZSIsInVubG9hZCIsImluc2VydEJlZm9yZSIsImVxIiwiaW5zZXJ0QWZ0ZXIiLCJwcmVwZW5kVG8iLCJjaGlsZHJlbiIsImRldGFjaCIsInJlaW5pdCIsImFuaW1hdGVIZWlnaHQiLCJ0YXJnZXRIZWlnaHQiLCJvdXRlckhlaWdodCIsImhlaWdodCIsImFuaW1hdGVTbGlkZSIsInRhcmdldExlZnQiLCJhbmltUHJvcHMiLCJ0b3AiLCJhbmltU3RhcnQiLCJkdXJhdGlvbiIsInN0ZXAiLCJub3ciLCJjZWlsIiwiY29tcGxldGUiLCJhcHBseVRyYW5zaXRpb24iLCJzZXRUaW1lb3V0IiwiZGlzYWJsZVRyYW5zaXRpb24iLCJnZXROYXZUYXJnZXQiLCJub3QiLCJzbGljayIsInNsaWRlSGFuZGxlciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNsaWRlVG8iLCJidWlsZEFycm93cyIsInJlbW92ZUF0dHIiLCJhZGQiLCJidWlsZERvdHMiLCJkb3QiLCJnZXREb3RDb3VudCIsImZpcnN0IiwiYnVpbGRPdXQiLCJ3cmFwQWxsIiwid3JhcCIsInNldHVwSW5maW5pdGUiLCJ1cGRhdGVEb3RzIiwic2V0U2xpZGVDbGFzc2VzIiwiYnVpbGRSb3dzIiwiYSIsImIiLCJjIiwibmV3U2xpZGVzIiwibnVtT2ZTbGlkZXMiLCJvcmlnaW5hbFNsaWRlcyIsInNsaWRlc1BlclNlY3Rpb24iLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwicm93IiwiZ2V0IiwiYXBwZW5kQ2hpbGQiLCJlbXB0eSIsImNoZWNrUmVzcG9uc2l2ZSIsImluaXRpYWwiLCJmb3JjZVVwZGF0ZSIsImJyZWFrcG9pbnQiLCJ0YXJnZXRCcmVha3BvaW50IiwicmVzcG9uZFRvV2lkdGgiLCJ0cmlnZ2VyQnJlYWtwb2ludCIsInNsaWRlcldpZHRoIiwid2lkdGgiLCJtaW4iLCJoYXNPd25Qcm9wZXJ0eSIsInVuc2xpY2siLCJyZWZyZXNoIiwiZXZlbnQiLCJkb250QW5pbWF0ZSIsImluZGV4T2Zmc2V0IiwidW5ldmVuT2Zmc2V0IiwiY2xvc2VzdCIsIm1lc3NhZ2UiLCJjaGVja05hdmlnYWJsZSIsIm5hdmlnYWJsZXMiLCJwcmV2TmF2aWdhYmxlIiwiZ2V0TmF2aWdhYmxlSW5kZXhlcyIsIm4iLCJjbGVhblVwRXZlbnRzIiwiaW50ZXJydXB0IiwidmlzaWJpbGl0eSIsImNsZWFuVXBTbGlkZUV2ZW50cyIsIm9yaWVudGF0aW9uQ2hhbmdlIiwiY2xlYW5VcFJvd3MiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJkZXN0cm95IiwiZmFkZVNsaWRlIiwic2xpZGVJbmRleCIsIm9wYWNpdHkiLCJmYWRlU2xpZGVPdXQiLCJmaWx0ZXJTbGlkZXMiLCJzbGlja0ZpbHRlciIsImZpbHRlciIsImZvY3VzSGFuZGxlciIsIiRzZiIsImdldEN1cnJlbnQiLCJzbGlja0N1cnJlbnRTbGlkZSIsImJyZWFrUG9pbnQiLCJjb3VudGVyIiwicGFnZXJRdHkiLCJnZXRMZWZ0IiwidmVydGljYWxIZWlnaHQiLCJ2ZXJ0aWNhbE9mZnNldCIsInRhcmdldFNsaWRlIiwiY29lZiIsImZsb29yIiwib2Zmc2V0TGVmdCIsIm91dGVyV2lkdGgiLCJnZXRPcHRpb24iLCJzbGlja0dldE9wdGlvbiIsImluZGV4ZXMiLCJtYXgiLCJwdXNoIiwiZ2V0U2xpY2siLCJnZXRTbGlkZUNvdW50Iiwic2xpZGVzVHJhdmVyc2VkIiwic3dpcGVkU2xpZGUiLCJjZW50ZXJPZmZzZXQiLCJnb1RvIiwic2xpY2tHb1RvIiwiY3JlYXRpb24iLCJzZXRQcm9wcyIsInN0YXJ0TG9hZCIsImxvYWRTbGlkZXIiLCJpbml0aWFsaXplRXZlbnRzIiwidXBkYXRlQXJyb3dzIiwiaW5pdEFEQSIsIm51bURvdEdyb3VwcyIsInRhYkNvbnRyb2xJbmRleGVzIiwidmFsIiwic2xpZGVDb250cm9sSW5kZXgiLCJpbmRleE9mIiwiYXJpYUJ1dHRvbkNvbnRyb2wiLCJtYXBwZWRTbGlkZUluZGV4IiwiZW5kIiwiaW5pdEFycm93RXZlbnRzIiwiaW5pdERvdEV2ZW50cyIsImluaXRTbGlkZUV2ZW50cyIsImFjdGlvbiIsImluaXRVSSIsInRhZ05hbWUiLCJtYXRjaCIsImtleUNvZGUiLCJsb2FkUmFuZ2UiLCJjbG9uZVJhbmdlIiwicmFuZ2VTdGFydCIsInJhbmdlRW5kIiwibG9hZEltYWdlcyIsImltYWdlc1Njb3BlIiwiaW1hZ2UiLCJpbWFnZVNvdXJjZSIsImltYWdlU3JjU2V0IiwiaW1hZ2VTaXplcyIsImltYWdlVG9Mb2FkIiwib25sb2FkIiwib25lcnJvciIsInNyYyIsInNsaWNlIiwicHJldlNsaWRlIiwibmV4dFNsaWRlIiwicHJvZ3Jlc3NpdmVMYXp5TG9hZCIsIm5leHQiLCJzbGlja05leHQiLCJwYXVzZSIsInNsaWNrUGF1c2UiLCJwbGF5Iiwic2xpY2tQbGF5IiwicG9zdFNsaWRlIiwiJGN1cnJlbnRTbGlkZSIsInByZXYiLCJzbGlja1ByZXYiLCJ0cnlDb3VudCIsIiRpbWdzVG9Mb2FkIiwiaW5pdGlhbGl6aW5nIiwibGFzdFZpc2libGVJbmRleCIsImN1cnJlbnRCcmVha3BvaW50IiwibCIsInJlc3BvbnNpdmVTZXR0aW5ncyIsInR5cGUiLCJzcGxpY2UiLCJzb3J0IiwiY2xlYXJUaW1lb3V0Iiwid2luZG93RGVsYXkiLCJyZW1vdmVTbGlkZSIsInNsaWNrUmVtb3ZlIiwicmVtb3ZlQmVmb3JlIiwicmVtb3ZlQWxsIiwic2V0Q1NTIiwicG9zaXRpb24iLCJwb3NpdGlvblByb3BzIiwieCIsInkiLCJzZXREaW1lbnNpb25zIiwicGFkZGluZyIsIm9mZnNldCIsInNldEZhZGUiLCJzZXRIZWlnaHQiLCJzZXRPcHRpb24iLCJzbGlja1NldE9wdGlvbiIsIml0ZW0iLCJ2YWx1ZSIsImFyZ3VtZW50cyIsIm9wdCIsImJvZHlTdHlsZSIsIldlYmtpdFRyYW5zaXRpb24iLCJ1bmRlZmluZWQiLCJNb3pUcmFuc2l0aW9uIiwibXNUcmFuc2l0aW9uIiwiT1RyYW5zZm9ybSIsInBlcnNwZWN0aXZlUHJvcGVydHkiLCJ3ZWJraXRQZXJzcGVjdGl2ZSIsIk1velRyYW5zZm9ybSIsIk1velBlcnNwZWN0aXZlIiwid2Via2l0VHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJhbGxTbGlkZXMiLCJyZW1haW5kZXIiLCJldmVuQ29lZiIsImluZmluaXRlQ291bnQiLCJjbG9uZSIsInRhcmdldEVsZW1lbnQiLCJwYXJlbnRzIiwic3luYyIsImFuaW1TbGlkZSIsIm9sZFNsaWRlIiwic2xpZGVMZWZ0IiwibmF2VGFyZ2V0Iiwic3dpcGVEaXJlY3Rpb24iLCJ4RGlzdCIsInlEaXN0IiwiciIsInN3aXBlQW5nbGUiLCJzdGFydFgiLCJjdXJYIiwic3RhcnRZIiwiY3VyWSIsImF0YW4yIiwicm91bmQiLCJQSSIsInN3aXBlRW5kIiwic3dpcGVMZW5ndGgiLCJlZGdlSGl0IiwibWluU3dpcGUiLCJmaW5nZXJDb3VudCIsIm9yaWdpbmFsRXZlbnQiLCJ0b3VjaGVzIiwic3dpcGVTdGFydCIsInN3aXBlTW92ZSIsImVkZ2VXYXNIaXQiLCJjdXJMZWZ0IiwicG9zaXRpb25PZmZzZXQiLCJ2ZXJ0aWNhbFN3aXBlTGVuZ3RoIiwicGFnZVgiLCJjbGllbnRYIiwicGFnZVkiLCJjbGllbnRZIiwic3FydCIsInBvdyIsInVuZmlsdGVyU2xpZGVzIiwic2xpY2tVbmZpbHRlciIsImZyb21CcmVha3BvaW50IiwiYXJncyIsIkFycmF5IiwicmV0IiwiYXBwbHkiLCJUYWIiLCIkdWwiLCJzZWxlY3RvciIsIiRwcmV2aW91cyIsImhpZGVFdmVudCIsImFjdGl2YXRlIiwiY29udGFpbmVyIiwiJGFjdGl2ZSIsInRhYiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQSx3QiIsImZpbGUiOiJ2ZW5kb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogbW9kYWwuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNtb2RhbHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBNT0RBTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyAgICAgICAgICAgICA9IG9wdGlvbnNcbiAgICB0aGlzLiRib2R5ICAgICAgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kZWxlbWVudCAgICAgICAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGRpYWxvZyAgICAgICAgICAgICA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWRpYWxvZycpXG4gICAgdGhpcy4kYmFja2Ryb3AgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuaXNTaG93biAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCAgICAgPSBudWxsXG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCAgICAgID0gMFxuICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW90ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuZmluZCgnLm1vZGFsLWNvbnRlbnQnKVxuICAgICAgICAubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCAkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2xvYWRlZC5icy5tb2RhbCcpXG4gICAgICAgIH0sIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDBcbiAgTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIE1vZGFsLkRFRkFVTFRTID0ge1xuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIHNob3c6IHRydWVcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBlICAgID0gJC5FdmVudCgnc2hvdy5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IHRydWVcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxiYXIoKVxuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKClcbiAgICB0aGlzLiRib2R5LmFkZENsYXNzKCdtb2RhbC1vcGVuJylcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsICQucHJveHkodGhpcy5oaWRlLCB0aGlzKSlcblxuICAgIHRoaXMuJGRpYWxvZy5vbignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9uZSgnbW91c2V1cC5kaXNtaXNzLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoYXQuJGVsZW1lbnQpKSB0aGF0Lmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSB0cnVlXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9uID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhhdC4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpXG5cbiAgICAgIGlmICghdGhhdC4kZWxlbWVudC5wYXJlbnQoKS5sZW5ndGgpIHtcbiAgICAgICAgdGhhdC4kZWxlbWVudC5hcHBlbmRUbyh0aGF0LiRib2R5KSAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMClcblxuICAgICAgdGhhdC5hZGp1c3REaWFsb2coKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGF0LiRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50LmFkZENsYXNzKCdpbicpXG5cbiAgICAgIHRoYXQuZW5mb3JjZUZvY3VzKClcblxuICAgICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93bi5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgICAgdHJhbnNpdGlvbiA/XG4gICAgICAgIHRoYXQuJGRpYWxvZyAvLyB3YWl0IGZvciBtb2RhbCB0byBzbGlkZSBpblxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJykudHJpZ2dlcihlKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgZSA9ICQuRXZlbnQoJ2hpZGUuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAoIXRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IGZhbHNlXG5cbiAgICB0aGlzLmVzY2FwZSgpXG4gICAgdGhpcy5yZXNpemUoKVxuXG4gICAgJChkb2N1bWVudCkub2ZmKCdmb2N1c2luLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKVxuICAgICAgLm9mZignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgICAub2ZmKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9mZignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eSh0aGlzLmhpZGVNb2RhbCwgdGhpcykpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICB0aGlzLmhpZGVNb2RhbCgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZW5mb3JjZUZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpXG4gICAgICAub2ZmKCdmb2N1c2luLmJzLm1vZGFsJykgLy8gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAub24oJ2ZvY3VzaW4uYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudCAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmXG4gICAgICAgICAgICAhdGhpcy4kZWxlbWVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lc2NhcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS53aGljaCA9PSAyNyAmJiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcbiAgICAgICQod2luZG93KS5vbigncmVzaXplLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLmhhbmRsZVVwZGF0ZSwgdGhpcykpXG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKVxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC4kYm9keS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpXG4gICAgICB0aGF0LnJlc2V0QWRqdXN0bWVudHMoKVxuICAgICAgdGhhdC5yZXNldFNjcm9sbGJhcigpXG4gICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2hpZGRlbi5icy5tb2RhbCcpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZW1vdmVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRiYWNrZHJvcCAmJiB0aGlzLiRiYWNrZHJvcC5yZW1vdmUoKVxuICAgIHRoaXMuJGJhY2tkcm9wID0gbnVsbFxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmJhY2tkcm9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGFuaW1hdGUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgPyAnZmFkZScgOiAnJ1xuXG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgIHZhciBkb0FuaW1hdGUgPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBhbmltYXRlXG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgLmFkZENsYXNzKCdtb2RhbC1iYWNrZHJvcCAnICsgYW5pbWF0ZSlcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGJvZHkpXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICB0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm5cbiAgICAgICAgdGhpcy5vcHRpb25zLmJhY2tkcm9wID09ICdzdGF0aWMnXG4gICAgICAgICAgPyB0aGlzLiRlbGVtZW50WzBdLmZvY3VzKClcbiAgICAgICAgICA6IHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcblxuICAgICAgaWYgKGRvQW5pbWF0ZSkgdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVyblxuXG4gICAgICBkb0FuaW1hdGUgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrKClcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93biAmJiB0aGlzLiRiYWNrZHJvcCkge1xuICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LnJlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG5cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgLy8gdGhlc2UgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuXG4gIE1vZGFsLnByb3RvdHlwZS5oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hZGp1c3REaWFsb2coKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmFkanVzdERpYWxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9kYWxJc092ZXJmbG93aW5nID0gdGhpcy4kZWxlbWVudFswXS5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICBwYWRkaW5nTGVmdDogICF0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmIG1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiAhbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldEFkanVzdG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmNoZWNrU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmdWxsV2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGlmICghZnVsbFdpbmRvd1dpZHRoKSB7IC8vIHdvcmthcm91bmQgZm9yIG1pc3Npbmcgd2luZG93LmlubmVyV2lkdGggaW4gSUU4XG4gICAgICB2YXIgZG9jdW1lbnRFbGVtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgZnVsbFdpbmRvd1dpZHRoID0gZG9jdW1lbnRFbGVtZW50UmVjdC5yaWdodCAtIE1hdGguYWJzKGRvY3VtZW50RWxlbWVudFJlY3QubGVmdClcbiAgICB9XG4gICAgdGhpcy5ib2R5SXNPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGhcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5tZWFzdXJlU2Nyb2xsYmFyKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvZHlQYWQgPSBwYXJzZUludCgodGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwKSwgMTApXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJ1xuICAgIGlmICh0aGlzLmJvZHlJc092ZXJmbG93aW5nKSB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIGJvZHlQYWQgKyB0aGlzLnNjcm9sbGJhcldpZHRoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgdGhpcy5vcmlnaW5hbEJvZHlQYWQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUubWVhc3VyZVNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHsgLy8gdGh4IHdhbHNoXG4gICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSdcbiAgICB0aGlzLiRib2R5LmFwcGVuZChzY3JvbGxEaXYpXG4gICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgdGhpcy4kYm9keVswXS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gIH1cblxuXG4gIC8vIE1PREFMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbiwgX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5tb2RhbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5tb2RhbCcsIChkYXRhID0gbmV3IE1vZGFsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oX3JlbGF0ZWRUYXJnZXQpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLnNob3cpIGRhdGEuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubW9kYWxcblxuICAkLmZuLm1vZGFsICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIHZhciBvcHRpb24gID0gJHRhcmdldC5kYXRhKCdicy5tb2RhbCcpID8gJ3RvZ2dsZScgOiAkLmV4dGVuZCh7IHJlbW90ZTogIS8jLy50ZXN0KGhyZWYpICYmIGhyZWYgfSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcblxuICAgIGlmICgkdGhpcy5pcygnYScpKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICR0YXJnZXQub25lKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICR0YXJnZXQub25lKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aGlzLmlzKCc6dmlzaWJsZScpICYmICR0aGlzLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH0pXG4gICAgfSlcbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24sIHRoaXMpXG4gIH0pXG5cbn0oalF1ZXJ5KTsiLCIvKlxuICAgICBfIF8gICAgICBfICAgICAgIF9cbiBfX198IChfKSBfX198IHwgX18gIChfKV9fX1xuLyBfX3wgfCB8LyBfX3wgfC8gLyAgfCAvIF9ffFxuXFxfXyBcXCB8IHwgKF9ffCAgIDwgXyB8IFxcX18gXFxcbnxfX18vX3xffFxcX19ffF98XFxfKF8pLyB8X19fL1xuICAgICAgICAgICAgICAgICAgIHxfXy9cblxuIFZlcnNpb246IDEuOC4wXG4gIEF1dGhvcjogS2VuIFdoZWVsZXJcbiBXZWJzaXRlOiBodHRwOi8va2Vud2hlZWxlci5naXRodWIuaW9cbiAgICBEb2NzOiBodHRwOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2tcbiAgICBSZXBvOiBodHRwOi8vZ2l0aHViLmNvbS9rZW53aGVlbGVyL3NsaWNrXG4gIElzc3VlczogaHR0cDovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9zbGljay9pc3N1ZXNcblxuICovXG4vKiBnbG9iYWwgd2luZG93LCBkb2N1bWVudCwgZGVmaW5lLCBqUXVlcnksIHNldEludGVydmFsLCBjbGVhckludGVydmFsICovXG47KGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxuXG59KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIFNsaWNrID0gd2luZG93LlNsaWNrIHx8IHt9O1xuXG4gICAgU2xpY2sgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGluc3RhbmNlVWlkID0gMDtcblxuICAgICAgICBmdW5jdGlvbiBTbGljayhlbGVtZW50LCBzZXR0aW5ncykge1xuXG4gICAgICAgICAgICB2YXIgXyA9IHRoaXMsIGRhdGFTZXR0aW5ncztcblxuICAgICAgICAgICAgXy5kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5OiB0cnVlLFxuICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhcHBlbmRBcnJvd3M6ICQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgYXBwZW5kRG90czogJChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiBjbGFzcz1cInNsaWNrLXByZXZcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+UHJldmlvdXM8L2J1dHRvbj4nLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gY2xhc3M9XCJzbGljay1uZXh0XCIgYXJpYS1sYWJlbD1cIk5leHRcIiB0eXBlPVwiYnV0dG9uXCI+TmV4dDwvYnV0dG9uPicsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdlYXNlJyxcbiAgICAgICAgICAgICAgICBjdXN0b21QYWdpbmc6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgLz4nKS50ZXh0KGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRvdHNDbGFzczogJ3NsaWNrLWRvdHMnLFxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIGVkZ2VGcmljdGlvbjogMC4zNSxcbiAgICAgICAgICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uQ2hhbmdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uRm9jdXM6IHRydWUsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkRvdHNIb3ZlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVzcG9uZFRvOiAnd2luZG93JyxcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBudWxsLFxuICAgICAgICAgICAgICAgIHJvd3M6IDEsXG4gICAgICAgICAgICAgICAgcnRsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzbGlkZTogJycsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyUm93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgICAgICAgIHN3aXBlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN3aXBlVG9TbGlkZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdG91Y2hNb3ZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoVGhyZXNob2xkOiA1LFxuICAgICAgICAgICAgICAgIHVzZUNTUzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1c2VUcmFuc2Zvcm06IHRydWUsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcnRpY2FsU3dpcGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgd2FpdEZvckFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgekluZGV4OiAxMDAwXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBfLmluaXRpYWxzID0ge1xuICAgICAgICAgICAgICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGF1dG9QbGF5VGltZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudERpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50TGVmdDogbnVsbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGU6IDAsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgICRkb3RzOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpc3RXaWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBsaXN0SGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIGxvYWRJbmRleDogMCxcbiAgICAgICAgICAgICAgICAkbmV4dEFycm93OiBudWxsLFxuICAgICAgICAgICAgICAgICRwcmV2QXJyb3c6IG51bGwsXG4gICAgICAgICAgICAgICAgc2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzbGlkZUNvdW50OiBudWxsLFxuICAgICAgICAgICAgICAgIHNsaWRlV2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgJHNsaWRlVHJhY2s6IG51bGwsXG4gICAgICAgICAgICAgICAgJHNsaWRlczogbnVsbCxcbiAgICAgICAgICAgICAgICBzbGlkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzbGlkZU9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBzd2lwZUxlZnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgc3dpcGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJGxpc3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgdG91Y2hPYmplY3Q6IHt9LFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybXNFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1bnNsaWNrZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkLmV4dGVuZChfLCBfLmluaXRpYWxzKTtcblxuICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID0gbnVsbDtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy5hbmltUHJvcCA9IG51bGw7XG4gICAgICAgICAgICBfLmJyZWFrcG9pbnRzID0gW107XG4gICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5ncyA9IFtdO1xuICAgICAgICAgICAgXy5jc3NUcmFuc2l0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgXy5mb2N1c3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXy5oaWRkZW4gPSAnaGlkZGVuJztcbiAgICAgICAgICAgIF8ucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIF8ucG9zaXRpb25Qcm9wID0gbnVsbDtcbiAgICAgICAgICAgIF8ucmVzcG9uZFRvID0gbnVsbDtcbiAgICAgICAgICAgIF8ucm93Q291bnQgPSAxO1xuICAgICAgICAgICAgXy5zaG91bGRDbGljayA9IHRydWU7XG4gICAgICAgICAgICBfLiRzbGlkZXIgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBudWxsO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gbnVsbDtcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgXy53aW5kb3dXaWR0aCA9IDA7XG4gICAgICAgICAgICBfLndpbmRvd1RpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgZGF0YVNldHRpbmdzID0gJChlbGVtZW50KS5kYXRhKCdzbGljaycpIHx8IHt9O1xuXG4gICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5kZWZhdWx0cywgc2V0dGluZ3MsIGRhdGFTZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcblxuICAgICAgICAgICAgXy5vcmlnaW5hbFNldHRpbmdzID0gXy5vcHRpb25zO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50Lm1vekhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBfLmhpZGRlbiA9ICdtb3pIaWRkZW4nO1xuICAgICAgICAgICAgICAgIF8udmlzaWJpbGl0eUNoYW5nZSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBfLmhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xuICAgICAgICAgICAgICAgIF8udmlzaWJpbGl0eUNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5hdXRvUGxheSA9ICQucHJveHkoXy5hdXRvUGxheSwgXyk7XG4gICAgICAgICAgICBfLmF1dG9QbGF5Q2xlYXIgPSAkLnByb3h5KF8uYXV0b1BsYXlDbGVhciwgXyk7XG4gICAgICAgICAgICBfLmF1dG9QbGF5SXRlcmF0b3IgPSAkLnByb3h5KF8uYXV0b1BsYXlJdGVyYXRvciwgXyk7XG4gICAgICAgICAgICBfLmNoYW5nZVNsaWRlID0gJC5wcm94eShfLmNoYW5nZVNsaWRlLCBfKTtcbiAgICAgICAgICAgIF8uY2xpY2tIYW5kbGVyID0gJC5wcm94eShfLmNsaWNrSGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLnNlbGVjdEhhbmRsZXIgPSAkLnByb3h5KF8uc2VsZWN0SGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLnNldFBvc2l0aW9uID0gJC5wcm94eShfLnNldFBvc2l0aW9uLCBfKTtcbiAgICAgICAgICAgIF8uc3dpcGVIYW5kbGVyID0gJC5wcm94eShfLnN3aXBlSGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLmRyYWdIYW5kbGVyID0gJC5wcm94eShfLmRyYWdIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8ua2V5SGFuZGxlciA9ICQucHJveHkoXy5rZXlIYW5kbGVyLCBfKTtcblxuICAgICAgICAgICAgXy5pbnN0YW5jZVVpZCA9IGluc3RhbmNlVWlkKys7XG5cbiAgICAgICAgICAgIC8vIEEgc2ltcGxlIHdheSB0byBjaGVjayBmb3IgSFRNTCBzdHJpbmdzXG4gICAgICAgICAgICAvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAobXVzdCBzdGFydCB3aXRoIDwpXG4gICAgICAgICAgICAvLyBFeHRyYWN0ZWQgZnJvbSBqUXVlcnkgdjEuMTEgc291cmNlXG4gICAgICAgICAgICBfLmh0bWxFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qKSQvO1xuXG5cbiAgICAgICAgICAgIF8ucmVnaXN0ZXJCcmVha3BvaW50cygpO1xuICAgICAgICAgICAgXy5pbml0KHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU2xpY2s7XG5cbiAgICB9KCkpO1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFjdGl2YXRlQURBID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1hY3RpdmUnKS5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICdmYWxzZSdcbiAgICAgICAgfSkuZmluZCgnYSwgaW5wdXQsIGJ1dHRvbiwgc2VsZWN0JykuYXR0cih7XG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFkZFNsaWRlID0gU2xpY2sucHJvdG90eXBlLnNsaWNrQWRkID0gZnVuY3Rpb24obWFya3VwLCBpbmRleCwgYWRkQmVmb3JlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGFkZEJlZm9yZSA9IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCB8fCAoaW5kZXggPj0gXy5zbGlkZUNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBfLiRzbGlkZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhZGRCZWZvcmUpIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuaW5zZXJ0QmVmb3JlKF8uJHNsaWRlcy5lcShpbmRleCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuaW5zZXJ0QWZ0ZXIoXy4kc2xpZGVzLmVxKGluZGV4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWRkQmVmb3JlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLnByZXBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmFwcGVuZChfLiRzbGlkZXMpO1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBpbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlc0NhY2hlID0gXy4kc2xpZGVzO1xuXG4gICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFuaW1hdGVIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMSAmJiBfLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgJiYgXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldEhlaWdodCA9IF8uJHNsaWRlcy5lcShfLmN1cnJlbnRTbGlkZSkub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICBfLiRsaXN0LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogdGFyZ2V0SGVpZ2h0XG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hbmltYXRlU2xpZGUgPSBmdW5jdGlvbih0YXJnZXRMZWZ0LCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBhbmltUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYW5pbWF0ZUhlaWdodCgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlICYmIF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAtdGFyZ2V0TGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXy50cmFuc2Zvcm1zRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldExlZnRcbiAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRMZWZ0ID0gLShfLmN1cnJlbnRMZWZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCh7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1TdGFydDogXy5jdXJyZW50TGVmdFxuICAgICAgICAgICAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBhbmltU3RhcnQ6IHRhcmdldExlZnRcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBfLm9wdGlvbnMuc3BlZWQsXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZzogXy5vcHRpb25zLmVhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24obm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3cgPSBNYXRoLmNlaWwobm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZSgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm93ICsgJ3B4LCAwcHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKDBweCwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm93ICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLmFwcGx5VHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSBNYXRoLmNlaWwodGFyZ2V0TGVmdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoJyArIHRhcmdldExlZnQgKyAncHgsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZTNkKDBweCwnICsgdGFyZ2V0TGVmdCArICdweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXy5kaXNhYmxlVHJhbnNpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXROYXZUYXJnZXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBhc05hdkZvciA9IF8ub3B0aW9ucy5hc05hdkZvcjtcblxuICAgICAgICBpZiAoIGFzTmF2Rm9yICYmIGFzTmF2Rm9yICE9PSBudWxsICkge1xuICAgICAgICAgICAgYXNOYXZGb3IgPSAkKGFzTmF2Rm9yKS5ub3QoXy4kc2xpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc05hdkZvcjtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXNOYXZGb3IgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gXy5nZXROYXZUYXJnZXQoKTtcblxuICAgICAgICBpZiAoIGFzTmF2Rm9yICE9PSBudWxsICYmIHR5cGVvZiBhc05hdkZvciA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgICAgICBhc05hdkZvci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLnNsaWNrKCdnZXRTbGljaycpO1xuICAgICAgICAgICAgICAgIGlmKCF0YXJnZXQudW5zbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zbGlkZUhhbmRsZXIoaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFwcGx5VHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHNsaWRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdHJhbnNpdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb25bXy50cmFuc2l0aW9uVHlwZV0gPSBfLnRyYW5zZm9ybVR5cGUgKyAnICcgKyBfLm9wdGlvbnMuc3BlZWQgKyAnbXMgJyArIF8ub3B0aW9ucy5jc3NFYXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9ICdvcGFjaXR5ICcgKyBfLm9wdGlvbnMuc3BlZWQgKyAnbXMgJyArIF8ub3B0aW9ucy5jc3NFYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGUpLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hdXRvUGxheSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcblxuICAgICAgICBpZiAoIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG4gICAgICAgICAgICBfLmF1dG9QbGF5VGltZXIgPSBzZXRJbnRlcnZhbCggXy5hdXRvUGxheUl0ZXJhdG9yLCBfLm9wdGlvbnMuYXV0b3BsYXlTcGVlZCApO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5Q2xlYXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uYXV0b1BsYXlUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfLmF1dG9QbGF5VGltZXIpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5SXRlcmF0b3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBzbGlkZVRvID0gXy5jdXJyZW50U2xpZGUgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgaWYgKCAhXy5wYXVzZWQgJiYgIV8uaW50ZXJydXB0ZWQgJiYgIV8uZm9jdXNzZWQgKSB7XG5cbiAgICAgICAgICAgIGlmICggXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSApIHtcblxuICAgICAgICAgICAgICAgIGlmICggXy5kaXJlY3Rpb24gPT09IDEgJiYgKCBfLmN1cnJlbnRTbGlkZSArIDEgKSA9PT0gKCBfLnNsaWRlQ291bnQgLSAxICkpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kaXJlY3Rpb24gPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCBfLmRpcmVjdGlvbiA9PT0gMCApIHtcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZVRvID0gXy5jdXJyZW50U2xpZGUgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBfLmN1cnJlbnRTbGlkZSAtIDEgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggc2xpZGVUbyApO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRBcnJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdyA9ICQoXy5vcHRpb25zLnByZXZBcnJvdykuYWRkQ2xhc3MoJ3NsaWNrLWFycm93Jyk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cgPSAkKF8ub3B0aW9ucy5uZXh0QXJyb3cpLmFkZENsYXNzKCdzbGljay1hcnJvdycpO1xuXG4gICAgICAgICAgICBpZiggXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2staGlkZGVuJykucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gdGFiaW5kZXgnKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWhpZGRlbicpLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIHRhYmluZGV4Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5wcmV2QXJyb3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5wcmVwZW5kVG8oXy5vcHRpb25zLmFwcGVuZEFycm93cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMubmV4dEFycm93KSkge1xuICAgICAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYXBwZW5kVG8oXy5vcHRpb25zLmFwcGVuZEFycm93cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5hZGQoIF8uJG5leHRBcnJvdyApXG5cbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkRG90cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGksIGRvdDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLWRvdHRlZCcpO1xuXG4gICAgICAgICAgICBkb3QgPSAkKCc8dWwgLz4nKS5hZGRDbGFzcyhfLm9wdGlvbnMuZG90c0NsYXNzKTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8PSBfLmdldERvdENvdW50KCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGRvdC5hcHBlbmQoJCgnPGxpIC8+JykuYXBwZW5kKF8ub3B0aW9ucy5jdXN0b21QYWdpbmcuY2FsbCh0aGlzLCBfLCBpKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRkb3RzID0gZG90LmFwcGVuZFRvKF8ub3B0aW9ucy5hcHBlbmREb3RzKTtcblxuICAgICAgICAgICAgXy4kZG90cy5maW5kKCdsaScpLmZpcnN0KCkuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRPdXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVzID1cbiAgICAgICAgICAgIF8uJHNsaWRlclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbiggXy5vcHRpb25zLnNsaWRlICsgJzpub3QoLnNsaWNrLWNsb25lZCknKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stc2xpZGUnKTtcblxuICAgICAgICBfLnNsaWRlQ291bnQgPSBfLiRzbGlkZXMubGVuZ3RoO1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBpbmRleClcbiAgICAgICAgICAgICAgICAuZGF0YSgnb3JpZ2luYWxTdHlsaW5nJywgJChlbGVtZW50KS5hdHRyKCdzdHlsZScpIHx8ICcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVyLmFkZENsYXNzKCdzbGljay1zbGlkZXInKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrID0gKF8uc2xpZGVDb3VudCA9PT0gMCkgP1xuICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cInNsaWNrLXRyYWNrXCIvPicpLmFwcGVuZFRvKF8uJHNsaWRlcikgOlxuICAgICAgICAgICAgXy4kc2xpZGVzLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGljay10cmFja1wiLz4nKS5wYXJlbnQoKTtcblxuICAgICAgICBfLiRsaXN0ID0gXy4kc2xpZGVUcmFjay53cmFwKFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzbGljay1saXN0XCIvPicpLnBhcmVudCgpO1xuICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcygnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSB8fCBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnaW1nW2RhdGEtbGF6eV0nLCBfLiRzbGlkZXIpLm5vdCgnW3NyY10nKS5hZGRDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgICAgIF8uc2V0dXBJbmZpbml0ZSgpO1xuXG4gICAgICAgIF8uYnVpbGRBcnJvd3MoKTtcblxuICAgICAgICBfLmJ1aWxkRG90cygpO1xuXG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuXG5cbiAgICAgICAgXy5zZXRTbGlkZUNsYXNzZXModHlwZW9mIF8uY3VycmVudFNsaWRlID09PSAnbnVtYmVyJyA/IF8uY3VycmVudFNsaWRlIDogMCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kcmFnZ2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJGxpc3QuYWRkQ2xhc3MoJ2RyYWdnYWJsZScpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkUm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgYSwgYiwgYywgbmV3U2xpZGVzLCBudW1PZlNsaWRlcywgb3JpZ2luYWxTbGlkZXMsc2xpZGVzUGVyU2VjdGlvbjtcblxuICAgICAgICBuZXdTbGlkZXMgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIG9yaWdpbmFsU2xpZGVzID0gXy4kc2xpZGVyLmNoaWxkcmVuKCk7XG5cbiAgICAgICAgaWYoXy5vcHRpb25zLnJvd3MgPiAwKSB7XG5cbiAgICAgICAgICAgIHNsaWRlc1BlclNlY3Rpb24gPSBfLm9wdGlvbnMuc2xpZGVzUGVyUm93ICogXy5vcHRpb25zLnJvd3M7XG4gICAgICAgICAgICBudW1PZlNsaWRlcyA9IE1hdGguY2VpbChcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFNsaWRlcy5sZW5ndGggLyBzbGlkZXNQZXJTZWN0aW9uXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmb3IoYSA9IDA7IGEgPCBudW1PZlNsaWRlczsgYSsrKXtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmb3IoYiA9IDA7IGIgPCBfLm9wdGlvbnMucm93czsgYisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGMgPSAwOyBjIDwgXy5vcHRpb25zLnNsaWRlc1BlclJvdzsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gKGEgKiBzbGlkZXNQZXJTZWN0aW9uICsgKChiICogXy5vcHRpb25zLnNsaWRlc1BlclJvdykgKyBjKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTbGlkZXMuZ2V0KHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQob3JpZ2luYWxTbGlkZXMuZ2V0KHRhcmdldCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld1NsaWRlcy5hcHBlbmRDaGlsZChzbGlkZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5lbXB0eSgpLmFwcGVuZChuZXdTbGlkZXMpO1xuICAgICAgICAgICAgXy4kc2xpZGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5jaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6KDEwMCAvIF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cpICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGVja1Jlc3BvbnNpdmUgPSBmdW5jdGlvbihpbml0aWFsLCBmb3JjZVVwZGF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJyZWFrcG9pbnQsIHRhcmdldEJyZWFrcG9pbnQsIHJlc3BvbmRUb1dpZHRoLCB0cmlnZ2VyQnJlYWtwb2ludCA9IGZhbHNlO1xuICAgICAgICB2YXIgc2xpZGVyV2lkdGggPSBfLiRzbGlkZXIud2lkdGgoKTtcbiAgICAgICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgJCh3aW5kb3cpLndpZHRoKCk7XG5cbiAgICAgICAgaWYgKF8ucmVzcG9uZFRvID09PSAnd2luZG93Jykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLnJlc3BvbmRUbyA9PT0gJ3NsaWRlcicpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gc2xpZGVyV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5yZXNwb25kVG8gPT09ICdtaW4nKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IE1hdGgubWluKHdpbmRvd1dpZHRoLCBzbGlkZXJXaWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5yZXNwb25zaXZlICYmXG4gICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGggJiZcbiAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnQgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGJyZWFrcG9pbnQgaW4gXy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRzLmhhc093blByb3BlcnR5KGJyZWFrcG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLm9yaWdpbmFsU2V0dGluZ3MubW9iaWxlRmlyc3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uZFRvV2lkdGggPCBfLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludCA9IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uZFRvV2lkdGggPiBfLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludCA9IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uYWN0aXZlQnJlYWtwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0QnJlYWtwb2ludCAhPT0gXy5hY3RpdmVCcmVha3BvaW50IHx8IGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmFjdGl2ZUJyZWFrcG9pbnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5icmVha3BvaW50U2V0dGluZ3NbdGFyZ2V0QnJlYWtwb2ludF0gPT09ICd1bnNsaWNrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8udW5zbGljayh0YXJnZXRCcmVha3BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zID0gJC5leHRlbmQoe30sIF8ub3JpZ2luYWxTZXR0aW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50U2V0dGluZ3NbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLnJlZnJlc2goaW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLmFjdGl2ZUJyZWFrcG9pbnQgPSB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5icmVha3BvaW50U2V0dGluZ3NbdGFyZ2V0QnJlYWtwb2ludF0gPT09ICd1bnNsaWNrJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy51bnNsaWNrKHRhcmdldEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zID0gJC5leHRlbmQoe30sIF8ub3JpZ2luYWxTZXR0aW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnJlZnJlc2goaW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckJyZWFrcG9pbnQgPSB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uYWN0aXZlQnJlYWtwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBfLmFjdGl2ZUJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSBfLm9yaWdpbmFsU2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXy5yZWZyZXNoKGluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvbmx5IHRyaWdnZXIgYnJlYWtwb2ludHMgZHVyaW5nIGFuIGFjdHVhbCBicmVhay4gbm90IG9uIGluaXRpYWxpemUuXG4gICAgICAgICAgICBpZiggIWluaXRpYWwgJiYgdHJpZ2dlckJyZWFrcG9pbnQgIT09IGZhbHNlICkge1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdicmVha3BvaW50JywgW18sIHRyaWdnZXJCcmVha3BvaW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hhbmdlU2xpZGUgPSBmdW5jdGlvbihldmVudCwgZG9udEFuaW1hdGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICAgIGluZGV4T2Zmc2V0LCBzbGlkZU9mZnNldCwgdW5ldmVuT2Zmc2V0O1xuXG4gICAgICAgIC8vIElmIHRhcmdldCBpcyBhIGxpbmssIHByZXZlbnQgZGVmYXVsdCBhY3Rpb24uXG4gICAgICAgIGlmKCR0YXJnZXQuaXMoJ2EnKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRhcmdldCBpcyBub3QgdGhlIDxsaT4gZWxlbWVudCAoaWU6IGEgY2hpbGQpLCBmaW5kIHRoZSA8bGk+LlxuICAgICAgICBpZighJHRhcmdldC5pcygnbGknKSkge1xuICAgICAgICAgICAgJHRhcmdldCA9ICR0YXJnZXQuY2xvc2VzdCgnbGknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVuZXZlbk9mZnNldCA9IChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApO1xuICAgICAgICBpbmRleE9mZnNldCA9IHVuZXZlbk9mZnNldCA/IDAgOiAoXy5zbGlkZUNvdW50IC0gXy5jdXJyZW50U2xpZGUpICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YS5tZXNzYWdlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgICAgICAgICBzbGlkZU9mZnNldCA9IGluZGV4T2Zmc2V0ID09PSAwID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIGluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKF8uY3VycmVudFNsaWRlIC0gc2xpZGVPZmZzZXQsIGZhbHNlLCBkb250QW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICAgICAgICBzbGlkZU9mZnNldCA9IGluZGV4T2Zmc2V0ID09PSAwID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoXy5jdXJyZW50U2xpZGUgKyBzbGlkZU9mZnNldCwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2luZGV4JzpcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBldmVudC5kYXRhLmluZGV4ID09PSAwID8gMCA6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXggfHwgJHRhcmdldC5pbmRleCgpICogXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoXy5jaGVja05hdmlnYWJsZShpbmRleCksIGZhbHNlLCBkb250QW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5jaGlsZHJlbigpLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoZWNrTmF2aWdhYmxlID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBuYXZpZ2FibGVzLCBwcmV2TmF2aWdhYmxlO1xuXG4gICAgICAgIG5hdmlnYWJsZXMgPSBfLmdldE5hdmlnYWJsZUluZGV4ZXMoKTtcbiAgICAgICAgcHJldk5hdmlnYWJsZSA9IDA7XG4gICAgICAgIGlmIChpbmRleCA+IG5hdmlnYWJsZXNbbmF2aWdhYmxlcy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgaW5kZXggPSBuYXZpZ2FibGVzW25hdmlnYWJsZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBuIGluIG5hdmlnYWJsZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBuYXZpZ2FibGVzW25dKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gcHJldk5hdmlnYWJsZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZOYXZpZ2FibGUgPSBuYXZpZ2FibGVzW25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xlYW5VcEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgJiYgXy4kZG90cyAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAkKCdsaScsIF8uJGRvdHMpXG4gICAgICAgICAgICAgICAgLm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKVxuICAgICAgICAgICAgICAgIC5vZmYoJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSlcbiAgICAgICAgICAgICAgICAub2ZmKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kZG90cy5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVyLm9mZignZm9jdXMuc2xpY2sgYmx1ci5zbGljaycpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uJHByZXZBcnJvdyAmJiBfLiRwcmV2QXJyb3cub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdyAmJiBfLiRwcmV2QXJyb3cub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2hzdGFydC5zbGljayBtb3VzZWRvd24uc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaG1vdmUuc2xpY2sgbW91c2Vtb3ZlLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2hlbmQuc2xpY2sgbW91c2V1cC5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNoY2FuY2VsLnNsaWNrIG1vdXNlbGVhdmUuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG5cbiAgICAgICAgXy4kbGlzdC5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jbGlja0hhbmRsZXIpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZihfLnZpc2liaWxpdHlDaGFuZ2UsIF8udmlzaWJpbGl0eSk7XG5cbiAgICAgICAgXy5jbGVhblVwU2xpZGVFdmVudHMoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJGxpc3Qub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPblNlbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJChfLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9mZignY2xpY2suc2xpY2snLCBfLnNlbGVjdEhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZignb3JpZW50YXRpb25jaGFuZ2Uuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8ub3JpZW50YXRpb25DaGFuZ2UpO1xuXG4gICAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5yZXNpemUpO1xuXG4gICAgICAgICQoJ1tkcmFnZ2FibGUhPXRydWVdJywgXy4kc2xpZGVUcmFjaykub2ZmKCdkcmFnc3RhcnQnLCBfLnByZXZlbnREZWZhdWx0KTtcblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdsb2FkLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnNldFBvc2l0aW9uKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xlYW5VcFNsaWRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpO1xuICAgICAgICBfLiRsaXN0Lm9mZignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsZWFuVXBSb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBvcmlnaW5hbFNsaWRlcztcblxuICAgICAgICBpZihfLm9wdGlvbnMucm93cyA+IDApIHtcbiAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzID0gXy4kc2xpZGVzLmNoaWxkcmVuKCkuY2hpbGRyZW4oKTtcbiAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICBfLiRzbGlkZXIuZW1wdHkoKS5hcHBlbmQob3JpZ2luYWxTbGlkZXMpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLnNob3VsZENsaWNrID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKHJlZnJlc2gpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hdXRvUGxheUNsZWFyKCk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuXG4gICAgICAgIF8uY2xlYW5VcEV2ZW50cygpO1xuXG4gICAgICAgICQoJy5zbGljay1jbG9uZWQnLCBfLiRzbGlkZXIpLmRldGFjaCgpO1xuXG4gICAgICAgIGlmIChfLiRkb3RzKSB7XG4gICAgICAgICAgICBfLiRkb3RzLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLiRwcmV2QXJyb3cgJiYgXy4kcHJldkFycm93Lmxlbmd0aCApIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93XG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCBzbGljay1hcnJvdyBzbGljay1oaWRkZW4nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiBhcmlhLWRpc2FibGVkIHRhYmluZGV4JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywnJyk7XG5cbiAgICAgICAgICAgIGlmICggXy5odG1sRXhwci50ZXN0KCBfLm9wdGlvbnMucHJldkFycm93ICkpIHtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8uJG5leHRBcnJvdyAmJiBfLiRuZXh0QXJyb3cubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLiRuZXh0QXJyb3dcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkIHNsaWNrLWFycm93IHNsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXgnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCcnKTtcblxuICAgICAgICAgICAgaWYgKCBfLmh0bWxFeHByLnRlc3QoIF8ub3B0aW9ucy5uZXh0QXJyb3cgKSkge1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKF8uJHNsaWRlcykge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlIHNsaWNrLWFjdGl2ZSBzbGljay1jZW50ZXIgc2xpY2stdmlzaWJsZSBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXNsaWNrLWluZGV4JylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3N0eWxlJywgJCh0aGlzKS5kYXRhKCdvcmlnaW5hbFN0eWxpbmcnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kbGlzdC5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVyLmFwcGVuZChfLiRzbGlkZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5jbGVhblVwUm93cygpO1xuXG4gICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stc2xpZGVyJyk7XG4gICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1kb3R0ZWQnKTtcblxuICAgICAgICBfLnVuc2xpY2tlZCA9IHRydWU7XG5cbiAgICAgICAgaWYoIXJlZnJlc2gpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdkZXN0cm95JywgW19dKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5kaXNhYmxlVHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHNsaWRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdHJhbnNpdGlvbiA9IHt9O1xuXG4gICAgICAgIHRyYW5zaXRpb25bXy50cmFuc2l0aW9uVHlwZV0gPSAnJztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZSkuY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZhZGVTbGlkZSA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgXy5hcHBseVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBfLmRpc2FibGVUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmFkZVNsaWRlT3V0ID0gZnVuY3Rpb24oc2xpZGVJbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMlxuICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLmFwcGx5VHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZpbHRlclNsaWRlcyA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0ZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlcikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoZmlsdGVyICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc0NhY2hlID0gXy4kc2xpZGVzO1xuXG4gICAgICAgICAgICBfLnVubG9hZCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc0NhY2hlLmZpbHRlcihmaWx0ZXIpLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuXG4gICAgICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZm9jdXNIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlclxuICAgICAgICAgICAgLm9mZignZm9jdXMuc2xpY2sgYmx1ci5zbGljaycpXG4gICAgICAgICAgICAub24oJ2ZvY3VzLnNsaWNrIGJsdXIuc2xpY2snLCAnKicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdmFyICRzZiA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggXy5vcHRpb25zLnBhdXNlT25Gb2N1cyApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb2N1c3NlZCA9ICRzZi5pcygnOmZvY3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDApO1xuXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0Q3VycmVudCA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0N1cnJlbnRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF8uY3VycmVudFNsaWRlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXREb3RDb3VudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICB2YXIgYnJlYWtQb2ludCA9IDA7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdmFyIHBhZ2VyUXR5ID0gMDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgKytwYWdlclF0eTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGJyZWFrUG9pbnQgPCBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgKytwYWdlclF0eTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcGFnZXJRdHkgPSBfLnNsaWRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSBpZighXy5vcHRpb25zLmFzTmF2Rm9yKSB7XG4gICAgICAgICAgICBwYWdlclF0eSA9IDEgKyBNYXRoLmNlaWwoKF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIC8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKGJyZWFrUG9pbnQgPCBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBjb3VudGVyICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhZ2VyUXR5IC0gMTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0TGVmdCA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRMZWZ0LFxuICAgICAgICAgICAgdmVydGljYWxIZWlnaHQsXG4gICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9IDAsXG4gICAgICAgICAgICB0YXJnZXRTbGlkZSxcbiAgICAgICAgICAgIGNvZWY7XG5cbiAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgIHZlcnRpY2FsSGVpZ2h0ID0gXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKF8uc2xpZGVXaWR0aCAqIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpICogLTE7XG4gICAgICAgICAgICAgICAgY29lZiA9IC0xXG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSB0cnVlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2VmID0gLTEuNTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2VmID0gLTJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICh2ZXJ0aWNhbEhlaWdodCAqIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpICogY29lZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA+IF8uc2xpZGVDb3VudCAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ID4gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gKHNsaWRlSW5kZXggLSBfLnNsaWRlQ291bnQpKSAqIF8uc2xpZGVXaWR0aCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gKHNsaWRlSW5kZXggLSBfLnNsaWRlQ291bnQpKSAqIHZlcnRpY2FsSGVpZ2h0KSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSAqIF8uc2xpZGVXaWR0aCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpICogdmVydGljYWxIZWlnaHQpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPiBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgLSBfLnNsaWRlQ291bnQpICogXy5zbGlkZVdpZHRoO1xuICAgICAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgLSBfLnNsaWRlQ291bnQpICogdmVydGljYWxIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpKSAvIDIpIC0gKChfLnNsaWRlV2lkdGggKiBfLnNsaWRlQ291bnQpIC8gMik7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ICs9IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpIC0gXy5zbGlkZVdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgKz0gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICgoc2xpZGVJbmRleCAqIF8uc2xpZGVXaWR0aCkgKiAtMSkgKyBfLnNsaWRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICgoc2xpZGVJbmRleCAqIHZlcnRpY2FsSGVpZ2h0KSAqIC0xKSArIHZlcnRpY2FsT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyB8fCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFNsaWRlWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy4kc2xpZGVUcmFjay53aWR0aCgpIC0gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAtIHRhcmdldFNsaWRlLndpZHRoKCkpICogLTE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IHRhcmdldFNsaWRlWzBdID8gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAqIC0xIDogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IHx8IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldFNsaWRlWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uJHNsaWRlVHJhY2sud2lkdGgoKSAtIHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgLSB0YXJnZXRTbGlkZS53aWR0aCgpKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9ICAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IHRhcmdldFNsaWRlWzBdID8gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAqIC0xIDogMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ICs9IChfLiRsaXN0LndpZHRoKCkgLSB0YXJnZXRTbGlkZS5vdXRlcldpZHRoKCkpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRMZWZ0O1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRPcHRpb24gPSBTbGljay5wcm90b3R5cGUuc2xpY2tHZXRPcHRpb24gPSBmdW5jdGlvbihvcHRpb24pIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIF8ub3B0aW9uc1tvcHRpb25dO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXROYXZpZ2FibGVJbmRleGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYnJlYWtQb2ludCA9IDAsXG4gICAgICAgICAgICBjb3VudGVyID0gMCxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXSxcbiAgICAgICAgICAgIG1heDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbWF4ID0gXy5zbGlkZUNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWtQb2ludCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAqIC0xO1xuICAgICAgICAgICAgY291bnRlciA9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAqIC0xO1xuICAgICAgICAgICAgbWF4ID0gXy5zbGlkZUNvdW50ICogMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgbWF4KSB7XG4gICAgICAgICAgICBpbmRleGVzLnB1c2goYnJlYWtQb2ludCk7XG4gICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgIGNvdW50ZXIgKz0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4ZXM7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldFNsaWNrID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldFNsaWRlQ291bnQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBzbGlkZXNUcmF2ZXJzZWQsIHN3aXBlZFNsaWRlLCBjZW50ZXJPZmZzZXQ7XG5cbiAgICAgICAgY2VudGVyT2Zmc2V0ID0gXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgPyBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKSA6IDA7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLXNsaWRlJykuZWFjaChmdW5jdGlvbihpbmRleCwgc2xpZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGUub2Zmc2V0TGVmdCAtIGNlbnRlck9mZnNldCArICgkKHNsaWRlKS5vdXRlcldpZHRoKCkgLyAyKSA+IChfLnN3aXBlTGVmdCAqIC0xKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2lwZWRTbGlkZSA9IHNsaWRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNsaWRlc1RyYXZlcnNlZCA9IE1hdGguYWJzKCQoc3dpcGVkU2xpZGUpLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKSAtIF8uY3VycmVudFNsaWRlKSB8fCAxO1xuXG4gICAgICAgICAgICByZXR1cm4gc2xpZGVzVHJhdmVyc2VkO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdvVG8gPSBTbGljay5wcm90b3R5cGUuc2xpY2tHb1RvID0gZnVuY3Rpb24oc2xpZGUsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHBhcnNlSW50KHNsaWRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkb250QW5pbWF0ZSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihjcmVhdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoISQoXy4kc2xpZGVyKS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xuXG4gICAgICAgICAgICAkKF8uJHNsaWRlcikuYWRkQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJyk7XG5cbiAgICAgICAgICAgIF8uYnVpbGRSb3dzKCk7XG4gICAgICAgICAgICBfLmJ1aWxkT3V0KCk7XG4gICAgICAgICAgICBfLnNldFByb3BzKCk7XG4gICAgICAgICAgICBfLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgXy5sb2FkU2xpZGVyKCk7XG4gICAgICAgICAgICBfLmluaXRpYWxpemVFdmVudHMoKTtcbiAgICAgICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG4gICAgICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKHRydWUpO1xuICAgICAgICAgICAgXy5mb2N1c0hhbmRsZXIoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNyZWF0aW9uKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignaW5pdCcsIFtfXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uaW5pdEFEQSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgIF8ucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0QURBID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgICAgICBudW1Eb3RHcm91cHMgPSBNYXRoLmNlaWwoXy5zbGlkZUNvdW50IC8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyksXG4gICAgICAgICAgICAgICAgdGFiQ29udHJvbEluZGV4ZXMgPSBfLmdldE5hdmlnYWJsZUluZGV4ZXMoKS5maWx0ZXIoZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodmFsID49IDApICYmICh2YWwgPCBfLnNsaWRlQ291bnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlcy5hZGQoXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stY2xvbmVkJykpLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICB9KS5maW5kKCdhLCBpbnB1dCwgYnV0dG9uLCBzZWxlY3QnKS5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5ub3QoXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stY2xvbmVkJykpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZUNvbnRyb2xJbmRleCA9IHRhYkNvbnRyb2xJbmRleGVzLmluZGV4T2YoaSk7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAncm9sZSc6ICd0YWJwYW5lbCcsXG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICdzbGljay1zbGlkZScgKyBfLmluc3RhbmNlVWlkICsgaSxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogLTFcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChzbGlkZUNvbnRyb2xJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICB2YXIgYXJpYUJ1dHRvbkNvbnRyb2wgPSAnc2xpY2stc2xpZGUtY29udHJvbCcgKyBfLmluc3RhbmNlVWlkICsgc2xpZGVDb250cm9sSW5kZXhcbiAgICAgICAgICAgICAgICAgICBpZiAoJCgnIycgKyBhcmlhQnV0dG9uQ29udHJvbCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogYXJpYUJ1dHRvbkNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kZG90cy5hdHRyKCdyb2xlJywgJ3RhYmxpc3QnKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXBwZWRTbGlkZUluZGV4ID0gdGFiQ29udHJvbEluZGV4ZXNbaV07XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAncm9sZSc6ICdwcmVzZW50YXRpb24nXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2J1dHRvbicpLmZpcnN0KCkuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3RhYicsXG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICdzbGljay1zbGlkZS1jb250cm9sJyArIF8uaW5zdGFuY2VVaWQgKyBpLFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1jb250cm9scyc6ICdzbGljay1zbGlkZScgKyBfLmluc3RhbmNlVWlkICsgbWFwcGVkU2xpZGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAoaSArIDEpICsgJyBvZiAnICsgbnVtRG90R3JvdXBzLFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSkuZXEoXy5jdXJyZW50U2xpZGUpLmZpbmQoJ2J1dHRvbicpLmF0dHIoe1xuICAgICAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAgICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgICAgICAgfSkuZW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpPV8uY3VycmVudFNsaWRlLCBtYXg9aStfLm9wdGlvbnMuc2xpZGVzVG9TaG93OyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25DaGFuZ2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShpKS5hdHRyKHsndGFiaW5kZXgnOiAnMCd9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKGkpLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy5hY3RpdmF0ZUFEQSgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0QXJyb3dFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy4kcHJldkFycm93XG4gICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycpXG4gICAgICAgICAgICAgICAub24oJ2NsaWNrLnNsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAncHJldmlvdXMnXG4gICAgICAgICAgICAgICB9LCBfLmNoYW5nZVNsaWRlKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvd1xuICAgICAgICAgICAgICAgLm9mZignY2xpY2suc2xpY2snKVxuICAgICAgICAgICAgICAgLm9uKCdjbGljay5zbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ25leHQnXG4gICAgICAgICAgICAgICB9LCBfLmNoYW5nZVNsaWRlKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93Lm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXREb3RFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICQoJ2xpJywgXy4kZG90cykub24oJ2NsaWNrLnNsaWNrJywge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbmRleCdcbiAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRkb3RzLm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMucGF1c2VPbkRvdHNIb3ZlciA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICQoJ2xpJywgXy4kZG90cylcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdFNsaWRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICggXy5vcHRpb25zLnBhdXNlT25Ib3ZlciApIHtcblxuICAgICAgICAgICAgXy4kbGlzdC5vbignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKTtcbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdGlhbGl6ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmluaXRBcnJvd0V2ZW50cygpO1xuXG4gICAgICAgIF8uaW5pdERvdEV2ZW50cygpO1xuICAgICAgICBfLmluaXRTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoc3RhcnQuc2xpY2sgbW91c2Vkb3duLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnc3RhcnQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2htb3ZlLnNsaWNrIG1vdXNlbW92ZS5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ21vdmUnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hlbmQuc2xpY2sgbW91c2V1cC5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2VuZCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaGNhbmNlbC5zbGljayBtb3VzZWxlYXZlLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnZW5kJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG5cbiAgICAgICAgXy4kbGlzdC5vbignY2xpY2suc2xpY2snLCBfLmNsaWNrSGFuZGxlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXy52aXNpYmlsaXR5Q2hhbmdlLCAkLnByb3h5KF8udmlzaWJpbGl0eSwgXykpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25TZWxlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICQoXy4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vbignY2xpY2suc2xpY2snLCBfLnNlbGVjdEhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgJC5wcm94eShfLm9yaWVudGF0aW9uQ2hhbmdlLCBfKSk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsICQucHJveHkoXy5yZXNpemUsIF8pKTtcblxuICAgICAgICAkKCdbZHJhZ2dhYmxlIT10cnVlXScsIF8uJHNsaWRlVHJhY2spLm9uKCdkcmFnc3RhcnQnLCBfLnByZXZlbnREZWZhdWx0KTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ2xvYWQuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8uc2V0UG9zaXRpb24pO1xuICAgICAgICAkKF8uc2V0UG9zaXRpb24pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0VUkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cuc2hvdygpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnNob3coKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kZG90cy5zaG93KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5rZXlIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgICAvL0RvbnQgc2xpZGUgaWYgdGhlIGN1cnNvciBpcyBpbnNpZGUgdGhlIGZvcm0gZmllbGRzIGFuZCBhcnJvdyBrZXlzIGFyZSBwcmVzc2VkXG4gICAgICAgIGlmKCFldmVudC50YXJnZXQudGFnTmFtZS5tYXRjaCgnVEVYVEFSRUF8SU5QVVR8U0VMRUNUJykpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyAmJiBfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBfLm9wdGlvbnMucnRsID09PSB0cnVlID8gJ25leHQnIDogICdwcmV2aW91cydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSAmJiBfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBfLm9wdGlvbnMucnRsID09PSB0cnVlID8gJ3ByZXZpb3VzJyA6ICduZXh0J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUubGF6eUxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBsb2FkUmFuZ2UsIGNsb25lUmFuZ2UsIHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRJbWFnZXMoaW1hZ2VzU2NvcGUpIHtcblxuICAgICAgICAgICAgJCgnaW1nW2RhdGEtbGF6eV0nLCBpbWFnZXNTY29wZSkuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU291cmNlID0gJCh0aGlzKS5hdHRyKCdkYXRhLWxhenknKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTcmNTZXQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc3Jjc2V0JyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU2l6ZXMgID0gJCh0aGlzKS5hdHRyKCdkYXRhLXNpemVzJykgfHwgXy4kc2xpZGVyLmF0dHIoJ2RhdGEtc2l6ZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7IG9wYWNpdHk6IDAgfSwgMTAwLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZVNyY1NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyY3NldCcsIGltYWdlU3JjU2V0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NpemVzJywgaW1hZ2VTaXplcyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGltYWdlU291cmNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMjAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtbGF6eSBkYXRhLXNyY3NldCBkYXRhLXNpemVzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkZWQnLCBbXywgaW1hZ2UsIGltYWdlU291cmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCAnZGF0YS1sYXp5JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdzbGljay1sb2FkaW5nJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdzbGljay1sYXp5bG9hZC1lcnJvcicgKTtcblxuICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRFcnJvcicsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkLnNyYyA9IGltYWdlU291cmNlO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydCA9IF8uY3VycmVudFNsaWRlICsgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSk7XG4gICAgICAgICAgICAgICAgcmFuZ2VFbmQgPSByYW5nZVN0YXJ0ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBNYXRoLm1heCgwLCBfLmN1cnJlbnRTbGlkZSAtIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpKTtcbiAgICAgICAgICAgICAgICByYW5nZUVuZCA9IDIgKyAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKSArIF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IF8ub3B0aW9ucy5pbmZpbml0ZSA/IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBfLmN1cnJlbnRTbGlkZSA6IF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSBNYXRoLmNlaWwocmFuZ2VTdGFydCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlU3RhcnQgPiAwKSByYW5nZVN0YXJ0LS07XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlRW5kIDw9IF8uc2xpZGVDb3VudCkgcmFuZ2VFbmQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRSYW5nZSA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stc2xpZGUnKS5zbGljZShyYW5nZVN0YXJ0LCByYW5nZUVuZCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ2FudGljaXBhdGVkJykge1xuICAgICAgICAgICAgdmFyIHByZXZTbGlkZSA9IHJhbmdlU3RhcnQgLSAxLFxuICAgICAgICAgICAgICAgIG5leHRTbGlkZSA9IHJhbmdlRW5kLFxuICAgICAgICAgICAgICAgICRzbGlkZXMgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldlNsaWRlIDwgMCkgcHJldlNsaWRlID0gXy5zbGlkZUNvdW50IC0gMTtcbiAgICAgICAgICAgICAgICBsb2FkUmFuZ2UgPSBsb2FkUmFuZ2UuYWRkKCRzbGlkZXMuZXEocHJldlNsaWRlKSk7XG4gICAgICAgICAgICAgICAgbG9hZFJhbmdlID0gbG9hZFJhbmdlLmFkZCgkc2xpZGVzLmVxKG5leHRTbGlkZSkpO1xuICAgICAgICAgICAgICAgIHByZXZTbGlkZS0tO1xuICAgICAgICAgICAgICAgIG5leHRTbGlkZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZEltYWdlcyhsb2FkUmFuZ2UpO1xuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgY2xvbmVSYW5nZSA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stc2xpZGUnKTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgY2xvbmVSYW5nZSA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stY2xvbmVkJykuc2xpY2UoMCwgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uY3VycmVudFNsaWRlID09PSAwKSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1jbG9uZWQnKS5zbGljZShfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICogLTEpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5sb2FkU2xpZGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyh7XG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgICAgIF8uaW5pdFVJKCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ3Byb2dyZXNzaXZlJykge1xuICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUubmV4dCA9IFNsaWNrLnByb3RvdHlwZS5zbGlja05leHQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ25leHQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5vcmllbnRhdGlvbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSgpO1xuICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnBhdXNlID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUGF1c2UgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hdXRvUGxheUNsZWFyKCk7XG4gICAgICAgIF8ucGF1c2VkID0gdHJ1ZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucGxheSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1BsYXkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICBfLm9wdGlvbnMuYXV0b3BsYXkgPSB0cnVlO1xuICAgICAgICBfLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBfLmZvY3Vzc2VkID0gZmFsc2U7XG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucG9zdFNsaWRlID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYoICFfLnVuc2xpY2tlZCApIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2FmdGVyQ2hhbmdlJywgW18sIGluZGV4XSk7XG5cbiAgICAgICAgICAgIF8uYW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuICAgICAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5pbml0QURBKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRjdXJyZW50U2xpZGUgPSAkKF8uJHNsaWRlcy5nZXQoXy5jdXJyZW50U2xpZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5hdHRyKCd0YWJpbmRleCcsIDApLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucHJldiA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1ByZXYgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnByb2dyZXNzaXZlTGF6eUxvYWQgPSBmdW5jdGlvbiggdHJ5Q291bnQgKSB7XG5cbiAgICAgICAgdHJ5Q291bnQgPSB0cnlDb3VudCB8fCAxO1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgICRpbWdzVG9Mb2FkID0gJCggJ2ltZ1tkYXRhLWxhenldJywgXy4kc2xpZGVyICksXG4gICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgIGltYWdlU291cmNlLFxuICAgICAgICAgICAgaW1hZ2VTcmNTZXQsXG4gICAgICAgICAgICBpbWFnZVNpemVzLFxuICAgICAgICAgICAgaW1hZ2VUb0xvYWQ7XG5cbiAgICAgICAgaWYgKCAkaW1nc1RvTG9hZC5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIGltYWdlID0gJGltZ3NUb0xvYWQuZmlyc3QoKTtcbiAgICAgICAgICAgIGltYWdlU291cmNlID0gaW1hZ2UuYXR0cignZGF0YS1sYXp5Jyk7XG4gICAgICAgICAgICBpbWFnZVNyY1NldCA9IGltYWdlLmF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICBpbWFnZVNpemVzICA9IGltYWdlLmF0dHIoJ2RhdGEtc2l6ZXMnKSB8fCBfLiRzbGlkZXIuYXR0cignZGF0YS1zaXplcycpO1xuICAgICAgICAgICAgaW1hZ2VUb0xvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTcmNTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmNzZXQnLCBpbWFnZVNyY1NldCApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZVNpemVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzaXplcycsIGltYWdlU2l6ZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCAnc3JjJywgaW1hZ2VTb3VyY2UgKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1sYXp5IGRhdGEtc3Jjc2V0IGRhdGEtc2l6ZXMnKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICggXy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkZWQnLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcbiAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0cnlDb3VudCA8IDMgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIHRyeSB0byBsb2FkIHRoZSBpbWFnZSAzIHRpbWVzLFxuICAgICAgICAgICAgICAgICAgICAgKiBsZWF2ZSBhIHNsaWdodCBkZWxheSBzbyB3ZSBkb24ndCBnZXRcbiAgICAgICAgICAgICAgICAgICAgICogc2VydmVycyBibG9ja2luZyB0aGUgcmVxdWVzdC5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCB0cnlDb3VudCArIDEgKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0ciggJ2RhdGEtbGF6eScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCAnc2xpY2stbG9hZGluZycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCAnc2xpY2stbGF6eWxvYWQtZXJyb3InICk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkRXJyb3InLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcblxuICAgICAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1hZ2VUb0xvYWQuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2FsbEltYWdlc0xvYWRlZCcsIFsgXyBdKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiggaW5pdGlhbGl6aW5nICkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgY3VycmVudFNsaWRlLCBsYXN0VmlzaWJsZUluZGV4O1xuXG4gICAgICAgIGxhc3RWaXNpYmxlSW5kZXggPSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuXG4gICAgICAgIC8vIGluIG5vbi1pbmZpbml0ZSBzbGlkZXJzLCB3ZSBkb24ndCB3YW50IHRvIGdvIHBhc3QgdGhlXG4gICAgICAgIC8vIGxhc3QgdmlzaWJsZSBpbmRleC5cbiAgICAgICAgaWYoICFfLm9wdGlvbnMuaW5maW5pdGUgJiYgKCBfLmN1cnJlbnRTbGlkZSA+IGxhc3RWaXNpYmxlSW5kZXggKSkge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBsYXN0VmlzaWJsZUluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbGVzcyBzbGlkZXMgdGhhbiB0byBzaG93LCBnbyB0byBzdGFydC5cbiAgICAgICAgaWYgKCBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gMDtcblxuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG5cbiAgICAgICAgXy5kZXN0cm95KHRydWUpO1xuXG4gICAgICAgICQuZXh0ZW5kKF8sIF8uaW5pdGlhbHMsIHsgY3VycmVudFNsaWRlOiBjdXJyZW50U2xpZGUgfSk7XG5cbiAgICAgICAgXy5pbml0KCk7XG5cbiAgICAgICAgaWYoICFpbml0aWFsaXppbmcgKSB7XG5cbiAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4JyxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGN1cnJlbnRTbGlkZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlZ2lzdGVyQnJlYWtwb2ludHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGJyZWFrcG9pbnQsIGN1cnJlbnRCcmVha3BvaW50LCBsLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZVNldHRpbmdzID0gXy5vcHRpb25zLnJlc3BvbnNpdmUgfHwgbnVsbDtcblxuICAgICAgICBpZiAoICQudHlwZShyZXNwb25zaXZlU2V0dGluZ3MpID09PSAnYXJyYXknICYmIHJlc3BvbnNpdmVTZXR0aW5ncy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8ucmVzcG9uZFRvID0gXy5vcHRpb25zLnJlc3BvbmRUbyB8fCAnd2luZG93JztcblxuICAgICAgICAgICAgZm9yICggYnJlYWtwb2ludCBpbiByZXNwb25zaXZlU2V0dGluZ3MgKSB7XG5cbiAgICAgICAgICAgICAgICBsID0gXy5icmVha3BvaW50cy5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zaXZlU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoYnJlYWtwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEJyZWFrcG9pbnQgPSByZXNwb25zaXZlU2V0dGluZ3NbYnJlYWtwb2ludF0uYnJlYWtwb2ludDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGJyZWFrcG9pbnRzIGFuZCBjdXQgb3V0IGFueSBleGlzdGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmVzIHdpdGggdGhlIHNhbWUgYnJlYWtwb2ludCBudW1iZXIsIHdlIGRvbid0IHdhbnQgZHVwZXMuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKCBsID49IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggXy5icmVha3BvaW50c1tsXSAmJiBfLmJyZWFrcG9pbnRzW2xdID09PSBjdXJyZW50QnJlYWtwb2ludCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnNwbGljZShsLDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50cy5wdXNoKGN1cnJlbnRCcmVha3BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50U2V0dGluZ3NbY3VycmVudEJyZWFrcG9pbnRdID0gcmVzcG9uc2l2ZVNldHRpbmdzW2JyZWFrcG9pbnRdLnNldHRpbmdzO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uYnJlYWtwb2ludHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICggXy5vcHRpb25zLm1vYmlsZUZpcnN0ICkgPyBhLWIgOiBiLWE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXMgPVxuICAgICAgICAgICAgXy4kc2xpZGVUcmFja1xuICAgICAgICAgICAgICAgIC5jaGlsZHJlbihfLm9wdGlvbnMuc2xpZGUpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1zbGlkZScpO1xuXG4gICAgICAgIF8uc2xpZGVDb3VudCA9IF8uJHNsaWRlcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAmJiBfLmN1cnJlbnRTbGlkZSAhPT0gMCkge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLmN1cnJlbnRTbGlkZSAtIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5yZWdpc3RlckJyZWFrcG9pbnRzKCk7XG5cbiAgICAgICAgXy5zZXRQcm9wcygpO1xuICAgICAgICBfLnNldHVwSW5maW5pdGUoKTtcbiAgICAgICAgXy5idWlsZEFycm93cygpO1xuICAgICAgICBfLnVwZGF0ZUFycm93cygpO1xuICAgICAgICBfLmluaXRBcnJvd0V2ZW50cygpO1xuICAgICAgICBfLmJ1aWxkRG90cygpO1xuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgXy5pbml0RG90RXZlbnRzKCk7XG4gICAgICAgIF8uY2xlYW5VcFNsaWRlRXZlbnRzKCk7XG4gICAgICAgIF8uaW5pdFNsaWRlRXZlbnRzKCk7XG5cbiAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUoZmFsc2UsIHRydWUpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPblNlbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJChfLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9uKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3Nlcyh0eXBlb2YgXy5jdXJyZW50U2xpZGUgPT09ICdudW1iZXInID8gXy5jdXJyZW50U2xpZGUgOiAwKTtcblxuICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG4gICAgICAgIF8uZm9jdXNIYW5kbGVyKCk7XG5cbiAgICAgICAgXy5wYXVzZWQgPSAhXy5vcHRpb25zLmF1dG9wbGF5O1xuICAgICAgICBfLmF1dG9QbGF5KCk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3JlSW5pdCcsIFtfXSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgIT09IF8ud2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfLndpbmRvd0RlbGF5KTtcbiAgICAgICAgICAgIF8ud2luZG93RGVsYXkgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfLndpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUoKTtcbiAgICAgICAgICAgICAgICBpZiggIV8udW5zbGlja2VkICkgeyBfLnNldFBvc2l0aW9uKCk7IH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVtb3ZlU2xpZGUgPSBTbGljay5wcm90b3R5cGUuc2xpY2tSZW1vdmUgPSBmdW5jdGlvbihpbmRleCwgcmVtb3ZlQmVmb3JlLCByZW1vdmVBbGwpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbmRleCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgcmVtb3ZlQmVmb3JlID0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IHJlbW92ZUJlZm9yZSA9PT0gdHJ1ZSA/IDAgOiBfLnNsaWRlQ291bnQgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSByZW1vdmVCZWZvcmUgPT09IHRydWUgPyAtLWluZGV4IDogaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDwgMSB8fCBpbmRleCA8IDAgfHwgaW5kZXggPiBfLnNsaWRlQ291bnQgLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfLnVubG9hZCgpO1xuXG4gICAgICAgIGlmIChyZW1vdmVBbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oKS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5lcShpbmRleCkucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXMgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suYXBwZW5kKF8uJHNsaWRlcyk7XG5cbiAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgXy5yZWluaXQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0Q1NTID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBwb3NpdGlvblByb3BzID0ge30sXG4gICAgICAgICAgICB4LCB5O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IC1wb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB4ID0gXy5wb3NpdGlvblByb3AgPT0gJ2xlZnQnID8gTWF0aC5jZWlsKHBvc2l0aW9uKSArICdweCcgOiAnMHB4JztcbiAgICAgICAgeSA9IF8ucG9zaXRpb25Qcm9wID09ICd0b3AnID8gTWF0aC5jZWlsKHBvc2l0aW9uKSArICdweCcgOiAnMHB4JztcblxuICAgICAgICBwb3NpdGlvblByb3BzW18ucG9zaXRpb25Qcm9wXSA9IHBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChfLnRyYW5zZm9ybXNFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3NpdGlvblByb3BzID0ge307XG4gICAgICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvblByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZSgnICsgeCArICcsICcgKyB5ICsgJyknO1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvblByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJywgJyArIHkgKyAnLCAwcHgpJztcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXREaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRsaXN0LmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICgnMHB4ICcgKyBfLm9wdGlvbnMuY2VudGVyUGFkZGluZylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJGxpc3QuaGVpZ2h0KF8uJHNsaWRlcy5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRsaXN0LmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IChfLm9wdGlvbnMuY2VudGVyUGFkZGluZyArICcgMHB4JylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8ubGlzdFdpZHRoID0gXy4kbGlzdC53aWR0aCgpO1xuICAgICAgICBfLmxpc3RIZWlnaHQgPSBfLiRsaXN0LmhlaWdodCgpO1xuXG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UgJiYgXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLnNsaWRlV2lkdGggPSBNYXRoLmNlaWwoXy5saXN0V2lkdGggLyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2sud2lkdGgoTWF0aC5jZWlsKChfLnNsaWRlV2lkdGggKiBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5sZW5ndGgpKSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay53aWR0aCg1MDAwICogXy5zbGlkZUNvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uc2xpZGVXaWR0aCA9IE1hdGguY2VpbChfLmxpc3RXaWR0aCk7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmhlaWdodChNYXRoLmNlaWwoKF8uJHNsaWRlcy5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpICogXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykubGVuZ3RoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9mZnNldCA9IF8uJHNsaWRlcy5maXJzdCgpLm91dGVyV2lkdGgodHJ1ZSkgLSBfLiRzbGlkZXMuZmlyc3QoKS53aWR0aCgpO1xuICAgICAgICBpZiAoXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IGZhbHNlKSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS53aWR0aChfLnNsaWRlV2lkdGggLSBvZmZzZXQpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRGYWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0TGVmdDtcblxuICAgICAgICBfLiRzbGlkZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IChfLnNsaWRlV2lkdGggKiBpbmRleCkgKiAtMTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRhcmdldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0YXJnZXRMZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5jc3Moe1xuICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMSAmJiBfLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgJiYgXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldEhlaWdodCA9IF8uJHNsaWRlcy5lcShfLmN1cnJlbnRTbGlkZSkub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICBfLiRsaXN0LmNzcygnaGVpZ2h0JywgdGFyZ2V0SGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRPcHRpb24gPVxuICAgIFNsaWNrLnByb3RvdHlwZS5zbGlja1NldE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhY2NlcHRzIGFyZ3VtZW50cyBpbiBmb3JtYXQgb2Y6XG4gICAgICAgICAqXG4gICAgICAgICAqICAtIGZvciBjaGFuZ2luZyBhIHNpbmdsZSBvcHRpb24ncyB2YWx1ZTpcbiAgICAgICAgICogICAgIC5zbGljayhcInNldE9wdGlvblwiLCBvcHRpb24sIHZhbHVlLCByZWZyZXNoIClcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIGNoYW5naW5nIGEgc2V0IG9mIHJlc3BvbnNpdmUgb3B0aW9uczpcbiAgICAgICAgICogICAgIC5zbGljayhcInNldE9wdGlvblwiLCAncmVzcG9uc2l2ZScsIFt7fSwgLi4uXSwgcmVmcmVzaCApXG4gICAgICAgICAqXG4gICAgICAgICAqICAtIGZvciB1cGRhdGluZyBtdWx0aXBsZSB2YWx1ZXMgYXQgb25jZSAobm90IHJlc3BvbnNpdmUpXG4gICAgICAgICAqICAgICAuc2xpY2soXCJzZXRPcHRpb25cIiwgeyAnb3B0aW9uJzogdmFsdWUsIC4uLiB9LCByZWZyZXNoIClcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBsLCBpdGVtLCBvcHRpb24sIHZhbHVlLCByZWZyZXNoID0gZmFsc2UsIHR5cGU7XG5cbiAgICAgICAgaWYoICQudHlwZSggYXJndW1lbnRzWzBdICkgPT09ICdvYmplY3QnICkge1xuXG4gICAgICAgICAgICBvcHRpb24gPSAgYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgcmVmcmVzaCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHR5cGUgPSAnbXVsdGlwbGUnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoICQudHlwZSggYXJndW1lbnRzWzBdICkgPT09ICdzdHJpbmcnICkge1xuXG4gICAgICAgICAgICBvcHRpb24gPSAgYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgdmFsdWUgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICByZWZyZXNoID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICBpZiAoIGFyZ3VtZW50c1swXSA9PT0gJ3Jlc3BvbnNpdmUnICYmICQudHlwZSggYXJndW1lbnRzWzFdICkgPT09ICdhcnJheScgKSB7XG5cbiAgICAgICAgICAgICAgICB0eXBlID0gJ3Jlc3BvbnNpdmUnO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgYXJndW1lbnRzWzFdICE9PSAndW5kZWZpbmVkJyApIHtcblxuICAgICAgICAgICAgICAgIHR5cGUgPSAnc2luZ2xlJztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHR5cGUgPT09ICdzaW5nbGUnICkge1xuXG4gICAgICAgICAgICBfLm9wdGlvbnNbb3B0aW9uXSA9IHZhbHVlO1xuXG5cbiAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ211bHRpcGxlJyApIHtcblxuICAgICAgICAgICAgJC5lYWNoKCBvcHRpb24gLCBmdW5jdGlvbiggb3B0LCB2YWwgKSB7XG5cbiAgICAgICAgICAgICAgICBfLm9wdGlvbnNbb3B0XSA9IHZhbDtcblxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAncmVzcG9uc2l2ZScgKSB7XG5cbiAgICAgICAgICAgIGZvciAoIGl0ZW0gaW4gdmFsdWUgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggJC50eXBlKCBfLm9wdGlvbnMucmVzcG9uc2l2ZSApICE9PSAnYXJyYXknICkge1xuXG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlID0gWyB2YWx1ZVtpdGVtXSBdO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBsID0gXy5vcHRpb25zLnJlc3BvbnNpdmUubGVuZ3RoLTE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSByZXNwb25zaXZlIG9iamVjdCBhbmQgc3BsaWNlIG91dCBkdXBsaWNhdGVzLlxuICAgICAgICAgICAgICAgICAgICB3aGlsZSggbCA+PSAwICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggXy5vcHRpb25zLnJlc3BvbnNpdmVbbF0uYnJlYWtwb2ludCA9PT0gdmFsdWVbaXRlbV0uYnJlYWtwb2ludCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLnNwbGljZShsLDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGwtLTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUucHVzaCggdmFsdWVbaXRlbV0gKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHJlZnJlc2ggKSB7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG4gICAgICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5zZXREaW1lbnNpb25zKCk7XG5cbiAgICAgICAgXy5zZXRIZWlnaHQoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLnNldENTUyhfLmdldExlZnQoXy5jdXJyZW50U2xpZGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uc2V0RmFkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3NldFBvc2l0aW9uJywgW19dKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0UHJvcHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBib2R5U3R5bGUgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuXG4gICAgICAgIF8ucG9zaXRpb25Qcm9wID0gXy5vcHRpb25zLnZlcnRpY2FsID09PSB0cnVlID8gJ3RvcCcgOiAnbGVmdCc7XG5cbiAgICAgICAgaWYgKF8ucG9zaXRpb25Qcm9wID09PSAndG9wJykge1xuICAgICAgICAgICAgXy4kc2xpZGVyLmFkZENsYXNzKCdzbGljay12ZXJ0aWNhbCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay12ZXJ0aWNhbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5XZWJraXRUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGJvZHlTdHlsZS5Nb3pUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGJvZHlTdHlsZS5tc1RyYW5zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy51c2VDU1MgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNzc1RyYW5zaXRpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmZhZGUgKSB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBfLm9wdGlvbnMuekluZGV4ID09PSAnbnVtYmVyJyApIHtcbiAgICAgICAgICAgICAgICBpZiggXy5vcHRpb25zLnpJbmRleCA8IDMgKSB7XG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy56SW5kZXggPSAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXy5vcHRpb25zLnpJbmRleCA9IF8uZGVmYXVsdHMuekluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5PVHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnT1RyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLW8tdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnT1RyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLk1velRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ01velRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLW1vei10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdNb3pUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS5Nb3pQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS53ZWJraXRUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICd3ZWJraXRUcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy13ZWJraXQtdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnd2Via2l0VHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUubXNUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdtc1RyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLW1zLXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ21zVHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLm1zVHJhbnNmb3JtID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLnRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkICYmIF8uYW5pbVR5cGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ3RyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAndHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAndHJhbnNpdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgXy50cmFuc2Zvcm1zRW5hYmxlZCA9IF8ub3B0aW9ucy51c2VUcmFuc2Zvcm0gJiYgKF8uYW5pbVR5cGUgIT09IG51bGwgJiYgXy5hbmltVHlwZSAhPT0gZmFsc2UpO1xuICAgIH07XG5cblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRTbGlkZUNsYXNzZXMgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGNlbnRlck9mZnNldCwgYWxsU2xpZGVzLCBpbmRleE9mZnNldCwgcmVtYWluZGVyO1xuXG4gICAgICAgIGFsbFNsaWRlcyA9IF8uJHNsaWRlclxuICAgICAgICAgICAgLmZpbmQoJy5zbGljay1zbGlkZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWFjdGl2ZSBzbGljay1jZW50ZXIgc2xpY2stY3VycmVudCcpXG4gICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgLmVxKGluZGV4KVxuICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jdXJyZW50Jyk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgIHZhciBldmVuQ29lZiA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJSAyID09PSAwID8gMSA6IDA7XG5cbiAgICAgICAgICAgIGNlbnRlck9mZnNldCA9IE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gY2VudGVyT2Zmc2V0ICYmIGluZGV4IDw9IChfLnNsaWRlQ291bnQgLSAxKSAtIGNlbnRlck9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCAtIGNlbnRlck9mZnNldCArIGV2ZW5Db2VmLCBpbmRleCArIGNlbnRlck9mZnNldCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4T2Zmc2V0IC0gY2VudGVyT2Zmc2V0ICsgMSArIGV2ZW5Db2VmLCBpbmRleE9mZnNldCArIGNlbnRlck9mZnNldCArIDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGFsbFNsaWRlcy5sZW5ndGggLSAxIC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY2VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBfLnNsaWRlQ291bnQgLSAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY2VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgLmVxKGluZGV4KVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY2VudGVyJyk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPD0gKF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4LCBpbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWxsU2xpZGVzLmxlbmd0aCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlbWFpbmRlciA9IF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgaW5kZXhPZmZzZXQgPSBfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgPyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgaW5kZXggOiBpbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAmJiAoXy5zbGlkZUNvdW50IC0gaW5kZXgpIDwgXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4T2Zmc2V0IC0gKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSByZW1haW5kZXIpLCBpbmRleE9mZnNldCArIHJlbWFpbmRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleE9mZnNldCwgaW5kZXhPZmZzZXQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ29uZGVtYW5kJyB8fCBfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdhbnRpY2lwYXRlZCcpIHtcbiAgICAgICAgICAgIF8ubGF6eUxvYWQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0dXBJbmZpbml0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGksIHNsaWRlSW5kZXgsIGluZmluaXRlQ291bnQ7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLm9wdGlvbnMuY2VudGVyTW9kZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgc2xpZGVJbmRleCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGVDb3VudCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IF8uc2xpZGVDb3VudDsgaSA+IChfLnNsaWRlQ291bnQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGVDb3VudCk7IGkgLT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gaSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICQoXy4kc2xpZGVzW3NsaWRlSW5kZXhdKS5jbG9uZSh0cnVlKS5hdHRyKCdpZCcsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBzbGlkZUluZGV4IC0gXy5zbGlkZUNvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnByZXBlbmRUbyhfLiRzbGlkZVRyYWNrKS5hZGRDbGFzcygnc2xpY2stY2xvbmVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbmZpbml0ZUNvdW50ICArIF8uc2xpZGVDb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAkKF8uJHNsaWRlc1tzbGlkZUluZGV4XSkuY2xvbmUodHJ1ZSkuYXR0cignaWQnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4Jywgc2xpZGVJbmRleCArIF8uc2xpZGVDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKS5hZGRDbGFzcygnc2xpY2stY2xvbmVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWNsb25lZCcpLmZpbmQoJ1tpZF0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2lkJywgJycpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBmdW5jdGlvbiggdG9nZ2xlICkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiggIXRvZ2dsZSApIHtcbiAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBfLmludGVycnVwdGVkID0gdG9nZ2xlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZWxlY3RIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRhcmdldEVsZW1lbnQgPVxuICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmlzKCcuc2xpY2stc2xpZGUnKSA/XG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpIDpcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLnNsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQodGFyZ2V0RWxlbWVudC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JykpO1xuXG4gICAgICAgIGlmICghaW5kZXgpIGluZGV4ID0gMDtcblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoaW5kZXgsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgXy5zbGlkZUhhbmRsZXIoaW5kZXgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zbGlkZUhhbmRsZXIgPSBmdW5jdGlvbihpbmRleCwgc3luYywgZG9udEFuaW1hdGUpIHtcblxuICAgICAgICB2YXIgdGFyZ2V0U2xpZGUsIGFuaW1TbGlkZSwgb2xkU2xpZGUsIHNsaWRlTGVmdCwgdGFyZ2V0TGVmdCA9IG51bGwsXG4gICAgICAgICAgICBfID0gdGhpcywgbmF2VGFyZ2V0O1xuXG4gICAgICAgIHN5bmMgPSBzeW5jIHx8IGZhbHNlO1xuXG4gICAgICAgIGlmIChfLmFuaW1hdGluZyA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMud2FpdEZvckFuaW1hdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSAmJiBfLmN1cnJlbnRTbGlkZSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzeW5jID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5hc05hdkZvcihpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRTbGlkZSA9IGluZGV4O1xuICAgICAgICB0YXJnZXRMZWZ0ID0gXy5nZXRMZWZ0KHRhcmdldFNsaWRlKTtcbiAgICAgICAgc2xpZGVMZWZ0ID0gXy5nZXRMZWZ0KF8uY3VycmVudFNsaWRlKTtcblxuICAgICAgICBfLmN1cnJlbnRMZWZ0ID0gXy5zd2lwZUxlZnQgPT09IG51bGwgPyBzbGlkZUxlZnQgOiBfLnN3aXBlTGVmdDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gZmFsc2UgJiYgKGluZGV4IDwgMCB8fCBpbmRleCA+IF8uZ2V0RG90Q291bnQoKSAqIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHNsaWRlTGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSAmJiAoaW5kZXggPCAwIHx8IGluZGV4ID4gKF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLmFuaW1hdGVTbGlkZShzbGlkZUxlZnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF8uYXV0b1BsYXlUaW1lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0U2xpZGUgPCAwKSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gXy5zbGlkZUNvdW50IC0gKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuaW1TbGlkZSA9IF8uc2xpZGVDb3VudCArIHRhcmdldFNsaWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldFNsaWRlID49IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGFuaW1TbGlkZSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuaW1TbGlkZSA9IHRhcmdldFNsaWRlIC0gXy5zbGlkZUNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5pbVNsaWRlID0gdGFyZ2V0U2xpZGU7XG4gICAgICAgIH1cblxuICAgICAgICBfLmFuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2JlZm9yZUNoYW5nZScsIFtfLCBfLmN1cnJlbnRTbGlkZSwgYW5pbVNsaWRlXSk7XG5cbiAgICAgICAgb2xkU2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBhbmltU2xpZGU7XG5cbiAgICAgICAgXy5zZXRTbGlkZUNsYXNzZXMoXy5jdXJyZW50U2xpZGUpO1xuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmFzTmF2Rm9yICkge1xuXG4gICAgICAgICAgICBuYXZUYXJnZXQgPSBfLmdldE5hdlRhcmdldCgpO1xuICAgICAgICAgICAgbmF2VGFyZ2V0ID0gbmF2VGFyZ2V0LnNsaWNrKCdnZXRTbGljaycpO1xuXG4gICAgICAgICAgICBpZiAoIG5hdlRhcmdldC5zbGlkZUNvdW50IDw9IG5hdlRhcmdldC5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcbiAgICAgICAgICAgICAgICBuYXZUYXJnZXQuc2V0U2xpZGVDbGFzc2VzKF8uY3VycmVudFNsaWRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG4gICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIF8uZmFkZVNsaWRlT3V0KG9sZFNsaWRlKTtcblxuICAgICAgICAgICAgICAgIF8uZmFkZVNsaWRlKGFuaW1TbGlkZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF8uYW5pbWF0ZUhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHRhcmdldExlZnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3RhcnRMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93LmhpZGUoKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5oaWRlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuaGlkZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVEaXJlY3Rpb24gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgeERpc3QsIHlEaXN0LCByLCBzd2lwZUFuZ2xlLCBfID0gdGhpcztcblxuICAgICAgICB4RGlzdCA9IF8udG91Y2hPYmplY3Quc3RhcnRYIC0gXy50b3VjaE9iamVjdC5jdXJYO1xuICAgICAgICB5RGlzdCA9IF8udG91Y2hPYmplY3Quc3RhcnRZIC0gXy50b3VjaE9iamVjdC5jdXJZO1xuICAgICAgICByID0gTWF0aC5hdGFuMih5RGlzdCwgeERpc3QpO1xuXG4gICAgICAgIHN3aXBlQW5nbGUgPSBNYXRoLnJvdW5kKHIgKiAxODAgLyBNYXRoLlBJKTtcbiAgICAgICAgaWYgKHN3aXBlQW5nbGUgPCAwKSB7XG4gICAgICAgICAgICBzd2lwZUFuZ2xlID0gMzYwIC0gTWF0aC5hYnMoc3dpcGVBbmdsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPD0gNDUpICYmIChzd2lwZUFuZ2xlID49IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ2xlZnQnIDogJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlIDw9IDM2MCkgJiYgKHN3aXBlQW5nbGUgPj0gMzE1KSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdsZWZ0JyA6ICdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA+PSAxMzUpICYmIChzd2lwZUFuZ2xlIDw9IDIyNSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAncmlnaHQnIDogJ2xlZnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKChzd2lwZUFuZ2xlID49IDM1KSAmJiAoc3dpcGVBbmdsZSA8PSAxMzUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ3ZlcnRpY2FsJztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVFbmQgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlQ291bnQsXG4gICAgICAgICAgICBkaXJlY3Rpb247XG5cbiAgICAgICAgXy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBfLnN3aXBpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoXy5zY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIF8uc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG4gICAgICAgIF8uc2hvdWxkQ2xpY2sgPSAoIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPiAxMCApID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5jdXJYID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8udG91Y2hPYmplY3QuZWRnZUhpdCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdlZGdlJywgW18sIF8uc3dpcGVEaXJlY3Rpb24oKSBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+PSBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlICkge1xuXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBfLnN3aXBlRGlyZWN0aW9uKCk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbiApIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ291bnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jaGVja05hdmlnYWJsZSggXy5jdXJyZW50U2xpZGUgKyBfLmdldFNsaWRlQ291bnQoKSApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSArIF8uZ2V0U2xpZGVDb3VudCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudERpcmVjdGlvbiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ291bnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jaGVja05hdmlnYWJsZSggXy5jdXJyZW50U2xpZGUgLSBfLmdldFNsaWRlQ291bnQoKSApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSAtIF8uZ2V0U2xpZGVDb3VudCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudERpcmVjdGlvbiA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIGRpcmVjdGlvbiAhPSAndmVydGljYWwnICkge1xuXG4gICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIHNsaWRlQ291bnQgKTtcbiAgICAgICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3N3aXBlJywgW18sIGRpcmVjdGlvbiBdKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICggXy50b3VjaE9iamVjdC5zdGFydFggIT09IF8udG91Y2hPYmplY3QuY3VyWCApIHtcblxuICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBfLmN1cnJlbnRTbGlkZSApO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKChfLm9wdGlvbnMuc3dpcGUgPT09IGZhbHNlKSB8fCAoJ29udG91Y2hlbmQnIGluIGRvY3VtZW50ICYmIF8ub3B0aW9ucy5zd2lwZSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmRyYWdnYWJsZSA9PT0gZmFsc2UgJiYgZXZlbnQudHlwZS5pbmRleE9mKCdtb3VzZScpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5maW5nZXJDb3VudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzLmxlbmd0aCA6IDE7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5taW5Td2lwZSA9IF8ubGlzdFdpZHRoIC8gXy5vcHRpb25zXG4gICAgICAgICAgICAudG91Y2hUaHJlc2hvbGQ7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8udG91Y2hPYmplY3QubWluU3dpcGUgPSBfLmxpc3RIZWlnaHQgLyBfLm9wdGlvbnNcbiAgICAgICAgICAgICAgICAudG91Y2hUaHJlc2hvbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmRhdGEuYWN0aW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlU3RhcnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlTW92ZShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgXy5zd2lwZUVuZChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGVkZ2VXYXNIaXQgPSBmYWxzZSxcbiAgICAgICAgICAgIGN1ckxlZnQsIHN3aXBlRGlyZWN0aW9uLCBzd2lwZUxlbmd0aCwgcG9zaXRpb25PZmZzZXQsIHRvdWNoZXMsIHZlcnRpY2FsU3dpcGVMZW5ndGg7XG5cbiAgICAgICAgdG91Y2hlcyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgIT09IHVuZGVmaW5lZCA/IGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyA6IG51bGw7XG5cbiAgICAgICAgaWYgKCFfLmRyYWdnaW5nIHx8IF8uc2Nyb2xsaW5nIHx8IHRvdWNoZXMgJiYgdG91Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1ckxlZnQgPSBfLmdldExlZnQoXy5jdXJyZW50U2xpZGUpO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QuY3VyWCA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5jbGllbnRYO1xuICAgICAgICBfLnRvdWNoT2JqZWN0LmN1clkgPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzWzBdLnBhZ2VZIDogZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID0gTWF0aC5yb3VuZChNYXRoLnNxcnQoXG4gICAgICAgICAgICBNYXRoLnBvdyhfLnRvdWNoT2JqZWN0LmN1clggLSBfLnRvdWNoT2JqZWN0LnN0YXJ0WCwgMikpKTtcblxuICAgICAgICB2ZXJ0aWNhbFN3aXBlTGVuZ3RoID0gTWF0aC5yb3VuZChNYXRoLnNxcnQoXG4gICAgICAgICAgICBNYXRoLnBvdyhfLnRvdWNoT2JqZWN0LmN1clkgLSBfLnRvdWNoT2JqZWN0LnN0YXJ0WSwgMikpKTtcblxuICAgICAgICBpZiAoIV8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgJiYgIV8uc3dpcGluZyAmJiB2ZXJ0aWNhbFN3aXBlTGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgXy5zY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPSB2ZXJ0aWNhbFN3aXBlTGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVEaXJlY3Rpb24gPSBfLnN3aXBlRGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgIT09IHVuZGVmaW5lZCAmJiBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgXy5zd2lwaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwb3NpdGlvbk9mZnNldCA9IChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/IDEgOiAtMSkgKiAoXy50b3VjaE9iamVjdC5jdXJYID4gXy50b3VjaE9iamVjdC5zdGFydFggPyAxIDogLTEpO1xuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcG9zaXRpb25PZmZzZXQgPSBfLnRvdWNoT2JqZWN0LmN1clkgPiBfLnRvdWNoT2JqZWN0LnN0YXJ0WSA/IDEgOiAtMTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3dpcGVMZW5ndGggPSBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QuZWRnZUhpdCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoKF8uY3VycmVudFNsaWRlID09PSAwICYmIHN3aXBlRGlyZWN0aW9uID09PSAncmlnaHQnKSB8fCAoXy5jdXJyZW50U2xpZGUgPj0gXy5nZXREb3RDb3VudCgpICYmIHN3aXBlRGlyZWN0aW9uID09PSAnbGVmdCcpKSB7XG4gICAgICAgICAgICAgICAgc3dpcGVMZW5ndGggPSBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoICogXy5vcHRpb25zLmVkZ2VGcmljdGlvbjtcbiAgICAgICAgICAgICAgICBfLnRvdWNoT2JqZWN0LmVkZ2VIaXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIHN3aXBlTGVuZ3RoICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyAoc3dpcGVMZW5ndGggKiAoXy4kbGlzdC5oZWlnaHQoKSAvIF8ubGlzdFdpZHRoKSkgKiBwb3NpdGlvbk9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgc3dpcGVMZW5ndGggKiBwb3NpdGlvbk9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSB8fCBfLm9wdGlvbnMudG91Y2hNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfLnNldENTUyhfLnN3aXBlTGVmdCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlU3RhcnQgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRvdWNoZXM7XG5cbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKF8udG91Y2hPYmplY3QuZmluZ2VyQ291bnQgIT09IDEgfHwgXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRvdWNoZXMgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBfLnRvdWNoT2JqZWN0LnN0YXJ0WCA9IF8udG91Y2hPYmplY3QuY3VyWCA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXMucGFnZVggOiBldmVudC5jbGllbnRYO1xuICAgICAgICBfLnRvdWNoT2JqZWN0LnN0YXJ0WSA9IF8udG91Y2hPYmplY3QuY3VyWSA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXMucGFnZVkgOiBldmVudC5jbGllbnRZO1xuXG4gICAgICAgIF8uZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bmZpbHRlclNsaWRlcyA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1VuZmlsdGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLiRzbGlkZXNDYWNoZSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLnVubG9hZCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc0NhY2hlLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuXG4gICAgICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgICQoJy5zbGljay1jbG9uZWQnLCBfLiRzbGlkZXIpLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmIChfLiRkb3RzKSB7XG4gICAgICAgICAgICBfLiRkb3RzLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uJHByZXZBcnJvdyAmJiBfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLnByZXZBcnJvdykpIHtcbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLiRuZXh0QXJyb3cgJiYgXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5uZXh0QXJyb3cpKSB7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stc2xpZGUgc2xpY2stYWN0aXZlIHNsaWNrLXZpc2libGUgc2xpY2stY3VycmVudCcpXG4gICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgICAgICAuY3NzKCd3aWR0aCcsICcnKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudW5zbGljayA9IGZ1bmN0aW9uKGZyb21CcmVha3BvaW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcigndW5zbGljaycsIFtfLCBmcm9tQnJlYWtwb2ludF0pO1xuICAgICAgICBfLmRlc3Ryb3koKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudXBkYXRlQXJyb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0O1xuXG4gICAgICAgIGNlbnRlck9mZnNldCA9IE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpO1xuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAmJlxuICAgICAgICAgICAgIV8ub3B0aW9ucy5pbmZpbml0ZSApIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAtIDEgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51cGRhdGVEb3RzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLiRkb3RzICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIF8uJGRvdHNcbiAgICAgICAgICAgICAgICAuZmluZCgnbGknKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKTtcblxuICAgICAgICAgICAgXy4kZG90c1xuICAgICAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAgICAgLmVxKE1hdGguZmxvb3IoXy5jdXJyZW50U2xpZGUgLyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS52aXNpYmlsaXR5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuXG4gICAgICAgICAgICBpZiAoIGRvY3VtZW50W18uaGlkZGVuXSApIHtcblxuICAgICAgICAgICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQuZm4uc2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICBsID0gXy5sZW5ndGgsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgcmV0O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb3B0ID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIF9baV0uc2xpY2sgPSBuZXcgU2xpY2soX1tpXSwgb3B0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXQgPSBfW2ldLnNsaWNrW29wdF0uYXBwbHkoX1tpXS5zbGljaywgYXJncyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJldCAhPSAndW5kZWZpbmVkJykgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXztcbiAgICB9O1xuXG59KSk7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdGFiLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdGFic1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRBQiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRhYiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8ganNjczpkaXNhYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KVxuICAgIC8vIGpzY3M6ZW5hYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gIH1cblxuICBUYWIuVkVSU0lPTiA9ICczLjMuNydcblxuICBUYWIuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRhYi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRoaXMgICAgPSB0aGlzLmVsZW1lbnRcbiAgICB2YXIgJHVsICAgICAgPSAkdGhpcy5jbG9zZXN0KCd1bDpub3QoLmRyb3Bkb3duLW1lbnUpJylcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5kYXRhKCd0YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICBpZiAoJHRoaXMucGFyZW50KCdsaScpLmhhc0NsYXNzKCdhY3RpdmUnKSkgcmV0dXJuXG5cbiAgICB2YXIgJHByZXZpb3VzID0gJHVsLmZpbmQoJy5hY3RpdmU6bGFzdCBhJylcbiAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudCgnaGlkZS5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkdGhpc1swXVxuICAgIH0pXG4gICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoJ3Nob3cuYnMudGFiJywge1xuICAgICAgcmVsYXRlZFRhcmdldDogJHByZXZpb3VzWzBdXG4gICAgfSlcblxuICAgICRwcmV2aW91cy50cmlnZ2VyKGhpZGVFdmVudClcbiAgICAkdGhpcy50cmlnZ2VyKHNob3dFdmVudClcblxuICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciAkdGFyZ2V0ID0gJChzZWxlY3RvcilcblxuICAgIHRoaXMuYWN0aXZhdGUoJHRoaXMuY2xvc2VzdCgnbGknKSwgJHVsKVxuICAgIHRoaXMuYWN0aXZhdGUoJHRhcmdldCwgJHRhcmdldC5wYXJlbnQoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgJHByZXZpb3VzLnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiAnaGlkZGVuLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgICB9KVxuICAgICAgJHRoaXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdzaG93bi5icy50YWInLFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIFRhYi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgIHZhciAkYWN0aXZlICAgID0gY29udGFpbmVyLmZpbmQoJz4gLmFjdGl2ZScpXG4gICAgdmFyIHRyYW5zaXRpb24gPSBjYWxsYmFja1xuICAgICAgJiYgJC5zdXBwb3J0LnRyYW5zaXRpb25cbiAgICAgICYmICgkYWN0aXZlLmxlbmd0aCAmJiAkYWN0aXZlLmhhc0NsYXNzKCdmYWRlJykgfHwgISFjb250YWluZXIuZmluZCgnPiAuZmFkZScpLmxlbmd0aClcblxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJz4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlJylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgICBlbGVtZW50XG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICBlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIHJlZmxvdyBmb3IgdHJhbnNpdGlvblxuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdpbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdmYWRlJylcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgICRhY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb24gP1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBuZXh0KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVGFiLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMudGFiJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50YWInLCAoZGF0YSA9IG5ldyBUYWIodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRhYlxuXG4gICQuZm4udGFiICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udGFiLkNvbnN0cnVjdG9yID0gVGFiXG5cblxuICAvLyBUQUIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi50YWIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRhYiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFRBQiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBQbHVnaW4uY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgY2xpY2tIYW5kbGVyKVxuXG59KGpRdWVyeSk7XG4iLCJpbXBvcnQgJy4vc2xpY2snO1xuaW1wb3J0ICcuL21vZGFsJztcbmltcG9ydCAnLi90YWInOyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=