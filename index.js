(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("sbsSS", [], factory);
	else if(typeof exports === 'object')
		exports["sbsSS"] = factory();
	else
		root["sbsSS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Nodes = /** @class */ (function () {
    function Nodes() {
    }
    Nodes.oscillator = function (ctx, shape, frequency, detune) {
        if (frequency === void 0) { frequency = 1000; }
        if (detune === void 0) { detune = 0; }
        var oscillator = ctx.createOscillator();
        oscillator.type = shape;
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune;
        return oscillator;
    };
    Nodes.gain = function (ctx) {
        var gain = ctx.createGain();
        gain.gain.value = 0;
        return gain;
    };
    return Nodes;
}());
exports.Nodes = Nodes;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// import { Nodes } from "./lib/nodes.class";
// import { SimpleSynth } from "./lib/simplesynth.class";
__webpack_require__(2);
__export(__webpack_require__(0));
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(5));
// const CONTEXT: AudioContext = new AudioContext() || new webkitAudioContext();
// const MONOOSC: OscillatorNode = Nodes.oscillator(CONTEXT, "sine", 1000, 0);
// const SIMPLESYNTH = new SimpleSynth(); 


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nodes_class_1 = __webpack_require__(0);
var SimpleSynth = /** @class */ (function () {
    function SimpleSynth() {
        this.playing = false;
        this.activeWaveform = "sine";
        try {
            window.AudioContext = AudioContext || webkitAudioContext;
            this.context = new (AudioContext || webkitAudioContext)();
        }
        catch (err) {
            alert("The Web Audio API is not supported on this browser!");
        }
    }
    SimpleSynth.prototype.init = function () {
        this.volume = nodes_class_1.Nodes.gain(this.context);
        this.volume.gain.value = this.getVolume();
        this.volume.connect(this.context.destination);
    };
    SimpleSynth.prototype.toggle = function () {
        if (!this.playing) {
            this.oscillator = nodes_class_1.Nodes.oscillator(this.context, "sine");
            this.oscillator.frequency.value = this.getFrequency();
            this.volume.gain.value = this.getVolume();
            this.oscillator.connect(this.volume);
            this.oscillator.start(0);
            this.playing = true;
            console.info("SimpleSynth oscillator started.");
        }
        else {
            this.oscillator.stop(0);
            this.playing = false;
            console.info("SimpleSynth oscillator stopped.");
        }
    };
    SimpleSynth.prototype.updateFrequency = function (target) {
        this.oscillator.frequency.value = target.valueAsNumber;
        console.log("Oscillator frequency changed to " + target.value);
    };
    SimpleSynth.prototype.updateVolume = function (target) {
        this.volume.gain.value = target.valueAsNumber;
        console.log("Oscillator gain changed to " + target.value);
    };
    SimpleSynth.prototype.updateWaveform = function (shape) {
        if (shape != this.activeWaveform) {
            var activeClass = "bg-dark-gray";
            var inactiveClass = "bg-black";
            var oldWaveform = document.getElementById(this.activeWaveform);
            var newWaveform = document.getElementById(shape);
            oldWaveform.classList.remove(activeClass);
            oldWaveform.classList.add(inactiveClass);
            newWaveform.classList.remove(inactiveClass);
            newWaveform.classList.add(activeClass);
            this.oscillator.type = shape;
            this.activeWaveform = shape;
            console.log("Waveform changed to " + shape);
        }
    };
    SimpleSynth.prototype.getVolume = function () {
        var volumeControl = document.getElementById('volume');
        return volumeControl.valueAsNumber;
    };
    SimpleSynth.prototype.getFrequency = function () {
        var pitchControl = document.getElementById('pitch');
        return pitchControl.valueAsNumber;
    };
    return SimpleSynth;
}());
exports.SimpleSynth = SimpleSynth;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.render = function () { };
    return UI;
}());
exports.UI = UI;
// <input id="volume" type="range" min="0" max="1" step="0.1" value="0.5"> 


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthTemplate = "\n\n";


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NmI3ZjAxMzg4MTRhY2I4YmRjMSIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL25vZGVzLmNsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguc2Nzcz81ODA1Iiwid2VicGFjazovLy8uL3NyYy9saWIvc2ltcGxlc3ludGguY2xhc3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi91aS5jbGFzcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3RlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM1REE7SUFBQTtJQWNBLENBQUM7SUFaaUIsZ0JBQVUsR0FBeEIsVUFBeUIsR0FBaUIsRUFBRSxLQUFxQixFQUFFLFNBQXdCLEVBQUUsTUFBa0I7UUFBNUMsNENBQXdCO1FBQUUsbUNBQWtCO1FBQzNHLElBQU0sVUFBVSxHQUFtQixHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FB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U08sK0JBQVMsR0FBakI7UUFDSSxJQUFNLGFBQWEsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXFCLENBQUM7UUFDOUYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUNPLGtDQUFZLEdBQXBCO1FBQ0ksSUFBTSxZQUFZLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFxQixDQUFDO1FBQzVGLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO0lBQ3RDLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUM7QUExRVksa0NBQVc7Ozs7Ozs7Ozs7QUNKeEI7SUFBQTtJQUdBLENBQUM7SUFERyxtQkFBTSxHQUFOLGNBQVMsQ0FBQztJQUNkLFNBQUM7QUFBRCxDQUFDO0FBSFksZ0JBQUU7QUFJZiwwRUFBMEU7Ozs7Ozs7Ozs7QUNKN0QscUJBQWEsR0FBRyxNQUU1QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic2JzU1NcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic2JzU1NcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic2JzU1NcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTZiN2YwMTM4ODE0YWNiOGJkYzEiLCJcbmV4cG9ydCBjbGFzcyBOb2RlcyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIG9zY2lsbGF0b3IoY3R4OiBBdWRpb0NvbnRleHQsIHNoYXBlOiBPc2NpbGxhdG9yVHlwZSwgZnJlcXVlbmN5OiBudW1iZXIgPSAxMDAwLCBkZXR1bmU6IG51bWJlciA9IDApIHtcbiAgICAgICAgY29uc3Qgb3NjaWxsYXRvcjogT3NjaWxsYXRvck5vZGUgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2NpbGxhdG9yLnR5cGUgPSBzaGFwZTtcbiAgICAgICAgb3NjaWxsYXRvci5mcmVxdWVuY3kudmFsdWUgPSBmcmVxdWVuY3k7XG4gICAgICAgIG9zY2lsbGF0b3IuZGV0dW5lLnZhbHVlID0gZGV0dW5lO1xuICAgICAgICByZXR1cm4gb3NjaWxsYXRvcjtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnYWluKGN0eDogQXVkaW9Db250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGdhaW46IEdhaW5Ob2RlID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgZ2Fpbi5nYWluLnZhbHVlID0gMDtcbiAgICAgICAgcmV0dXJuIGdhaW47XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9ub2Rlcy5jbGFzcy50cyIsIi8vIGltcG9ydCB7IE5vZGVzIH0gZnJvbSBcIi4vbGliL25vZGVzLmNsYXNzXCI7XG4vLyBpbXBvcnQgeyBTaW1wbGVTeW50aCB9IGZyb20gXCIuL2xpYi9zaW1wbGVzeW50aC5jbGFzc1wiO1xuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCJcblxuZXhwb3J0ICogZnJvbSBcIi4vbGliL25vZGVzLmNsYXNzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvc2ltcGxlc3ludGguY2xhc3NcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi91aS5jbGFzc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL3RlbXBsYXRlXCI7XG4vLyBjb25zdCBDT05URVhUOiBBdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCkgfHwgbmV3IHdlYmtpdEF1ZGlvQ29udGV4dCgpO1xuXG4vLyBjb25zdCBNT05PT1NDOiBPc2NpbGxhdG9yTm9kZSA9IE5vZGVzLm9zY2lsbGF0b3IoQ09OVEVYVCwgXCJzaW5lXCIsIDEwMDAsIDApO1xuXG4vLyBjb25zdCBTSU1QTEVTWU5USCA9IG5ldyBTaW1wbGVTeW50aCgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguc2Nzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBOb2RlcyB9IGZyb20gXCIuL25vZGVzLmNsYXNzXCI7XG5cbmV4cG9ydCB0eXBlIFdhdmUgPSBcInNpbmVcIiB8IFwic3F1YXJlXCIgfCBcInNhd3Rvb3RoXCJcblxuZXhwb3J0IGNsYXNzIFNpbXBsZVN5bnRoIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSBBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IChBdWRpb0NvbnRleHQgfHwgd2Via2l0QXVkaW9Db250ZXh0KSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlIFdlYiBBdWRpbyBBUEkgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIGJyb3dzZXIhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSBOb2Rlcy5nYWluKHRoaXMuY29udGV4dClcbiAgICAgICAgdGhpcy52b2x1bWUuZ2Fpbi52YWx1ZSA9IHRoaXMuZ2V0Vm9sdW1lKCk7XG4gICAgICAgIHRoaXMudm9sdW1lLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9zY2lsbGF0b3IgPSBOb2Rlcy5vc2NpbGxhdG9yKHRoaXMuY29udGV4dCwgXCJzaW5lXCIpO1xuICAgICAgICAgICAgdGhpcy5vc2NpbGxhdG9yLmZyZXF1ZW5jeS52YWx1ZSA9IHRoaXMuZ2V0RnJlcXVlbmN5KCk7XG4gICAgICAgICAgICB0aGlzLnZvbHVtZS5nYWluLnZhbHVlID0gdGhpcy5nZXRWb2x1bWUoKTtcbiAgICAgICAgICAgIHRoaXMub3NjaWxsYXRvci5jb25uZWN0KHRoaXMudm9sdW1lKTtcbiAgICAgICAgICAgIHRoaXMub3NjaWxsYXRvci5zdGFydCgwKTtcbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJTaW1wbGVTeW50aCBvc2NpbGxhdG9yIHN0YXJ0ZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vc2NpbGxhdG9yLnN0b3AoMCk7XG4gICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlNpbXBsZVN5bnRoIG9zY2lsbGF0b3Igc3RvcHBlZC5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVGcmVxdWVuY3kodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIHRoaXMub3NjaWxsYXRvci5mcmVxdWVuY3kudmFsdWUgPSB0YXJnZXQudmFsdWVBc051bWJlcjtcbiAgICAgICAgY29uc29sZS5sb2coXCJPc2NpbGxhdG9yIGZyZXF1ZW5jeSBjaGFuZ2VkIHRvIFwiICsgdGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gICAgdXBkYXRlVm9sdW1lKHRhcmdldDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICB0aGlzLnZvbHVtZS5nYWluLnZhbHVlID0gdGFyZ2V0LnZhbHVlQXNOdW1iZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3NjaWxsYXRvciBnYWluIGNoYW5nZWQgdG8gXCIgKyB0YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgICB1cGRhdGVXYXZlZm9ybShzaGFwZTogV2F2ZSkge1xuICAgICAgICBpZiAoc2hhcGUgIT0gdGhpcy5hY3RpdmVXYXZlZm9ybSkge1xuICAgICAgICAgICAgbGV0IGFjdGl2ZUNsYXNzID0gXCJiZy1kYXJrLWdyYXlcIjtcbiAgICAgICAgICAgIGxldCBpbmFjdGl2ZUNsYXNzID0gXCJiZy1ibGFja1wiO1xuICAgIFxuICAgICAgICAgICAgbGV0IG9sZFdhdmVmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5hY3RpdmVXYXZlZm9ybSkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgbmV3V2F2ZWZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGFwZSkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgICAgICBvbGRXYXZlZm9ybS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIG9sZFdhdmVmb3JtLmNsYXNzTGlzdC5hZGQoaW5hY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICBuZXdXYXZlZm9ybS5jbGFzc0xpc3QucmVtb3ZlKGluYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgbmV3V2F2ZWZvcm0uY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLm9zY2lsbGF0b3IudHlwZSA9IHNoYXBlIGFzIE9zY2lsbGF0b3JUeXBlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVXYXZlZm9ybSA9IHNoYXBlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXYXZlZm9ybSBjaGFuZ2VkIHRvIFwiICsgc2hhcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFBVQkxJQyBQUk9QRVJUSUVTXG4gICAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ6IEF1ZGlvQ29udGV4dDtcblxuICAgIC8vIFBSSVZBVEUgUFJPUEVSVElFU1xuICAgIHByaXZhdGUgb3NjaWxsYXRvcjogT3NjaWxsYXRvck5vZGU7XG4gICAgcHJpdmF0ZSB2b2x1bWU6IEdhaW5Ob2RlO1xuICAgIHByaXZhdGUgcGxheWluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgYWN0aXZlV2F2ZWZvcm06IFdhdmUgPSBcInNpbmVcIlxuICAgIHByaXZhdGUgZ2V0Vm9sdW1lKCkge1xuICAgICAgICBjb25zdCB2b2x1bWVDb250cm9sOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvbHVtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiB2b2x1bWVDb250cm9sLnZhbHVlQXNOdW1iZXI7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0RnJlcXVlbmN5KCkge1xuICAgICAgICBjb25zdCBwaXRjaENvbnRyb2w6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl0Y2gnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICByZXR1cm4gcGl0Y2hDb250cm9sLnZhbHVlQXNOdW1iZXI7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvc2ltcGxlc3ludGguY2xhc3MudHMiLCJleHBvcnQgY2xhc3MgVUkge1xuXG4gICAgcmVuZGVyKCl7fVxufVxuLy8gPGlucHV0IGlkPVwidm9sdW1lXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgdmFsdWU9XCIwLjVcIj5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL3VpLmNsYXNzLnRzIiwiZXhwb3J0IGNvbnN0IFN5bnRoVGVtcGxhdGUgPSBgXG5cbmBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL3RlbXBsYXRlLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==