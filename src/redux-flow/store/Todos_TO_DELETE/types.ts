/**
 * Type of the object here a todo
 * (will be the return of the server for API call)
 */
export interface Todo {
    name: string;
    done: boolean;
    id: number;
}

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// `@@context/ACTION_TYPE` is the convention
export enum ActionTypes {
    ADD_TODO = "@@todo/ADD_TODO",
    TOGGLE_TODO = "@@todo/TOGGLE_TODO",
    TOGGLE_TODO_TIMEOUT_EXAMPLE = "@@todo/TOGGLE_TODO_TIMEOUT_EXAMPLE",
}

// Type-safe initialState!
export const todosInitialState: TodosState = {
    data: [],
};

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface TodosState {
    // readonly loading: boolean /// Useless but it's for example
    // readonly errors?: string
    readonly data: Todo[];
}
