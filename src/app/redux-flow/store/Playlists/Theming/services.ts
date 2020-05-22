import axios from 'axios'
import { ThemeOptions } from '../../Settings/Theming';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistThemeService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/themes',
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
        return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/themes/' + data.id + '/set',
            {...data}, 
            {
                headers: {
                    Authorization: token
                }
            }
        )
    } else {
        if(data.id === '-1') {
            return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/themes/',
                {...data, offlineMessagePosition: 1}, 
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
        } else {
            return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/themes/' + data.id,
                {...data, offlineMessagePosition: 1}, 
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