using System.IO;
using System.Net;
using System.Text;

namespace ExpenseTracker.API.Helpers
{
    public class RecaptchaHelper
    {
        public bool Verify(string clientIp, string challenge, string solution)
        {
            var postData = string.Format("&privatekey={0}&remoteip={1}&challenge={2}&response={3}", Configuration.RecaptchaPrivateKey, clientIp, challenge, solution);
            var postDataAsBytes = Encoding.UTF8.GetBytes(postData);

            var request = WebRequest.Create(Configuration.RecaptchaVerificationUrl);
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = postDataAsBytes.Length;
            var dataStream = request.GetRequestStream();
            dataStream.Write(postDataAsBytes, 0, postDataAsBytes.Length);
            dataStream.Close();

            var response = request.GetResponse();
            using (dataStream = response.GetResponseStream())
            {
                using (var reader = new StreamReader(dataStream))
                {
                    var responseFromServer = reader.ReadToEnd();
                    return responseFromServer.StartsWith("true");
                }
            }
        }
    }
}