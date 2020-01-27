
import { combineReducers, Reducer } from 'redux';
import { PlaylistListState } from './List/types';
import { reducerPlaylistList } from './List/reducer';
import { PlaylistDetails } from './General/types';
import { GeneralReducerPlaylist } from './General/reducer';
import { PlaylistSecuritySettings, PlaylistSecurityReducer } from './Security';


export const playlistInitialState: PlaylistState = {
    list: false,
    general: false,
    security: false
};


export interface  PlaylistState {
    list: false | PlaylistListState;
    general: false | PlaylistDetails;
    security: false | PlaylistSecuritySettings;
}

export const PlaylistReducer: Reducer<PlaylistState> = combineReducers({
    list: reducerPlaylistList,
    general: GeneralReducerPlaylist,
    security: PlaylistSecurityReducer
})