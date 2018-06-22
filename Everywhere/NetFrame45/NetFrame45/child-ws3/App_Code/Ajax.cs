using System;
using System.Web;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
/// <summary>
///������
/// </summary>
public class Ajax
{
    /// <summary>
    /// ����ַ����Ƿ�Ϊ��
    /// </summary>
    /// <param name="v">�ַ���</param>
    /// <returns></returns>
    private static bool IsNull(string v)
    {
        if (v == null || v.Trim() == "") return true;
        else return false;
    }
    /// <summary>
    /// ת��js�ַ����Ա����
    /// </summary>
    /// <param name="v">�ַ���</param>
    /// <returns></returns>
    private static string Js(string v)
    {
        return v.Replace("'", "\\'");
    }
    /// <summary>
    /// �û���¼
    /// </summary>    
    /// <returns></returns>
    public static string Login()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "";

        string UserName = Request.Form["nn"];
        if (IsNull(UserName))
        {
            rStr = "success:false,err:'�ǳƲ���Ϊ�գ�'";
        }
        else if (UserName.Length > 20)
        {
            rStr = "success:false,err:'�ǳƲ��ܳ���20���ַ���'";
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
                //==========�������
                cm.Parameters.Add(new SqlParameter("@UserId", SqlDbType.NVarChar, 18));
                cm.Parameters["@UserId"].Direction = ParameterDirection.Output;
                cm.Parameters.Add(new SqlParameter("@UserKey", SqlDbType.NVarChar, 5));
                cm.Parameters["@UserKey"].Direction = ParameterDirection.Output;
                
                cm.ExecuteNonQuery();
                UserId = cm.Parameters["@UserId"].Value.ToString().Trim();
                Key = cm.Parameters["@UserKey"].Value.ToString().Trim();
                if (UserId == "-1") rStr = @"success:false,err:'�����������Ժ����ԣ�'";
                else if (UserId == "0") rStr = @"success:false,err:'�Ѿ����ڴ��û��ǳƣ����޸������ǳƣ�'";
                else rStr += "success:true,UserId:'" + UserId + "',Key:'" + Key + "'";
                cm.Dispose();
            }
            catch (Exception e)
            {
                rStr = @"success:false,err:'ԭ��\\n" + Js(e.Message) + "'";
            }
            cn.Close();
        }

        return rStr;
    }
    /// <summary>
    /// ɾ���û���Ϣ,���û�ID+key����ɾ����key�����Ƿ�ֹ��ɾ���û���Ϣ��
    /// </summary>
    /// <returns></returns>
    public static string Logout()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "", UserId = Request.Form["uid"], Key = Request.Form["key"];
        if (IsNull(UserId) || IsNull(Key)) return "success:false,err:'�û���Ϣ��ʧ��'";

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
            
            if(cm.Parameters["@UserId"].Value.ToString().Trim()=="0")rStr = "success:false,err:'�û���Ϣ�����ڣ�'";
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
    /// ������Ϣ
    /// </summary>
    /// <returns>������Ϣ,Json��ʽ</returns>
    public static string Say()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string From = Request.Form["from"], To = Request.Form["to"]
            , Key = Request.Form["key"], Msg = Request.Form["ct"], rStr = "";
        if (IsNull(From) || IsNull(Key) || IsNull(To) || IsNull(Msg)) rStr = "success:false,err:'��Ϣ���ݲ�������'";
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
                if (cm.Parameters["@Result"].Value.ToString() == "0") rStr = "sucess:false,err:'����ʧ�ܣ�\\nԭ�򣺽������Ѿ������ڣ�'";
                else rStr = "success:true";
                cm.Dispose();
            }
            catch (Exception e)
            {
                rStr = "sucess:false,err:'����ʧ�ܣ�ԭ��\\n" + Js(e.Message) + "'";
            }
            cn.Close();
        }
        return rStr;
    }
    /// <summary>
    /// �û��б�
    /// </summary>
    /// <returns>�û��б���Ϣ,Json��ʽ</returns>
    public static string ReadUser()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "", UserId = Request.Form["uid"];
        if (IsNull(UserId)) rStr += "success:false,err:'�û�id��ʧ��'";
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
                rStr = @"success:false,err:'�������´���\\n" + Js(e.Message) + "'";
            }
            cn.Close();
        }
        return rStr;
    }
    /// <summary>
    /// ��Ϣ�б�
    /// </summary>
    /// <returns>��Ϣ�б�,Json��ʽ</returns>
    public static string Read()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string rStr = "";
        string UserId = Request.Form["uid"], Key = Request.Form["key"];
        if (IsNull(UserId) || IsNull(Key)) rStr = "success:false,err:'�û���Ϣ��ʧ��'";
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
                rStr = "success:false,err:'�������´���" + Js(e.Message) + "'";
            }
            cn.Close();
        }
        return rStr;
    }
}