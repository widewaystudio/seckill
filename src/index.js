import   'less';
import './css.less'
import $ from './jquery.js'
let dataList = {};
let timeSeries = {};
let seckillType = 'whole';
let target = document.getElementsByClassName('contain')[0];

// timeSeries:{[8,9,10,11,12,14],[20],["未开始","抢购中","秒杀结束"]}

function init(killType,timeS,dataList){
    let timeflg = null;
    timeSeries = processTime(killType,timeS);
    let s = getNow();
     renders(timeSeries,new Date(s()));
     let timer = main();
     timeflg =  setInterval(function(){
         timer(timeSeries)
        },1000);
}

function processTime(type,obj){
    seckillType = type ? type : seckillType;
    let queue = {};
        obj = obj ? obj : [];
        let tempA = obj[0];
        for(let i = 0; i < tempA.length; i++){
            queue[tempA[i]] = {};
            let c = obj[1] == null ? 0 : obj[1].length;
            let s = obj[2].length;
            if(typeof tempA[i] === "object"){
                queue[tempA[i]]["pre"] = i;
            } 
            queue[tempA[i]]["startTime"] = getTimes(tempA[i]);
            if(c > 0){
                queue[tempA[i]]["endTime"] = c > i ?  addTimes(queue[tempA[i]]["startTime"],obj[1][i]) : addTimes(queue[tempA[i]]["startTime"],obj[1][c-1])
            }else{
                queue[tempA[i]]["endTime"] = i != tempA.length -1 ? getTimes(tempA[i + 1]) : getTimes("23:59:59");
            }            
            queue[tempA[i]]["state"] = s > i ? typeof obj[2][i] === "object" ? obj[2][i] : obj[2] : typeof obj[2][s-1] ==="object" ? obj[2][s-1] : obj[2];
        }

      return queue;
}

function main(){
    let flg = null,
    newFlag = null;
    let s = getNow();
    return function (obj){
        let stamp = new Date(s()),
            key = stamp.getHours();
        if(obj[key]){
            newFlag = key + "#" + compare(stamp,obj[key].startTime,obj[key].endTime); 
        }
        if(flg !== newFlag){
            renders(obj,stamp);
            flg = newFlag;
        } 
       
    }
}


function addTimes(start,inter){
   inter = inter > 1 ? inter > 60 ? 60 : inter : 1;
    return  start + inter * 60000 ;
}
function getTimes(str){
    let s = getNow();
    str += "";
     let nowTime = new Date(s());
     let tempA = str.split(":");
     tempA[0] ? nowTime.setHours(+tempA[0]) : nowTime.setHours(0);
     tempA[1] ? nowTime.setMinutes(+tempA[1]) : nowTime.setMinutes(0);
     tempA[3] ? nowTime.setSeconds(+tempA[2]) : nowTime.setSeconds(0);
     nowTime.setUTCMilliseconds(0);

    return nowTime.getTime();
}
function compare(now,begin,end){
    return now < begin ? 0 : now < end ? 1 : 2;
}

function strHandle(str){
    return ("0"+ str).slice(-2);
}


function getNow(){
    let startTime = initTime,
        begin = new Date();
        return function(){
            let end = new Date(),
            diff =  end  - begin;
            diff = diff > 2000 ? 1000 : diff;
            startTime += diff;
            begin = end;
            return startTime;            
        }
}

function renders(obj,T){    
    let tempS = '';
   for(let key in obj){
       let tempT = new Date(obj[key].startTime),
       times = '',
       stateIndex = 0;
      times = strHandle( tempT.getHours());
      times += ":" + strHandle(tempT.getMinutes());
      stateIndex = compare(T,obj[key].startTime,obj[key].endTime);     
 
      let flg = stateIndex == 1 ? 'active' : '';   
      tempS += `<div class="item ${flg}" id="${key}"><span>${times}</span><span>${obj[key]["state"][stateIndex]}</span></div>`
   } 
   target.innerHTML = tempS;

}

window.onload = function(){
    init('whole',[[0,1,8,9,10,11,12,14,16,17],[],["即将开始","抢购中","秒杀结束"]],{});
}




