using System.Linq;
using ExpenseTracker.API.ViewModels;
using ExpenseTracker.Logic;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Mappers
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
                Tags = entity.Tags != null ? entity.Tags.Select(t => t.Text).ToArray() : null,
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
                Tags = model.Tags != null ? model.Tags.Select(t => new Tag { Text = t }).ToList() : null,
                Comment = model.Comment
            };
        }

        public static ExpenseDataProviderResultsViewModel ToViewModel(this ExpenseDataProviderResults entity)
        {
            return new ExpenseDataProviderResultsViewModel
            {
                Query = entity.Query.ToViewModel(),
                Items = entity.Items != null ? entity.Items.Select(ToViewModel).ToList() : null,
                Total = entity.Total,
                AveragePerDay = entity.AveragePerDay
            };
        }
    }
}