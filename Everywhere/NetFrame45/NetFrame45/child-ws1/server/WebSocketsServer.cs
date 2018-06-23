using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.IO;
using System.Collections;


namespace WebSocketServer
{
    public enum ServerStatusLevel { Off, WaitingConnection, ConnectionEstablished };

    public delegate void NewConnection_EventHandler(string loginName,EventArgs e);
    public delegate void DataReceived_EventHandler(Object sender, string message, EventArgs e);
    public delegate void Disconnected_EventHandler(Object sender,EventArgs e);
    public delegate void Broadcast_EventHandler(string message, EventArgs e);


    /// <summary>
    /// 这个是类,还有个同名命名空间
    /// </summary>
    public class WebSocketServer : IDisposable
    {
        private bool AlreadyDisposed;
        private Socket Listener;
        private int ConnectionsQueueLength;
        private int MaxBufferSize;
        private string Handshake;
        private StreamReader ConnectionReader;
        private StreamWriter ConnectionWriter;
        private _Logger _logger;
        private byte[] FirstByte;
        private byte[] LastByte;
        private byte[] ServerKey1;
        private byte[] ServerKey2;

        /// <summary>
        /// 当前连接列表
        /// </summary>
        List<SocketConnection> connectionSocket_List = new List<SocketConnection>();

        public ServerStatusLevel Status { get; private set; }
        public int ServerPort { get; set; }
        public string ServerLocation { get; set; }
        public string ConnectionOrigin { get; set; }
        public bool LogEvents { 
            get { return _logger.LogEvents; }
            set { _logger.LogEvents = value; }
        }

        public event NewConnection_EventHandler newConnection_event;
        public event DataReceived_EventHandler dataReceived_event;
        public event Disconnected_EventHandler disconnected_event;

        private void Initialize()
        {
            AlreadyDisposed = false;
            _logger = new _Logger();

            Status = ServerStatusLevel.Off;
            ConnectionsQueueLength = 500;
            MaxBufferSize = 1024 * 100;
            FirstByte = new byte[MaxBufferSize];
            LastByte = new byte[MaxBufferSize];
            FirstByte[0] = 0x00;
            LastByte[0] = 0xFF;
            _logger.LogEvents = true;
        }

        public WebSocketServer() 
        {
            ServerPort = 4141;
            ServerLocation = string.Format("ws://{0}:4141/chat", getLocalmachineIPAddress());
            Initialize();
        }

        public WebSocketServer(int serverPort, string serverLocation, string connectionOrigin)
        {
            ServerPort = serverPort;
            ConnectionOrigin = connectionOrigin;
            ServerLocation = serverLocation;
            Initialize();
        }


        ~WebSocketServer()
        {
            Close();
        }


        public void Dispose()
        {
            Close();
        }

        private void Close()
        {
            if (!AlreadyDisposed)
            {
                AlreadyDisposed = true;
                if (Listener != null) Listener.Close();
                foreach (SocketConnection item in connectionSocket_List)
                {
                    item.ConnectionSocket.Close();
                }
                connectionSocket_List.Clear();
                GC.SuppressFinalize(this);
            }
        }

        #region getLocalmachineIPAddress()  得到ip,优化一下,可以关闭优化

        public static IPAddress oldIp = null; 
        public static IPAddress getLocalmachineIPAddress()
        {
            if (_CacheSetting.cacheIp && oldIp != null)  return oldIp;
             
            string strHostName = Dns.GetHostName();
            IPHostEntry ipEntry = Dns.GetHostEntry(strHostName);

            foreach (IPAddress ip in ipEntry.AddressList)
            {
                //IPV4
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    if (_CacheSetting.cacheIp && oldIp == null)  oldIp = ip;
                    return ip;
                }
            }

            return ipEntry.AddressList[0];
        }

        #endregion
       

        public void StartServer()
        {
            Char char1 = Convert.ToChar(65533);

            IPAddress ipAddress = getLocalmachineIPAddress();
            Listener = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.IP);
            Listener.Bind(new IPEndPoint(ipAddress, ServerPort));  
            
            Listener.Listen(ConnectionsQueueLength);

            _logger.Log(string.Format("聊天服务器启动。监听地址：{0}, 端口：{1}", ipAddress, ServerPort));
            _logger.Log(string.Format("WebSocket服务器地址: ws://{0}:{1}/chat", ipAddress, ServerPort));

            while (true)
            {
                Socket sc = Listener.Accept();

                if (sc != null)
                {
                    System.Threading.Thread.Sleep(100);
                    SocketConnection socketConn = new SocketConnection();
                    socketConn.ConnectionSocket = sc;
                    socketConn.NewConnection += new NewConnection_EventHandler(socketConn_NewConnection);
                    socketConn.DataReceived += new DataReceived_EventHandler(socketConn_BroadcastMessage);
                    socketConn.Disconnected += new Disconnected_EventHandler(socketConn_Disconnected);

                    //异步读取消息
                    socketConn.ConnectionSocket.BeginReceive(socketConn.receivedDataBuffer,
                                                             0, socketConn.receivedDataBuffer.Length, 
                                                             0, 
                                                             new AsyncCallback(socketConn.ManageHandshake), //CallBack
                                                             socketConn.ConnectionSocket.Available);
                    connectionSocket_List.Add(socketConn);
                }
            }
        }

        #region 连接三宝 + 消息发送,上个函数的
       
        /// <summary>
        /// 连接,触发Event
        /// </summary> 
        void socketConn_NewConnection(string name, EventArgs e)
        {
            if (newConnection_event != null)
                newConnection_event(name, EventArgs.Empty);
        }

        /// <summary>
        /// 
        /// </summary> 
        void socketConn_BroadcastMessage(Object sender, string message, EventArgs e)
        {
            if (message.IndexOf("login:") != -1)
            {
                SocketConnection _currentUserConn = sender as SocketConnection;
                _currentUserConn.Name = message.Substring(message.IndexOf("login:") + "login:".Length);
                message = string.Format("欢迎【{0}】来到聊天室！", message.Substring(message.IndexOf("login:") + "login:".Length));
            }
            Send(message);
        }

        /// <summary>
        /// 断开,则提示离开,关闭连接,从列表移除
        /// </summary> 
        void socketConn_Disconnected(Object sender, EventArgs e)
        {
            SocketConnection _currentUserConn = sender as SocketConnection;
            if (_currentUserConn != null)
            {
                Send(string.Format("【{0}】离开了聊天室！", _currentUserConn.Name));
                _currentUserConn.ConnectionSocket.Close();
                connectionSocket_List.Remove(_currentUserConn);
            }
        }


        /// <summary>
        /// 发送消息,每个客户的SocketConnection ConnectionSocket,都需要使用以下
        /// </summary> 
        public void Send(string message)
        {
            foreach (SocketConnection item in connectionSocket_List)
            {
                if (!item.ConnectionSocket.Connected) return;
                try
                {
                    if (item.IsDataMasked)
                    {
                        DataFrame dr = new DataFrame(message);
                        item.ConnectionSocket.Send(dr.GetBytes());
                    }
                    else
                    {
                        item.ConnectionSocket.Send(FirstByte);
                        item.ConnectionSocket.Send(Encoding.UTF8.GetBytes(message));
                        item.ConnectionSocket.Send(LastByte);
                    }
                }
                catch (Exception ex)
                {
                    _logger.Log(ex.Message);
                }
            }
        }
 
        #endregion
    
    }
}



