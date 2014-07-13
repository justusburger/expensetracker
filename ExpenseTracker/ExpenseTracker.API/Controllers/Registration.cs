using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Responses;

namespace ExpenseTracker.API.Controllers
{
    public class Registration : NancyModule
    {
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

            return new Response { StatusCode = HttpStatusCode.Created };
        }
    }
}