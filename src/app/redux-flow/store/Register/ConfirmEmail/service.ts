import { axiosClient } from '../../../../utils/axiosClient'

export const confirmEmail = (email: string) => {
    return axiosClient.post('/confirm-email', {email: email}, {authRequired: false})
}