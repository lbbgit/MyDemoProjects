var Showbo={author:'showbo',homepage:'http://www.code-design.cn'};
Showbo.IsIE=!!document.all;
Showbo.IsFireFox=navigator.userAgent.indexOf("Firefox")!=-1;
Showbo.trim=function(v,reg){if(reg)return v.replace(reg,'');else   return v.replace(/^\s*|\s*$/,'');}
Showbo.getJson=function(v){return eval('('+v+')');}
//��ȡĳ������ľ���λ��
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
//��չIE�µ�XMLHttpRequest
if(Showbo.IsIE&&!window.XMLHttpRequest)
window.XMLHttpRequest=function(){
  var acX=['msxml2.xmlhttp.5.0','msxml2.xmlhttp.4.0','msxml2.xmlhttp.3.0','msxml2.xmlhttp','microsoft.xmlhttp'],Xhr;
  for(var i=0;i<acX.length;i++)try{Xhr=new ActiveXObject(acX[i]);return Xhr;}catch(e){}return false;
}
Showbo.Ajax={
  pools:[]//ע��pools�洢�Ķ���Ϊ{xhr:ajax����,status:ajax��״̬}������ajax��״̬Ϊ1/0��1��ʾ��ʹ���У�0��ʾreadyState==4�˲���ִ���˻ص�����
  ,getObject:function(){
     for(var i=0;i<this.pools.length;i++)if(this.pools[i].status===0){
       this.pools[i].status=1;//����Ϊʹ��״̬
       this.pools[i].xhr.onreadystatechange=function(){}//ɾ��״̬ת������
       this.pools[i].xhr.abort();//����abort
       return this.pools[i];
     }
     var xhr=new XMLHttpRequest();
     if(xhr.readyState==null){//����ĳЩMozilla�������readyState������
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
     if(!cfg||!cfg.url)throw("url����ȷ��");
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
     var o=this.getObject();//ע�Ⲣ��ʵ�ʵ�xhr����
     if(!o.xhr)throw("δ�ܴ���ajax����");
     o.xhr.open(method,cfg.url,asy);
     if(method.toLocaleLowerCase()=='post')o.xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");    
     o.xhr.onreadystatechange=function(){
       if(o.xhr.readyState==4){
          if(o.xhr.status==200||o.xhr.status==0){
            if("function"==typeof(cfg.success))cfg.success(o.xhr,cfg.otherParams);            
          }
          else if("function"==typeof(cfg.failure))cfg.failure(o.xhr,cfg.otherParams);
          o.status=0;//=============����״̬Ϊδʹ��
       }
     }
     o.xhr.send(cfg.params);
  }
}
var RequstUrl="op.ashx";//================================Ϊ��ͬ�ı������ʱ�޸����������ֵ

Showbo.Chat={
  hint:false//�������Ϣ�������Ƿ���ʾ�û�
  ,UserId:-1//���������ص��û�Id
  ,UserKey:-1//���������ص��û���
  ,bd:null//�༭����document.body����
  ,ct:null//��ʾ��Ϣ��div
  ,selTo:null//�û�select
  //������������ȡʱ����Ҫ�ֿ�����ò�Ҫ����Ϊͬ���ģ�Ҫ��������ʱ����ͬʱִ�У����»�ȡ����ʱͬʱ����for����ȡ��ͬһ�����󣬵���firefox������ͬʱʹ���������ʱ����
  ,timeUser:10//��ȡ��Ϣ��ʱ��������λΪ��
  ,timeMsg:10//��ȡ��Ϣ��ʱ��������λΪ��
  ,nowUserId:-1//���ѡ���˵�Ե�Ի����˶���洢���Ǹ��û���id����ʼ�������û�ʱ�õ�
  ,timerUsers:null
  ,timerMsg:null
  ,chrHint:function(o){
    o.value=this.hint?'������Ϣ��ʾ':'�ر���Ϣ��ʾ';
    this.hint=!this.hint;
  }
  ,setNote:function(msg){ Showbo.$('dvOpNote').innerHTML=msg;}
  ,setBtn:function(disabled){Showbo.$('btnLT').disabled=Showbo.$('btnSend').disabled=disabled;}
  ,addItemToCT:function(msg){var d=document.createElement('div');d.innerHTML+=msg;this.ct.appendChild(d);}
  ,callback:function(xhr,op){
   var o=xhr.status==200?Showbo.getJson(xhr.responseText):{success:false,err:'��̬ҳ�������ش�������ϵ����Ա��'+xhr.responseText};
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
         //�ɹ���¼�������û�id�ͼ��������������û��б����Ϣ�ļ�ʱ��������ʼ���༭��
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
         this.addItemToCT('<span class="from">��</span>'+(who?'��<span class="to">'+who+'</span>':'')+'˵��'+v);
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
    if(Showbo.trim(f.nn.value)==''){alert('�ǳƲ���Ϊ�գ�');f.nn.select();return false;}
    else if(f.nn.value.length>20){alert('�ǳƲ��ܳ���20���ַ���');f.nn.select();return false;}
    Showbo.$('dvWait').style.display='block';
    f.style.display='none';
    var me=this;
    Showbo.Ajax.send({url:RequstUrl,method:'post',params:'nn='+encodeURIComponent(f.nn.value)+'&op=login',otherParams:'login'
    ,success:function(p1,p2){me.callback(p1,p2);},failure:function(p1){me.callback(p1);}});
    return false;
  }
  ,Logout:function(needConfirm){
    var me=this;
    if(needConfirm&&!confirm('ȷ���˳�����'))return false;
    this.setNote('�����˳�����ȴ�...');
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
  ,send:function(){//������Ϣ
     var v=this.bd.innerHTML.replace(/<\/?p>/gi,'');
     if(Showbo.trim(Showbo.trim(v),/<br\s*\/?>|&nbsp;/gi,'')==''){
       alert('���͵���Ϣ����Ϊ�գ�');
       this.bd.innerHTML=Showbo.IsIE?'':'&nbsp;';
       Showbo.$('HtmlEditor',true).focus();
       return false;
     }
     v=Showbo.trim(v,/^(<br\s*\/?>)*|(<br\s*\/?>)*$/gi);
     this.setNote('���ڷ�����Ϣ����ȴ�...');
     this.setBtn(true);
     var me=this;
     Showbo.Ajax.send({url:RequstUrl,method:'post'
        ,params:'op=say&from='+this.UserId+'&key='+this.UserKey+'&to='+this.selTo.value+'&ct='+encodeURIComponent(v),otherParams:'say'
        ,success:function(p1,p2){me.callback(p1,p2);},failure:function(p1){me.callback(p1);}
     });
  }
};

window.onload=function(){Showbo.$('frmLogin').nn.focus();}
window.onbeforeunload=function(e){e=e||event;if(Showbo.Chat.UserId!=-1)e.returnValue='ȷ���˳������ң���';}
window.onunload=function(){if(Showbo.Chat.UserId!=-1)Showbo.Chat.Logout(false);}//�����¼��ϵͳ���뿪��ǰҳ��ʱ��ע��