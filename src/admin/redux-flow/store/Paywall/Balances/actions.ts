import { ActionTypes, AccountBalanceInfo } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetBalancesInput, formatGetBalancesOutput } from './viewModel';

export interface GetBalances {
    type: ActionTypes.GET_BALANCES;
    payload: AccountBalanceInfo;
}

export const getBalancesAction = applyAdminViewModel(dacastSdk.getAccountsTransactions, formatGetBalancesInput, formatGetBalancesOutput, ActionTypes.GET_BALANCES, null,  'Couldn\'t get balances list')

export type Action = GetBalances