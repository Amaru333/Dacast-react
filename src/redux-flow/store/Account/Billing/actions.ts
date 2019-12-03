import { ActionTypes, BillingPageInfos } from './types';
import { BillingServices } from './services';
import { showToastNotification } from '../../toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";


export interface GetBillingPagePaymentMethod {
    type: ActionTypes.GET_BILLING_PAGE_PAYMENT_METHOD;
    payload: BillingPageInfos;
}

export interface SaveBillingPagePaymentMethod {
    type: ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD;
    payload: BillingPageInfos;
}

export interface CreateBillingPagePaymentMethod {
    type: ActionTypes.CREATE_BILLING_PAGE_PAYMENT_METHOD;
    payload: BillingPageInfos;
}


export const getBillingPagePaymentMethodAction = (): ThunkDispatch<Promise<void>, {}, GetBillingPagePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetBillingPagePaymentMethod> ) => {
        await BillingServices.getBillingPagePaymentMethodService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_BILLING_PAGE_PAYMENT_METHOD, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveBillingPagePaymentMethodAction = (data: BillingPageInfos): ThunkDispatch<Promise<void>, {}, SaveBillingPagePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveBillingPagePaymentMethod> ) => {
        await BillingServices.saveBillingPagePaymentMethodService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createBillingPagePaymentMethodAction = (data: BillingPageInfos): ThunkDispatch<Promise<void>, {}, CreateBillingPagePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateBillingPagePaymentMethod> ) => {
        await BillingServices.createBillingPagePaymentMethodService(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_BILLING_PAGE_PAYMENT_METHOD, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type BillingAction = 
GetBillingPagePaymentMethod 
| SaveBillingPagePaymentMethod 
| CreateBillingPagePaymentMethod