import axios from 'axios'
import { GetAnalyticsDashboardOptions } from '.';
import { axiosClient } from '../../../../utils/axiosClient';

var qs = require('qs');

const getAnalyticsDashboard = async (options?: GetAnalyticsDashboardOptions) => {
    var stringOption = qs.stringify(options)
    return await axiosClient.get('/analytics/dashboard?' + stringOption)
}

export const AnalyticsDashboardServices = {
    getAnalyticsDashboard
} 