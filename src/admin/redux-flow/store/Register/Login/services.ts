import axios from 'axios'
import { LoginInfos } from './types';
import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient';

export const loginService = async (data: LoginInfos) => {
   return await axiosClient.post(process.env.API_BASE_URL + '/sessions/login', {...data}, {authRequired: false})
}