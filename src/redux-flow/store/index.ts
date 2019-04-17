// import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'
// import { TodosState } from './todos/todosTypes';
// import reducer from './todos/todosReducer';

// // The top-level state object.
// //
// // `connected-react-router` already injects the router state typings for us,
// // so we can ignore them here.
// export interface ApplicationState {
//   todos: TodosState
// }

// // Whenever an action is dispatched, Redux will update each top-level application state property
// // using the reducer with the matching name. It's important that the names match exactly, and that
// // the reducer acts on the corresponding ApplicationState property type.
// export const createRootReducer = (history: History) =>
//   combineReducers({
//     layout: reducer,
//   })

// ./src/store/index.ts

import { combineReducers } from "redux";
import { initialState, TodosState, todoReducer } from "./todos";

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
    todos: TodosState;
}

export const globalDefaultState: ApplicationState = {
    todos: initialState,
};

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = () =>
    combineReducers({
        todos: todoReducer,
    });
