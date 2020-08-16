import * as React from "react";
import * as ReactDOM from "react-dom";
import "@babel/polyfill";

import AdminMain from "./main";
import configureStore from "./redux-flow/configureStore";
import { globalDefaultState } from "./redux-flow/store";
import "react-table/react-table.css";
import * as Sentry from '@sentry/react';


const initialState = globalDefaultState;
export const store = configureStore(initialState);

Sentry.init({dsn: "https://2e329011118c44b5a76d3670883a6535@o362894.ingest.sentry.io/5319748"});

ReactDOM.render(<AdminMain store={store}  />, document.getElementById("adminRoot"));
