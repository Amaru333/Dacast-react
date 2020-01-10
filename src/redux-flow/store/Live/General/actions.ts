import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from '../..';
import { showToastNotification } from '../../toasts/actions';
import { LiveGeneralServices } from './services';
import { ActionTypes, LiveDetails } from './types';



export interface GetLiveDetails {
    type: ActionTypes.GET_LIVE_DETAILS;
    payload: LiveDetails
}

export interface SaveLiveDetails {
    type: ActionTypes.SAVE_LIVE_DETAILS;
    payload: LiveDetails
}

export const getLiveDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetLiveDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLiveDetails>) => {
        await LiveGeneralServices.getLiveDetailsService()
            .then(response => {
                dispatch({ type: ActionTypes.GET_LIVE_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveDetailsAction = (data: LiveDetails): ThunkDispatch<Promise<void>, {}, SaveLiveDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLiveDetails>) => {
        await LiveGeneralServices.saveLiveDetailsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.SAVE_LIVE_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetLiveDetails | SaveLiveDetails