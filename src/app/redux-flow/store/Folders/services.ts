import axios from 'axios';
import { ContentType } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../utils/token';

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

const deleteContent = (content: ContentType[]) => {
    return axios.delete(urlBase + 'folder/content', {data: content})
}

const restoreContent = (content: ContentType[]) => {
    return axios.put(urlBase + 'folder/content', {data: content})
}

export const FoldersServices = {
    getFolderContent,
    deleteContent,
    restoreContent
}
