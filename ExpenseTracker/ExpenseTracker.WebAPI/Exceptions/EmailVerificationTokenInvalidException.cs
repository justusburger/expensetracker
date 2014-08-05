using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class EmailVerificationTokenInvalidException : Exception, IApplicationException
    {
        public new string Message { get { return "Invalid email verification token."; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.BadRequest; } }
    }
}