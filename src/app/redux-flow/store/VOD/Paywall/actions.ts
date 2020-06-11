import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { VodPaywallServices } from './services';
import { Preset, Promo, ContentPaywallPageInfos } from '../../Paywall/Presets/types'
  
export interface GetVodPaywallInfo {
    type: ActionTypes.GET_VOD_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string};
}

export interface GetVodPaywallPrices {
    type: ActionTypes.GET_VOD_PAYWALL_PRICES;
    payload:  {data: {prices: Preset[];}, contentId: string;};
}

export interface SaveVodPaywallInfos {
    type: ActionTypes.SAVE_VOD_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string};
}

export interface CreateVodPricePreset {
    type: ActionTypes.CREATE_VOD_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface SaveVodPricePreset {
    type: ActionTypes.SAVE_VOD_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface DeleteVodPricePreset {
    type: ActionTypes.DELETE_VOD_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface GetVodPaywallPromos {
    type: ActionTypes.GET_VOD_PAYWALL_PROMOS;
    payload: {data: {promos: Promo[];}, contentId: string};
}

export interface CreateVodPromoPreset {
    type: ActionTypes.CREATE_VOD_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export interface SaveVodPromoPreset {
    type: ActionTypes.SAVE_VOD_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export interface DeleteVodPromoPreset {
    type: ActionTypes.DELETE_VOD_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export const getVodPaywallInfosAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodPaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodPaywallInfo>) => {
        await VodPaywallServices.getVodPaywallInfos(vodId)
            .then( response => {
                dispatch({type: ActionTypes.GET_VOD_PAYWALL_INFOS, payload: {data: response.data.data, contentId: vodId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const getVodPaywallPricesAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodPaywallPrices> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodPaywallPrices>) => {
        await VodPaywallServices.getVodPaywallPrices(vodId)
            .then( response => {
                dispatch({type: ActionTypes.GET_VOD_PAYWALL_PRICES, payload: {data: response.data.data, contentId: vodId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const saveVodPaywallInfosAction = (data: ContentPaywallPageInfos, vodId: string): ThunkDispatch<Promise<void>, {}, SaveVodPaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveVodPaywallInfos>) => {
        await VodPaywallServices.saveVodPaywallInfos(data, vodId)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_VOD_PAYWALL_INFOS, payload: {data: data, contentId: vodId}});
                dispatch(showToastNotification(`Changes have been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createVodPricePresetAction = (data: Preset, vodId: string): ThunkDispatch<Promise<void>, {}, CreateVodPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateVodPricePreset>) => {
        await VodPaywallServices.createVodPricePreset(data, vodId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_VOD_PRICE_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: vodId}})
                dispatch(showToastNotification(`Price has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveVodPricePresetAction = (data: Preset, vodId: string): ThunkDispatch<Promise<void>, {}, SaveVodPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveVodPricePreset>) => {
        await VodPaywallServices.saveVodPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_VOD_PRICE_PRESET, payload: {data: data, contentId: vodId}})
                dispatch(showToastNotification(`Price has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteVodPricePresetAction = (data: Preset, vodId: string): ThunkDispatch<Promise<void>, {}, DeleteVodPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodPricePreset>) => {
        await VodPaywallServices.deleteVodPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_VOD_PRICE_PRESET, payload: {data: data, contentId: vodId}})
                dispatch(showToastNotification(`Price has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const getVodPaywallPromosAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodPaywallPromos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodPaywallPromos>) => {
        await VodPaywallServices.getVodPaywallPromos()
            .then( response => {
                dispatch({type: ActionTypes.GET_VOD_PAYWALL_PROMOS, payload: {data: response.data.data, contentId: vodId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createVodPromoPresetAction = (data: Promo, vodId: string): ThunkDispatch<Promise<void>, {}, CreateVodPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateVodPromoPreset>) => {
        await VodPaywallServices.createVodPromoPreset(data, vodId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_VOD_PROMO_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: vodId}})
                dispatch(showToastNotification(`Promo has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveVodPromoPresetAction = (data: Promo, vodId: string): ThunkDispatch<Promise<void>, {}, SaveVodPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveVodPromoPreset>) => {
        await VodPaywallServices.saveVodPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_VOD_PROMO_PRESET, payload: {data: data, contentId: vodId}})
                dispatch(showToastNotification(`Promo has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteVodPromoPresetAction = (data: Promo, vodId: string): ThunkDispatch<Promise<void>, {}, DeleteVodPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodPromoPreset>) => {
        await VodPaywallServices.deleteVodPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_VOD_PROMO_PRESET, payload: {data: data, contentId: vodId}})
                dispatch(showToastNotification(`Promo has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetVodPaywallInfo
| GetVodPaywallPrices
| CreateVodPricePreset
| SaveVodPaywallInfos
| SaveVodPricePreset
| DeleteVodPricePreset
| GetVodPaywallPromos
| CreateVodPromoPreset
| SaveVodPromoPreset
| DeleteVodPromoPreset