export enum ActionTypes {
    GET_BILLING_PAGE_INFOS = "@@account_plan/GET_BILLING_PAGE_INFOS",
    SAVE_BILLING_PAGE_PAYMENT_METHOD = "@@account_plan/SAVE_BILLING_PAGE_PAYMENT_METHOD",
    ADD_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/ADD_BILLING_PAGE_PLAYBACK_PROTECTION",
    EDIT_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/EDIT_BILLING_PAGE_PLAYBACK_PROTECTION",
    DELETE_BILLING_PAGE_PLAYBACK_PROTECTION = "@@account_plan/DELETE_BILLING_PAGE_PLAYBACK_PROTECTION",
    GET_PRODUCT_DETAILS = "@@account_plan/GET_PRODUCT_DETAILS",
    PURCHASE_PRODUCTS = "@@account_plan/PURCHASE_PRODUCTS"
}


export interface BillingPageInfos {
    currentPlan: PlanSummary
    paymentMethod?: PaymentDetails
    paywallBalance: number;
    playbackProtection?: PlaybackProtection;
    extras?: Extras[];
    products?: Products
}

export interface PlaybackProtection {
    enabled: boolean;
    amount: number;
    price: number;
}

export interface Extras {
    code: BandwidthProductKey;
    quantity: number;
    totalPrice: number;
    currency: BandwidthProductCurrency;
    datePurchased?: Date;
    token?: string;
    threeDSecureToken?: string
}

export interface PaymentDetails {
    type: string;
    billingID: string;
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
    state?: string;
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
export type BandwidthProductKey = 'eventBw10to100TB' | 'eventBw1to4TB' | 'eventBw5to10TB';

export type BandWidthProduct = {
    [key in BandwidthProductKey]: Product
}

export type BandwidthProductCurrency = 'usd' | 'eur' | 'gbp';

type BandwidthProductPrice = {
    [key in BandwidthProductCurrency]: number
}
export interface Product {
    code: BandwidthProductKey;
    description: string;
    minQuantity: number;
    maxQuantity: number;
    nextProductID: string;
    type: 'BW';
    unitPrice: BandwidthProductPrice;
}

export interface PlanSummary {
    displayName: string;
    planCode: string;
    planName: string;
    state: string;
    playbackProtectionUnitPrice: string;
    periodStartedAt: number;
    periodEndsAt: number;
    trialExpiresIn?: number;
    price: number;
    currency: string;
    paymentFrequency: string;
    paymentTerm: number;
    nbSeats: number;
    extraSeats: number;
}

export const planInitialState: BillingPageInfos = {
    paymentMethod: null,
    products: null,
    paywallBalance: null,
    currentPlan: null
};
