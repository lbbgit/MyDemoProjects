<%@ language="vbscript" codepage="936" %>
<%
Const adCmdStoredProc=4
Const adInteger = 3
Const adVarChar = 200
Const adParamInput=1
Const adParamOutput =2
Const adExecuteNoRecords=128

Response.Charset = "gb2312"
Response.ContentType = "text/html"
Dim json,op,cn

function isNL(v)
  isNL=trim(v&"")=""
end function

function js(v)
  js=replace(v,"'","\'")
end Function

Function opendb
  Set cn=server.CreateObject("ADODB.Connection")
  cn.open "driver={sql server};server=.;database=chatdb;uid=sa;pwd=;"'ע���޸�����
End Function

Function closedb
  cn.close:Set cn=Nothing
End function

function login()'=============��½ϵͳ
  Dim rStr,UserName:rStr = "":UserName=Request.Form("nn")
  If isNL(UserName) Then
   rStr="success:false,err:'�ǳƲ���Ϊ�գ�'"
  ElseIf Len(UserName)>20 Then
    rStr="success:false,err:'�ǳƲ��ܳ���20���ַ���'"
  Else
    Dim UserId,Key,cm:UserId="":Key=""
    Call opendb
    Set cm=Server.CreateObject("ADODB.Command")
    cm.CommandType=adCmdStoredProc:cm.CommandText="ajaxLogin":cm.ActiveConnection=cn
    cm.Parameters.Append cm.CreateParameter("@UserName",adVarChar,adParamInput,50,UserName)
    cm.Parameters.Append cm.CreateParameter("@userid",adVarChar,adParamOutput,18)
    cm.Parameters.Append cm.CreateParameter("@UserKey",adVarChar,adParamOutput,5)
    cm.Execute ,,adExecuteNoRecords
    UserId=cm.Parameters("@userid"):Key=cm.Parameters("@userkey")
    If UserId="-1" Then
      rStr="success:false,err:'�����������Ժ����ԣ�'"
    ElseIf UserId="0" Then
      rStr="success:false,err:'�Ѿ����ڴ��û��ǳƣ����޸������ǳƣ�'"
    Else
      rStr="success:true,UserId:'" & UserId & "',Key:'" & Key & "'"
    End If
    Call closedb
  End If
  login=rStr
end function

function logout()'==========�˳�ϵͳ
  Dim rStr,UserId,Key:UserId=Request.Form("uid"):Key=Request.Form("key")
  If isNL(UserId) Or isNL(Key) Then
    logout="success:false,err:'�û���Ϣ��ʧ��'"
    Exit Function
  End If
  Call opendb
  Dim cm
  Set cm=Server.CreateObject("ADODB.Command")
  cm.CommandText="ajaxLogout"
  cm.ActiveConnection=cn
  cm.CommandType=adCmdStoredProc
  cm.Parameters.Append cm.CreateParameter("@userid",adVarChar,adParamInput,18,UserId)
  cm.Parameters.Append cm.CreateParameter("@userkey",adVarChar,adParamInput,5,Key)
  cm.Parameters.Append cm.CreateParameter("@result",adInteger,adParamOutput)
  cm.Execute ,,adExecuteNoRecords
  If cm.Parameters("@result")="0" Then
    rStr="success:false,err:'�û���Ϣ�����ڣ�'"
  Else
    rStr="success:true"
  End If
  Call closedb
  logout=rStr
end function

function readuser()'==========��ȡ�û��б���Ϣ
  Dim rStr,UserId:UserId=Request.Form("uid"):rStr=""
  If isNL(UserId)  Then
    readuser="success:false,err:'�û�Id��Ϣ��ʧ��'"
    Exit Function
  End If
  UserId=Replace(UserId,"'","")'sqlע���滻  
  Dim rs
  Call opendb
  Set rs=cn.Execute("exec ajaxReadUser '"&UserId&"'")
  While Not rs.EOF
    rStr=rStr&",{id:'"&rs(0)&"',nn:'"&js(rs(1))&"'}"
    rs.MoveNext
  Wend
  rs.Close:Set rs=Nothing
  Call closedb
  If rStr<>"" Then
    rStr="success:true,data:["&Right(rStr,len(rStr)-1)&"]"
  Else
    rStr="success:true,data:[]"
  End If
  readuser=rStr
end function

Function read()'==========��ȡ��Ϣ�б�
  Dim rStr,UserId,Key:UserId=Request.Form("uid"):Key=Request.Form("key"):rStr=""
  If isNL(UserId) Or isNL(key)  Then
    read="success:false,err:'�û���Ϣ��ʧ��'"
    Exit Function
  End If
  UserId=Replace(UserId,"'","")'sqlע���滻
  key=Replace(key,"'","")'sqlע���滻
  Dim rs
  Call opendb
  Set rs=cn.Execute("exec ajaxRead '"&UserId&"','"&key&"'")
  While Not rs.EOF
    rStr=rStr&",'"&js(rs(0))&"'" 'ע��js�滻
    rs.MoveNext
  Wend
  rs.Close:Set rs=Nothing
  Call closedb
  If rStr<>"" Then
    rStr="success:true,data:["&Right(rStr,len(rStr)-1)&"]"
  Else
    rStr="success:true,data:[]"
  End If
  read=rStr
end function

function say()'==========����
  Dim rStr,From,Key,ToUser,msg,cm
  From=Request.Form("from"):Key=Request.Form("key"):ToUser=Request.Form("to"):msg=Request.Form("ct"):rStr=""
  If isNL(from) Or isNL(key) Or isNL(ToUser) Or isNL(msg)  Then
    say="success:false,err:'��Ϣ���ݲ�������'"
    Exit Function
  End If
  Set cm=Server.CreateObject("ADODB.Command")
  call opendb
  cm.ActiveConnection=cn
  cm.CommandText="ajaxsay"
  cm.CommandType=adCmdStoredProc  
  cm.Parameters.Append cm.CreateParameter("@userkey",adVarChar,adParamInput,5,Key)
  cm.Parameters.Append cm.CreateParameter("@from",adVarChar,adParamInput,18,from)
  cm.Parameters.Append cm.CreateParameter("@to",adVarChar,adParamInput,18,ToUser)
  cm.Parameters.Append cm.CreateParameter("@msg",adVarChar,adParamInput,800,msg)
  cm.Parameters.Append cm.CreateParameter("@result",adInteger,adParamOutput)
  cm.Execute ,,adExecuteNoRecords
  If cm.Parameters("@result")="0" Then
    rStr="success:false,err:'����ʧ�ܣ�\nԭ�򣺽������Ѿ������ڣ�'"
  Else
    rStr="success:true"
  End If
  Call closedb
  say=rStr
end Function


json= "{":op= Request.Form("op")
if op= "login" then
    Json =json&Login()
elseif op= "logout" then
    Json =json&Logout()
elseif op="readuser" then
    Json =Json&ReadUser()
elseif op="read" then
    Json=json&Read()
elseif op="say" then
    Json =json&Say()
else
    Json = Json&"success:false,err:'��������'"
end if
Json =json& "}"
Response.Write Json
%>