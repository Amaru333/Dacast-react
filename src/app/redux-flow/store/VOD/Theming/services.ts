import axios from 'axios'
import { ThemeOptions } from '../../Settings/Theming';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodThemeService = async (vodId: string) => {    
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/settings/themes',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodThemeService = async (data: ThemeOptions, vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/settings/themes/' + (data.themeName !== 'Custom Theme' ? data.id + '/set' : ''),
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const VodThemingServices = {
    getVodThemeService,
    saveVodThemeService
}