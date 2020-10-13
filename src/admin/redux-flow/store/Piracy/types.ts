import { combineReducers, Reducer } from 'redux';
import { PirateData } from './Piracy/types';
import { PirateReducer } from './Piracy/reducer';


export interface PiracyState {
    pirate: PirateData | false
}

export const piracyInitialState: PiracyState = {
    pirate: false
}

export const PiracyReducer: Reducer<PiracyState> = combineReducers({
    pirate: PirateReducer
})

