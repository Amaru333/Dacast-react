import axios from 'axios'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistSetupAction = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/setup', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const postPlaylistSetupAction = (data: any[]) => {
    return axios.post(urlBase + 'playlist-setup', {...data});
}

export const PlaylistSetupServices = {
    getPlaylistSetupAction,
    postPlaylistSetupAction
}