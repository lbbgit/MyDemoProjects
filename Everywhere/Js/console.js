console.log('console.js loaded!')

function loadjscssfile(filename,filetype){ 
    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
    
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    } 
}

loadJs=function(){
	var ipt="console";
	while(ipt){
		ipt=prompt('Load Js'); 
		loadjscssfile(ipt+".js","js");
	}	
}

//gm

var gameConsole={
	player:{g:15,f:5,hp:20},
	enemy:{g:20,f:15,hp:5},
	fight:function(){ 
		log(player,'player');
		log(enemy,'enemy');
		attack(player,enemy);
		
		log(player,'player');
		log(enemy,'enemy');
		
		attack(enemy,player);
		
		log(player,'player');
		log(enemy,'enemy');
	},
	attack:function(a,b){
		b.hp-=a.g-b.f;
	},
	log:function(a,name){
		console.log(name+' hp:'+a.hp +' g:'+a.g+' f:'+a.f);
	}
}

var player=gameConsole.player;
var player=gameConsole.player; 
var enemy=gameConsole.enemy; 
var log=gameConsole.log;