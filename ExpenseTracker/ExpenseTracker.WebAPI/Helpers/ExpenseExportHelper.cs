using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Helpers
{
    public interface IExpenseExportHelper
    {
        HttpResponseMessage Export(ExpenseDataProviderResultsViewModel viewModel, string currency);
    }

    public class ExpenseExportHelper : IExpenseExportHelper
    {
        public HttpResponseMessage Export(ExpenseDataProviderResultsViewModel viewModel, string currency)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var stringBuilder = new StringBuilder();

            stringBuilder.AppendLine(String.Format("\"Date\",\"Time\",\"Tags\",\"Description\",\"Amount ({0})\"", currency));
            foreach (var expense in viewModel.Items)
            {
                var tags = "";
                if (expense.Tags != null && expense.Tags.Any())
                    expense.Tags.ToList().ForEach(tag => tags += tag + " ");

                stringBuilder.AppendLine(String.Format("\"{0}\",\"{1}\",\"{2}\",\"{3}\",{4}",
                    expense.Date.ToShortDateString(),
                    expense.Date.ToShortTimeString(),
                    tags,
                    expense.Description ?? "",
                    expense.Amount));
            }

            stringBuilder.AppendLine(String.Format("\"Total\",,,,{0}", viewModel.Total));
            stringBuilder.AppendLine(String.Format("\"Average per day\",,,,{0}", viewModel.AveragePerDay));

            response.Content = new StringContent(stringBuilder.ToString());
            response.Headers.Add("Content-Type", "application/csv");
            response.Headers.Add("x-filename", "Expenses export.csv");
            return response;
        }
    }
}