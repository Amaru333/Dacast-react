import { Promo } from './types'

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
                startDate: promo.preset.startDate ? promo.preset.startDate : 0,
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