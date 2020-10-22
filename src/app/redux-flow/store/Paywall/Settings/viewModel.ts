import { PaywallSettingsInfos } from './types';
import { PaywallSettings } from '../../../../../DacastSdk/paywall';

export const formatGetPaywallSettingsOutput = (data: PaywallSettings): PaywallSettingsInfos => {
    let formattedData: PaywallSettingsInfos = {
        ...data,
        paypalTC: data.paypalPurchases,
    }

    return  formattedData
}

export const formatPutPaywallSettingsInput = (data: PaywallSettings): PaywallSettings => {
    let formattedData: PaywallSettings = {
        bankStatement: data.bankStatement,
        creditCardPurchases: data.creditCardPurchases,
        customUrl: data.customUrl,
        paypalPurchases: data.paypalPurchases
    }

    return formattedData
}