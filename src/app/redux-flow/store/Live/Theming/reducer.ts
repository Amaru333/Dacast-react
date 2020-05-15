import { ActionTypes } from './types';
import { Reducer } from 'redux';
import { Action } from './actions';
import { defaultStateContentTheme, ContentThemeState } from '../../Settings/Theming';

const reducer: Reducer<ContentThemeState> = (state = defaultStateContentTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_LIVE_THEME :
            return {
                ...state,
                [action.payload.id] : {
                    ...action.payload
                }
            }
        case ActionTypes.SAVE_LIVE_THEME :
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    ...action.payload.data
                }
            }
        default:
            return state;
    }
}

export {reducer as LiveThemingReducer}