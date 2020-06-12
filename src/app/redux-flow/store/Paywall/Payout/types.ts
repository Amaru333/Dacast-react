import { DateTime } from 'luxon';

export enum ActionTypes {
    GET_PAYMENT_METHODS = "@@paywall_payout/GET_PAYMENT_METHODS",
    GET_WITHDRAWAL_REQUESTS = "@@paywall_payout/GET_WITHDRAWAL_REQUESTS",
    ADD_PAYMENT_METHOD_REQUEST = "@@paywall_payout/ADD_PAYMENT_METHOD_REQUEST",
    DELETE_PAYMENT_METHOD_REQUEST = "@@paywall_payout/DELETE_PAYMENT_METHOD_REQUEST",
    ADD_WITHDRAWAL_REQUEST = "@@paywall_payout/ADD_WITHDRAWAL_REQUEST"
}
export interface BankAccountUS {
    type: 'business' | 'personal';
    accountNumber: number;
    routingNumber: number;
    firstName: string;
    lastName?: string;
    accountName: string;
    address: string;
    address2?: string;
    state: string;
    town: string;
    zipCode: string;
    country: 'US';
    bankName: string;
    bankAddress: string;
    bankAddress2?: string;
    bankState: string;
    bankTown: string;
    bankZipCode: string;
    bankCountry: 'US';
}

export interface BankAccountInternational {
    type: 'business' | 'personal';
    swift: string;
    iban: string;
    routingNumber: number;
    firstName: string;
    lastName?: string;
    accountName: string;
    address: string;
    address2?: string;
    state: string;
    town: string;
    zipCode: string;
    country: string;
    bankName: string;
    bankAddress: string;
    bankAddress2?: string;
    bankState: string;
    bankTown: string;
    bankZipCode: string;
    bankCountry: string;
}

export interface Check {
    payee: string;
    companyName: string;
    address: string;
    address2?: string;
    state: string;
    town: string;
    zipCode: string;
    country: string;
}

export type PaymentMethodRequest = Check | PayPal | BankAccountUS | BankAccountInternational;

export interface PayPal {
    emailAddress: string;
    comments: string;
}

export interface PaymentMethods {
    bankAccountUS: BankAccountUS;
    bankAccountInternational: BankAccountInternational;
    check: Check;
    paypal: PayPal;
}

export interface WithdrawalRequest {
    requestType: string;
    currency: string;
    amount: number;
    requestDate: DateTime;
    transferDate: DateTime;
    status: 'Completed' | 'Cancelled' | 'Pending';
}

export interface PayoutInfos {
    paymentMethods?: PaymentMethods;
    withdrawalRequests?: WithdrawalRequest[];
}

export const payoutInitialState: PayoutInfos = {
    paymentMethods: null,
    withdrawalRequests: []
}
