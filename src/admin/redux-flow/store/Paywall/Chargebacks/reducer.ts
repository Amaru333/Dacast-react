import { Reducer } from "redux";
import { Action } from "./actions";
import { chargebackInitialState, ActionTypes, Chargeback } from './types';


const reducer: Reducer<Chargeback | false> = (state = chargebackInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.SUBMIT_CHARGEBACK :
            return action.payload
        default :
            return state
    }
}

export { reducer as ChargebackReducer}