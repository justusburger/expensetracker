using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace ExpenseTracker.API.Helpers
{
    public class EmailTemplateHelper
    {
        public string RegistrationEmailBody(string name, string verificationToken)
        {
            string template = System.IO.File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + @"EmailTemplates\template.html");
            string registration = System.IO.File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + @"EmailTemplates\registration.html");
            string body = template.Replace("{{ body }}", registration);
            body = body.Replace("{{ name }}", name);
            body = body.Replace("{{ verificationLink }}", Configuration.UiHost + "/#/verify/" + verificationToken);
            return body;
        }
    }
}