import { ActionTypes, defaultLiveTheme, LiveTheme } from './types';
import { Reducer } from 'redux';
import { Action } from './actions';
import { ContentTheme, defaultStateContentTheme } from '../../Settings/Theming';

const reducer: Reducer<ContentTheme> = (state = defaultStateContentTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_LIVE_THEME :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SAVE_LIVE_THEME :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export {reducer as LiveThemingReducer}