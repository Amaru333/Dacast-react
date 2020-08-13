
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfosState } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { VodSecurityReducer } from './Security';
import { SearchResult, VodDetailsState, ContentDetailsState } from './General/types';
import { GeneralReducer, reducerList } from './General/reducer';
import { RenditionsReducer } from './Renditions/reducer';
import { RenditionsListState } from './Renditions/types';
import { VodThemingReducer } from './Theming/reducer';
import { VodEngagementReducer } from './Engagement/reducer';
import { VodPaywallReducer } from './Paywall/reducer';
import { ContentThemeState } from '../Settings/Theming/types';
import { ContentEngagementSettingsState } from '../Settings/Interactions';
import { ContentSecuritySettingsState } from '../Settings/Security';
import { ContentPaywallState } from '../Paywall/Presets/types'


export const vodInitialState: VodState = {
    chapters: {},
    security: {},
    general: {},
    list: false,
    renditions: {},
    theming: {},
    engagement: {},
    paywall: {}
};


export interface  VodState {
    chapters: ChapterMarkerInfosState;
    security: ContentSecuritySettingsState;
    general: ContentDetailsState;
    list: false | SearchResult;
    renditions: RenditionsListState;
    theming: ContentThemeState;
    engagement: ContentEngagementSettingsState;
    paywall: ContentPaywallState;
}

export const VodReducer: Reducer<VodState> = combineReducers({
    chapters: ChaptersReducer, 
    security: VodSecurityReducer,
    general: GeneralReducer,
    list: reducerList,
    renditions: RenditionsReducer,
    theming: VodThemingReducer,
    engagement: VodEngagementReducer,
    paywall: VodPaywallReducer
})