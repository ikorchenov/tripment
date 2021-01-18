import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchItemWithMeta } from 'types';

type State = {
  data: SearchItemWithMeta[];
  isLoading: boolean;
  isLoaded: boolean;
  error?: Error;
};

const initialState: State = {
  data: [],
  isLoading: false,
  isLoaded: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    request: (state) => {
      state.isLoading = true;
      state.isLoaded = false;
    },
    success: (state, { payload }: PayloadAction<SearchItemWithMeta[]>) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.data = payload;
      state.error = undefined;
    },
    fail: (state, { payload }: PayloadAction<Error>) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.error = payload;
    },
  },
});
