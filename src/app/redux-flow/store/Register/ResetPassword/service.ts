import axios from 'axios'

export const resetPassword = (email: string) => {
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/reset-password', {email: email})
}