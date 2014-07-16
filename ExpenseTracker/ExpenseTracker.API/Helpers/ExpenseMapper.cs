using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;

namespace ExpenseTracker.API.Helpers
{
    public static class ExpenseMapper
    {
        public static ExpenseViewModel ToViewModel(this Expense entity)
        {
            return new ExpenseViewModel
            {
                Id = entity.Id,
                Amount = entity.Amount,
                Date = entity.Date,
                Description = entity.Description,
                ExpenseTypeId = entity.ExpenseTypeId,
                UserId = entity.UserId
            };
        }

        public static Expense ToEntity(this ExpenseViewModel model)
        {
            return new Expense
            {
                Id = model.Id,
                Amount = model.Amount,
                Date = model.Date,
                Description = model.Description,
                ExpenseTypeId = model.ExpenseTypeId,
                UserId = model.UserId
            };
        }
    }
}