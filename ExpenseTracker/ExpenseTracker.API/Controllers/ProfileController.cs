using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using Nancy;

namespace ExpenseTracker.API.Controllers
{
    public class ProfileController : ControllerBase
    {
        public ProfileController() : base("/profile")
        {
            this.RequiresAuthentication();
            Get["/"] = o => GetCurrentUserProfile();
        }

        private Response GetCurrentUserProfile()
        {
            return Response.AsJson(CurrentUser);
        }
    }
}