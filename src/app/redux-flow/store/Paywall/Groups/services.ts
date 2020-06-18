import axios from 'axios';
import { GroupPrice, GroupPromo, GroupPriceCreation } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getGroupPrices = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/prices/groups?page=1&per-page=100', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createGroupPrice = async (data: GroupPrice) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()

    let parsedPrice = null
    if(data.groupSettings.type === 'Subscription') {
        parsedPrice = {
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
            settings: {
                recurrence: {
                    recurrence: data.groupSettings.recurrence.recurrence === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.recurrence === 'Quarterly' ? 4 : data.groupSettings.recurrence.recurrence === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => content.ownerID + '-' + content.type + '-' + content.objectID)

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
                contents: data.contents.map((content: any) => content.ownerID + '-' + content.type + '-' + content.objectID)

            }
        } else {
            parsedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
                settings: {
                    startDate: Date.now()
                },
                contents: data.contents.map((content: any) => content.ownerID + '-' + content.type + '-' + content.objectID)
            }
        }
    } 
    return axios.post(process.env.API_BASE_URL + '/paywall/prices/groups' , 
        {
            ...parsedPrice 
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveGroupPrice = async (data: GroupPrice) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    let parsedPrice = null
    if(data.groupSettings.type === 'Subscription') {
        parsedPrice = {
            id: data.id,
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
            settings: {
                recurrence: {
                    recurrence: data.groupSettings.recurrence.recurrence === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.recurrence === 'Quarterly' ? 4 : data.groupSettings.recurrence.recurrence === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => content.ownerID + '-' + content.type + '-' + content.objectID)

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
                contents: data.contents.map((content: any) => content.ownerID + '-' + content.type + '-' + content.objectID)

            }
        } else {
            parsedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: 'group description'}}),
                settings: {
                    startDate: Date.now()
                },
                contents: data.contents.map((content: any) => content.ownerID + '-' + content.type + '-' + content.objectID)
            }
        }
    } 
    return axios.put(process.env.API_BASE_URL + '/paywall/prices/groups/' + data.id , 
        {
            ...parsedPrice 
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteGroupPrice = async (data: GroupPrice) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/prices/groups/' + data.id , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getGroupPromos = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/promos?page=1&per-page=100', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createGroupPromo = async (data: GroupPromo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos' , 
        {
            promo: {
                ...data,
                assignedContentIds: [],
                discountApplied: 'once',
                id: null
            }  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveGroupPromo = async (data: GroupPromo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/paywall/promos/' + data.id , 
        {
            promo: data  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteGroupPromo = async (data: GroupPromo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/promos/' + data.id , 
        {
            headers: {
                Authorization: token
            }
        }
    )
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
