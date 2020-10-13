import { ContentSetupObject } from './types';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getContentSetupAction = async (contentId: string, contentType: string) => {
    if(contentType === 'exposs') {
        return {data: {data: []}}
    }
    return await axiosClient.get(`${contentType}/${contentId}/setup`)
}

const postContentSetupAction = async (contentData: ContentSetupObject, contentId: string, contentType: string) => {
    return await axiosClient.put(`${contentType}/${contentId}/setup`, 
        {
            ...contentData,
            title: undefined
        }
    )
}

export const ContentSetupServices = {
    getContentSetupAction,
    postContentSetupAction
}