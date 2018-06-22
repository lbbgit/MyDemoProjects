<?php
$db="chatdb";$uid="sa";$pwd="";$server=".";
class ajax{	
	function js($v){
		return str_replace("'","\\'",$v);
	}
	function Login(){//�û���¼
	        global $db,$uid,$pwd,$server;
		$rStr="";
		$Username=$_POST["nn"];
		if(empty($Username))return "success:false,err:'�ǳƲ���Ϊ�գ�'";
		if(strlen($Username)>20)return "success:false,err:'�ǳƲ��ܳ���20���ַ���'";
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
		if($userId=="-1")$rStr="success:false,err:'�����������Ժ����ԣ�'";
		else if($userId=="0")$rStr="success:false,err:'�Ѿ����ڴ��û��ǳƣ����޸������ǳƣ�'";
		else $rStr="success:true,UserId:'" .$userId. "',Key:'".$key."'";
		return $rStr;
	}
	function Logout(){//ע���û�
		global $db,$uid,$pwd,$server;
		$rStr="";$userId=$_POST["uid"];$key=$_POST["key"];
		if(empty($userId)||empty($key))return "success:false,err:'�û���Ϣ��ʧ��'";
		$cn=mssql_connect($server,$uid,$pwd);
		mssql_select_db($db,$cn);
		$stmt=mssql_init("ajaxLogout",$cn);
		mssql_bind($stmt,"@userid",$userId,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@userkey",$key,SQLVARCHAR,false,false);
		mssql_bind($stmt,"@Result",$r,SQLINT1,true,false);
		mssql_execute($stmt,true);
		mssql_close($cn);
		$r=trim($r);
		if($r=="0")$rStr="success:false,err:'�û���Ϣ�����ڣ�'";
		else $rStr="success:true";
		return $rStr;
	}
	function Say(){//������Ϣ
		global $db,$uid,$pwd,$server;
		$rStr="";$From=$_POST["from"];$To=$_POST["to"];$key=$_POST["key"];$Msg=$_POST["ct"];
		if(empty($From)||empty($key)||empty($To)||empty($Msg))return "success:false,err:'��Ϣ���ݲ�������'";
		$Msg=iconv("utf-8","gb2312",$Msg);//=============ע��Ҫ���룬���ҿͻ���Ҫʹ��encodeURI/encodeURIComponent���룬Ҫ�����͵��������˽��ջ�����
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
		if($r=="0")$rStr="sucess:false,err:'����ʧ�ܣ�\\nԭ�򣺽������Ѿ������ڣ�'";
		else $rStr="success:true";
		return $rStr;
	}
	function ReadUser(){//��ȡ�û��б�
		global $db,$uid,$pwd,$server;
		$rStr="";$userId=$_POST["uid"];
		if(empty($userId))return "success:false,err:'�û�id��ʧ��'";
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
	function Read(){//��Ϣ�б�
		global $db,$uid,$pwd,$server;
		$rStr="";$userId=$_POST["uid"];$key=$_POST["key"];
		if(empty($userId)||empty($key))return "success:false,err:'�û���Ϣ��ʧ��'";
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
	default: $Json.= "success:false,err:'��������'"; break;
}
$Json .= "}";

header('Content-Type:text/html;charset=GB2312'); //==========ע��Ҫ������Ӧͷ�ı��룬Ҫ���ͻ��˽��ջ�����
echo($Json);
?>