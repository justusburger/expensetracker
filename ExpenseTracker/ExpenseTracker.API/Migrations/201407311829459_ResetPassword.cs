namespace ExpenseTracker.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ResetPassword : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "PasswordResetToken", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "PasswordResetToken");
        }
    }
}
