import { GetAccountBillingInfoOutput, GetProductExtraDataOutput, PostBillingPaymentMethodInput, PostProductExtraDataInput, ProductExtraDataKey, PutPlaybackProtectionInput } from "../../../../../DacastSdk/account";
import { userToken } from "../../../../utils/services/token/tokenService";
import { BillingPageInfos, Extras, PlaybackProtection, Products } from "./types";

export const formatGetBillingInfoOutput = (data: GetAccountBillingInfoOutput): BillingPageInfos => {
    let formattedData: BillingPageInfos = {
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
        }
    }
    userToken.updateUserInfo({'planName': data.currentPlan.displayName})
    userToken.updateUserInfo({'planAmount': data.currentPlan.subscription.price.toString()})
    return formattedData
}

export const formatPostBillingPaymentMethod = (data: {token: string, threeDSToken?: string}): PostBillingPaymentMethodInput => {
    let formattedData: PostBillingPaymentMethodInput = {
        token: data.token
    }
    if(data.threeDSToken) {
        formattedData.threeDSecureToken = data.threeDSToken
    }
    return formattedData
}

export const formatGetProductExtraDataListOutput = (data: GetProductExtraDataOutput): Products => {
    let formattedData: Products = {
        bandwidth: Object.keys(data.products.bandwidth).reduce((acc, next: ProductExtraDataKey) => {
            return {
                ...acc, 
                [next]: data.products.bandwidth[next]
            }
        }, {eventBw10to100TB: null, eventBw1to4TB: null, eventBw5to10TB: null})
    }

    return formattedData
}

export const formatPostProductExtraInput = (data: Extras): PostProductExtraDataInput => {
    let formattedData: PostProductExtraDataInput = {
        code: data.code,
        quantity: data.quantity,
        token: data.token,
        threeDSecureToken: data.threeDSecureToken
    }

    return formattedData
}

export const formatPutPlaybackProtectionInput = (data: PlaybackProtection): PutPlaybackProtectionInput => {
    let formattedData: PutPlaybackProtectionInput = {
        amount: data.amount,
        enabled: data.enabled
    }
    return formattedData
}