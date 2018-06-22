/// <reference path="jquery-1.8.2.js" />
/// <reference path="util.js" />
var warnings = {
    "userName": {
        "required": "用户名不得为空",
        "IsExist": "用户名已经存在，请重新输入"
    },
    "userPwd2": {
        "required": "密码不得为空",
        "isEqual": "两次密码必须输入相同"
    },
    "userPwd": {
        "required": "密码不得为空",
    },
    "userEmail": {
        "required": "邮箱不得为空",
        "format": "邮箱格式不正确，示例：'name@domain.com'"
    },
    "register": {
        "register": ""
    }
}
window.onload = initPage;
//初始化页面时，给控件绑定事件，这里用到了多个事件处理程序，即控件会执行多个事件
function initPage() {
    //addEventHandler是监听事件  根据浏览器选择性调用addEventListener(使用chrome 火狐等)或attachEvent（适用IE）方法
    addEventHandler(document.getElementById("userName"), "blur", fieldIsFilled);  //多事件处理程序
    addEventHandler(document.getElementById("userName"), "blur", checkUserName);
    addEventHandler(document.getElementById("userPwd"), "blur", fieldIsFilled);
    addEventHandler(document.getElementById("userPwd2"), "blur", fieldIsFilled);
    addEventHandler(document.getElementById("userPwd2"), "blur", checkPwdEqual);
    addEventHandler(document.getElementById("userEmail"), "blur", emailIsProper);
    addEventHandler(document.getElementById("userEmail"), "blur", fieldIsFilled);
    document.getElementById("register").onclick = submitData;
    $(':password').prop('type', 'text');
    $(':password').attr('type', 'text');
};
//检测用户名是否重复
function checkUserName() {
    jQuery.ajax({
        url: "register/validateUsers",
        type: "GET",
        data: { "userName": $("#userName").val() },
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
            if (data == "false") {
                warn(document.getElementById("userName"), "IsExist");
            }
            if (data == "ok") {
                unwarn(document.getElementById("userName"), "IsExist");
            }
        },
        error: function (xhr, error, ex)
        {
            for (var i = 0; i < 5; i++) {
                var div = document.createElement("div");
                div.innerText = "出现错误，请稍后再试，带来不便，敬请谅解";
                document.getElementsByTagName("body")[0].appendChild(div);
            }
        }
    });
    //使用jquery 的ajax发送 请求
}
//检测密码是否相同
function checkPwdEqual() {
    var pwd1 = document.getElementById("userPwd").value;
    var pwd2 = document.getElementById("userPwd2").value;
    if (pwd1 != pwd2) {
        //show error
        warn(document.getElementById("userPwd2"), "isEqual");
    }
    else {
        //cancle show error
        unwarn(document.getElementById("userPwd2"), "isEqual");
    }

}
//提交数据
function submitData() {
    //首先验证数据合法性
    var flag = validateData();
    if (flag == false) {
        return;
    }
    var request = new userRegisterModel();
    $.ajax(
        {
            url: "Register/Register",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(request),
            //data: { "UserName": "上搜索", "UserPwd": "ss", "UserEmail": "搜索" },
            contentType: "application/json",
            success: function (data) {
                if (data.result == "success") {
                    warnings["register"]["register"] = data.content;
                    warn(document.getElementById("register"), "register");
                }
                if (data.result == "error") {
                    warnings["register"]["register"] = data.content;
                    warn(document.getElementById("register"), "register");
                }
            }
        }
        );
}
function validateData() {
    //验证是否已经填写数据
    fieldIsNull(document.getElementById("userName"));
    fieldIsNull(document.getElementById("userPwd2"));
    fieldIsNull(document.getElementById("userPwd"));
    fieldIsNull(document.getElementById("userEmail"));
    unwarn(document.getElementById("register"), "register");  //清除上次注册时的提示信息 不然验证数据会返回false
    var fieldSets = document.getElementsByTagName("fieldset");  //注册页面的控件在fieldset中
    for (var i = 0; i < fieldSets.length; i++) {
        var p = fieldSets[i].getElementsByTagName("p");
        if (p.length > 0) {
            return false;
        }
    }
    return true;
}
function userRegisterModel() {
    var self = this;
    this.UserName = $("#userName").val();
    this.UserPwd = $("#userPwd").val();
    this.UserEmail = $("#userEmail").val();
}
