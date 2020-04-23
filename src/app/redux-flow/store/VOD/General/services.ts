import axios from 'axios'
import { SubtitleInfo, VodDetails } from './types'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/'

const getVodDetailsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getVodList = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteVodService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const editVodDetailsService = async (data: VodDetails) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + data.id,
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const addVodSubtitleService = async (data: SubtitleInfo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + data.id,
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const editVodSubtitleService = (data: SubtitleInfo) => {
    return axios.put(urlBase + 'vod-subtitle', {...data})
}

const deleteVodSubtitleService = (data: SubtitleInfo) => {
    return axios.delete(urlBase + 'vod-subtitle', {data:{...data}})
}

const getUploadUrl = async (data: string, vodId: string) => {
    console.log('vod id', vodId)
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/uploads/signatures/singlepart/' + data,
        {
            vodID: vodId
        },
        {
            headers: {
                Authorization: token
            }
        })
}

const uploadImage = (data: File, uploadUrl: string) => {
    console.log(data)
    return axios.put(uploadUrl, {...data})
}

const deleteImage = (data: File) => {
    return axios.put(urlBase + 'vod/poster', {...data})
}


export const VodGeneralServices = {
    getVodDetailsService,
    editVodDetailsService,
    addVodSubtitleService,
    editVodSubtitleService,
    deleteVodSubtitleService,
    getUploadUrl,
    uploadImage,
    deleteImage,
    getVodList,
    deleteVodService
}