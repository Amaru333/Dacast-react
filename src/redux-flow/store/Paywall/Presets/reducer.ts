import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PresetsPageInfos, presetsInitialState  } from "./types";

const reducer: Reducer<PresetsPageInfos> = (state = presetsInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PRESETS_INFOS :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export { reducer as PresetsReducer };
