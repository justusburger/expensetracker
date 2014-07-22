namespace ExpenseTracker.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddExpenseComment : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Expenses", "Comment", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Expenses", "Description", c => c.String(nullable: false, maxLength: 100));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Expenses", "Description", c => c.String(maxLength: 1000));
            DropColumn("dbo.Expenses", "Comment");
        }
    }
}
