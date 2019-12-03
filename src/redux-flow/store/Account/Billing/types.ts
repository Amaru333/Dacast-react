export enum ActionTypes {
    GET_BILLING_PAGE_PAYMENT_METHOD = "@@account_billing/GET_BILLING_PAGE_PAYMENT_METHOD",
    SAVE_BILLING_PAGE_PAYMENT_METHOD = "@@account_billing/SAVE_BILLING_PAGE_PAYMENT_METHOD",
    CREATE_BILLING_PAGE_PAYMENT_METHOD = "@@account_billing/CREATE_BILLING_PAGE_PAYMENT_METHOD",
}


export interface BillingPageInfos {
    userId: string;
    paypal: PaypalPayment;
    creditCard: CreditCardPayment; 
}

export type PaypalPayment = {
    emailAddress: string;
}

export type CreditCardPayment = {
    firstName: string;
    lastName: string;
    cardNumber: number;
    Month: number;
    Year: number;
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
    userId: '',
    paypal: null,
    creditCard: null
};
