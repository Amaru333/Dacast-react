import { ChapterMarker } from './types'
import { axiosClient } from '../../../../utils/axiosClient'

const getVodChapterMarkersService = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/chapter-markers')
}

const saveVodChapterMarkerService = async (vodId: string, data: ChapterMarker[]) => {
    return await axiosClient.put('/vods/' + vodId + '/chapter-markers',
        {
            chapterMarkers: data
        } 
    )
}


export const VodChaptersServices = {
    getVodChapterMarkersService,
    saveVodChapterMarkerService
}