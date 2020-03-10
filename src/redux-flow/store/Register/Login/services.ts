import axios from 'axios'
import { LoginInfos } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

export const loginService = (data: LoginInfos) => {
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts', {...data});
}