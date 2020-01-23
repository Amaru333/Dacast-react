import { DateTime } from 'luxon';

export enum ActionTypes {
    GET_PAYOUT_INFOS = "@@paywal_payout/GET_PAYOUT_INFOS",
}
export interface BankAccountUS {
    type: 'business' | 'personal';
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

export interface PayPal {
    emailAddress: string;
    comments: string;
}

export interface PayoutPaymentMethods {
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
    status: string;
}

export interface PayoutInfos {
    paymentMethodRequests?: PayoutPaymentMethods[];
    withdrawalRequests?: WithdrawalRequest[];
}

export const payoutInitialState: PayoutInfos = {
    paymentMethodRequests: [],
    withdrawalRequests: []
}
