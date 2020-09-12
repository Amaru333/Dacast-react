import * as React from "react";
import * as ReactDOM from "react-dom";
import "@babel/polyfill";

import Main from "./main";
import configureStore from "./redux-flow/configureStore";
import { globalDefaultState } from "./redux-flow/store";
import "react-table/react-table.css";
import * as Sentry from '@sentry/react';
import { userToken } from './utils/token';


const initialState = globalDefaultState;
export const store = configureStore(initialState);

Sentry.init({dsn: "https://2e329011118c44b5a76d3670883a6535@o362894.ingest.sentry.io/5319748"});

if(location.href.indexOf('/impersonate') !== -1) {
    store.dispatch({type: 'USER_LOGOUT'})
    let query = new URLSearchParams(location.search);
    if(query.get('token')) {
        userToken.resetUserInfo()
        userToken.addTokenInfo({
            token: query.get('token'),
            accessToken: null,
            refresh: null,
            expires: 9999999999999
        })
    }
}
ReactDOM.render(<Main store={store}  />, document.getElementById("root"));
