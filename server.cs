using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

namespace NtsBackendServer
{
    class Program
    {
        private static string rootDir = AppDomain.CurrentDomain.BaseDirectory;
        private static int port = 5000;

        static void Main(string[] args)
        {
            if (args.Length > 0)
            {
                int customPort = 0;
                if (int.TryParse(args[0], out customPort))
                {
                    port = customPort;
                }
            }

            HttpListener listener = new HttpListener();
            string prefix = string.Format("http://localhost:{0}/", port);
            string prefixLocal = string.Format("http://127.0.0.1:{0}/", port);
            
            try
            {
                listener.Prefixes.Add(prefix);
                listener.Prefixes.Add(prefixLocal);
                listener.Start();
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Could not start server on port " + port + ": " + ex.Message);
                Console.ResetColor();
                Console.WriteLine("Press any key to exit...");
                Console.ReadKey();
                return;
            }

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("=================================================================");
            Console.WriteLine("   NDIGO TECH SOLUTIONS - ASP.NET / C# Backend & Web Server      ");
            Console.WriteLine("=================================================================");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(" Server Running At : " + prefix);
            Console.WriteLine(" Root Directory    : " + rootDir);
            Console.WriteLine(" API Endpoints     : /api/ContactHandler.ashx, /api/QuoteHandler.ashx");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine(" Press Ctrl+C or close this window to stop.");
            Console.ResetColor();
            Console.WriteLine("=================================================================");

            ThreadPool.QueueUserWorkItem((o) =>
            {
                try
                {
                    System.Diagnostics.Process.Start(prefix);
                }
                catch { }
            });

            while (listener.IsListening)
            {
                try
                {
                    HttpListenerContext context = listener.GetContext();
                    ThreadPool.QueueUserWorkItem((ctxObj) => ProcessRequest((HttpListenerContext)ctxObj), context);
                }
                catch { }
            }
        }

        private static void ProcessRequest(HttpListenerContext context)
        {
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;

            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");

            if (request.HttpMethod == "OPTIONS")
            {
                response.StatusCode = 200;
                response.Close();
                return;
            }

            string rawUrl = request.Url.AbsolutePath;
            if (rawUrl == "/" || string.IsNullOrEmpty(rawUrl))
            {
                rawUrl = "/index.html";
            }

            // Handle API Endpoints
            if (rawUrl.IndexOf("/api/ContactHandler", StringComparison.OrdinalIgnoreCase) >= 0)
            {
                HandleContactApi(request, response);
                return;
            }

            if (rawUrl.IndexOf("/api/QuoteHandler", StringComparison.OrdinalIgnoreCase) >= 0)
            {
                HandleQuoteApi(request, response);
                return;
            }

            // Serve Static Files
            string filePath = Path.Combine(rootDir, rawUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

            if (File.Exists(filePath))
            {
                try
                {
                    byte[] bytes = File.ReadAllBytes(filePath);
                    response.ContentType = GetMimeType(Path.GetExtension(filePath));
                    response.ContentLength64 = bytes.Length;
                    response.StatusCode = 200;
                    response.OutputStream.Write(bytes, 0, bytes.Length);
                }
                catch (Exception ex)
                {
                    response.StatusCode = 500;
                    byte[] err = Encoding.UTF8.GetBytes("Server Error: " + ex.Message);
                    response.OutputStream.Write(err, 0, err.Length);
                }
            }
            else
            {
                response.StatusCode = 404;
                byte[] notFound = Encoding.UTF8.GetBytes("404 Not Found: " + rawUrl);
                response.OutputStream.Write(notFound, 0, notFound.Length);
            }

            response.Close();
        }

        private static void HandleContactApi(HttpListenerRequest request, HttpListenerResponse response)
        {
            response.ContentType = "application/json";
            try
            {
                string body = "";
                using (var reader = new StreamReader(request.InputStream, Encoding.UTF8))
                {
                    body = reader.ReadToEnd();
                }

                string dataDir = Path.Combine(rootDir, "App_Data");
                if (!Directory.Exists(dataDir)) Directory.CreateDirectory(dataDir);

                string logFile = Path.Combine(dataDir, "inquiries.json");
                string entry = string.Format("{{\"timestamp\":\"{0}\",\"data\":{1}}},\n", DateTime.UtcNow.ToString("o"), string.IsNullOrEmpty(body) ? "{}" : body);
                File.AppendAllText(logFile, entry, Encoding.UTF8);

                string json = "{\"success\":true,\"message\":\"Inquiry saved to ASP.NET server successfully!\"}";
                byte[] b = Encoding.UTF8.GetBytes(json);
                response.StatusCode = 200;
                response.OutputStream.Write(b, 0, b.Length);
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                byte[] b = Encoding.UTF8.GetBytes("{\"success\":false,\"message\":\"" + ex.Message.Replace("\"", "\\\"") + "\"}");
                response.OutputStream.Write(b, 0, b.Length);
            }
            response.Close();
        }

        private static void HandleQuoteApi(HttpListenerRequest request, HttpListenerResponse response)
        {
            response.ContentType = "application/json";
            try
            {
                string body = "";
                using (var reader = new StreamReader(request.InputStream, Encoding.UTF8))
                {
                    body = reader.ReadToEnd();
                }

                string dataDir = Path.Combine(rootDir, "App_Data");
                if (!Directory.Exists(dataDir)) Directory.CreateDirectory(dataDir);

                string logFile = Path.Combine(dataDir, "quotes.json");
                string entry = string.Format("{{\"timestamp\":\"{0}\",\"quote\":{1}}},\n", DateTime.UtcNow.ToString("o"), string.IsNullOrEmpty(body) ? "{}" : body);
                File.AppendAllText(logFile, entry, Encoding.UTF8);

                string quoteId = "NTS-" + DateTime.Now.ToString("yyyyMMdd-HHmmss");
                string json = string.Format("{{\"success\":true,\"quoteId\":\"{0}\",\"message\":\"Quote generated and recorded!\"}}", quoteId);
                byte[] b = Encoding.UTF8.GetBytes(json);
                response.StatusCode = 200;
                response.OutputStream.Write(b, 0, b.Length);
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                byte[] b = Encoding.UTF8.GetBytes("{\"success\":false,\"message\":\"" + ex.Message.Replace("\"", "\\\"") + "\"}");
                response.OutputStream.Write(b, 0, b.Length);
            }
            response.Close();
        }

        private static string GetMimeType(string ext)
        {
            switch (ext.ToLower())
            {
                case ".html": case ".htm": return "text/html; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".js": return "application/javascript; charset=utf-8";
                case ".json": return "application/json; charset=utf-8";
                case ".png": return "image/png";
                case ".jpg": case ".jpeg": return "image/jpeg";
                case ".svg": return "image/svg+xml";
                case ".pdf": return "application/pdf";
                case ".ico": return "image/x-icon";
                default: return "application/octet-stream";
            }
        }
    }
}
