import { ContentSetupObject } from './types';
import { axiosClient } from '../../../../utils/axiosClient';

const getContentSetupAction = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`${contentType}/${contentId}/setup`)
}

const postContentSetupAction = async (contentData: ContentSetupObject, contentId: string, contentType: string) => {
    return await axiosClient.put(`${contentType}/${contentId}/setup`, 
        {
            ...contentData,
            title: null
        }
    )
}

export const ContentSetupServices = {
    getContentSetupAction,
    postContentSetupAction
}