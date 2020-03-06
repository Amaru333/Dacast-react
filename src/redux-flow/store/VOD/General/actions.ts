import { ActionTypes, VodDetails, SubtitleInfo, ThumbnailUpload, VodItem, SplashscreenUpload, PosterUpload } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { VodGeneralServices } from './services';

export interface GetVodDetails {
    type: ActionTypes.GET_VOD_DETAILS;
    payload: VodDetails;
}

export interface GetVodList {
    type: ActionTypes.GET_VOD_LIST;
    payload: VodItem[];
}

export interface EditVodDetails {
    type: ActionTypes.EDIT_VOD_DETAILS;
    payload: VodDetails;
}

export interface AddVodSubtitle {
    type: ActionTypes.ADD_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface EditVodSubtitle {
    type: ActionTypes.EDIT_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface DeleteVodSubtitle {
    type: ActionTypes.DELETE_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface ChangeVodThumbnail {
    type: ActionTypes.CHANGE_VOD_THUMBNAIL;
    payload: { thumbnail: string };
}

export interface ChangeVodSplashscreen {
    type: ActionTypes.CHANGE_VOD_SPLASHSCREEN;
    payload: {splashscreen: string};
}

export interface ChangeVodPoster {
    type: ActionTypes.CHANGE_VOD_POSTER;
    payload: {poster: string};
}

export interface DeleteVodPoster {
    type: ActionTypes.DELETE_VOD_POSTER;
    payload: {poster: string};
}

export interface PostVod {
    type: ActionTypes.POST_VOD;
    payload: {};
}

export interface DeleteVod {
    type: ActionTypes.DELETE_VOD;
    payload: {name: string};
}


export const postVodDemo = (): PostVod => {
    return {
        type: ActionTypes.POST_VOD,
        payload: {}
    }
}

export const deleteVodAction = (name: string): DeleteVod => {
    return {
        type: ActionTypes.DELETE_VOD,
        payload: {name}
    }
}

export const getVodDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetVodDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodDetails>) => {
        await VodGeneralServices.getVodDetailsService()
            .then(response => {
                dispatch({ type: ActionTypes.GET_VOD_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getVodListAction = (): ThunkDispatch<Promise<void>, {}, GetVodList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodList>) => {
        await VodGeneralServices.getVodList()
            .then(response => {
                dispatch({ type: ActionTypes.GET_VOD_LIST, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const editVodDetailsAction = (data: VodDetails): ThunkDispatch<Promise<void>, {}, EditVodDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, EditVodDetails>) => {
        await VodGeneralServices.editVodDetailsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.EDIT_VOD_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const addVodSubtitleAction = (data: SubtitleInfo): ThunkDispatch<Promise<void>, {}, AddVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddVodSubtitle>) => {
        await VodGeneralServices.addVodSubtitleService(data)
            .then(response => {
                dispatch({ type: ActionTypes.ADD_VOD_SUBTITLE, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const editVodSubtitleAction = (data: SubtitleInfo): ThunkDispatch<Promise<void>, {}, EditVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, EditVodSubtitle>) => {
        await VodGeneralServices.editVodSubtitleService(data)
            .then(response => {
                dispatch({ type: ActionTypes.EDIT_VOD_SUBTITLE, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteVodSubtitleAction = (data: SubtitleInfo): ThunkDispatch<Promise<void>, {}, DeleteVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodSubtitle>) => {
        await VodGeneralServices.deleteVodSubtitleService(data)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_VOD_SUBTITLE, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeVodThumbnailAction = (data: ThumbnailUpload): ThunkDispatch<Promise<void>, {}, ChangeVodThumbnail> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangeVodThumbnail>) => {
        await VodGeneralServices.changeVodThumbnailService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_VOD_THUMBNAIL, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeVodSplashscreenAction = (data: SplashscreenUpload): ThunkDispatch<Promise<void>, {}, ChangeVodSplashscreen> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangeVodSplashscreen>) => {
        await VodGeneralServices.changeVodSplashscrenService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_VOD_SPLASHSCREEN, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeVodPosterAction = (data: PosterUpload): ThunkDispatch<Promise<void>, {}, ChangeVodPoster> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangeVodPoster>) => {
        await VodGeneralServices.changeVodPosterService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_VOD_POSTER, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteVodPosterAction = (): ThunkDispatch<Promise<void>, {}, DeleteVodPoster> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodPoster>) => {
        await VodGeneralServices.deleteVodPosterService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_VOD_POSTER, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodDetails | EditVodDetails | AddVodSubtitle | EditVodSubtitle | DeleteVodSubtitle | ChangeVodThumbnail | ChangeVodSplashscreen| ChangeVodPoster| DeleteVodPoster | GetVodList | PostVod | DeleteVod