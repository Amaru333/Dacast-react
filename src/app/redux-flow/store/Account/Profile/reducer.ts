import { DateTime } from 'luxon';
import { tsToLocaleDate } from '../../../../../utils/formatUtils';
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
                passwordLastChanged: tsToLocaleDate(Math.round(Date.now()/1000), DateTime.DATETIME_SHORT)
            }
        default:
            return state;
    }
};

export {reducer as ProfileReducer}; 