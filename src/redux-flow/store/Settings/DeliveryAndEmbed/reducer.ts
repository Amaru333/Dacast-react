import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes } from "./types";
import { SettingsInitialState, SettingsState } from '..';

const reducer: Reducer= (state = SettingsInitialState, action: Action): SettingsState => {
    switch (action.type) {
        case ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS :
            return {
                ...state,
                data: action.payload,
            }
        case ActionTypes.SAVE_DELIVERY_AND_EMBED_OPTIONS:
            console.log(state)
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
};

// Named export
export { reducer as DeliveryAndEmbedReducer };

