import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, todosInitialState, TodosState } from "./types";

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<TodosState> = (state = todosInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_TODO: {
            const todo = action.payload.todo;
            todo.id = state.data[0] ? state.data[0].id + 1 : 1;
            return {
                ...state,
                data: [todo, ...state.data],
            };
        }
        case ActionTypes.TOGGLE_TODO: {
            const newState = state.data.map((value) => {
                if (value.id === action.payload.todoId) {
                    return { ...value, done: !value.done };
                } else {
                    return value;
                }
            });
            return {
                ...state,
                data: [...newState],
            };
        }
        default:
            return state;
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as TodosReducer };
