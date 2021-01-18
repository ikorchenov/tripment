import { mockApi } from 'mockApi';
import { put, takeEvery } from 'redux-saga/effects';
import { searchSlice } from 'store/reducers/search';
import { searchFilterSlice } from 'store/reducers/searchFilter';
import { getFilterDataFromSearchResult } from 'store/utils/getFilterDataFromSearchResult';
import { mapSearchResult } from 'store/utils/mapSearchResult';
import { Data, Response } from 'types/api';

function* fetchSearchData() {
  try {
    const result: Response<Data> = yield mockApi();
    const items = mapSearchResult(result.data.items);

    yield put(searchSlice.actions.success(items));
    yield put(searchFilterSlice.actions.setFilterData(getFilterDataFromSearchResult(items)));
  } catch (error) {
    yield put(searchSlice.actions.fail(error));
  }
}

export function* searchSaga() {
  yield takeEvery(searchSlice.actions.request.type, fetchSearchData);
}
