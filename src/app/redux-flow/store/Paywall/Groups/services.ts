import axios from 'axios';
import { GroupPrice, GroupPromo } from './types';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';
import { userToken } from '../../../../utils/services/token/tokenService';

const getGroupPrices = async () => {
    return await axiosClient.get('/paywall/prices/groups?page=1&per-page=100')
}

const createGroupPrice = async (data: GroupPrice) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.groupSettings.type === 'Subscription') {
        parsedPrice = {
            name: data.name,
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: data.name}}),
            settings: {
                recurrence: {
                    unit: data.groupSettings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.unit === 'Quarterly' ? 4 : data.groupSettings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

        }
    } else {
        if(data.groupSettings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: data.name}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    }
                },
                contents: data.contents.map((content: any) => userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

            }
        } else {
            parsedPrice = {
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: data.name}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    },
                    startDate: data.groupSettings.startDate
                },
                contents: data.contents.map((content: any) => userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)
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
            prices: data.prices.map((p) => {let price = p.price; return {...price, description: data.name}}),
            settings: {
                recurrence: {
                    unit: data.groupSettings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.groupSettings.recurrence.unit === 'Quarterly' ? 4 : data.groupSettings.recurrence.unit === 'Biannual' ? 6 : 1
                }
            },
            contents: data.contents.map((content: any) => userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

        }
    } else {
        if(data.groupSettings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: data.name}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    }
                },
                contents: data.contents.map((content: any) => userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)

            }
        } else {
            parsedPrice = {
                id: data.id,
                name: data.name,
                prices: data.prices.map((p) => {let price = p.price; return {...price, description: data.name}}),
                settings: {
                    duration: {
                        unit: data.groupSettings.duration.unit.toLowerCase().substr(0, data.groupSettings.duration.unit.length - 1),
                        value: data.groupSettings.duration.value
                    },
                    startDate: data.groupSettings.startDate
                },
                contents: data.contents.map((content: any) => userId + '-' + (content.type === 'channel' ? 'live' : content.type) + '-' + content.objectID)
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



export const GroupsServices = {
    getGroupPrices,
    createGroupPrice,
    saveGroupPrice,
    deleteGroupPrice,
}
