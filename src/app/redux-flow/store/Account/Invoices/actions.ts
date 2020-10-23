import { ActionTypes, SearchInvoicesResult } from './types';
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetInvoicesInput, formatGetInvoicesOutput } from './viewModel';

export interface GetInvoices {
    type: ActionTypes.GET_INVOICES;
    payload: SearchInvoicesResult;
}

export type Action = GetInvoices

export const getInvoicesAction = applyViewModel(dacastSdk.getInvoices, formatGetInvoicesInput, formatGetInvoicesOutput, ActionTypes.GET_INVOICES, null, 'Couldn\'t get invoices')