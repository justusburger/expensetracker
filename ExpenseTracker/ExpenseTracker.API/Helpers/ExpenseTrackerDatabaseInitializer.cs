using System.Data.Entity;

namespace ExpenseTracker.API.Helpers
{
    public class ExpenseTrackerDatabaseInitializer : IDatabaseInitializer<ExpenseTrackerDbContext>
    {
        public void InitializeDatabase(ExpenseTrackerDbContext context)
        {
            if (context.Database.Exists() && !context.Database.CompatibleWithModel(false))
                context.Database.Delete();

            if(!context.Database.Exists())
            {
                context.Database.Create(); 
                context.Database.ExecuteSqlCommand("ALTER TABLE Users ADD CONSTRAINT UX_USERS_EMAIL UNIQUE NONCLUSTERED (Email)");
            }
        }
    }
}