import { ActionTypes, defaultLiveTheme, LiveTheme } from './types';
import { Reducer } from 'redux';
import { Action } from './actions';

const reducer: Reducer<LiveTheme> = (state = defaultLiveTheme, action: Action) => {
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