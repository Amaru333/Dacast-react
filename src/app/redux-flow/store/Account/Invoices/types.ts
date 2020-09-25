export enum ActionTypes {
    GET_INVOICES = "@@account_invoices/GET_INVOICES"
}

export interface Invoice {
    id: string;
    date: number;
    total: number;
    status: 'pending' | 'failed' | 'paid';
    downloadLink: string;
}

export interface SearchInvoicesResult {
    invoices: Invoice[];
    page: number;
    perPage: number;
    total: number;
}

export const invoicesInitialState: SearchInvoicesResult = null; 