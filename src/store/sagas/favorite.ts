import { mockApi } from 'mockApi';
import { put, takeEvery } from 'redux-saga/effects';
import { favoriteSlice } from 'store/reducers/favorite';
import { Data, Response } from 'types/api';

function* fetchFavoriteData() {
  try {
    const result: Response<Data> = yield mockApi();
    // Random favorite list
    const favorite = result.data.items.filter(() => Math.random() > 0.8).map(({ id }) => id);

    yield put(favoriteSlice.actions.success(favorite));
  } catch (error) {
    yield put(favoriteSlice.actions.fail(error));
  }
}

function* selectFavorite(action: ReturnType<typeof favoriteSlice.actions.selectFavorite>) {
  // Request to API
  yield console.log(action.payload);
}

export function* favoriteSaga() {
  yield takeEvery(favoriteSlice.actions.request.type, fetchFavoriteData);
  yield takeEvery(favoriteSlice.actions.selectFavorite.type, selectFavorite);
}
