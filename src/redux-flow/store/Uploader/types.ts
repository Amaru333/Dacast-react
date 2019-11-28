// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// `@@context/ACTION_TYPE` is the convention
export enum ActionTypes {
    CAPITAL_LETTER_ACTION_NAME = "@@{context}/CAPITAL_LETTER_ACTION_NAME",
}

// Type-safe initialState!
export const uploaderInitialState: UploaderState = {
    data: [],
};

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UploaderState {
    // readonly loading: boolean
    // readonly errors?: string
    readonly data: any;
}

