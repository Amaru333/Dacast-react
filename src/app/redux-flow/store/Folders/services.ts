import { ContentType } from './types';
import { VodGeneralServices } from '../VOD/General/services';
import { LiveGeneralServices } from '../Live/General/services';
import { PlaylistListServices } from '../Playlists/List/services';
import { axiosClient } from '../../../utils/axiosClient';

const getFolderContent = async (qs: string) => {
    return await axiosClient.get('/search/content' + (qs ? '?' + qs :'?status=online,offline,processing&page=1&per-page=10&content-types=channel,vod,playlist&sort-by=created-at-desc'))
}

const deleteContent = async (content: ContentType[]) => {
    content.map(async (c) => {
        switch(c.type) {
            case 'vod':
                return await VodGeneralServices.deleteVodService(c.id)
            case 'channel':
                return await LiveGeneralServices.deleteLiveChannelService(c.id)
            case'playlist':
                return await PlaylistListServices.deletePlaylistService(c.id)
            default:
                return
        }
    })

}

const restoreContent = async (content: ContentType[]) => {
    content.map(async (c) => {
        switch(c.type) {
            case 'vod':
                return await VodGeneralServices.restoreVodService(c.id)
            case 'channel':
            case'playlist':
                return
            default:
                return
        }
    })
}

export const FoldersServices = {
    getFolderContent,
    deleteContent,
    restoreContent
}
