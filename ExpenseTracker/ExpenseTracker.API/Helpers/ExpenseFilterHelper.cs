using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Helpers
{
    public class ExpenseFilterHelper
    {
        public bool Filter(Expense expense, Dictionary<string, string> filters)
        {
            if (filters == null || !filters.Any())
                return true;

            if (filters.ContainsKey("description"))
            {
                if (expense.Description == null ||
                    !expense.Description.ToLowerInvariant().Contains(filters["description"]))
                    return false;
            }

            if (filters.ContainsKey("tags"))
            {
                if (expense.Tags == null)
                    return false;

                if (filters["tags"].Contains('|') || filters["tags"].Contains('&'))
                {
                    /* OR search */
                    if (filters["tags"].Contains('|'))
                    {
                        var tags = filters["tags"].Split('|');
                        if (!expense.Tags.Any(t => tags.Any(a => t.Text.ToLowerInvariant().Contains(a))))
                            return false;
                    } /* AND search */
                    else
                    {
                        var tags = filters["tags"].Split('&');
                        var allFound = true;
                        foreach (var tag in tags)
                        {
                            if (!expense.Tags.Any(a => a.Text.ToLowerInvariant().Contains(tag)))
                                allFound = false;
                        }
                        if (!allFound)
                            return false;
                    }
                }
                else if (!expense.Tags.Any(t => t.Text.ToLowerInvariant().Contains(filters["tags"])))
                    return false;
            }

            return true;
        } 
    }
}