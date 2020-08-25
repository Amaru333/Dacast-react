export enum ActionTypes {
    GET_PAYMENT_METHODS = "@@paywall_payout/GET_PAYMENT_METHODS",
    GET_WITHDRAWAL_REQUESTS = "@@paywall_payout/GET_WITHDRAWAL_REQUESTS",
    ADD_PAYMENT_METHOD = "@@paywall_payout/ADD_PAYMENT_METHOD",
    UPDATE_PAYMENT_METHOD = "@@paywall_payout/UPDATE_PAYMENT_METHOD",
    DELETE_PAYMENT_METHOD = "@@paywall_payout/DELETE_PAYMENT_METHOD",
    ADD_WITHDRAWAL_REQUEST = "@@paywall_payout/ADD_WITHDRAWAL_REQUEST"
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

export interface WithdrawalRequest {
    paymentMethodId: string;
    currency: string;
    amount: number;
    requestDate: number;
    transferDate: number;
    status: 'Completed' | 'Cancelled' | 'Pending';
}

export interface PayoutInfos {
    paymentMethods?: PaymentMethod[];
    withdrawalRequests?: WithdrawalRequest[];
}

export const payoutInitialState: PayoutInfos = {
    paymentMethods: null,
    withdrawalRequests: []
}
