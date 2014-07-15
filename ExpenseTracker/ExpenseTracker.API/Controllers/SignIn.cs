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
    public class SignIn : ControllerBase
    {
        public SignIn() : base("/sign-in")
        {
            Post["/"] = o => CreateSignInRequest(this.Bind<SignInRequest>());
            Delete["/"] = o => SignOut();
        }

        //In other word: sign in
        private Response CreateSignInRequest(SignInRequest model)
        {
            User user = userManager.GetByEmail(model.Email);

            if (user == null)
                return Error(ErrorResponse.SignIn.INCORRECT_DETAILS);

            if (user.Locked)
                return Error(ErrorResponse.SignIn.ACCOUNT_LOCKED);

            if (!userManager.HasPassword(user, model.Password))
            {
                user.InvalidAuthentications++;
                if (user.InvalidAuthentications > 2)
                    user.Locked = true;
                userManager.SaveChanges();
                return Error(ErrorResponse.SignIn.INCORRECT_DETAILS);
            }

            MemorySessions.SetCurrentUser(user.ToViewModel(), Request);

            return Ok;
        }

        private Response SignOut()
        {
            MemorySessions.RemoveCurrentUser(Request);
            return Ok;
        }
    }
}