import axios from 'axios';
import { GroupPrice, GroupPromo } from './types';
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
    let testObject = {
        name: data.name,
        type: "price",
        prices: data.prices.map((p) => {return {...p, description: 'preset description'}}),
        settings: {
            duration: {
                value: data.settings.duration.value,
                unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1)
            }
        }
    }
    return axios.post(process.env.API_BASE_URL + '/paywall/prices/groups' , 
        {
            ...testObject 
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
    return axios.put(process.env.API_BASE_URL + '/paywall/prices/groups/' + data.id , 
        {
            ...data 
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
