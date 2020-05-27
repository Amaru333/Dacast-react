import axios from 'axios'
import {UserInfo} from './types'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

export const signupService = (data: UserInfo) => {
    return axios.post(process.env.API_BASE_URL + '/accounts', {...data});
}