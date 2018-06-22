Showbo.Editor={
  popId:{size:'editorFontSizeEditor',bcolor:'editorFontColorEditor',color:'editorFontColorEditor',family:'editorFontFamilyEditor'},
  editor:null,
  ieRange:null,
  container:null,
  v:null,
  mouseEvt:function(e){e=e||event;this.className=this.className.split(' ')[0]+' '+e.type;},
  setEditable:function(){
    try{
      var doc=this.editor.document;
      if(doc.body){
        doc.body.style.fontSize='14px';
        doc.body.style.fontFamily="verdana";
        doc.body.style.margin="4px";
      }
      doc.designMode="On";
      if(Showbo.IsIE)doc.contentEditable="True";
      //==================这里初始化 Showbo.Chat.bd对象
      Showbo.Chat.bd=doc.body;
      this.initEvent(doc);
    }catch(e){alert(e)}
  },
  initEvent:function(doc){
     if(Showbo.IsIE){//=====================IE===================
       var me=this; 
       doc.onclick=function(){me.hide();}
       doc.onkeydown=function(){
         e=me.editor.event;//注意这里获取的是iframe中的事件对象         
         if(e.keyCode==13){
            e.returnValue=false;
            e.keyCode=0;
            if(e.ctrlKey){Showbo.Chat.send();return false;}
            //在ie时回车生成<p>，替换为<br>.ff下生成<br>，所以不需要处理回车
	        var r=this.selection.createRange();
	        r.pasteHTML("<br>");
            r.select();
         }
       }
     }
     else doc.addEventListener('keydown',function(e){
        if(e.ctrlKey&&e.keyCode==13){
          e.preventDefault();
          e.stopPropagation();
          setTimeout("Showbo.Chat.send()",50);//在ff中马上使用alert提示时尽然弹出下载工具，奇怪.
          return false;}
       },false);
  },
  format:function(tag,param){
    this.hide();
    if(this.ieRange){
        if(tag=="paste")this.ieRange.pasteHTML(param);
        else this.ieRange.execCommand(tag,false,param);
        this.ieRange.select();
        this.ieRange=null;
    }
    else{
     this.editor.focus();
     if(tag=="paste"){
        if(Showbo.IsIE)this.editor.document.selection.createRange().pasteHTML(param);
        else{
           var oSel = this.editor.getSelection(),oRange = oSel.getRangeAt(0),oFragment = oRange.createContextualFragment(param),oLastNode = oFragment.lastChild ; 
           oRange.insertNode(oFragment) ; 
           oRange.setEndAfter( oLastNode ) ; 
           oRange.setStartAfter( oLastNode ) ; 
           oSel.removeAllRanges() ; 
           oSel = this.editor.getSelection(); 
           oSel.addRange( oRange ) ;
        }
     }
     else this.editor.document.execCommand(tag,false,param);
    }
  },
  setColor:function(tag){
    var o=Showbo.$('txteditorColor');
    if(!/^[0-9a-f]{6}$/i.test(o.value)){o.select();return false;}
    this.format(tag,'#'+o.value);
  },
  saveRange:function(){if(Showbo.IsIE){this.ieRange=this.editor.document.selection.createRange();var p=this.ieRange.parentElement();if(p.tagName=="INPUT"||p==document.body)this.ieRange=null;}},
  hide:function(){for(var attr in this.popId)Showbo.$(this.popId[attr]).style.display='none';},
  showPopUp:function(o){
    this.hide();
    //这里ie判断下是否在editor里
    this.saveRange();
    var p,cls=o.className.split(' ')[0],pop=Showbo.$(this.popId[cls]);
    if(cls=='upload'){
      p=Showbo.getAbsPos(this.container);
      pop.style.width=this.container.offsetWidth+'px';
      pop.style.height=this.container.offsetHeight+'px';
    }else{
      p=Showbo.getAbsPos(o,{y:o.offsetHeight});      
      if(cls.indexOf('color')!=-1)pop.setAttribute('cmd',cls=='color'?'ForeColor':(Showbo.IsIE?'BackColor':'hilitecolor'));//ff的背景色是hilitecolor
    }
    pop.style.left=p.x+'px';pop.style.top=p.y+'px';
    pop.style.display="block";
  },
  prompt:function(tl,tag){
    this.hide();
    //这里ie判断下是否在editor里
    this.saveRange();
    var v=window.prompt(tl,tag=='email'?'':'http://');
    if(v&&v!=null)v=Showbo.Trim(v);
    if(v!=null&&v!=''&&v!='http://')this.format(tag=="email"?"CreateLink":tag,tag=="email"?"mailto:"+v:v);
  },
  render:function(cfg){
    this.container=Showbo.$(cfg.id);
    if(!this.container)throw("未指定容器");
    this.v=cfg.initId?Showbo.$(cfg.initId).innerHTML:'';
    var editorCfg=[{cls:'size',tl:'字体大小',e:'showPopUp(this)'},{cls:'family',tl:'字体',e:'showPopUp(this)'}
    ,{cls:'color',tl:'字体颜色',e:'showPopUp(this)'},{cls:'bcolor',tl:'背景颜色',e:'showPopUp(this)'},{cls:'line'}
    ,{cls:'bold',tl:'粗体',e:'format(\'Bold\')'},{cls:'italic',tl:'斜体',e:'format(\'Italic\')'}
    ,{cls:'underline',tl:'下划线',e:'format(\'Underline\')'},{cls:'strikethrough',tl:'删除线',e:'format(\'StrikeThrough\')'},{cls:'line'}
    ,{cls:'url',tl:'插入超链接',e:'prompt(\'请输入超链接地址\',\'CreateLink\')'}
    ,{cls:'email',tl:'插入电子邮件地址',e:'prompt(\'请输入电子邮件地址\',\'email\')'}
    ,{cls:'image',tl:'插入图片',e:'prompt(\'请输入图片地址\',\'InsertImage\')'},{cls:'line'}
    ,{cls:'left',tl:'左对齐',e:'format(\'JustifyLeft\')'}
    ,{cls:'center',tl:'居中对齐',e:'format(\'JustifyCenter\')'}
    ,{cls:'right',tl:'右对齐',e:'center',e:'format(\'JustifyRight\')'},{cls:'line'}
    ,{cls:'number',tl:'有序排列',e:'center',e:'format(\'InsertOrderedList\')'}
    ,{cls:'disc',tl:'无序排列',e:'center',e:'format(\'InsertUnorderedList\')'}],i,html='<div class="editortools" id="editortools">';
    
    for(i=0;i<editorCfg.length;i++) html+='<input '+(editorCfg[i].tl?'title="'+editorCfg[i].tl+'"':'')+'type="button" value="" class="'+editorCfg[i].cls+'"'+(editorCfg[i].e?' onclick="Showbo.Editor.'+editorCfg[i].e+'"':'')+'></button>';
    html+='</div>';
    html+='<div class="editortxt"><iframe ID="HtmlEditor" name="HtmlEditor" '
        +(cfg.height?' style="height:'+cfg.height+'px"':'')
        + 'frameBorder="0" marginheight="0" marginwidth="0" src="about:blank" onload="Showbo.Editor.setEditable()"></iframe></div>';
    //font-size
    var sizeCfg=[{s:'小',v:1},{s:'中',v:2},{s:'大',v:4},{s:'较大',v:5},{s:'最大',v:6}];
    html+='<div class="editorpop htmlfs" id="editorFontSizeEditor"><ul>';
    for(i=0;i<sizeCfg.length;i++)html+='<li onclick="Showbo.Editor.format(\'FontSize\','+sizeCfg[i].v+')"><font size="'+sizeCfg[i].v+'">'+sizeCfg[i].s+'</font></li>';
    html+='</ul></div>';
    //font-family
    var familyCfg=['宋体','黑体','楷体_GB2312','华文彩云',' 华文行楷','幼圆','Arial','Arial Black','Times New Roman','Verdana'];
    html+='<div class="editorpop editorcode" id="editorFontFamilyEditor"><ul>';
    for(i=0;i<familyCfg.length;i++)html+='<li style="font-family:'+familyCfg[i]+'" onclick="Showbo.Editor.format(\'FontName\',\''+familyCfg[i]+'\')">'+familyCfg[i]+'</li>';
    html+='</ul></div>';
    //font-color
    var colorCfg=['000000','993300','333300','003300','003366','000080','333399','333333',
                  '800000','ff6600','808000','008000','008080','0000ff','666699','808080',
                  'ff0000','ff9900','99cc00','339966','33cccc','cc66ff','800080','999999',
                  'ff00ff','ffcc00','ffff00','00ff00','00ffff','00ccff','993366','c0c0c0',
                  'ff99cc','ffcc99','ffff99','ccffcc','ccffff','99ccff','cc99ff','ffffff'];
    html+='<div class="editorpop editorcolor" id="editorFontColorEditor"><ul>';
    for(i=0;i<colorCfg.length;i++)html+='<li onclick="Showbo.Editor.format(this.parentNode.parentNode.getAttribute(\'cmd\'),\'#'+colorCfg[i]+'\')" style="background-color:#'+colorCfg[i]+'"></li>';
    html+='<li class="input"><input maxlength="6" class="txt" id="txteditorColor"/>'
        +'<input type="button" class="btn" value="确定" onclick="Showbo.Editor.setColor(this.parentNode.parentNode.parentNode.getAttribute(\'cmd\'))"/></li></ul></div>';
    this.container.innerHTML=html;
    this.editor=Showbo.$('HtmlEditor',true);
    var sp=Showbo.$s(Showbo.$('editortools'),'input');
    for(var i=0;i<sp.length;i++)if(sp[i].className!='line')sp[i].onmouseover=sp[i].onmouseout=this.mouseEvt;
  }
};