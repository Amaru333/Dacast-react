import { Reducer } from "redux";
import { Action } from "./actions";
import { SettingsInitialState, SettingsState } from "../types";
import { ActionTypes } from './types';

const reducer: Reducer<SettingsState> = (state = SettingsInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS:
            return {data: { ...state.data, apiIntegration:{...action.payload} }};
        default:
            return state;
    }
};

// Named export
export { reducer as ApiIntegrationReducer };

