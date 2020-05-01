import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts/actions';
import { LiveGeneralServices } from './services';
import { ActionTypes, LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload, LiveItem, SearchResult } from './types';



export interface GetLiveDetails {
    type: ActionTypes.GET_LIVE_DETAILS;
    payload: {data: LiveDetails};
}

export interface GetLiveList {
    type: ActionTypes.GET_LIVE_LIST;
    payload: {data: SearchResult};
}

export interface SaveLiveDetails {
    type: ActionTypes.SAVE_LIVE_DETAILS;
    payload: LiveDetails;
}

export interface ChangeLiveThumbnail {
    type: ActionTypes.CHANGE_LIVE_THUMBNAIL;
    payload: {thumbnail: string};
}

export interface DeleteLiveThumbnail {
    type: ActionTypes.DELETE_LIVE_THUMBNAIL;
    payload: {thumbnail: string};
}

export interface ChangeLiveSplashscreen {
    type: ActionTypes.CHANGE_LIVE_SPLASHSCREEN;
    payload: {splashscreen: string};
}

export interface DeleteLiveSplashscreen {
    type: ActionTypes.DELETE_LIVE_SPLASHSCREEN;
    payload: {splashscreen: string};
}

export interface ChangeLivePoster {
    type: ActionTypes.CHANGE_LIVE_POSTER;
    payload: {poster: string};
}

export interface DeleteLivePoster {
    type: ActionTypes.DELETE_LIVE_POSTER;
    payload: {poster: string};
}

export interface DeleteLiveChannel {
    type: ActionTypes.DELETE_LIVE_CHANNEL;
    payload: {id: string};
}

export const getLiveDetailsAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLiveDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLiveDetails>) => {
        await LiveGeneralServices.getLiveDetailsService(liveId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_LIVE_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getLiveListAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetLiveList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLiveList>) => {
        await LiveGeneralServices.getLiveList(qs)
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
                dispatch({ type: ActionTypes.SAVE_LIVE_DETAILS, payload: data });
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
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
                dispatch(showToastNotification(`${data} has been saved`, 'flexible', "success"));
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const deleteLiveThumbnailAction = (): ThunkDispatch<Promise<void>, {}, DeleteLiveThumbnail> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLiveThumbnail>) => {
        await LiveGeneralServices.deleteLiveThumbnailService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_LIVE_THUMBNAIL, payload: response.data });
                dispatch(showToastNotification(`Thumbnail has been deleted`, 'flexible', "success"));
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
                dispatch(showToastNotification("Channel has been deleted", 'fixed', "success"));
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
                dispatch(showToastNotification(`${data} has been saved`, 'flexible', "success"));
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteLiveSplashscreenAction = (): ThunkDispatch<Promise<void>, {}, DeleteLiveSplashscreen> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLiveSplashscreen>) => {
        await LiveGeneralServices.deleteLiveSplashscrenService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_LIVE_SPLASHSCREEN, payload: response.data });
                dispatch(showToastNotification(`Splashscreen has been deleted`, 'flexible', "success"));
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
                dispatch(showToastNotification(`${data} has been saved`, 'flexible', "success"));
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteLivePosterAction = (): ThunkDispatch<Promise<void>, {}, DeleteLivePoster> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLivePoster>) => {
        await LiveGeneralServices.deleteLivePosterService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_LIVE_POSTER, payload: response.data });
                dispatch(showToastNotification(`Poster has been deleted`, 'flexible', "success"));
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetLiveDetails | GetLiveList | SaveLiveDetails | ChangeLiveThumbnail | DeleteLiveThumbnail | ChangeLiveSplashscreen | DeleteLiveSplashscreen | ChangeLivePoster | DeleteLivePoster  | DeleteLiveChannel
