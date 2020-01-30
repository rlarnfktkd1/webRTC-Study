import { fork } from "redux-saga/effects";

import placeholder from "./placeholder/Placeholder.saga";
import { helloSaga } from "./counter/counter.saga";

export default function* root() {
  yield fork(helloSaga);
  yield fork(placeholder);
}
