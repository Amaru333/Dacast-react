import { DimensionItemType, GetAnalyticsOutput, GetContentAnalyticsResultItemOutput } from "../../../DacastSdk/analytics";
import { formatTimeValue, tsToLocaleDate } from "../../../utils/formatUtils";
import { dateAdd } from "../../../utils/services/date/dateService";
import { CountriesDetail } from "../../constants/CountriesDetails";
import { AccountAnalyticsData } from "../../redux-flow/store/Analytics/Data/types";
import { AccountAnalyticsParameters } from "../../redux-flow/store/Analytics/types";
import { AudienceAnalyticsState, ContentAnalyticsParameters, RealTimeAnalyticsState, SalesAnalyticsState, TimeRangeAnalytics, WatchAnalyticsState } from "../../redux-flow/store/Content/Analytics/types";

const formateTimestampAnalytics = (ts: number, timeRange: TimeRangeAnalytics, response: GetAnalyticsOutput) => {
    switch (timeRange) {
        case 'YEAR_TO_DATE':
        case 'LAST_6_MONTHS':
            return tsToLocaleDate(ts, { month: '2-digit', year: 'numeric', timeZone: 'UTC'});
        case 'LAST_MONTH':
        case 'LAST_WEEK':
            return tsToLocaleDate(ts, {month: '2-digit', year:'numeric', day: '2-digit', timeZone: 'UTC'});
        case 'CUSTOM':
            let index = response.results.findIndex(obj => obj.data_dimension.includes("_TIME"));
            if(index >= 0) {
                if(response.results[index].data && response.results[index].data.length > 0) {
                    if(response.results[index].data[0].dimension_type.type === "HOURLY") {
                        return tsToLocaleDate(ts, { hour: '2-digit', minute: '2-digit', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                    }
                    if(response.results[index].data[0].dimension_type.type === "MONTH") {
                        return tsToLocaleDate(ts, { month: '2-digit', year: 'numeric', timeZone: 'UTC' });
                    }
                    return tsToLocaleDate(ts);
                }
                return tsToLocaleDate(ts);
            }
            return tsToLocaleDate(ts);
        case 'LAST_5_MINUTES':
        case 'LAST_24_HOURS':
        case 'LAST_15_MINUTES':
        case 'LAST_30_MINUTES':
        case 'LAST_45_MINUTES':
        case 'LAST_HOUR':
            return tsToLocaleDate(ts, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        case 'LAST_2_HOURS':
        case 'LAST_90_MINUTES':
            return tsToLocaleDate(ts, { hour: '2-digit', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        }
}

const getLabels = (startDate: Date, stopDate: Date, type: DimensionItemType, timeRange: TimeRangeAnalytics, response: GetAnalyticsOutput) => {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(formateTimestampAnalytics(new Date(currentDate).getTime() / 1000, timeRange, response));
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

const formatLabels = (dimension: TimeRangeAnalytics, startDate: number, endDate: number, response: GetAnalyticsOutput) => {
    switch (dimension) {
        case 'YEAR_TO_DATE':
            var stopDate = new Date();
            var firstDay = new Date(stopDate.getFullYear(), stopDate.getMonth(), 1);
            var current = dateAdd(firstDay, 'month', -1 * stopDate.getMonth());
            return getLabels(current, firstDay, 'MONTH', dimension, response)
        case 'LAST_6_MONTHS':
            var stopDate = new Date();
            var firstDay = new Date(stopDate.getFullYear(), stopDate.getMonth(), 1);
            var current = dateAdd(firstDay, 'month', -6);
            return getLabels(current, firstDay, 'MONTH', dimension, response)
        case 'LAST_MONTH':
            var stopDate = ( d => new Date(d.setDate(d.getDate())) )(new Date);
            var current = dateAdd(stopDate, 'day', -29);
            return getLabels(current, stopDate, 'DAY', dimension, response)
        case 'LAST_WEEK':
            var stopDate = ( d => new Date(d.setDate(d.getDate())) )(new Date);
            var current = dateAdd(stopDate, 'day', -7);
            return getLabels(current, stopDate, 'DAY', dimension, response)
        case 'LAST_24_HOURS':
            var stopDate = new Date();
            stopDate.setHours(stopDate.getHours(), 0, 0);
            var current = dateAdd(stopDate, 'hour', -23);
            return getLabels(current, stopDate, 'HOURLY', dimension, response)
        case 'LAST_2_HOURS':
            var stopDate = new Date();
            stopDate.setHours(stopDate.getHours(), 0, 0);
            var current = dateAdd(stopDate, 'hour', -2);
            return getLabels(current, stopDate, 'HOURLY', dimension, response)
        case 'LAST_15_MINUTES':
            var stopDate = new Date();
            stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
            var current = dateAdd(stopDate, 'minute', -15);
            return getLabels(current, stopDate, '5_MINUTES', dimension, response )
        case 'LAST_30_MINUTES':
            var stopDate = new Date();
            stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
            var current = dateAdd(stopDate, 'minute', -30);
            return getLabels(current, stopDate, '5_MINUTES', dimension, response )
        case 'LAST_45_MINUTES':
            var stopDate = new Date();
            stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
            var current = dateAdd(stopDate, 'minute', -45);
            return getLabels(current, stopDate, '5_MINUTES', dimension, response )
        case 'LAST_HOUR':
            var stopDate = new Date();
            stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
            var current = dateAdd(stopDate, 'hour', -1);
            return getLabels(current, stopDate, '5_MINUTES', dimension, response )
        case 'LAST_5_MINUTES':
            var stopDate = new Date();
            var current = dateAdd(stopDate, 'minute', -15);
        case 'LAST_90_MINUTES':
            var stopDate = new Date();
            stopDate = dateAdd(stopDate, 'minute', (stopDate.getMinutes() % 5)* -1 );
            var current = dateAdd(stopDate, 'minute', -90);
            return getLabels(current, stopDate, 'HOURLY', dimension, response )
        case 'CUSTOM':
            var stopDate = new Date(endDate);
            var current = new Date(startDate);
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
            return getLabels(current, stopDate, type, dimension, response)
    }
}

export const formatRealTimeResults = (response: GetContentAnalyticsResultItemOutput, input: ContentAnalyticsParameters): RealTimeAnalyticsState => {
    let formattedData: RealTimeAnalyticsState = {
        playsByTime: {
            data: [],
            labels: []
        },
        playsByLocation: {
            data: []
        },
        viewersByTime: {
            data: [],
            labels: []
        },
        watchByDevice: { 
            data: [], 
            labels: [] 
        }
    }
    let labels = formatLabels(input.timeRange, input.start, input.end, response)
    response.results.forEach(metric => {
        switch (metric.data_dimension) {
            case "PLAYS_BY_TIME":
                if (metric.data.length) {
                    formattedData.playsByTime = { data: Array(labels.length).fill(0, 0, labels.length), labels: labels }
                    metric.data.forEach(data => {
                        let label = formateTimestampAnalytics(parseInt(data.dimension_type.value as string), input.timeRange, response);
                        let indexLabel = labels.indexOf(label);
                        formattedData.playsByTime.data[indexLabel] = data.dimension_sum;
                    })
                }
                break;
            case "VIEWERS_BY_TIME":
                if (metric.data.length) {
                    formattedData.viewersByTime = { data: Array(labels.length).fill(0, 0, labels.length), labels: labels };
                    metric.data.forEach(data => {
                        let label = formateTimestampAnalytics(parseInt(data.dimension_type.value as string), input.timeRange, response);
                        let indexLabel = labels.indexOf(label);
                        formattedData.viewersByTime.data[indexLabel] = data.dimension_sum;
                    })
                }
                break;
            case "WATCHTIME_BY_DEVICE":
                if (metric.data.length) {
                    formattedData.watchByDevice = { data: [], labels: [] }
                    metric.data.forEach(data => {
                        formattedData.watchByDevice = {
                            labels: [...(formattedData.watchByDevice ? formattedData.watchByDevice.labels : []), ...(!formattedData.watchByDevice || formattedData.watchByDevice.labels.indexOf(data.dimension_type.value.toString()) < 0 ? [data.dimension_type.value.toString()] : [])],
                            data: [...(formattedData.watchByDevice ? formattedData.watchByDevice.data : []), data.dimension_sum]
                        }
                    })
                }
                break;
            default:
                if (metric.data.length && formattedData.playsByLocation) {
                    metric.data.forEach(data => {
                        const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimension_type.value);
                        if (assosiatedCountry) {
                            formattedData.playsByLocation = {
                                data: [...(formattedData.playsByLocation ? formattedData.playsByLocation.data : []), {
                                    city: data.dimension_type.type,
                                    position: {
                                        latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                        longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                    },
                                    value: [data.dimension_sum]
                                }],
                            }
                        }
                    })
                }
            break;
        }
    })

    return formattedData
}

export const formatAudienceResults = (response: GetAnalyticsOutput, input: ContentAnalyticsParameters | AccountAnalyticsParameters): AudienceAnalyticsState => {
    let formattedData: AudienceAnalyticsState = {
        playsImpressionsByTime: { 
            labels: [], 
            plays: [], 
            impressions: [], 
            table: [] 
        },
        playsImpressionsByDevice: {
            labels: [],
            plays: [], 
            impressions: [], 
            table: [] 
        },
        playsImpressionsByLocation: { 
            data: [], 
            table: [] 
        }
    }
    let labels = formatLabels(input.timeRange, input.start, input.end, response)
    response.results.filter(metric => metric.data_dimension.includes("PLAYS") || metric.data_dimension.includes("IMPRESSIONS")).forEach(metric => {
        if(metric.data) {
            metric.data.forEach(data => {
                switch (data.dimension_type.type) {
                    case 'HOURLY':
                    case 'MONTH':
                    case 'DAY':
                        if (!formattedData || !formattedData.playsImpressionsByTime || (metric.data_dimension.includes("PLAYS") && !formattedData.playsImpressionsByTime.plays.length) || (metric.data_dimension.includes("IMPRESSIONS") && !formattedData.playsImpressionsByTime.impressions.length)) {
                            formattedData.playsImpressionsByTime = { plays: Array(labels.length).fill(0, 0, labels.length), impressions: Array(labels.length).fill(0, 0, labels.length), labels: labels, table: labels.map(label => { return { label: label, plays: 0, impressions: 0 } }) }
                        }
                        let label = formateTimestampAnalytics(parseInt(data.dimension_type.value as string), input.timeRange, response);
                        let indexLabel = labels.indexOf(label);
                        if (metric.data_dimension.includes("PLAYS")) {
                            formattedData.playsImpressionsByTime.plays[indexLabel] = data.dimension_sum;
                            let index = formattedData.playsImpressionsByTime.table.findIndex(obj => obj.label === label);
                            formattedData.playsImpressionsByTime.table[index] ? formattedData.playsImpressionsByTime.table[index].plays = data.dimension_sum : null;
                        } else if (metric.data_dimension.includes("IMPRESSIONS")) {
                            formattedData.playsImpressionsByTime.impressions[indexLabel] = data.dimension_sum;
                            let index = formattedData.playsImpressionsByTime.table.findIndex(obj => obj.label === label);
                            formattedData.playsImpressionsByTime.table[index] ? formattedData.playsImpressionsByTime.table[index].impressions = data.dimension_sum : null;
                        }

                        break;
                    case 'DEVICE':
                        let type: 'plays' | 'impressions' = metric.data_dimension.includes("PLAYS") ? 'plays' : 'impressions';

                        let indexExist = formattedData.playsImpressionsByDevice.labels.findIndex(obj => obj === data.dimension_type.value.toString())
                        if(indexExist !== -1) {
                            formattedData.playsImpressionsByDevice[type][indexExist] += data.dimension_sum;
                        } else {
                            formattedData.playsImpressionsByDevice.labels.push(data.dimension_type.value.toString());
                            formattedData.playsImpressionsByDevice.plays.push(type === 'plays' ? data.dimension_sum : 0);
                            formattedData.playsImpressionsByDevice.impressions.push(type === 'impressions' ? data.dimension_sum : 0);
                        }
                        var index = formattedData.playsImpressionsByDevice.table.findIndex(obj => obj.label === data.dimension_type.value.toString());
                        if (index > -1) {
                            if (metric.data_dimension.includes("PLAYS")) {
                                formattedData.playsImpressionsByDevice.table[index].plays = data.dimension_sum;
                            } else {
                                formattedData.playsImpressionsByDevice.table[index].impressions = data.dimension_sum;
                            }
                        } else {
                            formattedData.playsImpressionsByDevice.table.push({ label: data.dimension_type.value.toString(), plays: metric.data_dimension.includes("PLAYS") ? data.dimension_sum : 0, impressions: metric.data_dimension.includes("IMPRESSIONS") ? data.dimension_sum : 0 })
                        }
                        break;
                    case 'COUNTRY':
                        if (data.dimension_type.value !== 'Unknown') {
                            let index = formattedData.playsImpressionsByLocation.data.findIndex(obj => obj.city === data.dimension_type.value);
                            let indexTable = formattedData.playsImpressionsByLocation.table.findIndex(obj => CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string) && CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string)['"Country"'] === obj.label ? CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string)["\"Country\""] : 'Unknown');

                            let type: 'plays' | 'impressions' = metric.data_dimension.includes("PLAYS") ? 'plays' : 'impressions';
                            if(index === -1 ) {
                                formattedData.playsImpressionsByLocation = {
                                    data: [...(formattedData.playsImpressionsByLocation ? formattedData.playsImpressionsByLocation.data : []),
                                    {
                                        city: data.dimension_type.value as string,
                                        position: {
                                            latitude: 0,
                                            longitude: 0
                                        },
                                        value: [data.dimension_sum],
                                        label: [type]
                                    }
                                    ],
                                    table: [...(formattedData.playsImpressionsByLocation.table ? formattedData.playsImpressionsByLocation.table : []), { label: CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value) ? CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value)["\"Country\""] : 'Unknown', plays: type === 'plays' ? data.dimension_sum : 0, impressions: type === 'plays' ? 0 : data.dimension_sum }  ]
                                }
                            } else {
                                formattedData.playsImpressionsByLocation.data[index].value.push(data.dimension_sum)
                                formattedData.playsImpressionsByLocation.data[index].label.push(type)
                                formattedData.playsImpressionsByLocation.table[indexTable][type] = data.dimension_sum;
                            }
                        
                        } else {
                            let type: 'plays' | 'impressions' = metric.data_dimension.includes("PLAYS") ? 'plays' : 'impressions';
                            let indexTable = formattedData.playsImpressionsByLocation.table.findIndex(obj => obj.label === data.dimension_type.value.toString());
                            if(indexTable >= 0) {
                                formattedData.playsImpressionsByLocation.table[indexTable][type] = data.dimension_sum;
                            } else {
                                formattedData.playsImpressionsByLocation.table = [...( formattedData.playsImpressionsByLocation ?  formattedData.playsImpressionsByLocation.table : []), { label: data.dimension_type.value.toString(),  plays: type === 'plays' ? data.dimension_sum : 0, impressions: type === 'impressions' ? data.dimension_sum : 0 }  ]
                            }
                        }
                        break;
                    default:
                        break;
                }
            })
        }
    })
    return formattedData
}

