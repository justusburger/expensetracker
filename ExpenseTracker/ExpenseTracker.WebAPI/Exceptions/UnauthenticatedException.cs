using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class UnauthenticatedException : Exception, IApplicationException
    {
        public new string Message { get { return "User is unauthenticated."; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.Unauthorized; } }
    }
}