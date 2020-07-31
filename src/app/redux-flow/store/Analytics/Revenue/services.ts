import axios from 'axios'
import { GetAnalyticsRevenueOptions } from '.';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsRevenueService = async (options?: GetAnalyticsRevenueOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/analytics/revenue',
        {
            headers: {
                Authorization: token
            }
        }
    )
}



export const AnalyticsRevenueServices = {
    getAnalyticsRevenueService
} 