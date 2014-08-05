using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using ExpenseTracker.WebAPI.Controllers;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Helpers
{
    public interface IEmailHelper
    {
        void SendEmailAddressVerificationEmail(string name, string emailAddress, string emailVerificationToken);
        void SendPasswordResetVerificationEmail(string name, string emailAddress, string resetPasswordVerificationToken);
    }

    public class EmailHelper : IEmailHelper
    {
        private IEmailTemplateHelper _emailTemplateHelper;
        public IEmailTemplateHelper EmailTemplateHelper
        {
            get { return _emailTemplateHelper ?? (_emailTemplateHelper = new EmailTemplateHelper()); }
            set { _emailTemplateHelper = value; }
        }

        public void SendEmailAddressVerificationEmail(string name, string emailAddress, string emailVerificationToken)
        {
            var message = new MailMessage(Configuration.SmtpFrom, emailAddress)
            {
                Subject = "Expensetracker.co.za registration email verification",
                SubjectEncoding = System.Text.Encoding.UTF8,
                Body = EmailTemplateHelper.GetEmailAddressVerificationEmailBody(name, emailVerificationToken),
                BodyEncoding = System.Text.Encoding.UTF8,
                IsBodyHtml = true
            };
            var client = new SmtpClient(Configuration.SmtpHost)
            {
                Credentials = new NetworkCredential(Configuration.SmtpUsername, Configuration.SmtpPassword)
            };
            client.Send(message);
        }

        public void SendPasswordResetVerificationEmail(string name, string emailAddress, string resetPasswordVerificationToken)
        {
            var message = new MailMessage(Configuration.SmtpFrom, emailAddress)
            {
                Subject = "Expensetracker.co.za reset password",
                SubjectEncoding = System.Text.Encoding.UTF8,
                Body = EmailTemplateHelper.GetResetPasswordVerificationEmailBody(name, resetPasswordVerificationToken),
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