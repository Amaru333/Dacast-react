import { ActionTypes, ThemeOptions  } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { themingServices } from './services';

export interface GetThemesList {
    type: ActionTypes.GET_SETTING_THEMING_LIST;
    payload: ThemeOptions[];
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

export type Action = GetThemesList 