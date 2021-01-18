import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  data: number[];
  isLoading: boolean;
  isLoaded: boolean;
  error?: Error;
};

const initialState: State = {
  data: [],
  isLoading: false,
  isLoaded: false,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    request: (state) => {
      state.isLoading = true;
      state.isLoaded = false;
    },
    success: (state, { payload }: PayloadAction<number[]>) => {
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
    selectFavorite: (state, { payload }: PayloadAction<number>) => {
      if (state.data.includes(payload)) {
        state.data = state.data.filter((id) => id !== payload);
      } else {
        state.data.push(payload);
      }
    },
  },
});
