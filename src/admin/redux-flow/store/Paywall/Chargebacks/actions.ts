import { ActionTypes, Chargeback } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { ChargebackServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface SaveChargeback {
    type: ActionTypes.SUBMIT_CHARGEBACK;
    payload: Chargeback;
}

export const submitChargebackAction = (data: Chargeback): ThunkDispatch<Promise<void>, {}, SaveChargeback> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SaveChargeback>) => {
        await ChargebackServices.submitChargeback(data)
            .then( response => {
                dispatch({type: ActionTypes.SUBMIT_CHARGEBACK, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification('Couldn\'t submit form' , 'fixed', 'error'))
            })
    }
}

export type Action = SaveChargeback