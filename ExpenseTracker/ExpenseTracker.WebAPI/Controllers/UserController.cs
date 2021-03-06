﻿using System;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ExpenseTracker.Logic.Helpers;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.Exceptions;
using ExpenseTracker.WebAPI.Helpers;
using ExpenseTracker.WebAPI.Mappers;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Controllers
{
    public class UserController : ControllerBase
    {
        [HttpGet]
        public UserViewModel Get()
        {
            return CurrentUser.ToViewModel();
        }

        [HttpPost]
        public HttpResponseMessage Register(UserViewModel model)
        {
            PasswordComplexityHelper.Validate(model.Password, ModelState, PasswordIs.Required);

            if (!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            if (!model.AcceptsTermsAndConditions)
                throw new TermsAndConditionsNotAcceptedException();

            User entity = model.ToEntity();
            entity = UserManager.Create(entity, model.Password);
            EmailHelper.SendEmailAddressVerificationEmail(entity.Name, entity.Email, entity.EmailVerificationToken);

            return Created(entity.ToViewModel());
        }

        [HttpPut]
        public UserViewModel Update(UserViewModel model)
        {
            PasswordComplexityHelper.Validate(model.Password, ModelState, PasswordIs.NotRequired);

            if (!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            UserManager.Update(CurrentUser, model.ToEntity(), model.Password);

            return CurrentUser.ToViewModel();
        }

        [Route("user/reset-password")]
        [HttpPost]
        public void ResetPassword(ResetPasswordRequestViewModel model)
        {
            if(!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            if(!RecaptchaHelper.Verify(ClientIp, model.Challenge, model.Response))
                throw new InvalidCaptchaException();

            User user = UserManager.GetByEmail(model.Email);

            if (user != null)
            {
                UserManager.CreateNewResetPasswordToken(user);
                EmailHelper.SendPasswordResetVerificationEmail(user.Name, user.Email, user.PasswordResetToken);
            }
        }

        [Route("user/verify-reset-password/{resetPasswordToken}")]
        [HttpGet]
        public string VerifyResetPassword(string resetPasswordToken)
        {
            User user = UserManager.VerifyResetPassword(resetPasswordToken);

            if (user == null)
                throw new ResetPasswordTokenInvalidException();

            UserManager.CreateNewSessionToken(user);
            return user.SessionToken;
        }

        [Route("user/verify-email/{emailVerificationToken}")]
        [HttpGet]
        public string VerifyEmail(string emailVerificationToken)
        {
            User user = UserManager.VerifyEmail(emailVerificationToken);

            if (user == null)
                throw new EmailVerificationTokenInvalidException();

            UserManager.CreateNewSessionToken(user);
            return user.SessionToken;
        }

        [Route("user/sign-in")]
        [HttpPost]
        public string SignIn(SessionViewModel model)
        {
            if (!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            var user = UserManager.GetByEmail(model.Email);

            if (user == null)
                throw new IncorrectUsernamePasswordCombinationException();

            if (user.EmailVerificationDate == null)
                throw new EmailAddressNotVerifiedException();

            if (user.Locked)
                throw new UserAccountLockedException();

            if (!UserManager.HasPassword(user, model.Password))
            {
                user.InvalidAuthentications++;
                if (user.InvalidAuthentications > 4)
                    user.Locked = true;
                UserManager.SaveChanges();
                throw new IncorrectUsernamePasswordCombinationException();
            }

            UserManager.CreateNewSessionToken(user);
            return user.SessionToken;
        }

        [Route("user/sign-out")]
        [HttpDelete]
        public void SignOut()
        {
            try
            {
                CurrentUser.SessionToken = null;
                CurrentUser.SessionTokenExpirationDate = null;
                UserManager.SaveChanges();
            }
            catch (UnauthenticatedException) { }
        }

        [Route("user/email-unique")]
        [HttpGet]
        public bool EmailUnique(string email)
        {
            User user = UserManager.GetByEmail(email);

            if (user == null)
                return true;

            try
            {
                if (user.Id == CurrentUser.Id)
                    return true;
            }
            catch (UnauthenticatedException) { }

            return false;
        }

        [Route("user/available-options")]
        [HttpGet]
        public UserAvailableOptionsViewModel AvailableOptions()
        {
            return new UserAvailableOptionsViewModel
            {
                Countries = CountryHelper.AvailableCountries,
                Currencies = CurrencyHelper.AvailableCurrencies
            };
        }

        protected string ClientIp
        {
            get
            {
                if (HttpContext.Current != null)
                    return HttpContext.Current.Request.UserHostAddress;
                return null;
            }
        }
    }
}
