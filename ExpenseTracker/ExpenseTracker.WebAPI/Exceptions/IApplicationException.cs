using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public interface IApplicationException
    {
        string Message { get; }
        HttpStatusCode StatusCode { get; }
    }
}