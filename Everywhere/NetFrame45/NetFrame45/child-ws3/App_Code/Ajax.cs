using System;
using System.Web;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
/// <summary>
///操作类
/// </summary>
public class Ajax
{
    /// <summary>
    /// 检查字符串是否为空
    /// </summary>
    /// <param name="v">字符串</param>
    /// <returns></returns>
    private static bool IsNull(string v)
    {
        if (v == null || v.Trim() == "") return true;
        else return false;
    }
    /// <summary>
    /// 转义js字符串以便输出
    /// </summary>
    /// <param name="v">字符串</param>
    /// <returns></returns>
    private static string Js(string v)
    {
        return v.Replace("'", "\\'");
    }
    /// <summary>
    /// 用户登录
    /// </summary>    
    /// <returns></returns>
    public static string Login()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "";

        string UserName = Request.Form["nn"];
        if (IsNull(UserName))
        {
            rStr = "success:false,err:'昵称不能为空！'";
        }
        else if (UserName.Length > 20)
        {
            rStr = "success:false,err:'昵称不能超过20个字符！'";
        }
        else
        {
            string UserId = "", Key = "";
            SqlConnection cn = new SqlConnection(ConfigurationSettings.AppSettings["db"]);
            cn.Open();
            try
            {
                SqlCommand cm = new SqlCommand("ajaxLogin", cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar, 50));
                cm.Parameters["@UserName"].Value = UserName;
                //==========输出参数
                cm.Parameters.Add(new SqlParameter("@UserId", SqlDbType.NVarChar, 18));
                cm.Parameters["@UserId"].Direction = ParameterDirection.Output;
                cm.Parameters.Add(new SqlParameter("@UserKey", SqlDbType.NVarChar, 5));
                cm.Parameters["@UserKey"].Direction = ParameterDirection.Output;
                
                cm.ExecuteNonQuery();
                UserId = cm.Parameters["@UserId"].Value.ToString().Trim();
                Key = cm.Parameters["@UserKey"].Value.ToString().Trim();
                if (UserId == "-1") rStr = @"success:false,err:'发生错误，请稍后再试！'";
                else if (UserId == "0") rStr = @"success:false,err:'已经存在此用户昵称，请修改您的昵称！'";
                else rStr += "success:true,UserId:'" + UserId + "',Key:'" + Key + "'";
                cm.Dispose();
            }
            catch (Exception e)
            {
                rStr = @"success:false,err:'原因\\n" + Js(e.Message) + "'";
            }
            cn.Close();
        }

        return rStr;
    }
    /// <summary>
    /// 删除用户信息,“用户ID+key”来删除，key参数是防止乱删除用户信息的
    /// </summary>
    /// <returns></returns>
    public static string Logout()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "", UserId = Request.Form["uid"], Key = Request.Form["key"];
        if (IsNull(UserId) || IsNull(Key)) return "success:false,err:'用户信息丢失！'";

        SqlConnection cn = new SqlConnection(ConfigurationSettings.AppSettings["db"]);
        cn.Open();
        try
        {
            SqlCommand cm = new SqlCommand("ajaxLogout", cn);
            cm.CommandType = CommandType.StoredProcedure;
            cm.Parameters.Add(new SqlParameter("@UserId", SqlDbType.NVarChar, 18));
            cm.Parameters["@UserId"].Value = UserId;
            cm.Parameters.Add(new SqlParameter("@UserKey", SqlDbType.NVarChar, 5));
            cm.Parameters["@UserKey"].Value = Key;
            cm.Parameters.Add(new SqlParameter("@Result", SqlDbType.Int));
            cm.Parameters["@Result"].Direction = ParameterDirection.Output;

            cm.ExecuteNonQuery();
            
            if(cm.Parameters["@UserId"].Value.ToString().Trim()=="0")rStr = "success:false,err:'用户信息不存在！'";
            else rStr="success:true";
            cm.Dispose();
        }
        catch (Exception e)
        {
            
        }
        cn.Close();
        return rStr;
    }
    /// <summary>
    /// 发表信息
    /// </summary>
    /// <returns>发表信息,Json格式</returns>
    public static string Say()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string From = Request.Form["from"], To = Request.Form["to"]
            , Key = Request.Form["key"], Msg = Request.Form["ct"], rStr = "";
        if (IsNull(From) || IsNull(Key) || IsNull(To) || IsNull(Msg)) rStr = "success:false,err:'信息传递不完整！'";
        else
        {
            SqlConnection cn = new SqlConnection(ConfigurationSettings.AppSettings["db"]);
            cn.Open();
            try
            {               
                SqlCommand cm = new SqlCommand("ajaxSay", cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add(new SqlParameter("@UserKey", SqlDbType.NVarChar, 5));
                cm.Parameters["@UserKey"].Value = Key;
                cm.Parameters.Add(new SqlParameter("@From", SqlDbType.NVarChar, 18));
                cm.Parameters["@From"].Value = From;
                cm.Parameters.Add(new SqlParameter("@To", SqlDbType.NVarChar, 18));
                cm.Parameters["@To"].Value = To;
                cm.Parameters.Add(new SqlParameter("@Msg", SqlDbType.NVarChar, 800));
                cm.Parameters["@Msg"].Value = Msg;
                cm.Parameters.Add(new SqlParameter("@Result", SqlDbType.Int));
                cm.Parameters["@Result"].Direction = ParameterDirection.Output;
                cm.ExecuteNonQuery();
                if (cm.Parameters["@Result"].Value.ToString() == "0") rStr = "sucess:false,err:'发表失败！\\n原因：接收者已经不存在！'";
                else rStr = "success:true";
                cm.Dispose();
            }
            catch (Exception e)
            {
                rStr = "sucess:false,err:'发表失败！原因\\n" + Js(e.Message) + "'";
            }
            cn.Close();
        }
        return rStr;
    }
    /// <summary>
    /// 用户列表
    /// </summary>
    /// <returns>用户列表信息,Json格式</returns>
    public static string ReadUser()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "", UserId = Request.Form["uid"];
        if (IsNull(UserId)) rStr += "success:false,err:'用户id丢失！'";
        else
        {
            SqlConnection cn = new SqlConnection(ConfigurationSettings.AppSettings["db"]);
            cn.Open();
            try
            {
                SqlCommand cm = new SqlCommand("ajaxReadUser", cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add(new SqlParameter("@UserId", SqlDbType.NVarChar, 18));
                cm.Parameters["@UserId"].Value = UserId;
                string j = "";
                SqlDataReader dr = cm.ExecuteReader();
                while (dr.Read()) j += ",{id:'" + dr[0] + "',nn:'" + Js(dr[1].ToString()) + "'}";
                dr.Close();
                cm.Dispose();
                rStr = "success:true,data:[" + (j == "" ? "" : j.Substring(1)) + "]";
            }
            catch (Exception e)
            {
                rStr = @"success:false,err:'发生如下错误\\n" + Js(e.Message) + "'";
            }
            cn.Close();
        }
        return rStr;
    }
    /// <summary>
    /// 信息列表
    /// </summary>
    /// <returns>信息列表,Json格式</returns>
    public static string Read()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "";
        string UserId = Request.Form["uid"], Key = Request.Form["key"];
        if (IsNull(UserId) || IsNull(Key)) rStr = "success:false,err:'用户信息丢失！'";
        else
        {
            SqlConnection cn = new SqlConnection(ConfigurationSettings.AppSettings["db"]);
            cn.Open();
            try
            {
                SqlCommand cm = new SqlCommand("ajaxRead", cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add(new SqlParameter("@UserId", SqlDbType.NVarChar, 18));
                cm.Parameters["@UserId"].Value = UserId;
                cm.Parameters.Add(new SqlParameter("@UserKey", SqlDbType.NVarChar, 5));
                cm.Parameters["@UserKey"].Value = Key;
                SqlDataReader dr = cm.ExecuteReader();
                string j = "";
                while (dr.Read()) j += ",'" + Js(dr[0].ToString()) + "'";
                dr.Close();
                cm.Dispose();
                rStr = "success:true,data:[" + (j == "" ? "" : j.Substring(1)) + "]";
            }
            catch (Exception e)
            {
                rStr = "success:false,err:'发生以下错误" + Js(e.Message) + "'";
            }
            cn.Close();
        }
        return rStr;
    }
}