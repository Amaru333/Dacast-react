import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PlaylistItem, SearchResult } from './types';

export const reducerPlaylistList: Reducer<SearchResult | false> = (state = false, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_LIST:
            let playlistList = action.payload.data.results.map((playlist: PlaylistItem) => {
                return {
                    ...playlist, 
                    objectID: playlist.objectID.substring(9)
                }
            })
            return {...action.payload.data, results: playlistList}        
        case ActionTypes.DELETE_PLAYLIST:
            if(state) {
                var newList = state.results.filter(elem => elem.objectID !== action.payload.id)
                return {...state, results: newList}
            }
        default:
            return state;
    }
};
