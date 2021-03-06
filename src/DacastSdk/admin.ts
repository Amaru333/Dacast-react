import { PostLoginOuput } from "./session";

export interface PostImpersonateAccountInput {
    userIdentifier?: string;
    selectedUserId?: string;
    loginToken?: string;
}

export type PostImpersonateAccountOutput = PostLoginOuput

interface AccountDetailsEndpoint {
    userId: string;
    salesforceId: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
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
    country: string;
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
    migration: {
        legacyUserId: string | null;
        originPlatform: string | null;
        status: string | null;
    }
}

export interface PutAccountDetailsInput {
    companyName?: string;
    firstName?: string;
    lastName?: string;
    website?: string;
    newPassword?: string;
    phone?: string;
    email?: string;
    country?: string;
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
    expiresAt: number;
    uploadSize: number;
    itemLimit: number;
    folderDepth: number;
    renditionsPerRecipe: number;
    maxSeats: number;
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
    aesBeta: PlanSettingEndpoint;
    signedKeys: PlanSettingEndpoint;
    api: PlanSettingEndpoint;
    apiBeta: PlanSettingEndpoint;
    webDownload: PlanSettingEndpoint;
    paywall: PlanSettingEndpoint;
    advertising: PlanSettingEndpoint;
    emailCatcher: PlanSettingEndpoint;
    admin: PlanSettingEndpoint;
    expo: PlanSettingEndpoint;
    ultraSecureChannel: PlanSettingEndpoint;
    phoneSupport: PlanSettingEndpoint;
    multiUserAccess: PlanSettingEndpoint;
    multiUserAccessBeta: PlanSettingEndpoint;
    paymentRequest: PlanSettingEndpoint;
    unsecureVod: PlanSettingEndpoint;
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
    accountType?: 'checking' |??'savings'
}

export interface GetWithdrawalDetailsOutput {
    amount: number;
    currency: string;
    id: string;
    method: string;
    paymentMethod: AdminPaymentMethodDetailsEndpoint;
    requestedDate: number;
    status: string;
    transferDate: number;
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

export interface JobInfoEndpoint {
    id: string
    platform: string
    lastUpdateDate: string
    currentStep: string
    errorDetails: string
    userIds: string[]
}

export interface GetJobsListOutput {
    jobs: JobInfoEndpoint[]
}

export interface GetMigrationJobDetailsOutput {
    currentStep: string
    previousStep: string
    errorDetails: string
    export: {
        status: string
        errorDetails: string
    }
    import: {
        status: string
        errorDetails: string
        reports: {
            userId: string
            errorDetails: string
            success: boolean
        }[]
    }
    importVerification: {
        status: string
        errorDetails: string
        reports?: {
            userId: string
            errorDetails: string
            success: boolean
        }[]
    }
    switchover: {
        status: string
        errorDetails: string
        reports: {
            userId: string
            errorDetails: string
            success: boolean
        }[]
    }
    exportVerification: {
        status: string
        errorDetails: string
        reports: {
            userId: string
            errorDetails: string
            success: boolean
        }[]
    }
}

export interface PostStartMigrationJobInput {
    platform: 'dacast' | 'vzaar'
    userIds: string[]
    enableDifferential: boolean
}

export interface PostSwitchOverUsersInput {
    onlyUserIds: string[]
}

export interface MigratedUserEndpoint {
    legacyUserId: string
    salesforceId: string
    platform: string
    lastUpdateDate: string
    migrationStatus: string
    uappUserId: string
}

export interface GetMigratedUsersListOutput {
    users: MigratedUserEndpoint[]
    next: string
}

export interface PutExtendTrialInput {
    userId: string
    payload: {
        newExpirationDate: number
    }
}
