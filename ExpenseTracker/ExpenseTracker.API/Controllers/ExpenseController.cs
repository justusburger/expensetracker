using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;
using Nancy;
using Nancy.ModelBinding;

namespace ExpenseTracker.API.Controllers
{
    public class ExpenseController : ControllerBase
    {
        public ExpenseController() : base("/expense")
        {
            this.RequiresAuthentication();
            Get["/"] = o => Query(this.Bind<DataProviderQueryViewModel>());
            Get["/{id:int}"] = o => GetById((int)o["id"]);
            Post["/"] = o => Create(this.Bind<ExpenseViewModel>());
            Put["/"] = o => Update(this.Bind<ExpenseViewModel>());
            Delete["/{id:int}"] = o => DeleteById((int)o["id"]);
            Get["/tags"] = o => GetAllTags();
        }

        private Response Query(DataProviderQueryViewModel query)
        {
            ExpenseDataProviderResults results = ExpenseManager.Query(CurrentUser.Id, query.ToEntity());

            if (query.Download)
                return new ExpenseExportHelper().Export(results.ToViewModel());

            return Response.AsJson(results.ToViewModel());
        }

        private Response GetById(int id)
        {
            Expense entity = ExpenseManager.GetById(CurrentUser.Id, id);
            if (entity == null)
                return NotFound;
            return Response.AsJson(entity.ToViewModel());
        }

        private Response Create(ExpenseViewModel model)
        {
            Expense entity = model.ToEntity();
            entity = ExpenseManager.Create(CurrentUser.Id, entity);
            return Created(entity.ToViewModel());
        }

        private Response Update(ExpenseViewModel model)
        {
            Expense entity = model.ToEntity();
            ExpenseManager.Update(CurrentUser.Id, entity);
            return Response.AsJson(entity.ToViewModel());
        }

        private Response DeleteById(int id)
        {
            ExpenseManager.Delete(CurrentUser.Id, id);
            return Ok;
        }

        private Response GetAllTags()
        {
            var tags = ExpenseManager.GetAllTags(CurrentUser.Id).GroupBy(t => t.Text);
            var result = tags.Select(group => new TagViewModel { Text = group.Key, Count = group.Count() }).ToList();
            return Response.AsJson(result);
        }
    }
}