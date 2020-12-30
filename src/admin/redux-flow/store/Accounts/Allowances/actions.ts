import { ActionTypes, Allowances } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetAccountAllowancesInput, formatGetAccountAllowancesOutput, formatPostAccountAllowancesInput } from './viewModel';

export interface GetAccountAllowances {
    type: ActionTypes.GET_ACCOUNT_ALLOWANCES;
    payload: Allowances;
}

export interface SaveAccountAllowances {
    type: ActionTypes.SAVE_ACCOUNT_ALLOWANCES;
    payload: Allowances;
}

export const getAccountAllowancesAction = applyAdminViewModel(dacastSdk.getAccountAllowances, formatGetAccountAllowancesInput, formatGetAccountAllowancesOutput, ActionTypes.GET_ACCOUNT_ALLOWANCES, null,  'Couldn\'t get account allowances')
export const saveAccountAllowancesAction = applyAdminViewModel(dacastSdk.postAccountAllowances, formatPostAccountAllowancesInput, undefined, ActionTypes.SAVE_ACCOUNT_ALLOWANCES, 'Allowances data saved!',  'Couldn\'t save allowances')

export type Action = GetAccountAllowances | SaveAccountAllowances