export interface CompanyDetailsEndpoints {
    id: string;
    accountName: string;
    companyName: string;
    contactNumber: string;
    companyEmail: string;
    companyWebsite: string;
    vatNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    state?: string;
    town?: string;
    zipCode?: string;
    country?: string;
}

export type GetCompanyRequestOutput = CompanyDetailsEndpoints & {
    logoURL: string;
}

export interface UserEndpoint {
    userId: string
    firstName: string
    lastName: string
    email: string
    role: string
    invitationId: string
    status: 'active' | 'expired' | 'invited' | 'disabled'
}

export interface GetUsersDetailsOutput {
    users: UserEndpoint[]
    maxSeats: number
    occupiedSeats: number
}

export interface PostUserInput {
    email: string
    isAdmin: boolean
}

export type UserRoleWhitoutOwner = 'creator' | 'admin'

export interface PostUserRoleInput {
    id: string
    payload: {
        role: UserRoleWhitoutOwner
    }
}

export interface DeleteUserInput {
    id: string
    payload: {
        transferContentsToUserId: string
    }
}

export interface UserId {
    id: string
}

interface Invoice {
    id: string;
    date: number;
    total: number;
    status: 'pending' | 'failed' | 'paid';
    downloadLink: string;
    currency: PlanCurrencyEndpoint
}

export interface GetInvoicesOutput {
    invoices: Invoice[];
    page: number;
    perPage: number;
    total: number;
}

export interface ProfileDetails {
    emailAddress: string;
    firstName: string;
    id: string;
    lastName: string;
    lowData: boolean;
    marketing: boolean;
    passwordLastChanged: number | null;
    phoneNumber: string;
    timezone: string;
    videoUpload: boolean;
}

export interface PutProfileDetailsInput {
    firstName: string;
    lastName: string;
    lowData: boolean;
    marketing: boolean;
    phoneNumber: string;
    timezone: string;
    videoUpload: boolean;
}

export interface PostUserPasswordInput {
    currentPassword: string;
    newPassword: string;
    accessToken: string;
}

export type CurrencyKey = 'usd' | 'eur' | 'gbp' | 'aud'

type PriceEndpointStruct = {
    [key in CurrencyKey] : number;
}

interface PrivilegeEndpoint {
    code: string;
    price: PriceEndpointStruct;
}

interface AllowanceEndpoint {
    code: string;
    bandwidth: number;
    storage: number;
}

interface PlanDetails {
    allowanceCode: string;
    allowances: AllowanceEndpoint[];
    code: string;
    commitment: number;
    discount: number;
    isActive: boolean;
    isAvailable: boolean;
    name: 'Annual Starter' | 'Event' | 'Annual Scale' | 'Monthly Scale';
    paymentFrequency: string;
    paymentTerm: number;
    price: PriceEndpointStruct;
    privileges: PrivilegeEndpoint[];
}

export type PlanKey = 'eventPlan' | 'starterPlan' | 'scalePlanAnnual' | 'scalePlanMonthly';

export type GetPlansListOutput = {
    [key in PlanKey]: PlanDetails;
}

interface PrivilegePostEndpoint {
    code: string;
    quantity: number;
}

export type PlanCurrencyEndpoint = 'USD' | 'EUR' | 'GBP' | 'AUD'

export interface PostAccountPlanInput { 
    planCode: string;
    token: string;
    currency: PlanCurrencyEndpoint;
    couponCode: '';
    allowances: string;
    threeDSecureToken: string;
    paidPrivileges: PrivilegePostEndpoint[];
}

export interface PostAccountPlanOutput {
    tokenID: string;
    authenticationRequiredFor: string;
}

export type ProductExtraDataKey = 'eventBw1to4TB' | 'eventBw5to10TB' | 'eventBw10to100TB';

export interface ProductExtraData {
    code: ProductExtraDataKey;
    description: string;
    maxQuantity: number;
    minQuantity: number;
    nextProductID: string;
    type: "BW";
    unitPrice: PriceEndpointStruct;
}

type ProductExtraDataBandwidth = {
    [key in ProductExtraDataKey]: ProductExtraDataKey;
}

export type GetProductExtraDataOutput = {
    products: {
        bandwidth: ProductExtraDataBandwidth;
    }
}

export interface PostProductExtraDataInput {
    code: string;
    quantity: number;
    token: string;
    threeDSecureToken: string;
}

export interface PostProductExtraDataOutput {
    tokenID: string;
}

interface AddOnEndpoint {
    code: string
    'included-in-subscription': boolean
    'price-in-cents': number
    quantity?: number
}

export interface PostPurchaseAddOnInput {
    quantity: number
    addOnCode: string
    preview: boolean
}

export interface PostPurchaseaddOnOutput {
    price: number
}

interface AccountSubscription {
    addOns: AddOnEndpoint[]
    currency: PlanCurrencyEndpoint
    overageStorageUnitPrice: string
    paymentFrequency: string
    paymentTerm: number
    periodEndsAt: number
    periodStartedAt: number
    planCode: string
    planName: string
    price: number
    state: string
}

export interface AccountPlan {
    displayName: string;
    subscription: AccountSubscription
    trialExpiresIn: number | null;
    maxMuaSeats: number
    occupiedMuaSeats: number
}

interface AccountPaymentMethod {
    address: string;
    address2: string;
    cardType: string;
    city: string;
    country: string;
    expiryMonth: string;
    expiryYear: string;
    firstName: string;
    firstSix: string;
    lastFour: string;
    lastName: string;
    type: string;
    billingID: string;
}

interface AccountPlaybackProtection {
    amount: number;
    enabled: boolean;
    price: number;
}

export interface GetAccountBillingInfoOutput {
    currentPlan: AccountPlan;
    paymentMethod: AccountPaymentMethod;
    paywallBalance: number;
    playbackProtection: AccountPlaybackProtection;
}

export interface PostBillingPaymentMethodInput {
    token: string;
    threeDSecureToken?: string;
}

export interface PostBillingPaymentMethodOutput {
    tokenID: string;
}

export interface PutPlaybackProtectionInput {
    enabled: boolean;
    amount: number;
}