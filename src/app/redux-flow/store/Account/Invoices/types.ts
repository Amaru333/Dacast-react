export enum ActionTypes {
    GET_INVOICES = "@@account_invoices/GET_INVOICES"
}

export interface Invoice {
    id: string;
    date: number;
    total: number;
    status: 'Pending' | 'Failed' | 'Paid';
    downloadLink: string;
}

export const invoicesInitialState: Invoice[] = []; 