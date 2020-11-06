
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
import { ChapterMarkerInfosState } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { RenditionsListState } from './Renditions/types';
import { RenditionsReducer } from './Renditions/reducer';
import { ContentSetupState } from './Setup/types';
import { ContentSetupReducer } from './Setup/reducer';
import { ContentAnalyticsReducer, ContentAnalyticsState } from './Analytics';


export const contentInitialState: ContentState = {
    general: {},
    list: {},
    paywall: {},
    engagement: {},
    theming: {},
    security: {},
    chapters: {},
    renditions: {},
    setup: {},
    analytics: {}
};

export interface  ContentState {
    general: ContentDetailsState;
    list: ContentListState;
    paywall: ContentPaywallState;
    engagement: ContentEngagementState
    theming: ContentThemeState,
    security: ContentSecuritySettingsState,
    chapters: ChapterMarkerInfosState,
    renditions: RenditionsListState,
    setup: ContentSetupState,
    analytics: ContentAnalyticsState
}

export const ContentReducer: Reducer<ContentState> = combineReducers({
    general: GeneralReducer,
    list: reducerList,
    paywall: ContentPaywallReducer,
    engagement: ContentEngagementReducer,
    theming: ContentThemingReducer,
    security: ContentSecurityReducer,
    chapters: ChaptersReducer, 
    renditions: RenditionsReducer,
    setup: ContentSetupReducer,
    analytics: ContentAnalyticsReducer
})