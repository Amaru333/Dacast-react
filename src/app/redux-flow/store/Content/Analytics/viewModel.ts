import { AudienceAnalyticsState, ContentAnalyticsFinalState, ContentAnalyticsState } from '.'
import { AnalyticsDimensions, GetContentAnalyticsInput, GetContentAnalyticsOutput, GetContentAnalyticsOutputItem, GetContentAnalyticsResultItemOutput, TimeRangeAnalytics } from '../../../../../DacastSdk/analytics'
import { tsToLocaleDate } from '../../../../../utils/formatUtils';
import { CountriesDetail } from '../../../../constants/CountriesDetails';
import { RealTimeAnalyticsState, SalesAnalyticsState, WatchAnalyticsState } from './types';


export const formatGetContentAnalyticsOutput = (response: GetContentAnalyticsOutput, data: GetContentAnalyticsInput): { contentId: string; contentType: string; data: ContentAnalyticsFinalState } => {

    var audienceData: AudienceAnalyticsState = {};
    var salesData: SalesAnalyticsState = {};
    var watchData: WatchAnalyticsState = {};
    var realTimeData: RealTimeAnalyticsState = {};

    console.log(data, "data")

    const formateTimestampAnalytics = (value: number) => {
        switch(data.timeRange) {
            case 'YEAR_TO_DATE':
            case 'LAST_6_MONTHS':
            case 'LAST_MONTH':
            case 'LAST_WEEK':
                return tsToLocaleDate(value);
            case 'LAST_DAY':
                return tsToLocaleDate(value,{hour: '2digit', minute: '2digit'} );
        }
    }
    
    const getLabels = (startDate: Date, stopDate: Date) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(formateTimestampAnalytics(new Date (currentDate).getTime()/1000));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    }

    const labelsFormate = (dimension: TimeRangeAnalytics) => {
        switch(dimension) {
            case 'YEAR_TO_DATE':
                var stopDate = new Date();
                var current = new Date(stopDate.getFullYear(), 0, 1);
                return getLabels(current, stopDate)
            case 'LAST_6_MONTHS':
                var stopDate = new Date();
                var current = new Date(stopDate.getFullYear(), stopDate.getMonth() -6, 1);
                return getLabels(current, stopDate)
            case 'LAST_MONTH':
                var stopDate = new Date();
                var current = new Date(stopDate.getFullYear(), stopDate.getMonth() - 1, 1);
                return getLabels(current, stopDate)
            case 'LAST_WEEK':
                var stopDate = new Date();
                var current = new Date(stopDate.getFullYear(), stopDate.getMonth() , stopDate.getDay() - 7);
                return getLabels(current, stopDate)
            case 'LAST_DAY':
                var stopDate = new Date();
                var current = new Date();
                current.setHours(current.getHours() - 24)
                return getLabels(current, stopDate)
        }
    }

    let labels = labelsFormate(data.timeRange);
    console.log(labels)


    const handleResultRealTime = async (element: GetContentAnalyticsResultItemOutput) => {
        element.results.forEach(metric => {
            switch(metric.dimension) {
                case "PLAYS_BY_TIME":
                    if(!metric.data.length) {
                        realTimeData.playsByTime = {data: [], labels: []}
                    } else {
                        metric.data.forEach(data => {
                            realTimeData.playsByTime = {
                                labels: [...(realTimeData.playsByTime ? realTimeData.playsByTime.labels : []), ...(!realTimeData.playsByTime || realTimeData.playsByTime.labels.indexOf(formateTimestampAnalytics(data.dimensionType.value)) < 0 ? [formateTimestampAnalytics(data.dimensionType.value)] : [])],
                                data: [...(realTimeData.playsByTime ? realTimeData.playsByTime.data : []), data.dimensionSum ]                        
                            }
                        })
                    }
                    break;
                case "IMPRESSIONS_BY_TIME":
                    if(!metric.data.length) {
                        realTimeData.viewersByTime = {data: [], labels: []}
                    } else {
                        metric.data.forEach(data => {
                            realTimeData.viewersByTime = {
                                labels: [...(realTimeData.viewersByTime ? realTimeData.viewersByTime.labels : []), ...(!realTimeData.viewersByTime || realTimeData.viewersByTime.labels.indexOf(formateTimestampAnalytics(data.dimensionType.value)) < 0 ? [formateTimestampAnalytics(data.dimensionType.value)] : [])],
                                data: [...(realTimeData.viewersByTime ? realTimeData.viewersByTime.data : []), data.dimensionSum ]                        
                            }
                        })
                    }
                    break;
                case "WATCHTIME_BY_DEVICE":
                    if(!metric.data.length) {
                        realTimeData.watchByDevice = {data: [], labels: []}
                    } else {
                        metric.data.forEach(data => {
                            realTimeData.watchByDevice = {
                                labels: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.labels : []), ...(!realTimeData.watchByDevice || realTimeData.watchByDevice.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])],
                                data: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.data : []), data.dimensionSum ]                        
                            }
                        })
                    }
                    break;
                case 'PLAYS_BY_COUNTRY':
                    if(!metric.data.length) {
                        realTimeData.playsByLocation = {data: []}
                    } else {
                        metric.data.forEach(data => {
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                            if (assosiatedCountry) {
                                realTimeData.playsByLocation = {
                                    data: [...(realTimeData.playsByLocation ? realTimeData.playsByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: data.dimensionSum
                                    }],
                                }
                            }
                        })
                    }
                    break;
            }
        })
    }
    const handleResultItem = async (element: GetContentAnalyticsResultItemOutput) => {
        element.results.forEach(metric => {
            if (metric.dimension.includes("PLAYS") || metric.dimension.includes("IMPRESSIONS")) {
                if(!metric.data.length) {
                    if(metric.dimension.includes("TIME")) {
                        audienceData.playsImpressionsByTime = { labels: [], plays: [], impressions: [], table: [] }
                    }
                    if(metric.dimension.includes("DEVICE")) {
                        audienceData.playsImpressionsByDevice = { labels: [], plays: [], impressions: [], table: [] }
                    }
                    if(metric.dimension.includes("COUNTRY")) {
                        audienceData.playsImpressionsByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimensionType.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!audienceData || !audienceData.playsImpressionsByTime) {
                                audienceData.playsImpressionsByTime = { labels: [], plays: [], impressions: [], table: [] }
                            }
                            audienceData.playsImpressionsByTime = {
                                labels: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.labels : []), ...(!audienceData.playsImpressionsByTime || audienceData.playsImpressionsByTime.labels.indexOf(formateTimestampAnalytics(data.dimensionType.value)) < 0 ? [formateTimestampAnalytics(data.dimensionType.value)] : [])],
                                plays: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.plays : []), ...(metric.dimension.includes("PLAYS") ? [data.dimensionSum] : [])],
                                impressions: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.impressions : []), ...(metric.dimension.includes("IMPRESSIONS") ? [data.dimensionSum] : [])],
                                table: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.table : []), { plays: metric.dimension.includes("PLAYS") ? data.dimensionSum : null, impressions: metric.dimension.includes("IMPRESSIONS") ? data.dimensionSum : null, label: formateTimestampAnalytics(data.dimensionType.value) } ]
                            }
                            break;
                        case 'DEVICE':
                            if (!audienceData || !audienceData.playsImpressionsByDevice) {
                                audienceData.playsImpressionsByDevice = { labels: [], plays: [], impressions: [], table: [] }
                            }
                            audienceData.playsImpressionsByDevice = {
                                labels: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.labels : []), ...(!audienceData.playsImpressionsByDevice || audienceData.playsImpressionsByDevice.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])],
                                plays: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.plays : []), ...(metric.dimension.includes("PLAYS") ? [data.dimensionSum] : [])],
                                impressions: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.impressions : []), ...(metric.dimension.includes("IMPRESSIONS") ? [data.dimensionSum] : [])],
                                table: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.table : [])]
                            }
                            break;
                        case 'COUNTRY':
                            if (!audienceData || !audienceData.playsImpressionsByLocation) {
                                audienceData.playsImpressionsByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                            if (assosiatedCountry) {
                                audienceData.playsImpressionsByLocation = {
                                    data: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: data.dimensionSum
                                    }],
                                    table: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.table : [])]
                                }
                            }
                            break;
                    }
                })
            }
            if (metric.dimension.includes("WATCHTIME")) {
                if(!metric.data.length) {
                    if(metric.dimension.includes("TIME")) {
                        watchData.watchByTime = { labels: [], data: [], table: [] }
                    }
                    if(metric.dimension.includes("DEVICE")) {
                        watchData.watchByDevice = { labels: [], data: [], table: [] }
                    }
                    if(metric.dimension.includes("COUNTRY")) {
                        watchData.watchByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimensionType.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!watchData || !watchData.watchByTime) {
                                watchData.watchByTime = { labels: [], data: [], table: [] }
                            }
                            watchData.watchByTime = {
                                labels: [...(watchData.watchByTime ? watchData.watchByTime.labels : []), ...(!watchData.watchByTime || watchData.watchByTime.labels.indexOf(formateTimestampAnalytics(data.dimensionType.value)) < 0 ? [formateTimestampAnalytics(data.dimensionType.value)] : [])],
                                data: [...(watchData.watchByTime ? watchData.watchByTime.data : []), data.dimensionSum],
                                table: [...(watchData.watchByTime ? watchData.watchByTime.table : [])]
                            }
                            break;
                        case 'DEVICE':
                            if (!watchData || !watchData.watchByDevice) {
                                watchData.watchByDevice = { labels: [], data: [], table: [] }
                            }
                            watchData.watchByDevice = {
                                labels: [...(watchData.watchByDevice ? watchData.watchByDevice.labels : []), data.dimensionType.value],
                                data: [...(watchData.watchByDevice ? watchData.watchByDevice.data : []), data.dimensionSum],
                                table: [...(watchData.watchByDevice ? watchData.watchByDevice.table : [])]
                            }
                            break;
                        case 'COUNTRY':
                            if (!watchData || !watchData.watchByLocation) {
                                watchData.watchByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                            if (assosiatedCountry) {
                                watchData.watchByLocation = {
                                    data: [...(watchData.watchByLocation ? watchData.watchByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: data.dimensionSum
                                    }],
                                    table: [...(watchData.watchByLocation ? watchData.watchByLocation.table : [])]
                                }
                            }
                            break;
                    }
                })
            }
            if (metric.dimension.includes("SALES") || metric.dimension.includes("REVENUES")) {
                if(!metric.data.length) {
                    if(metric.dimension.includes("TIME")) {
                        salesData.salesRevenuesByTime = { labels: [], sales: [], revenues: [], table: [] }
                    }
                    if(metric.dimension.includes("COUNTRY")) {
                        salesData.salesRevenuesByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimensionType.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!salesData || !salesData.salesRevenuesByTime) {
                                salesData.salesRevenuesByTime = { labels: [], sales: [], revenues: [], table: [] }
                            }
                            salesData.salesRevenuesByTime = {
                                labels: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.labels : []), ...(!salesData.salesRevenuesByTime || salesData.salesRevenuesByTime.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])],
                                sales: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.sales : []), ...(metric.dimension.includes("SALES")  ? [data.dimensionSum] : [])],
                                revenues: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.revenues : []), ...(metric.dimension.includes("REVENUES")  ? [data.dimensionSum] : [])],
                                table: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.table : [])]
                            }
                            break;
                        case 'COUNTRY':
                            if (!salesData || !salesData.salesRevenuesByLocation) {
                                salesData.salesRevenuesByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                            if (assosiatedCountry) {
                                salesData.salesRevenuesByLocation = {
                                    data: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: data.dimensionSum
                                    }],
                                    table: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.table : [])]
                                }
                            }
                            break;
                    }
                })
            }

        }
        )
    }

    if(data.timeRange.includes('MINUTE') || data.timeRange.includes('HOUR')) {
        response.forEach((element) => {
            handleResultRealTime(element)
        })
    } else {
        response.forEach((element) => {
            handleResultItem(element)
        })
    }
 

    return {
        contentId: data.id,
        contentType: data.type,
        data: {
            audience: Object.keys(audienceData).length === 0 && audienceData.constructor === Object ? undefined : audienceData,
            sales: Object.keys(salesData).length === 0 && salesData.constructor === Object ? undefined : salesData,
            watch: Object.keys(watchData).length === 0 && watchData.constructor === Object ? undefined : watchData,
        }
    }
}

export const formatGetContentAnalyticsInput = (data: GetContentAnalyticsInput): GetContentAnalyticsInput => {
    return data
}

