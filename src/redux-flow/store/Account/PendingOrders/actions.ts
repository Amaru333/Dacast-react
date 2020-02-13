import { ThunkDispatch } from 'redux-thunk';
import { showToastNotification } from '../../Toasts/actions';
import { ActionTypes, PendingOrder, PendingOrders } from './types';
import { PendingOrdersServices } from './services';
import { ApplicationState } from '../..';


export interface GetPendingOrders {
    type: ActionTypes.GET_PENDING_ORDERS;
    payload: PendingOrders;
}

export interface UpdatePendingOrder {
    type: ActionTypes.UPDATE_PENDING_ORDER;
    payload: PendingOrder
}

export const getPendingOrdersAction = (): ThunkDispatch<Promise<void>, {}, GetPendingOrders> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPendingOrders> ) => {
        await PendingOrdersServices.getPendingOrders()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PENDING_ORDERS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const updatePendingOrdersAction = (data: PendingOrder): ThunkDispatch<Promise<void>, {}, UpdatePendingOrder> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, UpdatePendingOrder> ) => {
        await PendingOrdersServices.updatePendingOrder(data)
            .then( response => {
                dispatch( {type: ActionTypes.UPDATE_PENDING_ORDER, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPendingOrders | UpdatePendingOrder