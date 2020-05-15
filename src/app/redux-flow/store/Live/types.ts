import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer, reducerList } from "../Live/General/reducer"
import { LiveItem, LiveDetailsState, SearchResult } from './General/types';
import { LiveSecurityReducer } from './Security'
import { LiveThemingReducer } from './Theming/reducer';
import { LiveEngagementReducer } from './Engagement/reducer';
import { LivePaywallPageInfos, LivePaywallReducer } from './Paywall';
import { ContentTheme, ContentThemeState } from '../Settings/Theming/types';
import { ContentEngagementSettingsState } from '../Settings/Interactions';
import { ContentSecuritySettingsState } from '../Settings/Security';

export const liveInitialState: LiveState = {
    general: {},
    list: false,
    security: {},
    theming: {},
    engagement: {},
    paywall: false
};

export interface LiveState {
    general: LiveDetailsState;
    list: false | SearchResult;
    security: ContentSecuritySettingsState;
    theming: ContentThemeState;
    engagement: ContentEngagementSettingsState;
    paywall: false | LivePaywallPageInfos;
};

export const LiveReducer: Reducer<LiveState> = combineReducers({
    general: LiveGeneralReducer,
    list: reducerList,
    security: LiveSecurityReducer,
    theming: LiveThemingReducer,
    engagement: LiveEngagementReducer,
    paywall: LivePaywallReducer
})