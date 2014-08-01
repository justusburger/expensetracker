using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;
using Nancy;
using Nancy.ModelBinding;

namespace ExpenseTracker.API.Controllers
{
    public class ProfileController : ControllerBase
    {
        public ProfileController() : base("/profile")
        {
            this.RequiresAuthentication();
            Get["/"] = o => GetCurrentUserProfile();
            Get["/full"] = o => GetFullProfile();
            Put["/"] = o => Update(this.Bind<FullProfileViewModel>());
        }

        private Response GetCurrentUserProfile()
        {
            var a = Configuration.ApiHost;
            return Response.AsJson(CurrentUser);
        }

        private Response GetFullProfile()
        {
            var user = UserManager.GetByEmail(CurrentUser.Email);
            return Response.AsJson(user.ToFullViewModel());
        }

        private Response Update(FullProfileViewModel model)
        {
            var entity = model.ToEntity();
            UserManager.Update(CurrentUser.Id, entity, model.Password);
            var profile = entity.ToViewModel();
            MemorySessions.SetCurrentUser(profile, Request);
            return Response.AsJson(profile);
        }
    }
}