using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Web.Mvc;

namespace ExpenseTracker.WebAPI.Tests.Controllers
{
    public abstract class ControllerTestBase
    {
        public HttpControllerContext GetControllerContext()
        {
            var context = new HttpControllerContext
            {
                Request = new HttpRequestMessage(new HttpMethod("POST"), "/"),
            };
            context.Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration(new HttpRouteCollection("/")));
            return context;
        }
    }
}
