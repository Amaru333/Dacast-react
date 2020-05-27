import axios from 'axios'

export const resetPassword = (email: string) => {
    return axios.post(process.env.API_BASE_URL + '/reset-password/send-token', {email: email})
}