<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Db.aspx.cs" Inherits="HomeWork.Tools.Db" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input type="text" id="sql_txt" value="select * from dual;" />
        <input type=button id="btn_ok" onclick="enter();" value="RunSql" />
        <div id="div1">
            <asp:GridView ID="gridview" runat="server">
                
            </asp:GridView>
        </div>
        <div id="div2">
            <span id="span1">Please insert sql to run!</span>
        </div>
    </div>
    </form>
</body>
</html>
