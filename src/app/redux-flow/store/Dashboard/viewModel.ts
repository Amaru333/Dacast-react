import { GetDashboardGeneralInfoOutput, GetDashboardInfoOutput, GetDashboardLiveOutput, GetDashboardPaywallOutput, GetDashboardVodOutput } from "../../../../DacastSdk/dashboard";
import { DashboardGeneralInfo, DashboardInfos, DashboardLive, DashboardPaywall, DashboardVod } from "./types";

export const formatGetDashboardInfoOutput = (data: GetDashboardInfoOutput): DashboardInfos =>  {
    let formattedData: DashboardInfos = {
        ...data,
        currentPlan: {
            ...data.currentPlan,
            periodEndsAt: data.currentPlan.periodEndsAt ? data.currentPlan.periodEndsAt : null,
            periodStartedAt: data.currentPlan.periodStartedAt ? data.currentPlan.periodStartedAt : null,
            playbackProtectionUnitPrice: data.currentPlan.overageStorageUnitPrice ? data.currentPlan.overageStorageUnitPrice : null
        },
        isTrial: false,
        isPayingPlan: false
    }

    return formattedData
}

export const formatGetDashboardGeneralInfoOutput = (data: GetDashboardGeneralInfoOutput): DashboardGeneralInfo => {
    let formattedData: DashboardGeneralInfo = {
        ...data,
        currentPlan: {
            ...data.currentPlan,
            periodEndsAt: data.currentPlan.periodEndsAt ? data.currentPlan.periodEndsAt : null,
            periodStartedAt: data.currentPlan.periodStartedAt ? data.currentPlan.periodStartedAt : null,
            playbackProtectionUnitPrice: data.currentPlan.overageStorageUnitPrice ? data.currentPlan.overageStorageUnitPrice : null
        },
    }

    return formattedData
}

export const formatGetDashboardLiveOutput = (data: GetDashboardLiveOutput): DashboardLive => data.live

export const formatGetDashboardVodOutput = (data: GetDashboardVodOutput): DashboardVod => data.vod

export const formatGetDashboardPaywallOutput = (data: GetDashboardPaywallOutput): DashboardPaywall => data.paywall

