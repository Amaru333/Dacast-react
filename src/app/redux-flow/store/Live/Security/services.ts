import axios from 'axios'
import { SecuritySettings } from '../../Settings/Security/types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getLiveSecuritySettingsService = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/security', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLiveSecuritySettingsService = async (data: SecuritySettings, liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/security', 
        {...data},
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const LiveSecurityServices = {
    getLiveSecuritySettingsService,
    saveLiveSecuritySettingsService
}