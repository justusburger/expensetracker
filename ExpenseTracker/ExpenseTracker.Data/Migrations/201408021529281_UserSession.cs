namespace ExpenseTracker.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserSession : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "SessionToken", c => c.String(maxLength: 100));
            AddColumn("dbo.Users", "SessionTokenExpirationDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "SessionTokenExpirationDate");
            DropColumn("dbo.Users", "SessionToken");
        }
    }
}
