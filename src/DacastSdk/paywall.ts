export interface PromoDetails {
    alphanumericCode: string;
    discount: number;
    limit: number;
    startDate?: number;
    endDate?: number;
    discountApplied: string;
    assignedContentIds: string[];
    assignedGroupIds: string[];
}

export interface PromoId {
    id: string
}

export type PromoEndpoints = PromoDetails & PromoId


export interface PromoPresetDetails {
    name: string;
    type: 'voucher';
    preset: {
        discount: number;
        limit: number;
        startDate?: number;
        endDate?: number;
        discountApplied: string;
        assignedContentIds: string[];
        assignedGroupIds: string[];
    };
}

export type PromoPreset = PromoPresetDetails & PromoId

export interface GetPromoPresetOutput {
    promos: PromoPreset[];
    totalItems: number
}

export interface GetPromoOutput {
    promos: PromoEndpoints[];
    totalItems: number
}


export interface PriceEndpoints {
    value: number;
    currency: string;
    description: string;
}

export interface PriceSettingsEndpoints {
    duration?: {
        value: number; 
        unit: string;
    }
    recurrence?: {
        unit: string; 
        value?: number
    }
    startDate?: number;
}

export interface PricePresetDetails {
    name: string;
    type: 'price';
    preset: {
        prices: PriceEndpoints[];
        settings: PriceSettingsEndpoints;
    }
}

export interface PricePresetId {
    id: string;
}

export type PricePresetEndpoint = PricePresetDetails & PricePresetId

export interface GetPricePresetOutput {
    presets: PricePresetEndpoint[]
    totalItems: number;
}

export interface PricePackageInfo {
    price: PriceEndpoints;
    settings: PriceSettingsEndpoints;
}

export interface PricePackageDetails {
    name: string;
    prices: PricePackageInfo[]
    contents: string[];
}

export interface PricePackageId {
    id: string;
}

export type PricePackage = PricePackageDetails & PricePackageId

export interface GetPricePackageOutput {
    packages: PricePackage[];
    total: number;
}

export interface PostPricePackageOutput {
    id: string;
}

export interface PostPricePackageInput {
    name: string;
    prices: PriceEndpoints[];
    settings: PriceSettingsEndpoints;
    contents: string[];
}

export type PutPricePackageInput = PostPricePackageInput & PricePackageId

export interface PaymentMethodId {
    id: string
}

export interface BankAccountUSDetails {
    paymentMethodType: 'us-transfer';
    paymentMethodName: string;
    recipientType: 'business' | 'personal';
    accountNumber: string;
    routingNumber: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
    address: string;
    address2?: string;
    state: string;
    town: string;
    zipCode: string;
    bankName: string;
    bankAddress: string;
    bankAddress2?: string;
    bankState: string;
    bankTown: string;
    bankZipCode: string;
}

export type BankAccountUS = BankAccountUSDetails & PaymentMethodId

export interface BankAccountInternationalDetails {
    paymentMethodType: 'international-transfer';
    paymentMethodName: string;
    recipientType: 'business' | 'personal';
    swift: string;
    iban: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
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

export type BankAccountInternational = BankAccountInternationalDetails & PaymentMethodId

export interface CheckDetails {
    paymentMethodType: 'check';
    paymentMethodName: string;
    payee: string;
    companyName: string;
    address: string;
    address2?: string;
    state: string;
    town: string;
    zipCode: string;
    country: string;
}

export type Check = CheckDetails & PaymentMethodId

export interface PaypalDetails {
    paymentMethodType: 'paypal';
    paymentMethodName: string;
    emailAddress: string;
    comments?: string;
}

export type Paypal = PaypalDetails & PaymentMethodId

export type PaymentMethodEndpoints = BankAccountUS | BankAccountInternational | Check | Paypal

export function isBankAccountMethod(paymentMethod: PaymentMethodEndpoints): paymentMethod is BankAccountUS | BankAccountInternational {
    //@ts-ignore
    return !!paymentMethod['recipientType']
}

export type PaymentMethodDetails = BankAccountUSDetails | BankAccountInternationalDetails | CheckDetails| PaypalDetails

export interface GetPaymentMethodOutput {
    paymentMethods: PaymentMethodEndpoints[];
}

export interface PaymentRequestId {
    id: string;
}
export interface PaymentRequestDetails {
    paymentMethodId: string;
    currency: string;
    amount: number;
    requestDate: number;
    transferDate: number;
    status: 'completed' | 'cancelled' | 'pending';
}

export type PaymentRequestEndpoints = PaymentRequestDetails & PaymentRequestId

export interface GetPaymentRequestOutput {
    withdrawals: PaymentRequestEndpoints[];
}

export interface PostPaymentRequestInput {
    paymentMethodId: string;
    currency: string;
    amount: number;
    requestDate: number;
    transferDate: number;
}

export interface PaywallSettings {
    bankStatement: string;
    creditCardPurchases: boolean;
    customUrl: string;
    paypalPurchases: boolean;
}

export interface PaywallThemeDetails {
    name: string;
    isDefault: boolean;
    splashScreen: {
        buttonColor: string;
        buttonTextColor: string;
    };
    loginScreen: {
        buttonColor: string;
        primaryColor: string;
        headerColor: string;
        hasCompanyLogo: boolean;
    };
}

export interface PaywallThemeId {
    id: string
}

export type PaywallThemeEndpoints = PaywallThemeDetails & PaywallThemeId

export interface GetPaywallThemesOutput {
    themes: PaywallThemeEndpoints[]
}

export interface ExternalTransaction {
    id: string;
    type: string;
    contentName: string;
    date: string;
    purchaser: string;
    currency: string;
    note: string;
    price: number;
    dacastFee: number;
    actionType: string;
    timestamp: number;
    dacastConversionRateToAccountCurrency: number;
}

export interface InternalTransaction {
    timestamp: number;
    decimalValue: number;
    note: string;
}

export type PaywallTransaction = ExternalTransaction & InternalTransaction

export interface GetPaywallTransactionsOutput {
    page: number;
    perPage: number;
    total: number;
    transactionsList: PaywallTransaction[]
}