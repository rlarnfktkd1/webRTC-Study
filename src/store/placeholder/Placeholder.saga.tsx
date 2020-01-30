import { fork, take, call, put } from "redux-saga/effects";
import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR
} from "./Placeholder.store";
import TestService from "../../services/testService";

/********************************************************************************
 *  제너레이터 함수
 ********************************************************************************/
export function* loadData() {
  try {
    const result = yield call(TestService.getLoadData);

    if (result) {
      console.log(result);

      yield put({
        type: LOAD_DATA_SUCCESS,
        payload: {
          data: result
        }
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: LOAD_DATA_ERROR,
      payload: {
        error: e
      }
    });
  }
}

/********************************************************************************
 *  call
 ********************************************************************************/
export function* watchLoadData() {
  while (true) {
    yield take(LOAD_DATA);
    yield call(loadData);
  }
}

/********************************************************************************
 *  watch
 ********************************************************************************/
export default function*() {
  yield fork(watchLoadData);
}
