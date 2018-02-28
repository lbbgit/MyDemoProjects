	// ==UserScript==
	// @name         论剑辅助完全版2
	// @namespace    http://tampermonkey.net/
	// @version      2.52
	// @description  脚本有风险 使用需谨慎
	// @author       坏熊无双和毛毛
	// @match        http://sword-direct1.yytou.cn:8081/*
    // @include     http://*.yytou.cn*
	// @match        http://sword-direct64.yytou.cn:8081/*
	// @match        http://sword-direct51.yytou.cn:8081/*
	// @grant        none
	// ==/UserScript==
	/**
	 * Created by MoBeiHuYang on 2017/7/5.
	 *	Updated by Jeffrey on 20/10/2017
	 */
	var enforcePoints = 895;
	var mySkillLists = "九天龙吟剑法;排云掌法;如来神掌;覆雨剑法;雪饮狂刀;翻云刀法;";


	buttonWidth = '30px';
	buttonHeight = '20px';
	currentPos = 0;
	delta = 30;
	var permission=0;
	var knownlist=[];
	

/*




	function kezhi(zhaoshi){ //1是剑法 2是拳法 3是刀法 4是暗器
		console.log(zhaoshi);
		var chuzhao=0; //1剑法 2拳法 3刀法 4暗器
		var skillname="";
		var skillbutton=[];
		if (g_obj_map.get("skill_button1")!=undefined)
			skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
		else
			skillbutton[0]=0;
		if (g_obj_map.get("skill_button2")!=undefined)
			skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
		else
			skillbutton[1]=0;
		if (g_obj_map.get("skill_button3")!=undefined)
			skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
		else
			skillbutton[2]=0;
		if (g_obj_map.get("skill_button4")!=undefined)
			skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
		else
			skillbutton[3]=0;

		if (zhaoshi==1){ //找自己的技能里有没有剑法
			for (var i=1;i<=4;i++){
				if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){
					skillname=skillbutton[i-1];
					lianzhen(skillname,i);
					return;
				}
			}
			for (var i=1;i<=4;i++){
				if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){
					skillname=skillbutton[i-1];
					lianzhen(skillname,i);
					return;
				}
			}
			for (var i=1;i<=4;i++){
				if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){
					skillname=skillbutton[i-1];
					lianzhen(skillname,i);
					return;
				}
			}
			for (var i=1;i<=4;i++){
				if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){
					skillname=skillbutton[i-1];
					lianzhen(skillname,i);
					return;
				}
			}
			//还他妈没有？你是不是没有武墓或者没有江湖绝学啊？那你破个屁招啊
			}else if (zhaoshi==2){ 	//找自己的技能里有没有拳法
				for (var i=1;i<=4;i++){
					if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){
						skillname=skillbutton[i-1];
						lianzhen(skillname,i);
						return;
					}
				}
				for (var i=1;i<=4;i++){
					if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){
						skillname=skillbutton[i-1];
						lianzhen(skillname,i);
						return;
					}
				}
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){

									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
							}
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){

									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
							}
						}else if (zhaoshi==3){
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){
									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
							}
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){
									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
							}
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){
									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}

							}
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){
									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
							}
						}else if (zhaoshi==4){ //暗器绝学，无所谓什么招。找到一个绝学就上。
							for (var i=1;i<=4;i++){
								if (skillbutton[i-1]=="翻云刀法"||skillbutton[i-1]=="雪饮狂刀"){

									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
								if (skillbutton[i-1]=="九天龙吟剑法"||skillbutton[i-1]=="覆雨剑法"||skillbutton[i-1]=="织冰剑法"){

									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
								if (skillbutton[i-1]=="飞刀绝技"||skillbutton[i-1]=="孔雀翎"){

									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
								if (skillbutton[i-1]=="排云掌法"||skillbutton[i-1]=="如来神掌"){

									skillname=skillbutton[i-1];
									lianzhen(skillname,i);
									return;
								}
							}
						}
		}
	function checkzhen(skillname,skillbutton){//按照按钮编号返回数值 0就是没有可以成阵的按钮
		console.log(skillname+"是我刚刚用的");
		console.log(skillbutton);
		if (skillname=="九天龙吟剑法"){
			if (skillbutton.indexOf("排云掌法")>=0)
				return skillbutton.indexOf("排云掌法");
			if (skillbutton.indexOf("雪饮狂刀")>=0)
				return skillbutton.indexOf("雪饮狂刀");
			return -1;
		}
		if (skillname=="排云掌法"){
			if (skillbutton.indexOf("九天龙吟剑法")>=0)
				return skillbutton.indexOf("九天龙吟剑法");
			if (skillbutton.indexOf("雪饮狂刀")>=0)
				return skillbutton.indexOf("雪饮狂刀");
			return -1;
		}
			if (skillname=="雪饮狂刀"){
			if (skillbutton.indexOf("排云掌法")>=0)
				return skillbutton.indexOf("排云掌法");
			if (skillbutton.indexOf("九天龙吟剑法")>=0)
				return skillbutton.indexOf("九天龙吟剑法");
			return -1;
		}
			if (skillname=="翻云刀法"){
			if (skillbutton.indexOf("覆雨剑法")>=0)
				return skillbutton.indexOf("覆雨剑法");
			if (skillbutton.indexOf("飞刀绝技")>=0)
				return skillbutton.indexOf("飞刀绝技");
			return -1;
		}
			if (skillname=="覆雨剑法"){
			if (skillbutton.indexOf("如来神掌")>=0)
				return skillbutton.indexOf("如来神掌");
			if (skillbutton.indexOf("翻云刀法")>=0)
				return skillbutton.indexOf("翻云刀法");
			return -1;
		}
			if (skillname=="飞刀绝技"){
			if (skillbutton.indexOf("翻云刀法")>=0)
				return skillbutton.indexOf("翻云刀法");
			if (skillbutton.indexOf("织冰剑法")>=0)
				return skillbutton.indexOf("织冰剑法");
			return -1;
		}
			if (skillname=="织冰剑法"){
			if (skillbutton.indexOf("飞刀绝技")>=0)
				return skillbutton.indexOf("飞刀绝技");
			if (skillbutton.indexOf("孔雀翎")>=0)
				return skillbutton.indexOf("孔雀翎");
			return -1;
		}
			if (skillname=="孔雀翎"){
			if (skillbutton.indexOf("织冰剑法")>=0)
				return skillbutton.indexOf("织冰剑法");
			if (skillbutton.indexOf("如来神掌")>=0)
				return skillbutton.indexOf("如来神掌");
			return -1;
		}
			if (skillname=="如来神掌"){
			if (skillbutton.indexOf("孔雀翎")>=0)
				return skillbutton.indexOf("孔雀翎");
			if (skillbutton.indexOf("覆雨剑法")>=0)
				return skillbutton.indexOf("覆雨剑法");
			return -1;
		}

	}
	function lianzhen(skillname,i){//连阵 连阵毕竟是危险的事情，那么只有在几种情况下。第一 对面敌人数目只有一人。 第二 我的气大于等于6 敌人小于等于3 这样我出阵 大不了敌人破招而已。
		var enemycounter=0;
		console.log("目前我有气"+gSocketMsg.get_xdz());
		for (i=1;i<=4;i++){
			if (g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+i)!=undefined){
				enemycounter++;
			}
		}
		var skillbutton=[];
		if (g_obj_map.get("skill_button1")!=undefined)
			skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
		else
			skillbutton[0]=0;
		if (g_obj_map.get("skill_button2")!=undefined)
			skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
		else
			skillbutton[1]=0;
		if (g_obj_map.get("skill_button3")!=undefined)
			skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
		else
			skillbutton[2]=0;
		if (g_obj_map.get("skill_button4")!=undefined)
			skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
		else
			skillbutton[3]=0;
		skillname=ansi_up.ansi_to_text(skillname);
		console.log("使用按钮"+i);
		console.log("出招"+skillname);
		var enemyxdz=0;
		if (enemycounter!=1){
			for (var i=1;i<=4;i++){
				if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+i)!=undefined){
					enemyxdz=g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+i);
					break;
				}
			}
		}

		clickButton('playskill '+(skillbutton.indexOf(skillname)+1),0); //无论是谁，我先反击一下
		var xdz=gSocketMsg.get_xdz(); //获取我当时的行动值
		//重新获取我们按钮的布局
		if (g_obj_map.get("skill_button1")!=undefined)
			skillbutton[0]=ansi_up.ansi_to_text(g_obj_map.get("skill_button1").get("name"));
		else
			skillbutton[0]=0;
		if (g_obj_map.get("skill_button2")!=undefined)
			skillbutton[1]=ansi_up.ansi_to_text(g_obj_map.get("skill_button2").get("name"));
		else
			skillbutton[1]=0;
		if (g_obj_map.get("skill_button3")!=undefined)
			skillbutton[2]=ansi_up.ansi_to_text(g_obj_map.get("skill_button3").get("name"));
		else
			skillbutton[2]=0;
		if (g_obj_map.get("skill_button4")!=undefined)
			skillbutton[3]=ansi_up.ansi_to_text(g_obj_map.get("skill_button4").get("name"));
		else
			skillbutton[3]=0;
		var checkbutton=-1;
		checkbutton=checkzhen(skillname,skillbutton);
		if (checkbutton>=0){//enemyxdz<=3
			if (xdz>=3){
				console.log("连阵按钮"+(checkbutton+1));
				console.log("我要出的绝学是"+g_obj_map.get("skill_button"+(checkbutton+1)).get("name"));
				clickButton('playskill '+(checkbutton+1),0);
			}
		}
	}
	function whofighting(msg,oblist){
		for (var i=0;i<4;i++){
			if ((msg.match(oblist[i]+"将招式连成")!=null)||(msg.match(oblist[i]+"招式之间组合")!=null)||(msg.match(oblist[i]+"这几招配合")!=null)){ //敌人出招
				return 1;
			}
		}
		return 0;
	}
	function fighttype(msg){
		var sword,cuff,blade;//判断哪个值大，用来判断最后一个阵法出现的位置
		sword=msg.lastIndexOf("剑");
		cuff=msg.lastIndexOf("掌");
		if (msg.lastIndexOf("拳")>cuff){
			cuff=msg.lastIndexOf("拳");
		}
		blade=msg.lastIndexOf("刀");
		if (sword>cuff&&sword>blade){
			return 2
		}else if (cuff>sword&&cuff>blade){
			return 3;
		}else if (blade>sword&&blade>cuff){
			return 1;
		}else{
			return 4;
		}
	}
	function pozhaofailed(msg,oblist){
		for (var i=0;i<4;i++){
			if (msg.match(oblist[i]+"的招式并未有明显破绽")!=null){
				return 1;
			}
		}
		if (msg.match("你的招式尽数被")!=null||msg.match("你的对攻无法击破")!=null){
			return 1;
		}
		return 0;
	}
	var obside=0;
	function Combat(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type == "vs" && subType == "text") {
				var oblist=[];
				var melist=[];
				var obxdz=[];
				var mexdz=[];
				var who=0; //1是自己这边 2是敌人

				//要找到我在哪边。。。。。这个比较恶心。
				var myname=ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("name"));

				for (var i=0;i<4;i++){
					if (g_obj_map.get("msg_vs_info")!=undefined){
						if(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1))!=undefined){
							if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs2_name"+(i+1)))==myname){
								obside=1;
							}
						}
					}
					if (g_obj_map.get("msg_vs_info")!=undefined){
						if(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1))!=undefined){
							if (ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs1_name"+(i+1)))==myname){
								obside=2;
							}
						}
					}
				}
				for (var i=0;i<4;i++){//获取整个战场信息
					if (g_obj_map.get("msg_vs_info")!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))!=undefined&&g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))!=undefined){
						oblist.push(ansi_up.ansi_to_text(g_obj_map.get("msg_vs_info").get("vs"+obside+"_name"+(i+1))));
						obxdz.push(g_obj_map.get("msg_vs_info").get("vs"+obside+"_xdz"+(i+1)));
					}
				}
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				//判断出招按钮位置
				var zhaoshi=0; //1是剑法 2是拳法 3是刀法。
				if (whofighting(msg,oblist)){//敌人出招
					zhaoshi=fighttype(msg);
					//伪装代码
					var randomnumber=Math.random()*100;
					if (randomnumber>40){//60%几率由脚本出招
						kezhi(zhaoshi,obside);
					}
				}
				//尴尬了，克制都没有成功。现在只能补招了。补招的计算是优先判断是否3气 如果3气就用绝学补招 不够3气就用2气跟招。
				if (pozhaofailed(msg,oblist)){
					buzhao();
				}
			}
			if (type == "notice" && subType == "escape") {
				console.log(g_simul_efun.replaceControlCharBlank(b.get("msg")));
			}
		}
	}
	function buzhao(){
		var myxdz=gSocketMsg.get_xdz();
		if (myxdz>=3){
			for (var i=1;i<=4;i++){
				if (g_obj_map.get("skill_button"+i)!=undefined&&(ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="飞刀绝技"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="孔雀翎"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="雪饮狂刀"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="翻云刀法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="九天龙吟剑法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="覆雨剑法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="织冰剑法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="排云掌法"||ansi_up.ansi_to_text(g_obj_map.get("skill_button"+i).get("name"))=="如来神掌")){
					if (g_obj_map.get("skill_button"+i).get("xdz")==3){
						clickButton('playskill '+i,0);
					}
				}

			}
		}else if (myxdz==2){
			for (var i=1;i<=4;i++){
				if (g_obj_map.get("skill_button"+i)!=undefined){
					if (g_obj_map.get("skill_button"+i).get("xdz")==2){
						clickButton('playskill '+i,0);
					}
				}

			}
		}
	}
	var combat=new Combat;
	
    


   */ 
    
    
    
	//隐藏所有按钮的按钮
	var buttonhiden=0;
	var buttonhideButton = document.createElement('button');
	buttonhideButton.innerText = '隐藏';
	buttonhideButton.style.position = 'absolute';
	buttonhideButton.style.right = '155px';
	buttonhideButton.style.top = '370px';
	currentPos = currentPos + delta;
	buttonhideButton.style.width = buttonWidth+12;
	buttonhideButton.style.height = buttonHeight;
	document.body.appendChild(buttonhideButton);
	buttonhideButton.addEventListener('click', buttonhideFunc)
	function buttonhideFunc(){
		if (buttonhiden==0){
			buttonhiden=1;
			buttonhideButton.innerText = '显示';
			hideButton();
		}else{
			buttonhiden=0;
			buttonhideButton.innerText = '隐藏';
			
showButton();
		}
	}
/*
	var Debug=0;
	var DebugButton = document.createElement('button');
	DebugButton.innerText = '脚本调试';
	DebugButton.style.position = 'absolute';
	DebugButton.style.right = '0px';
	DebugButton.style.top = currentPos + 'px';
	currentPos = currentPos + delta;
	DebugButton.style.width = buttonWidth+12;
	DebugButton.style.height = buttonHeight;
	document.body.appendChild(DebugButton);
	DebugButton.addEventListener('click', DebugFunc)
	function DebugFunc(){
		if (Debug==0){
			Debug=1;
			DebugButton.innerText = '停止调试';
		}else{
			Debug=0;
			DebugButton.innerText = '脚本调试';
		}
	}
var lastheartbeat=0;
var currentheartbeat=0;
	function DebugMode(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			console.log(type);console.log(subType);
			console.log(b)
+
		
	
	var debugm=new DebugMode;
    
    
    

 */
	var combat1=[{},{},{},{}];
	var combat2=[{},{},{},{}];
	var GodMode=0;
	var GodButton = document.createElement('button');
	GodButton.innerText = '战斗强化';
	GodButton.style.position = 'absolute';
	GodButton.style.right = '0px';
	GodButton.style.top = '0px';
	currentPos = currentPos + delta;
	GodButton.style.width = buttonWidth+12;
	GodButton.style.height = buttonHeight;
	document.body.appendChild(GodButton);
	GodButton.addEventListener('click', GodFunc)
	function GodFunc(){
		if (GodMode==0){
			GodMode=1;
			GodButton.innerText = '停止强化';
		}else{
			GodMode=0;
			GodButton.innerText = '战斗强化';
        }
    }
	
	var engage=0;
	function GodView(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			var me=g_obj_map.get("msg_attrs").get("id");
			if (type=="vs"){
				if (subType=="vs_info"){//获得一次全场更新的机会
					var target1={};
					var target2={};
					for (var i=1;i<=4;i++){
						if (b.get("vs1_pos"+i)==me){
							engage=1;
							console.log("我参与了战斗");
						}
						if (b.get("vs2_pos"+i)==me){
							engage=1;
							console.log("我参与了战斗");
						}
						if (b.get("vs1_pos"+i)!=undefined){
							target1={};
							target1["vs1_pos"+i]=b.get("vs1_pos"+i);
							target1["vs1_pos_v"+i]=b.get("vs1_pos_v"+i);
							target1["vs1_name"+i]=b.get("vs1_name"+i);
							target1["vs1_xdz"+i]=b.get("vs1_xdz"+i);
							target1["vs1_kee"+i]=b.get("vs1_kee"+i);
							target1["empty"]=0;
							combat1[i-1]=target1;

						}else if(b.get("vs1_pos"+i)==undefined){
							target1={};
							target1["empty"]=1;
							combat1[i-1]=target1;
						}
						if (b.get("vs2_pos"+i)!=undefined){
							target2={};
							target2["vs2_pos"+i]=b.get("vs2_pos"+i);
							target2["vs2_pos_v"+i]=b.get("vs2_pos_v"+i);
							target2["vs2_name"+i]=b.get("vs2_name"+i);
							target2["vs2_xdz"+i]=b.get("vs2_xdz"+i);
							target2["vs2_kee"+i]=b.get("vs2_kee"+i);
							target2["empty"]=0;
							combat2[i-1]=target2;

						}else if(b.get("vs2_pos"+i)==undefined){
							target2={};
							target2["empty"]=1;
							combat2[i-1]=target2;
						}
					}

				}else if(subType=="text"){//预留位置 以后可以判断

				}else if(subType=="playskill"){
					for (var i=1;i<=4;i++){
						if (combat1[i-1]["vs1_pos"+i]==b.get("uid")&&b.get("ret")!=-1){
							combat1[i-1]["vs1_xdz"+i]-=b.get("lose_xdz");
							console.log(ansi_up.ansi_to_text(combat1[i-1]["vs1_name"+i])+"使用了一招"+ansi_up.ansi_to_text(b.get("name"))+"，损耗了"+b.get("lose_xdz")+"点行动值，他还有"+combat1[i-1]["vs1_xdz"+i]+"点行动值");
						}
						if (combat2[i-1]["vs2_pos"+i]==b.get("uid")&&b.get("ret")!=-1){
							combat2[i-1]["vs2_xdz"+i]-=b.get("lose_xdz");
							console.log(ansi_up.ansi_to_text(combat2[i-1]["vs2_name"+i])+"使用了一招"+ansi_up.ansi_to_text(b.get("name"))+"，损耗了"+b.get("lose_xdz")+"点行动值，他还有"+combat2[i-1]["vs2_xdz"+i]+"点行动值");
						}
					}

				}else if(subType=="add_xdz"){//获得心跳
					xdzlocker=0;
					if (engage==1){
						for (var i=1;i<=4;i++){
							if (combat1[i-1]["empty"]==0){
								combat1[i-1]["vs1_xdz"+i]++;
								if (combat1[i-1]["vs1_xdz"+i]>=10){
									combat1[i-1]["vs1_xdz"+i]=10;
								}
								if (combat1[i-1]["vs1_pos"+i]==me&&combat1[i-1]["vs1_xdz"+i]==10){//我在里面，并且我的气到十了。启动循环
									xdzlocker=1;
									console.log("我的气已经到十了，不会再 接收到心跳，启动自动心跳。");
									setTimeout(autoxdz,2000);
								}
								console.log("心跳一次，"+combat1[i-1]["vs1_name"+i]+"行动值变为:"+combat1[i-1]["vs1_xdz"+i]);
							}
							if (combat2[i-1]["empty"]==0){
								combat2[i-1]["vs2_xdz"+i]++;
								if (combat2[i-1]["vs2_xdz"+i]>=10){
									combat2[i-1]["vs2_xdz"+i]=10;
								}
								if (combat2[i-1]["vs2_pos"+i]==me&&combat2[i-1]["vs2_xdz"+i]==10){//我在里面，并且我的气到十了。启动循环
									xdzlocker=1;
									console.log("我的气已经到十了，不会再 接收到心跳，启动自动心跳。");
									setTimeout(autoxdz,2000);
								}
								console.log("心跳一次，"+combat2[i-1]["vs2_name"+i]+"行动值变为:"+combat2[i-1]["vs2_xdz"+i]);
							}
						}

					}else if(engage==0){//我没有参与战斗 那么我就是观战
						for (var i=1;i<=4;i++){
							if (combat1[i-1]["vs1_pos"+i]==b.get("uid")){
								combat1[i-1]["vs1_xdz"+i]=b.get("xdz");
								console.log("心跳一次，"+combat1[i-1]["vs1_name"+i]+"行动值变为:"+combat1[i-1]["vs1_xdz"+i]);
							}
							if (combat2[i-1]["vs2_pos"+i]==b.get("uid")){
								combat2[i-1]["vs2_xdz"+i]=b.get("xdz");
								console.log("心跳一次，"+combat2[i-1]["vs2_name"+i]+"行动值变为:"+combat2[i-1]["vs2_xdz"+i]);
							}
						}
					}

				}else if(subType=="attack"){	//备用 以后可能用的到
					for (var i=1;i<=4;i++){
						if (combat1[i-1]["vs1_pos"+i]==b.get("rid")){
							combat1[i-1]["vs1_kee"+i]=b.get("kee");
						}
						if (combat2[i-1]["vs2_pos"+i]==b.get("rid")){
							combat2[i-1]["vs2_kee"+i]=b.get("kee");
						}
					}
				}else if(subType=="die"){
					for (var i=1;i<=4;i++){
						if (combat1[i-1]["vs1_pos"+i]==b.get("uid")){
							combat1[i-1]["empty"]=1;
							console.log(combat1[i-1]["vs1_name"+i]+"输了这场战斗");
						}
						if (combat2[i-1]["vs2_pos"+i]==b.get("uid")){
							combat2[i-1]["empty"]=1;
							console.log(combat2[i-1]["vs2_name"+i]+"输了这场战斗");
						}
					}

				}else if(subType=="combat_result"){//清空存储
					for (var i=0;i<4;i++){
						combat1[i]={};
						combat2[i]={};

					}
					engage=0;
				}
			//战斗信息获取完毕 开始更新UI信息

				for (var i=1;i<=4;i++){
					if (combat1[i-1]["empty"]==0){
						document.getElementById("vs_hp1"+i).innerHTML="<i><span style=color:rgb(32,209,235)>"+combat1[i-1]["vs1_kee"+i]+"</span><span style=color:rgb(0,255,0)>("+combat1[i-1]["vs1_xdz"+i]+")</span></i>";
					}
					if (combat2[i-1]["empty"]==0){
						document.getElementById("vs_hp2"+i).innerHTML="<i><span style=color:rgb(32,209,235)>"+combat2[i-1]["vs2_kee"+i]+"</span><span style=color:rgb(0,255,0)>("+combat2[i-1]["vs2_xdz"+i]+")</span></i>";
					}
				}

			}

		}
	}
	var xdzlocker=0;
	function autoxdz(){
		if (xdzlocker==1){
			for (var i=1;i<=4;i++){
				if (combat1[i-1]["empty"]==0){
					combat1[i-1]["vs1_xdz"+i]++;
					if (combat1[i-1]["vs1_xdz"+i]>=10){
						combat1[i-1]["vs1_xdz"+i]=10;
					}
					console.log("自动心跳一次，"+combat1[i-1]["vs1_name"+i]+"行动值变为:"+combat1[i-1]["vs1_xdz"+i]);
				}
				if (combat2[i-1]["empty"]==0){
					combat2[i-1]["vs2_xdz"+i]++;
					if (combat2[i-1]["vs2_xdz"+i]>=10){
						combat2[i-1]["vs2_xdz"+i]=10;
					}
					console.log("自动心跳一次，"+combat2[i-1]["vs2_name"+i]+"行动值变为:"+combat2[i-1]["vs2_xdz"+i]);
				}
			}
			for (var i=1;i<=4;i++){
				if (combat1[i-1]["empty"]==0){
					document.getElementById("vs_hp1"+i).innerHTML="<i><span style=color:rgb(32,209,235)>"+combat1[i-1]["vs1_kee"+i]+"</span><span style=color:rgb(0,255,0)>("+combat1[i-1]["vs1_xdz"+i]+")</span></i>";
				}
				if (combat2[i-1]["empty"]==0){
					document.getElementById("vs_hp2"+i).innerHTML="<i><span style=color:rgb(32,209,235)>"+combat2[i-1]["vs2_kee"+i]+"</span><span style=color:rgb(0,255,0)>("+combat2[i-1]["vs2_xdz"+i]+")</span></i>";
				}
			}
			setTimeout(autoxdz,2000);
		}
	}
	var godview=new GodView;
	
	//-------------------------------------------------------------------------------------------------



