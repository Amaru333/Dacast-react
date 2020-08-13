import axios from 'axios'
import { GetAnalyticsRevenueOptions } from '.';
import { axiosClient } from '../../../../utils/axiosClient';

var qs = require('qs');

const getAnalyticsRevenueService = async (options?: GetAnalyticsRevenueOptions) => {
    return await axiosClient.get('/analytics/revenue')
}



export const AnalyticsRevenueServices = {
    getAnalyticsRevenueService
} 