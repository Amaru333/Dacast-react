import axios from 'axios'
import { LoginInfos } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

export const loginService = (data: LoginInfos) => {
    return axios.post('https://oau3rnx93f.execute-api.us-east-1.amazonaws.com/dev/login', {...data});
}