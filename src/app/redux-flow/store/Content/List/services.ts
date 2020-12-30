import { axiosClient } from '../../../../utils/services/axios/axiosClient'

const deleteContentService = async (contentId: string, contentType: string) => {
    return await axiosClient.delete(`/${contentType}/${contentId}`)
}

export const contentListServices = {
    deleteContentService,
}