import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";
import { ActionTypes, Invoice, SearchInvoicesResult } from './types';
import { InvoicesServices } from './services';

export interface GetInvoices {
    type: ActionTypes.GET_INVOICES;
    payload: {data: SearchInvoicesResult};
}

export const getInvoicesAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetInvoices> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetInvoices> ) => {
        await InvoicesServices.getInvoices(qs)
            .then( response => {
                dispatch( {type: ActionTypes.GET_INVOICES, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action = GetInvoices