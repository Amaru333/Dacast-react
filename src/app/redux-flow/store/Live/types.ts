import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer, reducerList } from "../Live/General/reducer"
import { LiveDetailsState, SearchResult } from './General/types';
import { LiveSecurityReducer } from './Security'
import { LiveThemingReducer } from './Theming/reducer';
import { LiveEngagementReducer } from './Engagement/reducer';
import { LivePaywallReducer } from './Paywall';
import { ContentThemeState } from '../Settings/Theming/types';
import { ContentEngagementSettingsState } from '../Settings/Interactions';
import { ContentSecuritySettingsState } from '../Settings/Security';
import { ContentPaywallState } from '../Paywall/Presets';

export const liveInitialState: LiveState = {
    general: {},
    list: false,
    security: {},
    theming: {},
    engagement: {},
    paywall: {}
};

export interface LiveState {
    general: LiveDetailsState;
    list: false | SearchResult;
    security: ContentSecuritySettingsState;
    theming: ContentThemeState;
    engagement: ContentEngagementSettingsState;
    paywall: ContentPaywallState;
};

export const LiveReducer: Reducer<LiveState> = combineReducers({
    general: LiveGeneralReducer,
    list: reducerList,
    security: LiveSecurityReducer,
    theming: LiveThemingReducer,
    engagement: LiveEngagementReducer,
    paywall: LivePaywallReducer
})