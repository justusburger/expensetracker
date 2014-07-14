using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Exceptions;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Managers;
using ExpenseTracker.API.Models;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Responses;

namespace ExpenseTracker.API.Controllers
{
    public class Registration : ControllerBase
    {
        public Registration() : base("/registration")
        {
            Post["/"] = o => POST_REGISTER(this.Bind<RegistrationForm>());
        }

        private Response POST_REGISTER(RegistrationForm model)
        {
            if (!model.AcceptTermsAndConditions)
                return Error(ErrorResponse.Registration.ACCEPT_TERMS_AND_CONDITIONS_FALSE);

            User entity = model.ToEntity();
            try
            {
                userManager.Register(entity, model.Password);
            }
            catch (UniqueOrIndexContraintException ex)
            {
                return Error(ErrorResponse.Registration.EMAIL_ALREADY_REGISTERED);
            }

            return new Response { StatusCode = HttpStatusCode.Created };
        }
    }
}