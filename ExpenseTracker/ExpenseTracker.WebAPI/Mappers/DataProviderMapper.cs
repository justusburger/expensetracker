﻿using System;
using System.Collections.Generic;
using System.Linq;
using ExpenseTracker.Logic;
using ExpenseTracker.WebAPI.ViewModels;

namespace ExpenseTracker.WebAPI.Mappers
{
    public static class DataProviderMapper
    {
        public static DataProviderQuery ToEntity(this DataProviderQueryViewModel viewModel)
        {
            var result = new DataProviderQuery
            {
                Page = viewModel.Page.Value,
                PageSize = viewModel.PageSize.Value,
                ApplyPagination = !viewModel.Download
            };

            if (viewModel.Filters != null && viewModel.Filters.Any())
            {
                result.Filters = new Dictionary<string, string>();
                foreach (var filter in viewModel.Filters.Where(a => a.Contains(':')))
                {
                    var pieces = filter.Split(':');
                    result.Filters.Add(pieces[0].ToLowerInvariant(), pieces[1].ToLowerInvariant().Replace(">", ":"));
                }
            }
            return result;
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