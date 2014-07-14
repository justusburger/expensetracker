using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Managers;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;
using Nancy;

namespace ExpenseTracker.API.Controllers
{
    public abstract class ControllerBase : NancyModule
    {
        private IUserManager _userManager;
        public IUserManager userManager
        {
            get { return _userManager ?? (_userManager = new UserManager()); }
            set { _userManager = value; }
        }

        protected ControllerBase(string path) : base(path)
        {
            
        }


        protected Response Error(ErrorResponse response)
        {
            return Response.AsJson(response, response.StatusCode);
        }

    }
}