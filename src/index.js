import { render } from 'less';
import './css.less'
let dataList = {};
let timeSeries = {};
let seckillType = 'whole';

// timeSeries:{[8,9,10,11,12,14],[20],["未开始","抢购中","秒杀结束"]}




function init(killType,timeS,dataList){
    let timeflg =  setInterval(timer,1000);
    timeSeries = processTime(killType,timeS);
     renders(timeSeries);
  
}

function processTime(type,obj){
    seckillType = type ? type : seckillType;
    let queue = {};
        obj = obj ? obj : [];
        let tempA = obj[0];
        for(let i = 0; i < tempA.length; i++){
            queue[tempA[i]] = {};
            let c = obj[1].length;
            let s = obj[2].length;
            if(typeof tempA[i] === "object"){
                queue[tempA[i]]["pre"] = i;
            } 
            queue[tempA[i]]["startTime"] = getTimes(tempA[i]);
            queue[tempA[i]]["endTime"] = c > i ?  addTimes(queue[tempA[i]]["startTime"],obj[1][i]) : addTimes(queue[tempA[i]]["startTime"],obj[1][c-1])
            queue[tempA[i]]["state"] = s > i ? typeof obj[2][i] === "object" ? obj[2][i] : obj[2] : typeof obj[2][s-1] ==="object" ? obj[2][s-1] : obj[2];
        }
       
      return queue;
}
function timer(){
//    let stamp = getTime();
//    console.log(stamp);
}
function addTimes(start,inter){
    return start + inter * 60000;
}
function getTimes(str){
    str += "";
     let nowTime = new Date();
     let tempA = str.split(":");
     tempA[0] ? nowTime.setHours(+tempA[0]) : nowTime.setHours(0);
     tempA[1] ? nowTime.setMinutes(+tempA[1]) : nowTime.setMinutes(0);
     tempA[3] ? nowTime.setSeconds(+tempA[2]) : nowTime.setSeconds(0);
     nowTime.setUTCMilliseconds(0);

    return nowTime.getTime();
}


function renders(obj){
    console.log(obj);

}
init('whole',[[8,9,10,11,12,14],[20],["未开始","抢购中","秒杀结束"]],{});