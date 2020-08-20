import { Preset, Promo } from './types';
import { axiosClient } from '../../../../utils/axiosClient';

const getPricePresetsList = async (qs: string) => {
    return await axiosClient.get('/paywall/prices/presets?' + qs)
}

const createPricePreset = async (data: Preset) => {
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            prices: data.prices.map((p) => {return {...p, description: 'preset description'}}),
            settings: {
                recurrence: {
                    unit: data.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.unit === 'Quarterly' ? 4 : data.settings.recurrence.unit === 'Biannual' ? 6 : 1
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
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    },
                    startDate: data.settings.startDate
                }
            }
        }
    } 
    return await axiosClient.post('/paywall/prices/presets' , 
        {
            name: data.name,
            type: 'price',
            preset: parsedPrice  
        }
    )
}

const savePricePreset = async (data: Preset) => {
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            prices: data.prices.map((p) => {return {...p, description: 'preset description'}}),
            settings: {
                recurrence: {
                    unit: data.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.unit === 'Quarterly' ? 4 : data.settings.recurrence.unit === 'Biannual' ? 6 : 1
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
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    },
                    startDate: data.settings.startDate
                }
            }
        }
    } 
    return await axiosClient.put('/paywall/prices/presets/' + data.id , 
        {
            id: data.id,
            name: data.name,
            preset: parsedPrice  
        }
    )
}

const deletePricePreset = async (data: Preset) => {
    return await axiosClient.delete('/paywall/prices/presets/' + data.id)
}

const getPromoPresetsList = async (qs: string) => {
    return await axiosClient.get('/paywall/promos/presets?' + qs)
}

const createPromoPreset = async (data: Promo) => {
    let parsedData = null
    parsedData = {
        ...data,
        assignedContentIds: [],
        assignedGroupIds: [],
        discountApplied: data.discountApplied.toLowerCase(),
        startDate: Math.floor(data.startDate),
        endDate: Math.floor(data.endDate),
        id: null
    }
    if (data.startDate === 0) {
        delete parsedData['startDate']
    }
    if (data.endDate === 0) {
        delete parsedData['endDate']
    }
    return await axiosClient.post('/paywall/promos/presets' , 
        {
            name: data.name,
            type: 'voucher',
            preset: {
                ...parsedData
            }
        }
    )
}

const savePromoPreset = async (data: Promo) => {
    let parsedData = null
    parsedData = {
        ...data,
        assignedContentIds: [],
        assignedGroupIds: [],
        discountApplied: data.discountApplied.toLowerCase(),
        startDate: Math.floor(data.startDate),
        endDate: Math.floor(data.endDate),
    }
    if (data.startDate === 0) {
        delete parsedData['startDate']
    }
    if (data.endDate === 0) {
        delete parsedData['endDate']
    }
    return await axiosClient.put('/paywall/promos/presets/' + data.id , 
        {
            name: data.name,
            id: data.id,
            preset: {
                ...parsedData
            }
        }
    )
}

const deletePromoPreset = async (data: Promo) => {
    return await axiosClient.delete('/paywall/promos/presets/' + data.id)
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
