using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
namespace WebSocketServer
{
    public class MainProgram
    {         
        public static void Main(string[] args)
        {
            WebSocketServerTest WSServerTest = new WebSocketServerTest();
            WSServerTest.Start();
        }
       
    }

     #region 控制,优化,配置,开关

    public static class _CacheSetting
    {
        //缓存
        public static bool cacheIp = true;
        public static bool cacheMD5 = true;
        public static bool cacheSHA1 = true;
        public static bool cacheUtf8Encoding = true;
        public static bool useSMIN = true;

        //开销
        public static bool useLogger = false;

        

        //对象
        #region 只创建一次性的对象

     
        public static SHA1 sha1 = new SHA1CryptoServiceProvider();
        public static UTF8Encoding utf8Encoding = new System.Text.UTF8Encoding();
        private static MD5 _md5; 
        public static MD5 md5
        {
            get
            {
                if (_md5 == null)
                    _md5 = MD5.Create();
                return _md5;
            }
        } 
        public static string SMIN = "ZX9E612X-7232-59A7-6512-AX261325X635";

            

        #endregion
       
    }

     #endregion 



    #region 小型类 ,日志Logger->Console

    /// <summary>
    /// 日志,导出到Console,还不异步
    /// </summary>
    public class _Logger
    {
        public bool LogEvents { get; set; }

        public _Logger()
        {
            //新建后,才会开始记录
            LogEvents = true && _CacheSetting.useLogger;
        }

        public void Log(string Text)
        {
            if (LogEvents && _CacheSetting.useLogger) 
                Console.WriteLine(Text);
        }
    }


    #endregion
}
