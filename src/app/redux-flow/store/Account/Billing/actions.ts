import { ActionTypes, BillingPageInfos, CreditCardPayment, PaypalPayment, PlaybackProtection, Extras } from './types';
import { BillingServices } from './services';
import { showToastNotification } from '../../Toasts/actions';
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

export interface AddBillingPagePlaybackProtection {
    type: ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: PlaybackProtection;
}

export interface EditBillingPagePlaybackProtection {
    type: ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: PlaybackProtection;
}

export interface DeleteBillingPagePlaybackProtection {
    type: ActionTypes.DELETE_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: null;
}

export interface AddBillingPageExtras {
    type: ActionTypes.ADD_BILLING_PAGE_EXTRAS;
    payload: Extras;
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
                dispatch(showToastNotification("Payment Method has been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Payment Method was unsucessfully added", 'fixed', "error"));
            })
    };
}

export const addBillingPagePaymenPlaybackProtectionAction = (data: PlaybackProtection): ThunkDispatch<Promise<void>, {}, AddBillingPagePlaybackProtection> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddBillingPagePlaybackProtection> ) => {
        await BillingServices.addBillingPagePaymenPlaybackProtectionService(data)
            .then( response => {
                dispatch( {type: ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION, payload: response.data} );
                dispatch(showToastNotification("Playack Protection has been enabled", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const editBillingPagePaymenPlaybackProtectionAction = (data: PlaybackProtection): ThunkDispatch<Promise<void>, {}, EditBillingPagePlaybackProtection> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, EditBillingPagePlaybackProtection> ) => {
        await BillingServices.editBillingPagePaymenPlaybackProtectionService(data)
            .then( response => {
                dispatch( {type: ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteBillingPagePaymenPlaybackProtectionAction = (data: PlaybackProtection): ThunkDispatch<Promise<void>, {}, DeleteBillingPagePlaybackProtection> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteBillingPagePlaybackProtection> ) => {
        await BillingServices.deleteBillingPagePaymenPlaybackProtectionService(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_BILLING_PAGE_PLAYBACK_PROTECTION, payload: response.data} );
                dispatch(showToastNotification("Playack Protection has been disabled", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const addBillingPageExtrasAction = (data: Extras): ThunkDispatch<Promise<void>, {}, AddBillingPageExtras> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddBillingPageExtras> ) => {
        await BillingServices.addBillingPageExtrasService(data)
            .then( response => {
                dispatch( {type: ActionTypes.ADD_BILLING_PAGE_EXTRAS, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type BillingAction = 
GetBillingPageInfos 
| SaveBillingPagePaymentMethod 
| AddBillingPagePlaybackProtection
| EditBillingPagePlaybackProtection
| DeleteBillingPagePlaybackProtection
| AddBillingPageExtras