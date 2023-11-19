import {fork} from 'redux-saga/effects';

import blogData from './BlogData';

export default function* rootSaga() {
  yield fork(blogData);
}
