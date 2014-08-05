using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace ExpenseTracker.WebAPI.Controllers
{
    public class HomeController : ControllerBase
    {
        public string Get()
        {
            return "Expensetracker.co.za API";
        }

    }
}
