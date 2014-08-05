using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class IncorrectUsernamePasswordCombinationException : Exception, IApplicationException
    {
        public new string Message { get { return "Incorrect username/password combination"; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.Unauthorized; } }
    }
}