using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.WebSockets;
using System.Threading;
using System.Text;
namespace LoginPage.Socket
{
    /// <summary>
    /// SocketHandler 的摘要说明
    /// </summary>
    public class SocketHandler : IHttpHandler
    {
        //用来存储当前所有连接的客户单 
        public static List<WebSocket> WebSocketList;
        public void ProcessRequest(HttpContext context)
        {
            if (WebSocketList == null)
            {
                WebSocketList = new List<WebSocket>();
            }
            HttpContext.Current.AcceptWebSocketRequest(async (contexts) =>
            {
                WebSocket socket = contexts.WebSocket;
                while (true)
                {
                    ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[1024]);
                    CancellationToken token;
                    WebSocketReceiveResult result = await socket.ReceiveAsync(buffer, token);
                    //获取客户端发过来的消息
                    string clientMessage = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);

                    if (socket.State == WebSocketState.Open)
                    {
                        //重新组织消息，发送给客户端
                        clientMessage = DateTime.Now.ToString() + "           " + clientMessage;
                        buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(clientMessage));
                        //如果该客户端为初次加入，添加到用户列表;
                        if (!WebSocketList.Contains(socket))
                        {
                            WebSocketList.Add(socket);
                        }
                        //将消息进行广播
                        foreach (WebSocket item in WebSocketList)
                        {
                            await item.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                    }
                    if (socket.State == WebSocketState.CloseReceived)
                    {
                        //客户断开的时候，要从列表中移除
                        WebSocketList.Remove(socket);
                    }
                }
            });
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}