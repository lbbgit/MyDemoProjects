/// <reference path="jquery-1.8.2.js" />
/// <reference path="util.js" />
var socket;
var isSocketConnect = false;

$(function ($) {
    $("#btnSend").click(sendSocketMessage);
    $("#btnWs").click(socketConnect);
    $("#txtMsg").keydown(getEnterKeyEvent);  //消息框里输入回车后，发送消息到服务端
})
//建立socket连接
function socketConnect() {
    if (isSocketConnect && (socket.readyState == 1 || socket.readyState == 0)) {
        sendSocketMessage(event, "离开聊天室");
        socket.close();
        $("#btnWs").val("连接");
        // $("#btnWs").ena
        return;
    }
    try {
        if ("WebSocket" in window) {   //判断浏览器是否支持WebSocket
            socket = new WebSocket("ws://localhost:13458/Socket/SocketHandler.ashx"); //socket连接服务端地址
        }
    }
    catch (ex) {
        log("您的浏览器不支持WebSocket，请切换到更高版本 或用chrome firefox");
        return;
    }

    //相应的socket事件 
    //socket建立连接
    socket.onopen = function () {
        //连接成功，将消息广播出去
        isSocketConnect = true;
        $("#btnWs").val("断开");
        sendSocketMessage(Event, "进入聊天室");
    }
    //socket得到服务端广播的消息
    socket.onmessage = function (event) {
        Log(event.data);
    }
    //socket连接关闭
    socket.onclose = function () {
        Log("socket closed!");
    }
    //socket连接出现错误
    socket.onerror = function (event) {
        Log("socket connect error");
    }
}
//获取键盘
function getEnterKeyEvent(event) {
    if (event) {
        if (event.keyCode == 13) {
            sendSocketMessage();
        }
    }
}

function sendSocketMessage(event, msg) {
    if (socket.readyState == WebSocket.OPEN) {
        if ($("#txtMsg").val() == "") {
            if (!msg) {
                return; //空文本不发送消息
            }
        }
        //如果未输入用户名，根据当前时间生成游客昵称
        if ($("#userName").val() == "") {
            var d = new Date();
            $("#userName").val("游客" + d.getMinutes() + "_" + d.getSeconds() + "_" + d.getMilliseconds());
        }
        if (!msg) {
            msg = "" + $("#userName").val() + "：" + "<div class='divChat'>" + $("#txtMsg").val() + "</div>";
        }
        else {
            msg = "" + $("#userName").val() + " " + msg;
        }
        socket.send(msg);
        $("#txtMsg").val(""); //清空已输入的数据
        $("#txtMsg").focus();
    }
    else {
        Log("socket 连接失败");
    }
}
//将消息显示到对话框
function Log(msg) {
    var div = document.getElementById("msgContainer");
    msg = "<div class='message'>" + msg + "</div>";
    msg = div.innerHTML + msg;
    div.innerHTML = msg;
    div.scrollTop = div.scrollHeight;
}