import { GroupPromoData, GroupPromo } from './types'


export const formatGetPromoGroupOuput = (data: GetPromoOutput): GroupPromoData => {
    let formattedData = {
        total: data.totalItems,
        promos: data.promos.map(promo => {
            return {
                startDate: promo.startDate || 0,
                endDate: promo.endDate || 0,
                timezone: null,
                ...promo,
            }
        })
    }

    return formattedData
}

export const formatPostPromoGroupInput = (data: GroupPromo): PostPromoInput => {
    let formattedData = {
        alphanumericCode: data.alphanumericCode,
        discount: data.discount,
        limit: data.limit,
        assignedGroupIds: data.assignedGroupIds,
        assignedContentIds: [] as string[],
        discountApplied: data.discountApplied.toLowerCase(),
        startDate: Math.floor(data.startDate),
        endDate: Math.floor(data.endDate),
    }
    if (data.startDate === 0) {
        delete formattedData.startDate
    }
    if (data.endDate === 0) {
        delete formattedData.endDate
    }
    return formattedData
}

export const formatPutPromoGroupInput = (data: GroupPromo): PutPromoInput => {
    let formattedData = {
        id: data.id,
        alphanumericCode: data.alphanumericCode,
        discount: data.discount,
        limit: data.limit,
        assignedGroupIds: data.assignedGroupIds,
        assignedContentIds: [] as string[],
        discountApplied: data.discountApplied.toLowerCase(),
        startDate: Math.floor(data.startDate),
        endDate: Math.floor(data.endDate),
    }
    if (data.startDate === 0) {
        delete formattedData.startDate
    }
    if (data.endDate === 0) {
        delete formattedData.endDate
    }

    return formattedData
}