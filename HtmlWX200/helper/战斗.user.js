// ==UserScript==
// @name         战斗
// @namespace    http://tampermonkey.net/
// @version      2.3.9
// @description  try to take over the world!
// @author       You
// @match        http://*.yytou.cn/*
// @exclude      http://res.yytou.cn/*
// @exclude      http://sword.mud.yytou.cn/*
// @grant        none
// ==/UserScript==


var buttonWidth = '24px';   // 按钮宽度
var buttonHeight = '20px';  // 按钮高度
var currentPos = 270;        // 当前按钮距离顶端高度，初始130

var delta = 40;                 // 每个按钮间隔

//-------------------------分割线-----------

mySkillLists = "九天龙吟剑法;排云掌法;如来神掌;覆雨剑法;雪饮狂刀;翻云刀法;";


//-------------------------分割线-----------




function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

//-------------------------分割线-----------

var isDelayCmd = 1, // 是否延迟命令
    cmdCache = [],      // 命令池
    timeCmd = null,     // 定时器句柄
    cmdDelayTime = 200; // 命令延迟时间

// 执行命令串
function go(str) {
    var arr = str.split(";");
    if (isDelayCmd && cmdDelayTime) {
        // 把命令存入命令池中
        cmdCache = cmdCache.concat(arr);

        // 当前如果命令没在执行则开始执行
        if (!timeCmd) delayCmd();
    } else {
        for (var i = 0; i < arr.length; i++) clickButton(arr[i]);
    }
}

// 执行命令池中的命令
function delayCmd() {
    // 执行命令池中第一个命令，并从池中删除
    var cmd=cmdCache.shift();
    var arr=cmd.split(",");
    if(!sock) {
        return;
    }
    clickButton(arr[0]);
    for(var i=arr.length-1;i>0;i--){
        cmdCache.unshift(arr[i]);
    }

    // 如果命令池还有命令，则延时继续执行
    if (cmdCache.length > 0) {
        timeCmd = setTimeout(delayCmd, cmdDelayTime);
    } else {
        // 没有命令 则归零
        timeCmd = 1;
        setTimeout(function(){
            if(cmdCache.length === 0)
                timeCmd=0;
            else
                delayCmd();
        },cmdDelayTime);
    }

}


// 停止执行
function stopDelayCmd() {
    // 清除计时器
    clearTimeout(timeCmd);

    // 归零计时器
    timeCmd = 0;

    // 清除命令池
    cmdCache = [];
}

///-------------------------分割线-----------


var curstamp=0;
var prestamp=0;
var cmdlist=[];

var deadlock=0;
function overrideclick(cmd){
	deadlock=1;
	cmdlist.push(cmd);
	console.log(cmdlist);
	deadlock=0;
}

// 自动战斗 -------------------------------------------------------
var ZDZDButton = document.createElement('button');
ZDZDButton.innerText = '#';
ZDZDButton.style.position = 'absolute';
ZDZDButton.style.right = '0px';
ZDZDButton.style.top = currentPos + 'px';
currentPos = currentPos + delta;
ZDZDButton.style.width = buttonWidth+1;
ZDZDButton.style.height = buttonHeight;
document.body.appendChild(ZDZDButton);
ZDZDButton.addEventListener('click', ZDZD);
var ZDZDstep=0;
function ZDZD(){

    if(ZDZDButton.innerText  == '#'){
        AutoKill1Func();

        ZDZDButton.innerText  = '*';}
    else{clearKill2();
         {ZDZDButton.innerText  = '#';}
        }

    function AutoKill1Func(){
        // 间隔500毫秒查找比试一次
        AutoKill1FuncIntervalFunc = setInterval(AutoKill1,500);
    }

    function clearKill2(){
        clearInterval(AutoKill1FuncIntervalFunc);
    }

    function AutoKill1(){
        ninesword();
        if($('span.outbig_text:contains(战斗结束)').length>0){
            go('prev_combat');
        }
    }
}
//---------------------------------------------------------------------------


// 一键恢复------------------------------------------------------------------------------------------------------
	var yjhfButton = document.createElement('button');
	yjhfButton.innerText = '+';
	yjhfButton.style.position = 'absolute';
	yjhfButton.style.right = '0px';
	yjhfButton.style.top =currentPos +  'px';
	currentPos = currentPos + delta;
	yjhfButton.style.width = buttonWidth+ 1;
	yjhfButton.style.height = buttonHeight;
	document.body.appendChild(yjhfButton);
	yjhfButton.addEventListener('click', yjhfFunc);
	var healtriger=0;
	function yjhfFunc(){
	   if (healtriger==0){
		   healtriger=1;
		   healFunc();
		   yjhfButton.innerText = '*';
	   }else{
		   yjhfButton.innerText = '+';
		   healtriger=0;
	   }
	}
function healFunc(){
		if (healtriger==0){
			return;
		}
		var kee=parseInt(g_obj_map.get("msg_attrs").get("kee"));
		var max_kee=parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		var force=parseInt(g_obj_map.get("msg_attrs").get("force"));
		var max_force=parseInt(g_obj_map.get("msg_attrs").get("max_force"));
		console.log("血量是: "+kee+"/"+max_kee);
		console.log("内力是: "+force+"/"+max_force);
		if (kee<max_kee){
			if (force>0)
			clickButton('recovery',0);
			else
			clickButton('items use snow_qiannianlingzhi');
			console.log("治疗中.....");
			setTimeout(function(){healFunc()},200);
		}else{
			if (force<max_force){
				clickButton('items use snow_qiannianlingzhi');
				console.log("治疗中.....");
				setTimeout(function(){healFunc()},200);
			}else{
				yjhfButton.innerText = '+';
		   		healtriger=0;
			}
		}
	}

// 奇侠列表
var  qxymFuncButton = document.createElement('button');
  qxymFuncButton.innerText = '奇';
  qxymFuncButton.style.position = 'absolute';
  qxymFuncButton.style.right = '0px';
  qxymFuncButton.style.top = currentPos + 'px';
currentPos = currentPos + delta;
  qxymFuncButton.style.width = buttonWidth;
  qxymFuncButton.style.height = buttonHeight;
document.body.appendChild(  qxymFuncButton);
  qxymFuncButton.addEventListener('click',   qxymFunc);

function qxymFunc(){
    clickButton('open jhqx');
}




//战斗调用通用脚本----------------------------------------------------
var banSkills = "天师灭神剑|茅山道术";
function ninesword(){
    zdskill = mySkillLists;
    setTimeout(ninesword1,1000);
    if($('span.outbig_text:contains(战斗结束)').length>0){
        go('prev_combat');
    }
}
function ninesword1(){
    // 如果找到设置的技能则释放
    for(var i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && isContains(zdskill, skillName)){
            console.log(skillName);
            go('playskill '+i);
            return;
        }
    }

    // 如果没找到设置技能，随便用一个非招bb的技能
    for(i = 1;i < 5;i++){
        skillName = $('#skill_'+i).children().children().text();
        if(skillName !== "" && !isContains(banSkills, skillName)){
            console.log(skillName);
            go('playskill '+i);
            return;
        }
    }
}