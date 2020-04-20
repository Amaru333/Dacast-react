import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { defaultStateContentTheme, ContentTheme } from '../../Settings/Theming';


const reducer: Reducer<ContentTheme> = (state = defaultStateContentTheme, action: Action) => {
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