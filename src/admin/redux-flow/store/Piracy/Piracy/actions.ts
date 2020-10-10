import { ActionTypes, PirateData } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { PirateServices } from './service';

export interface GetPirate {
    type: ActionTypes.GET_PIRATE;
    payload: PirateData;
}

export const getPirateAction = (url: string): ThunkDispatch<Promise<void>, {}, GetPirate> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetPirate>) => {
        await PirateServices.getPirate(url)
            .then( response => {
                dispatch({type: ActionTypes.GET_PIRATE, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetPirate

