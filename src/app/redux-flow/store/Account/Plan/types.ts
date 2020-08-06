export enum ActionTypes {
    GET_BILLING_PAGE_INFOS = "@@account_plan/GET_BILLING_PAGE_INFOS",
    SAVE_BILLING_PAGE_PAYMENT_METHOD = "@@account_plan/SAVE_BILLING_PAGE_PAYMENT_METHOD",
    ADD_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/ADD_BILLING_PAGE_PLAYBACK_PROTECTION",
    EDIT_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/EDIT_BILLING_PAGE_PLAYBACK_PROTECTION",
    DELETE_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/DELETE_BILLING_PAGE_PLAYBACK_PROTECTION",
    ADD_BILLING_PAGE_EXTRAS = "@@account_plan/ADD_BILLING_PAGE_EXTRAS",
    GET_PRODUCT_DETAILS = "@@account_plan/GET_PRODUCT_DETAILS",
    PURCHASE_PRODUCTS = "@@account_plan/PURCHASE_PRODUCTS"
}


export interface BillingPageInfos {
    currentPlan: PlanSummary
    paymentMethod?: PaymentDetails
    paywallBalance: number;
    playbackProtection?: PlaybackProtection;
    extras?: Extras[];
    products: Products
}

export interface PlaybackProtection {
    enabled: boolean;
    amount: number;
    price: number;
}

export interface Extras {
    code: string;
    quantity: string;
    price?: string;
    datePurchased?: Date;
}

export interface PaymentDetails {
    type: string;
    address?: string;
    address2?: string;
    cardType?: string;
    country?: string;
    city?: string;
    expiryMonth?: string;
    expiryYear?: string;
    firstName?: string;
    lastName?: string;
    firstSix?: string;
    lastFour?: string;
    billingID: string;
    email?: string;
    postCode?: string;
}

export const DefaultPaymentDetails: PaymentDetails = {
    type: 'card',
    billingID: 'default',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postCode: '',
    country: ''
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

export interface PlanSummary {
    displayName: string;
    planCode: string;
    planName: string;
    state: string;
    overageStorageUnitPrice: string;
    playbackProtectionUnitPrice: string;
    periodStartedAt: number;
    periodEndsAt: number;
    price: number;
    currency: string;
    paymentFrequency: string;
    paymentTerm: number
}

export const planInitialState: BillingPageInfos = {
    paymentMethod: null,
    products: null,
    paywallBalance: null,
    currentPlan: null
};
