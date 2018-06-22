<?php
$db="chatdb";$uid="sa";$pwd="";$server=".";
class ajax{	
	function js($v){
		return str_replace("'","\\'",$v);
	}
	function Login(){//用户登录
	        global $db,$uid,$pwd,$server;
		$rStr="";
		$Username=$_POST["nn"];
		if(empty($Username))return "success:false,err:'昵称不能为空！'";
		if(strlen($Username)>20)return "success:false,err:'昵称不能超过20个字符！'";
		$userId="";$key="";
		$cn=mssql_connect($server,$uid,$pwd);
		mssql_select_db($db,$cn);
		$stmt=mssql_init("ajaxLogin",$cn);
		mssql_bind($stmt,"@username",$Username,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@userid",$userId,SQLVARCHAR,true,false);
		mssql_bind($stmt,"@userkey",$key,SQLVARCHAR,true,false);
		mssql_execute($stmt,true);
		mssql_close($cn);
		$userId=trim($userId);$key=trim($key);
		if($userId=="-1")$rStr="success:false,err:'发生错误，请稍后再试！'";
		else if($userId=="0")$rStr="success:false,err:'已经存在此用户昵称，请修改您的昵称！'";
		else $rStr="success:true,UserId:'" .$userId. "',Key:'".$key."'";
		return $rStr;
	}
	function Logout(){//注销用户
		global $db,$uid,$pwd,$server;
		$rStr="";$userId=$_POST["uid"];$key=$_POST["key"];
		if(empty($userId)||empty($key))return "success:false,err:'用户信息丢失！'";
		$cn=mssql_connect($server,$uid,$pwd);
		mssql_select_db($db,$cn);
		$stmt=mssql_init("ajaxLogout",$cn);
		mssql_bind($stmt,"@userid",$userId,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@userkey",$key,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@Result",$r,SQLINT1,true,false);
		mssql_execute($stmt,true);
		mssql_close($cn);
		$r=trim($r);
		if($r=="0")$rStr="success:false,err:'用户信息不存在！'";
		else $rStr="success:true";
		return $rStr;
	}
	function Say(){//发表信息
		global $db,$uid,$pwd,$server;
		$rStr="";$From=$_POST["from"];$To=$_POST["to"];$key=$_POST["key"];$Msg=$_POST["ct"];
		if(empty($From)||empty($key)||empty($To)||empty($Msg))return "success:false,err:'信息传递不完整！'";
		$Msg=iconv("utf-8","gb2312",$Msg);//=============注意要解码，并且客户端要使用encodeURI/encodeURIComponent编码，要不发送到服务器端接收会乱码
		$cn=mssql_connect($server,$uid,$pwd);
		mssql_select_db($db,$cn);
		$stmt=mssql_init("ajaxSay",$cn);
		mssql_bind($stmt,"@userkey",$key,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@from",$From,SQLVARCHAR,false,false);		
		mssql_bind($stmt,"@to",$To,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@msg",$Msg,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@Result",$r,SQLINT4,true);
		mssql_execute($stmt,true);
		mssql_close($cn);
		if($r=="0")$rStr="sucess:false,err:'发表失败！\\n原因：接收者已经不存在！'";
		else $rStr="success:true";
		return $rStr;
	}
	function ReadUser(){//获取用户列表
		global $db,$uid,$pwd,$server;
		$rStr="";$userId=$_POST["uid"];
		if(empty($userId))return "success:false,err:'用户id丢失！'";
		$cn=mssql_connect($server,$uid,$pwd);
		mssql_select_db($db,$cn);
		$stmt=mssql_init("ajaxReadUser",$cn);
		mssql_bind($stmt,"@userid",$userId,SQLVARCHAR,false,false);
		$rs=mssql_execute($stmt);
		$rNum=mssql_num_rows($rs);
		for($i=0;$i<$rNum;$i++){
			$row=mssql_fetch_row($rs);
			$rStr.=",{id:'" . $row[0] . "',nn:'" . Ajax::Js($row[1]) . "'}";
		}
		mssql_free_result($rs);
		mssql_close($cn);
		return "success:true,data:[" . ($rStr == "" ? "" : substr($rStr,1)) . "]";
	}
	function Read(){//信息列表
		global $db,$uid,$pwd,$server;
		$rStr="";$userId=$_POST["uid"];$key=$_POST["key"];
		if(empty($userId)||empty($key))return "success:false,err:'用户信息丢失！'";
		$cn=mssql_connect($server,$uid,$pwd);
		mssql_select_db($db,$cn);
		$stmt=mssql_init("ajaxRead",$cn);
		mssql_bind($stmt,"@userid",$userId,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@userkey",$key,SQLVARCHAR,false,false);
		$rs=mssql_execute($stmt);
		$rNum=mssql_num_rows($rs);
		for($i=0;$i<$rNum;$i++){
			$row=mssql_fetch_row($rs);
			$rStr.=",'".Ajax::js($row[0])."'";
		}
		mssql_free_result($rs);
		mssql_close($cn);
		return "success:true,data:[" . ($rStr == "" ? "" : substr($rStr,1)) . "]";
	}
}
$Json = "{";
switch ($_POST["op"]){
	case "login": $Json .= Ajax::Login(); break;
	case "logout": $Json .= Ajax::Logout(); break;
	case "readuser": $Json .= Ajax::ReadUser(); break;
	case "read":$Json.=Ajax::Read(); break;
	case "say": $Json.= Ajax::Say(); break;
	default: $Json.= "success:false,err:'参数错误！'"; break;
}
$Json .= "}";

header('Content-Type:text/html;charset=GB2312'); //==========注意要设置响应头的编码，要不客户端接收会乱码
echo($Json);
?>