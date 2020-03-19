import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, GroupsPageInfos, GroupPrice, GroupPromo } from './types';
import { GroupsServices } from './services';

export interface GetGroupsInfo {
    type: ActionTypes.GET_GROUPS_INFOS;
    payload: GroupsPageInfos;
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

export const getGroupsInfosAction = (): ThunkDispatch<Promise<void>, {}, GetGroupsInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetGroupsInfo>) => {
        await GroupsServices.getGroupsInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_GROUPS_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createGroupPriceAction = (data: GroupPrice): ThunkDispatch<Promise<void>, {}, CreateGroupPrice> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateGroupPrice>) => {
        await GroupsServices.createGroupPrice(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_GROUP_PRICE, payload: response.data})
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveGroupPriceAction = (data: GroupPrice): ThunkDispatch<Promise<void>, {}, SaveGroupPrice> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveGroupPrice>) => {
        await GroupsServices.saveGroupPrice(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_GROUP_PRICE, payload: response.data})
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteGroupPriceAction = (data: GroupPrice): ThunkDispatch<Promise<void>, {}, DeleteGroupPrice> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteGroupPrice>) => {
        await GroupsServices.deleteGroupPrice(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_GROUP_PRICE, payload: response.data})
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const createGroupPromoAction = (data: GroupPromo): ThunkDispatch<Promise<void>, {}, CreateGroupPromo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreateGroupPromo>) => {
        await GroupsServices.createGroupPromo(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_GROUP_PROMO, payload: response.data})
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const saveGroupPromoAction = (data: GroupPromo): ThunkDispatch<Promise<void>, {}, SaveGroupPromo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveGroupPromo>) => {
        await GroupsServices.saveGroupPromo(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_GROUP_PROMO, payload: response.data})
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deleteGroupPromoAction = (data: GroupPromo): ThunkDispatch<Promise<void>, {}, DeleteGroupPromo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteGroupPromo>) => {
        await GroupsServices.deleteGroupPromo(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_GROUP_PROMO, payload: response.data})
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetGroupsInfo
| CreateGroupPrice
| SaveGroupPrice
| DeleteGroupPrice
| CreateGroupPromo
| SaveGroupPromo
| DeleteGroupPromo