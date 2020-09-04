export enum ActionTypes {
    GET_TRANSACTIONS = "@@paywall_transactions/GET_TRANSACTIONS"
}

export interface TransactionLine {
    id: string;
    type: string;
    contentName: string;
    date: string;
    purchaser: string;
    currency: string;
    price: number;
    dacastFee: number;
    actionType: string;
}

export type TransactionsInfo = {
    transactionsList: TransactionLine[]
    page: number;
    perPage: number;
    total: number
};

export const transactionsInitialState: TransactionsInfo = null;