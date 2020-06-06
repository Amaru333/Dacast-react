import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { VodPaywallServices } from './services';
import { Preset, Promo, ContentPaywallPageInfos } from '../../Paywall/Presets/types'
  
export interface GetVodPaywallInfo {
    type: ActionTypes.GET_VOD_PAYWALL_INFOS;
    payload: ContentPaywallPageInfos;
}

export interface SaveVodPaywallInfos {
    type: ActionTypes.SAVE_VOD_PAYWALL_INFOS;
    payload: ContentPaywallPageInfos;
}

export interface CreateVodPricePreset {
    type: ActionTypes.CREATE_VOD_PRICE_PRESET;
    payload: Preset;
}

export interface SaveVodPricePreset {
    type: ActionTypes.SAVE_VOD_PRICE_PRESET;
    payload: Preset;
}

export interface DeleteVodPricePreset {
    type: ActionTypes.DELETE_VOD_PRICE_PRESET;
    payload: Preset;
}

export interface CreateVodPromoPreset {
    type: ActionTypes.CREATE_VOD_PROMO_PRESET;
    payload: Promo;
}

export interface SaveVodPromoPreset {
    type: ActionTypes.SAVE_VOD_PROMO_PRESET;
    payload: Promo;
}

export interface DeleteVodPromoPreset {
    type: ActionTypes.DELETE_VOD_PROMO_PRESET;
    payload: Promo;
}

export const getVodPaywallInfosAction = (): ThunkDispatch<Promise<void>, {}, GetVodPaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodPaywallInfo>) => {
        await VodPaywallServices.getVodPaywallInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_VOD_PAYWALL_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const saveVodPaywallInfosAction = (data: ContentPaywallPageInfos): ThunkDispatch<Promise<void>, {}, SaveVodPaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveVodPaywallInfos>) => {
        await VodPaywallServices.saveVodPaywallInfos(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_VOD_PAYWALL_INFOS, payload: response.data});
                dispatch(showToastNotification(`Changes have been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createVodPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, CreateVodPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateVodPricePreset>) => {
        await VodPaywallServices.createVodPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_VOD_PRICE_PRESET, payload: response.data})
                dispatch(showToastNotification(`Price has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveVodPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, SaveVodPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveVodPricePreset>) => {
        await VodPaywallServices.saveVodPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_VOD_PRICE_PRESET, payload: response.data})
                dispatch(showToastNotification(`Price has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteVodPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, DeleteVodPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodPricePreset>) => {
        await VodPaywallServices.deleteVodPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_VOD_PRICE_PRESET, payload: response.data})
                dispatch(showToastNotification(`Price has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const createVodPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, CreateVodPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateVodPromoPreset>) => {
        await VodPaywallServices.createVodPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_VOD_PROMO_PRESET, payload: response.data})
                dispatch(showToastNotification(`Promo has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveVodPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, SaveVodPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveVodPromoPreset>) => {
        await VodPaywallServices.saveVodPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_VOD_PROMO_PRESET, payload: response.data})
                dispatch(showToastNotification(`Promo has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteVodPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, DeleteVodPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodPromoPreset>) => {
        await VodPaywallServices.deleteVodPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_VOD_PROMO_PRESET, payload: response.data})
                dispatch(showToastNotification(`Promo has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetVodPaywallInfo
| CreateVodPricePreset
| SaveVodPaywallInfos
| SaveVodPricePreset
| DeleteVodPricePreset
| CreateVodPromoPreset
| SaveVodPromoPreset
| DeleteVodPromoPreset