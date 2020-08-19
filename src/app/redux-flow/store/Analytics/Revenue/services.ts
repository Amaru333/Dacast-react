import { GetAnalyticsRevenueOptions } from '.';
import { axiosClient } from '../../../../utils/axiosClient';

const getAnalyticsRevenueService = async (options?: GetAnalyticsRevenueOptions) => {
    return await axiosClient.get( options ? `/analytics/revenue?contentIDs=${options.selectedContents}&start=${options.startDate}&end=${options.endDate}` :'/analytics/revenue' )
}



export const AnalyticsRevenueServices = {
    getAnalyticsRevenueService
} 