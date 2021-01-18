import { all } from 'redux-saga/effects';

import { favoriteSaga } from './favorite';
import { searchSaga } from './search';

export function* rootSaga() {
  yield all([searchSaga(), favoriteSaga()]);
}
