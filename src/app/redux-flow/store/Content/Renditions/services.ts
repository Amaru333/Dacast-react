import { bulkActionsService } from '../../Common/bulkService';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getContentRenditionsService = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`${contentType}/${contentId}/renditions`)
}

const addContentRenditionsService = async (data: string[], contentId: string) => {
    return await bulkActionsService(data.map(item => {return {name: item, type: 'rendition'}}), 'create', contentId)
}
const deleteContentRenditionsService = async (data: string[], contentId: string) => {
    return await bulkActionsService(data.map(item => {return {id: item, type: 'rendition'}}), 'delete', contentId)
}

export const ContentRenditionsServices = {
    getContentRenditionsService,
    addContentRenditionsService,
    deleteContentRenditionsService
}