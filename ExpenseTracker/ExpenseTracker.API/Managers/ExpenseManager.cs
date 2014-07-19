using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Managers
{
    public interface IExpenseManager : IManager<Expense>
    {
        IQueryable<Expense> AllByUser(int userId);
        Expense GetById(int userId, int id);
        Expense Create(int userId, Expense entity);
        void Update(int userId, Expense entity);
        void Delete(int userId, int id);
        IQueryable<Tag> GetAllTags(int userId);
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

        public void Update(int userId, Expense entity)
        {
            var originalEntity = GetById(userId, entity.Id);
            originalEntity.Date = entity.Date;
            originalEntity.Amount = entity.Amount;
            originalEntity.Description = entity.Description;

            //Remove tags in the original list but not in the new list
            var tagsToRemove = originalEntity.Tags.Where(tag => entity.Tags.All(t => t.Text != tag.Text)).ToList();
            //Add tags in the new list but not in the old list
            var tagsToAdd = entity.Tags.Where(tag => originalEntity.Tags.All(t => t.Text != tag.Text)).ToList();

            tagsToRemove.ForEach(t => originalEntity.Tags.Remove(t));
            tagsToAdd.ForEach(t => originalEntity.Tags.Add(t));
            SaveChanges();
        }

        public void Delete(int userId, int id)
        {
            var entity = GetById(userId, id);
            Context.Entry(entity).State = EntityState.Deleted;
            SaveChanges();
        }

        public IQueryable<Tag> GetAllTags(int userId)
        {
            return Context.Tags.Where(t => t.Expense.UserId == userId);
        }
    }
}