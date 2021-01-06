import { ActionTypes, SearchResult, } from "./types"
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { formatDeleteContentInput, formatGetContentListInput, formatGetContentListOutput } from './viewModel'
import { ContentType } from '../../Common/types'

export interface GetContentList {
    type: ActionTypes.GET_CONTENT_LIST;
    payload: {data: SearchResult, contentType: string, countTotal?: number };
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: {id: string};
}

export const getContentListAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVods, formatGetContentListInput, formatGetContentListOutput(contentType), ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t get vods list')
        case 'live':
            return applyViewModel(dacastSdk.getChannels, formatGetContentListInput, formatGetContentListOutput(contentType), ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t get live streams list')
        case 'playlist':
            return applyViewModel(dacastSdk.getPlaylists, formatGetContentListInput, formatGetContentListOutput(contentType), ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t get playlists list')
        case 'expo': 
            return applyViewModel(dacastSdk.getExpos, formatGetContentListInput, formatGetContentListOutput(contentType), ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t get expos list')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const deleteContentAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.deleteVod, formatDeleteContentInput, undefined, ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t delete vod')
        case 'live':
            return applyViewModel(dacastSdk.deleteChannel, formatDeleteContentInput, undefined, ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t delete livestream')
        case 'playlist':
            return applyViewModel(dacastSdk.deletePlaylist, formatDeleteContentInput, undefined, ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t delete playlist')
        case 'expo': 
            return applyViewModel(dacastSdk.deleteExpo, formatDeleteContentInput, undefined, ActionTypes.GET_CONTENT_LIST, null, 'Couldn\'t delete expo')
        default:
            throw new Error('Error applying delete content view model')
    }
}

export type Action = GetContentList | DeleteContent