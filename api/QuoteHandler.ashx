<%@ WebHandler Language="C#" Class="QuoteHandler" %>

using System;
using System.Web;
using System.IO;
using System.Text;

public class QuoteHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

        if (context.Request.HttpMethod == "OPTIONS")
        {
            context.Response.StatusCode = 200;
            return;
        }

        try
        {
            string jsonBody = "";
            using (var reader = new StreamReader(context.Request.InputStream, Encoding.UTF8))
            {
                jsonBody = reader.ReadToEnd();
            }

            if (string.IsNullOrEmpty(jsonBody))
            {
                context.Response.StatusCode = 400;
                context.Response.Write("{\"success\":false,\"message\":\"No quote data provided.\"}");
                return;
            }

            string dataDir = context.Server.MapPath("~/App_Data");
            if (!Directory.Exists(dataDir))
            {
                Directory.CreateDirectory(dataDir);
            }

            string logFile = Path.Combine(dataDir, "quotes.json");
            string entry = string.Format(
                "{{\"timestamp\":\"{0}\",\"payload\":{1}}},\n",
                DateTime.UtcNow.ToString("o"),
                jsonBody
            );

            File.AppendAllText(logFile, entry, Encoding.UTF8);

            string quoteId = "NTS-QT-" + DateTime.Now.ToString("yyyyMMdd-HHmmss");
            string responseJson = string.Format("{{\"success\":true,\"quoteId\":\"{0}\",\"message\":\"Quotation successfully registered in system!\"}}", quoteId);
            context.Response.Write(responseJson);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            context.Response.Write(string.Format("{{\"success\":false,\"message\":\"Error saving quote: {0}\"}}", ex.Message.Replace("\"", "\\\"")));
        }
    }

    public bool IsReusable
    {
        get { return true; }
    }
}
