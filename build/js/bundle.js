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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/local.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js":
/*!******************************************************************!*\
  !*** ../node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js ***!
  \******************************************************************/
/*! exports provided: disableBodyScroll, clearAllBodyScrollLocks, enableBodyScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableBodyScroll", function() { return disableBodyScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAllBodyScrollLocks", function() { return clearAllBodyScrollLocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableBodyScroll", function() { return enableBodyScroll; });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPosition = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      var computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = computedBodyPaddingRight + scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

var setPositionFixed = function setPositionFixed() {
  return window.requestAnimationFrame(function () {
    // If previousBodyPosition is already set, don't set it again.
    if (previousBodyPosition === undefined) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };

      // Update the dom inside an animation frame 
      var _window = window,
          scrollY = _window.scrollY,
          scrollX = _window.scrollX,
          innerHeight = _window.innerHeight;

      document.body.style.position = 'fixed';
      document.body.style.top = -scrollY;
      document.body.style.left = -scrollX;

      setTimeout(function () {
        return window.requestAnimationFrame(function () {
          // Attempt to check if the bottom bar appeared due to the position change
          var bottomBarHeight = innerHeight - window.innerHeight;
          if (bottomBarHeight && scrollY >= innerHeight) {
            // Move the content further up so that the bottom bar doesn't hide it
            document.body.style.top = -(scrollY + bottomBarHeight);
          }
        });
      }, 300);
    }
  });
};

var restorePositionSetting = function restorePositionSetting() {
  if (previousBodyPosition !== undefined) {
    // Convert the position from "px" to Int
    var y = -parseInt(document.body.style.top, 10);
    var x = -parseInt(document.body.style.left, 10);

    // Restore styles
    document.body.style.position = previousBodyPosition.position;
    document.body.style.top = previousBodyPosition.top;
    document.body.style.left = previousBodyPosition.left;

    // Restore scroll
    window.scrollTo(x, y);

    previousBodyPosition = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    setPositionFixed();
  } else {
    setOverflowHidden(options);
  }

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  }
};

var clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }
};



/***/ }),

/***/ "./scripts/App.js":
/*!************************!*\
  !*** ./scripts/App.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './utils/swiper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module './utils/swipe-event'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _utils_responsive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/responsive */ "./scripts/utils/responsive.js");
/* harmony import */ var _utils_responsive__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_responsive__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ "./scripts/modules/tabs.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_tabs__WEBPACK_IMPORTED_MODULE_2__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './modules/swiper'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _modules_reset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/reset */ "./scripts/modules/reset.js");
/* harmony import */ var _modules_reset__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_reset__WEBPACK_IMPORTED_MODULE_3__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './modules/grid'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menu */ "./scripts/modules/menu.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_menu__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_filter_mobile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/filter-mobile */ "./scripts/modules/filter-mobile.js");
/* harmony import */ var _modules_filter_mobile__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_filter_mobile__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_range__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/range */ "./scripts/modules/range.js");
/* harmony import */ var _modules_range__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_range__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_input_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/input-label */ "./scripts/modules/input-label.js");
/* harmony import */ var _modules_input_label__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_modules_input_label__WEBPACK_IMPORTED_MODULE_7__);

/*========================================
// Polyfills
========================================*/

/*========================================
// Utils
========================================*/




/*========================================
// Modules
========================================*/









/*========================================
// Run Application
========================================*/

var App = {
  init: function init() {// console.log("App init");
  }
};
App.init();

/***/ }),

/***/ "./scripts/bundle.js":
/*!***************************!*\
  !*** ./scripts/bundle.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*========================================
// Vendor
========================================*/
__webpack_require__(/*! ./vendor.js */ "./scripts/vendor.js");
/*========================================
// App
========================================*/


__webpack_require__(/*! ./App.js */ "./scripts/App.js");

/***/ }),

/***/ "./scripts/local.js":
/*!**************************!*\
  !*** ./scripts/local.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./bundle.js */ "./scripts/bundle.js");

/***/ }),

/***/ "./scripts/modules/filter-mobile.js":
/*!******************************************!*\
  !*** ./scripts/modules/filter-mobile.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var filter = document.querySelectorAll('.filter--authors');
var filters = document.querySelectorAll('.filter__inner');
var openbtns = document.querySelectorAll('.filter__item--submenu');

var bodyScrollLock = __webpack_require__(/*! body-scroll-lock */ "../node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js");

var disableBodyScroll = bodyScrollLock.disableBodyScroll;
var enableBodyScroll = bodyScrollLock.enableBodyScroll;
var popupCover = document.querySelector('.popup-cover');
var breakpoint = window.matchMedia('(max-width:768px)');
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

function closeAllFilters() {
  filters.forEach(function (filter) {
    filter.classList.remove("is-shown");
    popupCover.classList.remove("is-shown");
  });
}

if (filter !== null) {
  openbtns.forEach(function (btn) {
    var parent = btn.parentNode;
    var filter = parent.querySelector('.filter__inner');

    function openFilter() {
      closeAllFilters();
      filter.classList.add("is-shown");
      popupCover.classList.add("is-shown");

      if (breakpoint.matches === true) {
        disableBodyScroll(filter);
      }
    }

    function closeFilter() {
      filter.classList.remove("is-shown");
      popupCover.classList.remove("is-shown");

      if (breakpoint.matches === true) {
        enableBodyScroll(filter);
      }
    }

    if (filter) {
      filter.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      }, false);
      filter.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesture();
      }, false);
    }

    function handleGesture() {
      if (touchendY > touchstartY + 50) {
        closeFilter();
      }
    }

    btn.addEventListener("click", openFilter);
    document.addEventListener('swiped-down', closeFilter);
  });
}

