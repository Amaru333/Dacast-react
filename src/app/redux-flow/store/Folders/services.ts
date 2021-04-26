import { ContentType } from './types';
import { axiosClient } from '../../../utils/services/axios/axiosClient';
import { contentListServices } from '../Content/List/services';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';

const getFolderContent = async (qs: string) => {
    return await axiosClient.get('/search/content' + (qs ? '?' + qs :'?status=online,offline,processing&page=1&per-page=10&content-types=channel,vod,playlist&sort-by=created-at-desc'))
}

const deleteContent = async (content: ContentType[]) => {
    content.map(async (c) => {
        return await contentListServices.deleteContentService(c.id, c.type)
    })

}

const restoreContent = async (content: ContentType[]) => {
    content.map(async (c) => {
        switch(c.type) {
            case 'vod':
                return await dacastSdk.postRestoreVod(c.id)
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
