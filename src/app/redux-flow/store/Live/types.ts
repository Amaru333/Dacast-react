import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer, reducerList } from "../Live/General/reducer"
import { LiveDetails, LiveItem, LiveDetailsState } from './General/types';
import { LiveSecuritySettings, LiveSecurityReducer } from './Security'
import { LiveTheme } from './Theming/types';
import { LiveThemingReducer } from './Theming/reducer';
import { LiveEngagementSettings } from './Engagement/types';
import { LiveEngagementReducer } from './Engagement/reducer';
import { LivePaywallPageInfos, LivePaywallReducer } from './Paywall';
import { ContentTheme } from '../Settings/Theming/types';

export const liveInitialState: LiveState = {
    general: {},
    list: false,
    security: false,
    theming: false,
    engagement: false,
    paywall: false
};

export interface LiveState {
    general: LiveDetailsState;
    list: false | LiveItem[];
    security: false | LiveSecuritySettings;
    theming: false | ContentTheme;
    engagement: false | LiveEngagementSettings;
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