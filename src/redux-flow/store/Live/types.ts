import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer, reducerList } from "../Live/General/reducer"
import { LiveDetails, LiveItem } from './General/types';

export const liveInitialState: LiveState = {
    general: false,
    list: false
};

export interface LiveState {
    general: false | LiveDetails;
    list: false | LiveItem[]
};

export const LiveReducer: Reducer<LiveState> = combineReducers({
    general: LiveGeneralReducer,
    list: reducerList
})