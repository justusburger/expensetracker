using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class NotFoundException : Exception, IApplicationException
    {
        public new string Message { get { return "Not found"; } }
        public HttpStatusCode StatusCode { get { return HttpStatusCode.NotFound; } }
    }
}