import axios from 'axios'
import { Rendition } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { bulkActionsService } from '../../Common/bulkService';

const getVodRenditionsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/vods/' + vodId + '/renditions', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const addVodRenditionsService = async (data: string[], vodId: string) => {
    console.log(data)
    return await bulkActionsService(data.map(item => {return {name: item, type: 'rendition'}}), 'create', vodId)
}
const deleteVodRenditionsService = async (data: string[], vodId: string) => {
    return await bulkActionsService(data.map(item => {return {id: item, type: 'rendition'}}), 'delete', vodId)
}

export const VodRenditionsServices = {
    getVodRenditionsService,
    addVodRenditionsService,
    deleteVodRenditionsService
}