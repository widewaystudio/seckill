/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("let dataList = {};\r\nlet timeSeries = {};\r\nlet seckillType = 'whole';\r\nlet target = document.getElementsByClassName('contain')[0];\r\n\r\n// timeSeries:{[8,9,10,11,12,14],[20],[\"未开始\",\"抢购中\",\"秒杀结束\"]}\r\n\r\nfunction init(killType,timeS,dataList){\r\n    let timeflg = null;\r\n    timeSeries = processTime(killType,timeS);\r\n    let s = getNow();\r\n     renders(timeSeries,new Date(s()));\r\n     let timer = main();\r\n     timeflg =  setInterval(function(){\r\n         timer(timeSeries)\r\n        },1000);\r\n}\r\n\r\nfunction processTime(type,obj){\r\n    seckillType = type ? type : seckillType;\r\n    let queue = {};\r\n        obj = obj ? obj : [];\r\n        let tempA = obj[0];\r\n        for(let i = 0; i < tempA.length; i++){\r\n            queue[tempA[i]] = {};\r\n            let c = obj[1] == null ? 0 : obj[1].length;\r\n            let s = obj[2].length;\r\n            if(typeof tempA[i] === \"object\"){\r\n                queue[tempA[i]][\"pre\"] = i;\r\n            } \r\n            queue[tempA[i]][\"startTime\"] = getTimes(tempA[i]);\r\n            if(c > 0){\r\n                queue[tempA[i]][\"endTime\"] = c > i ?  addTimes(queue[tempA[i]][\"startTime\"],obj[1][i]) : addTimes(queue[tempA[i]][\"startTime\"],obj[1][c-1])\r\n            }else{\r\n                queue[tempA[i]][\"endTime\"] = i != tempA.length -1 ? getTimes(tempA[i + 1]) : getTimes(\"23:59:59\");\r\n            }            \r\n            queue[tempA[i]][\"state\"] = s > i ? typeof obj[2][i] === \"object\" ? obj[2][i] : obj[2] : typeof obj[2][s-1] ===\"object\" ? obj[2][s-1] : obj[2];\r\n        }\r\n\r\n      return queue;\r\n}\r\n\r\nfunction main(){\r\n    let flg = null,\r\n    newFlag = null;\r\n    let s = getNow();\r\n    return function (obj){\r\n        let stamp = new Date(s()),\r\n            key = stamp.getHours();\r\n        if(obj[key]){\r\n            newFlag = key + \"#\" + compare(stamp,obj[key].startTime,obj[key].endTime); \r\n        }\r\n        if(flg !== newFlag){\r\n            renders(obj,stamp);\r\n            flg = newFlag;\r\n        } \r\n    }\r\n}\r\n\r\n\r\nfunction addTimes(start,inter){\r\n   inter = inter > 1 ? inter > 60 ? 60 : inter : 1;\r\n    return  start + inter * 60000 ;\r\n}\r\nfunction getTimes(str){\r\n    let s = getNow();\r\n    str += \"\";\r\n     let nowTime = new Date(s());\r\n     let tempA = str.split(\":\");\r\n     tempA[0] ? nowTime.setHours(+tempA[0]) : nowTime.setHours(0);\r\n     tempA[1] ? nowTime.setMinutes(+tempA[1]) : nowTime.setMinutes(0);\r\n     tempA[3] ? nowTime.setSeconds(+tempA[2]) : nowTime.setSeconds(0);\r\n     nowTime.setUTCMilliseconds(0);\r\n\r\n    return nowTime.getTime();\r\n}\r\nfunction compare(now,begin,end){\r\n    return now < begin ? 0 : now < end ? 1 : 2;\r\n}\r\n\r\nfunction strHandle(str){\r\n    return (\"0\"+ str).slice(-2);\r\n}\r\n\r\n\r\nfunction getNow(){\r\n    let startTime = initTime,\r\n        begin = new Date();\r\n        return function(){\r\n            let end = new Date(),\r\n            diff =  end  - begin;\r\n            diff = diff > 2000 ? 1000 : diff;\r\n            startTime += diff;\r\n            begin = end;\r\n            return startTime;            \r\n        }\r\n}\r\n\r\nfunction renders(obj,T){    \r\n    let tempS = '';\r\n   for(let key in obj){\r\n       let tempT = new Date(obj[key].startTime),\r\n       times = '',\r\n       stateIndex = 0;\r\n      times = strHandle( tempT.getHours());\r\n      times += \":\" + strHandle(tempT.getMinutes());\r\n      stateIndex = compare(T,obj[key].startTime,obj[key].endTime);     \r\n \r\n      let flg = stateIndex == 1 ? 'active' : '';   \r\n      tempS += `<div class=\"item ${flg}\" id=\"${key}\"><span>${times}</span><span>${obj[key][\"state\"][stateIndex]}</span></div>`\r\n   } \r\n   target.innerHTML = tempS;\r\n\r\n}\r\n\r\nwindow.onload = function(){\r\n    init('whole',[[0,1,8,9,10,11,12,14,16,17,23],[],[\"即将开始\",\"抢购中\",\"秒杀结束\"]],{});\r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://widewaystudio/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;