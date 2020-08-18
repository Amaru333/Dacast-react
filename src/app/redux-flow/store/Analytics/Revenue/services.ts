import axios from 'axios'
import { GetAnalyticsRevenueOptions } from '.';
import { axiosClient } from '../../../../utils/axiosClient';

var qs = require('qs');

const getAnalyticsRevenueService = async (options?: GetAnalyticsRevenueOptions) => {
    debugger
    console.log('revenue options', options)
    return await axiosClient.get('/analytics/revenue?' + qs.stringify(options))
}



export const AnalyticsRevenueServices = {
    getAnalyticsRevenueService
} 