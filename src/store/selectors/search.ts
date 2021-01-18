import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from 'store';
import { getFilterSort, getSearchFilterValue } from './searchFilter';

export const getSearchReducer = (state: RootState) => state.search;

export const getSearchData = createSelector(getSearchReducer, (res) => res.data);

export const getSearchIsLoading = createSelector(getSearchReducer, (res) => res.isLoading);

export const getSearchIsLoaded = createSelector(getSearchReducer, (res) => res.isLoaded);

export const getSearchError = createSelector(getSearchReducer, (res) => res.error);

export const getSortedSearchData = createSelector([getSearchData, getFilterSort], (items, sort) =>
  [...items].sort((a, b) => {
    switch (sort) {
      case 'availability':
        return b.meta.available - a.meta.available;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  }),
);

export const getFilteredSearchData = createSelector([getSortedSearchData, getSearchFilterValue], (res, filter) =>
  [...res].filter((item) => {
    const maxDate = moment()
      .add(Math.max(...filter.availabilityByDate.map((value) => parseInt(value))), 'days')
      .valueOf();

    const isAvailableByDate = filter.availabilityByDate.length === 0 || item.meta.available <= maxDate;

    const availability: { [key: string]: boolean } = {
      telehealth: item.telehealth,
      acceptNew: item.acceptNew,
      pediatric: item.meta.isPediatric,
    };

    const isAvailable = filter.availability.reduce((acc, x) => acc && availability[x], true);
    const hasSpeciality = filter.speciality.length === 0 || filter.speciality.includes(item.speciality);
    const witoutInsurance = filter.noInsurance && item.insurances === '';
    const hasInsurance = filter.insurance.length === 0 || filter.insurance.includes(item.insurances) || witoutInsurance;

    return isAvailableByDate && isAvailable && hasSpeciality && hasInsurance;
  }),
);
