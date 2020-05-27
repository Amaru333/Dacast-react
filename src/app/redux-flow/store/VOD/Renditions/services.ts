import axios from 'axios'
import { Rendition } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

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
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/vods/' + vodId + '/renditions/bulk/create', 
        {
            resourceType: 'renditions',
            items: data.map(item => {return {name: item}})
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}
const deleteVodRenditionsService = async (data: string[], vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/vods/' + vodId + '/renditions/bulk/delete', 
        {
            resourceType: 'renditions',
            items: data.map(item => {return {id: item}})
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