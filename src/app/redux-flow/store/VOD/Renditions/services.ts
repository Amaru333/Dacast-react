import axios from 'axios'
import { Rendition } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

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

const addVodRenditionsService = async (data: string[], vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/renditions/bulk/create', 
        {
            resourceType: 'vods',
            items: data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}
const deleteVodRenditionsService = async (data: Rendition[], vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/renditions/bulk/delete', 
        {
            resourceType: 'vods',
            items: data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const VodRenditionsServices = {
    getVodRenditionsService,
    addVodRenditionsService,
    deleteVodRenditionsService
}