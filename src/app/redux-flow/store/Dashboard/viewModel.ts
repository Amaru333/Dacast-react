import { GetDashboardGeneralInfoOutput, GetDashboardInfoOutput, GetDashboardLiveOutput, GetDashboardPaywallOutput, GetDashboardVodOutput } from "../../../../DacastSdk/dashboard";
import { DashboardGeneralInfo, DashboardInfos, DashboardLive, DashboardPaywall, DashboardVod } from "./types";

export const formatGetDashboardInfoOutput = (data: GetDashboardInfoOutput): DashboardInfos =>  {
    let formattedData: DashboardInfos = {
        ...data,
        currentPlan: {
            displayName: data.currentPlan.displayName,
            planCode: data.currentPlan.subscription.planCode,
            planName: data.currentPlan.subscription.planName,
            state: data.currentPlan.subscription.state,
            playbackProtectionUnitPrice: data.currentPlan.subscription.overageStorageUnitPrice,
            periodStartedAt: data.currentPlan.subscription.periodStartedAt,
            periodEndsAt: data.currentPlan.subscription.periodEndsAt,
            trialExpiresIn: data.currentPlan.trialExpiresIn,
            price: data.currentPlan.subscription.price,
            currency: data.currentPlan.subscription.currency,
            paymentFrequency: data.currentPlan.subscription.paymentFrequency,
            paymentTerm: data.currentPlan.subscription.paymentTerm,
            nbSeats: data.currentPlan.displayName.indexOf('Scale') !== -1 ? 3 : 1,
            extraSeats: 2
        },
        isTrial: false,
        isPayingPlan: false
    }
    console.log('returning data ', formattedData)

    return formattedData
}

export const formatGetDashboardGeneralInfoOutput = (data: GetDashboardGeneralInfoOutput): DashboardGeneralInfo => {
    let formattedData: DashboardGeneralInfo = {
        ...data,
        currentPlan: {
            displayName: data.currentPlan.displayName,
            planCode: data.currentPlan.subscription.planCode,
            planName: data.currentPlan.subscription.planName,
            state: data.currentPlan.subscription.state,
            playbackProtectionUnitPrice: data.currentPlan.subscription.overageStorageUnitPrice,
            periodStartedAt: data.currentPlan.subscription.periodStartedAt,
            periodEndsAt: data.currentPlan.subscription.periodEndsAt,
            trialExpiresIn: data.currentPlan.trialExpiresIn,
            price: data.currentPlan.subscription.price,
            currency: data.currentPlan.subscription.currency,
            paymentFrequency: data.currentPlan.subscription.paymentFrequency,
            paymentTerm: data.currentPlan.subscription.paymentTerm,
            nbSeats: data.currentPlan.displayName.indexOf('Scale') !== -1 ? 3 : 1,
            extraSeats: 2
        },
    }

    return formattedData
}

export const formatGetDashboardLiveOutput = (data: GetDashboardLiveOutput): DashboardLive => data.live

export const formatGetDashboardVodOutput = (data: GetDashboardVodOutput): DashboardVod => data.vod

export const formatGetDashboardPaywallOutput = (data: GetDashboardPaywallOutput): DashboardPaywall => data.paywall

