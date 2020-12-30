import { ActionTypes, WithdrawalsList } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetWithdrawalsListInput, formatGetWithdrawalsListOutput } from './viewModel';

export interface GetWithdrawals {
    type: ActionTypes.GET_WITHDRAWALS;
    payload: WithdrawalsList;
}

export const getWithdrawalsAction = applyAdminViewModel(dacastSdk.getAccountsWithdrawals, formatGetWithdrawalsListInput, formatGetWithdrawalsListOutput, ActionTypes.GET_WITHDRAWALS, null,  'Couldn\'t get withdrawals list')

export type Action = GetWithdrawals