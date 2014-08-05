using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Mvc;
using ExpenseTracker.WebAPI.Mappers;

namespace ExpenseTracker.WebAPI.Exceptions
{
    public class ApplicationExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            var exception = actionExecutedContext.Exception as IApplicationException;
            if(exception != null)
                actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse(exception.StatusCode, exception.ToViewModel());
            base.OnException(actionExecutedContext);
        }

    }
}