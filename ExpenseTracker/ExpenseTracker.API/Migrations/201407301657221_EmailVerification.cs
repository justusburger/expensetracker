namespace ExpenseTracker.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmailVerification : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "EmailVerificationToken", c => c.String(maxLength: 100));
            AddColumn("dbo.Users", "EmailVerificationDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "EmailVerificationDate");
            DropColumn("dbo.Users", "EmailVerificationToken");
        }
    }
}
