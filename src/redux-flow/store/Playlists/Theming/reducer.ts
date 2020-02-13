import { Reducer } from "redux";
import { defaultPlaylistTheme, PlaylistTheme, ActionTypes } from './types';
import { Action } from './actions';


const reducer: Reducer<PlaylistTheme> = (state = defaultPlaylistTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_THEME :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SAVE_PLAYLIST_THEME :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export {reducer as PlaylistThemingReducer}