using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Globalization;
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
            Post["/"] = o => Register(this.Bind<RegistrationRequestViewModel>());
            Get["/email-unique"] = o => EmailUnique((string) Request.Query["email"], (string)Request.Query["id"]);
            Get["/verify/{emailToken}"] = o => Verify((string)o["emailToken"]);
        }

        private Response Register(RegistrationRequestViewModel model)
        {
            if (!model.AcceptTermsAndConditions)
                return Error(ErrorResponse.Registration.ACCEPT_TERMS_AND_CONDITIONS_FALSE);

            User entity = model.ToEntity();
            entity = UserManager.Create(entity, model.Password);
            
            return Ok;
        }

        private Response EmailUnique(string email, string id)
        {
            User user = UserManager.GetByEmail(email);
            if(user == null)
                return Response.AsJson(true);

            if(user.Id.ToString(CultureInfo.InvariantCulture) == id)
                return Response.AsJson(true);

            return Response.AsJson(false);
        }

        private Response Verify(string emailToken)
        {
            User user = UserManager.VerifyEmail(emailToken);

            if (user == null)
                return Error(ErrorResponse.Registration.EMAIL_VERIFICATION_TOKEN_NOT_FOUND);

            var profile = user.ToViewModel();
            MemorySessions.SetCurrentUser(profile, Request);
            return Response.AsJson(profile);
        }
    }
}