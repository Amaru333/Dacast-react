import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { ContentPaywallServices } from './services';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets/types';
import { parseContentType } from '../../../../utils/utils';

export interface GetContentPaywallInfo {
    type: ActionTypes.GET_CONTENT_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string, contentType: string};
}

export interface SaveContentPaywallInfos {
    type: ActionTypes.SAVE_CONTENT_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string, contentType: string};
}

export interface GetContentPaywallPrices {
    type: ActionTypes.GET_CONTENT_PAYWALL_PRICES;
    payload: {data: {prices: Preset[];}, contentId: string, contentType: string};
}


export interface CreateContentPricePreset {
    type: ActionTypes.CREATE_CONTENT_PRICE_PRESET;
    payload: {data: Preset, contentId: string, contentType: string};
}

export interface SaveContentPricePreset {
    type: ActionTypes.SAVE_CONTENT_PRICE_PRESET;
    payload: {data: Preset, contentId: string, contentType: string};
}

export interface DeleteContentPricePreset {
    type: ActionTypes.DELETE_CONTENT_PRICE_PRESET;
    payload: {data: Preset, contentId: string, contentType: string};
}

export interface GetContentPaywallPromos {
    type: ActionTypes.GET_CONTENT_PAYWALL_PROMOS;
    payload: {data: {promos: Promo[];}, contentId: string, contentType: string};
}

export interface CreateContentPromoPreset {
    type: ActionTypes.CREATE_CONTENT_PROMO_PRESET;
    payload: {data: Promo, contentId: string, contentType: string};
}

export interface SaveContentPromoPreset {
    type: ActionTypes.SAVE_CONTENT_PROMO_PRESET;
    payload: {data: Promo, contentId: string, contentType: string};
}

export interface DeleteContentPromoPreset {
    type: ActionTypes.DELETE_CONTENT_PROMO_PRESET;
    payload: {data: Promo, contentId: string, contentType: string};
}

export const getContentPaywallInfosAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentPaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentPaywallInfo>) => {
        await ContentPaywallServices.getContentPaywallInfos(contentId, parseContentType(contentType))
            .then( response => {
                dispatch({type: ActionTypes.GET_CONTENT_PAYWALL_INFOS, payload: {data: response.data.data, contentId: contentId, contentType: contentType}});
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const saveContentPaywallInfosAction = (data: ContentPaywallPageInfos, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentPaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveContentPaywallInfos>) => {
        await ContentPaywallServices.saveContentPaywallInfos(data, contentId, parseContentType(contentType))
            .then( response => {
                dispatch({type: ActionTypes.SAVE_CONTENT_PAYWALL_INFOS, payload: {data: data, contentId: contentId, contentType: contentType}});
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const getContentPaywallPricesAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentPaywallPrices> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentPaywallPrices>) => {
        await ContentPaywallServices.getContentPaywallPrices(contentId, contentType)
            .then( response => {
                dispatch({type: ActionTypes.GET_CONTENT_PAYWALL_PRICES, payload: {data: response.data.data, contentId: contentId, contentType: contentType}});
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createContentPricePresetAction = (data: Preset, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, CreateContentPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateContentPricePreset>) => {
        await ContentPaywallServices.createContentPricePreset(data, contentId, contentType)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_CONTENT_PRICE_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: contentId, contentType: contentType}})
                dispatch(showToastNotification("Price have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveContentPricePresetAction = (data: Preset, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveContentPricePreset>) => {
        await ContentPaywallServices.saveContentPricePreset(data, contentId, contentType)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_CONTENT_PRICE_PRESET, payload: {data: data, contentId: contentId, contentType: contentType}})
                dispatch(showToastNotification("Price have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteContentPricePresetAction = (data: Preset, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContentPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContentPricePreset>) => {
        await ContentPaywallServices.deleteContentPricePreset(data, contentId, contentType)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_CONTENT_PRICE_PRESET, payload: {data: data, contentId: contentId, contentType: contentType}})
                dispatch(showToastNotification("Price have been deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const getContentPaywallPromosAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentPaywallPromos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentPaywallPromos>) => {
        await ContentPaywallServices.getContentPaywallPromos()
            .then( response => {
                dispatch({type: ActionTypes.GET_CONTENT_PAYWALL_PROMOS, payload: {data: response.data.data, contentId: contentId, contentType: contentType}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createContentPromoPresetAction = (data: Promo, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, CreateContentPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateContentPromoPreset>) => {
        await ContentPaywallServices.createContentPromoPreset(data, contentId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_CONTENT_PROMO_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: contentId, contentType: contentType}})
                dispatch(showToastNotification("Promo have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveContentPromoPresetAction = (data: Promo, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveContentPromoPreset>) => {
        await ContentPaywallServices.saveContentPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_CONTENT_PROMO_PRESET, payload: {data: data, contentId: contentId, contentType: contentType}})
                dispatch(showToastNotification("Promo have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteContentPromoPresetAction = (data: Promo, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContentPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContentPromoPreset>) => {
        await ContentPaywallServices.deleteContentPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_CONTENT_PROMO_PRESET, payload: {data: data, contentId: contentId, contentType: contentType}})
                dispatch(showToastNotification("Promo have been deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetContentPaywallInfo
| GetContentPaywallPrices
| CreateContentPricePreset
| SaveContentPaywallInfos
| SaveContentPricePreset
| DeleteContentPricePreset
| GetContentPaywallPromos
| CreateContentPromoPreset
| SaveContentPromoPreset
| DeleteContentPromoPreset