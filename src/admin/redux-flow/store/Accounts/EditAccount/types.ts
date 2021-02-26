export enum ActionTypes {
    GET_ACCOUNT_INFO = "@@admin_accounts/GET_ACCOUNT_INFO",
    SAVE_ACCOUNT_INFO = "@@admin_accounts/SAVE_ACCOUNT_INFO"
}

interface MigrationInfo {
    legacyUserId: string;
    originPlatform: string | null;
    status: string | null;
}

export interface AccountInfo {
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
    migration: MigrationInfo | null;
}

export interface PutAccountInfo {
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

export const editAccountDefaultState: AccountInfo = null;

