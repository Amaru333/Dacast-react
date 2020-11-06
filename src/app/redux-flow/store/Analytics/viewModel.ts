import { GetRevenueAnalyticsOutput, GetRevenueAnalyticsInput, GetDataAnalyticsOutput, GetAudienceAnalyticsOutput, GetAudienceAnalyticsInput } from '../../../../DacastSdk/analytics'
import { AudienceAnalyticsState, DataAnalyticsState, SalesAnalyticsState } from '../Content/Analytics'

export const formatGetRevenueAnalyticsOutput = (response: GetRevenueAnalyticsOutput): { data: SalesAnalyticsState } => {
    return {
        data: {
            salesRevenuesByTime: {
                labels: ["01-01-2020", "01-02-2020", "01-03-2020", "01-04-2020", "01-05-2020", "01-06-2020", "01-06-2020", "01-07-2020", "01-08-2020", "01-09-2020", "01-10-2020", "01-11-2020", "01-12-2020", "01-13-2020"],
                sales: [510, 213, 271, 1239, 133, 672, 245, 212, 562, 245, 324, 592, 912, 134],
                revenues: [5101, 2113, 2721, 10239, 1313, 6742, 2425, 2112, 5644, 2435, 3244, 5932, 9122, 1343],
                table: [  ]
            },
            salesRevenuesByLocation: [
                { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
            ],
            salesRevenuesByDevice: {
                labels: ["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"],
                sales: [810, 345, 144, 1539, 1353, 672],
                revenues: [11021, 2133, 2711, 10239, 3313, 9742]
            }
        }
    }
}

export const formatGetRevenueAnalyticsInput = (data: any): GetRevenueAnalyticsInput => {
    return data
}

export const formatGetDataAnalyticsOutput = (response: GetDataAnalyticsOutput): { data: DataAnalyticsState } => {
    return {
        data: {
            dataByTime: {
                labels: ["01-01-2020", "01-02-2020", "01-03-2020", "01-04-2020", "01-05-2020", "01-06-2020", "01-06-2020", "01-07-2020", "01-08-2020", "01-09-2020", "01-10-2020", "01-11-2020", "01-12-2020", "01-13-2020"],
                data: [510, 213, 271, 1239, 133, 672, 245, 212, 562, 245, 324, 592, 912, 134],
            },
            dataByDevice: {
                labels: ["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"],
                data:  [8120, 3435, 1424, 1539, 4353, 6724],
            },
            dataByLocation: [
                { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
            ]
        }
    }
}

export const formatGetDataAnalyticsInput = (data: any): GetAudienceAnalyticsInput => {
    return data
}

export const formatGetAudienceAnalyticsOutput = (response: GetAudienceAnalyticsOutput): { data: AudienceAnalyticsState } => {
    return {
        data: {
            playsImpressionsByTime: {
                labels: ["01-01-2020", "01-02-2020", "01-03-2020", "01-04-2020", "01-05-2020", "01-06-2020", "01-06-2020", "01-07-2020", "01-08-2020", "01-09-2020", "01-10-2020", "01-11-2020", "01-12-2020", "01-13-2020"],
                plays: [45, 12, 19, 12, 26, 12, 9, 12, 14, 24, 37, 45, 58, 41],
                impressions: [51, 23, 27, 19, 34, 17, 16, 21, 25, 39, 48, 59, 67, 52],
            },
            playsImpressionsByDevice: {
                labels: ["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"],
                plays: [26, 12, 9, 12, 14, 24],
                impressions: [42, 27, 18, 29, 19, 38],
            },
            playsImpressionsByLocation: [
                { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
            ]
        }
    }
}

export const formatGetAudienceAnalyticsInput = (data: any): GetRevenueAnalyticsInput => {
    return data
}
