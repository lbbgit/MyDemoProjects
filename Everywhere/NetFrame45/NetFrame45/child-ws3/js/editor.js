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
      //==================�����ʼ�� Showbo.Chat.bd����
      Showbo.Chat.bd=doc.body;
      this.initEvent(doc);
    }catch(e){alert(e)}
  },
  initEvent:function(doc){
     if(Showbo.IsIE){//=====================IE===================
       var me=this; 
       doc.onclick=function(){me.hide();}
       doc.onkeydown=function(){
         e=me.editor.event;//ע�������ȡ����iframe�е��¼�����         
         if(e.keyCode==13){
            e.returnValue=false;
            e.keyCode=0;
            if(e.ctrlKey){Showbo.Chat.send();return false;}
            //��ieʱ�س�����<p>���滻Ϊ<br>.ff������<br>�����Բ���Ҫ����س�
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
          setTimeout("Showbo.Chat.send()",50);//��ff������ʹ��alert��ʾʱ��Ȼ�������ع��ߣ����.
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
    //����ie�ж����Ƿ���editor��
    this.saveRange();
    var p,cls=o.className.split(' ')[0],pop=Showbo.$(this.popId[cls]);
    if(cls=='upload'){
      p=Showbo.getAbsPos(this.container);
      pop.style.width=this.container.offsetWidth+'px';
      pop.style.height=this.container.offsetHeight+'px';
    }else{
      p=Showbo.getAbsPos(o,{y:o.offsetHeight});      
      if(cls.indexOf('color')!=-1)pop.setAttribute('cmd',cls=='color'?'ForeColor':(Showbo.IsIE?'BackColor':'hilitecolor'));//ff�ı���ɫ��hilitecolor
    }
    pop.style.left=p.x+'px';pop.style.top=p.y+'px';
    pop.style.display="block";
  },
  prompt:function(tl,tag){
    this.hide();
    //����ie�ж����Ƿ���editor��
    this.saveRange();
    var v=window.prompt(tl,tag=='email'?'':'http://');
    if(v&&v!=null)v=Showbo.Trim(v);
    if(v!=null&&v!=''&&v!='http://')this.format(tag=="email"?"CreateLink":tag,tag=="email"?"mailto:"+v:v);
  },
  render:function(cfg){
    this.container=Showbo.$(cfg.id);
    if(!this.container)throw("δָ������");
    this.v=cfg.initId?Showbo.$(cfg.initId).innerHTML:'';
    var editorCfg=[{cls:'size',tl:'�����С',e:'showPopUp(this)'},{cls:'family',tl:'����',e:'showPopUp(this)'}
    ,{cls:'color',tl:'������ɫ',e:'showPopUp(this)'},{cls:'bcolor',tl:'������ɫ',e:'showPopUp(this)'},{cls:'line'}
    ,{cls:'bold',tl:'����',e:'format(\'Bold\')'},{cls:'italic',tl:'б��',e:'format(\'Italic\')'}
    ,{cls:'underline',tl:'�»���',e:'format(\'Underline\')'},{cls:'strikethrough',tl:'ɾ����',e:'format(\'StrikeThrough\')'},{cls:'line'}
    ,{cls:'url',tl:'���볬����',e:'prompt(\'�����볬���ӵ�ַ\',\'CreateLink\')'}
    ,{cls:'email',tl:'��������ʼ���ַ',e:'prompt(\'����������ʼ���ַ\',\'email\')'}
    ,{cls:'image',tl:'����ͼƬ',e:'prompt(\'������ͼƬ��ַ\',\'InsertImage\')'},{cls:'line'}
    ,{cls:'left',tl:'�����',e:'format(\'JustifyLeft\')'}
    ,{cls:'center',tl:'���ж���',e:'format(\'JustifyCenter\')'}
    ,{cls:'right',tl:'�Ҷ���',e:'center',e:'format(\'JustifyRight\')'},{cls:'line'}
    ,{cls:'number',tl:'��������',e:'center',e:'format(\'InsertOrderedList\')'}
    ,{cls:'disc',tl:'��������',e:'center',e:'format(\'InsertUnorderedList\')'}],i,html='<div class="editortools" id="editortools">';
    
    for(i=0;i<editorCfg.length;i++) html+='<input '+(editorCfg[i].tl?'title="'+editorCfg[i].tl+'"':'')+'type="button" value="" class="'+editorCfg[i].cls+'"'+(editorCfg[i].e?' onclick="Showbo.Editor.'+editorCfg[i].e+'"':'')+'></button>';
    html+='</div>';
    html+='<div class="editortxt"><iframe ID="HtmlEditor" name="HtmlEditor" '
        +(cfg.height?' style="height:'+cfg.height+'px"':'')
        + 'frameBorder="0" marginheight="0" marginwidth="0" src="about:blank" onload="Showbo.Editor.setEditable()"></iframe></div>';
    //font-size
    var sizeCfg=[{s:'С',v:1},{s:'��',v:2},{s:'��',v:4},{s:'�ϴ�',v:5},{s:'���',v:6}];
    html+='<div class="editorpop htmlfs" id="editorFontSizeEditor"><ul>';
    for(i=0;i<sizeCfg.length;i++)html+='<li onclick="Showbo.Editor.format(\'FontSize\','+sizeCfg[i].v+')"><font size="'+sizeCfg[i].v+'">'+sizeCfg[i].s+'</font></li>';
    html+='</ul></div>';
    //font-family
    var familyCfg=['����','����','����_GB2312','���Ĳ���',' �����п�','��Բ','Arial','Arial Black','Times New Roman','Verdana'];
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
        +'<input type="button" class="btn" value="ȷ��" onclick="Showbo.Editor.setColor(this.parentNode.parentNode.parentNode.getAttribute(\'cmd\'))"/></li></ul></div>';
    this.container.innerHTML=html;
    this.editor=Showbo.$('HtmlEditor',true);
    var sp=Showbo.$s(Showbo.$('editortools'),'input');
    for(var i=0;i<sp.length;i++)if(sp[i].className!='line')sp[i].onmouseover=sp[i].onmouseout=this.mouseEvt;
  }
};