import { ThunkDispatch } from 'redux-thunk';
import { showToastNotification } from '../../Toasts/actions';
import { ActionTypes, PendingOrder } from './types';
import { PendingOrdersServices } from './services';
import { ApplicationState } from '../..';


export interface GetPendingOrders {
    type: ActionTypes.GET_PENDING_ORDERS;
    payload: PendingOrder[];
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

export type Action = GetPendingOrders