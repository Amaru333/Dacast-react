import axios from 'axios'
import { SecuritySettings } from '../../Settings/Security/types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistSecuritySettingsService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/security', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePlaylistSecuritySettingsService = async (data: SecuritySettings, playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/security', 
        {...data},
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PlaylistSecurityServices = {
    getPlaylistSecuritySettingsService,
    savePlaylistSecuritySettingsService
}