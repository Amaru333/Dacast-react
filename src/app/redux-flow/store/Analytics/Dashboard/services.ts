import axios from 'axios'
import { GetAnalyticsDashboardOptions } from '.';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';
import { loopUntilCompleted } from '../../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');



const getAnalyticsDashboard = async (options?: GetAnalyticsDashboardOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var stringOption = qs.stringify(options);
    return axios.get(process.env.API_BASE_URL + '/analytics/dashboard?'+stringOption, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const AnalyticsDashboardServices = {
    getAnalyticsDashboard
} 