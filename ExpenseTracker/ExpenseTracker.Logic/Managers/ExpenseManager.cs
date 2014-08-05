using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlTypes;
using System.Linq;
using ExpenseTracker.API.Managers;
using ExpenseTracker.Logic.Helpers;
using ExpenseTracker.Model;

namespace ExpenseTracker.Logic.Managers
{
    public interface IExpenseManager : IManager<Expense>
    {
        IQueryable<Expense> AllByUser(int userId);
        Expense GetById(int userId, int id);
        Expense Create(int userId, Expense entity);
        void Update(Expense originalEntity, Expense entity);
        void Delete(Expense entity);
        IQueryable<Tag> GetAllTags(int userId);
        ExpenseDataProviderResults Query(int userId, DataProviderQuery query);
    }

    public class ExpenseManager : ManagerBase<Expense>, IExpenseManager
    {
        public IQueryable<Expense> AllByUser(int userId)
        {
            return All.Where(e => e.UserId == userId).Include(e => e.Tags);
        }

        public Expense GetById(int userId, int id)
        {
            return AllByUser(userId).SingleOrDefault(e => e.Id == id);
        }

        public Expense Create(int userId, Expense entity)
        {
            entity.UserId = userId;
            return Create(entity);
        }

        public void Update(Expense originalEntity, Expense entity)
        {
            originalEntity.Date = entity.Date;
            originalEntity.Amount = entity.Amount;
            originalEntity.Description = entity.Description;
            originalEntity.Comment = entity.Comment;

            //Remove tags in the original list but not in the new list
            var tagsToRemove = originalEntity.Tags.Where(tag => entity.Tags.All(t => t.Text != tag.Text)).ToList();
            //Add tags in the new list but not in the old list
            var tagsToAdd = entity.Tags.Where(tag => originalEntity.Tags.All(t => t.Text != tag.Text)).ToList();

            tagsToRemove.ForEach(t => originalEntity.Tags.Remove(t));
            tagsToAdd.ForEach(t => originalEntity.Tags.Add(t));
            SaveChanges();
        }

        public new void Delete(Expense entity)
        {
            entity.Tags.Clear();
            Context.Entry(entity).State = EntityState.Deleted;
            SaveChanges();
        }

        public IQueryable<Tag> GetAllTags(int userId)
        {
            return Context.Tags.Where(t => t.Expense.UserId == userId);
        }

        public ExpenseDataProviderResults Query(int userId, DataProviderQuery query)
        {
            var results = new ExpenseDataProviderResults { Query = query };
            IEnumerable<Expense> expenses = Context.Expenses.Where(e => e.UserId == userId).ToList();

            //Filter
            var helper = new ExpenseFilterHelper();
            expenses = expenses.Where(e => helper.Filter(e, query.Filters));

            //Item and page count, totals and average daily spending
            results.Query.ItemCount = expenses.Count();
            results.Total = expenses.Sum(e => e.Amount);
            var dateTimeSpan = helper.DateTimeSpan(query.Filters);
            if (dateTimeSpan.From == (DateTime) SqlDateTime.MinValue && dateTimeSpan.To == (DateTime) SqlDateTime.MaxValue && expenses.Any())
            {
                dateTimeSpan.From = expenses.Min(e => e.Date);
                dateTimeSpan.To = expenses.Max(e => e.Date);
            }

            if(expenses.Any())
                results.AveragePerDay = Math.Round(results.Total/dateTimeSpan.DaysSafe, 2);

            //Sorting
            expenses = expenses.OrderBy(e => e.Date);

            //Pagination
            if (query.Page > query.PageCount)
                query.Page = query.PageCount;

            results.Items = expenses;

            if(query.ApplyPagination)
                results.Items = results.Items.Skip(results.Query.Skip).Take(results.Query.Take);

            return results;
        }
    }
}