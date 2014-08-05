namespace ExpenseTracker.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Setup : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Expenses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Description = c.String(nullable: false, maxLength: 100),
                        Comment = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExpenseId = c.Int(nullable: false),
                        Text = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => new { t.Id, t.ExpenseId })
                .ForeignKey("dbo.Expenses", t => t.ExpenseId, cascadeDelete: true)
                .Index(t => t.ExpenseId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        Email = c.String(nullable: false, maxLength: 100),
                        Hash = c.String(nullable: false, maxLength: 100),
                        Salt = c.String(nullable: false, maxLength: 100),
                        EmailVerificationToken = c.String(maxLength: 100),
                        PasswordResetToken = c.String(maxLength: 100),
                        EmailVerificationDate = c.DateTime(),
                        RegistrationDate = c.DateTime(nullable: false),
                        NewsletterSignup = c.Boolean(nullable: false),
                        Locked = c.Boolean(nullable: false),
                        InvalidAuthentications = c.Int(nullable: false),
                        Country = c.String(nullable: false, maxLength: 10),
                        Currency = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Expenses", "UserId", "dbo.Users");
            DropForeignKey("dbo.Tags", "ExpenseId", "dbo.Expenses");
            DropIndex("dbo.Tags", new[] { "ExpenseId" });
            DropIndex("dbo.Expenses", new[] { "UserId" });
            DropTable("dbo.Users");
            DropTable("dbo.Tags");
            DropTable("dbo.Expenses");
        }
    }
}
