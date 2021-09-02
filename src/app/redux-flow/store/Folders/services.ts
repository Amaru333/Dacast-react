import { FolderContent } from './types';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';

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
    restoreContent
}
