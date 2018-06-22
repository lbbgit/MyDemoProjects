var Showbo={author:'showbo',homepage:'http://www.code-design.cn'};
Showbo.IsIE=!!document.all;
Showbo.IsFireFox=navigator.userAgent.indexOf("Firefox")!=-1;
Showbo.trim=function(v,reg){if(reg)return v.replace(reg,'');else   return v.replace(/^\s*|\s*$/,'');}
Showbo.getJson=function(v){return eval('('+v+')');}
//获取某个对象的绝对位置
Showbo.getAbsPos=function(o,addXY){o=Showbo.$(o);var p=new Object();p.x=o.offsetLeft;p.y=o.offsetTop;while(o=o.offsetParent){p.x+=o.offsetLeft;p.y+=o.offsetTop;}if(addXY){if(!isNaN(addXY.x))p.x+=addXY.x;if(!isNaN(addXY.y))p.y+=addXY.y;}return p;}
Showbo.$=function(Id,isFrame){
  var o;
  if("string"==typeof(Id))o= document.getElementById(Id);
  else if("object"==typeof(Id))o= Id;
  else return null;
  return isFrame?(Showbo.IsIE?document.frames[Id]:o.contentWindow):o;
}
Showbo.$s=function(){
   var o,tag;
   if(arguments.length==1){
      o=document;tag=arguments[0];
    }
    else{
      o=arguments[0];tag=arguments[1];
    }
    return o.getElementsByTagName(tag);
}
//扩展IE下的XMLHttpRequest
if(Showbo.IsIE&&!window.XMLHttpRequest)
window.XMLHttpRequest=function(){
  var acX=['msxml2.xmlhttp.5.0','msxml2.xmlhttp.4.0','msxml2.xmlhttp.3.0','msxml2.xmlhttp','microsoft.xmlhttp'],Xhr;
  for(var i=0;i<acX.length;i++)try{Xhr=new ActiveXObject(acX[i]);return Xhr;}catch(e){}return false;
}
Showbo.Ajax={
  pools:[]//注意pools存储的对象为{xhr:ajax对象,status:ajax的状态}，其中ajax的状态为1/0，1表示在使用中，0表示readyState==4了并且执行了回调函数
  ,getObject:function(){
     for(var i=0;i<this.pools.length;i++)if(this.pools[i].status===0){
       this.pools[i].status=1;//设置为使用状态
       this.pools[i].xhr.onreadystatechange=function(){}//删除状态转换函数
       this.pools[i].xhr.abort();//调用abort
       return this.pools[i];
     }
     var xhr=new XMLHttpRequest();
     if(xhr.readyState==null){//更正某些Mozilla浏览器无readyState的问题
       xhr.readyState=0;
       xhr.addEventListener("load",function(){
         xhr.readyState=4;
         if(typeof(xhr.onreadystatechange)=="function")xhr.onreadystatechange();
       },false);
     }
     this.pools[this.pools.length]={xhr:xhr,status:1,err:false};
     return this.pools[this.pools.length-1];
  }
  ,send:function(cfg){
     if(!cfg||!cfg.url)throw("url不正确！");
     var method=cfg.method,asy="boolean"==typeof(cfg.asy)?cfg.asy:true;
     if(!method)method="get";
     if(method.toLocaleLowerCase()=='get'){
         var _dc=new Date().getTime();
         cfg.params=cfg.params?cfg.params+'&_dc='+_dc:'_dc='+_dc;
         if(cfg.url.indexOf("?")!=-1)cfg.url+="&"+cfg.params;
         else cfg.url+="?"+cfg.params;
         cfg.params=null;
     }
     else if(typeof(cfg.params)=="undefined")cfg.params='';
     var o=this.getObject();//注意并非实际的xhr对象
     if(!o.xhr)throw("未能创建ajax对象！");
     o.xhr.open(method,cfg.url,asy);
     if(method.toLocaleLowerCase()=='post')o.xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");    
     o.xhr.onreadystatechange=function(){
       if(o.xhr.readyState==4){
          if(o.xhr.status==200||o.xhr.status==0){
            if("function"==typeof(cfg.success))cfg.success(o.xhr,cfg.otherParams);            
          }
          else if("function"==typeof(cfg.failure))cfg.failure(o.xhr,cfg.otherParams);
          o.status=0;//=============更改状态为未使用
       }
     }
     o.xhr.send(cfg.params);
  }
}
var RequstUrl="op.ashx";//================================为不同的编程语言时修改这个变量的值

