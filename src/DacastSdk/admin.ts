export interface PostImpersonateAccountInput {
    userIdentifier: string;
}

export interface PostImpersonateAccountOutput {
    token: string;
    accessToken: string;
    expireAt: number;
}

interface AccountDetailsEndpoint {
    userId: string;
    salesforceId: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    plan: string;
    registeredDate: number;
    data: {
        allocated: number;
        consumed: number;
    };
    storage: {
        allocated: number;
        consumed: number;
    };
    encoding: {
        allocated: number;
        consumed: number;
    };
    isBanned: boolean | null;
    isAdult: boolean | null;
    isTest: boolean | null;
    isPlaybackBlocked: boolean | null;
}

export interface GetAccountsListOutput {
    users: AccountDetailsEndpoint[];
    total: number;
}

export interface GetAccountDetailsOutput {
    accountId: string;
    companyName: string;
    firstName: string;
    lastName: string;
    website: string;
    phone: string;
    email: string;
    isPaying: boolean;
    playbackProtection: {
        enabled: boolean;
        amountGb: number;
    };
    emailVerified: boolean;
    preferredPlatform: string;
    isBanned: boolean;
    isTest: boolean;
    isAdult: boolean;
}

export interface PutAccountDetailsInput {
    companyName?: string;
    firstName?: string;
    lastName?: string;
    website?: string;
    newPassword?: string;
    phone?: string;
    email?: string;
    isPaying?: boolean;
    playbackProtection?: {
        enabled: boolean;
        amountGb: number;
    };
    forceVerifyEmail?: boolean;
    preferredPlatform?: string;
    isBanned?: boolean;
    isTest?: boolean;
    isAdult?: boolean;
}

export interface GetAccountAllowancesOutput {
    data: {
        allocated: number;
        consumed: number;
    };
    storage: {
        allocated: number;
        consumed: number;
    };
    encoding: {
        allocated: number;
        consumed: number;
    };
}

export interface PostAccountAllowancesInput {
    type: 'data' | 'storage' | 'encoding';
    amount: number;
}

interface PlanSettingEndpoint {
    planValue: boolean;
    userValue: boolean | null;
}

export interface GetAccountPlanOutput {
    name: string;
    uploadSize: number;
    itemLimit: number;
    folderDepth: number;
    renditionsPerRecipe: number;
    liveStream: PlanSettingEndpoint;
    compatibleStreams: PlanSettingEndpoint;
    chinaStreams: PlanSettingEndpoint;
    dvr: PlanSettingEndpoint;
    recording: PlanSettingEndpoint;
    vod: PlanSettingEndpoint;
    folders: PlanSettingEndpoint;
    playlists: PlanSettingEndpoint;
    analytics: PlanSettingEndpoint;
    aes: PlanSettingEndpoint;
    signedKeys: PlanSettingEndpoint;
    api: PlanSettingEndpoint;
    webDownload: PlanSettingEndpoint;
    playerDownload: PlanSettingEndpoint;
    paywall: PlanSettingEndpoint;
    advertising: PlanSettingEndpoint;
    emailCatcher: PlanSettingEndpoint;
    admin: PlanSettingEndpoint;
    expo: PlanSettingEndpoint;
}

export interface PutAccountPlanInput {
    privileges: {
        key: string;
        value: number | boolean;
    }[];
}

interface AdminWithdrawalItem {
    id: string;
    accountSalesforceId: string;
    accountId: string;
    amount: number;
    currency: string;
    totalBalance: number;
    requestedDate: number;
    transferDate: number;
    method: string;
    recurlyId: string;
    status: 'pending' | 'cancelled' | 'completed';
}

export interface GetAccountsWithdrawalsOutput {
    withdrawalRequests: AdminWithdrawalItem[];
    total: number;
}

interface AdminPaymentMethodDetailsEndpoint {
    id?: string;
    accountNumber?: string;
    paymentMethodType?: string;
    paymentMethodName?: string;
    payee?: string;
    companyName?: string;
    recipientType?: 'business' | 'personal';
    swift?: string;
    iban?: string;
    routingNumber?: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
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

export interface GetWithdrawalDetailsOutput {
    amount: number;
    currency: string;
    id: string;
    method: string;
    paymentMethod: AdminPaymentMethodDetailsEndpoint;
    requestedDate: number;
    status: string;
    transferDate: number
}

export interface PutWithdrawalDetailsInput {
    status: 'cancelled' | 'completed' | 'pending'
}

interface TransactionLineEndpoint {
    lineType: "arbitrary" | "inplayer",
    amount: number,
    date: number,
    note: string,
    salesforceId: string
    conversionRateToAccountCurency?: number,
    currency?: string,
    fee?: number,
    title?: string,
    transactionType?: string
}

export interface GetAccountsTransactionsOutput {
    lines: TransactionLineEndpoint[];
    balance: number | null;
    total: number;
}

export interface PostAccountTransactionInput {
    amount: number;
    salesforceId: string;
    type: string;
}

export interface GetPirateInfoOutput {
    salesforceId: string;
    userId: string;
    liveChannelId: string;
}