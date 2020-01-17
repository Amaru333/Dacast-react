import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer, reducerList } from "../Live/General/reducer"
import { LiveDetails, LiveItem } from './General/types';
import { LiveSecuritySettings, LiveSecurityReducer } from './Security'

export const liveInitialState: LiveState = {
    general: false,
    list: false,
    security: false
};

export interface LiveState {
    general: false | LiveDetails;
    list: false | LiveItem[];
    security: false | LiveSecuritySettings
};

export const LiveReducer: Reducer<LiveState> = combineReducers({
    general: LiveGeneralReducer,
    list: reducerList,
    security: LiveSecurityReducer
})