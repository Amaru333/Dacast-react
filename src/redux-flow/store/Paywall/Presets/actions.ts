import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PresetsPageInfos } from './types';
import { PresetsServices } from './services';

export interface GetPresetsInfo {
    type: ActionTypes.GET_PRESETS_INFOS;
    payload: PresetsPageInfos;
}

export const getPresetsInfosAction = (): ThunkDispatch<Promise<void>, {}, GetPresetsInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPresetsInfo>) => {
        await PresetsServices.getPresetsInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PRESETS_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export type Action = GetPresetsInfo