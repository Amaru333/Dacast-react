import axios from 'axios'
import { PlaylistDetails} from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistDetailsService = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId, 
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
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + data.id,
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/uploads/signatures/singlepart/' + data,
        {
            playlistID: playlistId
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
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/targets/' + targetId,
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