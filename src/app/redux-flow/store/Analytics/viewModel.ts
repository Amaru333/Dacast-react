import { GetRevenueAnalyticsOutput, GetRevenueAnalyticsInput, GetDataAnalyticsOutput, GetAudienceAnalyticsOutput, GetAudienceAnalyticsInput } from '../../../../DacastSdk/analytics'
import { AudienceAnalyticsState, DataAnalyticsState, SalesAnalyticsState } from '../Content/Analytics'

export const formatGetRevenueAnalyticsOutput = (response: GetRevenueAnalyticsOutput): { data: SalesAnalyticsState } => {
    return {
        data: {
            salesRevenuesByTime: {
                labels: ["01-01-2020", "01-02-2020", "01-03-2020", "01-04-2020", "01-05-2020", "01-06-2020", "01-07-2020", "01-08-2020", "01-09-2020", "01-10-2020", "01-11-2020", "01-12-2020", "01-13-2020", "01-14-2020"],
                sales: [510, 213, 271, 1239, 133, 672, 245, 212, 562, 245, 324, 592, 912, 134],
                revenues: [5101, 2113, 2721, 10239, 1313, 6742, 2425, 2112, 5644, 2435, 3244, 5932, 9122, 1343],
                table: [{ sales: 510, revenues: 5101, label: "01-01-2020" }, { sales: 213, revenues: 2721, label: "01-02-2020" },
                { sales: 271, revenues: 2721, label: "01-03-2020" }, { sales: 1239, revenues: 10239, label: "01-04-2020" }, { sales: 133, revenues: 1313, label: "01-05-2020" },
                { sales: 672, revenues: 6742, label: "01-06-2020" }, { sales: 245, revenues: 2425, label: "01-07-2020" }, { sales: 212, revenues: 2112, label: "01-08-2020" },
                { sales: 562, revenues: 5644, label: "01-09-2020" }, { sales: 245, revenues: 2435, label: "01-10-2020" }, { sales: 324, revenues: 5932, label: "01-11-2020" },
                { sales: 912, revenues: 9122, label: "01-12-2020" }, { sales: 134, revenues: 1343, label: "01-13-2020" }, { sales: 134, revenues: 1343, label: "01-14-2020" }]
            },
            salesRevenuesByLocation: {
                data: [
                    { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                    { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                    { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                    { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
                ],
                table: [{ revenues: 9392, label: 'New York City' }, { revenues: 7602, label: "Annecy" }, { revenues: 12349, label: 'San Francisco' }, { revenues: 5402, label: 'Londres' }]
            },
            salesRevenuesByDevice: {
                labels: ["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"],
                sales: [810, 345, 144, 1539, 1353, 672],
                revenues: [11021, 2133, 2711, 10239, 3313, 9742],
                table: [{ sales: 810, revenues: 11021, label: "Firefox on Windows" }, { sales: 345, revenues: 2133, label: "Chrome on Mac" }, { sales: 144, revenues: 2711, label: "Safari on Mac" }, { sales: 1539, revenues: 10239, label: "Opera on Windows" }
                    , { sales: 1353, revenues: 3313, label: "Chrome on Linux" }, { sales: 672, revenues: 9742, label: "Edge on Windows" },]
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
                table: [{ data: 510, label: "01-01-2020" }, { data: 213, label: "01-02-2020" },
                { data: 271, label: "01-03-2020" }, { data: 1239, label: "01-04-2020" }, { data: 133, label: "01-05-2020" }, { data: 672, label: "01-06-2020" },
                { data: 245, label: "01-07-2020" }, { data: 212, label: "01-08-2020" }, { data: 562, label: "01-09-2020" }, { data: 245, label: "01-10-2020" }, { data: 324, label: "01-11-2020" },
                { data: 592, label: "01-12-2020" }, { data: 912, label: "01-13-2020" }, { data: 134, label: "01-14-2020" }]

            },
            dataByDevice: {
                labels: ["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"],
                data: [8120, 3435, 1424, 1539, 4353, 6724],
                table: [{ data: 8120, label: "Firefox on Windows" }, { data: 3435, label: "Chrome on Mac" }, { data: 1424, label: "Safari on Mac" }, { data: 1539, label: "Opera on Windows" }, { data: 4353, label: "Chrome on Linux" }, { data: 6724, label: "Edge on Windows" }]
            },
            dataByLocation: {
                data: [
                    { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                    { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                    { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                    { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
                ],
                table: [{ data: 9392, label: 'New York City' }, { data: 7602, label: "Annecy" }, { data: 12349, label: 'San Francisco' }, { data: 5402, label: 'Londres' }]
            }
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
                labels: ["01-01-2020", "01-02-2020", "01-03-2020", "01-04-2020", "01-05-2020", "01-06-2020", "01-07-2020", "01-08-2020", "01-09-2020", "01-10-2020", "01-11-2020", "01-12-2020", "01-13-2020", "01-14-2020"],
                plays: [45, 12, 19, 12, 26, 12, 9, 12, 14, 24, 37, 45, 58, 41],
                impressions: [51, 23, 27, 19, 34, 17, 16, 21, 25, 39, 48, 45, 67, 52],
                table: [{ plays: 45, impressions: 51, label: "01-01-2020" }, { plays: 12, impressions: 23, label: "01-02-2020" },
                { plays: 19, impressions: 27, label: "01-03-2020" }, { plays: 12, impressions: 19, label: "01-04-2020" }, { plays: 26, impressions: 34, label: "01-05-2020" },
                { plays: 12, impressions: 17, label: "01-06-2020" }, { plays: 9, impressions: 16, label: "01-07-2020" }, { plays: 12, impressions: 21, label: "01-08-2020" },
                { plays: 14, impressions: 25, label: "01-09-2020" }, { plays: 24, impressions: 39, label: "01-10-2020" }, { plays: 37, impressions: 48, label: "01-11-2020" },
                { plays: 45, impressions: 45, label: "01-12-2020" }, { plays: 58, impressions: 67, label: "01-13-2020" }, { plays: 41, impressions: 52, label: "01-14-2020" }]
            },
            playsImpressionsByDevice: {
                labels: ["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"],
                plays: [26, 12, 9, 12, 14, 24],
                impressions: [42, 27, 18, 29, 19, 38],
                table: [{ plays: 26, impressions: 42, label: "Firefox on Windows" }, { plays: 12, impressions: 27, label: "Chrome on Mac" }, { plays: 9, impressions: 27, label: "Safari on Mac" },
                { plays: 12, impressions: 29, label: "Opera on Windows" }, { plays: 14, impressions: 19, label: "Chrome on Linux" }, { plays: 24, impressions: 38, label: "Chrome on Linux" }
                ]
            },
            playsImpressionsByLocation:
            {
                data: [
                    { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                    { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                    { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                    { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
                ],
                table: [{ plays: 93, label: 'New York City' }, { plays: 762, label: "Annecy" }, { plays: 123, label: 'San Francisco' }, { plays: 19, label: 'Londres' }]
            }
        }
    }
}

export const formatGetAudienceAnalyticsInput = (data: any): GetRevenueAnalyticsInput => {
    return data
}