//大昭壁画-------------------------
 var MianBiFuncButton = document.createElement('button');
  MianBiFuncButton.innerText = '大昭壁画';
  MianBiFuncButton.style.position = 'absolute';
  MianBiFuncButton.style.left = '0px';
  MianBiFuncButton.style.top =  '450px';
currentPos = currentPos + delta;
  MianBiFuncButton.style.width = buttonWidth+12;
  MianBiFuncButton.style.height = buttonHeight;
document.body.appendChild(  MianBiFuncButton);
  MianBiFuncButton.addEventListener('click',   MianBiFunc);
function MianBiFunc(){ 
    go('jh 26;w;w;n;w;w;w;n;n;e;event_1_12853448;home'); //大昭壁画
}
//-------------------------分割线-----------

var MjlyFuncButton = document.createElement('button');
  MjlyFuncButton.innerText = '苗疆炼药';
  MjlyFuncButton.style.position = 'absolute';


  MjlyFuncButton.style.left = '100px';
  MjlyFuncButton.style.top =  '0px';
currentPos = currentPos + delta;
  MjlyFuncButton.style.width = buttonWidth+12;
  MjlyFuncButton.style.height = buttonHeight;
document.body.appendChild(  MjlyFuncButton);
  MjlyFuncButton.addEventListener('click',   MjlyFunc);
