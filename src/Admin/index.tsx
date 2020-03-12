import * as React from "react";
import * as ReactDOM from "react-dom";
import "@babel/polyfill";

import AdminMain from "./main";
import configureStore from "./redux-flow/configureStore";
import { globalDefaultState } from "./redux-flow/store";
import "react-table/react-table.css";

const initialState = globalDefaultState;
export const store = configureStore(initialState);

ReactDOM.render(<AdminMain store={store}  />, document.getElementById("root"));
