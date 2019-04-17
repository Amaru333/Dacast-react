import { ActionTypes, Todo } from "./types";
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';

export interface AddTodoAction {
    type: ActionTypes.ADD_TODO;
    payload: { todo: Todo };
}

export interface ToggleTodoAction {
    type: ActionTypes.TOGGLE_TODO;
    payload: { todoId: number };
}

export const toggleTodoTimeout = (todoId: number): ThunkDispatch<Promise<void>, {}, ToggleTodoAction> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ToggleTodoAction> ) => {
        setTimeout(() => {
            dispatch(
                {
                    payload: { todoId },
                    type: ActionTypes.TOGGLE_TODO,
                }
            );
        }, 2000);
    };
}

export const addTodo = (name: string): AddTodoAction => {
    return {
        payload: {
            todo: {
                done: false,
                id: null,
                name,
            },
        },
        type: ActionTypes.ADD_TODO,
    };
};

export const toggleTodo = (todoId: number): ToggleTodoAction => {
    return {
        payload: { todoId },
        type: ActionTypes.TOGGLE_TODO,
    };
};

export type Action = AddTodoAction | ToggleTodoAction;
