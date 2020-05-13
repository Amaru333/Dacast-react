import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistListAction = () => {
    return axios.get(urlBase + 'playlists');
}

const deletePlaylistService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/PLAYLISTS/' + playlistId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PlaylistGeneralServices = {
    getPlaylistListAction,
    deletePlaylistService
}