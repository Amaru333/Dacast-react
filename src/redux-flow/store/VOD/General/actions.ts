import { ActionTypes, VodDetails, SubtitleInfo } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../toasts';
import { VodGeneralServices } from './services';

export interface GetVodDetails {
    type: ActionTypes.GET_VOD_DETAILS;
    payload: VodDetails;
}

export interface addVodSubtitle {
    type: ActionTypes.ADD_VOD_SUBTITLE;
    payload: SubtitleInfo
}

export interface editVodSubtitle {
    type: ActionTypes.EDIT_VOD_SUBTITLE;
    payload: SubtitleInfo
}

export const getVodDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetVodDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodDetails> ) => {
        await VodGeneralServices.getVodDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_DETAILS, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const addVodSubtitleAction = (data: SubtitleInfo): ThunkDispatch<Promise<void>, {}, addVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, addVodSubtitle> ) => {
        await VodGeneralServices.addVodSubtitleService(data)
            .then( response => {
                dispatch( {type: ActionTypes.ADD_VOD_SUBTITLE, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const editVodSubtitleAction = (data: SubtitleInfo): ThunkDispatch<Promise<void>, {}, editVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, editVodSubtitle> ) => {
        await VodGeneralServices.editVodSubtitleService(data)
            .then( response => {
                dispatch( {type: ActionTypes.EDIT_VOD_SUBTITLE, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetVodDetails | addVodSubtitle | editVodSubtitle