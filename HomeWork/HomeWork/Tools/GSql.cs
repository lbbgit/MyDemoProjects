using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;


public class GSql
{
    /// <summary>
    /// 数据库的连接对象
    /// </summary>
    private static SqlConnection _con;

    /// <summary>
    /// 获取数据库的链接对象
    /// </summary>
    public static SqlConnection Connection
    {
        get { return _con; }
    }

    /// <summary>
    /// 静态构造函数，初始化数据库连接
    /// </summary>
    static GSql()
    {
        string connection = "Server = '\" 127.0.0.1\",7788';Database = pharmacopeia;User Id=sa;Password=admin;Trusted_Connection = False;MultipleActiveResultSets = true";
        _con = new SqlConnection(connection);
        _con.Open();
    }

    /// <summary>
    /// 静态接口，释放数据库连接
    /// </summary>
    public static void disposeConnection()
    {
        _con.Close();
    }
}



public class CDbResource
{
    /// <summary>
    /// 数据库的连接对象
    /// </summary>
    private static SqlConnection _con;

    /// <summary>
    /// 获取数据库的链接对象
    /// </summary>
    public static SqlConnection Connection
    {
        get { return _con; }
    }

    /// <summary>
    /// 静态构造函数，初始化数据库连接
    /// </summary>
    static CDbResource()
    {
        string connection = "Server = '\" 127.0.0.1\",7788';Database = pharmacopeia;User Id=sa;Password=admin;Trusted_Connection = False;MultipleActiveResultSets = true";
        _con = new SqlConnection(connection);
        _con.Open();
    }

    /// <summary>
    /// 静态接口，释放数据库连接
    /// </summary>
    public static void disposeConnection()
    {
        _con.Close();
    }
}
