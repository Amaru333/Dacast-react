import axios from 'axios'
import { Plans } from './types';

const urlBase = 'https:/0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlanDetailsService = () => {
    return axios.get(urlBase + 'account/plans');
}

const changeActivePlanService = (data: Plans) => {
    return axios.post(urlBase + 'account/plans', {...data})
}

export const PlansServices = {
    getPlanDetailsService,
    changeActivePlanService
}