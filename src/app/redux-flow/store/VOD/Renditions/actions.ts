import { ThunkDispatch } from "redux-thunk";
import { showToastNotification } from '../../Toasts';
import { ApplicationState } from '../..';
import { RenditionsList, ActionTypes, Rendition } from '../Renditions/types'
import { VodRenditionsServices } from './services';

export interface GetVodRenditions {
    type: ActionTypes.GET_VOD_RENDITIONS;
    payload: {data: RenditionsList};
}

export interface AddVodRenditions {
    type: ActionTypes.ADD_VOD_RENDITIONS;
    payload: Rendition[];
}

export interface DeleteVodRenditions {
    type: ActionTypes.DELETE_VOD_RENDITIONS;
    payload: Rendition[];
}

export const getVodRenditionsAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodRenditions>) => {
        await VodRenditionsServices.getVodRenditionsService(vodId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_VOD_RENDITIONS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const addVodRenditionsAction = (data: Rendition[]): ThunkDispatch<Promise<void>, {}, AddVodRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddVodRenditions>) => {
        await VodRenditionsServices.addVodRenditionsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.ADD_VOD_RENDITIONS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteVodRenditionsAction = (data: Rendition[]): ThunkDispatch<Promise<void>, {}, AddVodRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodRenditions>) => {
        await VodRenditionsServices.deleteVodRenditionsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_VOD_RENDITIONS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetVodRenditions | AddVodRenditions | DeleteVodRenditions