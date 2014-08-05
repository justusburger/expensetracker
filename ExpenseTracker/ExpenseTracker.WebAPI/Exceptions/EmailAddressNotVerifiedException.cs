using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class EmailAddressNotVerifiedException : Exception, IApplicationException
    {
        public new string Message { get { return "Email address has not been verified."; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.ExpectationFailed; } }
    }
}