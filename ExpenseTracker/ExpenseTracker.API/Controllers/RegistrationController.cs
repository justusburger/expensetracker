using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Exceptions;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Managers;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Responses;
using Nancy.Security;
using User = ExpenseTracker.API.Models.User;

namespace ExpenseTracker.API.Controllers
{
    public class RegistrationController : ControllerBase
    {
        public RegistrationController() : base("/registration")
        {
            Post["/"] = o => CreateRegistrationRequest(this.Bind<RegistrationRequestViewModel>());
            Get["/email-unique"] = o => EmailUnique((string) Request.Query["email"]);
        }

        private Response CreateRegistrationRequest(RegistrationRequestViewModel model)
        {
            if (!model.AcceptTermsAndConditions)
                return Error(ErrorResponse.Registration.ACCEPT_TERMS_AND_CONDITIONS_FALSE);

            User entity = model.ToEntity();
            UserManager.Create(entity, model.Password);

            return new Response { StatusCode = HttpStatusCode.Created };
        }

        private Response EmailUnique(string email)
        {
            User user = UserManager.GetByEmail(email);
            return Response.AsJson(user == null);
        }
    }
}