

import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PayoutInfos } from './types';
import { PayoutServices } from './services';

export interface GetPayoutInfos {
    type: ActionTypes.GET_PAYOUT_INFOS;
    payload: PayoutInfos;
}

export const getPayoutInfosAction = (): ThunkDispatch<Promise<void>, {}, GetPayoutInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPayoutInfos>) => {
        await PayoutServices.getPayoutInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYOUT_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export type Action = GetPayoutInfos