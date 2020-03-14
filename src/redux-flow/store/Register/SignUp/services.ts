import axios from 'axios'
import {UserInfo} from './types'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

export const signupService = (data: UserInfo) => {
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts', {...data});
}

export const confirmEmail = (email: string) => {
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/confirm-email', {data: email})
}