export const formatWatchResults = (response: GetAnalyticsOutput, input: ContentAnalyticsParameters | AccountAnalyticsParameters): WatchAnalyticsState => {
    let formattedData: WatchAnalyticsState = {
        watchByTime: { 
            labels: [], 
            data: [], 
            table: [] 
        },
        watchByDevice: { 
            labels: [], 
            data: [], 
            table: [] 
        },
        watchByLocation: { 
            data: [], 
            table: [] 
        }
    }
    let labels = formatLabels(input.timeRange, input.start, input.end, response)
    response.results.filter(metric => metric.data_dimension.includes("WATCHTIME")).forEach(metric => {
        if(metric.data) {
            metric.data.forEach(data => {
                switch (data.dimension_type.type) {
                    case 'HOURLY':
                    case 'MONTH':
                    case 'DAY':
                        if(formattedData.watchByTime.labels.length === 0 ) {
                            formattedData.watchByTime.labels = labels
                            formattedData.watchByTime.table = labels.map(label => { return { label: label, data: 0 } })
                        }
                        let label = formateTimestampAnalytics(parseInt(data.dimension_type.value as string), input.timeRange, response);
                        let indexLabel = labels.indexOf(label);
                        if(indexLabel !== -1) {
                            formattedData.watchByTime.data[indexLabel] = data.dimension_sum;
                            formattedData.watchByTime.table[indexLabel].data = data.dimension_sum
                        }
                        break;
                    case 'DEVICE':
                        if (!formattedData || !formattedData.watchByDevice) {
                            formattedData.watchByDevice = { labels: [], data: [], table: [] }
                        }
                        formattedData.watchByDevice = {
                            labels: [...(formattedData.watchByDevice ? formattedData.watchByDevice.labels : []), data.dimension_type.value.toString()],
                            data: [...(formattedData.watchByDevice ? formattedData.watchByDevice.data : []), data.dimension_sum],
                            table: [...(formattedData.watchByDevice ? formattedData.watchByDevice.table : []), { label: data.dimension_type.value.toString(), data: data.dimension_sum, }]
                        }
                        break;
                    case 'COUNTRY':
                        if (data.dimension_type.value !== 'Unknown') {
                            formattedData.watchByLocation = {
                                data: [...(formattedData.watchByLocation ? formattedData.watchByLocation.data : []), {
                                    city: data.dimension_type.value as string,
                                    position: {
                                        latitude: 0,
                                        longitude: 0
                                    },
                                    value: [data.dimension_sum],
                                    label: [formatTimeValue([data.dimension_sum]).unitLong]
                                }],
                                table: [...(formattedData.watchByLocation.table ? formattedData.watchByLocation.table : []), {  label: CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value) ? CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value)["\"Country\""] : 'Unknown', data: data.dimension_sum }]
                            }
                        } else {
                            formattedData.watchByLocation.table = [...( formattedData.watchByLocation ?  formattedData.watchByLocation.table : []), { label: data.dimension_type.value.toString(),  data: data.dimension_sum }  ] 
                        }

                        break;
                    default:
                        break
                }
            })
        }
    })

    return formattedData
}

