import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFormData } from 'constants/searchFilter';
import { FilterDataItem } from 'types';
import { FilterFormData } from 'types/searchFilter';

type State = {
  filterValue: FilterFormData;
  filterData: {
    speciality: FilterDataItem[];
    insurance: FilterDataItem[];
    availabilityByDate: FilterDataItem[];
    availability: FilterDataItem[];
  };
};

const initialState: State = {
  filterValue: initialFormData,
  filterData: {
    speciality: [],
    insurance: [],
    availabilityByDate: [],
    availability: [],
  },
};

export const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setFilterValue: (state, { payload }: PayloadAction<FilterFormData>) => {
      state.filterValue = payload;
    },
    setFilterData: (state, { payload }: PayloadAction<State['filterData']>) => {
      state.filterData = payload;
    },
  },
});
