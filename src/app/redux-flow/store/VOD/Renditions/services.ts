import { bulkActionsService } from '../../Common/bulkService';
import { axiosClient } from '../../../../utils/axiosClient';

const getVodRenditionsService = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/renditions')
}

const addVodRenditionsService = async (data: string[], vodId: string) => {
    return await bulkActionsService(data.map(item => {return {name: item, type: 'rendition'}}), 'create', vodId)
}
const deleteVodRenditionsService = async (data: string[], vodId: string) => {
    return await bulkActionsService(data.map(item => {return {id: item, type: 'rendition'}}), 'delete', vodId)
}

export const VodRenditionsServices = {
    getVodRenditionsService,
    addVodRenditionsService,
    deleteVodRenditionsService
}