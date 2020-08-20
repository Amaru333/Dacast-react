import { ContentType } from './types';
import { axiosClient } from '../../../utils/axiosClient';
import { contentListServices } from '../Content/List/services';
import { ContentGeneralServices } from '../Content/General/services';

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
                return await ContentGeneralServices.restoreContentService(c.id, c.type)
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
