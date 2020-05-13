import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PlaylistListState, playlistDefaultState } from './types';

export const reducerPlaylistList: Reducer<PlaylistListState> = (state = playlistDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_LIST:
            return {items: [...action.payload] };
        case ActionTypes.DELETE_PLAYLIST:
                if(state) {
                    var newList = state.results.filter(elem => elem.objectID !== action.payload.id)
                    return {...state, results: newList}
                }
        default:
            return state;
    }
};
