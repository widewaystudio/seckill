/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css.less":
/*!**********************!*\
  !*** ./src/css.less ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://widewaystudio/./src/css.less?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css.less */ \"./src/css.less\");\n\r\nlet dataList = {};\r\nlet timeSeries = {};\r\nlet seckillType = 'whole';\r\n\r\n// timeSeries:{[8,9,10,11,12,14],[20],[\"未开始\",\"抢购中\",\"秒杀结束\"]}\r\n\r\n\r\n\r\n\r\nfunction init(killType,timeS,dataList){\r\n    let timeflg =  setInterval(timer,1000);\r\n    timeSeries = processTime(killType,timeS);\r\n}\r\n\r\nfunction processTime(type,obj){\r\n    seckillType = type ? type : seckillType;\r\n    let queue = {};\r\n        obj = obj ? obj : [];\r\n        let tempA = obj[0];\r\n        for(let i = 0; i < tempA.length; i++){\r\n            queue[tempA[i]] = {};\r\n            let c = obj[1].length;\r\n            let s = obj[2].length;\r\n            if(typeof tempA[i] === \"object\"){\r\n                queue[tempA[i]][\"pre\"] = i;\r\n            } \r\n            queue[tempA[i]][\"startTime\"] = getTimes(tempA[i]);\r\n            queue[tempA[i]][\"endTime\"] = c > i ?  addTimes(queue[tempA[i]][\"startTime\"],obj[1][i]) : addTimes(queue[tempA[i]][\"startTime\"],obj[1][c-1])\r\n            queue[tempA[i]][\"state\"] = s > i ? typeof obj[2][i] === \"object\" ? obj[2][i] : obj[2] : typeof obj[2][s-1] ===\"object\" ? obj[2][s-1] : obj[2];\r\n        }\r\n       \r\n        console.log(queue);\r\n\r\n      return queue;\r\n}\r\nfunction timer(){\r\n//    let stamp = getTime();\r\n//    console.log(stamp);\r\n}\r\nfunction addTimes(start,inter){\r\n    return start + inter * 60000;\r\n\r\n}\r\nfunction getTimes(str){\r\n    str += \"\";\r\n     let nowTime = new Date();\r\n     let tempA = str.split(\":\");\r\n     tempA[0] ? nowTime.setHours(+tempA[0]) : nowTime.setHours(0);\r\n     tempA[1] ? nowTime.setMinutes(+tempA[1]) : nowTime.setMinutes(0);\r\n     tempA[3] ? nowTime.setSeconds(+tempA[2]) : nowTime.setSeconds(0);\r\n     nowTime.setUTCMilliseconds(0);\r\n\r\n    return nowTime.getTime();\r\n}\r\ninit('whole',[[8,9,10,11,12,14],[20],[\"未开始\",\"抢购中\",\"秒杀结束\"]],{});\n\n//# sourceURL=webpack://widewaystudio/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;