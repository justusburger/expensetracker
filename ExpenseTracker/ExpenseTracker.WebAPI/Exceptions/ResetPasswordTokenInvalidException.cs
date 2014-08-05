using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class ResetPasswordTokenInvalidException : Exception, IApplicationException
    {
        public new string Message { get { return "Reset password token invalid"; } }
        public HttpStatusCode StatusCode { get{ return HttpStatusCode.BadRequest; } }
    }
}