export const formatSalesResults = (response: GetAnalyticsOutput, input: ContentAnalyticsParameters | AccountAnalyticsParameters): SalesAnalyticsState => {
    let formattedData: SalesAnalyticsState = {
        salesRevenuesByLocation: {
            data: [],
            table: []
        },
        salesRevenuesByTime: {
            labels: [],
            sales: [],
            revenues: [],
            table: []
        }
    }
    let labels = formatLabels(input.timeRange, input.start, input.end, response)
    response.results.filter(metric => metric.data_dimension.includes("SALES") || metric.data_dimension.includes("REVENUES")).forEach(metric => {
        if(metric.data) {
            metric.data.forEach(data => {
                switch (data.dimension_type.type) {
                    case 'HOURLY':
                    case 'MONTH':
                    case 'DAY':
                        let label = formateTimestampAnalytics(metric.data_dimension.includes("SALES") ? parseInt( data.dimension_type.value as string) / 1000 : parseInt(data.dimension_type.value as string), input.timeRange, response );
                        let indexLabel = labels.indexOf(label);

                        if (!formattedData || !formattedData.salesRevenuesByTime || (metric.data_dimension.includes("SALES") && !formattedData.salesRevenuesByTime.sales.length) || (metric.data_dimension.includes("REVENUES") && !formattedData.salesRevenuesByTime.revenues.length)) {
                            formattedData.salesRevenuesByTime = { labels: labels, revenues: Array(labels.length).fill(0, 0, labels.length), sales: Array(labels.length).fill(0, 0, labels.length), table: labels.map(label => { return { label: label, sales: 0, revenues: 0 } }) }
                        }
                        if (metric.data_dimension.includes("SALES")) {
                            formattedData.salesRevenuesByTime.sales[indexLabel] += data.dimension_sum;
                        } else if (metric.data_dimension.includes("REVENUES")) {
                            formattedData.salesRevenuesByTime.revenues[indexLabel] = Math.round(formattedData.salesRevenuesByTime.revenues[indexLabel] + data.dimension_sum);
                        }
                        let index = formattedData.salesRevenuesByTime.table.findIndex(obj => obj.label === label);
                        if (metric.data_dimension.includes("SALES")) {
                            formattedData.salesRevenuesByTime.table[index] ? formattedData.salesRevenuesByTime.table[index].sales += data.dimension_sum : null;
                        } else {
                            formattedData.salesRevenuesByTime.table[index] ? formattedData.salesRevenuesByTime.table[index].revenues = Math.round(formattedData.salesRevenuesByTime.table[index].revenues + data.dimension_sum) : null;
                        }

                        break;
                    case 'COUNTRY':
                        if (!formattedData || !formattedData.salesRevenuesByLocation) {
                            formattedData.salesRevenuesByLocation = { data: [], table: [] }
                        }
                        let type: 'sales' | 'revenues' = metric.data_dimension.includes("SALES") ? 'sales' : 'revenues';
                        if (data.dimension_type.value !== 'Unknown') {
                            let index = formattedData.salesRevenuesByLocation.data.findIndex(obj => obj.city === data.dimension_type.value);
                            let indexTable = formattedData.salesRevenuesByLocation.table.findIndex(obj => CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string) && CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string)['"Country"'] === obj.label ? CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string)["\"Country\""] : 'Unknown');

                            if(index === -1 ) {
                                formattedData.salesRevenuesByLocation = {
                                    data: [...(formattedData.salesRevenuesByLocation.data ? formattedData.salesRevenuesByLocation.data : []),
                                    {
                                        city: data.dimension_type.value as string,
                                        position: {
                                            latitude: 0,
                                            longitude: 0
                                        },
                                        value: [data.dimension_sum],
                                        label: [type]
                                    }
                                    ],
                                    
                                    table: [...( formattedData.salesRevenuesByLocation.table ?  formattedData.salesRevenuesByLocation.table : []), { label: CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string) ? CountriesDetail.find(e => e["\"Alpha-3code\""] === data.dimension_type.value as string)["\"Country\""] : 'Unknown', sales: type === 'sales' ? data.dimension_sum : 0, revenues: type === 'revenues' ? data.dimension_sum : 0 }  ]
                                }
                            } else {
                                formattedData.salesRevenuesByLocation.data[index].value.push(data.dimension_sum)
                                formattedData.salesRevenuesByLocation.data[index].label.push(type)
                                formattedData.salesRevenuesByLocation.table[indexTable][type] = data.dimension_sum;
                            }
                        
                        } else {
                            let indexTable = formattedData.salesRevenuesByLocation.table.findIndex(obj => obj.label === data.dimension_type.value.toString());
                            if(indexTable >= 0) {
                                formattedData.salesRevenuesByLocation.table[indexTable][type] = data.dimension_sum;
                            } else {
                                formattedData.salesRevenuesByLocation.table = [...( formattedData.salesRevenuesByLocation ?  formattedData.salesRevenuesByLocation.table : []), { label: data.dimension_type.value.toString(),  sales: type === 'sales' ? data.dimension_sum : 0, revenues: type === 'revenues' ? data.dimension_sum : 0 }  ]
                            }
                        }
                        break;
                }
            })
        }
    })

    return formattedData
}

