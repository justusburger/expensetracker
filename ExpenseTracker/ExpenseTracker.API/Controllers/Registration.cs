using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Managers;
using ExpenseTracker.API.Models;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Responses;

namespace ExpenseTracker.API.Controllers
{
    public class Registration : NancyModule
    {
        private IUserManager _userManager;
        public IUserManager userManager
        {
            get { return _userManager ?? (_userManager = new UserManager()); }
            set { _userManager = value; }
        }

        public Registration() : base("/registration")
        {
            Post["/"] = o => POST_REGISTER(this.Bind<RegistrationForm>());

        }

        private Response POST_REGISTER(RegistrationForm model)
        {
            if (!model.AcceptTermsAndConditions)
            {
                var response = new ErrorResponse
                {
                    Errors = new List<string> { "Accepting the terms and conditions is mandatory." }
                };
                return Response.AsJson(response, HttpStatusCode.ExpectationFailed);
            }

            User entity = model.ToEntity();
            userManager.Register(entity, model.Password);

            return new Response { StatusCode = HttpStatusCode.Created };
        }
    }
}