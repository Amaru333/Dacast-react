import { ActionTypes, WithdrawalInfo, WithdrawalStatusAdmin } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetWithdrawalDetailsInput, formatGetWithdrawalsDetailsOutput, formatPutWithdrawalDetailsInput } from './viewModel';

export interface GetWithdrawalInfo {
    type: ActionTypes.GET_WITHDRAWAL_INFO;
    payload: WithdrawalInfo;
}

export interface SaveWithdrawalStatus {
    type: ActionTypes.SAVE_WITHDRAWAL_STATUS;
    payload: WithdrawalStatusAdmin;
}

export const getWithdrawalInfoAction = applyAdminViewModel(dacastSdk.getWithdrawalDetails, formatGetWithdrawalDetailsInput, formatGetWithdrawalsDetailsOutput, ActionTypes.GET_WITHDRAWAL_INFO, null,  'Couldn\'t get withdrawal details')

export const saveWithdrawalStatusAction = applyAdminViewModel(dacastSdk.putWithdrawalDetails, formatPutWithdrawalDetailsInput, undefined, ActionTypes.SAVE_WITHDRAWAL_STATUS, 'Withdrawal status saved',  'Couldn\'t save withdrawal status')

export type Action = GetWithdrawalInfo | SaveWithdrawalStatus