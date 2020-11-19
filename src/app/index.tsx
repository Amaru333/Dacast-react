import * as React from "react";
import * as ReactDOM from "react-dom";
import "@babel/polyfill";

import Main from "./main";
import configureStore from "./redux-flow/configureStore";
import { globalDefaultState } from "./redux-flow/store";
import "react-table/react-table.css";
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

if(location.href.indexOf('impersonate') !== -1) {
    store.dispatch({type: 'USER_LOGOUT'})
    userToken.resetUserInfo()
}
ReactDOM.render(<Main store={store}  />, document.getElementById("root"));