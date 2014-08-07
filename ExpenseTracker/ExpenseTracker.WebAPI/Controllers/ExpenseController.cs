using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ExpenseTracker.API.ViewModels;
using ExpenseTracker.Logic;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.Exceptions;
using ExpenseTracker.WebAPI.Helpers;
using ExpenseTracker.WebAPI.Mappers;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Controllers
{
    public class ExpenseController : ControllerBase
    {
        private IExpenseExportHelper _expenseExportHelper;
        public IExpenseExportHelper ExpenseExportHelper
        {
            get { return _expenseExportHelper ?? (_expenseExportHelper = new ExpenseExportHelper()); }
            set { _expenseExportHelper = value; }
        }

        [Route("expense")]
        [HttpGet]
        public HttpResponseMessage Query([FromUri]DataProviderQueryViewModel query)
        {
            if(!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            ExpenseDataProviderResults results = ExpenseManager.Query(CurrentUser.Id, query.ToEntity());

            if (query.Download)
                return ExpenseExportHelper.Export(results.ToViewModel(), CurrentUser.Currency);

            return OK(results.ToViewModel());
        }

        [Route("expense/{id}")]
        [HttpGet]
        public ExpenseViewModel Get(int id)
        {
            var expense = ExpenseManager.GetById(CurrentUser.Id, id);

            if (expense == null)
                throw new NotFoundException();

            return expense.ToViewModel();
        }

        [Route("expense")]
        [HttpPost]
        public HttpResponseMessage Create(ExpenseViewModel model)
        {
            if(!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            Expense entity = model.ToEntity();
            entity = ExpenseManager.Create(CurrentUser.Id, entity);
            return Created(entity.ToViewModel());
        }

        [Route("expense")]
        [HttpPut]
        public ExpenseViewModel Update(ExpenseViewModel model)
        {
            if (!ModelState.IsValid)
                throw new ValidationFailedException(ModelState);

            Expense originalEntity = ExpenseManager.GetById(CurrentUser.Id, model.Id);

            if(originalEntity == null)
                throw new NotFoundException();

            Expense entity = model.ToEntity();
            ExpenseManager.Update(originalEntity, entity);
            return originalEntity.ToViewModel();
        }

        [Route("expense/{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            Expense entity = ExpenseManager.GetById(CurrentUser.Id, id);

            if (entity == null)
                throw new NotFoundException();

            ExpenseManager.Delete(entity);
        }

        [Route("expense/tags")]
        [HttpGet]
        public IEnumerable<TagViewModel> GetAllTags()
        {
            var tags = ExpenseManager.GetAllTags(CurrentUser.Id).GroupBy(t => t.Text);
            var result = tags.Select(group => new TagViewModel { Text = group.Key, Count = group.Count() }).ToList();
            return result;
        }
    }
}