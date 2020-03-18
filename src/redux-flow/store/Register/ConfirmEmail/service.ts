import axios from 'axios'

export const confirmEmail = (email: string) => {
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/confirm-email', {email: email})
}