import { combineReducers } from '@reduxjs/toolkit';
import { favoriteSlice } from './favorite';

import { searchSlice } from './search';
import { searchFilterSlice } from './searchFilter';

export const rootReducer = combineReducers({
  search: searchSlice.reducer,
  favorite: favoriteSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
});
