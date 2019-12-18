export enum ActionTypes {
    GET_BILLING_PAGE_INFOS = "@@account_billing/GET_BILLING_PAGE_INFOS",
    SAVE_BILLING_PAGE_PAYMENT_METHOD = "@@account_billing/SAVE_BILLING_PAGE_PAYMENT_METHOD",
    ADD_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_billing/ADD_BILLING_PAGE_PLAYBACK_PROTECTION",
    EDIT_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_billing/EDIT_BILLING_PAGE_PLAYBACK_PROTECTION",
    DELETE_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_billing/DELETE_BILLING_PAGE_PLAYBACK_PROTECTION",

}


export interface BillingPageInfos {
    paypal?: PaypalPayment;
    creditCard?: CreditCardPayment; 
    playbackProtection?: PlaybackProtection;
    extras?: Extras[]
}

export interface PlaybackProtection {
    enabled: boolean;
    amount: string;
    price: string;
}

export interface Extras {
    type: string;
    amount: string;
    price: string;
    datePurchased: Date;
}

export type PaypalPayment = {
    emailAddress: string;
    billingId: number;

}

export type CreditCardPayment = {
    firstName: string;
    lastName: string;
    cardNumber: number;
    month: number;
    year: number;
    cvv: number;
    country: string;
    vatNumber: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postCode: string;

}

export const billingInitialState: BillingPageInfos = {
    paypal: null,
    creditCard: null
};
