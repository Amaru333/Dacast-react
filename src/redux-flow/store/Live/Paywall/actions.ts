import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, LivePaywallPageInfos, Preset, Promo } from './types';
import { LivePaywallServices } from './services';

export interface GetLivePaywallInfo {
    type: ActionTypes.GET_LIVE_PAYWALL_INFOS;
    payload: LivePaywallPageInfos;
}

export interface SaveLivePaywallInfos {
    type: ActionTypes.SAVE_LIVE_PAYWALL_INFOS;
    payload: LivePaywallPageInfos;
}

export interface CreateLivePricePreset {
    type: ActionTypes.CREATE_LIVE_PRICE_PRESET;
    payload: Preset;
}

export interface SaveLivePricePreset {
    type: ActionTypes.SAVE_LIVE_PRICE_PRESET;
    payload: Preset;
}

export interface DeleteLivePricePreset {
    type: ActionTypes.DELETE_LIVE_PRICE_PRESET;
    payload: Preset;
}

export interface CreateLivePromoPreset {
    type: ActionTypes.CREATE_LIVE_PROMO_PRESET;
    payload: Promo;
}

export interface SaveLivePromoPreset {
    type: ActionTypes.SAVE_LIVE_PROMO_PRESET;
    payload: Promo;
}

export interface DeleteLivePromoPreset {
    type: ActionTypes.DELETE_LIVE_PROMO_PRESET;
    payload: Promo;
}

export const getLivePaywallInfosAction = (): ThunkDispatch<Promise<void>, {}, GetLivePaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLivePaywallInfo>) => {
        await LivePaywallServices.getLivePaywallInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_LIVE_PAYWALL_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const saveLivePaywallInfosAction = (data: LivePaywallPageInfos): ThunkDispatch<Promise<void>, {}, SaveLivePaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLivePaywallInfos>) => {
        await LivePaywallServices.saveLivePaywallInfos(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_LIVE_PAYWALL_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createLivePricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, CreateLivePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateLivePricePreset>) => {
        await LivePaywallServices.createLivePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_LIVE_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveLivePricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, SaveLivePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLivePricePreset>) => {
        await LivePaywallServices.saveLivePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_LIVE_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteLivePricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, DeleteLivePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLivePricePreset>) => {
        await LivePaywallServices.deleteLivePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_LIVE_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const createLivePromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, CreateLivePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateLivePromoPreset>) => {
        await LivePaywallServices.createLivePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_LIVE_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveLivePromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, SaveLivePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLivePromoPreset>) => {
        await LivePaywallServices.saveLivePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_LIVE_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteLivePromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, DeleteLivePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLivePromoPreset>) => {
        await LivePaywallServices.deleteLivePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_LIVE_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetLivePaywallInfo
| CreateLivePricePreset
| SaveLivePaywallInfos
| SaveLivePricePreset
| DeleteLivePricePreset
| CreateLivePromoPreset
| SaveLivePromoPreset
| DeleteLivePromoPreset