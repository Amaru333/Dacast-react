import axios from 'axios'
import { GetAnalyticsViewershipOptions } from '.';
import { axiosClient } from '../../../../utils/axiosClient';

var qs = require('qs');

const getAnalyticsViewership = async (options: GetAnalyticsViewershipOptions) => {
    var stringOption = qs.stringify(options);
    return await axiosClient.get('/analytics/viewership?' + stringOption)
}

export const AnalyticsViewershipServices = {
    getAnalyticsViewership,


} 