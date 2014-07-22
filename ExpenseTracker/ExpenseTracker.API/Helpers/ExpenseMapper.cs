﻿using System;
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
                UserId = entity.UserId,
                Tags = entity.Tags.Select(t => t.Text).ToArray(),
                Comment = entity.Comment
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
                UserId = model.UserId,
                Tags = model.Tags.Select(t => new Tag { Text = t }).ToList(),
                Comment = model.Comment
            };
        }

        public static ExpenseDataProviderResultsViewModel ToViewModel(this ExpenseDataProviderResults entity)
        {
            return new ExpenseDataProviderResultsViewModel
            {
                Query = entity.Query.ToViewModel(),
                Items = entity.Items.Select(ToViewModel).ToList(),
                Total = entity.Total,
                AveragePerDay = entity.AveragePerDay
            };
        }
    }
}