import { combineReducers } from "redux";
import { todosInitialState, TodosState, TodosReducer } from "./todos";

export interface ApplicationState {
    todos: TodosState;
}

export const globalDefaultState: ApplicationState = {
    todos: todosInitialState,
};

export const createRootReducer = () =>
    combineReducers({
        todos: TodosReducer,
    });