//苗疆炼药------------------------
function MjlyFunc(){
    var msg = "毒藤胶和毒琥珀准备好了吗？\n苗疆地图开了吗？\n没有就点取消！";
    if (confirm(msg)===true){
        console.log("去苗疆。");
        setTimeout(Mjly1Func,200);
    }else{
        return false;
    }
}
function Mjly1Func(){
    go('jh 40;s;s;s;s;e;s;se;sw;s;sw;e;e;sw;se;sw;se;');
    console.log("铁索桥。");
    go('event_1_8004914;');
    setTimeout( Mjly2Func,6000);
 }
 function  Mjly2Func(){
    if ($('span.outtitle')[0].innerText !== "澜沧江南岸"){
        console.log("重新跑。");
        setTimeout(Mjly1Func,100);
    }else{
        console.log("继续走。");
        go('se;s;s;e;n;n;e;s;e;ne;s;sw;e;e;ne;ne;nw;ne;ne;n;n;w;');
        setTimeout( Mjly3Func,5000);
    }
}
function  Mjly3Func(){
    if( isContains($('span.out2:contains(炼药的丹炉)').text().slice(-6), '明天再来吧！')){
        console.log("炼完了。");
        go('home');
    }else{
    go('lianyao;');
    setTimeout( Mjly3Func,6000);
}
}

	
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	
	var fanjiButton = document.createElement('button');
	fanjiButton.innerText = '自动破招';
	fanjiButton.style.position = 'absolute';
	fanjiButton.style.left = '0px';
	fanjiButton.style.top ='420px';
	currentPos = currentPos + delta;
	fanjiButton.style.width = buttonWidth+24;
	fanjiButton.style.height = buttonHeight;
	document.body.appendChild(fanjiButton);
	fanjiButton.addEventListener('click', fanjiFunc);
	var fanjiTrigger=0;
	function fanjiFunc(){
		if (fanjiTrigger==0){
			fanjiButton.innerText = '停止自动破招';
			fanjiTrigger=1;
		}else if (fanjiTrigger==1){
			fanjiButton.innerText = '自动破招';
			fanjiTrigger=0;
		}
	}
	var kuafuButton = document.createElement('button');
	kuafuButton.innerText = '跨服抢坑';
	kuafuButton.style.position = 'absolute';
	kuafuButton.style.left = '0px';
	kuafuButton.style.top ='210px';
	currentPos = currentPos + delta;
	kuafuButton.style.width = buttonWidth+24;
	kuafuButton.style.height = buttonHeight;
	document.body.appendChild(kuafuButton);
	kuafuButton.addEventListener('click', kuafuFunc);
	var kuafuTrigger=0;
	function kuafuFunc(){
		if (kuafuTrigger==0){
			kuafuButton.innerText = '停止抢坑';
			kuafuTrigger=1;
		}else if (kuafuTrigger==1){
			kuafuButton.innerText = '跨服抢坑';
			kuafuTrigger=0;
		}
	}
	var tianjianButton = document.createElement('button');
	tianjianButton.innerText = '跨服天剑谷';
	tianjianButton.style.position = 'absolute';
	tianjianButton.style.left = '0px';
	tianjianButton.style.top = '330px';
	currentPos = currentPos + delta;
	tianjianButton.style.width = buttonWidth+24;
	tianjianButton.style.height = buttonHeight;
	document.body.appendChild(tianjianButton);
	tianjianButton.addEventListener('click', tianjianFunc);
	var tianjianTrigger=0;
	function tianjianFunc(){
		if (tianjianTrigger==0){
			tianjianButton.innerText = '停止天剑谷';
			tianjianTrigger=1;
			killtianjian();
			tianjianmove();
		}else if (tianjianTrigger==1){
			tianjianButton.innerText = '跨服天剑谷';
			tianjianTrigger=0;
			tjroomclear=0;
			path=[];
			tjfight=0;
			preroomrandom="";
		}
	}
	var path=[];
	var tjfight=0;
	var tjroomclear=0;
	var preroomrandom="";
	var direction=["west","east","south","north","southwest","southeast","northeast","northwest"];//八个方向
	function tianjianmove(){
		var roominfo=g_obj_map.get("msg_room");
		if ((roominfo==undefined||tjroomclear==0)&&tianjianTrigger==1){//房间信息没有刷新，或者在战斗，或者房间内还有npc
			 setTimeout(function(){tianjianmove();},200);
		}else{
			console.log(path);
			for (var i=0;i<8;i++){
				if (roominfo.get(direction[i])!=undefined){
					if (roominfo.get(direction[i]).match("峡谷")==null&&(path.length<=10||Math.random()>0.4)){//不包含峡谷两个字，为特殊房间
					preroomrandom=roominfo.get("go_random");
					tjroomclear=0;
					path.push(g_obj_map.get("msg_room").get(direction[i]));
					clickButton("go "+direction[i]); //移动到特殊房间
			if (tianjianTrigger==1){
				tianjianmove();
				setTimeout(killtianjian,1000);
			}
					return;
					}
				}

			}
			//没有特殊房间，开始寻找普通房间
			for (var i=0;i<8;i++){
				if (roominfo.get(direction[i])!=undefined){
					if (path.indexOf(g_obj_map.get("msg_room").get(direction[i]))==-1){
					path.push(g_obj_map.get("msg_room").get(direction[i]));
					preroomrandom=roominfo.get("go_random");
					tjroomclear=0;
					clickButton("go "+direction[i],0);
			if (tianjianTrigger==1){
				tianjianmove();
				setTimeout(killtianjian,1000);
			}
					return;
					}
				}
			}
			preroomrandom=roominfo.get("go_random");
			var randomdirect=Math.round((Math.random()*7));
			while(roominfo.get(direction[randomdirect])==undefined){
				randomdirect=Math.round((Math.random()*7));
			}
			tjroomclear=0;
			clickButton("go "+direction[randomdirect],0);
			if (tianjianTrigger==1){
				tianjianmove();
				setTimeout(killtianjian,1000);
			}


		}
	}
	function tianjianGu(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			console.log(type);console.log(subType);
			if (type=="vs"&&subType=="vs_info"){ //这是进入战斗的提示
				clickButton("playskill 1",0);//放个绝学先
			}else if (type=="vs"&&subType=="combat_result"){//战斗结束 继续调取击
				tjfight=0;
				send("look_room\n");
				setTimeout(killtianjian,1000);
			}
		}
	}
	function killtianjian(){
		var npclist=g_obj_map.get("msg_room");
		if ((npclist==undefined||tjfight==1)&&tianjianTrigger==1){
			setTimeout(function(){killtianjian();},200);
		}else{
			if (npclist.get("go_random")==preroomrandom&&g_obj_map.get("msg_team")==undefined){//没动啊，是队长或者一个人的话就再次调用移动
				tjroomclear=1;
				return;
			}else if(npclist.get("go_random")==preroomrandom&&g_obj_map.get("msg_team").get("is_learder")==undefined){
				tjroomclear=1;
				return;
			}else if(npclist.get("go_random")==preroomrandom&&g_obj_map.get("msg_team").get("is_learder")==1){
				tjroomclear=1;
				return;
			}
			for (var i=1;i<10;i++){
				if (npclist.get("npc"+i)==undefined){
					if (g_obj_map.get("msg_team")==undefined){
						break;
					}else if(g_obj_map.get("msg_team").get("is_learder")==undefined){
						break;
					}else if(g_obj_map.get("msg_team").get("is_learder")==1){
						break;
					}else if (parseInt(g_obj_map.get("msg_team").get("is_leader"))==0) {
						break;
					}
				}
				if (npclist.get("npc"+i).split(",")[0]!="kuafu_tjgws"&&npclist.get("npc"+i).split(",")[1].match("符兵")==null){
					tjfight=1;
					clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
					break;
				}

			}
			for (var i=1;i<10;i++){
				if (npclist.get("npc"+i)==undefined){
					if (g_obj_map.get("msg_team")==undefined){
						tjroomclear=1;
						return;
					}else if(g_obj_map.get("msg_team").get("is_learder")==undefined){
						tjroomclear=1;
						return;
					}else if(g_obj_map.get("msg_team").get("is_learder")==1){
						tjroomclear=1;
						return;
					}else if (parseInt(g_obj_map.get("msg_team").get("is_leader"))==0) {
						if (tianjianTrigger==1)
						setTimeout(killtianjian,200);
					}
				}
				if (npclist.get("npc"+i).split(",")[0]=="kuafu_tjgws"){
					tjfight=1;
					console.log("kill "+npclist.get("npc"+i).split(",")[0]);
					clickButton("kill "+npclist.get("npc"+i).split(",")[0]);
					return;
				}
			}
			killtianjian();
		}
	}
	var tianjian=new tianjianGu;
	var mijingButton = document.createElement('button');
	mijingButton.innerText = '秘境最优化';
	mijingButton.style.position = 'absolute';
	mijingButton.style.right = '0px';
	mijingButton.style.top ='30px';
	currentPos = currentPos + delta;
	mijingButton.style.width = buttonWidth+24;
	mijingButton.style.height = buttonHeight;
	document.body.appendChild(mijingButton);
	mijingButton.addEventListener('click', mijingFunc);
	var mijingTrigger=0;
	function mijingFunc(){
		var roominfor=g_obj_map.get("msg_room").get("map_id");
		var mijingid=["tianlongshan","dafuchuan","fomenshiku","dilongling","luanshishan","lvzhou","taohuadu","daojiangu","binhaigucheng","baguamen","lvshuige","langhuanyudong"];
		if (mijingid.indexOf(roominfor)==-1){
			alert("当前秘境不支持优化。");
			return;
		}else{
			clickButton(roominfor+'_saodang',0);//点击扫荡 按钮一次;
			startOptimize(roominfor);
		}
	}
	function startOptimize(roominfor){
		var promt=g_obj_map.get("msg_prompt");
		console.log(roominfor);
		if (roominfor=="langhuanyudong"){
					overrideclick("go northwest");
					overrideclick("event_1_92817399");
					overrideclick("go west");
					overrideclick("event_1_91110342");
					overrideclick("go south");
					overrideclick("event_1_74276536");
					overrideclick("go southeast");
					overrideclick("event_1_14726005");
					overrideclick("go southwest");
					overrideclick("event_1_66980486");
					overrideclick("go northwest");
					overrideclick("event_1_39972900");
					overrideclick("go northwest");
					overrideclick("event_1_61689122");
					overrideclick("go west");
					overrideclick("event_1_19336706");
					overrideclick("go south");
					overrideclick("event_1_30457951");
					overrideclick("go southwest");
					overrideclick("event_1_96023188");
					overrideclick("go south");
			return;
		}
		if (promt==undefined){
			setTimeout(function(){startOptimize(roominfor)},500);
		}else{
			var msg=promt.get("msg");
			var zhuguo=parseInt(msg.split("朱果")[1].split("。")[0].split("x")[1]);
			if (zhuguo==0){
				alert("当前扫荡出错了。");
				return;
			}else{
				console.log("目前朱果为:"+zhuguo);
				if (roominfor=="daojiangu"){
					if (zhuguo>=1535){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="taohuadu"){
					if (zhuguo>=1785){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="lvshuige"){
					if (zhuguo>=1255){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="lvzhou"){
					if (zhuguo>=2035){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="luanshishan"){
					if (zhuguo>=2350){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="dilongling"){
					if (zhuguo>=2385){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="fomenshiku"){
					if (zhuguo>=2425){

						clickButton(roominfor+'_saodang go',0);

					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="dafuchuan"){
					if (zhuguo>=3090){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="tianlongshan"){
					if (zhuguo>=3100){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="binghaigucheng"){
					if (zhuguo>=3385){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}else if (roominfor=="baguamen"){
					if (zhuguo>=3635){
						clickButton(roominfor+'_saodang go',0);
					}else{
						clickButton(roominfor+'_saodang',0);
						setTimeout(function(){startOptimize(roominfor)},500);
					}
				}
			}
		}
	}
	function kuafulistener(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="vs"&&subType=="out_watch"){ //这是离开观战进入战斗的提示
				kuafuTrigger=0;
				kuafuButton.innerText = '跨服抢坑';
			}else if(type=="vs"&&subType=="text"){//文字有刷新，那么就意味着我可能是在观战，如果stopqiang为0 那么我就是在观战
				//所以每次有text进来都有可能有一个玩家滚蛋。 我们就在这判断。
				var targetnpc=g_obj_map.get("msg_npc").get("id");//获取目标NPC的 id
				var fighting=g_obj_map.get("msg_vs_info");
				var side=0;
				var qiecuolist=[];
				if (fighting.get("vs1_pos1")==targetnpc){
					//先检查我们自己进没进战斗
					for (var i=2;i<=4;i++){
						if(fighting.get("vs1_pos"+i)!=undefined){//npc 在vs1一号位 从2号位开始记录玩家ID
							clickButton("fight "+fighting.get("vs1_pos"+i));
							break;
						}
					}
				}else if(fighting.get("vs2_pos1")==targetnpc){
					for (var i=2;i<=4;i++){
						if(fighting.get("vs2_pos"+i)!=undefined){//npc 在vs2一号位 从2号位开始记录玩家ID
							clickButton("fight "+fighting.get("vs2_pos"+i));
							break;
						}
					}
				}
			}
		}
	}
	var kuafu=new kuafulistener;MianBiFuncButton.style.visibility="visible";
	function kuafuqiang(){
		if (stopqiang==0){
			//setTimeout(function(){kuafuqiang();},100);// 循环抢坑
		}else{
			return;
		}
	}
	function hideButton(){
		CheckInButton.style.visibility="hidden";
		killDrunkManButton.style.visibility="hidden";
		fishingButton.style.visibility="hidden";
		clearPuzzlesButton.style.visibility="hidden";
		qiangdipiButton.style.visibility="hidden";
		QiXiaTalkButton.style.visibility="hidden";
		//buyOneBeeButton.style.visibility="hidden";
		//userMedecineButton.style.visibility="hidden";
		answerQuestionButton.style.visibility="hidden";
		WabaoButton.style.visibility="hidden";
		onekillButton.style.visibility="hidden";
		fanjiButton.style.visibility="hidden";
		mijingButton.style.visibility="hidden";
		kuafuButton.style.visibility="hidden";
		escapeButton.style.visibility="hidden";
		GodButton.style.visibility="hidden";
		escapechangeButton.style.visibility="hidden";
		tianjianButton.style.visibility="hidden";
		killerButton.style.visibility="hidden";
		
		

    MianBiFuncButton.style.visibility="hidden";
        ZhuangBeiButton.style.visibility="hidden";
	
	
	yizhanglibaoFuncButton.style.visibility="hidden";
	qiandaovipButton.style.visibility="hidden";
	
    nielongFuncButton.style.visibility="hidden";
	pozhenFuncButton.style.visibility="hidden";
	jinlangFuncButton.style.visibility="hidden";
	bingyueFuncButton.style.visibility="hidden";
	buyMedecineFuncButton.style.visibility="hidden";
    

	PaiHangFuncButton.style.visibility="hidden";
	ShiJieFuncButton.style.visibility="hidden";
	
	JinKuaFuTargetButton.style.visibility="hidden";
	killshenshouTargetButton.style.visibility="hidden";
	killHongMingTargetButton.style.visibility="hidden";
	killHuangMingTargetButton.style.visibility="hidden";
    libaoSBButton.style.visibility="hidden";
    SXQHButton.style.visibility="hidden";
        MjlyFuncButton.style.visibility="hidden";

        
        
        
        
        
        
        
	}
	function showButton(){
		kuafuButton.style.visibility="visible";
		CheckInButton.style.visibility="visible";
		GodButton.style.visibility="visible";
		killDrunkManButton.style.visibility="visible";
		fishingButton.style.visibility="visible";
		clearPuzzlesButton.style.visibility="visible";
		qiangdipiButton.style.visibility="visible";
		QiXiaTalkButton.style.visibility="visible";
		//buyOneBeeButton.style.visibility="visible";
		//userMedecineButton.style.visibility="visible";
		answerQuestionButton.style.visibility="visible";
        
		WabaoButton.style.visibility="visible";
		mijingButton.style.visibility="visible";
		fanjiButton.style.visibility="visible";
		onekillButton.style.visibility="visible";
		escapeButton.style.visibility="visible";
		escapechangeButton.style.visibility="visible";
		tianjianButton.style.visibility="visible";
		killerButton.style.visibility="visible";
		
		
	ZhuangBeiButton.style.visibility="visible";
	
	yizhanglibaoFuncButton.style.visibility="visible";
	qiandaovipButton.style.visibility="visible";
	
	nielongFuncButton.style.visibility="visible";
	pozhenFuncButton.style.visibility="visible";
	jinlangFuncButton.style.visibility="visible";
	bingyueFuncButton.style.visibility="visible";
	buyMedecineFuncButton.style.visibility="visible";
	
	PaiHangFuncButton.style.visibility="visible";
	ShiJieFuncButton.style.visibility="visible";
	
    JinKuaFuTargetButton.style.visibility="visible";
    killshenshouTargetButton.style.visibility="visible";
    killHongMingTargetButton.style.visibility="visible";
    killHuangMingTargetButton.style.visibility="visible";
    
    MianBiFuncButton.style.visibility="visible";
    libaoSBButton.style.visibility="visible";
    SXQHButton.style.visibility="visible";
    
    MjlyFuncButton.style.visibility="visible";  
        
        
        
        
        
        
        
        
		
	}
	// 签到按钮 ------------------------------------------------------------------------------------------------------
	//document.body.removeChild(CheckInButton);
	var CheckInButton = document.createElement('button');
	CheckInButton.innerText = '登录签到';
	CheckInButton.style.position = 'absolute';
	CheckInButton.style.right = '0px';
	CheckInButton.style.top =  '90px';
	currentPos = currentPos + delta;
	CheckInButton.style.width = buttonWidth+12;
	CheckInButton.style.height = buttonHeight;
	document.body.appendChild(CheckInButton);
	CheckInButton.addEventListener('click', CheckIn)
	var checkinstep=0;
	function fengyi(){//逢义礼包
		overrideclick("jh 1");
		overrideclick("look_npc snow_mercenary");
		startFengyi();
	}
	function startFengyi(){
		console.log("fengyi");
		var npc=g_obj_map.get("msg_npc");
		if (npc==undefined){
			setTimeout(startFengyi,200);
		}else if(npc.get("id")!="snow_mercenary"){
			console.log(npc.get("id"));
			clickButton("look_npc snow_mercenary",0);
			setTimeout(startFengyi,200);
		}else{
			for (var i=1;i<10;i++){
				console.log(npc.get("cmd"+i+"_name"));
				if (npc.get("cmd"+i+"_name")==undefined)
					break;
				if (npc.get("cmd"+i+"_name").match("礼包")!=null&&npc.get("cmd"+i+"_name").match("1元")==null&&npc.get("cmd"+i+"_name").match("兑换")==null)
					overrideclick(npc.get("cmd"+i));
			}
			overrideclick("jh 2");
			overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go east");
			overrideclick("look_room");
		}
	}

	function CheckIn(){ // 进入扬州
		overrideclick('jh');
		if (g_obj_map.get("msg_jh_list")==undefined){
			setTimeout(function(){CheckIn();},500);
		}else{
			if (checkinstep==0){
				overrideclick("share_ok 1");
				overrideclick("share_ok 2");
				overrideclick("share_ok 3");
				overrideclick("share_ok 4");
				overrideclick("share_ok 5");
				overrideclick("share_ok 7");
				scanEscapedFish();
				fengyi();
				console.log('签到一次！');
				CheckInButton.innerText = '扬州签到';
				checkinstep++;
			}else if(checkinstep==1){
				overrideclick('jh 5');       // 进入章节
				overrideclick('go north');     // 南门大街
				overrideclick('go north');   // 十里长街3
				overrideclick('go north');    // 十里长街2
				overrideclick('go west');    // 黄鸡货铺
				overrideclick('sign7');
				checkinstep++;
				CheckInButton.innerText = '武馆签到';
			}else if(checkinstep==2){
				overrideclick('cangjian get_all'); // 一键领取闯楼奖励
				overrideclick('home');
				overrideclick('jh 1');        // 进入章节
				overrideclick('go east') ;     // 广场
				overrideclick('go north');     // 雪亭镇街道
				overrideclick('go east');     // 淳风武馆大门
				overrideclick('go east') ;    // 淳风武馆教练场
				overrideclick('event_1_44731074');
				overrideclick('event_1_8041045');
				overrideclick('event_1_8041045');
				overrideclick('home');
				checkinstep++;
				CheckInButton.innerText = '日常潜能';
			}else if(checkinstep==3){
				setTimeout(function(){weieyu();},500);
			}
		}
	}
	var sendrequest=0;
	function sendtell(){
		if (sendrequest==0){
			if (g_obj_map.get("msg_attrs")==undefined){
				setTimeout(function(){sendtell()},1000);
			}else{
				var me=g_obj_map.get("msg_attrs").get("id");
				send("tell u3823757 "+me+"HUAIrequest\n");
			}
		}
	}
	//sendtell();
	function xiakedao1(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish36");
		if (jhlist!=undefined&&jhlist!=0){
			overrideclick("jh 36");
			overrideclick('yell',0);
			xiakedao2();
		}else{
			pozhen();
		}
	}
	function xiakedao2(){
		if (g_obj_map.get("msg_room")==undefined){
			setTimeout(function(){xiaokedao2();},200);
		}else{
			var locationname=g_obj_map.get("msg_room").get("short");
				if((locationname=="侠客岛渡口")){
					overrideclick("go east");overrideclick("go northeast");overrideclick("go northeast");overrideclick("go northeast");
					overrideclick("go east");overrideclick("go east");overrideclick("go east");overrideclick('event_1_9179222');
					overrideclick("go east");overrideclick('event_1_11720543');
					overrideclick("go west");overrideclick("go north");overrideclick("go east");overrideclick("go east");
					overrideclick("go south");overrideclick("go east");overrideclick('event_1_44025101');
					console.log("看书结束，准备跳瀑布")
					setTimeout(function(){xiakedao3();},500);
				}else{
					setTimeout(function(){xiakedao2();},500);
				}
		}
	}
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

	function newoverrideclick(){
		if (cmdlist.length==0){
			setTimeout(function(){newoverrideclick();},10);
		}else{
			if (cmdlist.length>0&&deadlock==1){//有指令写入 不动数组
				setTimeout(function(){newoverrideclick();},10);
			}else if(deadlock==0&&cmdlist.length>0){
				curstamp=(new Date()).valueOf();
				if ((curstamp-prestamp)>200){
					if (cmdlist.length!=0){
						console.log("发送指令"+cmdlist[0]);
						if (qiangdipiTrigger==0){//我没有在抢物品，那么所有get带1的指令全被无视
							if (cmdlist[0].match("get1")==null){
								clickButton(cmdlist[0]);
								cmdlist.shift();
								prestamp=curstamp;
							}else{
								cmdlist.shift();
								prestamp=curstamp;
							}
						}else if (qiangdipiTrigger==1){
							if (cmdlist[0].match("get1")==null){
								clickButton(cmdlist[0]);
								cmdlist.shift();
								prestamp=curstamp;
							}else{
								if (knownlist.indexOf(cmdlist[0].split("get1")[1])<0&&cmdlist[0].split("get1")[1].match("corpse")!=null){//当前这个尸体不在列表中
									knownlist.push(cmdlist[0].split("get1")[1]);
								}
								clickButton("get"+cmdlist[0].split("get1")[1]);
								cmdlist.shift();
								prestamp=curstamp;
							}
						}


					}
					setTimeout(function(){newoverrideclick();},10);
				}else{
					setTimeout(function(){newoverrideclick();},10);//等待10毫秒执行下一次
				}
			}
		}
	}
	newoverrideclick();
	function xiakedao3(){
		if (g_obj_map.get("msg_room")==undefined){
			setTimeout(function(){xiakedao3();},200);
		}else{
			var locationname=g_obj_map.get("msg_room").get("short");
			console.log(locationname);
			if (locationname=="崖底"&&cmdlist.length==0){
			overrideclick('event_1_4788477');
			overrideclick('go northwest');
			overrideclick('go west');
			overrideclick('go southwest');
			overrideclick('go west');
			overrideclick('go north');
			overrideclick('go north');
			overrideclick('go north');
			overrideclick('go west');
			overrideclick('go west');
			overrideclick('go south');
			overrideclick('go west');
			overrideclick('go northwest');
			overrideclick('go west');
			overrideclick('go east');
			overrideclick('go northeast');
			overrideclick('go northeast');
			overrideclick('go northeast');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go east');
			overrideclick('go south');
			overrideclick('go east');
			overrideclick('event_1_44025101');
			console.log("跳瀑布失败，回到瀑布")
			setTimeout(function(){xiakedao3();},500);
			}else if (locationname=="石门"&&cmdlist.length==0){
				console.log("进入石门")
				overrideclick('event_1_36230918');overrideclick('go east');
				overrideclick('go east');overrideclick('go south');
				overrideclick('event_1_77496481');
				console.log("侠客岛日常结束");
				setTimeout(function(){pozhen();},500);
			}else{
				console.log("我在哪里？？")
				setTimeout(function(){xiakedao3();},500);
			}
		}

	}
	function binghuodao(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish35");
		if (jhlist!=undefined&&jhlist!=0){
			overrideclick('jh 35');
			overrideclick('go northwest');      // 熔岩滩头
			overrideclick('go northwest');      // 海蚀涯
			overrideclick('go northwest');      // 峭壁崖道
			overrideclick('go north');      // 峭壁崖道
			overrideclick('go northeast') ;     // 炙溶洞口
			overrideclick('go northwest');      // 炙溶洞
			overrideclick('go west') ;     // 炙溶洞口
			overrideclick('go northwest') ;     // 熔岩小径
			overrideclick('go east') ;     // 熔岩小径
			overrideclick('go east');      // 石华林
			overrideclick('go east');      // 分岛岭
			overrideclick('go east');      // 跨谷石桥
			overrideclick('go east') ;     // 大平原
			overrideclick('go southeast');overrideclick('go north'); overrideclick('go north'); overrideclick('go west') ; overrideclick('go north');overrideclick('go west') ;overrideclick('event_1_53278632');overrideclick('sousuo');overrideclick('sousuo');
			console.log("冰火岛日常结束");
			console.log("日常结束");
		}else{
			console.log("日常结束");
		}

	}
	function pozhen(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish26");
		if (jhlist!=undefined&&jhlist!=0){
			overrideclick('jh 26');
			overrideclick('go west');
			overrideclick('go west');
			overrideclick('go north');
			overrideclick('go north');
			overrideclick('event_1_14435995');
			console.log("破阵日常结束");
			setTimeout(function(){binghuodao();},500);
		}else{
			setTimeout(function(){binghuodao();},500);
		}
	}
	function weieyu(){
		var jhlist=g_obj_map.get("msg_jh_list").get("finish37");
		if (jhlist!=undefined&&jhlist!=0){
			overrideclick("jh 37");
			overrideclick("go north");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go northwest");
			overrideclick("go northwest");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("go east");
			overrideclick("go north");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go northeast");
			overrideclick("go northeast");
			overrideclick("go northeast");
			overrideclick("go southeast");
			overrideclick("go north");
			overrideclick('event_1_97487911');
			console.log("喂过鳄鱼");
			xiakedao1();
		}else{
			xiakedao1();
		}
	}


	function maikuli() {
		overrideclick('work click maikuli');
	}
	function duancha() {
		overrideclick('work click duancha');
	}
	function dalie() {
		overrideclick('work click dalie');
	}
	function baobiao() {
		overrideclick('work click baobiao');
	}
	function maiyi() {
		overrideclick('work click maiyi');
	}
	function xuncheng() {
		overrideclick('work click xuncheng');
	}
	function datufei() {
		overrideclick('work click datufei');
	}
	function dalei() {
		overrideclick('work click dalei');
	}
	function kangjijinbin() {
		overrideclick('work click kangjijinbin');
	}
	function zhidaodiying() {
		overrideclick('work click zhidaodiying');
	}
	function dantiaoqunmen() {
		overrideclick('work click dantiaoqunmen');
	}
	function shenshanxiulian() {
		overrideclick('work click shenshanxiulian');
	}
	function jianmenlipai(){
		overrideclick('work click jianmenlipai');
	}
	function dubawulin(){
		overrideclick('work click dubawulin');
	}

	function scanEscapedFish() {
		maikuli();
		duancha();
		dalie();
		baobiao();
		maiyi();
		xuncheng();
		datufei();
		dalei();
		kangjijinbin();
		zhidaodiying();
		dantiaoqunmen();
		shenshanxiulian();
		jianmenlipai();
		dubawulin();
		overrideclick('public_op3'); // 向师傅磕头
	}
	// 刷碎片 ------------------------------------------------------------------------------------------------------
	//document.body.removeChild(getRewardsButton);
	var killDrunkTrigger=0;
	var killDrunkManButton = document.createElement('button');
	killDrunkManButton.innerText = '刷碎片';
	killDrunkManButton.style.position = 'absolute';
	killDrunkManButton.style.right = '0px';
	killDrunkManButton.style.top = '180px';
	currentPos = currentPos + delta;
	killDrunkManButton.style.width = buttonWidth+1;
	killDrunkManButton.style.height = buttonHeight;
	document.body.appendChild(killDrunkManButton);
	killDrunkManButton.addEventListener('click', killDrunkMan);
	function killDrunkMan(){
		if (killDrunkTrigger==0){
			killDrunkTrigger=1;
			killDrunkManFunc();
			killDrunkManButton.innerText = '停止刷';

		}else{
			killDrunkTrigger=0;
			killDrunkManButton.innerText = '刷碎片';
			if (killDrunkIntervalFunc!=undefined)
			clearInterval(killDrunkIntervalFunc);
			else
			setTimeout(function(){clearInterval(killDrunkIntervalFunc);},1000);
		}
	}

	var DrunkMan_targetName = 'luoyang_luoyang26';
	var  zdskill="天剑;真武七截剑";
	var counthead= 20;
	var killDrunkIntervalFunc =  null;
	function killDrunkManFunc(){
		zdskill =  mySkillLists;
		if (! (counthead=prompt("请输入剩余数量","20"))){
			return;
		}
		overrideclick('jh 2');        // 进入章节
		overrideclick('go north');      // 南郊小路
		overrideclick('go north');     // 南门
		overrideclick('go north');     // 南大街
		overrideclick('go north');     // 洛川街
		killDrunkIntervalFunc = setInterval(killDrunMan,500);
	}
	function isContains(str, substr) {
		return str.indexOf(substr) >= 0;
	}
	function killDrunMan(){
		if(counthead>0){
			overrideclick('kill ' + DrunkMan_targetName);
			ninesword();
			if($('span:contains(胜利)').text().slice(-3)=='胜利！'){
				counthead=counthead-1;
				console.log('杀人一次，剩余杀人次数：%d！',counthead);
				overrideclick('prev_combat');
			}
		}else {
			overrideclick('prev_combat');
			overrideclick('home');
			clearInterval(killDrunkIntervalFunc);
		}
	}
	function ninesword(){
		if(isContains(zdskill, $('#skill_1').children().children().text()))
		{
			overrideclick('playskill 1');
		}

		else if(isContains(zdskill, $('#skill_2').children().children().text()))
		{
			overrideclick('playskill 2');
		}
		else if(isContains(zdskill, $('#skill_3').children().children().text()))
		{
			overrideclick('playskill 3');
		}
		else if(isContains(zdskill, $('#skill_4').children().children().text()))
		{
			overrideclick('playskill 4');
		}
		else
		{
			overrideclick('playskill 1');
		}
	}
	// 钓鱼------------------------------------------------------------------------------------------------------
	//document.body.removeChild(fishingButton);
	var fishingTrigger=0;
	var fishingButton = document.createElement('button');
	fishingButton.innerText = '开始钓鱼';
	fishingButton.style.position = 'absolute';
	fishingButton.style.right = '0px';
	fishingButton.style.top ='210px';
	currentPos = currentPos + delta;
	fishingButton.style.width = buttonWidth+24;
	fishingButton.style.height = buttonHeight;
	document.body.appendChild(fishingButton);
	fishingButton.addEventListener('click', fishingFunction);
	function fishingFunction(){
		console.log("打开江湖");
		overrideclick('jh',0);
		if (fishingTrigger==0){
			fishingFirstFunc();
			fishingButton.innerText = '停止钓鱼';
			fishingTrigger=1;
		}else{
			fishingButton.innerText = '开始钓鱼';
			fishingTrigger=0;
		}

	}
	function fishingFirstFunc(){
	//    console.clear();
		console.log("开始钓鱼！");
		console.log("判断是否已经开放冰火岛");
		setTimeout(function(){fishstart();},1000);
	}
	function fishstart(){
		var location=g_obj_map.get("msg_room").get("short");
		if (location=="冰湖"){
			overrideclick('diaoyu');
			return;
		}
		if (g_obj_map.get("msg_jh_list").get("finish35")==2){
			overrideclick("jh 35",0);
			fishingSecondStage();
		}else{
			fishingFirstStage();
		}
	}

	function permit(){
		this.dispatchMessage = function(b) {
			var type = b.get("type"), subType=b.get("subtype");
			if (type=="channel"&&subType=="tell"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if (msg.match("长歌·兵")!=null){
					console.log(msg.split("：")[1]);
				}
			}
		}
	}

	var allowed=new permit;
	function fishingFirstStage(){
	// 进入扬州
		overrideclick('jh 5');       // 进入章节
		overrideclick('go north');     // 南门大街
		overrideclick('go north');   // 十里长街3
		overrideclick('go north');    // 十里长街2
		overrideclick('go north');      // 十里长街1
		overrideclick('go north');      // 中央广场
		overrideclick('go north');      // 十里长街4
		overrideclick('go north');      // 十里长街5
		overrideclick('go north');      // 十里长街6
		overrideclick('go north');      // 北门大街
		overrideclick('go north');      // 镇淮门
		overrideclick('go northeast') ;     // 扬州港
		overrideclick('look_npc yangzhou_chuanyundongzhu');
		overrideclick('chuhai go');
		setTimeout(function(){fishingSecondStage();},1000);
	}
	// 挖鱼饵参数
	var resFishingParas = 100;   // 系统里默认最多挖50次
	var buttonName_digworm = 'event_1_59308235';
	var cutTreeButtonName = 'event_1_45715622';
	var diaoyu_buttonName = 'diaoyu';
	var digWormFun=null;
	var firstFishingParas = true;
	var  resFishToday = 10;
	var lastFishMsg = "";
	function fishingSecondStage(){
		// 到达冰火岛
		overrideclick('chuhaigo', 0);
		overrideclick('go northwest');      // 熔岩滩头
		overrideclick('go northwest');      // 海蚀涯
		overrideclick('go northwest');      // 峭壁崖道
		overrideclick('go north');      // 峭壁崖道
		overrideclick('go northeast') ;     // 炙溶洞口
		overrideclick('go northwest');      // 炙溶洞
		overrideclick('go west') ;     // 炙溶洞口
		overrideclick('go northwest') ;     // 熔岩小径
		overrideclick('go east') ;     // 熔岩小径
		overrideclick('go east');      // 石华林
		overrideclick('go east');      // 分岛岭
		overrideclick('go east');      // 跨谷石桥
		overrideclick('go east') ;     // 大平原
		overrideclick('go southeast');
		overrideclick('go east');
		overrideclick('diaoyu');
	}
	var kanshufinish=0;
	var kanshuing=0;
	var wachonging=0;
	var wachongfinish=0;
	function kanshu(){
		overrideclick('go west');
		overrideclick('go south');
		overrideclick('go southeast');
		overrideclick('go west');
		overrideclick('go northwest');
		overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go south');overrideclick('go west');overrideclick('go west');overrideclick('go north');overrideclick('go east');overrideclick('go north');overrideclick('go west');overrideclick('go west');overrideclick('go south');
		overrideclick('event_1_45715622');
	}
	function wachong(){
		overrideclick('go west');
		overrideclick('go northwest');
		overrideclick('event_1_59308235');
	}
	function fishingfeedback(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="notice"||type=="main_msg"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				overrideclick('look_room', 0);
				console.log(msg);
				//开始判断钓鱼情况
				if (msg.match("整个冰湖的渔获都快被你钓光了")!=null){
					console.log("今天钓鱼结束了");
					fishingButton.innerText = '开始钓鱼';
					fishingTrigger=0;
				}else if (msg.match("突然")!=null){
					setTimeout(function(){overrideclick('diaoyu');},5000);
				}else if (msg.match("你目前正在钓鱼中")!=null){
					setTimeout(function(){overrideclick('diaoyu');},100);
				}else if(kanshufinish==0&&msg.match("你还没有鱼竿")!=null){
					kanshu();
					kanshuing=1;
				}else if(kanshufinish==1&&msg.match("你还没有鱼竿")!=null){
					overrideclick('shop money_buy shop5');
					overrideclick('diaoyu');
				}else if(wachongfinish==0&&msg.match("你还没有鱼饵")!=null){
					wachong();
					wachonging=1;
				}else if(wachongfinish==1&&msg.match("你还没有鱼饵")!=null){
					overrideclick('shop money_buy shop6');
					overrideclick('diaoyu');
				}else if(kanshuing==1&&msg.match("你调运内功向林海一掌打去")!=null){
					setTimeout(function(){overrideclick('event_1_45715622');},5000);
				}else if(wachonging==1&&msg.match("你在湿润的土地上四处翻动")!=null){
					setTimeout(function(){overrideclick('event_1_59308235');},5000);
				}else if(wachonging==1&&msg.match("你挖掘的太快了")!=null){
					setTimeout(function(){overrideclick('event_1_59308235');},100);
				}else if(kanshuing==1&&msg.match("你砍伐树木太快了")!=null){
					setTimeout(function(){overrideclick('event_1_45715622');},100);
				}else if (kanshuing==1&&msg.match("你今天已经够累得了")!=null){
					kanshuing=0;
					kanshufinish=1;
					overrideclick('go north');overrideclick('go north');
					overrideclick('go east');overrideclick('go north');
					overrideclick('go southeast');overrideclick('go east');overrideclick('go northwest');overrideclick('go north');
					overrideclick('go east');overrideclick('diaoyu');
				}else if (wachonging==1&&msg.match("你今天已经够累得了")!=null){
					wachonging=0;
					wachongfinish=1;
					overrideclick('go southeast');
					overrideclick('go east');
					overrideclick('diaoyu');

				}
			}
		}
	}
	var fishfeedback=new fishingfeedback;

	// 清谜题 ------------------------------------------------------------------------------------------------------
	//document.body.removeChild(clearPuzzlesButton);
	var clearPuzzlesButton = document.createElement('button');
	clearPuzzlesButton.innerText = '清谜题';
	clearPuzzlesButton.style.position = 'absolute';
	clearPuzzlesButton.style.right = '0px';
	clearPuzzlesButton.style.top ='270px';
	currentPos = currentPos + delta;
	clearPuzzlesButton.style.width = buttonWidth+1;
	clearPuzzlesButton.style.height = buttonHeight;
	document.body.appendChild(clearPuzzlesButton);
	clearPuzzlesButton.addEventListener('click', clearPuzzleFunc);
	function clearPuzzleFunc(){
		overrideclick('auto_tasks cancel');
	}

	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			+ " " + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
		return currentdate;
	}

	function rmTails(arr) {
		for(var i=0; i< arr.length; i++) {
			var temp = arr[i].split("【");
			arr[i] = temp[0];
		}
	}
	function removeByValue(arr, val) {
		for(var i=0; i< arr.length; i++) {
			if(arr[i] == val) {
				arr.splice(i, 1);
			}
		}
	}
	function getStrStartsWith(arr, header){
		var out = [];
		var countor= 0;
		for(var i=0; i< arr.length; i++) {
			if(arr[i].startsWith(header)) {
				out[countor] = arr[i];
				countor= countor + 1;
			}
		}
		return out;
	}
	function getStrContains(arr, substr){
		var out = [];
		var countor= 0;
		for(var i=0; i< arr.length; i++) {
			if(isContains(arr[i],substr)) {
				out[countor] = arr[i];
				countor= countor + 1;
			}
		}
		return out;
	}


	String.prototype.trim = function (char, type) { // 去除字符串中，头部或者尾部的指定字符串
		if (char) {
			if (type == 'left') {
				return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
			} else if (type == 'right') {
				return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
			}
			return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
		}
		return this.replace(/^\s+|\s+$/g, '');
	};

	var qiangdipiButton = document.createElement('button');
	qiangdipiButton.innerText = '开始抢物品';
	qiangdipiButton.style.position = 'absolute';
	qiangdipiButton.style.right = '0px';
	qiangdipiButton.style.top ='300px';
	currentPos = currentPos + delta;
	qiangdipiButton.style.width = buttonWidth+24;
	qiangdipiButton.style.height = buttonHeight;
	document.body.appendChild(qiangdipiButton);
	qiangdipiButton.addEventListener('click', qiangdipiFunc);
	var qiangdipiTrigger=0;
	function qiangdipiFunc(){
		if (qiangdipiTrigger==0){
			qiangdipiButton.innerText = '停止抢物品';
			qiangdipiTrigger=1;
			qiangItem();
		}else if (qiangdipiTrigger==1){
			qiangdipiButton.innerText = '开始抢物品';
			qiangdipiTrigger=0;
			knownlist=[];//清空已知列表
		}
	}
	function qiangItem(){
		if (qiangdipiTrigger==1){
			var Objectlist=g_obj_map.get("msg_room").elements;
			for (var i=0;i<Objectlist.length;i++){
				if (Objectlist[i].key.indexOf("item")>=0){
					if (knownlist.indexOf(" "+Objectlist[i].value.split(',')[0])<0){
						overrideclick('get1 '+Objectlist[i].value.split(',')[0], 0);
					}
				}
			}
			setTimeout(function(){qiangItem();},50);
		}
	}
	var QiXiaTalkButton = document.createElement('button');
	QiXiaTalkButton.innerText = '奇侠领朱果';
	QiXiaTalkButton.style.position = 'absolute';
	QiXiaTalkButton.style.right = '0px';
	QiXiaTalkButton.style.top ='60px';
	currentPos = currentPos + delta;
	QiXiaTalkButton.style.width = buttonWidth+12;
	QiXiaTalkButton.style.height = buttonHeight;
	document.body.appendChild(QiXiaTalkButton);
	QiXiaTalkButton.addEventListener('click', QiXiaTalkFunc);
	var QXretried=0;
	var QXStop=0;
	var QXTalkcounter=1;
	var QxTalking=0;
	function GetQXID(name,QXindex){
		if (QXStop==1&&qinmiFinished==1){
			return;
		}else if (g_obj_map.get("msg_room")==undefined||QXStop==1){
			setTimeout(function(){GetQXID(name,QXindex);},500);
		}else{
			console.log("开始寻找"+name+QXindex);
			var QX_ID = "";
			var npcindex=0;
			var els=g_obj_map.get("msg_room").elements;
			for (var i = els.length - 1; i >= 0; i--) {
				if (els[i].key.indexOf("npc") > -1) {
					if (els[i].value.indexOf(",") > -1) {
						var elsitem_ar = els[i].value.split(',');
						if (elsitem_ar.length > 1 && elsitem_ar[1] == name) {
							console.log(elsitem_ar[0]);
							npcindex=els[i].key;
							QX_ID = elsitem_ar[0];
						}
					}
				}
		  }
		 if (QX_ID==null||QX_ID==undefined||QX_ID==0){
			 clickButton('find_task_road qixia '+QXindex);
			 setTimeout(function(){GetQXID(name,QXindex);},500);
		 }else{
			console.log("找到奇侠编号"+QX_ID);
			if (QXTalkcounter<=5){
				console.log("开始与"+name+"第"+QXTalkcounter+"对话")
				QXTalkcounter++;
				clickButton('ask '+QX_ID);
				clickButton('find_task_road qixia '+QXindex);
				setTimeout(function(){GetQXID(name,QXindex)},500);
			}else if (QXTalkcounter>5){
				QXTalkcounter=1;
				console.log("与"+name+"对话完成");
				QixiaTotalCounter++;
				if (QixiaTotalCounter>12){

					alert("今日奇侠已经完成");
				}else{
					console.log("下一个目标是"+finallist[QixiaTotalCounter]["name"]);
				}
				talktoQixia();
			}
		 }

		}
	}
	var QixiaTotalCounter=0;
	function TalkQXBase(name,QXindex){
		var QX_NAME = name;
		console.log("开始撩" + QX_NAME + "！");
		if (g_obj_map.get("msg_room")!=undefined)
		g_obj_map.get("msg_room").clear();
		overrideclick('find_task_road qixia ' + QXindex);
		overrideclick('golook_room');
		setTimeout(function(){GetQXID(QX_NAME,QXindex);},500);
	}

	function TalkLangHuanYu(){
	// 0 浪欢愉
		if (QXStop==1){
			return;
		}
		TalkQXBase("浪唤雨",0);
	}
	function TalkWangRong(){
		// 1 王蓉，要果子
		if (QXStop==1){
			return;
		}
		TalkQXBase("王蓉",1);
	}
	function TalkPangTong(){
		// 2 庞统
		if (QXStop==1){
			return;
		}
		TalkQXBase("庞统",2);
	}
	function TalkLiYuFei(){
		// 3 李宇飞，要果子
		if (QXStop==1){
			return;
		}
		TalkQXBase("李宇飞",3);
	}
	function TalkBuJingHong(){
		//4  步惊魂
		if (QXStop==1){
			return;
		}
		TalkQXBase("步惊鸿",4);
	}
	function TalkFengXingJu(){
		//5 风行骓
		if (QXStop==1){
			return;
		}
		TalkQXBase("风行骓",5);
	}
	function TalkGuoJI(){
	// 6 郭记
		if (QXStop==1){
			return;
		}
		TalkQXBase("郭济",6);
	}
	function TalkWuZhen(){
	// 7 吴缜
		if (QXStop==1){
			return;
		}
		TalkQXBase("吴缜",7);
	}
	function TalkFengNan(){
	// 8 凤南
		if (QXStop==1){
			return;
		}
		TalkQXBase("风南",8);
	}
	function TalkHuoYunXieShen(){
	//9 火云邪神
		if (QXStop==1){
			return;
		}
		TalkQXBase("火云邪神",9);
	}
	function TalkNiFengWu(){
	//10 逆风舞
		if (QXStop==1){
			return;
		}
		TalkQXBase("逆风舞",10);
	}
	function TalkCangGuYan(){
		//11 狐苍雁
		if (QXStop==1){
			return;
		}
		TalkQXBase("狐苍雁",11);
	}
	function TalkHuZhu(){
		//12 护竺
		if (QXStop==1){
			return;
		}
		TalkQXBase("护竺",12);
	}
	var currentTime  = 0;
	var delta_Time = 2000;
	var QXStop=0;
	var qinmiFinished=0;
	var QiXiaList=[];
	function QXWhisper(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subtype = b.get("subType");
			if (type=="notice"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if (msg.match("对你悄声道")!=null){
					QXStop=1;
					alert(msg);
					QiXiaTalkButton.innerText = '继续奇侠';
				}
				console.log(msg);
			}else if (type=="main_msg"){
				var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if (msg.match("今日亲密度操作次数")!=null){
					var qinmi=parseInt(msg.split("(")[1].split("/")[0]);
					if (qinmi==20){
						QXStop=1;
						qinmiFinished=1;
						alert("今日亲密度操作已经达到20，奇侠功能暂停。再次使用请重新点击开始领取果子。");
						QXTalking=0;
					}
				}
			}
		}
	}
	var whipser=new QXWhisper;
	function GetQiXiaList(){
		var html=g_obj_map.get("msg_html_page");
		QxTalking=1;
		if (html==undefined){
			setTimeout(function(){GetQiXiaList();},500);
		}else if(g_obj_map.get("msg_html_page").get("msg").match("江湖奇侠成长信息")==null){
			setTimeout(function(){GetQiXiaList();},500);
		}else{
			QiXiaList=formatQx(g_obj_map.get("msg_html_page").get("msg"));
			console.log(QiXiaList);
			SortQiXia();
		}
	}
	function SortQiXia(){//冒泡法排序
		var temp={};
		var temparray=[];
		var newarray=[];
		for (var i=0;i<QiXiaList.length;i++){
			for (var j=1;j<QiXiaList.length-i;j++){
				if (parseInt(QiXiaList[j-1]["degree"])<parseInt(QiXiaList[j]["degree"])){
					temp=QiXiaList[j-1];
					QiXiaList[j-1]=QiXiaList[j];
					QiXiaList[j]=temp;
				}
			}
		}
		var tempcounter=0;
		console.log("奇侠好感度排序如下:");
		console.log(QiXiaList);
		//首次排序结束 目前是按照由小到大排序。现在需要找出所有的超过25000 小于30000的奇侠。找到后 排序到最上面；
		for (var i=0;i<QiXiaList.length;i++){
			if (parseInt(QiXiaList[i]["degree"])>=25000&&parseInt(QiXiaList[i]["degree"])<30000){
				temparray[tempcounter]=QiXiaList[i];
				tempcounter++;
				newarray.push(i);
			}
		}
		console.log(temparray);
		console.log("提取满朱果好感度排序如下:");
		for (var i=0;i<QiXiaList.length;i++){
			if (newarray.indexOf(i)==-1){
				temparray[tempcounter]=QiXiaList[i];
				tempcounter++;
			}
		}
		var over3=[];
		console.log(temparray);//第一次排序结束。现在要挑出所有超过3万的亲密 并且放到最后。
		for (var i=0;i<temparray.length;i++){
			if (parseInt(temparray[i]["degree"])>=30000){//找到3万以上的
				over3.push(i);//push超过3万的序号
			}
		}
		console.log(over3);
		var overarray=[];
		var overcounter=0;
		for (var i=0;i<temparray.length;i++){ //第一遍循环 找到不在3万列表中的
			if (over3.indexOf(i)<0){
				overarray[overcounter]=temparray[i];
				overcounter++;
			}
		}
		console.log(overarray);
		for (var i=0;i<temparray.length;i++){//第二遍循环 把列表中的插入
			if (over3.indexOf(i)>=0){
			overarray[overcounter]=temparray[i];
			overcounter++;
			}
		}
		finallist=[];
		finallist=overarray;
		console.log(finallist);
		getZhuguo();
	}
	function getZhuguo(){
		var msg="";
		console.log(finallist);
		for (var i=0;i<4;i++){//只检查 头四个奇侠是不是在师门，是不是已经死亡。
			if (finallist[i]["isOk"]!=true){
				msg+=finallist[i]["name"]+" ";
			}
		}
		if (msg!=""){
			alert("根据您的奇侠亲密好感度，目前可以最优化朱果数目的以下奇侠不在江湖或者已经死亡："+msg+"。请您稍后再尝试使用奇侠领取朱果服务。");
		}else{//头四位奇侠都在江湖中，可以开始领取朱果
			talktoQixia();
		}
	}
	var unfinish="";
	function talktoQixia(){
		if (QixiaTotalCounter<=12){// 奇侠list仍然有元素。开始调取排列第一个的奇侠
			var Qixianame="";
			var QixiaIndex=0;
			console.log(finallist[0]["name"]);
			Qixianame=finallist[QixiaTotalCounter]["name"];
			QixiaIndex=finallist[QixiaTotalCounter]["index"];
			if (finallist[QixiaTotalCounter]["isOk"]!=true){
				alert("奇侠"+Qixianame+"目前不在江湖，可能死亡，可能在师门。领取朱果中断，请在一段时间之后重新点击领取朱果按钮。无需刷新页面");
				return;
			}else{
				console.log(finallist[0]);
				console.log(finallist[0]);
				clickButton('find_task_road qixia '+QixiaIndex);

				console.log(QixiaIndex);
				GetQXID(Qixianame,QixiaIndex);
			}
		}
	}
	var finallist=[];
	function QiXiaTalkFunc(){
		var QiXiaList_Input= "";
		//打开 江湖奇侠页面。
		if (QXStop==0){
			clickButton('open jhqx', 0);
			GetQiXiaList();
		}else if (QXStop==1&&qinmiFinished==0){
			QXStop=0;
			QiXiaTalkButton.innerText = '奇侠领朱果';
		}else if (QXStop==1&&qinmiFinished==1){
			QXStop=0;
			QixiaList=[];
			finallist=[];
			QXTalkcounter=1;
			QixiaTotalCounter=0;
			clickButton('open jhqx', 0);
			GetQiXiaList();
		}
	}
	// 格式话奇侠数据并返回数组
	function formatQx(str){
		var tmpMsg = removeSpec(str);
		var arr = tmpMsg.match(/<tr>(.*?)<\/tr>/g);
		var qxArray = [];
		var qxInfo = {};
		if(arr){
			for(var i = 0;i < arr.length;i++){
				qxInfo = {};
				arr2 = arr[i].match(/<td[^>]*>([^\d\(]*)\(?(\d*)\)?<\/td><td[^>]*>(.*?)<\/td><td[^>]*>(.*?)<\/td><td[^>]*>.*?<\/td>/);
				qxInfo["name"] = arr2[1];
				qxInfo["degree"] = arr2[2] == "" ? 0 : arr2[2];
				console.log(arr2);
				if (arr2[3].match("未出世")!=null||arr2[4].match("师门")!=null){
					qxInfo["isOk"]=false;
				}else{
					qxInfo["isOk"]=true;
				}
				qxInfo["index"]=i;
				qxArray.push(qxInfo);

			}
			return qxArray;
		}
		return [];
	}

	// 去除链接以及特殊字符
	function removeSpec(str) {
		var tmp = g_simul_efun.replaceControlCharBlank(str.replace(/\u0003.*?\u0003/g, ""));
		tmp = tmp.replace(/[\x01-\x09|\x11-\x20]+/g, "");
		return tmp;
	}

	function talk2QiXiabyName(localname){
	//    console.log("目前是：" + localname);
		currentTime = currentTime + delta_Time;
		switch(localname){
			case "王蓉":
				setTimeout(TalkWangRong, currentTime); // 王蓉
				break;
			case "浪唤雨":
				setTimeout(TalkLangHuanYu, currentTime);
				break;
			case "庞统":
				setTimeout(TalkPangTong, currentTime);
				break;
			case "李宇飞":
				setTimeout(TalkLiYuFei, currentTime);
				break;
			case "步惊鸿":
				setTimeout(TalkBuJingHong, currentTime);
				break;
			case "风行骓":
				setTimeout(TalkFengXingJu, currentTime);
				break;
			case "郭济":
				setTimeout(TalkGuoJI, currentTime);
				break;
			case "吴缜":
				setTimeout(TalkWuZhen, currentTime);
				break;
			case "风南":
				setTimeout(TalkFengNan, currentTime);
				break;
			case "火云邪神":
				setTimeout(TalkHuoYunXieShen, currentTime);
				break;
			case "逆风舞":
				setTimeout(TalkNiFengWu, currentTime);
				break;
			case "狐苍雁":
				setTimeout(TalkCangGuYan, currentTime);
				break;
			case "护竺":
				setTimeout(TalkHuZhu, currentTime);
				break;
			default:
				console.error("没有找到该奇侠：" + localname + " ！");
		}
	}
	function getSilverKeys(){
		overrideclick('jh 20');        // 进入古墓
		overrideclick('go west') ;     // 山路
		overrideclick('go west') ;     // 山路
		overrideclick('go south') ;     // 山路
		overrideclick('go east') ;     // 终南山主峰
		overrideclick('go south') ;     // 山路
		overrideclick('go south') ;     // 空地
		overrideclick('go south') ;     // 小树林
		overrideclick('go south') ;     // 小树林
		overrideclick('go south') ;     // 小树林
		overrideclick('go southwest') ;     // 小树林
		overrideclick('go southwest') ;     // 小树林
		overrideclick('go south') ;     // 草地
		overrideclick('go south') ;     // 墓门
		overrideclick('go south') ;     // 墓道
		overrideclick('go south') ;     // 前厅
		overrideclick('go east') ;     // 墓道
		overrideclick('go east') ;     // 中厅
		overrideclick('event_1_3723773');// 翻开大匾
		overrideclick('get yin yaoshi');
		overrideclick('go south') ;     // 中厅
		overrideclick('give gumu_longnv'); //给予龙儿
		overrideclick('home');
		overrideclick('study gumu_yufeng-book'); // 学习
	}
	

/*/ 买物品 ------------------------------------------------------------------------------------------------------
	var buyOneBeeButton = document.createElement('button');
	buyOneBeeButton.innerText = '买物品';
	buyOneBeeButton.style.position = 'absolute';
	buyOneBeeButton.style.right = '0px';
	buyOneBeeButton.style.top ='0px';
	currentPos = currentPos + delta;
	buyOneBeeButton.style.width = buttonWidth;
	buyOneBeeButton.style.height = buttonHeight;
	document.body.appendChild(buyOneBeeButton);
	

buyOneBeeButton.addEventListener('click', buyOneBeeFunc);*/
	function buyOneBeeFunc(){
		var object  = "";
		var num  = 0;

		if(!( num  = prompt("请输入购买的鱼竿鱼饵数量（自动购买10个引路蜂）：","10"))){ // 支持 引路蜂，鱼竿，鱼饵
			return;
		}
		num  = parseInt(num); // 支持 引路蜂，鱼竿，鱼饵
		// 引路蜂

			for(var i=0; i < 10; i++) { // 从第一个开始循环
				overrideclick('shop money_buy shop1');
			}

			for(var i=0; i < num; i++) { // 从第一个开始循环
				overrideclick('shop money_buy shop5'); // 鱼竿
			}

			for(var i=0; i < num; i++) { // 从第一个开始循环
				overrideclick('shop money_buy shop6'); // 鱼饵
			}

	}

	
/*/ 吃药 ------------------------------------------------------------------------------------------------------
	var userMedecineButton = document.createElement('button');
	userMedecineButton.innerText = '一键恢复';
	userMedecineButton.style.position = 'absolute';
	userMedecineButton.style.right = '0px';
	userMedecineButton.style.top ='0px';
	currentPos = currentPos + delta;
	userMedecineButton.style.width = buttonWidth+12;
	userMedecineButton.style.height = buttonHeight;
	document.body.appendChild(userMedecineButton);
	

userMedecineButton.addEventListener('click', userMedecineFunc);*/
	var healtriger=0;
	function userMedecineFunc(){
	   if (healtriger==0){
		   healtriger=1;
		   healFunc();
		   userMedecineButton.innerText = '停止恢复';
	   }else{
		   userMedecineButton.innerText = '一键恢复';
		   healtriger=0;
	   }
	}
	// 自动答题
	var answerQuestionButton = document.createElement('button');
	answerQuestionButton.innerText = '自动答题';
	answerQuestionButton.style.position = 'absolute';
	answerQuestionButton.style.right = '0px';
	answerQuestionButton.style.top ='330px';
	currentPos = currentPos + delta;
	answerQuestionButton.style.width = buttonWidth+12;
	answerQuestionButton.style.height = buttonHeight;
	document.body.appendChild(answerQuestionButton);
	answerQuestionButton.addEventListener('click', answerQuestionFunc);
	function answerQuestionFunc(){
	   overrideclick('look_room');
	   clickButton('question', 0)
	}

	var WabaoButton = document.createElement('button');
	WabaoButton.innerText = '自动挖宝';
	WabaoButton.style.position = 'absolute';
	WabaoButton.style.right = '0px';
	WabaoButton.style.top ='240px';
	currentPos = currentPos + delta;
	WabaoButton.style.width = buttonWidth+12;
	WabaoButton.style.height = buttonHeight;
	document.body.appendChild(WabaoButton);
	WabaoButton.addEventListener('click', WabaoFunc);
	function WabaoFunc(){
	   overrideclick('cangbaotu_op1', 1)
	}

	var fanjiTrigger=0;
	function fanjiFunc(){
		if (fanjiTrigger==0){
			fanjiButton.innerText = '停止自动破招';
			fanjiTrigger=1;
		}else if (fanjiTrigger==1){
			fanjiButton.innerText = '自动破招';
			fanjiTrigger=0;
		}
	}
	var onekillButton = document.createElement('button');
	onekillButton.innerText = '循环击杀';
	onekillButton.style.position = 'absolute';
	onekillButton.style.left = '0px';
	onekillButton.style.top ='180px';
	currentPos = currentPos + delta;
	onekillButton.style.width = buttonWidth+24;
	onekillButton.style.height = buttonHeight;
	document.body.appendChild(onekillButton);
	onekillButton.addEventListener('click', onekillFunc);
	var onekillTrigger=0;

	function onekillFunc(){
		if (onekillTrigger==0){
			onekillButton.innerText = '停止循环击杀';
			onekillTrigger=1;
			killloop();
		}else if (onekillTrigger==1){
			onekillButton.innerText = '循环击杀';
			onekillTrigger=0;
		}
	}
	var killpause=0;
	function killloop(){
		if (onekillTrigger==1&&killpause==0){
			var npcid=g_obj_map.get("msg_npc").get("id");
			console.log("我的目标是:"+npcid);
			overrideclick('kill '+npcid);
			setTimeout(function(){killloop();},200);
		}else if(onekillTrigger==1&&killpause==1){
			setTimeout(function(){killloop();},200);
		}
	}
	function Onekill(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type == "vs") {
				console.log(subType);
				if (subType!="combat_result"&&subType!="text"){
					killpause=1;
				}else if(subType=="combat_result"){
					killpause=0;
				}

			}
		}
	}
	var onekill=new Onekill;
	var escapeButton = document.createElement('button');
	escapeButton.innerText = '逃跑回坑';
	escapeButton.style.position = 'absolute';
	escapeButton.style.left = '0px';
	escapeButton.style.top ='150px';
	currentPos = currentPos + delta;
	escapeButton.style.width = buttonWidth+24;
	escapeButton.style.height = buttonHeight;
	document.body.appendChild(escapeButton);
	escapeButton.addEventListener('click', escapeStart);
	var escapeTrigger=0;
	function escapeStart(){
		escapeTrigger=1;
		escapeloop();
	}
	function escapeloop(){
		console.log("我逃");
		overrideclick('escape', 0) //循环逃跑判定
		if (escapeTrigger==1)
		setTimeout(function(){escapeloop();},500);
	}

	function EscapeFunc(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			console.log(type);
			console.log(subType);
			var combat=g_obj_map.get("msg_vs_info");
			if (combat==undefined){
				return;
			}
			var npcid;
			var opnpc;
			var me=g_obj_map.get("msg_attrs").get("id");
			for (var i=0;i<4;i++){
				if (combat.get("vs1_pos"+i)==me){
					opnpc=combat.get("vs1_pos1");
					npcid=combat.get("vs2_pos1");
				}else if (combat.get("vs2_pos"+i)==me){
					opnpc=combat.get("vs2_pos1");
					npcid=combat.get("vs1_pos1");
				}
			}
			if (type == "notice" && subType == "escape") {
			var msg=g_simul_efun.replaceControlCharBlank(b.get("msg"));
				console.log(msg);
				if (msg.match("逃跑成功")!=null){
					escapeTrigger=0;
					//开始恢复
					if (changeTrigger==1){
						changeTrigger=0;
						clickButton("fight "+opnpc,0);
						clickButton("kill "+opnpc,0);
					}
					else if(changeTrigger==0){
						clickButton("fight "+npcid,0);
						clickButton("kill "+npcid,0);
					}

				}
			}
		}
	}
	var escapechangeButton = document.createElement('button');
	escapechangeButton.innerText = '逃跑换边';
	escapechangeButton.style.position = 'absolute';
	escapechangeButton.style.left = '0px';
	escapechangeButton.style.top ='120px';
	currentPos = currentPos + delta;
	escapechangeButton.style.width = buttonWidth+24;
	escapechangeButton.style.height = buttonHeight;
	document.body.appendChild(escapechangeButton);
	escapechangeButton.addEventListener('click', escapechangeStart);
	var changeTrigger=0;
	function escapechangeStart(){
		escapeTrigger=1;
		changeTrigger=1;
		escapeloop();
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
				userMedecineButton.innerText = '一键恢复';
		   		healtriger=0;
			}
		}
	}

	var escape=new EscapeFunc;
	
	
	//-------------------------分割线-----------

