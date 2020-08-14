
import { combineReducers, Reducer } from 'redux';
import { ContentDetailsState } from './General/types';
import {reducerList } from './List/reducer';
import { ContentPaywallState } from './Paywall/types'
import { GeneralReducer } from './General/reducer';
import { ContentListState } from './List/types';
import { ContentPaywallReducer } from './Paywall/reducer';
import { ContentEngagementState } from './Engagement/types';
import { ContentEngagementReducer } from './Engagement/reducer';
import { ContentThemeState } from '../Settings/Theming';
import { ContentThemingReducer } from './Theming/reducer';
import { ContentSecuritySettingsState } from '../Settings/Security';
import { ContentSecurityReducer } from './Security/reducer';


export const contentInitialState: ContentState = {
    general: {},
    list: {},
    paywall: {},
    engagement: {},
    theming: {},
    security: {}
};


export interface  ContentState {
    general: ContentDetailsState;
    list: ContentListState;
    paywall: ContentPaywallState;
    engagement: ContentEngagementState
    theming: ContentThemeState,
    security: ContentSecuritySettingsState
}

export const ContentReducer: Reducer<ContentState> = combineReducers({
    general: GeneralReducer,
    list: reducerList,
    paywall: ContentPaywallReducer,
    engagement: ContentEngagementReducer,
    theming: ContentThemingReducer,
    security: ContentSecurityReducer
})