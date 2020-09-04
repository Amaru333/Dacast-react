import { DateTime } from 'luxon';

export enum ActionTypes {
    GET_TRANSACTIONS = "@@paywall_transactions/GET_TRANSACTIONS"
}

export interface TransactionInfos {
    id: string;
    type: string;
    contentName: string;
    date: number | null;
    purchaser: string;
    currency: string;
    price: number;
    usdBalance?: number;
}

export type TransactionsInfos = TransactionInfos[];

export const transactionsInitialState: TransactionsInfos = [];