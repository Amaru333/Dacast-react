export enum ActionTypes {
    GET_BILLING_PAGE_INFOS = "@@account_plan/GET_BILLING_PAGE_INFOS",
    SAVE_BILLING_PAGE_PAYMENT_METHOD = "@@account_plan/SAVE_BILLING_PAGE_PAYMENT_METHOD",
    ADD_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/ADD_BILLING_PAGE_PLAYBACK_PROTECTION",
    EDIT_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/EDIT_BILLING_PAGE_PLAYBACK_PROTECTION",
    DELETE_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/DELETE_BILLING_PAGE_PLAYBACK_PROTECTION",
    ADD_BILLING_PAGE_EXTRAS = "@@account_plan/ADD_BILLING_PAGE_EXTRAS",
    GET_PRODUCT_DETAILS = "@@account_plan/GET_PRODUCT_DETAILS"
}


export interface BillingPageInfos {
    paypal?: PaypalPayment;
    creditCard?: CreditCardPayment; 
    playbackProtection?: PlaybackProtection;
    extras?: Extras[];
    products: Products
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

export interface Products {
    bandwidth: BandWidthProduct
}

export interface BandWidthProduct {
    eventBw10to100TB: Product;
    eventBw1to4TB: Product;
    eventBw5to10TB: Product;
}

export interface Product {
    code: string;
    description: string;
    type: string;
    minQuantity: number;
    maxQuantity: number;
    nextProductID: string;
    unitPrice: number;
}

export const planInitialState: BillingPageInfos = {
    paypal: null,
    creditCard: null,
    products: null
};
