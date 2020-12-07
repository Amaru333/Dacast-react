import { ActionTypes, BillingPageInfos, PlaybackProtection, Extras, Products } from './types';
import { BillingServices } from './services';
import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";


export interface GetBillingPageInfos {
    type: ActionTypes.GET_BILLING_PAGE_INFOS;
    payload: {data: BillingPageInfos};
}

export interface SaveBillingPagePaymentMethod {
    type: ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD;
    payload: string;
}

export interface AddBillingPagePlaybackProtection {
    type: ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: PlaybackProtection;
}

export interface EditBillingPagePlaybackProtection {
    type: ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: PlaybackProtection;
}

export interface AddBillingPageExtras {
    type: ActionTypes.ADD_BILLING_PAGE_EXTRAS;
    payload: Extras;
}

export interface GetProductDetails {
    type: ActionTypes.GET_PRODUCT_DETAILS;
    payload: {data: Products}
}

export interface PurchaseProducts {
    type: ActionTypes.PURCHASE_PRODUCTS;
    payload: Extras
}

export const getBillingPageInfosAction = (): ThunkDispatch<Promise<void>, {}, GetBillingPageInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetBillingPageInfos> ) => {
        await BillingServices.getBillingPagePaymentMethodService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_BILLING_PAGE_INFOS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveBillingPagePaymentMethodAction = (data: string): ThunkDispatch<Promise<void>, {}, SaveBillingPagePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveBillingPagePaymentMethod> ) => {
        await BillingServices.saveBillingPagePaymentMethodService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD, payload: response.data} );
                dispatch(showToastNotification("Payment Method has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Payment Method was unsucessfully added", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const addBillingPagePaymenPlaybackProtectionAction = (data: PlaybackProtection): ThunkDispatch<Promise<void>, {}, AddBillingPagePlaybackProtection> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddBillingPagePlaybackProtection> ) => {
        await BillingServices.addBillingPagePaymenPlaybackProtectionService(data.enabled, data.amount)
            .then( response => {
                dispatch( {type: ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION, payload: data} );
                dispatch(showToastNotification("Playack Protection has been enabled", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const editBillingPagePaymenPlaybackProtectionAction = (data: PlaybackProtection): ThunkDispatch<Promise<void>, {}, EditBillingPagePlaybackProtection> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, EditBillingPagePlaybackProtection> ) => {
        await BillingServices.editBillingPagePaymenPlaybackProtectionService(data.enabled, data.amount)
            .then( response => {
                dispatch( {type: ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION, payload: data} );
                !data.enabled ?
                dispatch(showToastNotification("Playack Protection has been disabled", 'fixed', "success")) :
                dispatch(showToastNotification("Playack Protection has been enabled", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const addBillingPageExtrasAction = (data: Extras): ThunkDispatch<Promise<void>, {}, AddBillingPageExtras> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddBillingPageExtras> ) => {
        await BillingServices.addBillingPageExtrasService(data)
            .then( response => {
                dispatch( {type: ActionTypes.ADD_BILLING_PAGE_EXTRAS, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const getProductDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetProductDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetProductDetails> ) => {
        await BillingServices.getProductDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PRODUCT_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const purchaseProductsAction = (data: Extras, recurlyToken: string, token3Ds?: string): ThunkDispatch<Promise<void>, {}, PurchaseProducts> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, PurchaseProducts> ) => {
        await BillingServices.purchaseProductsService(data, recurlyToken, token3Ds)
            .then( response => {
                dispatch( {type: ActionTypes.PURCHASE_PRODUCTS, payload: data} );
                return response
            }).catch(() => {
                return Promise.reject()
            })
    };
}


export type PlanAction = 
GetBillingPageInfos 
| SaveBillingPagePaymentMethod 
| AddBillingPagePlaybackProtection
| EditBillingPagePlaybackProtection
| AddBillingPageExtras
| GetProductDetails