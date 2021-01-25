import { AudienceAnalyticsState, ContentAnalyticsFinalState } from '.'
import { DimensionItemType, GetContentAnalyticsInput, GetContentAnalyticsOutput, GetContentAnalyticsResultItemOutput } from '../../../../../DacastSdk/analytics'
import { tsToLocaleDate } from '../../../../../utils/formatUtils';
import { dateAdd } from '../../../../../utils/services/date/dateService';
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
                return tsToLocaleDate(value, { month: '2-digit', year: 'numeric', timeZone: 'UTC' });
            case 'LAST_MONTH':
            case 'LAST_WEEK':
                return tsToLocaleDate(value, {timeZone: 'UTC'});
            case 'CUSTOM':
                let index = response.results.findIndex(obj => obj.data_dimension.includes("_TIME"));
                if(index >= 0) {
                    if(response.results[index].data.length) {
                        if(response.results[index].data[0].dimension_type.type === "HOURLY") {
                            return tsToLocaleDate(value, { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                        } else if(response.results[index].data[0].dimension_type.type === "MONTH") {
                            return tsToLocaleDate(value, { month: '2-digit', year: 'numeric', timeZone: 'UTC' });
                        } else {
                            return tsToLocaleDate(value, {timeZone: 'UTC'});
                        }
                    } else {
                        return tsToLocaleDate(value, {timeZone: 'UTC'});
                    }
                } else {
                    return tsToLocaleDate(value, {timeZone: 'UTC'});
                }
            case 'LAST_5_MINUTES':
            case 'LAST_24_HOURS':
            case 'LAST_15_MINUTES':
            case 'LAST_30_MINUTES':
            case 'LAST_45_MINUTES':
            case 'LAST_HOUR':
                return tsToLocaleDate(value, { timeZone: 'UTC', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
            case 'LAST_2_HOURS':
            case 'LAST_90_MINUTES':
                return tsToLocaleDate(value, { hour: '2-digit', timeZone: 'UTC' });
            }
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
                var firstDay = new Date(stopDate.getFullYear(), stopDate.getMonth(), 1);
                var current = dateAdd(firstDay, 'year', -1);
                return getLabels(current, firstDay, 'MONTH')
            case 'LAST_6_MONTHS':
                var stopDate = new Date();
                var firstDay = new Date(stopDate.getFullYear(), stopDate.getMonth(), 1);
                var current = dateAdd(firstDay, 'month', -5);
                return getLabels(current, firstDay, 'MONTH')
            case 'LAST_MONTH':
                var stopDate = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
                var current = dateAdd(stopDate, 'day', -29);
                return getLabels(current, stopDate, 'DAY')
            case 'LAST_WEEK':
                var stopDate = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
                var current = dateAdd(stopDate, 'day', -6);
                return getLabels(current, stopDate, 'DAY')
            case 'LAST_24_HOURS':
                var stopDate = new Date();
                stopDate.setHours(stopDate.getHours(), 0, 0);
                var current = dateAdd(stopDate, 'hour', -23);
                return getLabels(current, stopDate, 'HOURLY')
            case 'LAST_2_HOURS':
                var stopDate = new Date();
                stopDate.setHours(stopDate.getHours(), 0, 0);
                var current = dateAdd(stopDate, 'hour', -2);
                return getLabels(current, stopDate, 'HOURLY')
            case 'LAST_15_MINUTES':
                var stopDate = new Date();
                stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
                var current = dateAdd(stopDate, 'minute', -15);
                return getLabels(current, stopDate, '5_MINUTES' )
            case 'LAST_30_MINUTES':
                var stopDate = new Date();
                stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
                var current = dateAdd(stopDate, 'minute', -30);
                return getLabels(current, stopDate, '5_MINUTES' )
            case 'LAST_45_MINUTES':
                var stopDate = new Date();
                stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
                var current = dateAdd(stopDate, 'minute', -45);
                return getLabels(current, stopDate, '5_MINUTES' )
            case 'LAST_HOUR':
                var stopDate = new Date();
                stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
                var current = dateAdd(stopDate, 'hour', -1);
                return getLabels(current, stopDate, '5_MINUTES' )
            case 'LAST_5_MINUTES':
                var stopDate = new Date();
                var current = dateAdd(stopDate, 'minute', -15);
            case 'LAST_90_MINUTES':
                var stopDate = new Date();
                stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
                var current = dateAdd(stopDate, 'minute', -90);
                return getLabels(current, stopDate, 'HOURLY' )
            case 'CUSTOM':
                var stopDate = new Date(data.end);
                var current = new Date(data.start);
                let index = response.results.findIndex(obj => obj.data_dimension.includes("_TIME"));
                let type: DimensionItemType = 'DAY';
                if(index >= 0) {
                    if(response.results[index].data.length) {
                        if(response.results[index].data[0].dimension_type.type === "HOURLY") {
                            type = 'HOURLY'
                        } else if(response.results[index].data[0].dimension_type.type === "MONTH") {
                            type = 'MONTH'
                        } else {
                            type = 'DAY'
                        }
                    }
                } else {
                    type = 'DAY';
                }
                return getLabels(current, stopDate, type)
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
                        realTimeData.watchByDevice = { data: [], labels: [] }
                        metric.data.forEach(data => {
                            realTimeData.watchByDevice = {
                                labels: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.labels : []), ...(!realTimeData.watchByDevice || realTimeData.watchByDevice.labels.indexOf(data.dimension_type.value.toString()) < 0 ? [data.dimension_type.value.toString()] : [])],
                                data: [...(realTimeData.watchByDevice ? realTimeData.watchByDevice.data : []), data.dimension_sum]
                            }
                        })
                    }
                    break;
                case 'PLAYS_BY_COUNTRY':
                    if (!metric.data.length || !realTimeData.playsByLocation) {
                        realTimeData.playsByLocation = { data: [] }
                    } 
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
                                    value: [data.dimension_sum]
                                }],
                            }
                        }
                    })
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
                            if (!audienceData || !audienceData.playsImpressionsByTime || (metric.data_dimension.includes("PLAYS") && !audienceData.playsImpressionsByTime.plays.length) || (metric.data_dimension.includes("IMPRESSIONS") && !audienceData.playsImpressionsByTime.impressions.length)) {
                                audienceData.playsImpressionsByTime = { plays: Array(labels.length).fill(0, 0, labels.length), impressions: Array(labels.length).fill(0, 0, labels.length), labels: labels, table: labels.map(label => { return { label: label, plays: 0, impressions: 0 } }) }
                            }
                            let label = formateTimestampAnalytics(parseInt(data.dimension_type.value));
                            let indexLabel = labels.indexOf(label);

                            if (metric.data_dimension.includes("PLAYS")) {
                                audienceData.playsImpressionsByTime.plays[indexLabel] = data.dimension_sum;
                                let index = audienceData.playsImpressionsByTime.table.findIndex(obj => obj.label === label);
                                audienceData.playsImpressionsByTime.table[index] ? audienceData.playsImpressionsByTime.table[index].plays = data.dimension_sum : null;
                            } else if (metric.data_dimension.includes("IMPRESSIONS")) {
                                audienceData.playsImpressionsByTime.impressions[indexLabel] = data.dimension_sum;
                                let index = audienceData.playsImpressionsByTime.table.findIndex(obj => obj.label === label);
                                audienceData.playsImpressionsByTime.table[index] ? audienceData.playsImpressionsByTime.table[index].impressions = data.dimension_sum : null;
                            }

                            break;
                        case 'DEVICE':
                            if (!audienceData || !audienceData.playsImpressionsByDevice) {
                                audienceData.playsImpressionsByDevice = { plays: [], impressions: [], labels: [], table: [] }
                            }
                            let type: 'plays' | 'impressions' = metric.data_dimension.includes("PLAYS") ? 'plays' : 'impressions';

                            let indexExist = audienceData.playsImpressionsByDevice.labels.findIndex(obj => obj === data.dimension_type.value.toString())
                            if(indexExist !== -1) {
                                audienceData.playsImpressionsByDevice[type][indexExist] += data.dimension_sum;
                            } else {
                                audienceData.playsImpressionsByDevice.labels.push(data.dimension_type.value.toString());
                                audienceData.playsImpressionsByDevice.plays.push(type === 'plays' ? data.dimension_sum : 0);
                                audienceData.playsImpressionsByDevice.impressions.push(type === 'impressions' ? data.dimension_sum : 0);
                            }
                            var index = audienceData.playsImpressionsByDevice.table.findIndex(obj => obj.label === data.dimension_type.value.toString());
                            if (index > -1) {
                                if (metric.data_dimension.includes("PLAYS")) {
                                    audienceData.playsImpressionsByDevice.table[index].plays = data.dimension_sum;
                                } else {
                                    audienceData.playsImpressionsByDevice.table[index].impressions = data.dimension_sum;
                                }
                            } else {
                                audienceData.playsImpressionsByDevice.table.push({ label: data.dimension_type.value.toString(), plays: metric.data_dimension.includes("PLAYS") ? data.dimension_sum : 0, impressions: metric.data_dimension.includes("IMPRESSIONS") ? data.dimension_sum : 0 })
                            }
                            break;
                        case 'COUNTRY':
                            if (!audienceData || !audienceData.playsImpressionsByLocation) {
                                audienceData.playsImpressionsByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                            if (assosiatedCountry) {
                                let index = audienceData.playsImpressionsByLocation.data.findIndex(obj => obj.city === assosiatedCountry["\"Country\""]);
                                let indexTable = audienceData.playsImpressionsByLocation.table.findIndex(obj => obj.label === assosiatedCountry["\"Country\""]);

                                let type: 'plays' | 'impressions' = metric.data_dimension.includes("PLAYS") ? 'plays' : 'impressions';
                                if(index === -1 ) {
                                    audienceData.playsImpressionsByLocation = {
                                        data: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.data : []),
                                        {
                                            city: assosiatedCountry["\"Country\""],
                                            position: {
                                                latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                            },
                                            value: [data.dimension_sum],
                                            label: [type]
                                        }
                                        ],
                                        table: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.table : []), { label: assosiatedCountry["\"Country\""], plays: type === 'plays' ? data.dimension_sum : 0, impressions: type === 'plays' ? 0 : data.dimension_sum }  ]
                                    }
                                } else {
                                    audienceData.playsImpressionsByLocation.data[index].value.push(data.dimension_sum)
                                    audienceData.playsImpressionsByLocation.data[index].label.push(type)
                                    audienceData.playsImpressionsByLocation.table[indexTable][type] = data.dimension_sum;
                                }
                            
                            }
                            break;
                    }
                })
            }
            if (metric.data_dimension.includes("WATCHTIME")) {
                if (!metric.data.length) {
                    if (metric.data_dimension.includes("TIME") && !watchData.watchByTime) {
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
                            watchData.watchByTime.table[index] ? watchData.watchByTime.table[index].data = data.dimension_sum : null;

                            break;
                        case 'DEVICE':
                            if (!watchData || !watchData.watchByDevice) {
                                watchData.watchByDevice = { labels: [], data: [], table: [] }
                            }
                            watchData.watchByDevice = {
                                labels: [...(watchData.watchByDevice ? watchData.watchByDevice.labels : []), data.dimension_type.value.toString()],
                                data: [...(watchData.watchByDevice ? watchData.watchByDevice.data : []), data.dimension_sum],
                                table: [...(watchData.watchByDevice ? watchData.watchByDevice.table : []), { label: data.dimension_type.value.toString(), data: data.dimension_sum, }]
                            }
                            break;
                        case 'COUNTRY':
                            if (!watchData || !watchData.watchByLocation) {
                                watchData.watchByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                            if (assosiatedCountry) {
                                watchData.watchByLocation = {
                                    data: [...(watchData.watchByLocation ? watchData.watchByLocation.data : []), {
                                        city: assosiatedCountry["\"Country\""],
                                        position: {
                                            latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                            longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                        },
                                        value: [data.dimension_sum]
                                    }],
                                    table: [...(watchData.watchByLocation ? watchData.watchByLocation.table : []), {  label: assosiatedCountry["\"Country\""], data: data.dimension_sum }]
                                }
                            }

                            break;
                    }
                })
            }
            if (metric.data_dimension.includes("SALES") || metric.data_dimension.includes("REVENUES")) {
                if (!metric.data.length) {
                    if (metric.data_dimension.includes("TIME") && !salesData.salesRevenuesByTime) {
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


                            if (!salesData || !salesData.salesRevenuesByTime || (metric.data_dimension.includes("SALES") && !salesData.salesRevenuesByTime.sales.length) || (metric.data_dimension.includes("REVENUES") && !salesData.salesRevenuesByTime.revenues.length)) {
                                salesData.salesRevenuesByTime = { labels: labels, revenues: Array(labels.length).fill(0, 0, labels.length), sales: Array(labels.length).fill(0, 0, labels.length), table: labels.map(label => { return { label: label, sales: 0, revenues: 0 } }) }
                            }
                            if (metric.data_dimension.includes("SALES")) {
                                salesData.salesRevenuesByTime.sales[indexLabel] += data.dimension_sum;
                            } else if (metric.data_dimension.includes("REVENUES")) {
                                salesData.salesRevenuesByTime.revenues[indexLabel] = Math.round(salesData.salesRevenuesByTime.revenues[indexLabel] + data.dimension_sum);
                            }
                            let index = salesData.salesRevenuesByTime.table.findIndex(obj => obj.label === label);
                            if (metric.data_dimension.includes("SALES")) {
                                salesData.salesRevenuesByTime.table[index] ? salesData.salesRevenuesByTime.table[index].sales += data.dimension_sum : null;
                            } else {
                                salesData.salesRevenuesByTime.table[index] ? salesData.salesRevenuesByTime.table[index].revenues = Math.round(salesData.salesRevenuesByTime.table[index].revenues + data.dimension_sum) : null;
                            }


                            break;
                        case 'COUNTRY':
                            if (!salesData || !salesData.salesRevenuesByLocation) {
                                salesData.salesRevenuesByLocation = { data: [], table: [] }
                            }
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                            if (assosiatedCountry) {
                                let index = salesData.salesRevenuesByLocation.data.findIndex(obj => obj.city === assosiatedCountry["\"Country\""]);
                                let indexTable = salesData.salesRevenuesByLocation.table.findIndex(obj => obj.label === assosiatedCountry["\"Country\""]);

                                let type: 'sales' | 'revenues' = metric.data_dimension.includes("SALES") ? 'sales' : 'revenues';
                                if(index === -1 ) {
                                    salesData.salesRevenuesByLocation = {
                                        data: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.data : []),
                                        {
                                            city: assosiatedCountry["\"Country\""],
                                            position: {
                                                latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                            },
                                            value: [data.dimension_sum],
                                            label: [type]
                                        }
                                        ],
                                        table: [...( salesData.salesRevenuesByLocation ?  salesData.salesRevenuesByLocation.table : []), { label: assosiatedCountry["\"Country\""],  sales: type === 'sales' ? data.dimension_sum : 0, revenues: type === 'revenues' ? data.dimension_sum : 0 }  ]
                                    }
                                } else {
                                    salesData.salesRevenuesByLocation.data[index].value.push(data.dimension_sum)
                                    salesData.salesRevenuesByLocation.data[index].label.push(type)
                                    salesData.salesRevenuesByLocation.table[indexTable][type] = data.dimension_sum;
                                }
                            
                            }
                            break;
                    }
                })
            }

        }
        )
    }

    if ((data.timeRange.includes('MINUTE') || data.timeRange.includes('HOUR')) && data.timeRange !== 'LAST_24_HOURS') {
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

