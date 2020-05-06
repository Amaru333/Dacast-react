import { ActionTypes, InteractionsInfos, Ad, MailCatcher } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { interactionsServices } from './services';

export interface GetSettingsInteractionsInfos {
    type: ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS;
    payload: {data: InteractionsInfos};
}

export interface SaveSettingsInteractionsInfos {
    type: ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS;
    payload: InteractionsInfos;
}

export interface SaveAd {
    type: ActionTypes.SAVE_AD;
    payload: Ad[];
}

export interface CreateAd {
    type: ActionTypes.CREATE_AD;
    payload: {ads: Ad[]; adsId: string;};
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

export const getSettingsInteractionsInfosAction = (): ThunkDispatch<Promise<void>, {}, GetSettingsInteractionsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsInteractionsInfos> ) => {
        await interactionsServices.getInteractionsInfos()
            .then( response => {
                dispatch( {type: ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS, payload: response.data} );
            }).catch((error) => {
                debugger
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveSettingsInteractionsInfosAction = (data: InteractionsInfos): ThunkDispatch<Promise<void>, {}, SaveSettingsInteractionsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveSettingsInteractionsInfos> ) => {
        await interactionsServices.saveInteractionsInfos(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS, payload: response.data} );
                dispatch(showToastNotification("Engagement settings saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveAdAction = (data: Ad[], adsId: string): ThunkDispatch<Promise<void>, {}, SaveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveAd> ) => {
        await interactionsServices.saveAd(data, adsId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_AD, payload: data} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createAdAction = (data: Ad[]): ThunkDispatch<Promise<void>, {}, CreateAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateAd> ) => {
        await interactionsServices.createAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_AD, payload: {ads: data, adsId: response.data.data.adsId}} );
                dispatch(showToastNotification("Ad created", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteAdAction = (data: Ad[], adsId: string): ThunkDispatch<Promise<void>, {}, DeleteAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteAd> ) => {
        await interactionsServices.saveAd(data, adsId)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_AD, payload: data} );
                dispatch(showToastNotification("Ad deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
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
            })
    };
}

export type Action = GetSettingsInteractionsInfos 
| SaveSettingsInteractionsInfos
| SaveAd 
| CreateAd
| DeleteAd
| SaveMailCatcher
| CreateMailCatcher
| DeleteMailCatcher


