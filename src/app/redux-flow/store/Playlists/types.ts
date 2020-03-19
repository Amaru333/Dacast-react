
import { combineReducers, Reducer } from 'redux';
import { PlaylistListState } from './List/types';
import { reducerPlaylistList } from './List/reducer';
import { PlaylistDetails } from './General/types';
import { GeneralReducerPlaylist } from './General/reducer';
import { PlaylistSecuritySettings, PlaylistSecurityReducer } from './Security';
import { PlaylistTheme } from './Theming/types';
import { PlaylistThemingReducer } from './Theming/reducer';
import { PlaylistEngagementSettings } from './Engagement/types';
import { PlaylistEngagementReducer } from './Engagement/reducer';
import { PlaylistPaywallPageInfos, PlaylistPaywallReducer } from './Paywall';


export const playlistInitialState: PlaylistState = {
    list: false,
    general: false,
    security: false,
    theming: false,
    engagement: false,
    paywall: false
};


export interface  PlaylistState {
    list: false | PlaylistListState;
    general: false | PlaylistDetails;
    security: false | PlaylistSecuritySettings;
    theming: false | PlaylistTheme;
    engagement: false | PlaylistEngagementSettings;
    paywall: false | PlaylistPaywallPageInfos;
}

export const PlaylistReducer: Reducer<PlaylistState> = combineReducers({
    list: reducerPlaylistList,
    general: GeneralReducerPlaylist,
    security: PlaylistSecurityReducer,
    theming: PlaylistThemingReducer,
    engagement: PlaylistEngagementReducer,
    paywall: PlaylistPaywallReducer
})