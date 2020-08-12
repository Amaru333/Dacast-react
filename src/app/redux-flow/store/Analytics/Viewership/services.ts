import axios from 'axios'
import { GetAnalyticsViewershipOptions } from '.';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { loopUntilCompleted } from '../../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');


const getAnalyticsViewership = async (options: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    var stringOption = qs.stringify(options);
    return axios.get(process.env.API_BASE_URL + '/analytics/viewership?'+stringOption ,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const AnalyticsViewershipServices = {
    getAnalyticsViewership,


} 