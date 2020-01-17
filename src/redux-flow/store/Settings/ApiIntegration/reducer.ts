import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, ApiIntegrationPageInfos, defaultStateApiIntegration } from './types';

const reducer: Reducer<ApiIntegrationPageInfos> = (state = defaultStateApiIntegration, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS:
            return {...action.payload};
        default:
            return state;
    }
};

// Named export
export { reducer as ApiIntegrationReducer };

