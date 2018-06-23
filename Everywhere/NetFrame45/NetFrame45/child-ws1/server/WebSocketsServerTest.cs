using System;
using System.IO;
using System.Timers;
namespace WebSocketServer
{
    class WebSocketServerTest : IDisposable
    {
        /// <summary>
        /// 独一无二的Server(可以多个实例的,但这里只建一个)
        /// </summary>
        private WebSocketServer WSServer;
        public WebSocketServerTest()
        {
            //使用默认的设置
            WSServer = new WebSocketServer();  
        }

        public void Dispose()
        {
            Close();
        }

        private void Close()
        {
            WSServer.Dispose();
            GC.SuppressFinalize(this);
        }

        ~WebSocketServerTest()
        {
            Close();
        }

        public void Start()
        {
            WSServer.newConnection_event += new NewConnection_EventHandler(WSServer_NewConnection);
            WSServer.disconnected_event += new Disconnected_EventHandler(WSServer_Disconnected);
            WSServer.StartServer();
        }

        void WSServer_Disconnected(Object sender, EventArgs e)
        {
        }

        void WSServer_NewConnection(string loginName, EventArgs e)
        {
        }
}
}
