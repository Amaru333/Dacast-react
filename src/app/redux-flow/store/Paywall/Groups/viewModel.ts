import { GroupPromoData, GroupPromo, GroupPriceData, GroupPrice, GroupPriceContents } from './types'
import { capitalizeFirstLetter } from '../../../../../utils/utils'
import { userToken } from '../../../../utils/services/token/tokenService'
import { PromoId, GetPromoOutput, PromoDetails, PromoEndpoints, GetPricePackageOutput, PostPricePackageInput, PricePackageId, PutPricePackageInput, GetPricePackageContentsOutput } from '../../../../../DacastSdk/paywall'


export const formatGetPromoGroupOutput = (data: GetPromoOutput): GroupPromoData => {
    let formattedData: GroupPromoData = {
        total: data.totalItems,
        promos: data.promos.map(promo => {
            return {
                startDate: promo.startDate && promo.startDate > Math.floor(Date.now()) ? promo.startDate : 0,
                endDate: promo.endDate && promo.endDate > Math.floor(Date.now()) ? promo.endDate : 0,
                timezone: null,
                ...promo,
            }
        })
    }

    return formattedData
}

export const formatPostPromoGroupInput = (data: GroupPromo): PromoDetails => {
    let formattedData: PromoDetails = {
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

export const formatPostPromoGroupOutput = (endpointResponse: PromoId, dataReact: GroupPromo): GroupPromo => {
    let formattedData: GroupPromo = {
        ...dataReact,
        timezone: null,
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutPromoGroupInput = (data: GroupPromo): PromoEndpoints => {
    let formattedData: PromoEndpoints = {
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

export const formatDeletePromoGroupInput = (data: GroupPromo): string => data.id


export const formatGetPriceGroupOuput = (data: GetPricePackageOutput): GroupPriceData => {
    let formattedData: GroupPriceData = {
        total: data.total,
        packages: data.packages.map((item) => {
            return {
                id: item.id,
                name: item.name,
                contents: item.contents,
                pages: item.pages,
                prices: item.prices.length > 0 ? item.prices.map((price) => {
                    return {
                        price: price.price,
                        settings: {
                            ...price.settings,
                            duration: price.settings.duration ? {
                                value: price.settings.duration.value,
                                unit: capitalizeFirstLetter(price.settings.duration.unit) + 's'
                            }
                            : null,
                            type: price.settings.recurrence ? 'Subscription' : 'Pay Per View',
                            startMethod: price.settings.startDate > Math.round(Date.now() / 1000) ? 'Schedule' : 'Upon Purchase',
                            recurrence: price.settings.recurrence ? {
                                unit: price.settings.recurrence.unit === 'week' ? 'Weekly'
                                : price.settings.recurrence.value > 4 ? 'Biannual'
                                : price.settings.recurrence.value > 1 ? 'Quarterly'
                                : 'Monthly'
                            }
                            : null
                        }
                    }
                }) : [],
                groupSettings: item.prices.length > 0 ? {
                    ...item.prices[0].settings,
                    duration: item.prices[0].settings.duration ? {
                        value: item.prices[0].settings.duration.value,
                        unit: capitalizeFirstLetter(item.prices[0].settings.duration.unit) + 's'
                    }
                    : null,
                    type: item.prices[0].settings.recurrence ? 'Subscription' : 'Pay Per View',
                    startMethod: item.prices[0].settings.startDate > Math.round(Date.now() / 1000) ? 'Schedule' : 'Upon Purchase',
                    recurrence: item.prices[0].settings.recurrence ? {
                        unit: item.prices[0].settings.recurrence.unit === 'week' ? 'Weekly'
                        : item.prices[0].settings.recurrence.value > 4 ? 'Biannual'
                        : item.prices[0].settings.recurrence.value > 1 ? 'Quarterly'
                        : 'Monthly'
                    }
                    : null
                }: null
            }
        })
    }

    return formattedData
}

export const formatPostPriceGroupInput = (data: GroupPrice): PostPricePackageInput => {

    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')

    let formattedPrice: PostPricePackageInput = null
    if(data.groupSettings.type === 'Subscription') {
        formattedPrice = {
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'price'}}),
            settings: {
                recurrence: {
                    unit: data.groupSettings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.unit === 'Quarterly' ? 4 : data.groupSettings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => accountId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

        }
    } else {
        if(data.groupSettings.startMethod === 'Upon Purchase') {
            formattedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    }
                },
                contents: data.contents.map((content: any) => accountId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

            }
        } else {
            formattedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    },
                    startDate: data.groupSettings.startDate
                },
                contents: data.contents.map((content: any) => accountId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)
            }
        }
    }

    return formattedPrice
}

export const formatPostPriceGroupOutput = (endpointResponse: PricePackageId, dataReact: GroupPrice): GroupPrice => {
    let formattedData: GroupPrice = {
        ...dataReact,
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutPriceGroupInput = (data: GroupPrice): PutPricePackageInput => {
    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    let formattedPrice: PutPricePackageInput = null
    if(data.groupSettings.type === 'Subscription') {
        formattedPrice = {
            id: data.id,
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'price'}}),
            settings: {
                recurrence: {
                    unit: data.groupSettings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.unit === 'Quarterly' ? 4 : data.groupSettings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => accountId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

        }
    } else {
        if(data.groupSettings.startMethod === 'Upon Purchase') {
            formattedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    }
                },
                contents: data.contents.map((content: any) => accountId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

            }
        } else {
            formattedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'price'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    },
                    startDate: data.groupSettings.startDate
                },
                contents: data.contents.map((content: any) => accountId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)
            }
        }
    }
    return formattedPrice
}

export const formatDeletePriceGroupInput = (data: GroupPrice): string => data.id

export const formatGetPriceGroupContentsInput = (path: string) => path

export const formatGetPriceGroupContentsOuput = (data: GetPricePackageContentsOutput): GroupPriceContents => {
    return {
        contents: data.contents,
        contentMetadata: data.contentMetadata
    }
}
