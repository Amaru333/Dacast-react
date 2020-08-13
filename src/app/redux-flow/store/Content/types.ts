
import { combineReducers, Reducer } from 'redux';
import { SearchResult, ContentDetailsState } from './General/types';
import {reducerList } from './List/reducer';
import { ContentThemeState } from '../Settings/Theming/types';
import { ContentEngagementSettingsState } from '../Settings/Interactions';
import { ContentSecuritySettingsState } from '../Settings/Security';
import { ContentPaywallState } from '../Paywall/Presets/types'
import { GeneralReducer } from './General/reducer';


export const contentInitialState: ContentState = {
    general: {},
    list: false,
};


export interface  ContentState {
    general: ContentDetailsState;
    list: false | SearchResult;
}

export const ContentReducer: Reducer<ContentState> = combineReducers({
    general: GeneralReducer,
    list: reducerList,
})