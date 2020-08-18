import { ChapterMarker } from './types'
import { axiosClient } from '../../../../utils/axiosClient'

const getContentChapterMarkersService = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`${contentType}/${contentId}/chapter-markers`)
}

const saveContentChapterMarkerService = async (contentId: string, contentType: string, data: ChapterMarker[]) => {
    return await axiosClient.put(`${contentType}/${contentId}/chapter-markers`,
        {
            chapterMarkers: data
        } 
    )
}


export const ContentChaptersServices = {
    getContentChapterMarkersService,
    saveContentChapterMarkerService
}