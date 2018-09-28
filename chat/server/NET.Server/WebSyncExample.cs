using System;
using System.Runtime.Serialization;
using FM;
using FM.WebSync;
using FM.WebSync.Server;

namespace NET.Server
{
    [DataContract]
    public class Message
    {
        [DataMember(Name = "name")]
        public string name { get; set; }
        [DataMember(Name = "message")]
        public string message { get; set; }
    }

    public class WebSyncExample
    {
        private static object CurrentLock = new object();
        private static System.Collections.Generic.List<Message> chat = new System.Collections.Generic.List<Message>();

        [WebSyncEvent(EventType.AfterConnect)]
        public static void connected(object sender, WebSyncEventArgs e)
        {
        }

        [WebSyncEvent(EventType.BeforeService, "/message", FilterType.Template)]
        public static void incomingMessage(object sender, WebSyncEventArgs e)
        {
            var incoming = Json.Deserialize<Message>(e.ServiceInfo.DataJson);
            lock (CurrentLock)
            {
                chat.Add(incoming);
                e.Client.Publish("/messages", Json.Serialize(incoming));
            }
        }

        [WebSyncEvent(EventType.AfterSubscribe, "/messages", FilterType.Template)]
        public static void getMessages(object sender, WebSyncEventArgs e)
        {
            lock (CurrentLock)
            {
                e.SetExtensionValueJson("chat", Json.Serialize(chat));
            }
        }
    }
}
