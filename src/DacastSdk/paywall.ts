interface PromoDetails {
    alphanumericCode: string;
    discount: number;
    limit: number;
    startDate?: number;
    endDate?: number;
    discountApplied: string;
    assignedContentIds: string[];
    assignedGroupIds: string[];
}

interface PromoId {
    id: string
}

type Promo = PromoDetails & PromoId

interface GetPromoOutput {
    promos: Promo[];
    totalItems: number
}


interface Price {
    value: number;
    currency: string;
    description: string;
}

interface PriceSettings {
    duration?: {
        value: number; 
        unit: string
    };
    recurrence?: {
        unit: string; 
        value?: number
    };
    startDate?: number;
}

interface PricePackageInfo {
    price: Price;
    settings: PriceSettings;
}

interface PricePackageDetails {
    name: string;
    prices: PricePackageInfo[]
    contents: string[];
}

interface PricePackageId {
    id: string;
}

type PricePackage = PricePackageDetails & PricePackageId

interface GetPricePackageOutput {
    packages: PricePackage[];
    total: number;
}

interface PostPricePackageOutput {
    id: string;
}

interface PostPricePackageInput {
    name: string;
    prices: Price[];
    settings: PriceSettings;
    contents: string[];
}

type PutPricePackageInput = PostPricePackageInput & PricePackageId

interface PaymentMethodId {
    id: string
}

interface BankAccountUSDetails {
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

type BankAccountUS = BankAccountUSDetails & PaymentMethodId

interface BankAccountInternationalDetails {
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

type BankAccountInternational = BankAccountInternationalDetails & PaymentMethodId

interface CheckDetails {
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

type Check = CheckDetails & PaymentMethodId

interface PaypalDetails {
    paymentMethodType: 'paypal';
    paymentMethodName: string;
    emailAddress: string;
    comments?: string;
}

type Paypal = PaypalDetails & PaymentMethodId

type PaymentMethod = BankAccountUS | BankAccountInternational | Check | Paypal

function isBankAccountMethod(paymentMethod: PaymentMethod): paymentMethod is BankAccountUS | BankAccountInternational {
    //@ts-ignore
    return !!paymentMethod['recipientType']
}

type PaymentMethodDetails = BankAccountUSDetails | BankAccountInternationalDetails | CheckDetails| PaypalDetails

interface GetPaymentMethodOutput {
    paymentMethods: PaymentMethod[];
}
