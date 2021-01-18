import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getFavoriteReducer = (state: RootState) => state.favorite;

export const getFavoriteData = createSelector(getFavoriteReducer, (res) => res.data);

export const getFavoriteIsLoading = createSelector(getFavoriteReducer, (res) => res.isLoading);

export const getFavoriteIsLoaded = createSelector(getFavoriteReducer, (res) => res.isLoaded);

export const getFavoriteError = createSelector(getFavoriteReducer, (res) => res.error);
