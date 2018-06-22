//用来接收页面的详细的错误内容
//创建请求对象 
function createRequest()
{
    try {
        request = new XMLHttpRequest();
    }
    catch (tryMs)
    {
        try {
            request = new ActiveXObject("MsXml2.XMLHTTP");
        }
        catch (otherMs)
        {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (failed)
            {
                request = null;
            }
        }
    }
    return request;
}
///获得触发事件的对象
///用来处理多个事件处理程序中IE不支持this为触发事件的对象
function getActiveObject(e)
{
    var obj;
    if (!e)  // 较早版本的IE 不会发送这样一个对象 
    {
        obj = window.event.srcElement;
    }
    else if (e.srcElement)  //IE 7 或者之后的版本
    {
        obj = e.srcElement;
    }
    else {
        obj = e.target; //DOM Level 2 浏览器 通过所传入事件的target属性提供当前对象
    }
    return obj;
}
//适用于所有浏览器的事件监听  一个对象绑定多个事件处理程序
function addEventHandler(obj, eventName, handler)
{
    if (document.attachEvent) //IE 支持 
    {
        obj.attachEvent("on" + eventName, handler);
    }
    else if (document.addEventListener)  //DOM Level 2浏览器支持
    {
        obj.addEventListener(eventName, handler, false);
    }
}
//显示用户输入数据的不合法原因 field 控件对象 warningType是在userRegister中 
function warn(field, waringType) {
    var parentNode = field.parentNode; //获取当前对象的父节点 
    //用eval计算json数据的值（如warnings.userName.required在userRegister.js中指示为用户名不得为空）  取得错误提示内容
    var warning = eval("warnings." + field.id + "." + waringType);
    //判断父节点下面的p元素是否存在，p元素是用来显示错误的，如果不存在，则生成p元素到该父节点下。
    if (parentNode.getElementsByTagName("p").length == 0) {
        var p = document.createElement("p");
        field.parentNode.appendChild(p);
        var warningNode = document.createTextNode(warning); 
        p.appendChild(warningNode);
    }
        //如果已经存在，则更新当前错误内容
    else {
        var p = parentNode.getElementsByTagName("p")[0]; 
        p.childNodes[0].nodeValue = warning; //p的childNodes[0]代表p的第一个子节点即文本节点，文本节点的nodeValue即为文本值
    }
}
//取消显示错误内容
function unwarn(field,warningType)
{
    //判断当前p元素存在不存在，若存在进行移除
    if (field.parentNode.getElementsByTagName("p").length > 0)
    {
        var p=field.parentNode.getElementsByTagName("p")[0]; //获取显示错误内容的p元素
        var currentWarning=p.childNodes[0].nodeValue;
        var warning = eval('warnings.' + field.id + "." + warningType);
        if (currentWarning == warning) //如果当前p元素的错误内容和应该显示的错误内容匹配，则移除该错误内容
        {
            field.parentNode.removeChild(p);
        }
    }
}


//判断对象是否为数组
function isArray(arg)
{
    if (typeof arg == 'object')
    {
        var criteria = arg.constructor.toString().match(/array/i); //这里i 用来说明不区分大小写，如果是数组，constructor中包含array
        return (criteria != null);
    }
    return false;
}
//判断输入控件的值是否为空 
//这里的e参数 如果不传值得话，默认是事件对象，通过这个事件对象，可以获得触发事件的对象
function fieldIsFilled(e)
{
    var me = getActiveObject(e); //获取触发事件的对象 
    if (me.value == "") {
        //display an error
        warn(me, "required");
    }
    else {
        //cancle display error
        unwarn(me, "required");
    }
}
function fieldIsNull(obj)
{
    if (obj.value == "") {
        //display an error
        warn(obj, "required");
    }
    else {
        //cancle display error
        unwarn(obj, "required");
    }
}
//检测邮箱是否规范
function emailIsProper(e)
{
    var me = getActiveObject(e);
    if (!(/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/).test(me.value)) {
        //dispaly an error
        warn(me, "format");
    }
    else {
        //cancle display an error
        unwarn(me, "format");
    }
}
//检测是否为字母
function fieldIsLetters(e)
{
    var me = getActiveObject(e);
    var nonAlphaChars = /[^a-zA-Z]/; //判断字符是不是全为字母，不区分大小写
    if (nonAlphaChars.test(me.value)) {

    }
    else {
    }
}
//检测是否为数字
function fieldIsNumbers(e)
{
    var me = getActiveObject(e);
    var nonNumbers = /[^0-9]/;
    if (nonNumbers.test(me.value))
    { }
    else
    { }
}
//限制长度
function LengthLimit(e,minLength,maxLength)
{
    var me = getActiveObject(e).value.length;
    
}


//检测浏览器是否支持WebSocket
function IsSupportWebSocket() {
    var supported = ("WebSocket" in window);
    if (supported) {
        alert("WebSockets are supported");
    }
}

//检测浏览器是否支持HTML5 文件API
function IsSupportFile() {
    if (window.File && window.FileReader && window.FileList) {
        alert("support file html5");
    }
}
function outPutMessage(message)
{
    var obj=getActiveObject(event);
    var p =document.createElement("p");
    p.innerHTML = message;
    var flag = false;
    if (obj) {
        if (obj.parentNode) {
            if (obj.parentNode.appendChild) {
                obj.parentNode.appendChild(p);
                flag = true;
            }
            else {
                if (obj.appendChild)
                {
                    obj.appendChild(p);
                    flag = true;
                }
            }
        }
    }
    if(flag==false) {
        var obj = document.getElementsByTagName("body")[0];
    //    obj.insertBefore(p, this.firstChild);
        obj.insertBefore(p, obj.firstChild);
       
    }
}