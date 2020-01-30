import App from "next/app";
import * as React from "react";
import { NextPageContext } from "next";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import createStore from "../store/store";
import { Store as ReduxStore } from "redux";
import { RootState } from "../store/reducers";
import "../assets/styles/reset.scss";

type Store = ReduxStore<RootState>;

interface AppContext extends NextPageContext {
  store: Store;
}

class MyApp extends App<AppContext> {
  static async getInitialProps({
    Component,
    ctx
  }: {
    Component: any;
    ctx: any;
  }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