// 换装备 -------------------------------------------------------
var ZhuangBeiButton = document.createElement('button');
ZhuangBeiButton.innerText = '战斗装备';
ZhuangBeiButton.style.position = 'absolute';
ZhuangBeiButton.style.right = '0px';
ZhuangBeiButton.style.top = '360px';
currentPos = currentPos + delta;
ZhuangBeiButton.style.width = buttonWidth+12;
ZhuangBeiButton.style.height = buttonHeight;
document.body.appendChild(ZhuangBeiButton);
ZhuangBeiButton.addEventListener('click', ZhuangBei);

function ZhuangBei(){
    if(ZhuangBeiButton.innerText == '战斗装备')
    { console.log("切换战斗装备！");
     go('wield weapon_sb_sword10');       // 九天龙吟剑
     go('wear equip_moke_finger10');       // 斩龙戒指
     go('wear equip_moke_head10');       // 斩龙帽子
     go('wield weapon_sb_sword11');//11套剑
     go('wear equip_moke_finger11');//11套戒指
     go('wear equip_moke_head11');//11套帽子
     ZhuangBeiButton.innerText = '打坐装备';
    }
    else
    {console.log("切换打坐装备！");
     go('unwield weapon_sb_sword10');     // 脱九天龙吟剑
     go('unwield weapon_sb_sword11');       // 脱轩辕剑
     go('wear dream hat');       // 迷幻经纶
     go('wear langya_diaozhui');  //狼牙吊坠
     go('wield sword of windspring');       // 风泉
     go('wear longyuan banzhi moke');       // 龙渊
    ZhuangBeiButton.innerText = '战斗装备';
    }
}

//-------------------------分割线-----------

var SXQHButton = document.createElement('button');
SXQHButton.innerText = '脱衣服';
SXQHButton.style.position = 'absolute';
SXQHButton.style.left = '0px';
SXQHButton.style.top = '480px';
currentPos = currentPos + delta;
SXQHButton.style.width = buttonWidth+12;
SXQHButton.style.height = buttonHeight;
document.body.appendChild(SXQHButton);
SXQHButton.addEventListener('click', SXQH);


function SXQH(){
    if(SXQHButton.innerText == '脱衣服')
    { console.log("卸装备技能！");
     go('auto_equip off');
     go('enable unmap_all');
     
     SXQHButton.innerText = '穿衣服';
    }
    else
    {console.log("装装备技能！");
     go('auto_equip on');
     go('enable map_all');
     
    SXQHButton.innerText = '脱衣服';
    }
}

//-------------------------分割线-----------
// 领取礼包
var  yizhanglibaoFuncButton = document.createElement('button');
  yizhanglibaoFuncButton.innerText = '礼包';
  yizhanglibaoFuncButton.style.position = 'absolute';
  yizhanglibaoFuncButton.style.right = '0px';
yizhanglibaoFuncButton.style.top = '120px';
currentPos = currentPos + delta;
  yizhanglibaoFuncButton.style.width = buttonWidth+1;
  yizhanglibaoFuncButton.style.height = buttonHeight;
document.body.appendChild(  yizhanglibaoFuncButton);
  yizhanglibaoFuncButton.addEventListener('click',   yizhanglibaoFunc);
