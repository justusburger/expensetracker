using System.Web.Configuration;

namespace ExpenseTracker.WebAPI.Helpers
{
    public static class Configuration
    {
        public static string SmtpHost { get { return WebConfigurationManager.AppSettings["smtpHost"]; } }
        public static string SmtpFrom { get { return WebConfigurationManager.AppSettings["smtpFrom"]; } }
        public static string SmtpUsername { get { return WebConfigurationManager.AppSettings["smtpUsername"]; } }
        public static string SmtpPassword { get { return WebConfigurationManager.AppSettings["smtpPassword"]; } }
        public static string ApiHost { get { return WebConfigurationManager.AppSettings["apiHost"]; } }
        public static string UiHost { get { return WebConfigurationManager.AppSettings["uiHost"]; } }
        public static string RecaptchaPublicKey { get { return WebConfigurationManager.AppSettings["recaptchaPublicKey"]; } }
        public static string RecaptchaPrivateKey { get { return WebConfigurationManager.AppSettings["recaptchaPrivateKey"]; } }
        public static string RecaptchaVerificationUrl { get { return WebConfigurationManager.AppSettings["recaptchaVerificationUrl"]; } }
    }
}