namespace ExpenseTracker.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCountryAndCurrency : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Country", c => c.String(nullable: false, maxLength: 10));
            AddColumn("dbo.Users", "Currency", c => c.String(nullable: false, maxLength: 10));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Currency");
            DropColumn("dbo.Users", "Country");
        }
    }
}
