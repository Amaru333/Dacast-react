import { DeleteContentPriceInput, GetContentPaywallInfoOutput, GetContentPricesOutput, PostContentPriceInput, PostContentPriceOutput, PutContentPaywallInfoInput, PutContentPriceInput } from "../../../../../DacastSdk/common"
import { GetPromoOutput, PromoDetails, PromoEndpoints, PromoId } from "../../../../../DacastSdk/paywall"
import { capitalizeFirstLetter } from "../../../../../utils/utils"
import { userToken } from "../../../../utils/services/token/tokenService"
import { ContentType } from "../../Common/types"
import { ContentPaywallDetails, ContentPaywallPageInfos, Preset, Promo } from "../../Paywall/Presets"

export const formatGetContentPaywallInfoInput = (data: string): string => data

export const formatGetContentPaywallInfoOutput = (contentType: ContentType) => (endpointResponse: GetContentPaywallInfoOutput, dataReact: string): {contentType: ContentType; contentId: string; data: ContentPaywallDetails} => {
    let formattedData: {contentType: ContentType; contentId: string; data: ContentPaywallDetails} = {
        contentId: dataReact,
        contentType: contentType,
        data: {
            introVodId: endpointResponse.introVodId,
            selectedTheme: endpointResponse.selectedTheme,
            paywallEnabled: endpointResponse.paywallEnabled
        }
    }

    return formattedData
}

export const formatPutContentPaywallInfoInput = (data: {info: ContentPaywallPageInfos, contentId: string}): PutContentPaywallInfoInput => {
    let formattedData: PutContentPaywallInfoInput = {
        id: data.contentId,
        payload: {
            paywallEnabled: data.info.paywallEnabled,
            introVodId: data.info.introVodId,
            selectedTheme: data.info.selectedTheme
        }
    }

    return formattedData
}

export const formatPutContentPaywallInfoOutput = (contentType: ContentType) => (endpointResponse: null, dataReact: {info: ContentPaywallPageInfos, contentId: string}): {data: ContentPaywallPageInfos; contentId: string; contentType: ContentType} => {
    let formattedData: {data: ContentPaywallPageInfos; contentId: string; contentType: ContentType} = {
        data: dataReact.info,
        contentId: dataReact.contentId,
        contentType: contentType
    }

    return formattedData
}

export const formatGetContentPricesInput = (data: {id: string; contentType: ContentType}): string => {
    let userId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    let returnedString: string = userId + '-' + data.contentType + '-' + data.id
    return returnedString
}

export const formatGetContentPricesOutput = (endpointResponse: GetContentPricesOutput, dataReact: {id: string; contentType: ContentType}): {data:Preset[]; contentId: string; contentType: ContentType} => {
    console.log('content id', dataReact)
    let formattedData: {data: Preset[]; contentId: string; contentType: ContentType} = {
        data: endpointResponse.prices.map((price) => {
            return {
                ...price,
                price: price.price,
                settings: {
                    ...price.settings,
                    duration: price.settings.duration ? {
                        value: price.settings.duration.value,
                        unit: capitalizeFirstLetter(price.settings.duration.unit) + 's'
                    }
                    : null,
                    startMethod: price.settings.startDate > Math.round(Date.now() / 1000) ? 'Set Date & Time' : 'Available on Purchase',
                    recurrence: price.settings.recurrence ? {
                        unit: price.settings.recurrence.unit === 'week' ? 'Weekly'
                        : price.settings.recurrence.value > 4 ? 'Biannual'
                        : price.settings.recurrence.value > 1 ? 'Quarterly'
                        : 'Monthly'
                    }
                    : null
                },
                priceType: price.settings.recurrence ? 'Subscription' : 'Pay Per View'
            }
        }),
        contentId: dataReact.id,
        contentType: dataReact.contentType
    }

    return formattedData
}

