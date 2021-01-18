import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getSearchFilterReducer = (state: RootState) => state.searchFilter;

export const getSearchFilterValue = createSelector(getSearchFilterReducer, (res) => res.filterValue);

export const getSearchFilterData = createSelector(getSearchFilterReducer, (res) => res.filterData);

export const getFilterSort = createSelector(getSearchFilterValue, (res) => res.sort);
