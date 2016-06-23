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

	__webpack_require__(1);
	var PhysicsParticle = __webpack_require__(5);
	var Vector2 = __webpack_require__(6);

	function init() {
		// CANVAS SETUP
		document.body.appendChild(canvas); 
		canvas.width = SCREEN_WIDTH; 
		canvas.height = SCREEN_HEIGHT;
		setInterval(loop, 1000 / 30);

		var preload = new createjs.LoadQueue();
		preload.addEventListener("fileload", handleFileComplete);
		preload.addEventListener("progress", handleProgress);
		preload.loadFile("img/2016_03_14_Checkout_Flow_Vis_D-Desktop_RD5.png");// simulate content download
		
		// need to configure webpack to bundle a secondary js file for site assets above...
		
	}

	document.addEventListener('DOMContentLoaded', init);

	function handleFileComplete(event) {
		
		TweenLite.to(canvas, 1.2, {
	  		onUpdate: function(){
		  		repelBase = 50+(this.ratio*500);
		  	},
	  		css:{opacity: 0.2},
	  		ease:Power1.easeInOut,
	  	});

		particles.forEach(function(el){
			// enlarge the jelly dots!
			TweenLite.to(el, 1.2, {
		  		radius: 50,
		  		ease:Power1.easeInOut,
		  	});
		});

	}
	function handleProgress(event) {
		console.log('img load progress.. '+Math.round(event.progress*100));
		var prcnt = Math.round(event.progress*20);
		makeParticle(Math.round(prcnt - particles.length));
	}

	// screen size variables
	var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight,
	HALF_WIDTH = window.innerWidth / 2,
	HALF_HEIGHT = window.innerHeight / 2,

	// canvas element and 2D context
	canvas = document.createElement( 'canvas' ),
	context = canvas.getContext( '2d' ),

	particles = [],
	MAX_PARTICLES = 100,
	repelBase = 50;


	function loop() {

		var repelforce = new Vector2(0,0),
			mag, 
			repelstrength; 
		
		for (i=0; i<particles.length; i++)
		{
			var p1 = particles[i]; 
			
			repelforce.copyFrom(p1.pos);
			repelforce.x-=HALF_WIDTH;
			repelforce.y-=HALF_HEIGHT;
			//
			mag = repelforce.magnitude();
			repelstrength = (mag - 200) *-0.1;
			//console.log('repelstrength: '+repelstrength);
			repelforce.divideEq(mag);
			repelforce.multiplyEq(repelstrength);

			if(repelstrength<0) 	p1.force.plusEq(repelforce); 

			for(j=i+1; j<particles.length; j++)
			{
				var p2 = particles[j];

				repelforce.copyFrom(p2.pos);
				repelforce.minusEq(p1.pos);
				mag = repelforce.magnitude();
				repelstrength = repelBase-mag;// jw mod

				if(repelstrength>0)
				{
					repelforce.divideEq(mag);
					repelforce.multiplyEq(repelstrength*0.025);
				
					p1.force.minusEq(repelforce);
					p2.force.plusEq(repelforce);
				}
			}	
		}
		
		context.fillStyle="rgb(0,0,25)";
		context.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);

		// clear the canvas
		context.strokeStyle = '#fff'; 
		context.lineWidth =1;
		
	  	// iteratate through each particle
		for (i=0; i<particles.length; i++)
		{
			var particle = particles[i]; 
			// and then update. We always render first so particle
			// appears in the starting point.
			particle.update();
			
			// render it
			particle.render(context); 
		}
		
		// Keep taking the oldest particles away until we have 
		// fewer than the maximum allowed.
		while(particles.length>MAX_PARTICLES)
			particles.shift(); 
		
	}

	function makeParticle(particleCount) {
		//console.log('makeParticle() : '+particleCount);
		for(var i=0; i<particleCount;i++)
		{
			// create a new particle in the middle of the stage
			var particle = new PhysicsParticle(HALF_WIDTH, HALF_HEIGHT); 
			particle.pos.reset(HALF_WIDTH, HALF_HEIGHT); 
			particle.vel.reset(1,0);
			particle.vel.rotate(Math.random()*360);
			//particle.drag = 0.98;
			particle.drag = 0.86;
				
			// add it to the array
			particles.push(particle);
			loop();// jw edit
		}
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n\tmargin: 0;\n    padding: 0;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Vector2 = __webpack_require__(6);

	function PhysicsParticle(posx, posy)
	{

		// the position of the particle
		this.pos = new Vector2(posx, posy); 
		
		// the velocity 
		this.vel = new Vector2(0, 0); 
		
		this.force = new Vector2(0,0); 
		
		// multiply the velocity by this every frame to create
		// drag. A number between 0 and 1, closer to one is 
		// more slippery, closer to 0 is more sticky. values
		// below 0.6 are pretty much stuck :) 
		this.drag = 1; 
		
		this.radius = 10; 
		
		this.update = function() 
		{
		
			// simulate drag
			this.vel.multiplyEq(this.drag); 
			
			this.vel.plusEq(this.force); 
			
			// and the velocity to the position
			this.pos.plusEq(this.vel);
		 
			this.force.reset(0,0); 
		};
		
		this.render = function(c)
		{
			// set the fill style to have the right alpha
			c.strokeStyle = "rgba(255,255,255,"+this.alpha+")";
			
			// draw a circle of the required size
			c.beginPath();
			c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
			c.closePath();
			
			// and fill it
			c.stroke();
		
		};


	}


	function randomRange(min, max)
	{
		return ((Math.random()*(max-min)) + min); 
	}

	module.exports = PhysicsParticle;


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	var Vector2 = function (x,y) {
		
		this.x= x || 0; 
		this.y = y || 0; 
		
	};

	Vector2.prototype = {

		reset: function ( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		},

		toString : function (decPlaces) {
		 	decPlaces = decPlaces || 3; 
			var scalar = Math.pow(10,decPlaces); 
			return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + "]";
		},
		
		clone : function () {
			return new Vector2(this.x, this.y);
		},
		
		copyTo : function (v) {
			v.x = this.x;
			v.y = this.y;
		},
		
		copyFrom : function (v) {
			this.x = v.x;
			this.y = v.y;
		},	
		
		magnitude : function () {
			return Math.sqrt((this.x*this.x)+(this.y*this.y));
		},
		
		magnitudeSquared : function () {
			return (this.x*this.x)+(this.y*this.y);
		},
		
		normalise : function () {
			
			var m = this.magnitude();
					
			this.x = this.x/m;
			this.y = this.y/m;

			return this;	
		},
		
		reverse : function () {
			this.x = -this.x;
			this.y = -this.y;
			
			return this; 
		},
		
		plusEq : function (v) {
			this.x+=v.x;
			this.y+=v.y;
			
			return this; 
		},
		
		plusNew : function (v) {
			 return new Vector2(this.x+v.x, this.y+v.y); 
		},
		
		minusEq : function (v) {
			this.x-=v.x;
			this.y-=v.y;
			
			return this; 
		},

		minusNew : function (v) {
		 	return new Vector2(this.x-v.x, this.y-v.y); 
		},	
		
		multiplyEq : function (scalar) {
			this.x*=scalar;
			this.y*=scalar;
			
			return this; 
		},
		
		multiplyNew : function (scalar) {
			var returnvec = this.clone();
			return returnvec.multiplyEq(scalar);
		},
		
		divideEq : function (scalar) {
			this.x/=scalar;
			this.y/=scalar;
			return this; 
		},
		
		divideNew : function (scalar) {
			var returnvec = this.clone();
			return returnvec.divideEq(scalar);
		},

		dot : function (v) {
			return (this.x * v.x) + (this.y * v.y) ;
		},
		
		angle : function (useRadians) {
			
			return Math.atan2(this.y,this.x) * (useRadians ? 1 : Vector2Const.TO_DEGREES);
			
		},
		
		rotate : function (angle, useRadians) {
			
			var cosRY = Math.cos(angle * (useRadians ? 1 : Vector2Const.TO_RADIANS));
			var sinRY = Math.sin(angle * (useRadians ? 1 : Vector2Const.TO_RADIANS));
		
			Vector2Const.temp.copyFrom(this); 

			this.x= (Vector2Const.temp.x*cosRY)-(Vector2Const.temp.y*sinRY);
			this.y= (Vector2Const.temp.x*sinRY)+(Vector2Const.temp.y*cosRY);
			
			return this; 
		},	
			
		equals : function (v) {
			return((this.x==v.x)&&(this.y==v.x));
		},
		
		isCloseTo : function (v, tolerance) {	
			if(this.equals(v)) return true;
			
			Vector2Const.temp.copyFrom(this); 
			Vector2Const.temp.minusEq(v); 
			
			return(Vector2Const.temp.magnitudeSquared() < tolerance*tolerance);
		},
		
		rotateAroundPoint : function (point, angle, useRadians) {
			Vector2Const.temp.copyFrom(this); 
			Vector2Const.temp.minusEq(point);
			Vector2Const.temp.rotate(angle, useRadians);
			Vector2Const.temp.plusEq(point);
			this.copyFrom(Vector2Const.temp);
		}, 
		
		isMagLessThan : function (distance) {
			return(this.magnitudeSquared()<distance*distance);
		},
		
		isMagGreaterThan : function (distance) {
			return(this.magnitudeSquared()>distance*distance);
		}

	};

	Vector2Const = {
		TO_DEGREES : 180 / Math.PI,		
		TO_RADIANS : Math.PI / 180,
		temp : new Vector2()
	};

	module.exports = Vector2;


/***/ }
/******/ ]);