export const formatDataConsumptionResults = (response: GetAnalyticsOutput, input: AccountAnalyticsParameters): AccountAnalyticsData => {
    let formattedData: AccountAnalyticsData = {
        dataConsumptionByTime: {
            labels: [],
            data: [],
            table: []
        }
    }
    let labels = formatLabels(input.timeRange, input.start, input.end, response)
    response.results.filter(metric => metric.data_dimension.includes("DATA_CONSUMPTION")).forEach(metric => {
        if(metric.data) {
            metric.data.forEach(data => {
                switch (data.dimension_type.type) {
                    case 'HOURLY':
                    case 'MONTH':
                    case 'DAY':
                        if(formattedData.dataConsumptionByTime.labels.length === 0) {
                            formattedData.dataConsumptionByTime.labels = labels
                            formattedData.dataConsumptionByTime.table = labels.map(label => { return { label: label, data: 0 } })
                        }
                        let label = formateTimestampAnalytics(parseInt(data.dimension_type.value as string), input.timeRange, response);
                        let indexLabel = labels.indexOf(label);
                        if(indexLabel !== -1) {
                            let index = formattedData.dataConsumptionByTime.table.findIndex(obj => obj.label === label);
                            formattedData.dataConsumptionByTime.data[indexLabel] = data.dimension_sum / 1000000000;
                            formattedData.dataConsumptionByTime.table[index].data = data.dimension_sum / 1000000000;
                        }

                        break
                }
            })
        }
    })

    return formattedData
}

