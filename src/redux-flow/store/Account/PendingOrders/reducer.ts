import { Reducer } from 'redux';
import { PendingOrder, pendingOrdersInitialState, ActionTypes } from './types';
import { Action } from './actions';

const reducer: Reducer<PendingOrder[]> = (state = pendingOrdersInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PENDING_ORDERS :
            return action.payload
        default: 
            return state;
    }
};

export { reducer as PendingOrdersReducer };