import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";
import { ActionTypes, Invoice } from './types';
import { InvoicesServices } from './services';

export interface GetInvoices {
    type: ActionTypes.GET_INVOICES;
    payload: Invoice[];
}

export const getInvoicesAction = (): ThunkDispatch<Promise<void>, {}, GetInvoices> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetInvoices> ) => {
        await InvoicesServices.getInvoices()
            .then( response => {
                dispatch( {type: ActionTypes.GET_INVOICES, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetInvoices