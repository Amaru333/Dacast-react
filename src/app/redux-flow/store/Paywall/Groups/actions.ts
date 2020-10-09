import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, GroupPrice, GroupPromo, GroupPriceData, GroupPromoData } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPromoGroupOuput, formatPostPromoGroupInput, formatPutPromoGroupInput, formatGetPriceGroupOuput, formatPostPriceGroupInput, formatPutPriceGroupInput } from './viewModel';

export interface GetGroupPrices {
    type: ActionTypes.GET_GROUP_PRICES;
    payload: GroupPriceData;
}

export interface CreateGroupPrice {
    type: ActionTypes.CREATE_GROUP_PRICE;
    payload: GroupPrice;
}

export interface SaveGroupPrice {
    type: ActionTypes.SAVE_GROUP_PRICE;
    payload: GroupPrice;
}

export interface DeleteGroupPrice {
    type: ActionTypes.DELETE_GROUP_PRICE;
    payload: GroupPrice;
}

export interface GetGroupPromos {
    type: ActionTypes.GET_GROUP_PROMOS;
    payload: GroupPromoData;
}

export interface CreateGroupPromo {
    type: ActionTypes.CREATE_GROUP_PROMO;
    payload: GroupPromo;
}

export interface SaveGroupPromo {
    type: ActionTypes.SAVE_GROUP_PROMO;
    payload: GroupPromo;
}

export interface DeleteGroupPromo {
    type: ActionTypes.DELETE_GROUP_PROMO;
    payload: GroupPromo;
}

export const getGroupPricesAction = (): ThunkDispatch<Promise<void>, {}, GetGroupPrices> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetGroupPrices>) => {
        await dacastSdk.getPricePackage('page=1&per-page=100')
            .then( response => {
                dispatch({type: ActionTypes.GET_GROUP_PRICES, payload: formatGetPriceGroupOuput(response)});
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject(error)
            })
    }
}

export const createGroupPriceAction = (data: GroupPrice): ThunkDispatch<Promise<void>, {}, CreateGroupPrice> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateGroupPrice>) => {
        await dacastSdk.postPricePackage(formatPostPriceGroupInput(data))
            .then( response => {
                dispatch({type: ActionTypes.CREATE_GROUP_PRICE, payload: {...data, id: response.id}})
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
                return Promise.reject()
            })
    }
}

export const saveGroupPriceAction = (data: GroupPrice): ThunkDispatch<Promise<void>, {}, SaveGroupPrice> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveGroupPrice>) => {
        await dacastSdk.putPricePackage(formatPutPriceGroupInput(data))
            .then(() => {
                dispatch({type: ActionTypes.SAVE_GROUP_PRICE, payload: data})
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
                return Promise.reject()
            })
    }
}

export const deleteGroupPriceAction = (data: GroupPrice): ThunkDispatch<Promise<void>, {}, DeleteGroupPrice> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteGroupPrice>) => {
        await dacastSdk.deletePricePackage(data.id)
            .then(() => {
                dispatch({type: ActionTypes.DELETE_GROUP_PRICE, payload: data})
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
                return Promise.reject()
            })
    }
}

export const getGroupPromosAction = (): ThunkDispatch<Promise<void>, {}, GetGroupPromos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetGroupPromos>) => {
        await dacastSdk.getPromo('per-page=100&page=1')
            .then( response => {
                dispatch({type: ActionTypes.GET_GROUP_PROMOS, payload: formatGetPromoGroupOuput(response)});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const createGroupPromoAction = (data: GroupPromo): ThunkDispatch<Promise<void>, {}, CreateGroupPromo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateGroupPromo>) => {
        await dacastSdk.postPromo(formatPostPromoGroupInput(data))
            .then( response => {
                dispatch({type: ActionTypes.CREATE_GROUP_PROMO, payload: {...data, id: response.id}})
                dispatch(showToastNotification(`promo has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
                return Promise.reject()
            })
    }
}

export const saveGroupPromoAction = (data: GroupPromo): ThunkDispatch<Promise<void>, {}, SaveGroupPromo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveGroupPromo>) => {
        await dacastSdk.putPromo(formatPutPromoGroupInput(data))
            .then(() => {
                dispatch({type: ActionTypes.SAVE_GROUP_PROMO, payload: data})
                dispatch(showToastNotification(`promo has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
                return Promise.reject()
            })
    }
}

export const deleteGroupPromoAction = (data: GroupPromo): ThunkDispatch<Promise<void>, {}, DeleteGroupPromo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteGroupPromo>) => {
        await dacastSdk.deletePromo(data.id)
            .then(() => {
                dispatch({type: ActionTypes.DELETE_GROUP_PROMO, payload: data})
                dispatch(showToastNotification(`promo has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
                return Promise.reject()
            })
    }
}


export type Action = GetGroupPrices
| CreateGroupPrice
| SaveGroupPrice
| DeleteGroupPrice
| GetGroupPromos
| CreateGroupPromo
| SaveGroupPromo
| DeleteGroupPromo