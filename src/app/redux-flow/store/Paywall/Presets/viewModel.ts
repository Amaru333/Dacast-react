import { Promo, Preset } from './types'
import { GetPromoPresetOutput, PromoPresetDetails, PromoPreset, GetPricePresetOutput, PricePresetDetails, PricePresetEndpoint, PricePresetId, PromoId } from '../../../../../DacastSdk/paywall'

export const formatGetPromoPresetInput = (qs: string): string => {
    return qs
}

export const formatGetPromoPresetOutput = (data: GetPromoPresetOutput): {promos: Promo[]; totalItems: number} => {
    return {
        totalItems: data.totalItems,
        promos: data.promos.map(promo => {
            return {
                name: promo.name,
                id: promo.id,
                assignedContentIds: promo.preset.assignedContentIds,
                assignedGroupIds: promo.preset.assignedGroupIds,
                discount: promo.preset.discount,
                discountApplied: promo.preset.discountApplied,
                limit: promo.preset.limit,
                startDate: promo.preset.startDate && promo.preset.startDate > Math.floor(Date.now()) / 1000 ? promo.preset.startDate : 0,
                endDate: promo.preset.endDate ? promo.preset.endDate : 0,
                timezone: null
            }
        })
    }
}

export const formatPostPromoPresetInput = (data: Promo): PromoPresetDetails => {
    let formattedData: PromoPresetDetails = {
        name: data.name,
        type: 'voucher',
        preset: {
            discount: data.discount,
            limit: data.limit,
            assignedGroupIds: [] as string[],
            assignedContentIds: [] as string[],
            discountApplied: data.discountApplied.toLowerCase(),
            startDate: Math.floor(data.startDate),
            endDate: Math.floor(data.endDate),
        }

    }
    if (data.startDate === 0) {
        delete formattedData.preset.startDate
    }
    if (data.endDate === 0) {
        delete formattedData.preset.endDate
    }
    return formattedData
}

export const formatPostPromoPresetOutput = (endpointResponse: PromoId, dataReact: Promo): Promo => {
    let formattedData: Promo = {
        ...dataReact,
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutPromoPresetInput = (data: Promo): PromoPreset => {
    let formattedData: PromoPreset = {
        id: data.id,
        type: 'voucher',
        name: data.name,
        preset: {
            discount: data.discount,
            limit: data.limit,
            assignedGroupIds: [] as string[],
            assignedContentIds: [] as string[],
            discountApplied: data.discountApplied.toLowerCase(),
            startDate: Math.floor(data.startDate),
            endDate: Math.floor(data.endDate),
        }
    }
    if (data.startDate === 0) {
        delete formattedData.preset.startDate
    }
    if (data.endDate === 0) {
        delete formattedData.preset.endDate
    }

    return formattedData
}

export const formatDeletePromoPresetInput = (data: Promo): string => data.id

export const formatGetPricePresetInput = (qs: string): string => {
    return qs
}

export const formatGetPricePresetOuput = (data: GetPricePresetOutput): {prices: Preset[], totalItems: number} => {
    let formattedData = {
        totalItems: data.totalItems,
        prices: data.presets.map((preset: PricePresetEndpoint): Preset => {
            return {
                id: preset.id,
                type: preset.type,
                name: preset.name,
                prices: preset.preset.prices,
                settings: {
                    ...preset.preset.settings,
                    timezone: null,
                    duration: preset.preset.settings.duration ? {
                        value: preset.preset.settings.duration.value,
                        unit: preset.preset.settings.duration.unit.charAt(0).toUpperCase() + preset.preset.settings.duration.unit.slice(1) + 's'
                    } 
                    : null,
                    startMethod: preset.preset.settings.startDate && preset.preset.settings.startDate > Math.floor(Date.now() / 1000) ? 'Schedule' : 'Upon Purchase',
                    recurrence: preset.preset.settings.recurrence ? {
                        unit: preset.preset.settings.recurrence.unit === 'week' ? 'Weekly'
                        : preset.preset.settings.recurrence.value > 4 ? 'Biannual'
                        : preset.preset.settings.recurrence.value > 1 ? 'Quarterly'
                        : 'Monthly'
                    } 
                    : null
                },
                priceType: preset.preset.settings.recurrence ? 'Subscription' : 'Pay Per View'

            }
        })
    }

    return formattedData
} 

export const formatPostPricePresetInput = (data: Preset): PricePresetDetails => {
    let formattedData: PricePresetDetails = {
        type: 'price',
        name: data.name,
        preset: null
    }
    if(data.priceType === 'Subscription') {
        formattedData.preset = {
            prices: data.prices.map((p) => {return {...p, description: 'price'}}),
            settings: {
                recurrence: {
                    unit: data.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.unit === 'Quarterly' ? 4 : data.settings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.settings.startMethod === 'Upon Purchase') {
            formattedData.preset = {
                prices: data.prices.map((p) => {return {...p, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    }
                }
            }
        } else {
            formattedData.preset = {
                prices: data.prices.map((p) => {return {...p, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    },
                    startDate: data.settings.startDate
                }
            }
        }
    }
    return formattedData
}

export const formatPostPricePresetOutput = (endpointResponse: PricePresetId, dataReact: Preset): Preset => {
    let formattedData: Preset = {
        ...dataReact,
        settings: {...dataReact.settings, timezone: null},
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutPricePresetInput = (data: Preset): PricePresetEndpoint => {
    let formattedData: PricePresetEndpoint = {
        id: data.id,
        type: 'price',
        name: data.name,
        preset: null
    }
    if(data.priceType === 'Subscription') {
        formattedData.preset = {
            prices: data.prices.map((p) => {return {...p, description: 'price'}}),
            settings: {
                recurrence: {
                    unit: data.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.unit === 'Quarterly' ? 4 : data.settings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.settings.startMethod === 'Upon Purchase') {
            formattedData.preset = {
                prices: data.prices.map((p) => {return {...p, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    }
                }
            }
        } else {
            formattedData.preset = {
                prices: data.prices.map((p) => {return {...p, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    },
                    startDate: data.settings.startDate
                }
            }
        }
    }
    return formattedData
}

export const formatDeletePricePresetInput = (data: Preset): string => data.id
