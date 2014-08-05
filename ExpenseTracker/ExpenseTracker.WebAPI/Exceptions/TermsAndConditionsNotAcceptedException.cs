using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class TermsAndConditionsNotAcceptedException : Exception, IApplicationException
    {
        public new string  Message { get { return "Accepting the terms and conditions is required for registration"; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.ExpectationFailed; } }
    }
}