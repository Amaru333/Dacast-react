import axios from 'axios'
import { ChapterMarker } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/'

const getVodChapterMarkersService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/vods/' + vodId + '/chapter-markers', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodChapterMarkerService = async (vodId: string, data: ChapterMarker[]) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/vods/' + vodId + '/chapter-markers',
        {chapterMarkers: data}, 
        {
            headers: {
                Authorization: token
            }
        })
}


export const VodChaptersServices = {
    getVodChapterMarkersService,
    saveVodChapterMarkerService
}