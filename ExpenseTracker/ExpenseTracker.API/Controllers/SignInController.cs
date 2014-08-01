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
            Get["/reset-password/{resetToken}"] = o => ValidateResetPasswordLink((string)o["resetToken"]);
            Put["/reset-password"] = o => ResetPassword(this.Bind<ResetPasswordRequestViewModel>());
        }

        private Response ValidateResetPasswordLink(string resetToken)
        {
            User user = UserManager.VerifyResetPassword(resetToken);

            if (user == null)
                return Error(ErrorResponse.Profile.RESET_PASSWORD_INVALID_TOKEN);

            UserViewModel profile = user.ToViewModel();
            MemorySessions.SetCurrentUser(profile, Request);
            return Response.AsJson(profile);
        }

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

        private Response ResetPassword(ResetPasswordRequestViewModel model)
        {
            User user = UserManager.GetByEmail(model.Email);

            if (user == null)
                return Error(ErrorResponse.Profile.RESET_PASSWORD_EMAIL_NOT_FOUND);

            var recaptchaHelper = new RecaptchaHelper();
            if (!recaptchaHelper.Verify(Request.UserHostAddress, model.Challenge, model.Response))
                return Error(ErrorResponse.Profile.RESET_PASSWORD_CAPTCHA_INVALID);

            var resetToken = UserManager.GetResetPasswordToken(user);
            var emailHelper = new EmailHelper();
            emailHelper.SendResetPasswordLink(user.Name, user.Email, resetToken);

            return Ok;
        }
    }
}