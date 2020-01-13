import { combineReducers, Reducer } from 'redux';
import { LiveGeneralReducer } from "../Live/General/reducer"
import { LiveDetails } from './General/types';

export const liveInitialState: LiveState = {
    general: false
};

export interface LiveState {
    general: false | LiveDetails;
};

export const LiveReducer: Reducer<LiveState> = combineReducers({
    general: LiveGeneralReducer
})