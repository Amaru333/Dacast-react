import { LoginInfos } from './types';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

export const loginService = async (data: LoginInfos) => {
    return await axiosClient.post('/sessions/login', {...data}, {authRequired: false});
}