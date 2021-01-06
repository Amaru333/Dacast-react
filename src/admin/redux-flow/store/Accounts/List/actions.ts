import { ActionTypes, Account } from './types';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient'
import { formatGetAccountsInput, formatGetAccountsOutput } from './viewModel';
import { applyAdminViewModel } from '../../../../utils/utils';

export interface GetAccounts {
    type: ActionTypes.GET_ACCOUNTS;
    payload: { users: Account[]; total: number}
}

export const getAccountsAction = applyAdminViewModel(dacastSdk.getAccounts, formatGetAccountsInput, formatGetAccountsOutput, ActionTypes.GET_ACCOUNTS, null,  'User\'s plan couldn\'t be retrieved')

export type Action = GetAccounts