using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.WebAPI.ViewModels
{
    public class DataProviderQueryViewModel
    {
        [Required]
        public int? Page { get; set; }

        [Required]
        public int? PageSize { get; set; }

        public int PageCount { get; set; }
        public int ItemCount { get; set; }
        public List<string> Filters { get; set; }
        public bool Download { get; set; }
    }
}