import axios from 'axios'
import { ChapterMarker } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodChapterMarkersService = () => {
    return axios.get(urlBase + 'chapters-list');
}

const saveVodChapterMarkerService = (data: ChapterMarker) => {
    return axios.put(urlBase + 'chapter', {...data})
}

const addVodChapterMarkerService = (data: ChapterMarker) => {
    return axios.post(urlBase + 'chapter', {...data})
}

const deleteVodChapterMarkerService = (data: ChapterMarker) => {
    return axios.delete(urlBase + 'chapter', {...data})
}


export const VodChaptersServices = {
    getVodChapterMarkersService,
    saveVodChapterMarkerService,
    addVodChapterMarkerService,
    deleteVodChapterMarkerService
}