using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using FM.WebSync.Server;

namespace NET.Server
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            WebSyncServer.DefaultResponseHandler = (context) =>
            {
                return string.Format(
@"<p>WebSync is <b>{0}</b>.</p>
<p>{1}</p>",
                    (WebSyncServer.IsActive ? "active" : "not active"),
                    (WebSyncServer.IsActive ? null : WebSyncServer.LastFatalMessage));
            };
        }
    }
}