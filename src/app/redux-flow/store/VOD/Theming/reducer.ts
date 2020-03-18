import { Reducer } from "redux";
import { defaultVodTheme, VodTheme, ActionTypes } from './types';
import { Action } from './actions';


const reducer: Reducer<VodTheme> = (state = defaultVodTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_THEME :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SAVE_VOD_THEME :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export {reducer as VodThemingReducer}