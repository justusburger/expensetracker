using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;

namespace ExpenseTracker.API.Helpers
{
    public static class ExpenseTypeMapper
    {
        public static ExpenseTypeViewModel ToViewModel(this ExpenseType entity)
        {
            return new ExpenseTypeViewModel
            {
                Id = entity.Id,
                UserId = entity.UserId,
                Title = entity.Title
            };
        }

        public static ExpenseType ToEntity(this ExpenseTypeViewModel viewModel)
        {
            return new ExpenseType
            {
                Id = viewModel.Id,
                UserId = viewModel.UserId,
                Title = viewModel.Title
            };
        }
    }
}