import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistListAction = async (qs: string) => {
    console.log(qs)
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/playlists' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'), 
        {
            headers: {
                Authorization: token
            }
        }
    )}

const deletePlaylistService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/playlists/' + playlistId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PlaylistListServices = {
    getPlaylistListAction,
    deletePlaylistService
}