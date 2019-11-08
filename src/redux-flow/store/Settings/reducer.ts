import { Reducer } from "redux";
import { Action } from "./actions";
import { settingsInitialState, SettingsState, ActionTypes } from "./types";

const reducer: Reducer= (state = settingsInitialState, action: Action): SettingsState => {
    console.log(state)
    switch (action.type) {
        case ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS :
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state;
    }
};

// Named export
export { reducer as SettingsReducer };

