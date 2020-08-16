import axios from 'axios'
import { LoginInfos } from './types';

export const loginService = (data: LoginInfos) => {
    return axios.post(process.env.API_BASE_URL + '/sessions/login', {...data});
}