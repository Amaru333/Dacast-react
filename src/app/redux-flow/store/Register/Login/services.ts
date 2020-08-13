import { LoginInfos } from './types';
import { axiosClient } from '../../../../utils/axiosClient';

export const loginService = async (data: LoginInfos) => {
    return await axiosClient.post('/sessions/login', {...data}, {authRequired: false});
}