import axios from 'axios';
import { GroupPrice, GroupPromo } from './types';
import { axiosClient } from '../../../../utils/axiosClient';
import { userToken } from '../../../../utils/token';

const getGroupPrices = async () => {
    return await axiosClient.get('/paywall/prices/groups?page=1&per-page=100')
}

const createGroupPrice = async (data: GroupPrice) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.groupSettings.type === 'Subscription') {
        parsedPrice = {
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
            settings: {
                recurrence: {
                    unit: data.groupSettings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.unit === 'Quarterly' ? 4 : data.groupSettings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => userId + '-' + content.type + '-' + content.objectID)

        }
    } else {
        if(data.groupSettings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    }
                },
                contents: data.contents.map((content: any) => userId + '-' + content.type + '-' + content.objectID)

            }
        } else {
            parsedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    },
                    startDate: data.groupSettings.startDate
                },
                contents: data.contents.map((content: any) => userId + '-' + content.type + '-' + content.objectID)
            }
        }
    } 
    return await axiosClient.post('/paywall/prices/groups' , 
        {
            ...parsedPrice 
        }
    )
}

const saveGroupPrice = async (data: GroupPrice) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.groupSettings.type === 'Subscription') {
        parsedPrice = {
            id: data.id,
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
            settings: {
                recurrence: {
                    unit: data.groupSettings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.unit === 'Quarterly' ? 4 : data.groupSettings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => userId + '-' + content.type + '-' + content.objectID)

        }
    } else {
        if(data.groupSettings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    }
                },
                contents: data.contents.map((content: any) => userId + '-' + content.type + '-' + content.objectID)

            }
        } else {
            parsedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    },
                    startDate: data.groupSettings.startDate
                },
                contents: data.contents.map((content: any) => userId + '-' + content.type + '-' + content.objectID)
            }
        }
    } 
    return await axiosClient.put('/paywall/prices/groups/' + data.id , 
        {
            package: parsedPrice 
        }
    )
}

const deleteGroupPrice = async (data: GroupPrice) => {
    return await axiosClient.delete('/paywall/prices/groups/' + data.id)
}

const getGroupPromos = async () => {
    return await axiosClient.get('/paywall/promos?page=1&per-page=100')
}

const createGroupPromo = async (data: GroupPromo) => {
    let parsedData = null
    if (data.rateType !== 'Pay Per View') {
        parsedData = {
            ...data,
            assignedContentIds: [],
            discountApplied: data.discountApplied.toLowerCase(),
            startDate: Math.floor(data.startDate / 1000),
            endDate: Math.floor(data.endDate / 1000),
            id: null
        }
    } else {
        parsedData = {
            ...data,
            assignedContentIds: [],
            discountApplied: null,
            startDate: Math.floor(data.startDate / 1000),
            endDate: Math.floor(data.endDate / 1000),
            id: null
        }
    }
    if (data.startDate === 0) {
        delete parsedData['startDate']
    }
    if (data.endDate === 0) {
        delete parsedData['endDate']
    }
    return await axiosClient.post('/paywall/promos' , 
        {
            promo: parsedData
        }
    )
}

const saveGroupPromo = async (data: GroupPromo) => {
    let parsedData = null
    if(data.rateType !== 'Pay Per View') {
        parsedData = {
            ...data,
            assignedContentIds: [],
            discountApplied: data.discountApplied.toLowerCase(),
            startDate: Math.floor(data.startDate / 1000),
            endDate: Math.floor(data.endDate / 1000),
        }
    } else {
        parsedData = {
            ...data,
            assignedContentIds: [],
            discountApplied: null,
            startDate: Math.floor(data.startDate / 1000),
            endDate: Math.floor(data.endDate / 1000),
        }
    }
    if (data.startDate === 0) {
        delete parsedData['startDate']
    }
    if (data.endDate === 0) {
        delete parsedData['endDate']
    }
    return await axiosClient.put('/paywall/promos/' + data.id , 
        {
            promo: parsedData  
        }
    )
}

const deleteGroupPromo = async (data: GroupPromo) => {
    return await axiosClient.delete('/paywall/promos/' + data.id)
}

export const GroupsServices = {
    getGroupPrices,
    createGroupPrice,
    saveGroupPrice,
    deleteGroupPrice,
    getGroupPromos,
    createGroupPromo,
    saveGroupPromo,
    deleteGroupPromo
}
