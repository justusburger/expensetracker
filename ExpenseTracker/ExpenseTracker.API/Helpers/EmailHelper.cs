using System.Net;
using System.Net.Mail;

namespace ExpenseTracker.API.Helpers
{
    public class EmailHelper
    {
        private SmtpClient _smtpClient;
        public SmtpClient SmtpClient
        {
            get { return _smtpClient ?? (_smtpClient = new SmtpClient(Configuration.SmtpHost)); }
            set { _smtpClient = value; }
        }

        public void SendRegistrationEmailVerification(string name, string emailAddress, string verificationToken)
        {
            var templateHelper = new EmailTemplateHelper();
            var message = new MailMessage(Configuration.SmtpFrom, emailAddress)
            {
                Subject = "Expensetracker.co.za registration email verification",
                SubjectEncoding = System.Text.Encoding.UTF8,
                Body = templateHelper.RegistrationEmailBody(name, verificationToken),
                BodyEncoding = System.Text.Encoding.UTF8,
                IsBodyHtml = true
            };
            var client = new SmtpClient(Configuration.SmtpHost)
            {
                Credentials = new NetworkCredential(Configuration.SmtpUsername, Configuration.SmtpPassword)
            };
            client.Send(message);
        }
        
    }
}