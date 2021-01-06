import { GetAccountDetailsOutput, PutAccountDetailsInput } from "../../../../../DacastSdk/admin";
import { AccountInfo, PutAccountInfo } from "./types";

export const formatGetAccountDetailsInput = (data: string): string => data
export const formatGetAccountDetailsOutput = (data: GetAccountDetailsOutput): AccountInfo => {
    let formattedData: AccountInfo = {
        accountId: data.accountId,
        companyName: data.companyName,
        firstName: data.firstName,
        lastName: data.lastName,
        website: data.website,
        phone: data.phone,
        email: data.email,
        isPaying: data.isPaying,
        playbackProtection: data.playbackProtection,
        emailVerified: data.emailVerified,
        preferredPlatform: data.preferredPlatform,
        isBanned: data.isBanned,
        isTest: data.isTest,
        isAdult: data.isAdult,
        migration: data.migration.legacyUserId ? data.migration : null
    }

    return formattedData
}

export const formatPutAccountDetailsInput = (data: PutAccountInfo): PutAccountDetailsInput => data