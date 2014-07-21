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
        public void filter__should_filter_amount_match()
        {
            //Arrange
            var expense = new Expense
            {
                Amount = (decimal)255.55
            };
            var filters = new Dictionary<string, string>
            {
                { "amount", "55" }
            };
            //Act
            var result = helper.Filter(expense, filters);
            //Assert
            Assert.IsTrue(result);
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

    }
}