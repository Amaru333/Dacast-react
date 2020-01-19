import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from '../..';
import { showToastNotification } from '../../toasts/actions';
import { LiveGeneralServices } from './services';
import { ActionTypes, LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload, LiveItem } from './types';



export interface GetLiveDetails {
    type: ActionTypes.GET_LIVE_DETAILS;
    payload: LiveDetails;
}

export interface GetLiveList {
    type: ActionTypes.GET_LIVE_LIST;
    payload: LiveItem[];
}

export interface SaveLiveDetails {
    type: ActionTypes.SAVE_LIVE_DETAILS;
    payload: LiveDetails;
}

export interface ChangeLiveThumbnail {
    type: ActionTypes.CHANGE_LIVE_THUMBNAIL;
    payload: {thumbnail: string};
}

export interface ChangeLiveSplashscreen {
    type: ActionTypes.CHANGE_LIVE_SPLASHSCREEN;
    payload: {splashscreen: string};
}

export interface ChangeLivePoster {
    type: ActionTypes.CHANGE_LIVE_POSTER;
    payload: {poster: string};
}

export interface DeleteLiveChannel {
    type: ActionTypes.DELETE_LIVE_CHANNEL;
    payload: {id: string};
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

export const getLiveListAction = (): ThunkDispatch<Promise<void>, {}, GetLiveList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLiveList>) => {
        await LiveGeneralServices.getLiveList()
            .then(response => {
                dispatch({ type: ActionTypes.GET_LIVE_LIST, payload: response.data });
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

export const changeLiveThumbnailAction = (data: ThumbnailUpload): ThunkDispatch<Promise<void>, {}, ChangeLiveThumbnail> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangeLiveThumbnail>) => {
        await LiveGeneralServices.changeLiveThumbnailService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_LIVE_THUMBNAIL, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const deleteLiveChannelAction = (data: string): ThunkDispatch<Promise<void>, {}, DeleteLiveChannel> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLiveChannel>) => {
        await LiveGeneralServices.deleteLiveChannelService(data)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_LIVE_CHANNEL, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeLiveSplashscreenAction = (data: SplashscreenUpload): ThunkDispatch<Promise<void>, {}, ChangeLiveSplashscreen> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangeLiveSplashscreen>) => {
        await LiveGeneralServices.changeLiveSplashscrenService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_LIVE_SPLASHSCREEN, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeLivePosterAction = (data: PosterUpload): ThunkDispatch<Promise<void>, {}, ChangeLivePoster> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangeLivePoster>) => {
        await LiveGeneralServices.changeLivePosterService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_LIVE_POSTER, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetLiveDetails | GetLiveList | SaveLiveDetails | ChangeLiveThumbnail | ChangeLiveSplashscreen | ChangeLivePoster  | DeleteLiveChannel
