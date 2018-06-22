/// <reference path="jquery-1.8.2.js" />
/// <reference path="util.js" />
var socket;
$(function ($) {
    $("body").keydown(getKeyBoard);
    $("#btnSend").click(sendSocketMessage);
    socket = new WebSocket("ws://localhost:13458/Socket/SocketHandler.ashx");
    socket.onopen = function () {
        outPutMessage("socket已经建立连接<br/>");
    }
    socket.onmessage = function (data) {
        outPutMessage("<br/>server message:"+data.data);
    }
    socket.onclose = function () {
        outPutMessage("socket close");
    }
    socket.onerror=function(event){
        outPutMessage(event.message);
    }
        var input = $("input[type=file]");
        input.change(
            function () {
                var files = this.files;
                for (var i = 0; i < files.length; i++) {
                    var p = $("<p />");
                    var output = i + "name:" + files[i].name + " size:" + files[i].size + " type:" + files[i].type + "<br/>";
                    p.html(output);
                    var obj = "#main";
                    $(obj).append(p);
                }
            }
            );
})
//获取键盘
function getKeyBoard(event) {
    if (event) {
        if (event.keyCode == 13)
        {
            sendSocketMessage();
        }
        return;
        var div = $("<div/>")

        if (event.ctrlKey)
        {
            div.html("this is ctrl<br/>");
        }
        if (event.altKey)
        {
            div.html("this is alt<br/>");
        }
        if (event.shiftKey)
        {
            div.html("this is shift<br/>");
        }
        if (event.which)
        {
            div.html(div.html()+"unicode:"+event.which);
        }
        
        $("body").prepend(div);
    }
}

function sendSocketMessage()
{
    if (socket.readyState == WebSocket.OPEN) {
        var msg = $("#txtMsg").val();
        socket.send(msg);
    }
    else {
        outPutMessage("socket 连接失败");
    }
}