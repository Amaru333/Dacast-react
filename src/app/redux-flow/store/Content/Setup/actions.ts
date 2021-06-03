import { ActionTypes, ContentSetupObject} from "./types";
import { applyViewModel } from '../../../../utils/utils';
import { ContentType } from "../../Common/types";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatGetContentSetupInput, formatGetExpoSetupOutput, formatGetPlaylistSetupOutput, formatPutContentSetupOutput, formatPutExpoSetupInput, formatPutPlaylistSetupInput } from "./viewModel";

export interface GetContentSetup {
    type: ActionTypes.GET_CONTENT_SETUP;
    payload: {contentId: string; contentType: ContentType; data: ContentSetupObject};
}

export interface PostContentSetup {
    type: ActionTypes.POST_CONTENT_SETUP;
    payload:  {contentType: ContentType; data: ContentSetupObject};
}

export const getContentSetupAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'playlist': 
            return applyViewModel(dacastSdk.getPlaylistSetup, formatGetContentSetupInput, formatGetPlaylistSetupOutput(contentType), ActionTypes.GET_CONTENT_SETUP, null, 'Couldn\'t get playlist setup')
        case 'expo':
            return applyViewModel(dacastSdk.getExpoSetup, formatGetContentSetupInput, formatGetExpoSetupOutput(contentType), ActionTypes.GET_CONTENT_SETUP, null, 'Couldn\'t get expo setup')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const postContentSetupAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'playlist': 
            return applyViewModel(dacastSdk.putPlaylistSetup, formatPutPlaylistSetupInput, formatPutContentSetupOutput(contentType), ActionTypes.POST_CONTENT_SETUP, 'Changes saved', 'Couldn\'t save changes')
        case 'expo':
            return applyViewModel(dacastSdk.putExpoSetup, formatPutExpoSetupInput, formatPutContentSetupOutput(contentType), ActionTypes.POST_CONTENT_SETUP, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export type Action = GetContentSetup | PostContentSetup