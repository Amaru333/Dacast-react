export enum ActionTypes {
    GET_BILLING_PAGE_INFOS = "@@account_plan/GET_BILLING_PAGE_INFOS",
    SAVE_BILLING_PAGE_PAYMENT_METHOD = "@@account_plan/SAVE_BILLING_PAGE_PAYMENT_METHOD",
    ADD_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/ADD_BILLING_PAGE_PLAYBACK_PROTECTION",
    EDIT_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/EDIT_BILLING_PAGE_PLAYBACK_PROTECTION",
    DELETE_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/DELETE_BILLING_PAGE_PLAYBACK_PROTECTION",
    ADD_BILLING_PAGE_EXTRAS = "@@account_plan/ADD_BILLING_PAGE_EXTRAS",
}


export interface BillingPageInfos {
    paypal?: PaypalPayment;
    creditCard?: CreditCardPayment; 
    playbackProtection?: PlaybackProtection;
    extras?: Extras[];
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
    datePurchased?: Date;
}

export interface PaypalPayment {
    emailAddress: string;
    billingId: number;

}

export interface CreditCardPayment {
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

export const planInitialState: BillingPageInfos = {
    paypal: null,
    creditCard: null
};
