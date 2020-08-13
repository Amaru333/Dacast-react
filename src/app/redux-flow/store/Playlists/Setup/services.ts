import { PlaylistSetupObject } from './types';
import { axiosClient } from '../../../../utils/axiosClient';

const getPlaylistSetupAction = async (playlistId: string) => {
    return await axiosClient.get('/playlists/' + playlistId + '/setup')
}

const postPlaylistSetupAction = async (playlistData: PlaylistSetupObject, playlistId: string) => {
    return await axiosClient.put('/playlists/' + playlistId + '/setup', 
        {
            ...playlistData,
            title: null
        }
    )
}

export const PlaylistSetupServices = {
    getPlaylistSetupAction,
    postPlaylistSetupAction
}