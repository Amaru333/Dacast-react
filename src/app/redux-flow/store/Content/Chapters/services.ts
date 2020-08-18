import { ChapterMarker } from './types'
import { axiosClient } from '../../../../utils/axiosClient'

const getContentChapterMarkersService = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/chapter-markers')
}

const saveContentChapterMarkerService = async (vodId: string, data: ChapterMarker[]) => {
    return await axiosClient.put('/vods/' + vodId + '/chapter-markers',
        {
            chapterMarkers: data
        } 
    )
}


export const ContentChaptersServices = {
    getContentChapterMarkersService,
    saveContentChapterMarkerService
}