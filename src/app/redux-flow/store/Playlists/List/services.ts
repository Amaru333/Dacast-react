import { axiosClient } from '../../../../utils/axiosClient'

const getPlaylistListAction = async (qs: string) => {
    return await axiosClient.get('/playlists' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'))
}

const deletePlaylistService = async (playlistId: string) => {
    return await axiosClient.delete('/playlists/' + playlistId)
}

export const PlaylistListServices = {
    getPlaylistListAction,
    deletePlaylistService
}