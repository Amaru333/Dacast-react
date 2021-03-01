import { ActionTypes, TransactionsInfo } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPaywallTransactionsCsvInput, formatGetPaywallTransactionsInput, formatGetPaywallTransactionsOutput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

export interface GetTransactions {
    type: ActionTypes.GET_TRANSACTIONS;
    payload: TransactionsInfo;
}

export interface GetTransactionsCsv {
    type: ActionTypes.GET_TRANSACTIONS_CSV;
    payload: string;
}

export type Action = GetTransactions | GetTransactionsCsv

export const getTransactionsAction = applyViewModel(dacastSdk.getPaywallTransactions, formatGetPaywallTransactionsInput, formatGetPaywallTransactionsOutput, ActionTypes.GET_TRANSACTIONS, null, 'Couldn\'t get transactions list')
export const getTransactionsCsvAction = applyViewModel(dacastSdk.getPaywallTransactionsCsv, formatGetPaywallTransactionsCsvInput, (data: string) => data, ActionTypes.GET_TRANSACTIONS_CSV, null, 'Couldn\'t export csv file')
export const syncTransactionsAction = applyViewModel(dacastSdk.syncTransactions, null, null, ActionTypes.SYNC_TRANSACTIONS, null, null)
