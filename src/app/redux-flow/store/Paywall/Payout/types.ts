export enum ActionTypes {
    GET_PAYMENT_METHODS = "@@paywall_payout/GET_PAYMENT_METHODS",
    GET_WITHDRAWAL_REQUESTS = "@@paywall_payout/GET_WITHDRAWAL_REQUESTS",
    ADD_PAYMENT_METHOD = "@@paywall_payout/ADD_PAYMENT_METHOD",
    UPDATE_PAYMENT_METHOD = "@@paywall_payout/UPDATE_PAYMENT_METHOD",
    DELETE_PAYMENT_METHOD = "@@paywall_payout/DELETE_PAYMENT_METHOD",
    ADD_WITHDRAWAL_REQUEST = "@@paywall_payout/ADD_WITHDRAWAL_REQUEST",
    CANCEL_WITHDRAWAL_REQUEST = "@@paywall_payout/CANCEL_WITHDRAWAL_REQUEST",
    GET_PAYWALL_BALANCE = "@@paywall_payout/GET_PAYWALL_BALANCE"
}


export enum PaymentMethodType {
    BankAccountUS = 'Bank Account (US)',
    BankAccountInternational = 'Bank Account (International)',
    Check = 'Check',
    PayPal = 'PayPal'
}

export type AccountType = 'Checking' | 'Savings'

export interface PaymentMethod {
    id?: string;
    accountNumber?: string;
    paymentMethodType?: string;
    paymentMethodName?: string;
    payee?: string;
    companyName?: string;
    recipientType?: 'Business' | 'Personal';
    swift?: string;
    iban?: string;
    routingNumber?: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
    accountType?: AccountType;
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

export interface PaymentMethodPut {
    id?: string;
    paymentMethodType?: string;
    paymentMethodName?: string;
    recipientType?: 'Business' | 'Personal';
    accountType?: AccountType;
    accountNumberUS?: string;
    routingNumberUS?: string;
    firstNameUS?: string;
    lastNameUS?: string;
    accountNameUS?: string;
    addressUS?: string;
    address2US?: string;
    stateUS?: string;
    townUS?: string;
    zipCodeUS?: string;
    countryUS?: string;
    bankNameUS?: string;
    bankAddressUS?: string;
    bankAddress2US?: string;
    bankStateUS?: string;
    bankTownUS?: string;
    bankZipCodeUS?: string;
    bankCountryUS?: string;
    swiftInternational?: string;
    ibanInternational?: string;
    routingNumberInternational?: string;
    firstNameInternational?: string;
    lastNameInternational?: string;
    accountNameInternational?: string;
    addressInternational?: string;
    address2International?: string;
    stateInternational?: string;
    townInternational?: string;
    zipCodeInternational?: string;
    countryInternational?: string;
    bankNameInternational?: string;
    bankAddressInternational?: string;
    bankAddress2International?: string;
    bankStateInternational?: string;
    bankTownInternational?: string;
    bankZipCodeInternational?: string;
    bankCountryInternational?: string;
    payee?: string;
    companyName?: string;
    checkAddress?: string;
    checkAddressLine2?: string;
    checkState?: string;
    checkTown?: string;
    checkZipCode?: string;
    checkCountry?: string;
    emailAddress?: string;
    comments?: string;
}

export interface WithdrawalRequest {
    paymentMethodId: string;
    id?: string;
    currency: string;
    amount: number;
    requestDate: number;
    transferDate: number;
    status: 'Completed' | 'Cancelled' | 'Pending';
}

export interface PayoutInfos {
    paymentMethods?: PaymentMethod[];
    withdrawalRequests?: WithdrawalRequest[];
    paywallBalance: number;
}

export const payoutInitialState: PayoutInfos = {
    paymentMethods: null,
    withdrawalRequests: [],
    paywallBalance: 0
}
