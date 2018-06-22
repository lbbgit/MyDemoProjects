<%@ WebHandler Language="C#" Class="op" %>

using System;
using System.Web;

public class op : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.Charset = "gb2312";
        context.Response.ContentType = "text/html";
        HttpRequest Request = context.Request;
        string Json = "{";
        switch (Request.Form["op"])
        {
            case "login": Json += Ajax.Login(); break;
            case "logout": Json += Ajax.Logout(); break;
            case "readuser": Json += Ajax.ReadUser(); break;
            case "read":Json+=Ajax.Read(); break;
            case "say": Json += Ajax.Say(); break;
            
            default: Json += "success:false,err:'²ÎÊý´íÎó£¡'"; break;
        }
        Json += "}";
        context.Response.Write(Json);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}