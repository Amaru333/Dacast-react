import { AudienceAnalyticsState, ContentAnalyticsFinalState } from '.'
import { DimensionItemType, GetContentAnalyticsInput, GetContentAnalyticsOutput, GetContentAnalyticsResultItemOutput } from '../../../../../DacastSdk/analytics'
import { tsToLocaleDate } from '../../../../../utils/formatUtils';
import { CountriesDetail } from '../../../../constants/CountriesDetails';
import { ContentAnalyticsParameters, RealTimeAnalyticsState, SalesAnalyticsState, TimeRangeAnalytics, WatchAnalyticsState } from './types';


export const formatGetContentAnalyticsOutput = (response: GetContentAnalyticsOutput, data: ContentAnalyticsParameters): { contentId: string; contentType: string; data: ContentAnalyticsFinalState } => {

    var audienceData: AudienceAnalyticsState = {};
    var salesData: SalesAnalyticsState = {};
    var watchData: WatchAnalyticsState = {};
    var realTimeData: RealTimeAnalyticsState = {};

    const formateTimestampAnalytics = (value: number) => {
        switch (data.timeRange) {
            case 'YEAR_TO_DATE':
            case 'LAST_6_MONTHS':
            case 'LAST_MONTH':
            case 'LAST_WEEK':
            case 'CUSTOM':
                return tsToLocaleDate(value);
            case 'LAST_24_HOURS':
            case 'LAST_15_MINUTES':
            case 'LAST_30_MINUTES':
            case 'LAST_45_MINUTES':
            case 'LAST_HOUR':
            case 'LAST_2_HOURS':
            case 'LAST_5_MINUTES':
            case 'LAST_90_MINUTES':
                return tsToLocaleDate(value, { hour: '2-digit', minute: '2-digit' });
        }
    }

    /**
     * Adds time to a date. Modelled after MySQL DATE_ADD function.
     * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
     * https://stackoverflow.com/a/1214753/18511
     * 
     * @param date  Date to start with
     * @param interval  One of: year, quarter, month, week, day, hour, minute, second
     * @param units  Number of units of the given interval to add.
     */
    function dateAdd(date: Date, interval: 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second', units: number) {
        if (!(date instanceof Date))
            return undefined;
        var ret = new Date(date); //don't change original date
        var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
        switch (String(interval).toLowerCase()) {
            case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
            case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
            case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
            case 'week': ret.setDate(ret.getDate() + 7 * units); break;
            case 'day': ret.setDate(ret.getDate() + units); break;
            case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
            case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
            case 'second': ret.setTime(ret.getTime() + units * 1000); break;
            default: ret = undefined; break;
        }
        return ret;
    }

    const getLabels = (startDate: Date, stopDate: Date, type: DimensionItemType) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(formateTimestampAnalytics(new Date(currentDate).getTime() / 1000));
            switch (type) {
                case '5_MINUTES':
                    currentDate = dateAdd(currentDate, 'minute', 5);
                    break;
                case 'HOURLY':
                    currentDate = dateAdd(currentDate, 'hour', 1);
                    break;
                case 'DAY':
                    currentDate = dateAdd(currentDate, 'day', 1);
                    break;
                case 'MONTH':
                    currentDate = dateAdd(currentDate, 'month', 1);
                    break;
                default:
                    currentDate = dateAdd(currentDate, 'day', 1);
                    break;
            }
        }
        return dateArray;
    }

    const labelsFormate = (dimension: TimeRangeAnalytics) => {
        switch (dimension) {
            case 'YEAR_TO_DATE':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'year', -1);
                return getLabels(current, stopDate, 'MONTH')
            case 'LAST_6_MONTHS':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'month', -6);
                return getLabels(current, stopDate, 'MONTH')
            case 'LAST_MONTH':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'month', -1);
                return getLabels(current, stopDate, 'DAY')
            case 'LAST_WEEK':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'day', -7);
                return getLabels(current, stopDate, 'DAY')
            case 'LAST_24_HOURS':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'day', -1);
                return getLabels(current, stopDate, 'HOURLY')
            case 'LAST_2_HOURS':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'hour', -2);
                return getLabels(current, stopDate, 'HOURLY')
            case 'LAST_15_MINUTES':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -30);
            case 'LAST_30_MINUTES':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -45);
            case 'LAST_45_MINUTES':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -60);
            case 'LAST_HOUR':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -90);
            case 'LAST_2_HOURS':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -135);
            case 'LAST_5_MINUTES':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -15);
            case 'LAST_90_MINUTES':
                var stopDate = new Date();
                var current =  dateAdd(stopDate, 'minute', -105);
                return getLabels(current, stopDate, '5_MINUTES')
            case 'CUSTOM':
                var stopDate = new Date(data.end);
                var current = new Date(data.start);
                return getLabels(current, stopDate, 'DAY')
        }
    }

    let labels = labelsFormate(data.timeRange);

    const handleResultRealTime = async (element: GetContentAnalyticsResultItemOutput) => {
        element.results.forEach(metric => {
            switch (metric.data_dimension) {
                case "PLAYS_BY_TIME":
                    if (!metric.data.length) {
                        realTimeData.playsByTime = { data: [], labels: [] }
                    } else {
                        realTimeData.playsByTime = { data: Array(labels.length).fill(0, 0, labels.length), labels: labels }

                        metric.data.forEach(data => {
                            let label = formateTimestampAnalytics(parseInt(data.dimension_type.value));
                            let indexLabel = labels.indexOf(label);
                            realTimeData.playsByTime.data[indexLabel] = data.dimension_sum;
                        })
                    }
                    break;
                case "VIEWERS_BY_TIME":
                    if (!metric.data.length) {
                        realTimeData.viewersByTime = { data: [], labels: [] }
                    } else {
                        realTimeData.viewersByTime = { data: Array(labels.length).fill(0, 0, labels.length), labels: labels };
                        
                        metric.data.forEach(data => {
                            let label = formateTimestampAnalytics(parseInt(data.dimension_type.value));
                            let indexLabel = labels.indexOf(label);
                            realTimeData.viewersByTime.data[indexLabel] = data.dimension_sum;
                        })
                    }
                    break;
                case "WATCHTIME_BY_DEVICE":
                    if (!metric.data.length) {
                        realTimeData.watchByDevice = { data: [], labels: [] }
                    } else {
                        realTimeData.watchByDevice = { data: [], labels: labels }
                        metric.data.forEach(data => {
                            realTimeData.watchByDevice = {
                                labels: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.labels : []), ...(!realTimeData.watchByDevice || realTimeData.watchByDevice.labels.indexOf(data.dimension_type.value.toString()) < 0 ? [data.dimension_type.value.toString()] : [])],
                                data: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.data : []), data.dimension_sum]
                            }
                        })
                    }
                    break;
                case 'PLAYS_BY_COUNTRY':
                    if (!metric.data.length) {
                        realTimeData.playsByLocation = { data: [] }
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
                if (!metric.data.length) {
                    if (metric.data_dimension.includes("TIME")) {
                        audienceData.playsImpressionsByTime = { labels: [], plays: [], impressions: [], table: [] }
                    }
                    if (metric.data_dimension.includes("DEVICE")) {
                        audienceData.playsImpressionsByDevice = { labels: [], plays: [], impressions: [], table: [] }
                    }
                    if (metric.data_dimension.includes("COUNTRY")) {
                        audienceData.playsImpressionsByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimension_type.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!audienceData || !audienceData.playsImpressionsByTime) {
                                audienceData.playsImpressionsByTime = { plays: Array(labels.length).fill(0, 0, labels.length), impressions: Array(labels.length).fill(0, 0, labels.length), labels: labels, table: labels.map(label => { return { label: label, plays: 0, impressions: 0 } }) }
                            }
                            let label = formateTimestampAnalytics(parseInt(data.dimension_type.value));
                            let indexLabel = labels.indexOf(label);

                            if (metric.data_dimension.includes("PLAYS")) {
                                audienceData.playsImpressionsByTime.plays[indexLabel] = data.dimension_sum;
                                let index = audienceData.playsImpressionsByTime.table.findIndex(obj => obj.label === label);
                                audienceData.playsImpressionsByTime.table[index].plays = data.dimension_sum;
                            } else if (metric.data_dimension.includes("IMPRESSIONS")) {
                                audienceData.playsImpressionsByTime.impressions[indexLabel] = data.dimension_sum;
                                let index = audienceData.playsImpressionsByTime.table.findIndex(obj => obj.label === label);
                                audienceData.playsImpressionsByTime.table[index].impressions = data.dimension_sum;
                            }

                            break;
                        case 'DEVICE':
                            if (!audienceData || !audienceData.playsImpressionsByDevice) {
                                audienceData.playsImpressionsByDevice = { plays: [], impressions: [], labels: [], table: [] }
                            }
                            audienceData.playsImpressionsByDevice = {
                                labels: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.labels : []), ...(!audienceData.playsImpressionsByDevice || audienceData.playsImpressionsByDevice.labels.indexOf(data.dimension_type.value.toString()) < 0 ? [data.dimension_type.value.toString()] : [])],
                                plays: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.plays : []), ...(metric.data_dimension.includes("PLAYS") ? [data.dimension_sum] : [])],
                                impressions: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.impressions : []), ...(metric.data_dimension.includes("IMPRESSIONS") ? [data.dimension_sum] : [])],
                                table: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.table : [])]
                            }
                            var index = audienceData.playsImpressionsByDevice.table.findIndex(obj => obj.label === data.dimension_type.value.toString() );
                            if(index > -1) {
                                if(metric.data_dimension.includes("PLAYS")) {
                                    audienceData.playsImpressionsByDevice.table[index].plays = data.dimension_sum;
                                } else {
                                    audienceData.playsImpressionsByDevice.table[index].impressions = data.dimension_sum;
                                }
                            } else {
                                audienceData.playsImpressionsByDevice.table.push( {label: data.dimension_type.value.toString(), plays: metric.data_dimension.includes("PLAYS") ? data.dimension_sum : 0, impressions: metric.data_dimension.includes("IMPRESSIONS") ? data.dimension_sum : 0} )
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
                                var index = audienceData.playsImpressionsByLocation.table.findIndex(obj => obj.label === assosiatedCountry["\"Country\""] );
                                if(index > -1) {
                                    if(metric.data_dimension.includes("PLAYS")) {
                                        audienceData.playsImpressionsByLocation.table[index].plays = data.dimension_sum;
                                    } else {
                                        audienceData.playsImpressionsByLocation.table[index].impressions = data.dimension_sum;
                                    }
                                } else {
                                    audienceData.playsImpressionsByLocation.table.push( {label: assosiatedCountry["\"Country\""], plays: metric.data_dimension.includes("PLAYS") ? data.dimension_sum : 0, impressions: metric.data_dimension.includes("IMPRESSIONS") ? data.dimension_sum : 0} )
                                }
                            }
                            break;
                    }
                })
            }
            if (metric.data_dimension.includes("WATCHTIME")) {
                if (!metric.data.length) {
                    if (metric.data_dimension.includes("TIME")) {
                        watchData.watchByTime = { labels: [], data: [], table: [] }
                    }
                    if (metric.data_dimension.includes("DEVICE")) {
                        watchData.watchByDevice = { labels: [], data: [], table: [] }
                    }
                    if (metric.data_dimension.includes("COUNTRY")) {
                        watchData.watchByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimension_type.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            if (!watchData || !watchData.watchByTime) {
                                watchData.watchByTime = { labels: labels, data: Array(labels.length).fill(0, 0, labels.length), table: labels.map(label => { return { label: label, data: 0 } }) }
                            }
                            let label = formateTimestampAnalytics(parseInt(data.dimension_type.value));
                            let indexLabel = labels.indexOf(label);
                            watchData.watchByTime.data[indexLabel] = data.dimension_sum;

                            let index = watchData.watchByTime.table.findIndex(obj => obj.label === label);
                            watchData.watchByTime.table[index].data = data.dimension_sum;

                            break;
                        case 'DEVICE':
                            if (!watchData || !watchData.watchByDevice) {
                                watchData.watchByDevice = { labels: [], data: [], table: [] }
                            }
                            watchData.watchByDevice = {
                                labels: [...(watchData.watchByDevice ? watchData.watchByDevice.labels : []), data.dimension_type.value.toString()],
                                data: [...(watchData.watchByDevice ? watchData.watchByDevice.data : []), data.dimension_sum],
                                table: [...(watchData.watchByDevice ? watchData.watchByDevice.table : []), { label: data.dimension_type.value.toString(), data: data.dimension_sum,  }]
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
                                        table: [...(watchData.watchByLocation ? watchData.watchByLocation.table : []), { data: data.dimension_sum, label: assosiatedCountry["\"Country\""] }]
                                    }
                                }
                            }
                            break;
                    }
                })
            }
            if (metric.data_dimension.includes("SALES") || metric.data_dimension.includes("REVENUES")) {
                if (!metric.data.length) {
                    if (metric.data_dimension.includes("TIME")) {
                        salesData.salesRevenuesByTime = { labels: [], sales: [], revenues: [], table: [] }
                    }
                    if (metric.data_dimension.includes("COUNTRY")) {
                        salesData.salesRevenuesByLocation = { data: [], table: [] }
                    }
                }
                metric.data.forEach(data => {
                    switch (data.dimension_type.type) {
                        case 'HOURLY':
                        case 'MONTH':
                        case 'DAY':
                            let label = formateTimestampAnalytics(parseInt(data.dimension_type.value));
                            let indexLabel = labels.indexOf(label);

                            if (!salesData || !salesData.salesRevenuesByTime || (metric.data_dimension.includes("SALES") && !salesData.salesRevenuesByTime.sales.length ) || ( metric.data_dimension.includes("REVENUES") && !salesData.salesRevenuesByTime.revenues.length)  ) {
                                salesData.salesRevenuesByTime = { labels: labels, revenues: Array(labels.length).fill(0, 0, labels.length), sales: Array(labels.length).fill(0, 0, labels.length), table: [] }
                            }

                            if (metric.data_dimension.includes("SALES")) {
                                salesData.salesRevenuesByTime.sales[indexLabel] = data.dimension_sum;
                            } else if (metric.data_dimension.includes("REVENUES")) {
                                salesData.salesRevenuesByTime.revenues[indexLabel] = data.dimension_sum;
                            }
                            
                            salesData.salesRevenuesByTime.table = [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.table : []), { sales: metric.data_dimension.includes("SALES") ? data.dimension_sum : null, revenues: metric.data_dimension.includes("REVENUES") ? data.dimension_sum : null, label: label }]

                            break;
                        case 'COUNTRY':
                            if (!salesData || !salesData.salesRevenuesByLocation) {
                                salesData.salesRevenuesByLocation = { data: [], table: [] }
                            }
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
                                    table: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.table : []), { revenues:  data.dimension_sum, label: assosiatedCountry["\"Country\""]}]
                                }

                            }
                            break;
                    }
                })
            }

        }
        )
    }

    if ( (data.timeRange.includes('MINUTE') || data.timeRange.includes('HOUR')) &&  data.timeRange !== 'LAST_24_HOURS' ) {
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
            realtime: Object.keys(realTimeData).length === 0 && realTimeData.constructor === Object ? undefined : realTimeData,
        }
    }
}

export const formatGetContentAnalyticsInput = (data: ContentAnalyticsParameters): GetContentAnalyticsInput => {
    let formattedData: GetContentAnalyticsInput = {
        id: data.id,
        dimension: data.dimension,
        time_range: data.timeRange,
        type: data.type,
        start: data.start ? Math.floor(data.start / 1000) : undefined,
        end: data.end ? Math.floor(data.end / 1000) : undefined
    }
    return formattedData
}

