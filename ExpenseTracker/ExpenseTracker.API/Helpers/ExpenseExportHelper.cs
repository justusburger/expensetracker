using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using ExpenseTracker.API.ViewModels;
using Nancy;

namespace ExpenseTracker.API.Helpers
{
    public class ExpenseExportHelper
    {
        public Response Export(ExpenseDataProviderResultsViewModel viewModel, string currency)
        {
            var response = new Response();
            response.Contents = stream =>
            {
                var streamWriter = new StreamWriter(stream);
                streamWriter.WriteLine("\"Date\",\"Time\",\"Tags\",\"Description\",\"Amount ({0})\"", currency);

                foreach (var expense in viewModel.Items)
                {
                    var tags = "";
                    if(expense.Tags != null && expense.Tags.Any())
                        expense.Tags.ToList().ForEach(tag => tags += tag + " ");

                    streamWriter.WriteLine("\"{0}\",\"{1}\",\"{2}\",\"{3}\",{4}", 
                        expense.Date.ToShortDateString(), 
                        expense.Date.ToShortTimeString(),
                        tags,
                        expense.Description ?? "",
                        expense.Amount);
                }

                streamWriter.WriteLine("\"Total\",,,,{0}", viewModel.Total);
                streamWriter.WriteLine("\"Average per day\",,,,{0}", viewModel.AveragePerDay);

                streamWriter.Flush();
            };
            response.Headers.Add("Content-Type", "application/csv");
            response.Headers.Add("x-filename", "Expenses export.csv");
            return response;
        }
    }
}