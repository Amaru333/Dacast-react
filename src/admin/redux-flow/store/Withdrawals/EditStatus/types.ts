import { string } from 'prop-types';

export enum ActionTypes {
    GET_WITHDRAWAL_INFO = "@@admin_accounts/GET_WITHDRAWAL_INFO",
    SAVE_WITHDRAWAL_STATUS = "@@admin_accounts/SAVE_WITHDRAWAL_STATUS"
}

export interface PaymentMethod {
    id?: string;
    accountNumber?: string;
    paymentMethodType?: string;
    paymentMethodName?: string;
    payee?: string;
    companyName?: string;
    recipientType?: 'business' | 'personal';
    swift?: string;
    iban?: string;
    routingNumber?: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
    address?: string;
    address2?: string;
    state?: string;
    town?: string;
    zipCode?: string;
    country?: string;
    bankName?: string;
    bankAddress?: string;
    bankAddress2?: string;
    bankState?: string;
    bankTown?: string;
    bankZipCode?: string;
    bankCountry?: string;
    emailAddress?: string;
    comments?: string;
}

 export interface WithdrawalInfo {
    amount: number;
    currency: string;
    id: string;
    method: string;
    paymentMethod: PaymentMethod;
    requestedDate: number;
    status: string;
    transferDate: number
  }

export const editWithdrawalDefaultState: WithdrawalInfo = null;

