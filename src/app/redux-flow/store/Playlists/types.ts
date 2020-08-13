
import { combineReducers, Reducer } from 'redux';
import { SearchResult } from './List/types';
import { reducerPlaylistList } from './List/reducer';
import { GeneralReducerPlaylist } from './General/reducer';
import { PlaylistSecurityReducer } from './Security';
import { PlaylistThemingReducer } from './Theming/reducer';
import { PlaylistEngagementReducer } from './Engagement/reducer';
import { PlaylistPaywallReducer } from './Paywall';
import { ContentThemeState } from '../Settings/Theming';
import { PlaylistSetupState } from './Setup/types';
import { PLaylistSetupReducer } from './Setup/reducer';
import { ContentSecuritySettingsState } from '../Settings/Security';
import { ContentEngagementSettingsState } from '../Settings/Interactions/types';
import { ContentPaywallState } from '../Paywall/Presets';
import { ContentDetailsState } from '../VOD/General/types';


export const playlistInitialState: PlaylistState = {
    list: false,
    general: {},
    security: {},
    setup: {},
    theming: false,
    engagement: false,
    paywall: {}
};


export interface  PlaylistState {
    list: false | SearchResult;
    general: ContentDetailsState;
    setup: PlaylistSetupState;
    security: ContentSecuritySettingsState;
    theming: false | ContentThemeState;
    engagement: false | ContentEngagementSettingsState;
    paywall: ContentPaywallState;
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