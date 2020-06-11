import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { LivePaywallServices } from './services';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets/types';

export interface GetLivePaywallInfo {
    type: ActionTypes.GET_LIVE_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string};
}

export interface SaveLivePaywallInfos {
    type: ActionTypes.SAVE_LIVE_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string};
}

export interface GetLivePaywallPrices {
    type: ActionTypes.GET_LIVE_PAYWALL_PRICES;
    payload: {data: {prices: Preset[];}, contentId: string};
}


export interface CreateLivePricePreset {
    type: ActionTypes.CREATE_LIVE_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface SaveLivePricePreset {
    type: ActionTypes.SAVE_LIVE_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface DeleteLivePricePreset {
    type: ActionTypes.DELETE_LIVE_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface GetLivePaywallPromos {
    type: ActionTypes.GET_LIVE_PAYWALL_PROMOS;
    payload: {data: {promos: Promo[];}, contentId: string};
}

export interface CreateLivePromoPreset {
    type: ActionTypes.CREATE_LIVE_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export interface SaveLivePromoPreset {
    type: ActionTypes.SAVE_LIVE_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export interface DeleteLivePromoPreset {
    type: ActionTypes.DELETE_LIVE_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export const getLivePaywallInfosAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLivePaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLivePaywallInfo>) => {
        await LivePaywallServices.getLivePaywallInfos(liveId)
            .then( response => {
                dispatch({type: ActionTypes.GET_LIVE_PAYWALL_INFOS, payload: {data: response.data.data, contentId: liveId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const saveLivePaywallInfosAction = (data: ContentPaywallPageInfos, liveId: string): ThunkDispatch<Promise<void>, {}, SaveLivePaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLivePaywallInfos>) => {
        await LivePaywallServices.saveLivePaywallInfos(data, liveId)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_LIVE_PAYWALL_INFOS, payload: {data: data, contentId: liveId}});
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const getLivePaywallPricesAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLivePaywallPrices> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLivePaywallPrices>) => {
        await LivePaywallServices.getLivePaywallPrices(liveId)
            .then( response => {
                dispatch({type: ActionTypes.GET_LIVE_PAYWALL_PRICES, payload: {data: response.data.data, contentId: liveId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createLivePricePresetAction = (data: Preset, liveId: string): ThunkDispatch<Promise<void>, {}, CreateLivePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateLivePricePreset>) => {
        await LivePaywallServices.createLivePricePreset(data, liveId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_LIVE_PRICE_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: liveId}})
                dispatch(showToastNotification("Price have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveLivePricePresetAction = (data: Preset, liveId: string): ThunkDispatch<Promise<void>, {}, SaveLivePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLivePricePreset>) => {
        await LivePaywallServices.saveLivePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_LIVE_PRICE_PRESET, payload: {data: data, contentId: liveId}})
                dispatch(showToastNotification("Price have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteLivePricePresetAction = (data: Preset, liveId: string): ThunkDispatch<Promise<void>, {}, DeleteLivePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLivePricePreset>) => {
        await LivePaywallServices.deleteLivePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_LIVE_PRICE_PRESET, payload: {data: data, contentId: liveId}})
                dispatch(showToastNotification("Price have been deleted", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const getLivePaywallPromosAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLivePaywallPromos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLivePaywallPromos>) => {
        await LivePaywallServices.getLivePaywallPromos()
            .then( response => {
                dispatch({type: ActionTypes.GET_LIVE_PAYWALL_PROMOS, payload: {data: response.data.data, contentId: liveId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createLivePromoPresetAction = (data: Promo, liveId: string): ThunkDispatch<Promise<void>, {}, CreateLivePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateLivePromoPreset>) => {
        await LivePaywallServices.createLivePromoPreset(data, liveId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_LIVE_PROMO_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: liveId}})
                dispatch(showToastNotification("Promo have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveLivePromoPresetAction = (data: Promo, liveId: string): ThunkDispatch<Promise<void>, {}, SaveLivePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLivePromoPreset>) => {
        await LivePaywallServices.saveLivePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_LIVE_PROMO_PRESET, payload: {data: data, contentId: liveId}})
                dispatch(showToastNotification("Promo have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteLivePromoPresetAction = (data: Promo, liveId: string): ThunkDispatch<Promise<void>, {}, DeleteLivePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLivePromoPreset>) => {
        await LivePaywallServices.deleteLivePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_LIVE_PROMO_PRESET, payload: {data: data, contentId: liveId}})
                dispatch(showToastNotification("Promo have been deleted", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetLivePaywallInfo
| GetLivePaywallPrices
| CreateLivePricePreset
| SaveLivePaywallInfos
| SaveLivePricePreset
| DeleteLivePricePreset
| GetLivePaywallPromos
| CreateLivePromoPreset
| SaveLivePromoPreset
| DeleteLivePromoPreset