export const formatPostContentPriceInput = (data: {price: Preset; id: string; contentType: ContentType}): PostContentPriceInput => {
    const userId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const dateAvailable = data.price.settings.startMethod === "Available on Purchase" ? "immediately" : new Date(data.price.settings.startDate * 1000).toLocaleString()

    let parsedPrice: PostContentPriceInput = null
    if(data.price.priceType === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-${data.contentType}-${data.id}`,
            prices: data.price.prices.map((p) => {return {...p, description: `Access starts ${dateAvailable}`}}),
            settings: {
                recurrence: {
                    unit: data.price.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.price.settings.recurrence.unit === 'Quarterly' ? 3 : data.price.settings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.price.settings.startMethod === 'Available on Purchase') {
            parsedPrice = {
                contentId: `${userId}-${data.contentType}-${data.id}`,
                prices: data.price.prices.map((p) => {return {...p, description: `Access starts ${dateAvailable}`}}),
                settings: {
                    duration: {
                        unit: data.price.settings.duration.unit.toLowerCase().substr(0, data.price.settings.duration.unit.length - 1),
                        value: data.price.settings.duration.value
                    }
                }
            }
        } else {
            parsedPrice = {
                contentId: `${userId}-${data.contentType}-${data.id}`,
                prices: data.price.prices.map((p) => {return {...p, description: `Access starts ${dateAvailable}`}}),
                settings: {
                    duration: {
                        unit: data.price.settings.duration.unit.toLowerCase().substr(0, data.price.settings.duration.unit.length - 1),
                        value: data.price.settings.duration.value
                    },
                    startDate: data.price.settings.startDate
                }
            }
        }
    }

    return parsedPrice
}

export const formatPostContentPriceOutput = (endpointResponse: PostContentPriceOutput, dataReact: {price: Preset; id: string; contentType: ContentType}): {data: Preset; contentId: string; contentType: ContentType} => {
    let formattedData: {data: Preset; contentId: string; contentType: ContentType} = {
        data: {
            ...dataReact.price,
            id: endpointResponse.id
        },
        contentId: dataReact.id,
        contentType: dataReact.contentType
    }

    return formattedData
}

export const formatPutContentPriceInput = (data: {price: Preset; contentId: string; contentType: ContentType}): PutContentPriceInput => {
    const userId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    let parsedPrice: PutContentPriceInput = null
    if(data.price.priceType === 'Subscription') {
        parsedPrice = {
            id: data.price.id,
            contentId: `${userId}-${data.contentType}-${data.contentId}`,
            price: {value: data.price.price, currency: data.price.currency, description: data.price.description},
            settings: {
                recurrence: {
                    unit: data.price.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.price.settings.recurrence.unit === 'Quarterly' ? 3 : data.price.settings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.price.settings.startMethod === 'Available on Purchase') {
            parsedPrice = {
                id: data.price.id,
                contentId: `${userId}-${data.contentType}-${data.contentId}`,
                price: {value: data.price.price, currency: data.price.currency, description: data.price.description},
                settings: {
                    duration: {
                        unit: data.price.settings.duration.unit.toLowerCase().substr(0, data.price.settings.duration.unit.length - 1),
                        value: data.price.settings.duration.value
                    },
                    startDate: Math.round(Date.now() / 1000) - 10
                }
            }
        } else {
            parsedPrice = {
                id: data.price.id,
                contentId: `${userId}-${data.contentType}-${data.contentId}`,
                price: {value: data.price.price, currency: data.price.currency, description: data.price.description},
                settings: {
                    duration: {
                        unit: data.price.settings.duration.unit.toLowerCase().substr(0, data.price.settings.duration.unit.length - 1),
                        value: data.price.settings.duration.value
                    },
                    startDate: data.price.settings.startDate
                }
            }
        }
    }

    return parsedPrice
}

export const formatDeleteContentPriceInput = (data: {price: Preset; contentId: string; contentType: ContentType}): DeleteContentPriceInput => {
    const userId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')

    let formattedData: DeleteContentPriceInput = {
        id: data.price.id,
        contentId: `${userId}-${data.contentType}-${data.contentId}`
    }

    return formattedData
}

export const formatDeleteContentPriceOutput = (endpointResponse: null, dataReact: {price: Preset; contentId: string; contentType: ContentType}): {data: Preset; contentId: string; contentType: ContentType} => {
    let formattedData: {data: Preset; contentId: string; contentType: ContentType} = {
        data: dataReact.price,
        contentId: dataReact.contentId,
        contentType: dataReact.contentType
    }

    return formattedData
}

export const formatGetContentPromosInput = (data: {contentId: string; contentType: ContentType}): string => 'page=1&per-page=100'

export const formatGetContentPromosOutput = (endpointResponse: GetPromoOutput, dataReact: {contentId: string; contentType: ContentType}): {data: Promo[], contentId: string, contentType: ContentType} => {
    const userId = userToken.getUserInfoItem('user-id')
    const parentId = userToken.getUserInfoItem('parent-id')
    let formattedData: {data: Promo[], contentId: string, contentType: ContentType} = {
        data: endpointResponse.promos.filter(f => f.assignedContentIds.indexOf(`${userId}-${dataReact.contentType}-${dataReact.contentId}`) !== -1 || f.assignedContentIds.indexOf(`${parentId}-${dataReact.contentType}-${dataReact.contentId}` ) !== -1),
        contentType: dataReact.contentType,
        contentId: dataReact.contentId
    }

    return formattedData
}

export const formatPostContentPromoInput = (data: {promo: Promo; contentId: string; contentType: ContentType}): PromoDetails => {
    let formattedData: PromoDetails = {
        alphanumericCode: data.promo.alphanumericCode,
        discount: data.promo.discount,
        limit: data.promo.limit,
        discountApplied: data.promo.discountApplied,
        assignedContentIds: data.promo.assignedContentIds,
        assignedGroupIds: []
    }

    if(data.promo.startDate) {
        formattedData.startDate = data.promo.startDate
    }

    if(data.promo.endDate) {
        formattedData.endDate = data.promo.endDate
    }

    return formattedData
}

export const formatPostContentPromoOutput = (endpointResponse: PromoId, dataReact: {promo: Promo; contentId: string; contentType: ContentType}): {promo: Promo; contentId: string; contentType: ContentType} => {
    let formattedData: {promo: Promo; contentId: string; contentType: ContentType} = {
        promo: {
            ...dataReact.promo,
            id: endpointResponse.id
        },
        contentId: dataReact.contentId,
        contentType: dataReact.contentType
    }

    return formattedData
}

export const formatPutContentPromoInput = (data: {promo: Promo; contentId: string; contentType: ContentType}): PromoEndpoints => {
    let formattedData: PromoEndpoints = {
        id: data.promo.id,
        alphanumericCode: data.promo.alphanumericCode,
        discount: data.promo.discount,
        limit: data.promo.limit,
        discountApplied: data.promo.discountApplied,
        assignedContentIds: data.promo.assignedContentIds,
        assignedGroupIds: []
    }

    if(data.promo.startDate) {
        formattedData.startDate = data.promo.startDate
    }

    if(data.promo.endDate) {
        formattedData.endDate = data.promo.endDate
    }

    return formattedData
}

export const formatDeleteContentPromoInput = (data: {promo: Promo; contentId: string; contentType: ContentType}): string => data.promo.id
