import { ActionTypes, AccountInfo } from './types';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { applyAdminViewModel } from '../../../../utils/utils';
import { formatGetAccountDetailsInput, formatGetAccountDetailsOutput, formatPutAccountDetailsInput } from './viewModel';

export interface GetAccountInfo {
    type: ActionTypes.GET_ACCOUNT_INFO;
    payload: AccountInfo;
}

export interface SaveAccountInfo {
    type: ActionTypes.SAVE_ACCOUNT_INFO;
    payload: AccountInfo;
}

export const getAccountInfoAction = applyAdminViewModel(dacastSdk.getAccountDetails, formatGetAccountDetailsInput, formatGetAccountDetailsOutput, ActionTypes.GET_ACCOUNT_INFO, null,  'Couldn\'t get account details')
export const saveAccountInfoAction = applyAdminViewModel(dacastSdk.putAccountDetails, formatPutAccountDetailsInput, undefined, ActionTypes.SAVE_ACCOUNT_INFO, 'Account details saved!',  'Couldn\'t save account details')

 
export type Action = GetAccountInfo | SaveAccountInfo