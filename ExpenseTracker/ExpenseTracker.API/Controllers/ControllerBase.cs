using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Managers;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;
using Nancy;
using Nancy.ModelBinding.DefaultBodyDeserializers;

namespace ExpenseTracker.API.Controllers
{
    public abstract class ControllerBase : NancyModule
    {
        private IUserManager _userManager;
        public IUserManager UserManager
        {
            get { return _userManager ?? (_userManager = new UserManager()); }
            set { _userManager = value; }
        }

        private IExpenseManager _expenseManager;
        public IExpenseManager ExpenseManager
        {
            get { return _expenseManager ?? (_expenseManager = new ExpenseManager()); }
            set { _expenseManager = value; }
        }

        protected ControllerBase(string path) : base(path)
        {
            //This just simulates a real environment
            //Thread.Sleep(new Random().Next(1000, 5000));
        }

        protected Response Error(ErrorResponse response)
        {
            return Response.AsJson(response, response.StatusCode);
        }

        public Response Ok
        {
            get { return new Response { StatusCode = HttpStatusCode.OK }; }
        }

        public Response NotFound
        {
            get { return new NotFoundResponse(); }
        }

        public Response Created<T>(T model)
        {
            return Response.AsJson(model, HttpStatusCode.Created);
        }
        
        public ViewModels.UserViewModel CurrentUser
        {
            get { return MemorySessions.GetCurrentUser(Request) as ViewModels.UserViewModel; }
        }
    }
}