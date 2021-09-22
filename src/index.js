import   'less';
import './css.less'
let dataList = {};
let timeSeries = {};
let seckillType = 'whole';
let target = document.getElementsByClassName('contain')[0];

// timeSeries:{[8,9,10,11,12,14],[20],["未开始","抢购中","秒杀结束"]}




function init(killType,timeS,dataList){
    
    timeSeries = processTime(killType,timeS);
     renders(timeSeries);
     let timer = main();
     let timeflg =  setInterval(function(){
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
                queue[tempA[i]]["endTime"] = i != tempA.length -1 ? addTimes(queue[tempA[i]],getTimes(tempA[i + 1])) : addTimes(queue[tempA[i]],getTimes("23:59:59"))
            }            
            queue[tempA[i]]["state"] = s > i ? typeof obj[2][i] === "object" ? obj[2][i] : obj[2] : typeof obj[2][s-1] ==="object" ? obj[2][s-1] : obj[2];
        }
      return queue;
}

function main(){
    let flg = null;
    return function (obj){
        let stamp = new Date(),
            newFlag,
            key = stamp.getHours();
        if(obj[key]){
            newFlag = stamp.getHours + "#" + compare(stamp,obj[key].startTime,obj[key].endTime); 
        }
        if(flg !== newFlag){
            renders(obj);
            flg = newFlag;
        }
    }
}


function addTimes(start,inter){
   inter = typeof inter === 'number' ? inter : 0;
    return inter < 60 ? start + inter * 60000 : inter;
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
function compare(now,begin,end){
    return now < begin ? 0 : now < end ? 1 : 2;
}

function strHandle(str){
    return ("0"+ str).slice(-2);
}
function renders(obj){    
    let tempS = '',
       nowT = new Date();
   for(let key in obj){
       let tempT = new Date(obj[key].startTime),
       times = '',
       stateIndex = 0;
      times = strHandle( tempT.getHours());
      times += ":" + strHandle(tempT.getMinutes());
      stateIndex = compare(nowT,obj[key].startTime,obj[key].endTime);     
 
      let flg = stateIndex == 1 ? 'active' : '';   
      tempS += `<div class="item ${flg}" id="${key}"><span>${times}</span><span>${obj[key]["state"][stateIndex]}</span></div>`
   } 
   target.innerHTML = tempS;

}
init('whole',[[0,1,8,9,10,11,12,14,16,17],[],["即将开始","抢购中","秒杀结束"]],{});