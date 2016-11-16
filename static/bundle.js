/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Triangels = __webpack_require__(1);

	var inst = new Triangels({
	    element: document.getElementById('triangles')
	});

	var input = document.getElementById('uid');
	var button = document.getElementById('mutual');
	var message = document.getElementById('message');
	var busy = false;

	button.addEventListener('click', function () {
	    if (busy) return;
	    busy = true;
	    message.parentNode.classList.add('hide');
	    setTimeout(function () {
	        message.innerHTML = 'Please wait.';
	        message.parentNode.classList.remove('hide');

	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', 'request?id=' + input.value);

	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                    message.parentNode.classList.add('hide');
	                    setTimeout(function () {
	                        message.innerHTML = xhr.responseText;
	                        message.parentNode.classList.remove('hide');
	                        busy = false;
	                    }, 200);
	                    data.done(xhr.responseText);
	                }
	            }
	        };

	        xhr.send();
	    }, 200);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Triangles = function () {
	    function Triangles(options) {
	        var _this = this;

	        _classCallCheck(this, Triangles);

	        var self = this;

	        if (!options || !options.element) {
	            return;
	        }

	        this.canvas = options.element;
	        if (!this.canvas.getContext) {
	            return;
	        }
	        this.ctx = this.canvas.getContext('2d');
	        this.trigList = Array.apply(null, Array(25)).map(Number.prototype.valueOf, 0);
	        this.lastX = null;
	        this.lastY = null;

	        this.resize();

	        this.trigList = this.trigList.map(function (item) {
	            return {
	                x: Math.random() * self.canvas.width,
	                y: Math.random() * self.canvas.height * 1.8,
	                a: Math.random() / 8 + 0.5,
	                s: Math.random() * 0.5 + 0.4,
	                r: Math.random() / 2 + 0.5,
	                c: 'rgba(0, 0, 0, ' + (0.5 * Math.random() + 0.2) + ')'
	            };
	        });

	        console.log(this.trigList);

	        window.addEventListener('resize', function () {
	            _this.resize();
	            _this.render(true);
	        });

	        this.interval = setInterval(function () {
	            _this.render();
	        }, 12);
	    }

	    _createClass(Triangles, [{
	        key: 'drawTriangle',
	        value: function drawTriangle(x, y, raito, fillStyle) {
	            var width = 80;
	            var height = 96;

	            // Set up the fill style.
	            this.ctx.fillStyle = fillStyle;

	            // Draw this triangle.
	            this.ctx.beginPath();
	            this.ctx.moveTo(x + 0.5 * width * raito, y);
	            this.ctx.lineTo(x, y + height * raito);
	            this.ctx.lineTo(x + width * raito, y + height * raito);
	            this.ctx.lineTo(x + 0.5 * width * raito, y);
	            this.ctx.fill();
	        }
	    }, {
	        key: 'render',
	        value: function render(noUpdate) {
	            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.trigList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;

	                    this.drawTriangle(item.x, item.y, item.r, item.c);
	                    if (noUpdate) {
	                        continue;
	                    }
	                    item.y -= item.s;
	                    if (item.y < -150) {
	                        item.y = this.canvas.height;
	                        item.x = Math.random() * window.innerWidth;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            this.canvas.width = window.innerWidth;
	            this.canvas.height = "60";
	        }
	    }]);

	    return Triangles;
	}();

	module.exports = Triangles;

/***/ }
/******/ ]);