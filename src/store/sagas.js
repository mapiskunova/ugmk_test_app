import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchData } from './products';
import { sagaActions } from './sagaActions';

let callAPI = async ({ url, method, data }) => {
  return await axios({
    url,
    method,
    data
  });
};

export function* getProducts() {
  try {
    let result = yield call(() =>
      callAPI({ url: "http://localhost:3001/products" })
    );
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: "PRODUCTS_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_PRODUCTS, getProducts);
}
