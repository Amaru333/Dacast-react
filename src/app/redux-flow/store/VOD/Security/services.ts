import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { SecuritySettings } from '../../Settings/Security/types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodSecuritySettingsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/vods/' + vodId + '/settings/security', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodSecuritySettingsService = async (data: SecuritySettings, vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/vods/' + vodId + '/settings/security', 
        {...data},
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const VodSecurityServices = {
    getVodSecuritySettingsService,
    saveVodSecuritySettingsService
}