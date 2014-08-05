using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ExpenseTracker.API.ViewModels;
using ExpenseTracker.Logic;
using ExpenseTracker.Logic.Managers;
using ExpenseTracker.Model;
using ExpenseTracker.WebAPI.Controllers;
using ExpenseTracker.WebAPI.Exceptions;
using ExpenseTracker.WebAPI.Helpers;
using ExpenseTracker.WebAPI.ViewModels;
using Moq;
using NUnit.Framework;

namespace ExpenseTracker.WebAPI.Tests.Controllers
{
    [TestFixture]
    public class ExpenseControllerTests : ControllerTestBase
    {
        private ExpenseController _controller;
        private Mock<IExpenseManager> _expenseManager;
        private Mock<IExpenseExportHelper> _expenseExportHelper;

        [SetUp]
        public void SetUp()
        {
            _controller = new ExpenseController();
            _controller.ControllerContext = GetControllerContext();

            _expenseExportHelper = new Mock<IExpenseExportHelper>(MockBehavior.Strict);
            _controller.ExpenseExportHelper = _expenseExportHelper.Object;

            _expenseManager = new Mock<IExpenseManager>(MockBehavior.Strict);
            _controller.ExpenseManager = _expenseManager.Object;
        }

        [Test, ExpectedException(typeof(ValidationFailedException))]
        public void Query__should_throw_exception_if_modelstate_not_valid()
        {
            //Arrange
            _controller.ModelState.AddModelError("Page", "Page is required");
            //Act
            var results = _controller.Query(new DataProviderQueryViewModel());
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Query__should_return_export_result_when_download_requested()
        {
            //Arrange
            var expenseResult = new ExpenseDataProviderResults
            {
                Items = new List<Expense>(),
                Query = new DataProviderQuery()
            };
            var exportResult = new HttpResponseMessage();
            _controller.CurrentUser = new User { Currency = "USD" };
            _expenseManager.Setup(a => a.Query(0, It.IsAny<DataProviderQuery>())).Returns(expenseResult);
            _expenseExportHelper.Setup(a => a.Export(It.IsAny<ExpenseDataProviderResultsViewModel>(), It.IsAny<string>())).Returns(exportResult);
            //Act
            var results = _controller.Query(new DataProviderQueryViewModel { Page = 1, PageSize = 20, Download = true });
            //Assert
            Assert.AreSame(exportResult, results);
            _expenseExportHelper.VerifyAll();
            _expenseManager.VerifyAll();
        }

        [Test]
        public void Query__should_return_query_results()
        {
            //Arrange
            var expenseResult = new ExpenseDataProviderResults
            {
                Items = new List<Expense>(),
                Query = new DataProviderQuery()
            };
            _controller.CurrentUser = new User { Currency = "USD" };
            _expenseManager.Setup(a => a.Query(0, It.IsAny<DataProviderQuery>())).Returns(expenseResult);
            //Act
            var results = _controller.Query(new DataProviderQueryViewModel { Page = 1, PageSize = 20 });
            //Assert
            ExpenseDataProviderResults content;
            Assert.IsTrue(results.TryGetContentValue(out content));
            Assert.AreSame(content, expenseResult);
            _expenseManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(NotFoundException))]
        public void Get__should_throw_not_found_exception_if_expense_not_found()
        {
            //Arrange
            _controller.CurrentUser = new User { Id = 1 };
            _expenseManager.Setup(a => a.GetById(1, 1)).Returns(default(Expense));
            //Act
            var result = _controller.Get(1);
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Get__should_return_expense_view_model()
        {
            //Arrange
            _controller.CurrentUser = new User { Id = 1 };
            _expenseManager.Setup(a => a.GetById(1, 1)).Returns(new Expense { Id = 123 });
            //Act
            var result = _controller.Get(1);
            //Assert
            Assert.AreEqual(123, result.Id);
            _expenseManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(ValidationFailedException))]
        public void Create__should_throw_exception_is_modelstate_invalid()
        {
            //Arrange
            _controller.ModelState.AddModelError("Description", "Description is required.");
            //Act
            var result = _controller.Create(new ExpenseViewModel());
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Create__should_return_created()
        {
            //Arrange
            _controller.CurrentUser = new User();
            _expenseManager.Setup(a => a.Create(0, It.IsAny<Expense>())).Returns(new Expense());
            //Act
            var result = _controller.Create(new ExpenseViewModel());
            //Assert
            Assert.AreEqual(HttpStatusCode.Created, result.StatusCode);
            _expenseManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(ValidationFailedException))]
        public void Update__should_throw_exception_is_modelstate_invalid()
        {
            //Arrange
            _controller.ModelState.AddModelError("Description", "Description is required.");
            //Act
            var result = _controller.Update(new ExpenseViewModel());
            //Assert
            Assert.Fail();
        }

        [Test, ExpectedException(typeof(NotFoundException))]
        public void Update__should_throw_exception_if_original_entity_not_found()
        {
            //Arrange
            _controller.CurrentUser = new User();
            _expenseManager.Setup(a => a.GetById(0, 0)).Returns(default(Expense));
            //Act
            var result = _controller.Update(new ExpenseViewModel());
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Update__should_update()
        {
            //Arrange
            _controller.CurrentUser = new User();
            _expenseManager.Setup(a => a.GetById(0, 0)).Returns(new Expense());
            _expenseManager.Setup(a => a.Update(It.IsAny<Expense>(), It.IsAny<Expense>()));
            //Act
            var result = _controller.Update(new ExpenseViewModel());
            //Assert
            _expenseManager.VerifyAll();
        }

        [Test, ExpectedException(typeof(NotFoundException))]
        public void Delete__should_throw_exception_if_original_entity_not_found()
        {
            //Arrange
            _controller.CurrentUser = new User();
            _expenseManager.Setup(a => a.GetById(0, 0)).Returns(default(Expense));
            //Act
            _controller.Delete(0);
            //Assert
            Assert.Fail();
        }

        [Test]
        public void Delete__should_delete()
        {
            //Arrange
            _controller.CurrentUser = new User();
            _expenseManager.Setup(a => a.GetById(0, 0)).Returns(new Expense());
            _expenseManager.Setup(a => a.Delete(It.IsAny<Expense>()));
            //Act
            _controller.Delete(0);
            //Assert
            _expenseManager.VerifyAll();
        }

        [Test]
        public void GetAllTags__should_return_all_tags()
        {
            //Arrange
            _controller.CurrentUser = new User();
            IQueryable<Tag> tags = new EnumerableQuery<Tag>(new List<Tag>());
            _expenseManager.Setup(a => a.GetAllTags(0)).Returns(tags);
            //Act
            IEnumerable<TagViewModel> result = _controller.GetAllTags();
            //Assert
            _expenseManager.VerifyAll();
        }
    }
}
