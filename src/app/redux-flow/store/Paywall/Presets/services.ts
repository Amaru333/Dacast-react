import axios from 'axios';
import { Preset, Promo } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getPricePresetsList = async (qs: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/prices/presets?' + qs , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createPricePreset = async (data: Preset) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            prices: data.prices.map((p) => {return {...p, description: 'preset description'}}),
            settings: {
                recurrence: {
                    recurrence: data.settings.recurrence.recurrence === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.recurrence === 'Quarterly' ? 4 : data.settings.recurrence.recurrence === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.settings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                prices: data.prices.map((p) => {return {...p, description: 'preset description'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    }
                }
            }
        } else {
            parsedPrice = {
                prices: data.prices.map((p) => {return {...p, description: 'preset description'}}),
                settings: {
                    startDate: Date.now()
                }
            }
        }
    } 
    return axios.post(process.env.API_BASE_URL + '/paywall/prices/presets' , 
        {
            name: data.name,
            type: 'price',
            preset: parsedPrice  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePricePreset = async (data: Preset) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/paywall/prices/presets/' + data.id , 
        {
            name: data.name,
            preset: data  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deletePricePreset = async (data: Preset) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/prices/presets/' + data.id , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getPromoPresetsList = async (qs: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/promos/presets?' + qs , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createPromoPreset = async (data: Promo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos/presets' , 
        {
            name: data.name,
            type: 'voucher',
            preset: {
                ...data,
                assignedContentIds: [],
                assignedGroupIds: [],
                discountApplied: 'once'
            }  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePromoPreset = async (data: Promo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/paywall/promos/presets/' + data.id , 
        {
            name: data.name,
            preset: data  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deletePromoPreset = async (data: Promo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/promos/presets/' + data.id , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PresetsServices = {
    getPricePresetsList,
    createPricePreset,
    savePricePreset,
    deletePricePreset,
    getPromoPresetsList,
    createPromoPreset,
    savePromoPreset,
    deletePromoPreset
}
