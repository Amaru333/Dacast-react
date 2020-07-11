import axios from 'axios'
import { ThemeOptions } from '../../Settings/Theming';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';


const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveThemeService = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/themes',
        {
            headers: {
                Authorization: token
            }
        }
    )}

const saveLiveThemeService = async (data: ThemeOptions, liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    if(!data.isCustom) {
        return axios.put(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/themes/' + data.id + '/set',
            {...data}, 
            {
                headers: {
                    Authorization: token
                }
            }
        )
    } else {
        if(data.id === '-1') {
            return axios.post(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/themes/',
                {...data}, 
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
        } else {
            return axios.put(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/themes/' + data.id,
                {...data}, 
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
        }

    }}

export const LiveThemingServices = {
    getLiveThemeService,
    saveLiveThemeService
}