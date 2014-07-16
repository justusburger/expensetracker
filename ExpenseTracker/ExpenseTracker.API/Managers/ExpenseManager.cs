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
    }

    public class ExpenseManager : ManagerBase<Expense>, IExpenseManager
    {
        public IQueryable<Expense> AllByUser(int userId)
        {
            return All.Where(e => e.UserId == userId);
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
            entity.UserId = userId;
            Context.Set<Expense>().Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            SaveChanges();
        }

        public void Delete(int userId, int id)
        {
            var entity = GetById(userId, id);
            Context.Entry(entity).State = EntityState.Deleted;
            SaveChanges();
        }
    }
}