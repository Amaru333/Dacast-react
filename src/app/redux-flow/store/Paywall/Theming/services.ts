import { PaywallTheme } from './types';
import { axiosClient } from '../../../../utils/axiosClient';


const getPaywallThemes = async () => {
    return await axiosClient.get('/paywall/themes/')
}

const savePaywallTheme = async (data: PaywallTheme) => {
    return await axiosClient.put('/paywall/themes/' + data.id , 
        {
            ...data
        }
    )
}

const createPaywallTheme = async (data: PaywallTheme) => {
    let parsedData = {
        name: data.name,
        isDefault: data.isDefault,
        splashScreen: data.splashScreen,
        loginScreen: data.loginScreen
    }
    return await axiosClient.post('/paywall/themes/', 
        {
            ...parsedData
        }
    )
}

const deletePaywallTheme = async (data: PaywallTheme) => {
    return await axiosClient.delete('/paywall/themes/' + data.id)
}

export const PaywallThemeServices = {
    getPaywallThemes,
    savePaywallTheme,
    createPaywallTheme,
    deletePaywallTheme
}