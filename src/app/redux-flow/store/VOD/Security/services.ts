import axios from 'axios'
import { SecuritySettings } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodSecuritySettingsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/settings/security', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodSecuritySettingsService = (data: SecuritySettings) => {
    return axios.post(urlBase + 'vod-security', {...data});
}

export const VodSecurityServices = {
    getVodSecuritySettingsService,
    saveVodSecuritySettingsService
}