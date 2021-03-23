import { GetAccountPlanOutput, PutAccountPlanInput, PutExtendTrialInput } from "../../../../../DacastSdk/admin"
import { PlanInfo, PlanInfoPut } from "./types"

export const formatGetAccountPlanInput = (data: string): string => data
export const formatGetAccountPlanOutput = (data: GetAccountPlanOutput): PlanInfo => {
    let formattedData: PlanInfo = {
        ...data,
        expiresAt: data.expiresAt ? new Date(data.expiresAt * 1000).toISOString().replace('T', ' T') : ''
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