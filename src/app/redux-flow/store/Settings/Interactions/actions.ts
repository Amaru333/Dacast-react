import { ActionTypes, EngagementInfo, Ad, MailCatcher } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { interactionsServices } from './services';

export interface GetSettingsInteractionsInfos {
    type: ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS;
    payload: {data: EngagementInfo};
}

export interface SaveSettingsInteractionsInfos {
    type: ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS;
    payload: EngagementInfo;
}

export interface SaveAd {
    type: ActionTypes.SAVE_AD;
    payload: Ad[];
}

export interface CreateAd {
    type: ActionTypes.CREATE_AD;
    payload: Ad[];
}

export interface DeleteAd {
    type: ActionTypes.DELETE_AD;
    payload: Ad[];
}

export interface SaveMailCatcher {
    type: ActionTypes.SAVE_MAIL_CATCHER;
    payload: MailCatcher;
}

export interface CreateMailCatcher {
    type: ActionTypes.CREATE_MAIL_CATCHER;
    payload: MailCatcher;
}

export interface DeleteMailCatcher {
    type: ActionTypes.DELETE_MAIL_CATCHER;
    payload: MailCatcher;
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: {data:  {presignedURL: string }};
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
}


export const getSettingsInteractionsInfosAction = (): ThunkDispatch<Promise<void>, {}, GetSettingsInteractionsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsInteractionsInfos> ) => {
        await interactionsServices.getInteractionsInfos()
            .then( response => {
                dispatch( {type: ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS, payload: response.data} );
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveSettingsInteractionsInfosAction = (data: EngagementInfo): ThunkDispatch<Promise<void>, {}, SaveSettingsInteractionsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveSettingsInteractionsInfos> ) => {
        await interactionsServices.saveInteractionsInfos(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS, payload: data} );
                dispatch(showToastNotification("Engagement settings saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveAdAction = (data: Ad[]): ThunkDispatch<Promise<void>, {}, SaveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveAd> ) => {
        await interactionsServices.saveAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_AD, payload: data} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const createAdAction = (data: Ad[]): ThunkDispatch<Promise<void>, {}, CreateAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateAd> ) => {
        await interactionsServices.saveAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_AD, payload: data} );
                dispatch(showToastNotification("Ad created", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const deleteAdAction = (data: Ad[]): ThunkDispatch<Promise<void>, {}, DeleteAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteAd> ) => {
        await interactionsServices.saveAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_AD, payload: data} );
                dispatch(showToastNotification("Ad deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveMailCatcherAction = (data: MailCatcher): ThunkDispatch<Promise<void>, {}, SaveMailCatcher> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveMailCatcher> ) => {
        await interactionsServices.saveMailCatcher(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_MAIL_CATCHER, payload: response.data} );
                dispatch(showToastNotification("Mail catcher saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const createMailCatcherAction = (data: MailCatcher): ThunkDispatch<Promise<void>, {}, CreateMailCatcher> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateMailCatcher> ) => {
        await interactionsServices.createMailCatcher(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_MAIL_CATCHER, payload: response.data} );
                dispatch(showToastNotification("Mail catcher created", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const deleteMailCatcherAction = (data: MailCatcher): ThunkDispatch<Promise<void>, {}, DeleteMailCatcher> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteMailCatcher> ) => {
        await interactionsServices.deleteMailCatcher(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_MAIL_CATCHER, payload: response.data} );
                dispatch(showToastNotification("Mail catcher deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const getUploadUrlAction = (uploadType: string): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await interactionsServices.getUploadUrl(uploadType)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: {data: response.data.data} })
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export const uploadFileAction = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImage>) => {
        await interactionsServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: response.data })
                dispatch(showToastNotification("File has been successfully uploaded", 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export const deleteFileAction = (targetId: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await interactionsServices.deleteFile()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: response.data })
                dispatch(showToastNotification("Brand Image has been successfully deleted", 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}


export type Action = GetSettingsInteractionsInfos 
| SaveSettingsInteractionsInfos
| SaveAd 
| CreateAd
| DeleteAd
| SaveMailCatcher
| CreateMailCatcher
| DeleteMailCatcher
| GetUploadUrl
| UploadImage
| DeleteImage


