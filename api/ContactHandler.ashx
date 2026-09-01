<%@ WebHandler Language="C#" Class="ContactHandler" %>

using System;
using System.Web;
using System.IO;
using System.Text;

public class ContactHandler : IHttpHandler
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

            string name = context.Request["name"] ?? "";
            string company = context.Request["company"] ?? "";
            string phone = context.Request["phone"] ?? "";
            string product = context.Request["product"] ?? "";
            string message = context.Request["message"] ?? "";

            if (string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(jsonBody))
            {
                // Fallback basic parse if JSON body sent
                name = ExtractJsonValue(jsonBody, "name");
                company = ExtractJsonValue(jsonBody, "company");
                phone = ExtractJsonValue(jsonBody, "phone");
                product = ExtractJsonValue(jsonBody, "product");
                message = ExtractJsonValue(jsonBody, "message");
            }

            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(phone))
            {
                context.Response.StatusCode = 400;
                context.Response.Write("{\"success\":false,\"message\":\"Name and Phone number are required.\"}");
                return;
            }

            string dataDir = context.Server.MapPath("~/App_Data");
            if (!Directory.Exists(dataDir))
            {
                Directory.CreateDirectory(dataDir);
            }

            string logFile = Path.Combine(dataDir, "inquiries.json");
            string entry = string.Format(
                "{{\"timestamp\":\"{0}\",\"name\":\"{1}\",\"company\":\"{2}\",\"phone\":\"{3}\",\"product\":\"{4}\",\"message\":\"{5}\"}},\n",
                DateTime.UtcNow.ToString("o"),
                EscapeJson(name),
                EscapeJson(company),
                EscapeJson(phone),
                EscapeJson(product),
                EscapeJson(message)
            );

            File.AppendAllText(logFile, entry, Encoding.UTF8);

            string whatsappMsg = string.Format("Hello NDIGO Tech! I have sent an inquiry via your website.%0A- Name: {0}%0A- Company: {1}%0A- Phone: {2}%0A- Product: {3}%0A- Message: {4}",
                Uri.EscapeDataString(name),
                Uri.EscapeDataString(company),
                Uri.EscapeDataString(phone),
                Uri.EscapeDataString(product),
                Uri.EscapeDataString(message)
            );

            string responseJson = string.Format("{{\"success\":true,\"message\":\"Inquiry received successfully! Our sales team will contact you shortly.\",\"whatsappUrl\":\"https://wa.me/8801770082829?text={0}\"}}", whatsappMsg);
            context.Response.Write(responseJson);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            context.Response.Write(string.Format("{{\"success\":false,\"message\":\"Error saving inquiry: {0}\"}}", EscapeJson(ex.Message)));
        }
    }

    private string ExtractJsonValue(string json, string key)
    {
        try
        {
            string search = "\"" + key + "\":\"";
            int start = json.IndexOf(search);
            if (start == -1) return "";
            start += search.Length;
            int end = json.IndexOf("\"", start);
            if (end == -1) return "";
            return json.Substring(start, end - start);
        }
        catch { return ""; }
    }

    private string EscapeJson(string s)
    {
        if (string.IsNullOrEmpty(s)) return "";
        return s.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "").Replace("\n", "\\n");
    }

    public bool IsReusable
    {
        get { return true; }
    }
}
