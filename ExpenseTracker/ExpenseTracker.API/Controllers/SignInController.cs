using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;
using Nancy;
using Nancy.ModelBinding;
using User = ExpenseTracker.API.Models.User;

namespace ExpenseTracker.API.Controllers
{
    public class SignInController : ControllerBase
    {
        public SignInController() : base("/sign-in")
        {
            Post["/"] = o => SignIn(this.Bind<SignInRequestViewModel>());
            Delete["/"] = o => SignOut();
        }

        /* In other word: sign in */
        private Response SignIn(SignInRequestViewModel model)
        {
            User user = UserManager.GetByEmail(model.Email);

            if (user == null)
                return Error(ErrorResponse.SignIn.INCORRECT_DETAILS);

            if(user.EmailVerificationDate == null)
                return Error(ErrorResponse.SignIn.EMAIL_NOT_VERIFIED);

            if (user.Locked)
                return Error(ErrorResponse.SignIn.ACCOUNT_LOCKED);

            if (!UserManager.HasPassword(user, model.Password))
            {
                user.InvalidAuthentications++;
                if (user.InvalidAuthentications > 4)
                    user.Locked = true;
                UserManager.SaveChanges();
                return Error(ErrorResponse.SignIn.INCORRECT_DETAILS);
            }

            if (user.InvalidAuthentications > 0)
            {
                user.InvalidAuthentications = 0;
                UserManager.SaveChanges();
            }

            var profile = user.ToViewModel();
            MemorySessions.SetCurrentUser(profile, Request);

            return Response.AsJson(profile);
        }

        private Response SignOut()
        {
            MemorySessions.RemoveCurrentUser(Request);
            return Ok;
        }
    }
}