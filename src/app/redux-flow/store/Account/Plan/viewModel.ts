import { GetAccountBillingInfoOutput, GetProductExtraDataOutput, PostBillingPaymentMethodInput, PostProductExtraDataInput, ProductExtraDataKey, PutPlaybackProtectionInput } from "../../../../../DacastSdk/account";
import { userToken } from "../../../../utils/services/token/tokenService";
import { BillingPageInfos, Extras, PlaybackProtection, Products } from "./types";

export const formatGetBillingInfoOutput = (data: GetAccountBillingInfoOutput): BillingPageInfos => {
    let formattedData: BillingPageInfos = {
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
            addOns: data.currentPlan.subscription && data.currentPlan.subscription.addOns ? data.currentPlan.subscription.addOns.map(addOn => {
                return {
                    code: addOn.code,
                    included: addOn["included-in-subscription"],
                    price: addOn["price-in-cents"] / 100,
                    quantity: addOn.quantity
                }
            }) : [],
            nbSeats: data.currentPlan.maxMuaSeats,
            extraSeats: data.currentPlan.subscription && data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS')["included-in-subscription"] ? data.currentPlan.subscription.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS').quantity : 0
        }
    }
    userToken.updateUserInfo({'planName': data.currentPlan.displayName})
    userToken.updateUserInfo({'planAmount': data.currentPlan.subscription ? data.currentPlan.subscription.price.toString() : '0'})
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