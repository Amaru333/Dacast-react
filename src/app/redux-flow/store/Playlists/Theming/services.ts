import axios from 'axios'
import { ThemeOptions } from '../../Settings/Theming';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistThemeService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/themes',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePlaylistThemeService = async (data: ThemeOptions, playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    if(!data.isCustom) {
        return axios.put(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/themes/' + data.id + '/set',
            {...data}, 
            {
                headers: {
                    Authorization: token
                }
            }
        )
    } else {
        if(data.id === '-1') {
            return axios.post(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/themes/',
                {...data}, 
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
        } else {
            return axios.put(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/themes/' + data.id,
                {...data}, 
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
        }

    }}

export const PlaylistThemingServices = {
    getPlaylistThemeService,
    savePlaylistThemeService
}