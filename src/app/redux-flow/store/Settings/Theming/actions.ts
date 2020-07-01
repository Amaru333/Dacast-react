import { ActionTypes, ThemeOptions  } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { themingServices } from './services';

export interface GetThemesList {
    type: ActionTypes.GET_SETTING_THEMING_LIST;
    payload: {data: {themes: ThemeOptions[]}};
}

export interface SaveTheme {
    type: ActionTypes.SAVE_SETTING_THEME;
    payload: ThemeOptions;
}

export interface CreateTheme {
    type: ActionTypes.CREATE_SETTING_THEME;
    payload: ThemeOptions;
}

export interface DeleteTheme {
    type: ActionTypes.DELETE_SETTING_THEME;
    payload: ThemeOptions;
}

export const getThemingListAction = (): ThunkDispatch<Promise<void>, {}, GetThemesList> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetThemesList> ) => {
        await themingServices.getThemingList()
            .then( response => {
                dispatch( {type: ActionTypes.GET_SETTING_THEMING_LIST, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
};

export const saveThemeAction = (theme: ThemeOptions): ThunkDispatch<Promise<void>, {}, SaveTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveTheme> ) => {
        await themingServices.saveTheme(theme)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_SETTING_THEME, payload: theme} );
                dispatch(showToastNotification(`${theme.themeName} has been updated`, 'fixed', "success"))
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
};

export const createThemeAction = (theme: ThemeOptions): ThunkDispatch<Promise<void>, {}, CreateTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateTheme> ) => {
        await themingServices.createTheme({...theme, createdDate: Math.floor(Date.now() / 1000)})
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_SETTING_THEME, payload: {...theme, id: response.data.data.id, createdDate: Math.floor(Date.now() / 1000)}} );
                dispatch(showToastNotification(`${theme.themeName} has been created`, 'fixed', "success"))
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
};

export const deleteThemeAction = (theme: ThemeOptions): ThunkDispatch<Promise<void>, {}, DeleteTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteTheme> ) => {
        await themingServices.deleteTheme(theme)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_SETTING_THEME, payload: theme} );
                dispatch(showToastNotification(`${theme.themeName} has been deleted`, 'fixed', "success"))
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
};

export type Action = GetThemesList | SaveTheme | CreateTheme | DeleteTheme