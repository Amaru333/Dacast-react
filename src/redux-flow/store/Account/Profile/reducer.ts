import { ProfileAction } from "./actions";
import { ActionTypes, profileInitialState, ProfilePageInfos } from './types';


export const reducer = (state = profileInitialState, action: ProfileAction): ProfilePageInfos => {
    switch (action.type) {
        case ActionTypes.GET_PROFILE_PAGE_DETAILS:
            return {...state,
                ...action.payload
            }
        case ActionTypes.SAVE_PROFILE_PAGE_DETAILS:
            return {...state, 
                ...action.payload
            }
        case ActionTypes.SAVE_PROFILE_PASSWORD:
            return {
                ...state, 
                lastChangedPassword: ""
            }
        default:
            return state;
    }
};

export {reducer as ProfileReducer}; 