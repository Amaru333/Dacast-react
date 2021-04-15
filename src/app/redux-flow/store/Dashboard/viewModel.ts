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
            addOns: data.currentPlan.subscription.addOns.map(addOn => {
                return {
                    code: addOn.code,
                    included: addOn["included-in-subscription"],
                    price: addOn["price-in-cents"] / 100,
                    quantity: addOn.quantity
                }
            }),
            nbSeats: data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_SEATS').quantity,
            extraSeats: data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS')["included-in-subscription"] ? data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS').quantity : 0
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
            planCode: data.currentPlan.subscription ? data.currentPlan.subscription.planCode : '',
            planName: data.currentPlan.subscription ? data.currentPlan.subscription.planName : '',
            state: data.currentPlan.subscription ? data.currentPlan.subscription.state : '',
            playbackProtectionUnitPrice: data.currentPlan.subscription ? data.currentPlan.subscription.overageStorageUnitPrice: '',
            periodStartedAt: data.currentPlan.subscription ? data.currentPlan.subscription.periodStartedAt : null,
            periodEndsAt: data.currentPlan.subscription ? data.currentPlan.subscription.periodEndsAt : null,
            trialExpiresIn: data.currentPlan.trialExpiresIn,
            price: data.currentPlan.subscription ? data.currentPlan.subscription.price : null,
            currency: data.currentPlan.subscription ? data.currentPlan.subscription.currency : '',
            paymentFrequency: data.currentPlan.subscription ? data.currentPlan.subscription.paymentFrequency : null,
            paymentTerm: data.currentPlan.subscription ? data.currentPlan.subscription.paymentTerm : null,
            addOns:  data.currentPlan.subscription ? data.currentPlan.subscription.addOns.map(addOn => {
                return {
                    code: addOn.code,
                    included: addOn["included-in-subscription"],
                    price: addOn["price-in-cents"] / 100,
                    quantity: addOn.quantity
                }
            }) : [],
            nbSeats: data.currentPlan.maxMuaSeats,
            extraSeats: data.currentPlan.subscription && data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS')["included-in-subscription"] ? data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS').quantity : 0
        },
    }

    return formattedData
}

export const formatGetDashboardLiveOutput = (data: GetDashboardLiveOutput): DashboardLive => data.live

export const formatGetDashboardVodOutput = (data: GetDashboardVodOutput): DashboardVod => data.vod

export const formatGetDashboardPaywallOutput = (data: GetDashboardPaywallOutput): DashboardPaywall => data.paywall

