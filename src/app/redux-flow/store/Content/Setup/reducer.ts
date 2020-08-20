import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, contentDefaultState, ContentSetupState } from './types';

const reducer: Reducer<ContentSetupState> = (state = contentDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_SETUP:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...action.payload.data
                    }
                }

            };
        case ActionTypes.POST_CONTENT_SETUP:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...action.payload.data
                    }
                }
            };
        default:
            return state;
    }
}

export {reducer as ContentSetupReducer}
