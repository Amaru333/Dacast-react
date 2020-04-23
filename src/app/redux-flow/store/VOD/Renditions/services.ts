import axios from 'axios'
import { Rendition } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodRenditionsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/renditions', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const addVodRenditionsService = (data: Rendition[]) => {
    return axios.put(urlBase + 'vod-rendition', {...data})
}

const deleteVodRenditionsService = (data: Rendition[]) => {
    return axios.delete(urlBase + 'vod-rendition', {data:{...data}})
}

export const VodRenditionsServices = {
    getVodRenditionsService,
    addVodRenditionsService,
    deleteVodRenditionsService
}