// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// `@@context/ACTION_TYPE` is the convention
export enum ActionTypes {
    GET_DELIVERY_AND_EMBED_OPTIONS = "@@{context}/GET_DELIVERY_AND_EMBED_OPTIONS",
}

// Type-safe initialState!
export const settingsInitialState: SettingsState = {
    data: false,
};

export type DeliveryAndEmbedOptionType = {
    [key:string]:  string 
};

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface SettingsState {
    // readonly loading: boolean
    // readonly errors?: string
    readonly data: DeliveryAndEmbedOptionType | false;
}

