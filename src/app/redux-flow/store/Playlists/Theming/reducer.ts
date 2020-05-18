import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { ContentThemeState, defaultStateContentTheme } from '../../Settings/Theming';


const reducer: Reducer<ContentThemeState> = (state = defaultStateContentTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_THEME :
            return {
                ...state,
                [action.payload.contentId] : {
                    ...action.payload
                }
            }
        case ActionTypes.SAVE_PLAYLIST_THEME :
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

export {reducer as PlaylistThemingReducer}