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
    public class ExpenseTypeController : ControllerBase
    {
        public ExpenseTypeController() : base("/expense-type")
        {
            this.RequiresAuthentication();
            Get["/"] = o => GetAll();
            Get["/{id}"] = o => GetById((int)o["id"]);
            Post["/"] = o => Create(this.Bind<ExpenseTypeViewModel>());
            Delete["/{id}"] = o => DeleteById((int) o["id"]);
        }

        private Response GetAll()
        {
            List<ExpenseTypeViewModel> expenseTypes = ExpenseTypeManager.AllByUser(CurrentUser.Id).Select(ExpenseTypeMapper.ToViewModel).ToList();
            return Response.AsJson(expenseTypes);
        }

        private Response GetById(int id)
        {
            ExpenseType expenseType = ExpenseTypeManager.GetById(CurrentUser.Id, id);
            if (expenseType == null)
                return NotFound;
            return Response.AsJson(expenseType.ToViewModel());
        }

        private Response Create(ExpenseTypeViewModel model)
        {
            ExpenseType entity = model.ToEntity();
            entity = ExpenseTypeManager.Create(CurrentUser.Id, entity);
            return Created(entity.ToViewModel());
        }

        private Response DeleteById(int id)
        {
            ExpenseTypeManager.Delete(CurrentUser.Id, id);
            return Ok;
        }
    }
}