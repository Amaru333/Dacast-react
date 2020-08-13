import { SecuritySettings } from '../../Settings/Security/types';
import { axiosClient } from '../../../../utils/axiosClient';

const getPlaylistSecuritySettingsService = async (playlistId: string) => {

    return await axiosClient.get('/playlists/' + playlistId + '/settings/security')
}

const savePlaylistSecuritySettingsService = async (data: SecuritySettings, playlistId: string) => {
    return await axiosClient.put('/playlists/' + playlistId + '/settings/security', 
        {
            ...data
        },
    )
}

export const PlaylistSecurityServices = {
    getPlaylistSecuritySettingsService,
    savePlaylistSecuritySettingsService
}