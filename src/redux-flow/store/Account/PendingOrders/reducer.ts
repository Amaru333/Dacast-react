import { Reducer } from 'redux';
import { pendingOrdersInitialState, ActionTypes, PendingOrders } from './types';
import { Action } from './actions';

const reducer: Reducer<PendingOrders> = (state = pendingOrdersInitialState, action: Action) => {
    let orders = null
    switch (action.type) {
        case ActionTypes.GET_PENDING_ORDERS :
            return {
                ...state, 
                pendingOrders:action.payload.pendingOrders
            }
        case ActionTypes.UPDATE_PENDING_ORDER:
            orders = state.pendingOrders.slice()
            return {...state, pendingOrders: orders.map((item) => {
                if (item.id != action.payload.id) {
                    return item
                }
                return {
                    ...item, status: "paid"
                }
            }) }
        default: 
            return state;
    }
};

export { reducer as PendingOrdersReducer };