import { Reducer } from "redux";
import { Action } from "./actions";
import { pirateDataInitialState, ActionTypes, PirateData } from './types';


const reducer: Reducer<PirateData | false> = (state = pirateDataInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_PIRATE :
            return action.payload
        default :
            return state
    }
}

export { reducer as PirateReducer}