import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PlaylistDetails } from './types';

const initialPlaylistGeneralState: PlaylistDetails = {
    id: "",
    online: false,
    title: "",
    folder: "",
    description: "",
    thumbnail: null,
    splashscreen: null
}

const reducer: Reducer<PlaylistDetails> = (state = initialPlaylistGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.EDIT_PLAYLIST_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.CHANGE_PLAYLIST_THUMBNAIL:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.DELETE_PLAYLIST_THUMBNAIL:
            return {
                ...state, thumbnail: ""
            };
        case ActionTypes.CHANGE_PLAYLIST_SPLASHSCREEN:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.DELETE_PLAYLIST_SPLASHSCREEN:
            return {
                ...state, splashscreen: ""
            };
        case ActionTypes.CHANGE_PLAYLIST_POSTER:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.DELETE_PLAYLIST_POSTER:
            return {
                ...state, poster: ""
            };
        default:
            return state;
    }
};

export { reducer as GeneralReducerPlaylist };