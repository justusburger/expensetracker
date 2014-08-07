using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http.ModelBinding;
using WebGrease.Css.Extensions;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class InvalidCaptchaException : Exception, IApplicationException
    {
        public new string Message { get { return "Invalid captcha solution"; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.BadRequest; } }
    }
}