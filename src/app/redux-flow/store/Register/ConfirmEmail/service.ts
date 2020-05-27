import axios from 'axios'

export const confirmEmail = (email: string) => {
    return axios.post(process.env.API_BASE_URL + '/confirm-email', {email: email})
}