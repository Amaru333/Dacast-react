import { ActionTypes, BillingPageInfos, CreditCardPayment, PaypalPayment } from './types';
import { BillingServices } from './services';
import { showToastNotification } from '../../toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";


export interface GetBillingPageInfos {
    type: ActionTypes.GET_BILLING_PAGE_INFOS;
    payload: BillingPageInfos;
}

export interface SaveBillingPagePaymentMethod {
    type: ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD;
    payload: CreditCardPayment | PaypalPayment;
}


export const getBillingPageInfosAction = (): ThunkDispatch<Promise<void>, {}, GetBillingPageInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetBillingPageInfos> ) => {
        await BillingServices.getBillingPagePaymentMethodService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_BILLING_PAGE_INFOS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveBillingPagePaymentMethodAction = (data: CreditCardPayment | PaypalPayment): ThunkDispatch<Promise<void>, {}, SaveBillingPagePaymentMethod> => {
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



export type BillingAction = 
GetBillingPageInfos 
| SaveBillingPagePaymentMethod 