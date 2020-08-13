import { ThemeOptions } from '../../Settings/Theming';
import { axiosClient } from '../../../../utils/axiosClient';

const getPlaylistThemeService = async (playlistId: string) => {
    return await axiosClient.get('/playlists/' + playlistId + '/settings/themes')
}

const savePlaylistThemeService = async (data: ThemeOptions, playlistId: string) => {
    if(!data.isCustom) {
        return await axiosClient.put('/playlists/' + playlistId + '/settings/themes/' + data.id + '/set',
            {
                ...data
            }
        )
    } else {
        if(data.id === '-1') {
            return await axiosClient.post('/playlists/' + playlistId + '/settings/themes/',
                {
                    ...data
                }
            )
        } else {
            return await axiosClient.put('/playlists/' + playlistId + '/settings/themes/' + data.id,
                {
                    ...data
                }
            )
        }

    }
}

export const PlaylistThemingServices = {
    getPlaylistThemeService,
    savePlaylistThemeService
}