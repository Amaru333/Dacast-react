
import { combineReducers, Reducer } from 'redux';
import { SearchResult } from './List/types';
import { reducerPlaylistList } from './List/reducer';
import { PlaylistDetailsState } from './General/types';
import { GeneralReducerPlaylist } from './General/reducer';
import { PlaylistSecurityReducer } from './Security';
import { PlaylistThemingReducer } from './Theming/reducer';
import { PlaylistEngagementReducer } from './Engagement/reducer';
import { PlaylistPaywallPageInfos, PlaylistPaywallReducer } from './Paywall';
import { ContentThemeState } from '../Settings/Theming';
import { PlaylistSetupState } from './Setup/types';
import { PLaylistSetupReducer } from './Setup/reducer';
import { ContentSecuritySettingsState } from '../Settings/Security';
import { ContentEngagementSettingsState } from '../Settings/Interactions/types';


export const playlistInitialState: PlaylistState = {
    list: false,
    general: false,
    security: false,
    setup: false,
    theming: false,
    engagement: false,
    paywall: false
};


export interface  PlaylistState {
    list: false | SearchResult;
    general: false | PlaylistDetailsState;
    setup: false | PlaylistSetupState;
    security: false | ContentSecuritySettingsState;
    theming: false | ContentThemeState;
    engagement: false | ContentEngagementSettingsState;
    paywall: false | PlaylistPaywallPageInfos;
}

export const PlaylistReducer: Reducer<PlaylistState> = combineReducers({
    list: reducerPlaylistList,
    general: GeneralReducerPlaylist,
    setup: PLaylistSetupReducer,
    security: PlaylistSecurityReducer,
    theming: PlaylistThemingReducer,
    engagement: PlaylistEngagementReducer,
    paywall: PlaylistPaywallReducer
})