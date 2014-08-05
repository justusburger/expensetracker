using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using ExpenseTracker.WebAPI.Controllers;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Helpers
{
    public interface IEmailTemplateHelper
    {
        string GetEmailAddressVerificationEmailBody(string name, string emailVerificationToken);
        string GetResetPasswordVerificationEmailBody(string name, string resetPasswordVerificationToken);
    }

    public class EmailTemplateHelper : IEmailTemplateHelper
    {
        private class EmailController : Controller { }

        private string GetTemplateContent(string template, object viewModel)
        {
            var context = HttpContext.Current;
            var contextBase = new HttpContextWrapper(context);
            var routeData = new RouteData();
            routeData.Values.Add("controller", "EmailController");
            var controllerContext = new ControllerContext(contextBase, routeData, new EmailController());
            var razorViewEngine = new RazorViewEngine();
            var razorViewResult = razorViewEngine.FindPartialView(controllerContext, template, false);
            var writer = new StringWriter();
            var viewContext = new ViewContext(controllerContext, razorViewResult.View, new ViewDataDictionary(viewModel), new TempDataDictionary(), writer);
            razorViewResult.View.Render(viewContext, writer);
            return writer.ToString();
        }

        public string GetEmailAddressVerificationEmailBody(string name, string emailVerificationToken)
        {
            var viewModel = new VerifyEmailViewModel
            {
                Name = name,
                VerificationLink = Configuration.UiHost + "/#/verify/" + emailVerificationToken
            };
            return GetTemplateContent(@"~\EmailTemplates\VerifyEmail.cshtml", viewModel);
        }

        public string GetResetPasswordVerificationEmailBody(string name, string resetPasswordVerificationToken)
        {
            var viewModel = new ResetPasswordViewModel
            {
                Name = name,
                VerificationLink = Configuration.UiHost + "/#/reset-password/" + resetPasswordVerificationToken
            };
            return GetTemplateContent(@"~\EmailTemplates\ResetPassword.cshtml", viewModel);
        }
    }
}