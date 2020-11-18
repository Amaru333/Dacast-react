export enum ActionTypes {
    GET_TRANSACTIONS = "@@paywall_transactions/GET_TRANSACTIONS",
    GET_TRANSACTIONS_CSV = '@@paywall_transactions/GET_TRANSACTIONS_CSV'
}

export interface TransactionLine {
    id: string;
    type: string;
    contentName: string;
    date: string;
    purchaser: string;
    currency: string;
    price: number;
    credit?: number;
    debit?: number;
}

export type TransactionsInfo = {
    transactionsList: TransactionLine[]
    page: number;
    perPage: number;
    total: number
    csvString?: string;
};

export const transactionsInitialState: TransactionsInfo = null;