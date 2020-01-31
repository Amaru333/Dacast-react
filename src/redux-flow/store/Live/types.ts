import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer, reducerList } from "../Live/General/reducer"
import { LiveDetails, LiveItem } from './General/types';
import { LiveSecuritySettings, LiveSecurityReducer } from './Security'
import { LiveTheme } from './Theming/types';
import { LiveThemingReducer } from './Theming/reducer';

export const liveInitialState: LiveState = {
    general: false,
    list: false,
    security: false,
    theming: false
};

export interface LiveState {
    general: false | LiveDetails;
    list: false | LiveItem[];
    security: false | LiveSecuritySettings;
    theming: false | LiveTheme
};

export const LiveReducer: Reducer<LiveState> = combineReducers({
    general: LiveGeneralReducer,
    list: reducerList,
    security: LiveSecurityReducer,
    theming: LiveThemingReducer
})