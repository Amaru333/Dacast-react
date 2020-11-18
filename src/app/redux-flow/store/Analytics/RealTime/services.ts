import axios from 'axios'
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

var qs = require('qs');

const getAnalyticsRealTime = async (options?: any) => {
    var stringOption = qs.stringify(options);
    return await axiosClient.get('/analytics/real-time?' + stringOption)
}

export const AnalyticsRealTimeServices = {
    getAnalyticsRealTime
} 