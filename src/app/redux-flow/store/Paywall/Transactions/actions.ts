import { ActionTypes, TransactionsInfo } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPaywallTransactionsInput, formatGetPaywallTransactionsOutput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

export interface GetTransactions {
    type: ActionTypes.GET_TRANSACTIONS;
    payload: TransactionsInfo;
}

export type Action = GetTransactions

export const getTransactionsAction = applyViewModel(dacastSdk.getPaywallTransactions, formatGetPaywallTransactionsInput, formatGetPaywallTransactionsOutput, ActionTypes.GET_TRANSACTIONS, null, 'Couldn\'t get transactions list')