function yizhanglibaoFunc(){
    go('sort;sort fetch_reward;');//排行榜奖励
    go('shop money_buy shop1_N_10;home;');//买引路蜂10个
    go('exercise stop;exercise;');//打坐
    go("share_ok 1;share_ok 2;share_ok 3;share_ok 4;share_ok 5;share_ok 7；");//分享
    go('cangjian get_all;xueyin_shenbinggu blade get_all;xueyin_shenbinggu unarmed get_all;xueyin_shenbinggu throwing get_all;');//闯楼奖励
    go('jh 5;n;n;n;w;sign7;home;');//扬州签到
    go('jh 1;event_1_1820391;event_1_20991163;home;');//大雪礼包
    go('jh 1;e;n;e;e;event_1_44731074;event_1_8041045;event_1_8041045;home;');//消费积分和谜题卡
    go('jh 2;n;n;n;n;n;n;n;e;tzjh_lq;home;');//领取理财


  //  go('jh 5;n;n;e;event_1_54203203;home;');//元旦礼包
//go("jh 1;e;n;e;e;e;e;n;lq_bysf_lb;lq_lmyh_lb;home;");//比翼双飞和劳模英豪
}

// 一键签到vip--------------------------------------------------------
// 一键签到vip--------------------------------------------------------
var  qiandaovipButton = document.createElement('button');
  qiandaovipButton.innerText = '签到vip';
  qiandaovipButton.style.position = 'absolute';
  qiandaovipButton.style.right = '0px';
  qiandaovipButton.style.top = '150px';
currentPos = currentPos + delta;
  qiandaovipButton.style.width = buttonWidth+6;
  qiandaovipButton.style.height = buttonHeight;
document.body.appendChild(  qiandaovipButton);
  qiandaovipButton.addEventListener('click',   qiandaovip);
function qiandaovip(){

    go('jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;e;n;n;n;w;event_1_31320275;home');//采莲
    go('jh 26;w;w;n;e;e;event_1_18075497;home');//大招采矿
    go('jh 26;w;w;n;n;event_1_14435995;home');//大招破阵
    go("jh 37;n;e;e;nw;nw;w;n;e;n;e;e;e;ne;ne;ne;se;n;event_1_97487911;home");//绝情谷鳄鱼
    go('jh 35;nw;nw;nw;n;ne;nw;w;nw;e;e;e;e;e;se;n;n;w;n;w;event_1_53278632;sousuo;sousuo;home'); //冰火岛玄重铁
    go('vip drops');//领通勤
    go('vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;vip finish_family;');//师门25次
    go('vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;vip finish_clan;');//帮派任务20次
    go('vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;vip finish_big_task;');//10次暴击
    go('vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig;vip finish_dig');//挖宝10次
    go('vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu;vip finish_diaoyu');//钓鱼10次
    go('vip finish_fb dulongzhai;vip finish_fb dulongzhai;vip finish_fb junying;vip finish_fb junying;vip finish_fb beidou;vip finish_fb beidou;vip finish_fb youling;vip finish_fb youling');//副本扫荡 
}
//-------------------------分割线-----------
	//-------------------------------------------------------------------------------------------------
	// 领取奖励 ------------------------------------------------
//-------------------------分割线-----------

//-------------------------分割线-----------

//-------------------------分割线-----------
//杀孽龙-------------------------
var  nielongFuncButton = document.createElement('button');
  nielongFuncButton.innerText = '杀孽龙';
  nielongFuncButton.style.position = 'absolute';
  nielongFuncButton.style.right = '0px';
  nielongFuncButton.style.top = '390px';
currentPos = currentPos + delta;
  nielongFuncButton.style.width = buttonWidth+6;
  nielongFuncButton.style.height = buttonHeight;
document.body.appendChild(  nielongFuncButton);
  nielongFuncButton.addEventListener('click',   nielongFunc);

function nielongFunc(){
    go('jh 15;n;nw;w;nw;n;event_1_14401179;');     //杀孽龙
}

//-------------------------分割线-----------



//白驼军阵-------------------------
var pozhenFuncButton = document.createElement('button');
 pozhenFuncButton.innerText = '白驼军阵';
 pozhenFuncButton.style.position = 'absolute';
 pozhenFuncButton.style.right = '0px';
 pozhenFuncButton.style.top = '420px';
currentPos = currentPos + delta;
 pozhenFuncButton.style.width = buttonWidth+12;
 pozhenFuncButton.style.height = buttonHeight;
document.body.appendChild( pozhenFuncButton);
 pozhenFuncButton.addEventListener('click',  pozhenFunc);

function pozhenFunc(){
    go('jh 21;n;n;n;n;w;');     //白驼军阵
}
//-------------------------分割线-----------



//峨眉金狼-------------------------
var jinlangFuncButton = document.createElement('button');
jinlangFuncButton.innerText = '峨眉金狼';
jinlangFuncButton.style.position = 'absolute';
jinlangFuncButton.style.right = '0px';
jinlangFuncButton.style.top = '450px';
currentPos = currentPos + delta;
jinlangFuncButton.style.width = buttonWidth+12;
jinlangFuncButton.style.height = buttonHeight;
document.body.appendChild(jinlangFuncButton);
jinlangFuncButton.addEventListener('click', jinlangFunc);
function jinlangFunc(){
    
    go('jh 8;ne;e;e;e;n;');     //白驼军阵
}
//-------------------------分割线-----------

//冰月谷-------------------------
var bingyueFuncButton = document.createElement('button');
bingyueFuncButton.innerText = '冰月谷';
bingyueFuncButton.style.position = 'absolute';
bingyueFuncButton.style.right = '0px';
bingyueFuncButton.style.top = '480px';
currentPos = currentPos + delta;
bingyueFuncButton.style.width = buttonWidth+6;
bingyueFuncButton.style.height = buttonHeight;
document.body.appendChild(bingyueFuncButton);
bingyueFuncButton.addEventListener('click', bingyueFunc);


function bingyueFunc(){
    go('jh 14;w;n;n;n;n;event_1_32682066;');     //唐门冰月
}

//-------------------------分割线-----------


// 买千年灵芝-------------------------------------------
var buyMedecineFuncButton = document.createElement('button');
buyMedecineFuncButton.innerText = '买千年';
buyMedecineFuncButton.style.position = 'absolute';
buyMedecineFuncButton.style.left = '0px';
buyMedecineFuncButton.style.top = '30px';
currentPos = currentPos + delta;
buyMedecineFuncButton.style.width = buttonWidth+6;
buyMedecineFuncButton.style.height = buttonHeight;
document.body.appendChild(buyMedecineFuncButton);
buyMedecineFuncButton.addEventListener('click', buyMedecineFunc);

function buyMedecineFunc(){
    
    buy1MedecineFunc();
}
function  buy1MedecineFunc(){
    var num  = 0;
    if(!( num  = prompt("请输入购买数量，只能输入10的倍数：","10"))){
        return;
    }
    go('jh 1;e;n;n;n;w;');
    num  = parseInt(num/10);
    for(var i=0; i < num; i++) { // 从第一个开始循环
        go('buy /map/snow/obj/qiannianlingzhi_N_10 from snow_herbalist'); //买灵芝
    }
}
//-------------------------分割线-----------
//  ------------------------------------------------------------------------------------------------------


//-------------------------分割线-----------
// 打榜----------------------------
var  PaiHangFuncButton = document.createElement('button');
  PaiHangFuncButton.innerText = '打榜';
  PaiHangFuncButton.style.position = 'absolute';
  PaiHangFuncButton.style.left = '0px';
  PaiHangFuncButton.style.top =   '90px';
currentPos = currentPos + delta;
  PaiHangFuncButton.style.width = buttonWidth+1;
  PaiHangFuncButton.style.height = buttonHeight;
document.body.appendChild(  PaiHangFuncButton);
  PaiHangFuncButton.addEventListener('click',   PaiHangFunc);
function PaiHangFunc(){
    if(PaiHangFuncButton.innerText  == '打榜'){
        clickButton('sort');
        clickButton('fight_hero 1');
        AutoPaiHangFunc();
        PaiHangFuncButton.innerText  = '停止打榜';
    }
    else{clearPaiHang();
         PaiHangFuncButton.innerText  = '打榜';
        } 
}
function AutoPaiHangFunc(){
    // 间隔1500毫秒查找打一次
    AutoPaiHangFuncIntervalFunc = setInterval(AutoPaiHang,1500);
}
function clearPaiHang(){
    clearInterval(AutoPaiHangFuncIntervalFunc);
}
function AutoPaiHang(){
    if($('span.outbig_text:contains(战斗结束)').length>0){
        clickButton('prev_combat');
        clickButton('fight_hero 1');
    }
    else if( isContains($('span:contains(今日挑战)').text().slice(-19), '今日挑战高手的次数已达上限，明日再来。')){
        clearPaiHang();
        PaiHangFuncButton.innerText  = '打榜';
        clickButton('home');
        console.log('打完收工！');
    }
    else{
        ninesword();
    }
}
//-------------------------分割线-----------
// 试剑----------------------------
var  ShiJieFuncButton = document.createElement('button');
  ShiJieFuncButton.innerText = '试剑';
  ShiJieFuncButton.style.position = 'absolute';
  ShiJieFuncButton.style.left = '0px';
  ShiJieFuncButton.style.top =  '60px';
currentPos = currentPos + delta;
  ShiJieFuncButton.style.width = buttonWidth+1;
  ShiJieFuncButton.style.height = buttonHeight;
document.body.appendChild(  ShiJieFuncButton);
  ShiJieFuncButton.addEventListener('click',   ShiJieFunc);

function ShiJieFunc(){
    go('swords');
    go('swords select_member huashan_feng');   //风清扬
    go('swords select_member tangmen_madam');  //欧阳敏
    go('swords select_member btshan_ouyangfeng');   //老毒物
    go('swords fight_test go');
    setTimeout(Shijie1,1000);//code
}
function Shijie1(){
    if( isContains($('span:contains(你今天)').text().slice(-12), '你今天试剑次数已达限额。')){
        console.log('打完收工！');
    }
    else{go('swords fight_test go');
         ninesword();
         setTimeout(Shijie1,1000);//code
        }
}

//-------------------------分割线-----------
//进入跨服-------------------------

var JinKuaFuTargetButton = document.createElement('button');
JinKuaFuTargetButton.innerText = '进入跨服';
JinKuaFuTargetButton.style.position = 'absolute';
JinKuaFuTargetButton.style.left = '0px';
JinKuaFuTargetButton.style.top = '0px';
currentPos = currentPos + delta;
JinKuaFuTargetButton.style.width = buttonWidth + 12;
JinKuaFuTargetButton.style.height = buttonHeight;
document.body.appendChild(JinKuaFuTargetButton);
JinKuaFuTargetButton.addEventListener('click',JinKuaFuTargetFunc);

function JinKuaFuTargetFunc(){
    go('jh 1;e;n;n;n;n;w;event_1_36344468');
}


	//-------------------------------------------------------------------------------------------------
	// 帮副 ------------------------------------------------------------------------------------------------------


var killshenshouTargetButton = document.createElement('button');
killshenshouTargetButton.innerText = '帮副';
killshenshouTargetButton.style.position = 'absolute';
killshenshouTargetButton.style.left = '0px';
killshenshouTargetButton.style.top =  '240px';
currentPos = currentPos + delta;
killshenshouTargetButton.style.width = buttonWidth+1 ;
killshenshouTargetButton.style.height = buttonHeight;
document.body.appendChild(killshenshouTargetButton);
killshenshouTargetButton.addEventListener('click', killshenshouTargetFunc);

var shenshouNPCList =["守山神兽", "守谷神兽","年兽", "天剑", "天剑真身", ,"虹风", "虹雨","虹雷", "虹电","天剑谷卫士", "镇谷神兽", "镇山神兽","饕餮兽魂"];
var killshenshouIntervalFunc =  null;
var currentNPCIndex = 0;
function killshenshouTargetFunc(){
    zdskill =  null;
    if (killshenshouTargetButton.innerText == '帮副'){
        currentNPCIndex = 0;
        console.log("开始帮副目标NPC！");
        skillLists = mySkillLists;
        killshenshouTargetButton.innerText ='停止';
        killshenshouIntervalFunc = setInterval(killshenshou, 500);
        
    }else{
        console.log("停止帮副目标NPC！");
        killshenshouTargetButton.innerText ='帮副';
        clearInterval(killshenshouIntervalFunc);
    }
}

