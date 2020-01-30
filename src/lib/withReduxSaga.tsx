import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, applyMiddleware, Store as ReduxStore } from "redux";
import createSagaMiddleware from "redux-saga";
import nextReduxWrapper from "next-redux-wrapper";
import nextReduxSaga from "next-redux-saga";

import rootReducer from "../store/reducers";
import rootSaga from "../store/sagas";

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState = {}) {
  const store: any = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export default function(BaseComponent: any) {
  return nextReduxWrapper(configureStore)(nextReduxSaga(BaseComponent));
}
