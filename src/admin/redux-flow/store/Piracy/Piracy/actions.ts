import { ActionTypes, PirateData } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetPirateInput, formatGetPirateOutput } from './viewModel';

export interface GetPirate {
    type: ActionTypes.GET_PIRATE;
    payload: PirateData;
}

export const getPirateAction = applyAdminViewModel(dacastSdk.getPirateInfo, formatGetPirateInput, formatGetPirateOutput, ActionTypes.GET_PIRATE, null,  'Couldn\'t get pirate info')

export type Action = GetPirate

