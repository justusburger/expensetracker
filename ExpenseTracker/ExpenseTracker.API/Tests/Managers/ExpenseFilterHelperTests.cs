using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Helpers;
using ExpenseTracker.API.Models;
using NUnit.Framework;

namespace ExpenseTracker.API.Tests.helpers
{
    [TestFixture]
    public class ExpenseFilterHelperTests
    {
        private ExpenseFilterHelper helper;

        [SetUp]
        public void SetUp()
        {
            helper = new ExpenseFilterHelper();
        }

        [Test]
        public void filter__should_filter_no_filters()
        {
            //Arrange
            var expense = new Expense();
            var filters = new Dictionary<string, string>();
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void filter__should_filter_description_match()
        {
            //Arrange
            var expense = new Expense
            {
                Description = "My demo description"
            };
            var filters = new Dictionary<string, string>
            {
                { "description", "demo" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void filter__should_filter_description_no_match()
        {
            //Arrange
            var expense = new Expense
            {
                Description = "My demo description"
            };
            var filters = new Dictionary<string, string>
            {
                { "description", "bla bla" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsFalse(result);
        }
        
        [Test]
        public void filter__should_filter_single_tag()
        {
            //Arrange
            var expense = new Expense
            {
                Tags = new List<Tag>
                {
                    new Tag { Text = "aaa" },
                    new Tag { Text = "bbb" },
                    new Tag { Text = "ccc" },
                }
            };
            var filters = new Dictionary<string, string>
            {
                { "tags", "aaa" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void filter__should_filter_OR_tags()
        {
            //Arrange
            var expense = new Expense
            {
                Tags = new List<Tag>
                {
                    new Tag { Text = "aaa" },
                    new Tag { Text = "bbb" },
                    new Tag { Text = "ccc" },
                }
            };
            var filters = new Dictionary<string, string>
            {
                { "tags", "aaa|ddd" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void filter__should_filter_AND_tags()
        {
            //Arrange
            var expense = new Expense
            {
                Tags = new List<Tag>
                {
                    new Tag { Text = "aaa" },
                    new Tag { Text = "bbb" },
                    new Tag { Text = "ccc" },
                }
            };
            var filters = new Dictionary<string, string>
            {
                { "tags", "aaa&ddd" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsFalse(result);
        }

        [Test]
        public void filter__should_filter_date_match()
        {
            //Arrange
            var expense = new Expense
            {
                Date = new DateTime(2014, 1, 10)
            };
            var filters = new Dictionary<string, string>
            {
                { "date", "2014-01-01T00:00:00.000Z|2014-01-15T23:59:59.000Z" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsTrue(result);
        }

        [Test]
        public void filter__should_filter_date_no_match()
        {
            //Arrange
            var expense = new Expense
            {
                Date = new DateTime(2014, 1, 20)
            };
            var filters = new Dictionary<string, string>
            {
                { "date", "2014-01-01T00:00:00.000Z|2014-01-15T23:59:59.000Z" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsFalse(result);
        }
    }
}