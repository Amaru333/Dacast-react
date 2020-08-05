import axios from 'axios'
import { PlaylistDetails} from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistDetailsService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/playlists/' + playlistId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const editPlaylistDetailsService = async (data: PlaylistDetails) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/playlists/' + data.id,
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, playlistId: string, extension: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/uploads/signatures/singlepart/' + data,
        {
            playlistID: playlistId,
            extension: extension
        },
        {
            headers: {
                Authorization: token
            }
        })
}

const uploadFile = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteFile = async (playlistId: string, targetId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/playlists/' + playlistId + '/targets/' + targetId,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PlaylistGeneralServices = {
    getPlaylistDetailsService,
    editPlaylistDetailsService,
    getUploadUrl,
    uploadFile,
    deleteFile,
}