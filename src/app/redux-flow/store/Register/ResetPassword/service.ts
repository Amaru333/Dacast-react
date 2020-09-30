import { axiosClient } from '../../../../utils/services/axios/axiosClient'

export const resetPassword = async (email: string) => {
    return await axiosClient.post('/reset-password/send-token', {email: email}, {authRequired: false})
}