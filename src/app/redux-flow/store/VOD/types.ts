
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfosState } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { VodSecurityReducer } from './Security';
import { SearchResult, VodDetailsState } from './General/types';
import { GeneralReducer, reducerList } from './General/reducer';
import { RenditionsReducer } from './Renditions/reducer';
import { RenditionsList, RenditionsListState } from './Renditions/types';
import { VodThemingReducer } from './Theming/reducer';
import { VodEngagementReducer } from './Engagement/reducer';
import { VodPaywallPageInfos, VodPaywallReducer } from './Paywall';
import { ContentTheme, ContentThemeState } from '../Settings/Theming/types';
import { ContentEngagementSettingsState } from '../Settings/Interactions';
import { ContentSecuritySettingsState } from '../Settings/Security';


export const vodInitialState: VodState = {
    chapters: {},
    security: {},
    general: {},
    list: false,
    renditions: {},
    theming: {},
    engagement: {},
    paywall: false
};


export interface  VodState {
    chapters: ChapterMarkerInfosState;
    security: ContentSecuritySettingsState;
    general: VodDetailsState;
    list: false | SearchResult;
    renditions: RenditionsListState;
    theming: ContentThemeState;
    engagement: ContentEngagementSettingsState;
    paywall: false | VodPaywallPageInfos;
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