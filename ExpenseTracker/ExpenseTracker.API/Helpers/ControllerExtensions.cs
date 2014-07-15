using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;
using Nancy;
using Nancy.Extensions;
using Nancy.Responses;

namespace ExpenseTracker.API.Helpers
{
    public static class ControllerExtensions
    {
        public static void RequiresAuthentication(this Nancy.INancyModule module)
        {
            module.AddBeforeHookOrExecute(HandleUnauthenticated);
        }

        public static Response HandleUnauthenticated(NancyContext context)
        {
            Response response = null;
            if (context.CurrentUser == null)
            {
                response = new JsonResponse(ErrorResponse.Profile.UNAUTHENTICATED, new DefaultJsonSerializer())
                {
                    StatusCode = HttpStatusCode.Unauthorized
                };
            }

            return response;
        }
    }
}