/***/ }),

/***/ "./scripts/modules/input-label.js":
/*!****************************************!*\
  !*** ./scripts/modules/input-label.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var inputs = document.querySelectorAll(".checkout__form-input");

  var _iterator = _createForOfIteratorHelper(inputs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var input = _step.value;

      if (input.value.length) {
        input.classList.add("filled");
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var toggleInput = function toggleInput(evt) {
    var input = evt.target;

    if (input.classList.contains("checkout__form-input")) {
      if (input.value.length) {
        input.classList.add("filled");
      } else {
        input.classList.remove("filled");
      }
    }
  };

  document.addEventListener("blur", toggleInput, true);
  document.addEventListener("input", toggleInput, true);
})();

/***/ }),

/***/ "./scripts/modules/menu.js":
/*!*********************************!*\
  !*** ./scripts/modules/menu.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var openbtn = document.querySelector('.header__link--burger');
var menu = document.querySelector('.header__menu');

var bodyScrollLock = __webpack_require__(/*! body-scroll-lock */ "../node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js");

var popupCover = document.querySelector('.popup-cover');
var disableBodyScroll = bodyScrollLock.disableBodyScroll;
var enableBodyScroll = bodyScrollLock.enableBodyScroll;
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

if (menu !== null) {
  var openMenu = function openMenu() {
    menu.classList.add("opened");
    popupCover.classList.add("is-shown");
    disableBodyScroll(menu);
  };

  var closeMenu = function closeMenu() {
    menu.classList.remove("opened");
    popupCover.classList.remove("is-shown");
    enableBodyScroll(menu);
  };

  var handleGesture = function handleGesture() {
    if (touchendY > touchstartY + 50) {
      closeMenu();
    }
  };

  menu.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);
  menu.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  }, false);
  openbtn.addEventListener("click", openMenu);
  document.addEventListener('swiped-down', closeMenu);
}

/***/ }),

/***/ "./scripts/modules/range.js":
/*!**********************************!*\
  !*** ./scripts/modules/range.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var rangeInputs = document.querySelectorAll('input[type="range"]');

if (rangeInputs !== null && rangeInputs.length > 0) {
  var handleInputChange = function handleInputChange(e) {
    var target = e.target;

    if (e.target.type !== 'range') {
      target = document.getElementById('range');
    }

    var min = target.min;
    var max = target.max;
    var val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    var newVal = new Intl.NumberFormat('de-DE').format(val);
    rangenumber.value = newVal;
  };

  rangeInputs.forEach(function (input) {
    input.addEventListener('input', handleInputChange);
  });
}

/***/ }),

/***/ "./scripts/modules/reset.js":
/*!**********************************!*\
  !*** ./scripts/modules/reset.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var list = document.querySelectorAll("input[type=checkbox]");
var reset = document.querySelector("#reset");

if (reset !== null) {
  var uncheckAll = function uncheckAll() {
    document.querySelectorAll('.filter__form input[type="checkbox"]').forEach(function (el) {
      return el.checked = false;
    });
    reset.classList.add("is-disabled");
  };

  reset.addEventListener("click", uncheckAll);

  for (var index = 0; index < list.length; index++) {
    var checkbox = list[index];

    checkbox.onclick = function () {
      // console.log(list);
      reset.classList.remove("is-disabled");
    };
  }
}

/***/ }),

/***/ "./scripts/modules/tabs.js":
/*!*********************************!*\
  !*** ./scripts/modules/tabs.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("load", function () {
  var myTabs = document.querySelectorAll(".js-tab-link");

  if (myTabs !== null && myTabs.length > 0) {
    var myTabClicks = function myTabClicks(tabClickEvent) {
      for (var i = 0; i < myTabs.length; i++) {
        myTabs[i].classList.remove("is-active");
      }

      var clickedTab = tabClickEvent.currentTarget;
      clickedTab.classList.add("is-active");
      tabClickEvent.preventDefault();
      var myContentPanes = document.querySelectorAll(".tab-panes__item");

      for (i = 0; i < myContentPanes.length; i++) {
        myContentPanes[i].classList.remove("is-active");
      }

      var anchorReference = tabClickEvent.target;
      var activePaneId = anchorReference.getAttribute("href");
      var activePane = document.querySelector(activePaneId);
      activePane.classList.add("is-active");
    };

    for (i = 0; i < myTabs.length; i++) {
      myTabs[i].addEventListener("click", myTabClicks);
    }
  }
});

/***/ }),

/***/ "./scripts/utils/responsive.js":
/*!*************************************!*\
  !*** ./scripts/utils/responsive.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  var MOBILE = 767;
  var TABLET = 1023;

  window.isMobile = function () {
    return window.matchMedia("(max-width: ".concat(MOBILE, "px)")).matches;
  };

  window.isTablet = function () {
    return window.matchMedia("(max-width: ".concat(TABLET, "px)")).matches;
  };

  window.isDesktop = function () {
    return window.matchMedia("(min-width: ".concat(TABLET + 1, "px)")).matches;
  };

  window.isMobileSafari = function () {
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iP(ad|od|hone)/i);
    var webkit = !!ua.match(/WebKit/i);
    return iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i);
  };
})();

/***/ }),

/***/ "./scripts/vendor.js":
/*!***************************!*\
  !*** ./scripts/vendor.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// jQuery
// window.$ = window.jQuery = require('jquery');
// jQuery Plugins
// NativeJS

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map