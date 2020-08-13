import { ContentDetails } from '../../VOD/General/types';
import { axiosClient } from '../../../../utils/axiosClient';

const getPlaylistDetailsService = async (playlistId: string) => {
    return await axiosClient.get('/playlists/' + playlistId)
}

const editPlaylistDetailsService = async (data: ContentDetails) => {
    return await axiosClient.put('/playlists/' + data.id,
        {
            ...data
        }
    )
}

const getUploadUrl = async (data: string, playlistId: string, extension: string) => {
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            playlistID: playlistId,
            extension: extension
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteFile = async (playlistId: string, targetId: string) => {
    return await axiosClient.delete('/playlists/' + playlistId + '/targets/' + targetId)
}

export const PlaylistGeneralServices = {
    getPlaylistDetailsService,
    editPlaylistDetailsService,
    getUploadUrl,
    uploadFile,
    deleteFile,
}