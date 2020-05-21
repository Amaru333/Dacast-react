import axios from 'axios';
import { ContentType } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../utils/token';
import { VodGeneralServices } from '../VOD/General/services';
import { LiveGeneralServices } from '../Live/General/services';
import { PlaylistListServices } from '../Playlists/List/services';
import { bulkActionsService } from '../Common/bulkService';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getFolderContent = async (qs: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/search/content' + (qs ? '?' + qs :'?status=online,offline,processing&page=1&per-page=10&content-types=channel,vod'), 
        {
            headers: {
                Authorization: token
            }
        }
    )
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
