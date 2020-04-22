import axios from 'axios'
import { Plans } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlanDetailsService = () => {
    return axios.get(urlBase + 'account/plans');
}

const changeActivePlanService = (data: Plans) => {
    return axios.put(urlBase + 'account/plans', {...data})
}

export const PlansServices = {
    getPlanDetailsService,
    changeActivePlanService
}