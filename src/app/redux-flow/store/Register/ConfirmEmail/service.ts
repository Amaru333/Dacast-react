import { axiosClient } from '../../../../utils/services/axios/axiosClient'

export const confirmEmail = (email: string) => {
    return axiosClient.post('/confirm-email', {email: email}, {authRequired: false})
}