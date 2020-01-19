import { ThunkDispatch } from "redux-thunk";
import { showToastNotification } from '../../Toasts';
import { ApplicationState } from '../..';
import { RenditionsList, ActionTypes } from '../Renditions/types'
import { VodRenditionsServices } from './services';

export interface GetVodRenditions {
    type: ActionTypes.GET_VOD_RENDITIONS;
    payload: RenditionsList;
}

export const getVodRenditionsAction = (): ThunkDispatch<Promise<void>, {}, GetVodRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodRenditions>) => {
        await VodRenditionsServices.getVodRenditionsService()
            .then(response => {
                dispatch({ type: ActionTypes.GET_VOD_RENDITIONS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodRenditions