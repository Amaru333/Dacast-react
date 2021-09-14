import { GetAccountPlanOutput, PutAccountPlanInput, PutExtendTrialInput } from "../../../../../DacastSdk/admin"
import { PlanInfo, PlanInfoPut } from "./types"

export const formatGetAccountPlanInput = (data: string): string => data
export const formatGetAccountPlanOutput = (data: GetAccountPlanOutput): PlanInfo => {
    let formattedData: PlanInfo = {
        name: data.name,
        uploadSize: data.uploadSize,
        itemLimit: data.itemLimit,
        folderDepth: data.folderDepth,
        renditionsPerRecipe: data.renditionsPerRecipe,
        maxSeats: data.maxSeats,
        liveStream: data.liveStream,
        compatibleStreams: data.compatibleStreams,
        chinaStreams: data.chinaStreams,
        dvr: data.dvr,
        recording: data.recording,
        vod: data.vod,
        folders: data.folders,
        playlists: data.playlists,
        analytics: data.analytics,
        aes: data.aes,
        aesBeta: data.aesBeta,
        signedKeys: data.signedKeys,
        api: data.api,
        apiBeta: data.apiBeta,
        webDownload: data.webDownload,
        paywall: data.paywall,
        advertising: data.advertising,
        emailCatcher: data.emailCatcher,
        admin: data.admin,
        expo: data.expo,
        ultraSecureChannel: data.ultraSecureChannel,
        phoneSupport: data.phoneSupport,
        paymentRequest: data.paymentRequest,
        unsecureVod: data.unsecureVod,
        advancedStreaming: data.advancedStreaming,
        expiresAt: data.expiresAt ? new Date(data.expiresAt * 1000).toISOString().replace('T', ' T') : '',
        multiUserAccess: data.multiUserAccess ? data.multiUserAccess : {
            planValue: false,
            userValue: null
        },
        multiUserAccessBeta: data.multiUserAccessBeta ? data.multiUserAccessBeta : {
            planValue: false,
            userValue: null
        },
    }

    return formattedData
}
export const formatPutAccountPlanInput = (data: PlanInfoPut): PutAccountPlanInput => data

export const formatPutExtendTrialInput = (data: {userId: string; newExpirationDate: number}): PutExtendTrialInput => {
    let formattedData: PutExtendTrialInput = {
        userId: data.userId,
        payload: {
            newExpirationDate: data.newExpirationDate
        }
    }

    return formattedData
}

export const formatPutExtendTrialOutput = (endpointResponse: null, data: {userId: string; newExpirationDate: number}): string => {
    let formattedData: string = new Date(data.newExpirationDate * 1000).toISOString().replace('T', ' T')
    return formattedData
}
