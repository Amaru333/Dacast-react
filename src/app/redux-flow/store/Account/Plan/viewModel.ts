import { GetAccountBillingInfoOutput, GetProductExtraDataOutput, PostBillingPaymentMethodInput, PostProductExtraDataInput, ProductExtraDataKey } from "../../../../../DacastSdk/account";
import { BillingPageInfos, Extras, Products } from "./types";

export const formatGetBillingInfoOutput = (data: GetAccountBillingInfoOutput): BillingPageInfos => {
    let formattedData: BillingPageInfos = {
        ...data,
        currentPlan: {
            displayName: data.currentPlan.displayName,
            planCode: data.currentPlan.planCode,
            planName: data.currentPlan.planName,
            state: data.currentPlan.state,
            playbackProtectionUnitPrice: data.currentPlan.overageStorageUnitPrice,
            periodStartedAt: data.currentPlan.periodStartedAt,
            periodEndsAt: data.currentPlan.periodEndsAt,
            trialExpiresIn: data.currentPlan.trialExpiresIn,
            price: data.currentPlan.price,
            currency: data.currentPlan.currency,
            paymentFrequency: data.currentPlan.paymentFrequency,
            paymentTerm: data.currentPlan.paymentTerm
        }
    }

    return formattedData
}

export const formatPostBillingPaymentMethod = (data: string): PostBillingPaymentMethodInput => {
    let formattedData: PostBillingPaymentMethodInput = {
        token: data
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