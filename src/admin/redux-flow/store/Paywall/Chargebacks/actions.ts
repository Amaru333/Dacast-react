import { ActionTypes, Chargeback } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatPostChargebackInput } from './viewModel';

export interface SaveChargeback {
    type: ActionTypes.SUBMIT_CHARGEBACK;
    payload: Chargeback;
}

export const submitChargebackAction = applyAdminViewModel(dacastSdk.postAccountTransaction, formatPostChargebackInput, undefined, ActionTypes.SUBMIT_CHARGEBACK, 'Changes have been applied',  'Couldn\'t apply changes')

export type Action = SaveChargeback