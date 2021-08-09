import { FolderContent } from './types';
import { axiosClient } from '../../../utils/services/axios/axiosClient';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';

const getFolderContent = async (qs: string) => {
    return await axiosClient.get('/search/content' + (qs ? '?' + qs :'?status=online,offline,processing&page=1&per-page=10&content-types=channel,vod,playlist&sort-by=created-at-desc'))
}

const restoreContent = async (content: FolderContent[]) => {
    content.map(async (c) => {
        switch(c.type) {
            case 'vod':
                return await dacastSdk.postRestoreVod(c.id)
            case 'live':
            case'playlist':
                return
            default:
                return
        }
    })
}

export const FoldersServices = {
    getFolderContent,
    restoreContent
}
