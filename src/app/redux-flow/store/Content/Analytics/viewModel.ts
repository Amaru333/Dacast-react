import { AudienceAnalyticsState, ContentAnalyticsFinalState } from '.'
import { GetContentAnalyticsInput, GetContentAnalyticsOutput, GetContentAnalyticsResultItemOutput } from '../../../../../DacastSdk/analytics'
import { tsToLocaleDate } from '../../../../../utils/formatUtils';
import { CountriesDetail } from '../../../../constants/CountriesDetails';
import { ContentAnalyticsParameters, RealTimeAnalyticsState, SalesAnalyticsState, TimeRangeAnalytics, WatchAnalyticsState } from './types';


export const formatGetContentAnalyticsOutput = (response: GetContentAnalyticsOutput, data: ContentAnalyticsParameters): { contentId: string; contentType: string; data: ContentAnalyticsFinalState } => {

    var audienceData: AudienceAnalyticsState = {};
    var salesData: SalesAnalyticsState = {};
    var watchData: WatchAnalyticsState = {};
    var realTimeData: RealTimeAnalyticsState = {};

    const formateTimestampAnalytics = (value: number) => {
        switch(data.time_range) {
            case 'YEAR_TO_DATE':
            case 'LAST_6_MONTHS':
            case 'LAST_MONTH':
            case 'LAST_WEEK':
                return tsToLocaleDate(value);
            case 'LAST_DAY':
            case 'LAST_15_MINUTES':
            case 'LAST_30_MINUTES':
            case 'LAST_45_MINUTES':
            case 'LAST_HOUR':
            case 'LAST_2_HOURS':
            case 'LAST_5_MINUTES':
            case 'LAST_90_MINUTES':
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
            case 'LAST_2_HOURS': 
                var stopDate = new Date();
                var current = new Date();
                current.setHours(current.getHours() - 24)
                return getLabels(current, stopDate)
        }
    }

    let labels = labelsFormate(data.time_range);

    const handleResultRealTime = async (element: GetContentAnalyticsResultItemOutput) => {
        element.results.forEach(metric => {
            switch(metric.data_dimension) {
                case "PLAYS_BY_TIME":
                    if(!metric.data.length) {
                        realTimeData.playsByTime = {data: [], labels: []}
                    } else {
                        realTimeData.playsByTime = {data: [].fill(0, 0, labels.length), labels: labels}
                        metric.data.forEach(data => {
                            realTimeData.playsByTime = {
                                labels: [...(realTimeData.playsByTime ? realTimeData.playsByTime.labels : []), ...(!realTimeData.playsByTime || realTimeData.playsByTime.labels.indexOf(formateTimestampAnalytics(data.dimension_type.value as number)) < 0 ? [formateTimestampAnalytics(data.dimension_type.value as number)] : [])],
                                data: [...(realTimeData.playsByTime ? realTimeData.playsByTime.data : []), data.dimension_sum ]                        
                            }
                        })
                    }
                    break;
                case "IMPRESSIONS_BY_TIME":
                    if(!metric.data.length) {
                        realTimeData.viewersByTime = {data: [], labels: []}
                    } else {
                        realTimeData.viewersByTime = {data: [].fill(0, 0, labels.length), labels: labels};
                        metric.data.forEach(data => {
                            realTimeData.viewersByTime = {
                                labels: [...(realTimeData.viewersByTime ? realTimeData.viewersByTime.labels : []), ...(!realTimeData.viewersByTime || realTimeData.viewersByTime.labels.indexOf(formateTimestampAnalytics(data.dimension_type.value as number)) < 0 ? [formateTimestampAnalytics(data.dimension_type.value as number)] : [])],
                                data: [...(realTimeData.viewersByTime ? realTimeData.viewersByTime.data : []), data.dimension_sum ]                        
                            }
                        })
                    }
                    break;
                case "WATCHTIME_BY_DEVICE":
                    if(!metric.data.length) {
                        realTimeData.watchByDevice = {data: [], labels: []}
                    } else {
                        realTimeData.watchByDevice = {data: [].fill(0, 0, labels.length), labels: labels}
                        metric.data.forEach(data => {
                            realTimeData.watchByDevice = {
                                labels: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.labels : []), ...(!realTimeData.watchByDevice || realTimeData.watchByDevice.labels.indexOf(data.dimension_type.value.toString()) < 0 ? [data.dimension_type.value.toString()] : [])],
                                data: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.data : []), data.dimension_sum ]                        
                            }
                        })
                    }
                    break;
                case 'PLAYS_BY_COUNTRY':
                    if(!metric.data.length) {
                        realTimeData.playsByLocation = {data: []}
                    } else {
                        metric.data.forEach(data => {
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                            if (assosiatedCountry) {
                                realTimeData.playsByLocation = {
                                    data: [...(realTimeData.playsByLocation ? realTimeData.playsByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: data.dimension_sum
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
            if (metric.data_dimension.includes("PLAYS") || metric.data_dimension.includes("IMPRESSIONS")) {
                if(!metric.data.length) {
                    if(metric.data_dimension.includes("TIME")) {
                        audienceData.playsImpressionsByTime = { labels: [], plays: [], impressions: [], table: [] }
                    }
                    if(metric.data_dimension.includes("DEVICE")) {
                        audienceData.playsImpressionsByDevice = { labels: [], plays: [], impressions: [], table: [] }
                    }
                    if(metric.data_dimension.includes("COUNTRY")) {
                        audienceData.playsImpressionsByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimension_type.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!audienceData || !audienceData.playsImpressionsByTime) {
                                audienceData.playsImpressionsByTime = { labels: [], plays: [], impressions: [], table: [] }
                            } else {
                                audienceData.playsImpressionsByTime  = {plays: [].fill(0, 0, labels.length), impressions: [].fill(0, 0, labels.length), labels: labels, table: []}
                                audienceData.playsImpressionsByTime = {
                                    labels: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.labels : []), ...(!audienceData.playsImpressionsByTime || audienceData.playsImpressionsByTime.labels.indexOf(formateTimestampAnalytics(data.dimension_type.value as number)) < 0 ? [formateTimestampAnalytics(data.dimension_type.value as number)] : [])],
                                    plays: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.plays : []), ...(metric.data_dimension.includes("PLAYS") ? [data.dimension_sum] : [])],
                                    impressions: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.impressions : []), ...(metric.data_dimension.includes("IMPRESSIONS") ? [data.dimension_sum] : [])],
                                    table: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.table : []), { plays: metric.data_dimension.includes("PLAYS") ? data.dimension_sum : null, impressions: metric.data_dimension.includes("IMPRESSIONS") ? data.dimension_sum : null, label: formateTimestampAnalytics(data.dimension_type.value as number) } ]
                                }
                            }
                            break;
                        case 'DEVICE':
                            if (!audienceData || !audienceData.playsImpressionsByDevice) {
                                audienceData.playsImpressionsByDevice = { labels: [], plays: [], impressions: [], table: [] }
                            } else {
                                audienceData.playsImpressionsByDevice  = {plays: [].fill(0, 0, labels.length), impressions: [].fill(0, 0, labels.length), labels: labels, table: []}
                                audienceData.playsImpressionsByDevice = {
                                    labels: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.labels : []), ...(!audienceData.playsImpressionsByDevice || audienceData.playsImpressionsByDevice.labels.indexOf(data.dimension_type.value.toString()) < 0 ? [data.dimension_type.value.toString()] : [])],
                                    plays: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.plays : []), ...(metric.data_dimension.includes("PLAYS") ? [data.dimension_sum] : [])],
                                    impressions: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.impressions : []), ...(metric.data_dimension.includes("IMPRESSIONS") ? [data.dimension_sum] : [])],
                                    table: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.table : [])]
                                }
                            }
                            
                            break;
                        case 'COUNTRY':
                            if (!audienceData || !audienceData.playsImpressionsByLocation) {
                                audienceData.playsImpressionsByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                            if (assosiatedCountry) {
                                audienceData.playsImpressionsByLocation = {
                                    data: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: data.dimension_sum
                                    }],
                                    table: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.table : [])]
                                }
                            }
                            break;
                    }
                })
            }
            if (metric.data_dimension.includes("WATCHTIME")) {
                if(!metric.data.length) {
                    if(metric.data_dimension.includes("TIME")) {
                        watchData.watchByTime = { labels: [], data: [], table: [] }
                    }
                    if(metric.data_dimension.includes("DEVICE")) {
                        watchData.watchByDevice = { labels: [], data: [], table: [] }
                    }
                    if(metric.data_dimension.includes("COUNTRY")) {
                        watchData.watchByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimension_type.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!watchData || !watchData.watchByTime) {
                                watchData.watchByTime = { labels: [], data: [], table: [] }
                            } else {
                                watchData.watchByTime  = {data: [].fill(0, 0, labels.length), labels: labels, table: []}
                                watchData.watchByTime = {
                                    labels: [...(watchData.watchByTime ? watchData.watchByTime.labels : []), ...(!watchData.watchByTime || watchData.watchByTime.labels.indexOf(formateTimestampAnalytics(data.dimension_type.value as number)) < 0 ? [formateTimestampAnalytics(data.dimension_type.value as number)] : [])],
                                    data: [...(watchData.watchByTime ? watchData.watchByTime.data : []), data.dimension_sum],
                                    table: [...(watchData.watchByTime ? watchData.watchByTime.table : [])]
                                }
                            }
                            break;
                        case 'DEVICE':
                            if (!watchData || !watchData.watchByDevice) {
                                watchData.watchByDevice = { labels: [], data: [], table: [] }
                            } else {
                                watchData.watchByDevice  = {data: [].fill(0, 0, labels.length), labels: labels, table: []}
                                watchData.watchByDevice = {
                                    labels: [...(watchData.watchByDevice ? watchData.watchByDevice.labels : []), data.dimension_type.value.toString()],
                                    data: [...(watchData.watchByDevice ? watchData.watchByDevice.data : []), data.dimension_sum],
                                    table: [...(watchData.watchByDevice ? watchData.watchByDevice.table : [])]
                                }
                            }
                           
                            break;
                        case 'COUNTRY':
                            if (!watchData || !watchData.watchByLocation) {
                                watchData.watchByLocation = { data: [], table: [] }
                            } else {
                                const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                                if (assosiatedCountry) {
                                    watchData.watchByLocation = {
                                        data: [...(watchData.watchByLocation ? watchData.watchByLocation.data : []), {
                                            city: assosiatedCountry["\"Country\""],
                                            position: {
                                                latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                            },
                                            value: data.dimension_sum
                                        }],
                                        table: [...(watchData.watchByLocation ? watchData.watchByLocation.table : [])]
                                    }
                                }
                            }
                            break;
                    }
                })
            }
            if (metric.data_dimension.includes("SALES") || metric.data_dimension.includes("REVENUES")) {
                if(!metric.data.length) {
                    if(metric.data_dimension.includes("TIME")) {
                        salesData.salesRevenuesByTime = { labels: [], sales: [], revenues: [], table: [] }
                    }
                    if(metric.data_dimension.includes("COUNTRY")) {
                        salesData.salesRevenuesByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimension_type.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!salesData || !salesData.salesRevenuesByTime) {
                                salesData.salesRevenuesByTime = { labels: [], sales: [], revenues: [], table: [] }
                            } else {
                                salesData.salesRevenuesByTime  = {sales: [].fill(0, 0, labels.length), revenues: [].fill(0, 0, labels.length), labels: labels, table: []}
                                salesData.salesRevenuesByTime = {
                                    labels: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.labels : []), ...(!salesData.salesRevenuesByTime || salesData.salesRevenuesByTime.labels.indexOf(formateTimestampAnalytics(data.dimension_type.value as number)) < 0 ? [formateTimestampAnalytics(data.dimension_type.value as number)] : [])],
                                    sales: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.sales : []), ...(metric.data_dimension.includes("SALES")  ? [data.dimension_sum] : [])],
                                    revenues: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.revenues : []), ...(metric.data_dimension.includes("REVENUES")  ? [data.dimension_sum] : [])],
                                    table: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.table : [])]
                                }
                            }
                            
                            break;
                        case 'COUNTRY':
                            if (!salesData || !salesData.salesRevenuesByLocation) {
                                salesData.salesRevenuesByLocation = { data: [], table: [] }
                            } else {
                                const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                                if (assosiatedCountry) {
                                    salesData.salesRevenuesByLocation = {
                                        data: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.data : []), {
                                            city: assosiatedCountry["\"Country\""],
                                            position: {
                                                latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                            },
                                            value: data.dimension_sum
                                        }],
                                        table: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.table : [])]
                                    }
                                }
                            }
                            break;
                    }
                })
            }

        }
        )
    }   
    console.log('response', response)
    if(data.time_range.includes('MINUTE') || data.time_range.includes('HOUR')) {   
        handleResultRealTime(response)
    } else {
        handleResultItem(response)
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

export const formatGetContentAnalyticsInput = (data: ContentAnalyticsParameters): GetContentAnalyticsInput => {
    let formattedData: GetContentAnalyticsInput = {
        id: data.id,
        dimension: data.dimension,
        time_range: data.timeRange,
        type: data.type
    }
    return formattedData
}