Showbo.Chat={
  hint:false//如果有信息到来，是否提示用户
  ,UserId:-1//服务器返回的用户Id
  ,UserKey:-1//服务器返回的用户键
  ,bd:null//编辑器的document.body对象
  ,ct:null//显示信息的div
  ,selTo:null//用户select
  //下面这两个读取时间需要分开，最好不要设置为同样的，要不两个计时器会同时执行，导致获取对象时同时进入for语句获取到同一个对象，导致firefox可能在同时使用这个对象时出错
  ,timeUser:10//获取信息的时间间隔，单位为秒
  ,timeMsg:10//获取信息的时间间隔，单位为秒
  ,nowUserId:-1//如果选择了点对点对话，此对象存储的是该用户的id，初始化在线用户时用到
  ,timerUsers:null
  ,timerMsg:null
  ,chrHint:function(o){
    o.value=this.hint?'启用信息提示':'关闭信息提示';
    this.hint=!this.hint;
  }
  ,setNote:function(msg){ Showbo.$('dvOpNote').innerHTML=msg;}
  ,setBtn:function(disabled){Showbo.$('btnLT').disabled=Showbo.$('btnSend').disabled=disabled;}
  ,addItemToCT:function(msg){var d=document.createElement('div');d.innerHTML+=msg;this.ct.appendChild(d);}
  ,callback:function(xhr,op){
   var o=xhr.status==200?Showbo.getJson(xhr.responseText):{success:false,err:'动态页发生严重错误，请联系管理员！'+xhr.responseText};
   this.setNote('');
   this.setBtn(false);
   Showbo.$('dvWait').style.display='none';
   Showbo.$('frmLogin').style.display='block';
   if(o.success){
     switch(op){
       case 'login':
         Showbo.$('dvLogin').style.display='none';
         Showbo.$('dvChat').style.display='block';
         this.ct=Showbo.$('dvMsg');this.selTo=Showbo.$('selContacts');
         Showbo.Editor.render({id:'editor',height:100});
         //成功登录，设置用户id和键，并且启动读用户列表和信息的计时器，并初始化编辑器
         this.UserId=o.UserId;this.UserKey=o.Key;         
         this.read('read');
         this.timerMsg=setInterval("Showbo.Chat.read('read')",this.timeMsg*1000);
         this.read('readuser');
         this.timerUsers=setInterval("Showbo.Chat.read('readuser')",this.timeUser*1000);
         break;
       case 'logout': 
         Showbo.$('dvLogin').style.display='block';
         Showbo.$('dvChat').style.display='none';
         this.ct.innerHTML='';
         this.UserId=this.UserKey=-1;
         clearInterval(this.timerUsers);clearInterval(this.timerMsg);
         this.timerUsers=this.timerMsg=null;this.nowUserId=-1;
         break;
       case 'say':
         var who=this.selTo.value=='-1'?'':this.selTo.options[this.selTo.selectedIndex].text,v=this.bd.innerHTML;
         v=v.replace(/^<p>|<\/p>$/gi,'');
         this.addItemToCT('<span class="from">我</span>'+(who?'对<span class="to">'+who+'</span>':'')+'说：'+v);
         this.bd.innerHTML=Showbo.IsIE?'':'&nbsp;';
         if(this.ct.scrollHeight>this.ct.offsetHeight)this.ct.scrollTop=this.ct.scrollHeight-this.ct.offsetHeight;
         break;
       case 'readuser':this.initSel(o.data);break;
       case 'read':this.initMsgList(o.data);break;
     }
   }
   else alert(o.err);
  }
  ,Login:function(f){
    if(Showbo.trim(f.nn.value)==''){alert('昵称不能为空！');f.nn.select();return false;}
    else if(f.nn.value.length>20){alert('昵称不能超过20个字符！');f.nn.select();return false;}
    Showbo.$('dvWait').style.display='block';
    f.style.display='none';
    var me=this;
    Showbo.Ajax.send({url:RequstUrl,method:'post',params:'nn='+encodeURIComponent(f.nn.value)+'&op=login',otherParams:'login'
    ,success:function(p1,p2){me.callback(p1,p2);},failure:function(p1){me.callback(p1);}});
    return false;
  }
  ,Logout:function(needConfirm){
    var me=this;
    if(needConfirm&&!confirm('确认退出？！'))return false;
    this.setNote('正在退出，请等待...');
    this.setBtn(true);
     Showbo.Ajax.send({
        url:RequstUrl,method:'post',params:'op=logout&uid='+this.UserId+'&key='+this.UserKey,otherParams:'logout'
        ,success:function(p1,p2){me.callback(p1,p2);},failure:function(p1){me.callback(p1);}
      });
  }
  ,read:function(op){
    var me=this;
    Showbo.Ajax.send({
        url:RequstUrl,method:'post',params:'op='+op+'&uid='+this.UserId+(op=='readuser'?'':'&key='+this.UserKey),otherParams:op
        ,success:function(p1,p2){me.callback(p1,p2);},failure:function(p1){me.callback(p1);}
    });
  }
  ,initSel:function(arr){
    if(this.UserId==-1)return false;
    this.selTo.options.length=1;
    var i=0,selIndex=0,len=arr.length;
    for(;i<len;i++){
      this.selTo.options.add(new Option(arr[i].nn,arr[i].id));
      if(arr[i].id==this.nowUserId)selIndex=i+1;
    }
    this.selTo.selectedIndex=selIndex;
  }
  ,initMsgList:function(arr){
    if(this.UserId==-1)return false;
    if(arr.length==0)return false;
    for(var i=0;i<arr.length;i++)this.addItemToCT(arr[i]);
    if(this.hint)window.focus();
    if(this.ct.scrollHeight>this.ct.offsetHeight)this.ct.scrollTop=this.ct.scrollHeight-this.ct.offsetHeight;
  }
  ,send:function(){//发送信息
     var v=this.bd.innerHTML.replace(/<\/?p>/gi,'');
     if(Showbo.trim(Showbo.trim(v),/<br\s*\/?>|&nbsp;/gi,'')==''){
       alert('发送的信息不能为空！');
       this.bd.innerHTML=Showbo.IsIE?'':'&nbsp;';
       Showbo.$('HtmlEditor',true).focus();
       return false;
     }
     v=Showbo.trim(v,/^(<br\s*\/?>)*|(<br\s*\/?>)*$/gi);
     this.setNote('正在发送信息，请等待...');
     this.setBtn(true);
     var me=this;
     Showbo.Ajax.send({url:RequstUrl,method:'post'
        ,params:'op=say&from='+this.UserId+'&key='+this.UserKey+'&to='+this.selTo.value+'&ct='+encodeURIComponent(v),otherParams:'say'
        ,success:function(p1,p2){me.callback(p1,p2);},failure:function(p1){me.callback(p1);}
     });
  }
};

window.onload=function(){Showbo.$('frmLogin').nn.focus();}
window.onbeforeunload=function(e){e=e||event;if(Showbo.Chat.UserId!=-1)e.returnValue='确认退出聊天室？！';}
window.onunload=function(){if(Showbo.Chat.UserId!=-1)Showbo.Chat.Logout(false);}//如果登录了系统，离开当前页面时将注销