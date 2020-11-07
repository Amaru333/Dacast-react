import * as React from "react";
import * as ReactDOM from "react-dom";
import "@babel/polyfill";

import Main from "./main";
import configureStore from "./redux-flow/configureStore";
import { globalDefaultState } from "./redux-flow/store";
import "react-table/react-table.css";
import * as Sentry from '@sentry/react';
import { datadogRum } from '@datadog/browser-rum';
import { userToken } from './utils/services/token/tokenService';


const initialState = globalDefaultState;
export const store = configureStore(initialState);

datadogRum.init({
    applicationId: '5d654f30-a9f9-4d7e-9835-74d4cf7ecc0c',
    clientToken: 'pub3b0982b354b89bee2a7b230c2c62a422',
    site: 'datadoghq.com',
//  service: 'my-web-application',
//  env: 'production',
//  version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true
});

Sentry.init({dsn: "https://2e329011118c44b5a76d3670883a6535@o362894.ingest.sentry.io/5319748"});

if(location.href.indexOf('impersonate') !== -1) {
    store.dispatch({type: 'USER_LOGOUT'})
    userToken.resetUserInfo()
}
ReactDOM.render(<Main store={store}  />, document.getElementById("root"));