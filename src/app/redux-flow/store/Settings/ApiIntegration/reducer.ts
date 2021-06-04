import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, ApiIntegrationPageInfos, defaultStateApiIntegration } from './types';

const reducer: Reducer<ApiIntegrationPageInfos> = (state = defaultStateApiIntegration, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_API_KEYS:
            return {
                ...state,
                apiKeys: action.payload
            };
        case ActionTypes.CREATE_API_KEY:
            return {
                ...state,
                apiKeys: [...state.apiKeys, action.payload]
            }
        default:
            return state;
    }
};

// Named export
export { reducer as ApiIntegrationReducer };

