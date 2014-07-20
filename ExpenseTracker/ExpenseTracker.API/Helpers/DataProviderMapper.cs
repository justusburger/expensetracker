using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.ViewModels;

namespace ExpenseTracker.API.Helpers
{
    public static class DataProviderMapper
    {
        public static DataProviderQuery ToEntity(this DataProviderQueryViewModel viewModel)
        {
            return new DataProviderQuery
            {
                Page = viewModel.Page,
                PageSize = viewModel.PageSize
            };
        }

        public static DataProviderQueryViewModel ToViewModel(this DataProviderQuery entity)
        {
            return new DataProviderQueryViewModel
            {
                PageSize = entity.PageSize,
                Page = entity.Page,
                PageCount = entity.PageCount,
                ItemCount = entity.ItemCount
            };
        }

        public static DataProviderResultsViewModel<TViewModel> ToViewModel<TEntity, TViewModel>(this DataProviderResults<TEntity> entity, Func<TEntity, TViewModel> mapperFunc)
        {
            return new DataProviderResultsViewModel<TViewModel>
            {
                Query = entity.Query.ToViewModel(),
                Items = entity.Items.Select(mapperFunc).ToList()
            };
        } 
    }
}