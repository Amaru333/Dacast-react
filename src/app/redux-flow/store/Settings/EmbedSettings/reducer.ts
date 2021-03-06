import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, EmbedSettingsOptionType } from "./types";

const reducer: Reducer<EmbedSettingsOptionType> = (state = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_EMBED_SETTINGS_OPTIONS :
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_EMBED_SETTINGS_OPTIONS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

// Named export
export { reducer as EmbedSettingsReducer };

