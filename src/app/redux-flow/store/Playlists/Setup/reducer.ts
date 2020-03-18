import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, playlistDefaultState, PlaylistSetupState } from './types';

export const reducerPlaylistList: Reducer<PlaylistSetupState> = (state = playlistDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_SETUP:
            return {items: [...action.payload] };
        case ActionTypes.POST_PLAYLIST_SETUP:
            return {items: [...action.payload] };
        default:
            return state;
    }
};