function killshenshou(){
//	  clickButton('go east');
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
//        return;
    }
    getshenshouTargetCode();
    setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getshenshouTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (shenshouNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;

        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillshenshouInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillshenshouInfo(){
    var shenshouInfo = $('span').text();
    if (shenshouInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}



// 正气 ------------------------------------------------------------------------------------------------------

var killHongMingTargetButton = document.createElement('button');
killHongMingTargetButton.innerText = '正气';
killHongMingTargetButton.style.position = 'absolute';
killHongMingTargetButton.style.left = '0px';
killHongMingTargetButton.style.top = '270px';
currentPos = currentPos + delta;
killHongMingTargetButton.style.width = buttonWidth+1;
killHongMingTargetButton.style.height = buttonHeight;
document.body.appendChild(killHongMingTargetButton);
killHongMingTargetButton.addEventListener('click', killHongMingTargetFunc);
var HongMingNPCList =["[1-5区]恶棍", "[1-5区]流寇", "[1-5区]云老四", "[1-5区]岳老三", "[1-5区]二娘","[1-5区]段老大", "[1-5区]墟归一","[1-5区]上官晓芙","[1-5区]洪昭天","恶棍", "流寇", "云老四", "岳老三", "二娘","段老大","剧盗"];
var killHongMingIntervalFunc =  null;
var currentNPCIndex = 0;
function killHongMingTargetFunc(){
    zdskill =  null;
    if (killHongMingTargetButton.innerText == '正气'){
        currentNPCIndex = 0;
        console.log("开始正气目标NPC！");
        skillLists = mySkillLists;
        killHongMingTargetButton.innerText ='停止';
        killHongMingIntervalFunc = setInterval(killHongMing, 500);
        
    }else{
        console.log("停止正气目标NPC！");
        killHongMingTargetButton.innerText ='正气';
        clearInterval(killHongMingIntervalFunc);
    }
}

function killHongMing(){
//	  clickButton('go east');
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
//        return;
    }
    getHongMingTargetCode();
    setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getHongMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HongMingNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHongMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHongMingInfo(){
    var HongMingInfo = $('span').text();
    if (HongMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

// 邪气 ------------------------------------------------------------------------------------------------------

var killHuangMingTargetButton = document.createElement('button');
killHuangMingTargetButton.innerText = '邪气';
killHuangMingTargetButton.style.position = 'absolute';
killHuangMingTargetButton.style.left = '0px';
killHuangMingTargetButton.style.top =  '300px';
currentPos = currentPos + delta;
killHuangMingTargetButton.style.width = buttonWidth+1;
killHuangMingTargetButton.style.height = buttonHeight;
document.body.appendChild(killHuangMingTargetButton);
killHuangMingTargetButton.addEventListener('click', killHuangMingTargetFunc);

var HuangMingNPCList = ["[1-5区]王铁匠", "[1-5区]杨掌柜","[1-5区]无一","[1-5区]铁二","[1-5区]追三","[1-5区]冷四","[1-5区]柳绘心", "[1-5区]柳小花", "[1-5区]朱老伯","[1-5区]方老板", "[1-5区]客商","[1-5区]方寡妇","[1-5区]花落云", "[1-5区]辰川","[1-5区]王世仲","王铁匠", "杨掌柜", "柳绘心", "柳小花", "朱老伯","方老板", "客商","方寡妇","卖花姑娘","刘守财"];
var killHuangMingIntervalFunc =  null;
var currentNPCIndex = 0;
function killHuangMingTargetFunc(){
    zdskill =  null;
    if (killHuangMingTargetButton.innerText == '邪气'){
        currentNPCIndex = 0;
        console.log("开始邪气目标NPC！");
        skillLists = mySkillLists;
        killHuangMingTargetButton.innerText ='停止';
        killHuangMingIntervalFunc = setInterval(killHuangMing, 500);
        
    }else{
        console.log("停止邪气目标NPC！");
        killHuangMingTargetButton.innerText ='邪气';
        clearInterval(killHuangMingIntervalFunc);
    }
}

function killHuangMing(){
//	  clickButton('go east');
    if ($('span').text().slice(-7) == "不能杀这个人。"){
        currentNPCIndex = currentNPCIndex + 1;
        console.log("不能杀这个人！");
//        return;
    }
    getHuangMingTargetCode();
    setTimeout(ninesword, 200);
    if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
        currentNPCIndex = 0;
        console.log('杀人一次！');
        clickButton('prev_combat');
    }
}
function getHuangMingTargetCode(){
    var peopleList = $(".cmd_click3");
    var thisonclick = null;
    var targetNPCListHere = [];
    var countor= 0;
    for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
        // 打印 NPC 名字，button 名，相应的NPC名
        thisonclick = peopleList[i].getAttribute('onclick');
        if (HuangMingNPCList.contains(peopleList[i].innerText)){
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
            targetNPCListHere[countor] = peopleList[i];
            countor = countor +1;
        }
    }
    // targetNPCListHere 是当前场景所有满足要求的NPC button数组
    if (currentNPCIndex >= targetNPCListHere.length){
        currentNPCIndex = 0;
    }
    if (targetNPCListHere.length > 0){
        thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
        var targetCode = thisonclick.split("'")[1].split(" ")[1];
        console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
        clickButton('kill ' + targetCode); // 点击杀人
        setTimeout(detectKillHuangMingInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
    }
}
function detectKillHuangMingInfo(){
    var HuangMingInfo = $('span').text();
    if (HuangMingInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
        currentNPCIndex = currentNPCIndex + 1;
    }else{
        currentNPCIndex = 0;
    }
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
//  ------------------------------------------------------------------------------------------------------
//  ------------------------------------------------------------------------------------------------------
var libaoSBButton = document.createElement('button');
libaoSBButton.innerText = '礼包识别';
libaoSBButton.style.position = 'absolute';
libaoSBButton.style.left = '0px';
libaoSBButton.style.top = '360px';
currentPos = currentPos + delta;
libaoSBButton.style.width = buttonWidth+12;
libaoSBButton.style.height = buttonHeight;
document.body.appendChild(libaoSBButton);
libaoSBButton.addEventListener('click', libaoSBFunc);
    function libaoSBFunc(){
    clickButton('jh 1');        // 进入章节
    setTimeout(function(){
    getNewLibao();
        },1000)
    }
    // 领取礼包
    function getNewLibao(){
        clickButton('look_npc snow_mercenary');
        setTimeout(function(){
            clickLibaoBtn();
        },1000);
    }
    // 判断是什么礼包
    function clickLibaoBtn(){
        var LiBaoName = ['兑换礼包','1元礼包'];
        var btn = $('.cmd_click2');
        btn.each(function(){
            var txt = $(this).text();
            if(txt.indexOf('礼包') != '-1'){
                if($.inArray(txt, LiBaoName) == -1){
                    var clickText = $(this).attr('onclick'); // clickButton('event_1_41502934', 1)
                    var clickAction = getLibaoId(clickText);
                    triggerClick(clickAction);
                    alert(clickText);
                }
            }
        })
        setTimeout(function(){
            clickButton('home');
        },6000)
    }
    // 获取礼包方法的名称
    function getLibaoId(text){
        var arr = text.split(',');
        var newArr = arr[0].split('(');
        var nowArr = newArr[1].split("'");
        return nowArr[1];
    }
    // 触发领方法
    function triggerClick(name){
        clickButton(name);
        
    }
 

//------------------------------------------------------------------------------------------------------
	
	
	
	
	
	
	
	
	
	
	
	
	var killerButton = document.createElement('button');
	killerButton.innerText = '杀人魔称号';
	killerButton.style.position = 'absolute';
	killerButton.style.left = '0px';
	killerButton.style.top = '390px';
	currentPos = currentPos + delta;
	killerButton.style.width = buttonWidth+24;
	killerButton.style.height = buttonHeight;
	document.body.appendChild(killerButton);
	killerButton.addEventListener('click', killerFunc);
	var killerTrigger=0;
	var killorkilled=0;
	var killedid="";
	function killerFunc(){
		var num;
		if (killerTrigger==0){
			if(!( num  = prompt("请问你是杀人者还是祭品？（1杀人者，2祭品，3毛毛）：","1"))){ // 支持 引路蜂，鱼竿，鱼饵
				return;
			}
			num  = parseInt(num); // 支持 引路蜂，鱼竿，鱼饵
			if (num==1){
				killorkilled=1;
				killer();
			}else if (num==2){
				killorkilled=2;
				bekilled();
			}else if (num==3){
				alert("毛毛最可爱了~喵~");
			}else{
				alert("没有这个选项， 快滚！再乱输入老子打死你！");
			}
			if (num!=0){
				killerTrigger=1;
				killerButton.innerText = '停止杀人魔';
				selfprotection();
			}
		}else{
			killerTrigger=0;
			killerButton.innerText = '杀人魔称号';
		}

	}
	function killer(){
		overrideclick("jh 3");
		overrideclick("go west");
		overrideclick("event_1_59520311");
		overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");
		killwatch();
	}
	function killwatch(){
		var room=g_obj_map.get("msg_room");
		if (room==undefined){
			setTimeout(killwatch,200);
		}else{
			var npc=room.get("npc1");
			if (npc==undefined){
				setTimeout(killwatch,200);
			}else{
				overrideclick("watch_vs huashancun_huashancun_fb4");
			}
		}
	}
	function bekilled(){
		overrideclick("jh 3");
		overrideclick("go west");
		overrideclick("event_1_59520311");
		overrideclick("go north");overrideclick("go north");overrideclick("go north");overrideclick("go north");
		overrideclick("kill huashancun_huashancun_fb4");
	}
	function selfprotection(){
		if (killerTrigger==1&&killedid==""){
			setTimeout(selfprotection,200);
		}else if(killerTrigger==1&&killedid!=""){
			clickButton("fight "+killedid,0);
			setTimeout(selfprotection,3000);
		}
	}
	function autoGodview(){
		if (g_obj_map.get("msg_attrs")==undefined){
			setTimeout(autoGodview,500);
		}else{
			GodMode=1;
			GodButton.innerText = '停止强化';
		}
	}

	function killingstart(){
		this.dispatchMessage=function(b){
			var type = b.get("type"), subType = b.get("subtype");
			if (type=="vs"&&killorkilled==1&&killedid==""){//我还不知道对手是谁
				var combat_info=g_obj_map.get("msg_vs_info");
				if (combat_info!=undefined){
					if (combat_info.get("vs1_pos1")=="huashancun_huashancun_fb4"){
						killedid=combat_info.get("vs2_pos1");
					}else{
						killedid=combat_info.get("vs1_pos1");
					}
					overrideclick("fight "+killedid);
					overrideclick("playskill 1");
				}
			}else if(type=="vs"&&subType=="combat_result"){
				if (killorkilled==2){//被杀者
					overrideclick("kill huashancun_huashancun_fb4");
				}else{
					overrideclick("fight "+killedid);
					overrideclick("playskill 1");
				}
			}

		}
	}
	var killing=new killingstart;
	(function (window) {
		window.go = function(dir) {
			console.debug("开始执行：", dir);
			var d = dir.split(";");
			for (var i = 0; i < d.length; i++)
				overrideclick(d[i], 0);
		};


		var ql_w = {
			'书房': 1,
			'打铁铺子': 2,
			'桑邻药铺': 3,
			'南市': 4,
			'桃花别院': 5,
			'绣楼': 6,
			'北大街': 7,
			'钱庄': 8,
			'杂货铺': 9,
			'祠堂大门': 10,
			'厅堂': 11
		};
		window.go_ql = function(w) {
			zx(ql_w[w]);
		}
	buttonhideFunc();
	autoGodview();
		function go_yx(w){
			if (w.startsWith("雪亭镇")) {
				go("jh 1;e;n");
			} else if (w.startsWith("洛阳")) {
				go("jh 2;n;n");
			} else if (w.startsWith("华山村")) {
				go("jh 3;s;s");
			} else if (w.startsWith("华山")) {
				go("jh 4;n;n");
			} else if (w.startsWith("扬州")) {
				go("jh 5;n;n");
			} else if (w.startsWith("丐帮")) {
				go("jh 6;event_1_98623439;s");
			} else if (w.startsWith("乔阴县")) {
				go("jh 7;s;s;s");
			} else if (w.startsWith("峨眉山")) {
				go("jh 8;w;nw;n;n;n;n");
			} else if (w.startsWith("恒山")) {
				go("jh 9;n;n;n");
			} else if (w.startsWith("武当山")) {
				go("jh 10;w;n;n");
			} else if (w.startsWith("晚月庄")) {
				go("jh 11;e;e;s;sw;se;w");
			} else if (w.startsWith("水烟阁")) {
				go("jh 12;n;n;n");
			} else if (w.startsWith("少林寺")) {
				go("jh 13;n;n");
			} else if (w.startsWith("唐门")) {
				go("jh 14;w;n;n;n");
			} else if (w.startsWith("青城山")) {
				go("jh 15;s;s");
			} else if (w.startsWith("逍遥林")) {
				go("jh 16;s;s");
			} else if (w.startsWith("开封")) {
				go("jh 17;n;n");
			} else if (w.startsWith("明教")) {
				go("jh 18;n;nw;n;n");
			} else if (w.startsWith("全真教")) {
				go("jh 19;s;s");
			} else if (w.startsWith("古墓")) {
				go("jh 20;w;w");
			} else if (w.startsWith("白驮山")) {
				go("jh 21;nw;w");
			} else if (w.startsWith("嵩山")) {
				go("jh 22;n;n");
			} else if (w.startsWith("寒梅庄")) {
				go("jh 23");
			} else if (w.startsWith("泰山")) {
				go("jh 24");
			} else if (w.startsWith("大旗门")) {
				go("jh 25");
			} else if (w.startsWith("大昭寺")) {
				go("jh 26");
			} else if (w.startsWith("魔教")) {
				go("jh 27");
			}

			random_move();
		}

		function random_move() {
			var v = Math.random();
			if (v < 0.25) go("e")
			else if (v < 0.5) go("w")
			else if (v < 0.75) go("s")
			else go("n");
		}

		function zx(x) {
			x = parseInt(x);
			console.debug(x);

			if (x == 1) {
				go("jh 1;e;n;e;e;e;e;n");
			} else if (x == 2) {
				go("jh 1;e;n;n;w");
			} else if (x == 3) {
				go("jh 1;e;n;n;n;w");
			}

			if (x == 4) {
				go("jh 2;n;n;e")
			}

			if (x == 5) {
				go("jh 2;n;n;n;n;w;s");
			}
			if (x == 6) {
				go("jh 2;n;n;n;n;w;s;w");
			}
			if (x == 7) {
				go("jh 2;n;n;n;n;n;n;n");
			}
			if (x == 8) {
				go("jh 2;n;n;n;n;n;n;;n;e");
			}

			if (x == 9) {
				go("jh 3;s;s;e");
			}
			if (x == 10) {
				go("jh 3;s;s;w");
			}
			if (x == 11) {
				go("jh 3;s;s;w;n");
			}

		}


	function MyMap(){
		this.elements = [];
		this.size = function() {
			return this.elements.length
		};
		this.isEmpty = function() {
			return 1 > this.elements.length
		};
		this.clear = function() {
			this.elements = []
		};
		this.put = function(a, b) {
			for (var c = !1, d = 0; d < this.elements.length; d++)
				if (this.elements[d].key == a) {
					c = !0;
					this.elements[d].value = b;
					break
				}
			!1 == c && this.elements.push({
				key: a,
				value: b
			})
		};
		this.remove = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].key == a)
						return this.elements.splice(c, 1), !0
			} catch (d) {
				b =
				!1
			}
			return b
		};
		this.get = function(a) {
			try {
				for (var b = 0; b < this.elements.length; b++)
					if (this.elements[b].key == a)
						return this.elements[b].value
			} catch (c) {
				return null
			}
		};
		this.copy = function(a) {
			null == a && (a = new Map);
			try {
				for (var b = 0; b < this.elements.length; b++)
					a.put(this.elements[b].key, this.elements[b].value);
				return a
			} catch (c) {
				return null
			}
		};
		this.element = function(a) {
			return 0 > a || a >= this.elements.length ? null : this.elements[a]
		};
		this.containsKey = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].key ==
					a) {
						b = !0;
						break
					}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.containsValue = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++)
					if (this.elements[c].value == a) {
						b = !0;
						break
					}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.values = function() {
			for (var a = [], b = 0; b < this.elements.length; b++)
				a.push(this.elements[b].value);
			return a
		};
		this.keys = function() {
			for (var a = [], b = 0; b < this.elements.length; b++)
				a.push(this.elements[b].key);
			return a
		}
	}

	function Question() {
			this.answers = new MyMap;
			this.answers.put("锦缎腰带是腰带类的第几级装备", "a");
			this.answers.put("扬州询问黑狗子能到下面哪个地点", "a");
			this.answers.put("跨服天剑谷每周六几点开启", "a");
			this.answers.put("青城派的道德经可以提升哪个属性", "c");
			this.answers.put("论剑中以下哪个不是晚月庄的技能", "d");
			this.answers.put("跨服天剑谷是星期几举行的", "b");
			this.answers.put("玉女剑法是哪个门派的技能", "b");
			this.answers.put("玉草帽可以在哪位npc那里获得？", "b");
			this.answers.put("逍遥林是第几章的地图", "c");
			this.answers.put("精铁棒可以在哪位npc那里获得", "d");
			this.answers.put("鎏金缦罗是披风类的第几级装备", "d");
			this.answers.put("神雕大侠在哪一章", "a");
			this.answers.put("华山武器库从哪个NPC进", "d");
			this.answers.put("首冲重置卡需要隔多少天才能在每日充值奖励中领取", "b");
			this.answers.put("以下哪个不是空空儿教导的武学", "b");
			this.answers.put('“迎梅客栈”场景是在哪个地图上', "d");
			this.answers.put('独孤求败有过几把剑', "d");
			this.answers.put('晚月庄的小贩在下面哪个地点', "a");
			this.answers.put('扬州询问黑狗能到下面哪个地点', "a");
			this.answers.put('“清音居”场景是在哪个地图上', "a");
			this.answers.put('一天能完成师门任务有多少个', "c");
			this.answers.put('林祖师是哪个门派的师傅', "a");
			this.answers.put('九区服务器名称', "d");
			this.answers.put('去唐门地下通道要找谁拿钥匙', "a");
			this.answers.put('能增容貌的是下面哪个技能', "a");
			this.answers.put('铁手镯  可以在哪位npc那里获得', "a");
			this.answers.put('街头卖艺是挂机里的第几个任务', "a");
			this.answers.put('“三清宫”场景是在哪个地图上', "c");
			this.answers.put('论剑中以下哪个是大理段家的技能', "a");
			this.answers.put('藏宝图在哪里npc那里买', "a");
			this.answers.put('六脉神剑是哪个门派的绝学', "a");
			this.answers.put('如何将华山剑法从400级提升到440级', "d");
			this.answers.put('王重阳是哪个门派的师傅', "b");
			this.answers.put('在庙祝处洗杀气每次可以消除多少点', "a");
			this.answers.put('以下哪个宝石不能镶嵌到衣服', "a");
			this.answers.put('达摩杖的伤害是多少', "d");
			this.answers.put('嫁衣神功是哪个门派的技能', "b");
			this.answers.put('可以召唤金甲伏兵助战是哪个门派', "a");
			this.answers.put('端茶递水是挂机里的第几个任务', "b");
			this.answers.put('下列哪项战斗不能多个玩家一起战斗', "a");
			this.answers.put('寒玉床在哪里切割', "a");
			this.answers.put('拜师风老前辈需要正气多少', "b");
			this.answers.put('每天微信分享能获得多少元宝', "d");

			this.answers.put('丐帮的绝学是什么', "a");
			this.answers.put('以下哪个门派不是隐藏门派', "c");
			this.answers.put('玩家想修改名字可以寻找哪个NPC', "a");
			this.answers.put('论剑中以下哪个不是古墓派的的技能', "b");
			this.answers.put('安惜迩是在那个场景', "c");
			this.answers.put('神雕侠侣的时代背景是哪个朝代', "d");
			this.answers.put('论剑中以下哪个是华山派的技能的', "a");
			this.answers.put('夜皇在大旗门哪个场景', "c");
			this.answers.put('什么装备可以镶嵌紫水晶', "c");
			this.answers.put('乌檀木刀可以在哪位npc那里获得', "d");
			this.answers.put('易容后保持时间是多久', "a");
			this.answers.put('以下哪个不是宋首侠教导的武学', "d");
			this.answers.put('踏云棍可以在哪位npc那里获得', "a");
			this.answers.put('玉女剑法是哪个门派的技能', "b");
			this.answers.put('根骨能提升哪个属性', "c");
			this.answers.put('论剑中以下哪个是铁血大旗门的技能', "b");
			this.answers.put('明教的九阳神功有哪个特殊效果', "a");
			this.answers.put('辟邪剑法在哪学习', "b");
			this.answers.put('论剑中古墓派的终极师傅是谁', "d");
			this.answers.put('论剑中青城派的终极师傅是谁', "d");
			this.answers.put('逍遥林怎么弹琴可以见到天山姥姥', "b");
			this.answers.put('论剑一次最多能突破几个技能', "c");
			this.answers.put('劈雳拳套有几个镶孔', "a");
			this.answers.put('仓库最多可以容纳多少种物品', "b");
			this.answers.put('以下不是天宿派师傅的是哪个', "c");
			this.answers.put('易容术在哪学习', "b");
			this.answers.put('瑷伦在晚月庄的哪个场景', "b");
			this.answers.put('羊毛斗篷是披风类的第几级装备', "a");
			this.answers.put('弯月刀可以在哪位npc那里获得', "b");
			this.answers.put('骆云舟在乔阴县的哪个场景', "b");
			this.answers.put('屠龙刀是什么级别的武器', "a");
			this.answers.put('天蚕围腰可以镶嵌几颗宝石', "d");
			this.answers.put('“蓉香榭”场景是在哪个地图上', "c");
			this.answers.put('施令威在哪个地图', "b");
			this.answers.put('扬州在下面哪个地点的npc处可以获得玉佩', "c");
			this.answers.put('拜师铁翼需要多少内力', "b");
			this.answers.put('九区服务器名称', "d");
			this.answers.put('"白玉牌楼"场景是在哪个地图上', "c");
			this.answers.put('宝玉鞋在哪获得', "a");
			this.answers.put('落英神剑掌是哪个门派的技能', "b");
			this.answers.put('下面哪个门派是正派', "a");
			this.answers.put('兑换易容面具需要多少玄铁碎片', "c");
			this.answers.put('以下哪些物品是成长计划第五天可以领取的', "b");
			this.answers.put('论剑中以下哪个是晚月庄的人物', "a");
			this.answers.put('论剑中以下哪个不是魔教的技能', "a");
			this.answers.put('匕首加什么属性', "c");
			this.answers.put('钢丝甲衣可以在哪位npc那里获得', "d");
			this.answers.put('论剑中花紫会的师傅是谁', "c");
			this.answers.put('暴雨梨花针的伤害是多少', "c");
			this.answers.put('吸血蝙蝠在下面哪个地图', "a");
			this.answers.put('论剑中以下是峨嵋派技能的是哪个', "a");
			this.answers.put('蓝止萍在晚月庄哪个小地图', "b");
			this.answers.put('下面哪个地点不是乔阴县的', "d");
			this.answers.put('领取消费积分需要寻找哪个NPC', "c");
			this.answers.put('下面哪个不是门派绝学', "d");
			this.answers.put('人物背包最多可以容纳多少种物品', "a");
			this.answers.put('什么装备不能镶嵌黄水晶', "d");
			this.answers.put('古灯大师在大理哪个场景', "c");
			this.answers.put('草帽可以在哪位npc那里获得', "b");
			this.answers.put('西毒蛇杖的伤害是多少', "c");
			this.answers.put('成长计划六天可以领取多少银两', "d");
			this.answers.put('朱老伯在华山村哪个小地图', "b");
			this.answers.put('论剑中以下哪个是唐门的技能', "b");
			this.answers.put('游龙散花是哪个门派的阵法', "d");
			this.answers.put('高级乾坤再造丹加什么', "b");
			this.answers.put('唐门的唐门毒经有哪个特殊效果', "a");
			this.answers.put('葛伦在大招寺的哪个场景', "b");
			this.answers.put('“三清殿”场景是在哪个地图上', "b");
			this.answers.put('哪样不能获得玄铁碎片', "c");
			this.answers.put('在哪里捏脸提升容貌', "d");
			this.answers.put('论剑中以下哪个是天邪派的技能', "b");
			this.answers.put('向师傅磕头可以获得什么', "b");
			this.answers.put('骆云舟在哪一章', "c");
			this.answers.put('论剑中以下哪个不是唐门的技能', "c");
			this.answers.put('华山村王老二掉落的物品是什么', "a");
			this.answers.put('下面有什么是寻宝不能获得的', "c");
			this.answers.put('寒玉床需要切割多少次', "d");
			this.answers.put('绿宝石加什么属性', "c");
			this.answers.put('魏无极处读书可以读到多少级', "a");
			this.answers.put('天山姥姥在逍遥林的哪个场景', "d");
			this.answers.put('天羽奇剑是哪个门派的技能', "a");
			this.answers.put('大招寺的铁布衫有哪个特殊效果', "c");
			this.answers.put('挖剑冢可得什么', "a");
			this.answers.put('灭绝师太在峨眉山哪个场景', "a");
			this.answers.put('论剑是星期几举行的', "c");
			this.answers.put('柳淳风在雪亭镇哪个场景', "b");
			this.answers.put('萧辟尘在哪一章', "d");
			this.answers.put('论剑中以下哪个是明教的技能', "b");
			this.answers.put('天邪派在哪里拜师', "b");
			this.answers.put('钨金腰带是腰带类的第几级装备', "d");
			this.answers.put('灭绝师太在第几章', "c");
			this.answers.put('一指弹在哪里领悟', "b");
			this.answers.put('翻译梵文一次多少银两', "d");
			this.answers.put('刀法基础在哪掉落', "a");
			this.answers.put('黯然消魂掌有多少招式', "c");
			this.answers.put('黑狗血在哪获得', "b");
			this.answers.put('雪蕊儿在铁雪山庄的哪个场景', "d");
			this.answers.put('东方教主在魔教的哪个场景', "b");
			this.answers.put('以下属于正派的门派是哪个', "a");
			this.answers.put('选择武学世家会影响哪个属性', "a");
			this.answers.put('寒玉床睡觉一次多久', "c");
			this.answers.put('魏无极在第几章', "a");
			this.answers.put('孙天灭是哪个门派的师傅', "c");
			this.answers.put('易容术在哪里学习', "a");
			this.answers.put('哪个NPC掉落拆招基础', "a");
			this.answers.put('七星剑法是哪个门派的绝学', "a");
			this.answers.put('以下哪些物品不是成长计划第二天可以领取的', "c");
			this.answers.put('以下哪个门派是中立门派', "a");
			this.answers.put('黄袍老道是哪个门派的师傅', "c");
			this.answers.put('舞中之武是哪个门派的阵法', "b");
			this.answers.put('隐者之术是那个门派的阵法', "a");
			this.answers.put('踏雪无痕是哪个门派的技能', "b");
			this.answers.put('以下哪个不是在雪亭镇场景', "d");
			this.answers.put('排行榜最多可以显示多少名玩家', "a");
			this.answers.put('貂皮斗篷是披风类的第几级装备', "b");
			this.answers.put('武当派的绝学技能是以下哪个', "d");
			this.answers.put('兰花拂穴手是哪个门派的技能', "a");
			this.answers.put('油流麻香手是哪个门派的技能', "a");
	//        this.answers.put('清风寨在哪', "b");
			this.answers.put('披星戴月是披风类的第几级装备', "d");
			this.answers.put('当日最低累积充值多少元即可获得返利', "b");
			this.answers.put('追风棍在哪里获得', "b");
			this.answers.put('长剑在哪里可以购买', "a");
			this.answers.put('莫不收在哪一章', "a");
			this.answers.put('读书写字最高可以到多少级', "b");
			this.answers.put('哪个门派拜师没有性别要求', "d");
			this.answers.put('墨磷腰带是腰带类的第几级装备', "d");
			this.answers.put('不属于白驼山的技能是什么', "b");
			this.answers.put('婆萝蜜多心经是哪个门派的技能', "b");
			this.answers.put('乾坤一阳指是哪个师傅教的', "a");
			this.answers.put('“日月洞”场景是在哪个地图上', "b");
			this.answers.put('倚天屠龙记的时代背景哪个朝代', "a");
			this.answers.put('八卦迷阵是哪个门派的阵法', "b");
			this.answers.put('七宝天岚舞是哪个门派的技能', "d");
			this.answers.put('断云斧是哪个门派的技能', "a");
			this.answers.put('跨服需要多少级才能进入', "c");
			this.answers.put('易容面具需要多少玄铁兑换', "c");
			this.answers.put('张教主在明教哪个场景', "d");
			this.answers.put('玉蜂浆在哪个地图获得', "a");
			this.answers.put('在逍遥派能学到的技能是哪个', "a");
			this.answers.put('每日微信分享可以获得什么奖励', "a");
			this.answers.put('红宝石加什么属性', "b");
			this.answers.put('金玉断云是哪个门派的阵法', "a");
			this.answers.put('正邪任务一天能做几次', "a");
			this.answers.put('白金戒指可以在哪位npc那里获得', "b");
			this.answers.put('金戒指可以在哪位npc那里获得', "d");
			this.answers.put('柳淳风在哪哪一章', "c");
			this.answers.put('论剑是什么时间点正式开始', "a");
			this.answers.put('黯然销魂掌是哪个门派的技能', "a");
			this.answers.put('在正邪任务中不能获得下面什么奖励', "d");
			this.answers.put('孤儿出身增加什么', "d");
			this.answers.put('丁老怪在星宿海的哪个场景', "b");
			this.answers.put('读书写字301-400级在哪里买书', "c");
			this.answers.put('闯楼第几层可以获得称号“藏剑楼长老”', "c");
			this.answers.put('以下属于邪派的门派是哪个', "b");
			this.answers.put('论剑中以下哪个不是丐帮的人物', "a");
			this.answers.put('论剑中青城派的第一个师傅是谁', "a");
			this.answers.put('以下哪个不是何不净教导的武学', "c");
			this.answers.put('吕进在哪个地图', "a");
			this.answers.put('拜师老毒物需要蛤蟆功多少级', "a");
			this.answers.put('蛇形刁手是哪个门派的技能', "b");
			this.answers.put('乌金玄火鞭的伤害是多少', "d");
			this.answers.put('张松溪在哪个地图', "c");
			this.answers.put('欧阳敏是哪个门派的', "b");
			this.answers.put('以下哪个门派是正派', "d");
			this.answers.put('成功易容成异性几次可以领取易容成就奖', "b");
			this.answers.put('论剑中以下不是峨嵋派技能的是哪个', "b");
			this.answers.put('城里抓贼是挂机里的第几个任务', "b");
			this.answers.put('每天的任务次数几点重置', "d");
			this.answers.put('莲花掌是哪个门派的技能', "a");
			this.answers.put('大招寺的金刚不坏功有哪个特殊效果', "a");
			this.answers.put('多少消费积分可以换取黄金钥匙', "b");
			this.answers.put('什么装备都能镶嵌的是什么宝石', "c");
			this.answers.put('什么影响打坐的速度', "c");
			this.answers.put('蓝止萍在哪一章', "c");
			this.answers.put('寒玉床睡觉修炼需要多少点内力值', "c");
			this.answers.put('武穆兵法通过什么学习', "a");
			this.answers.put('倒乱七星步法是哪个门派的技能', "d");
			this.answers.put('闯楼第几层可以获得称号“藏剑楼护法”', "b");
			this.answers.put('兽皮鞋可以在哪位npc那里获得', "b");
			this.answers.put('寒玉床在那个地图可以找到', "a");
			this.answers.put('易容术可以找哪位NPC学习', "b");
			this.answers.put('铁戒指可以在哪位npc那里获得', "a");
			this.answers.put('通灵需要寻找哪个NPC', "c");
			this.answers.put('功德箱在雪亭镇的哪个场景', "c");
			this.answers.put('蓝宝石加什么属性', "a");
			this.answers.put('每天分享游戏到哪里可以获得20元宝', "a");
			this.answers.put('选择书香门第会影响哪个属性', "b");
			this.answers.put('以下哪个不是微信分享好友、朋友圈、QQ空间的奖励', "a");
			this.answers.put('新手礼包在哪领取', "c");

			this.answers.put('春风快意刀是哪个门派的技能', "b");
			this.answers.put('朱姑娘是哪个门派的师傅', "a");
			this.answers.put('出生选武学世家增加什么', "a");
			this.answers.put('以下哪个宝石不能镶嵌到内甲', "a");
			this.answers.put('生死符的伤害是多少', "a");
			this.answers.put('扬文的属性', "a");
			this.answers.put('云问天在哪一章', "a");
			this.answers.put('首次通过桥阴县不可以获得那种奖励', "a");
			this.answers.put('剑冢在哪个地图', "a");
			this.answers.put('在哪里消杀气', "a");
			this.answers.put('闯楼每多少层有称号奖励', "a");
			this.answers.put('打坐增长什么属性', "a");
			this.answers.put('从哪个npc处进入跨服战场', "a");
			this.answers.put('下面哪个是天邪派的师傅', "a");
			this.answers.put('每天能做多少个谜题任务', "a");
			this.answers.put('小男孩在华山村哪里', "a");
			this.answers.put('追风棍可以在哪位npc那里获得', "a");
			this.answers.put('逍遥派的绝学技能是以下哪个', "a");
			this.answers.put('沧海护腰是腰带类的第几级装备', "a");
			this.answers.put('花花公子在哪个地图', "a");
			this.answers.put('每次合成宝石需要多少银两', "a");
			this.answers.put('以下哪个不是微信分享好友、朋友圈、QQ空间的奖励', "a");
			this.answers.put('打排行榜每天可以完成多少次', "a");
			this.answers.put('夜行披风是披风类的第几级装备', "a");
			this.answers.put('白蟒鞭的伤害是多少', "a");
			this.answers.put('易容术向谁学习', "a");
			this.answers.put('支线对话书生上魁星阁二楼杀死哪个NPC给10元宝', "a");
			this.answers.put('斗转星移是哪个门派的技能', "a");
			this.answers.put('杨过在哪个地图', "a");
			this.answers.put('钻石项链在哪获得', "a");
			this.answers.put('多少消费积分换取黄金宝箱', "a");
			this.answers.put('每突破一次技能有效系数加多少', "a");
			this.answers.put('茅山学习什么技能招宝宝', "a");
			this.answers.put('陆得财在乔阴县的哪个场景', "a");
			this.answers.put('独龙寨是第几个组队副本', "a");
			this.answers.put('以下哪个是花紫会的祖师', "a");
			this.answers.put('金弹子的伤害是多少', "a");
			this.answers.put('明月帽要多少刻刀摩刻', "a");
			this.answers.put('论剑输一场获得多少论剑积分', "a");
			this.answers.put('论剑中以下哪个是铁血大旗门的师傅', "a");
			this.answers.put('8级的装备摹刻需要几把刻刀', "a");
			this.answers.put('赠送李铁嘴银两能够增加什么', "a");
			this.answers.put('金刚不坏功有什么效果', "a");
			this.answers.put('少林的易筋经神功有哪个特殊效果', "a");
			this.answers.put('大旗门的修养术有哪个特殊效果', "a");
			this.answers.put('金刚杖的伤害是多少', "a");
			this.answers.put('双儿在扬州的哪个小地图', "a");
			this.answers.put('花不为在哪一章', "a");
			this.answers.put('铁项链可以在哪位npc那里获得', "a");
			this.answers.put('武学世家加的什么初始属性', "a");
			this.answers.put('师门磕头增加什么', "a");
			this.answers.put('全真的道家心法有哪个特殊效果', "a");
			this.answers.put('功德箱捐香火钱有什么用', "a");
			this.answers.put('雪莲有什么作用', "a");
			this.answers.put('论剑中以下哪个是花紫会的技能', "a");
			this.answers.put('柳文君所在的位置', "a");
			this.answers.put('岳掌门在哪一章', "a");
			this.answers.put('长虹剑在哪位npc那里获得？', "a");
			this.answers.put('副本一次最多可以进几人', "a");
			this.answers.put('师门任务每天可以完成多少次', "a");
			this.answers.put('逍遥步是哪个门派的技能', "a");
			this.answers.put('新人礼包在哪个npc处兑换', "a");
			this.answers.put('使用朱果经验潜能将分别增加多少', "a");
			this.answers.put('欧阳敏在哪一章', "a");
			this.answers.put('辟邪剑法是哪个门派的绝学技能', "a");
			this.answers.put('在哪个npc处可以更改名字', "a");
			this.answers.put('毒龙鞭的伤害是多少', "a");
			this.answers.put('晚月庄主线过关要求', "a");
			this.answers.put('怎么样获得免费元宝', "a");
			this.answers.put('成长计划需要多少元宝方可购买', "a");
			this.answers.put('青城派的道家心法有哪个特殊效果', "a");
			this.answers.put('藏宝图在哪个NPC处购买', "a");
			this.answers.put('丁老怪是哪个门派的终极师傅', "a");
			this.answers.put('斗转星移阵是哪个门派的阵法', "a");
			this.answers.put('挂机增长什么', "a");
			this.answers.put('鹰爪擒拿手是哪个门派的技能', "a");
			this.answers.put('八卦迷阵是那个门派的阵法', "a");
			this.answers.put('一天能完成挑战排行榜任务多少次', "a");
			this.answers.put('论剑每天能打几次', "a");
			this.answers.put('需要使用什么衣服才能睡寒玉床', "a");
			this.answers.put('张天师是哪个门派的师傅', "a");
			this.answers.put('技能柳家拳谁教的', "a");
			this.answers.put('九阴派梅师姐在星宿海哪个场景', "a");
			this.answers.put('哪个npc处可以捏脸', "a");
			this.answers.put('论剑中步玄派的师傅是哪个', "a");
			this.answers.put('宝玉鞋击杀哪个npc可以获得', "a");
			this.answers.put('慕容家主在慕容山庄的哪个场景', "a");
			this.answers.put('闻旗使在哪个地图', "a");
			this.answers.put('虎皮腰带是腰带类的第几级装备', "a");
			this.answers.put('在哪里可以找到“香茶”？', "a");
			this.answers.put('打造刻刀需要多少个玄铁', "a");
			this.answers.put('包家将是哪个门派的师傅', "a");
			this.answers.put('论剑中以下哪个是天邪派的人物', "a");
			this.answers.put('升级什么技能可以提升根骨', "a");
			this.answers.put('NPC公平子在哪一章地图', "a");
			this.answers.put('逄义是在那个场景', "a");
			this.answers.put('锻造一把刻刀需要多少银两', "a");
			this.answers.put('以下哪个不是岳掌门教导的武学', "a");
			this.answers.put('捏脸需要寻找哪个NPC？', "a");
			this.answers.put('论剑中以下哪个是晚月庄的技能', "a");
			this.answers.put('碧海潮生剑在哪位师傅处学习', "a");
			this.answers.put('干苦力是挂机里的第几个任务', "a");
			this.answers.put('铁血大旗门云海心法可以提升什么', "a");
			this.answers.put('以下哪些物品是成长计划第四天可以领取的？', "a");
			this.answers.put('易容术多少级才可以易容成异性NPC', "a");
			this.answers.put('摹刻扬文需要多少把刻刀？', "a");
			this.answers.put('正邪任务中客商的在哪个地图', "a");
			this.answers.put('白驼山第一位要拜的师傅是谁', "a");
			this.answers.put('枯荣禅功是哪个门派的技能', "a");
			this.answers.put('漫天花雨匕在哪获得', "a");
			this.answers.put('摧心掌是哪个门派的技能', "a");
			this.answers.put('“花海”场景是在哪个地图上？', "a");
			this.answers.put('雪蕊儿是哪个门派的师傅', "a");
			this.answers.put('新手礼包在哪里领取', "a");
			this.answers.put('论语在哪购买', "a");
			this.answers.put('银丝链甲衣可以在哪位npc那里获得？', "a");
			this.answers.put('乾坤大挪移属于什么类型的武功', "a");
			this.answers.put('移开明教石板需要哪项技能到一定级别', "a");
			this.answers.put('开通VIP月卡最低需要当天充值多少元方有购买资格', "a");
			this.answers.put('黯然销魂掌有多少招式', "c");
			this.answers.put('“跪拜坪”场景是在哪个地图上', "b");
			this.answers.put('孤独求败称号需要多少论剑积分兑换', "b");
			this.answers.put('孔雀氅可以镶嵌几颗宝石', "b");
			this.answers.put('客商在哪一章', "b");
			this.answers.put('疯魔杖的伤害是多少', "b");
			this.answers.put('丐帮的轻功是哪个', "b");
			this.answers.put('霹雳掌套的伤害是多少', "b");
			this.answers.put('方媃是哪个门派的师傅', "b");
			this.answers.put('拜师张三丰需要多少正气', "b");
			this.answers.put('天师阵法是哪个门派的阵法', "b");
			this.answers.put('选择商贾会影响哪个属性', "b");
			this.answers.put('银手镯可以在哪位npc那里获得？', "b");
			//this.answers.put('清风寨在哪', "d");
			this.answers.put('在雪亭镇李火狮可以学习多少级柳家拳', "b");
			this.answers.put('华山施戴子掉落的物品是什么', "b");
			this.answers.put('尹志平是哪个门派的师傅', "b");
			this.answers.put('病维摩拳是哪个门派的技能', "b");
			this.answers.put('茅山的绝学是什么', "b");
			this.answers.put('茅山派的轻功是什么', "b");
			this.answers.put('风泉之剑可以在哪位npc那里获得？', "b");
			this.answers.put('凌波微步是哪个门派的技能', "b");
			this.answers.put('藏宝图在哪个npc处购买', "b");
			this.answers.put('军营是第几个组队副本', "b");
			this.answers.put('北岳殿神像后面是哪位npc', "b");
			this.answers.put('王重阳是哪个门派的师傅', "b");
			this.answers.put('跨服是星期几举行的', "b");
			this.answers.put('学习屠龙刀法需要多少内力', "b");
			this.answers.put('高级乾坤再造丹是增加什么的', "b");
			this.answers.put('银项链可以在哪位npc那里获得', "b");
			this.answers.put('每天在线多少个小时即可领取消费积分', "b");
			this.answers.put('晚月庄的内功是什么', "b");

			this.answers.put('冰魄银针的伤害是多少', "b");
			this.answers.put('论剑中以下哪个是丐帮的技能', "b");
			this.answers.put('神雕大侠所在的地图', "b");
			this.answers.put('突破丹在哪里购买', "b");
			this.answers.put('白金手镯可以在哪位npc那里获得', "a");
			this.answers.put('金手镯可以在哪位npc那里获得', "b");
			this.answers.put('以下哪个不是梁师兄教导的武学', "b");
			this.answers.put('技能数量超过了什么消耗潜能会增加', "b");
			this.answers.put('白金项链可以在哪位npc那里获得', "b");
			this.answers.put('小龙女住的古墓是谁建造的', "b");
			this.answers.put('打开引路蜂礼包可以得到多少引路蜂', "b");
			this.answers.put('购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益', "b");
			this.answers.put('白玉腰束是腰带类的第几级装备', "b");
			this.answers.put('老顽童在全真教哪个场景', "b");
			this.answers.put('神雕侠侣的作者是', "b");
			this.answers.put('晚月庄的七宝天岚舞可以提升哪个属性', "b");
			this.answers.put('论剑在周几进行', "b");
			this.answers.put('vip每天不可以领取什么', "b");
			this.answers.put('每天有几次试剑', "b");
			this.answers.put('晚月庄七宝天岚舞可以提升什么', "b");
			this.answers.put('哪个分享可以获得20元宝', "b");
			this.answers.put('大保险卡可以承受多少次死亡后不降技能等级', "b");
			this.answers.put('凌虚锁云步是哪个门派的技能', "b");
			this.answers.put('屠龙刀法是哪个门派的绝学技能', "b");
			this.answers.put('金丝鞋可以在哪位npc那里获得', "b");
			this.answers.put('老毒物在白驮山的哪个场景', "b");
			this.answers.put('毒物阵法是哪个门派的阵法', "b");
			this.answers.put('以下哪个不是知客道长教导的武学', "b");
			this.answers.put('飞仙剑阵是哪个门派的阵法', "b");
			this.answers.put('副本完成后不可获得下列什么物品', "b");
			this.answers.put('晚月庄意寒神功可以提升什么', "b");
			this.answers.put('北冥神功是哪个门派的技能', "b");
			this.answers.put('论剑中以下哪个是青城派的技能', "b");
			this.answers.put('六阴追魂剑是哪个门派的技能', "b");
			this.answers.put('王铁匠是在那个场景', "b");
			this.answers.put('以下哪个是步玄派的祖师', "b");
			this.answers.put('在洛阳萧问天那可以学习什么心法', "b");
			this.answers.put('在哪个npc处能够升级易容术', "b");
			this.answers.put('摹刻10级的装备需要摩刻技巧多少级', "b");
			this.answers.put('师门任务什么时候更新', "b");
			this.answers.put('哪个npc属于全真七子', "b");
			this.answers.put('正邪任务中卖花姑娘在哪个地图', "b");
			this.answers.put('风老前辈在华山哪个场景', "b");
			this.answers.put('“留云馆”场景是在哪个地图上？', "b");
			this.answers.put('割鹿刀可以在哪位npc那里获得', "b");
			this.answers.put('论剑中以下哪个是大招寺的技能', "b");
			this.answers.put('全真的基本阵法有哪个特殊效果', "b");
			this.answers.put('论剑要在晚上几点前报名', "b");
			this.answers.put('碧磷鞭的伤害是多少？', "b");
			this.answers.put('一天能完成谜题任务多少个', "b");
			this.answers.put('正邪任务杀死好人增长什么', "b");
			this.answers.put('木道人在青城山的哪个场景', "b");
			this.answers.put('论剑中以下哪个不是大招寺的技能', "b");
			this.answers.put('“伊犁”场景是在哪个地图上？', "b");
			this.answers.put('“冰火岛”场景是在哪个地图上', "b");
			this.answers.put('“双鹤桥”场景是在哪个地图上', "b");
			this.answers.put('“百龙山庄”场景是在哪个地图上？', "b");

			this.answers.put('九阳神功是哪个门派的技能', "c");
			this.answers.put('树王坟在第几章节', "c");
			this.answers.put('阳刚之劲是哪个门派的阵法', "c");
			this.answers.put('上山打猎是挂机里的第几个任务', "c");
			this.answers.put('一张分身卡的有效时间是多久', "c");
			this.answers.put('锻造一把刻刀需要多少玄铁碎片锻造', "c");
			this.answers.put('论剑中以下哪个不是铁血大旗门的技能', "c");
			this.answers.put('如意刀是哪个门派的技能', "c");
			this.answers.put('跨服在哪个场景进入', "c");
			this.answers.put('在哪个NPC可以购买恢复内力的药品？', "c");
			this.answers.put('欧阳敏在唐门的哪个场景', "c");
			this.answers.put('密宗伏魔是哪个门派的阵法', "c");
			this.answers.put('孔雀氅是披风类的第几级装备？', "c");
			this.answers.put('天山折梅手是哪个门派的技能', "c");
			this.answers.put('玩家每天能够做几次正邪任务', "c");
			this.answers.put('柳淳风在哪一章', "c");
			this.answers.put('茅山天师正道可以提升什么', "c");
			this.answers.put('洪帮主在洛阳哪个场景', "c");
			this.answers.put('以下哪个不是全真七子？', "c");
			this.answers.put('云九天是哪个门派的师傅', "c");
			this.answers.put('摹刻烈日宝链需要多少级摩刻技巧', "c");
			this.answers.put('伏虎杖的伤害是多少', "c");
			this.answers.put('灵蛇杖法是哪个门派的技能', "c");
			this.answers.put('“子午楼”场景是在哪个地图上', "c");
			this.answers.put('什么装备可以镶嵌紫水晶', "c");
			this.answers.put('石师妹哪个门派的师傅', "c");
			this.answers.put('烈火旗大厅是那个地图的场景', "c");
			this.answers.put('打土匪是挂机里的第几个任务', "c");
			this.answers.put('捏脸需要花费多少银两', "c");
			this.answers.put('大旗门的云海心法可以提升哪个属性', "c");
			this.answers.put('论剑中以下哪个是铁雪山庄的技能', "c");
			this.answers.put('“白玉牌楼”场景是在哪个地图上', "c");
			this.answers.put('以下哪个宝石不能镶嵌到披风', "c");
			this.answers.put('魏无极身上掉落什么装备', "c");
			this.answers.put('以下不是步玄派的技能的哪个', "c");
			this.answers.put('“常春岛渡口”场景是在哪个地图上', "c");
			this.answers.put('北斗七星阵是第几个的组队副本', "c");
			this.answers.put('宝石合成一次需要消耗多少颗低级宝石', "c");
			this.answers.put('烈日项链可以镶嵌几颗宝石', "c");
			this.answers.put('达摩在少林哪个场景', "c");
			this.answers.put('积分商城在雪亭镇的哪个场景', "c");
			this.answers.put('全真的双手互搏有哪个特殊效果', "c");
			this.answers.put('论剑中以下哪个不是唐门的人物', "c");
			this.answers.put('棋道是哪个门派的技能', "c");
			this.answers.put('七星鞭的伤害是多少', "c");
			this.answers.put('富春茶社在哪一章', "c");
			this.answers.put('等级多少才能在世界频道聊天', "c");
			this.answers.put('以下哪个是封山派的祖师', "c");
			this.answers.put('论剑是星期几进行的', "c");
			this.answers.put('师门任务每天可以做多少个', "c");
			this.answers.put('风泉之剑加几点悟性', "c");
			this.answers.put('黑水伏蛟可以在哪位npc那里获得？', "c");
			this.answers.put('陆得财是哪个门派的师傅', "c");
			this.answers.put('拜师小龙女需要容貌多少', "c");
			this.answers.put('下列装备中不可摹刻的是', "c");
			this.answers.put('古灯大师是哪个门派的终极师傅', "c");
			this.answers.put('“翰墨书屋”场景是在哪个地图上', "c");
			this.answers.put('论剑中大招寺第一个要拜的师傅是谁', "c");
			this.answers.put('杨过小龙女分开多少年后重逢', "c");
			this.answers.put('选择孤儿会影响哪个属性', "c");
			this.answers.put('论剑中逍遥派的终极师傅是谁', "c");
			this.answers.put('不可保存装备下线多久会消失', "c");
			this.answers.put('一个队伍最多有几个队员', "c");
	//        this.answers.put('论语在哪购买', "c");
			this.answers.put('以下哪个宝石不能镶嵌到戒指', "c");
			this.answers.put('论剑是每周星期几', "c");
			this.answers.put('茅山在哪里拜师', "c");
			this.answers.put('以下哪个宝石不能镶嵌到腰带', "c");
			this.answers.put('黄宝石加什么属性', "c");
			this.answers.put('茅山可以招几个宝宝', "c");
			this.answers.put('唐门密道怎么走', "c");
			this.answers.put('论剑中以下哪个不是大理段家的技能', "c");
			this.answers.put('论剑中以下哪个不是魔教的人物', "d");
			this.answers.put('每天能做多少个师门任务', "c");
			this.answers.put('一天能使用元宝做几次暴击谜题', "c");

			this.answers.put('成长计划第七天可以领取多少元宝', "d");
			this.answers.put('每天能挖几次宝', "d");
			this.answers.put('日月神教大光明心法可以提升什么', "d");
			this.answers.put('在哪个npc处领取免费消费积分', "d");
			this.answers.put('副本有什么奖励', "d");
			this.answers.put('论剑中以下不是华山派的人物的是哪个', "d");
			this.answers.put('论剑中以下哪个不是丐帮的技能', "d");
			this.answers.put('以下哪个不是慧名尊者教导的技能', "d");
			this.answers.put('慕容山庄的斗转星移可以提升哪个属性', "d");
			this.answers.put('论剑中以下哪个不是铁雪山庄的技能', "d");
			this.answers.put('师门任务一天能完成几次', "d");
			this.answers.put('以下有哪些物品不是每日充值的奖励', "d");
			this.answers.put('论剑中以下哪个不是华山派的技能的', "d");
			this.answers.put('武穆兵法提升到多少级才能出现战斗必刷', "d");
			this.answers.put('论剑中以下哪个不是全真教的技能', "d");
			this.answers.put('师门任务最多可以完成多少个', "d");
			this.answers.put('张三丰在哪一章', "d");
			this.answers.put('倚天剑加多少伤害', "d");
			this.answers.put('以下谁不精通降龙十八掌', "d");
			this.answers.put('论剑中以下哪个不是明教的技能', "d");
			this.answers.put('受赠的消费积分在哪里领取', "d");
			this.answers.put('以下哪个不是道尘禅师教导的武学', "d");
			this.answers.put('古墓多少级以后才能进去', "d");
			this.answers.put('千古奇侠称号需要多少论剑积分兑换', "d");
			this.answers.put('魔鞭诀在哪里学习', "d");
			this.answers.put('通灵需要花费多少银两', "d");
			this.answers.put('白银宝箱礼包多少元宝一个', "d");
			this.answers.put('以下哪个不是论剑的皮肤', "d");
			this.answers.put('小李飞刀的伤害是多少', "d");
			this.answers.put('下面哪个npc不是魔教的', "d");
			this.answers.put('天蚕围腰是腰带类的第几级装备', "d");
			this.answers.put('黄岛主在桃花岛的哪个场景', "d");
			this.answers.put('宝玉帽可以在哪位npc那里获得？', "d");
			this.answers.put('什么影响攻击力', "d");
			this.answers.put('紫宝石加什么属性', "d");
			this.answers.put('少林的混元一气功有哪个特殊效果', "d");
			this.answers.put('以下哪个是晚月庄的祖师', "d");
			this.answers.put('以下不是隐藏门派的是哪个', "d");
			this.answers.put('第一个副本需要多少等级才能进入', "d");
			this.answers.put('风泉之剑在哪里获得', "d");
			this.answers.put('镖局保镖是挂机里的第几个任务', "d");
			this.answers.put('下面哪个不是古墓的师傅', "d");
			this.answers.put('每个玩家最多能有多少个好友', "b");
			this.answers.put('以下哪个不是在扬州场景', "d");
			this.answers.put('茅山的天师正道可以提升哪个属性', "d");
			this.answers.put('“无名山脚”场景是在哪个地图上', "d");
			this.answers.put('闯楼第几层可以获得称号“藏剑楼楼主”', "d");
			this.answers.put('充值积分不可以兑换下面什么物品', "d");
			this.answers.put('魔教的大光明心法可以提升哪个属性', "d");
			this.answers.put('以下哪些物品不是成长计划第三天可以领取的', "d");
			this.answers.put('论剑中以下哪个不是峨嵋派可以拜师的师傅', "d");
			this.answers.put('哪个技能不是魔教的', "d");
			this.answers.put('沧海护腰可以镶嵌几颗宝石', "d");
			this.answers.put('城里打擂是挂机里的第几个任务', "d");
			this.answers.put('以下哪个不是鲁长老教导的武学', "d");
			this.answers.put('以下哪些物品不是成长计划第一天可以领取的', "d");
			this.answers.put('包拯在哪一章', "d");
			this.answers.put('张天师在茅山哪个场景', "d");
			this.answers.put('山河藏宝图需要在哪个NPC手里购买？', "d");
			this.answers.put('影响你出生的福缘的出生是', "d");
			this.answers.put('张三丰在武当山哪个场景', "d");
			this.answers.put('春秋水色斋需要多少杀气才能进入', "d");
			this.answers.put('论剑中以下哪个不是是晚月庄的技能', "d");
			this.answers.put('大乘佛法有什么效果', "d");
			this.answers.put('正邪任务最多可以完成多少个', "d");
			this.answers.put('高级突破丹多少元宝一颗', "d");
			this.answers.put('清虚道长在哪一章', "d");
			this.answers.put('在战斗界面点击哪个按钮可以进入聊天界面', "d");
			this.answers.put('“鹰记商号”场景是在哪个地图上？', "d");
			this.answers.put('改名字在哪改', "d");
			this.answers.put('以下哪个不是在洛阳场景', "d");
	//        this.answers.put('青城派的道德经可以提升哪个属性', "d");
			this.answers.put('金项链可以在哪位npc那里获得', "d");

			this.answer = function(a) {
	//          alert("答案是：" + a);
				overrideclick("question " + a,0);
	//            go("question");
			}

			this.dispatchMessage = function(b) {
				var type = b.get("type"), msg= b.get("msg")
				if (type == "show_html_page" && msg.indexOf("知识问答第") > 0) {
					console.log(msg);
					if (msg.indexOf("回答正确！") > 0) {
						overrideclick("question");
						return;
					}

					var q = this.answers.keys();
					for (var i in q) {
						var k = q[i];

						if (msg.indexOf(k) > 0) {
							this.answer(this.answers.get(k));
							break;
						}
					}

	//                else if (msg.indexOf("正邪任务一天能做几次") > 0) this.answer("b")

				}
			}
		}

		var question = new Question
			function Trigger(r, h, c, n) {
			this.regexp = r;
			this.handler = h;
			this.class = c;
			this.name = n;

			this.enabled = true;

			this.trigger = function(line) {
				if (!this.enabled) return;

				if (!this.regexp.test(line)) return;

				console.log("触发器: " + this.regexp + "触发了");
				var m = line.match(this.regexp);
				this.handler(m);
			}

			this.enable = function() {
				this.enabled = true;
			}

			this.disable = function() {
				this.enabled = false;
			}

		}

		jh = function(w) {
			if (w == 'xt') w = 1;
			if (w == 'ly') w = 2;
			if (w == 'hsc') w = 3;
			if (w == 'hs') w = 4;
			if (w == 'yz') w = 5;
			if (w == 'gb') w = 6;
			if (w == 'qy') w = 7;
			if (w == 'em') w = 8;
			if (w == 'hs2') w = 9;
			if (w == 'wd') w = 10;
			if (w == 'wy') w = 11;
			if (w == 'sy') w = 12;
			if (w == 'sl') w = 13;
			if (w == 'tm') w = 14;
			if (w == 'qc') w = 15;
			if (w == 'xx') w = 16;
			if (w == 'kf') w = 17;
			if (w == 'gmd') w = 18;
			if (w == 'qz') w = 19;
			if (w == 'gm') w = 20;
			if (w == 'bt') w = 21;
			if (w == 'ss') w = 22;
			if (w == 'mz') w = 23;
			if (w == 'ts') w = 24;


			overrideclick("jh " + w, 0);
		};


		function Triggers() {
			this.allTriggers = [];

			this.trigger = function(line) {
				var t = this.allTriggers.slice(0);
				for (var i = 0, l = t.length; i < l; i++) {
					t[i].trigger(line);
				}
			}

			this.newTrigger = function(r, h, c, n) {
				var t = new Trigger(r, h, c, n);
				if (n) {
					for (var i = this.allTriggers.length - 1; i >= 0; i--) {
						if (this.allTriggers[i].name == n) this.allTriggers.splice(i, 1);
					}
				}

				this.allTriggers.push(t);

				return t;
			}

			this.enableTriggerByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) t.enable();
				}
			}

			this.disableTriggerByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) t.disable();
				}
			}

			this.enableByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.class == c) t.enable();
				}
			}

			this.disableByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.class == c) t.disable();
				}
			}

			this.removeByCls = function(c) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t && t.class == c) this.allTriggers.splice(i, 1);
				}
			}

			this.removeByName = function(n) {
				for (var i = this.allTriggers.length - 1; i >= 0; i--) {
					t = this.allTriggers[i];
					if (t.name == n) this.allTriggers.splice(i, 1);
				}
			}
		}

		window.triggers = new Triggers;

		triggers.newTrigger(/似乎以下地方藏有宝物(.*)/, function(m) {
			m = m[1].split(/\d+/);
			var bl_found = false;
			for (i = 0, l = m.length; i < l; i++) {
				var a = m[i];
				console.log(a);
				if (/一片翠绿的草地/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/大诗人白居易之墓，墓碑上刻着“唐少傅白公墓”。四周环绕着冬青。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正站在雪亭镇南边的一家小客栈里，这家客栈虽小，却是方圆五百里/.test(a)) {
					jh('xt');
					go('dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇镇前广场的空地，地上整齐地铺著大石板。广场中央有一个木头搭的架子，经过多年的风吹日晒雨淋，看来非常破旧。四周建筑林立。往西你可以看到一间客栈，看来生意似乎很好。/.test(a)) {
					jh('xt');
					go('e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间十分老旧的城隍庙，在你面前的神桌上供奉著一尊红脸的城隍，庙虽老旧，但是神案四周已被香火薰成乌黑的颜色，显示这里必定相当受到信徒的敬仰。/.test(a)) {
					jh('xt');
					go('e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条普通的黄土小径，弯弯曲曲往东北一路盘旋上山，北边有一间城隍庙，往西则是雪亭镇的街道。/.test(a)) {
					jh('xt');
					go('e;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条普通的黄土小径，小径往西南通往一处山间的平地，从这里可以望见不少房屋错落在平地上，往东北则一路上山。/.test(a)) {
					jh('xt');
					go('e;e;s;ne;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条说宽不宽，说窄倒也不窄的山路，路面用几块生满青苔的大石铺成，西面是一段坡地，从这里可以望见西边有几间房屋错落在林木间，东面则是山壁，山路往西南衔接一条黄土小径，往北则是通往山上的石阶。/.test(a)) {
					jh('xt');
					go('e;e;s;ne;ne;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的街口，往北是一个热闹的广场，南边是条小路通往一座林子，东边则有一条小径沿著山腰通往山上，往西是一条比较窄的街道，参差不齐的瓦屋之间传来几声犬吠。从这里向东南走就是进出关的驿道了。/.test(a)) {
					jh('xt');
					go('e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的街道，你的北边有一家客栈，从这里就可以听到客栈里人们饮酒谈笑/.test(a)) {
					jh('xt');
					go('e;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间宽敞的书院，虽然房子看起来很老旧了，但是打扫得很整洁，墙壁上挂著一幅山水画，意境颇为不俗，书院的大门开在北边，西边有一扇木门通往边厢。/.test(a)) {
					jh('xt');
					go('e;s;w;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条宽敞坚实的青石板铺成的大道，路上车马的痕迹已经在路面上留下一条条明显的凹痕，往东是一条较小的街道通往雪亭镇。/.test(a)) {
					jh('xt');
					go('e;s;w;w;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正走在雪亭镇的街道上，东边不远处有一间高大的院子，门口立著一根粗大的旗杆/.test(a)) {
					jh('xt');
					go('e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间素来以公平信用著称的钱庄，钱庄的老板还是个曾经中过举人的读书人/.test(a)) {
					jh('xt');
					go('e;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正站在一间大宅院的入口，两只巨大的石狮镇守在大门的两侧，一阵阵吆喝与刀剑碰撞的声音从院子中传来，通过大门往东可以望见许多身穿灰衣的汉子正在操练。/.test(a)) {
					jh('xt');
					go('e;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正站在一个宽敞的教练场中，地上铺著黄色的细砂，许多人正在这里努力地操练著，北边是一间高大的兵器厅，往东则是武馆师父们休息的大厅。/.test(a)) {
					jh('xt');
					go('e;n;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间堆满各式兵器、刀械的储藏室，各式武器都依照种类、长短、依次放在一起，并且擦拭得一尘不染，储藏室的出口在你的南边，面对出口的左手边有一个架子/.test(a)) {
					jh('xt');
					go('e;n;e;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是淳风武馆的正厅，五张太师椅一字排开面对著门口，这是武馆中四位大师傅与馆主柳淳风的座位/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是淳风武馆中的天井，往西走可以回到正厅/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间整理得相当乾净的书房，红木桌椅上铺著蓝绸巾，显得十分考究，西面的立著一个书架，上面放著一排排的古书，往南走出房门可以看到天井。/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间布置得相当雅致的厢房，从窗子可以看到北边的天井跟南边的庭园中各式各样的奇花异草，以及他们所带来的淡淡香气，厢房的东面墙上还挂著一幅仕女图/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这里是淳风武馆的内院，平常武馆弟子没有馆主的允许是不敢到这里来的/.test(a)) {
					jh('xt');
					go('e;n;e;e;e;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/你现在正走在雪亭镇的大街，往南直走不远处是镇上的广场，在你的东边是一间大宅院/.test(a)) {
					jh('xt');
					go('e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一间打铁铺子，从火炉中冒出的火光将墙壁映得通红，屋子的角/.test(a)) {
					jh('xt');
					go('e;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的大街，东边有一栋陈旧的建□，看起来像是什麽店铺，但是并没有任何招牌，只有一扇门上面写著一个大大的/.test(a)) {
					jh('xt');
					go('e;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一家中等规模的当铺，老旧的柜台上放著一张木牌/.test(a)) {
					jh('xt');
					go('e;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是丰登当铺的储藏室，有时候当铺里的大朝奉会把铺里存不下的死当货物拿出来拍卖/.test(a)) {
					jh('xt');
					go('e;n;n;n;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是雪亭镇的大街，一条小巷子通往东边，西边则是一间驿站/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是负责雪亭镇官府文书跟军令往来的雪亭驿/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/一间小木屋，在这北方的风中吱吱作响。/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是一处山坳，往南就是雪亭镇，一条蜿蜒的小径往东通往另一个邻近的小山村/.test(a)) {
					jh('xt');
					go('e;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里便是有名的龙门石窟，石窟造像，密布于两岸的崖壁上。远远可以望见琵琶峰上的白冢。/.test(a)) {
					jh('ly');
					go('dig go');
					bl_found = true;
					break;
				}
				if (/城南官道，道路两旁是一片树林，远处是一片片的农田了。田地里传来农人的呼号，几头黄牛悠闲的趴卧着。/.test(a)) {
					jh('ly');
					go('n;dig go');
					bl_found = true;
					break;
				}
				if (/由此洛阳城南门出去，就可以通往南市的龙门石窟。城门处往来客商络绎不绝，几名守城官兵正在检查过往行人。/.test(a)) {
					jh('ly');
					go('n;n;dig go');
					bl_found = true;
					break;
				}
				if (/洛阳最繁华的街市，这里聚集着各国客商。/.test(a)) {
					jh('ly');
					go('n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里便是洛水渡口静静的洛水由此向东，汇入滚滚黄河。码头上正泊着一艘船坞，常常的缆绳垂在水中。/.test(a)) {
					jh('ly');
					go('n;n;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/一艘普通的船坞，船头坐着一位蓑衣男子。/.test(a)) {
					jh('ly');
					go('n;n;e;s;luoyang317_op1;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是洛阳的南面了，街上有好几个乞丐在行乞。/.test(a)) {
					jh('ly');
					go('n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是一座供奉洛神的小庙。小庙的地上放着几个蒲团。/.test(a)) {
					jh('ly');
					go('n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这儿就是洛阳金刀世家了。金刀门虽然武功不算高，但也是有两下子的。/.test(a)) {
					jh('ly');
					go('n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/金刀世家的练武场。金刀门的门主王天霸在这儿教众弟子习武。/.test(a)) {
					jh('ly');
					go('n;n;n;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是洛神庙下面的地道，上面人走动的声音都隐约可听见。/.test(a)) {
					jh('ly');
					go('n;n;n;w;putuan;dig go');
					bl_found = true;
					break;
				}
				if (/湿润的青石路显然是刚刚下过雨，因为来往行人过多，路面多少有些坑坑凹凹，一不留神很容易被绊到。/.test(a)) {
					jh('ly');
					go('n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这儿就是菜市口。各种小贩商人十分嘈杂，而一些地痞流氓也混迹人群伺机作案。/.test(a)) {
					jh('ly');
					go('n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/一个猪肉摊，在这儿摆摊卖肉已经十多年了。/.test(a)) {
					jh('ly');
					go('n;n;n;n;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/你刚踏进巷子，便听得琴韵丁冬，小巷的宁静和外面喧嚣宛如两个世界/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/小院四周满是盛开的桃花，穿过一条长廊，一座别致的绣楼就在眼前了。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;s;dig go');
					bl_found = true;
					break;
				}
				if (/绣楼内挂着湖绿色帐幔，一名女子斜靠在窗前的美人榻上。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里就是背阴巷了，站在巷口可以万剑阴暗潮湿的窄巷，这里聚集着洛阳的地痞流氓，寻常人不敢近前。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;dig go');
					bl_found = true;
					break;
				}
				if (/黑暗的街道，几个地痞无赖正慵懒的躺在一旁。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;n;dig go;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一家酒肆，洛阳地痞头目甄大海正坐在里面小酌。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/院落里杂草丛生，东面的葡萄架早已枯萎。/.test(a)) {
					jh('ly');
					go('n;n;n;n;w;event_1_98995501;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/一座跨街大青砖砌的拱洞高台谯楼，矗立在城中心。鼓楼为二层木瓦建筑，设有大鼓大钟，晨钟暮鼓，用以报时。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/相传春秋时代，楚王在此仰望周王城，问鼎重几何。周室暗弱，居然隐忍不发。这便是街名的由来。银钩赌坊也在这条街上。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里便是洛阳有名的悦来客栈，只见客栈大门处人来人往，看来生意很红火。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/客栈大院，院内紫藤花架下放着几张桌椅，东面是一座马厩。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/客栈马倌正在往马槽里添草料，旁边草料堆看起来有些奇怪。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/房间布置的极为雅致，没有太多的装饰，唯有屋角放着一个牡丹屏风。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/赌坊二楼走廊，两旁房间里不时床来莺声燕语，看来这里不止可以赌。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通往赌坊二楼的楼梯，上面铺着大红色地毯。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/大厅满是呼庐喝雉声、骰子落碗声、银钱敲击声，男人和女人的笑声，/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/走出赌坊后门，桂花清香扑面而来，桂花树下的水缸似乎被人移动过。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/赌坊门口人马喧哗，门上一支银钩在风中摇晃，不知道多少人咬上了这没有鱼饵的钩/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;w;dig go');
					bl_found = true;
					break;
				}
				if (/自古以来，洛阳墨客骚人云集，因此有“诗都”之称，牡丹香气四溢，又有“花都”的美誉/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;s;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是牡丹园内的一座小亭子，布置得十分雅致。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;w;s;luoyang111_op1;dig go');
					bl_found = true;
					break;
				}
				if (/也许由于连年的战乱，使得本来很热闹的街市冷冷清清，道路两旁的店铺早已破旧不堪，一眼望去便知道有很久没有人居住了。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这间当铺处于闹市，位置极好。当铺老板正半眯着双眼在高高的柜台上打盹。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/你无意中走进一条青石街，这里不同于北大街的繁华热闹，两边是一些小店铺，北面有一家酒肆，里面出入的人看起来衣衫褴褛。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间小酒肆，里面黑暗潮湿，满是油垢的桌旁，几名无赖正百无聊赖的就着一盘花生米喝酒。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是洛阳北边街道，人群熙熙攘攘甚是热闹。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/洛阳城的钱庄，来往的商客往往都会将银两存于此处。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/就是洛阳北门，门口站着的是守城官兵。站在城楼望出去，外面是一片茅草路。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/城北通往邙山的小路，路旁草丛中时有小兽出没。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/一片绿云般的竹林隔绝了喧嚣尘世，步入这里，心不由平静了下来。青石小路在竹林中蜿蜒穿行，竹林深处隐约可见一座小院。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/绿竹环绕的小院，院内几间房舍都用竹子打造，与周围竹林颇为和谐。这小院的主人显然有些独特之处。院内一名老翁正在劈柴。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/一间雅致的书斋，透过窗户可以见到青翠修竹，四周如此清幽，竹叶上露珠滴落的声音都能听见。靠墙的书架看起来很别致。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;n;e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/ 就是洛阳城墙上的城楼，驻守的官兵通常会在这儿歇个脚，或是聊下天。如果心细之人，能看到角落里似乎有一个隐秘的把手。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/ 这个城楼上的密室显然是守城军士秘密建造的，却不知有何用途。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;w;luoyang14_op1;dig go');
					bl_found = true;
					break;
				}
				if (/这就是洛阳城的城墙。洛阳是重镇，因此城墙上驻守的官兵格外多。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/由于连年的战乱，整条金谷街的不少铺子已经荒废掉了。再往东走就是洛阳地痞流氓聚集的背阴巷。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是洛阳首富的庄院，据说家财万贯，富可敌国。庄院的的中间有一棵参天大树。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/这儿是富人家的储藏室，因此有不少奇珍异宝。仔细一看，竟然还有一个红光满面的老人家半躺在角落里。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;n;op1;dig go');
					bl_found = true;
					break;
				}
				if (/一座朴实的石拱桥，清澈河水从桥下流过。对面可见一座水榭。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;dig go');
					bl_found = true;
					break;
				}
				if (/荷池旁的水榭，几名游客正在里面小憩。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/回廊两旁便是碧绿荷塘，阵阵荷香拂过。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/荷塘中的观景台，两名女子在这里游玩。远远站着几名护卫，闲杂人等一律被挡在外面。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/隐藏在一片苍翠树林中的小路，小路尽头有座草屋。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/简陋的茅草小屋，屋内陈设极其简单。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/石阶两侧山泉叮咚，林木森森。漫步而上，可见山腰有亭。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这就是听伊亭，据说白居易曾与好友在此品茗、论诗。一旁的松树上似乎有什么东西。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/丛林小径，因为走得人少，小径已被杂草覆盖。/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/听着松涛之音，犹如直面大海/.test(a)) {
					jh('ly');
					go('n;n;n;n;n;e;e;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这里是华山村村口，几个草垛随意的堆放在路边，三两个泼皮慵懒躺在那里。/.test(a)) {
					jh('hsc');
					go('dig go');
					bl_found = true;
					break;
				}
				if (/这是一条穿过村口松树林的小路。/.test(a)) {
					jh('hsc');
					go('n;dig go');
					bl_found = true;
					break;
				}
				if (/这就是有名的神女冢，墓碑前散落着游人墨客烧的纸钱，前面不远处有一间破败的土地庙。/.test(a)) {
					jh('hsc');
					go('n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一片溪边的杏树林，一群孩童在此玩耍。/.test(a)) {
					jh('hsc');
					go('w;dig go');
					bl_found = true;
					break;
				}
				if (/村口一个简易茶棚，放着几张木质桌椅，干净齐整，过往路人会在这里喝杯热茶歇歇脚，村里的王老二常常会混在这里小偷小摸。/.test(a)) {
					jh('hsc');
					go('w;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间破败的土地庙门口，门旁的对联已经模糊不清，隐约只见上联“德之不修/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;dig go');
					bl_found = true;
					break;
				}
				if (/土地庙庙堂，正中供奉着土地，香案上堆积这厚厚的灰尘。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;dig go');
					bl_found = true;
					break;
				}
				if (/隐藏在佛像后的地道入口，两只黑狗正虎视眈眈的立在那里。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通往西侧的通道，前面被铁栅栏挡住了。/.test(a)) {
					jh('hsc');
					bl_found = true;
					go('w;event_1_59520311;n;n;w;dig go');
					break;
				}
				if (/通往地下通道的木楼梯/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通道两侧点着油灯，昏暗的灯光让人看不清楚周围的环境。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/通往东侧的通道，前面传来有水声和痛苦的呻吟。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一件宽敞的大厅，正中间摆着一张太师椅，两侧放着一排椅子。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一件布置极为简单的卧房，显然只是偶尔有人在此小憩。床上躺着一名半裸女子，满脸惊恐。/.test(a)) {
					jh('hsc');
					go('w;event_1_59520311;n;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条古老的青石街，几个泼皮在街上游荡。/.test(a)) {
					jh('hsc');
					go('s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一条碎石小路，前面有一个打铁铺。/.test(a)) {
					jh('hsc');
					go('s;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间打铁铺，炉火烧的正旺，一名汉子赤膊挥舞着巨锤，锤落之处但见火花四溅。/.test(a)) {

					jh('hsc');
					go('s;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/一棵千年银杏树屹立在广场中央，树下有一口古井，据说这口古井的水清澈甘甜，村里的人每天都会来这里挑水。/.test(a)) {
					jh('hsc');
					go('s;s;dig go');
					bl_found = true;
					break;
				}
				if (/村里的杂货铺，店老板正在清点货品。/.test(a)) {
					jh('hsc');
					go('s;s;e;dig go');
					bl_found = true;
					break;
				}
				if (/杂货铺后院，堆放着一些杂物，东边角落里放着一个马车车厢，一个跛脚汉子坐在一旁假寐。/.test(a)) {
					jh('hsc');
					go('s;s;e;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一个普通的马车车厢，粗布帘挡住了马车车窗和车门，地板上面躺着一个人。/.test(a)) {
					jh('hsc');
					go('s;s;e;s;huashancun24_op2;dig go');
					bl_found = true;
					break;
				}
				if (/这是村内宗祠大门，门口一棵古槐，树干低垂。/.test(a)) {
					jh('hsc');
					go('s;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/宗祠的大厅，这里供奉着宗室先祖。/.test(a)) {
					jh('hsc');
					go('s;s;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/青石板铺就的小桥，几棵野草从石缝中钻出，清澈的溪水自桥下湍湍流过。/.test(a)) {
					jh('hsc');
					go('s;s;s;dig go');
					bl_found = true;
					break;
				}
				if (/田间泥泞的小路，一个稻草人孤单的立在一旁，似乎在指着某个地方。一个男子神色慌张的从一旁田地里钻出。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间竹篱围城的小院，院内种着几株桃花，屋后竹林环绕，颇为雅致。旁边的西厢房上挂着一把铜制大锁，看起来有些奇怪。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;w;dig go');
					bl_found = true;
					break;
				}
				if (/这是小院的厅堂，迎面墙壁上挂着一幅山水画，看来小院的主人不是普通农人。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;w;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是一间普通的厢房，四周窗户被布帘遮得严严实实。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;w;get_silver;dig go');
					bl_found = true;
					break;
				}
				if (/一条杂草丛生的乡间小路，时有毒蛇出没。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;dig go');
					bl_found = true;
					break;
				}
				if (/一间看起来有些破败的小茅屋，屋内角落里堆着一堆稻草，只见稻草堆悉悉索索响了一阵，竟然从里面钻出一个人来。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;e;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨山脚，站在此处可以摇摇望见四面悬崖的清风寨。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;dig go');
					bl_found = true;
					break;
				}
				if (/通往清风寨唯一的山路，一侧便是万丈深渊。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;dig go');
					bl_found = true;
					break;
				}
				if (/两扇包铁木门将清风寨与外界隔绝开来，门上写着“清风寨”三字。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里就是桃花泉，一片桃林环绕着清澈泉水，据说泉水一年四季不会枯竭。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨前院，地面由坚硬岩石铺就。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨练武场，四周放置着兵器架。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/清风寨议事厅，正中放置着一张虎皮椅。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里是清风寨后院，远角有一颗大树，树旁有一扇小门。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这里就是清风寨兵器库了，里面放着各色兵器。角落里一个上锁的黑铁箱不知道装着什么。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/这里的空气中充满清甜的味道，地上堆积着已经晒干的柿子。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/这是清风寨寨主的卧房，床头挂着一把大刀。/.test(a)) {
					jh('hsc');
					go('s;s;s;s;s;nw;n;n;n;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/这是通往二楼大厅的楼梯，楼梯扶手上的雕花精美绝伦，看来这酒楼老板并不是一般的生意人/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;dig go');
					bl_found = true;
					break;
				}
				if (/二楼是雅座，文人学士经常在这里吟诗作画，富商土豪也在这里边吃喝边作交易。/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/进门绕过一道淡绿绸屏风，迎面墙上挂着一副『芙蓉出水』图。厅内陈列奢华，雕花楠/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;w;dig go');
					bl_found = true;
					break;
				}
				if (/进门绕过一道淡黄绸屏风，迎面墙上挂着一副『芍药』图，鲜嫩欲滴/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;e;dig go');
					bl_found = true;
					break;
				}
				if (/进门绕过一道淡红绸屏风，迎面墙上挂着一副『牡丹争艳』图，牡丹素以富贵著称。图侧对联：“幽径天姿呈独秀，古园国色冠群芳”。/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;n;dig go');
					bl_found = true;
					break;
				}
				if (/你站在观景台上眺望，扬州城的美景尽收眼底。东面是就是小秦淮河岸，河岸杨柳轻拂水面，几簇粉色桃花点缀其间。/.test(a)) {
					jh('yz');
					go('n;n;n;n;n;n;e;n;n;n;n;dig go');
					bl_found = true;
					break;
				}

			}
			if (bl_found) go("cangbaotu_op1");
	//      window.setTimeout('go("cangbaotu_op1")', 3000);
		}, "", "cbt");



		window.game = this;

		window.attach = function() {
			var oldWriteToScreen = window.writeToScreen;
			window.writeToScreen = function(a, e, f, g) {
				oldWriteToScreen(a, e, f, g);
				a = a.replace(/<[^>]*>/g, "");
				triggers.trigger(a);
			};

			webSocketMsg.prototype.old = gSocketMsg.dispatchMessage;

			gSocketMsg.dispatchMessage = function(b) {
				this.old(b);
				question.dispatchMessage(b);
				if (fishingTrigger==1){
					fishfeedback.dispatchMessage(b);
				}
				if (QxTalking==1){
					whipser.dispatchMessage(b);
				}
				if (escapeTrigger==1){
					escape.dispatchMessage(b);
				}
				if (onekillTrigger==1){
					onekill.dispatchMessage(b);
				}
				if(fanjiTrigger==1){
					combat.dispatchMessage(b);
				}
				if (kuafuTrigger==1){
					kuafu.dispatchMessage(b);
				}
				if (tianjianTrigger==1){
					tianjian.dispatchMessage(b);
				}/*
				if (Debug==1){
					debugm.dispatchMessage(b);
				}*/
				if (killerTrigger==1){
					killing.dispatchMessage(b);
				}
				if (GodMode==1){
					godview.dispatchMessage(b);
				}/*
                if (permission==0){
					allowed.dispatchMessage(b);
				}*/

			}
		};
		attach();

	})(window);