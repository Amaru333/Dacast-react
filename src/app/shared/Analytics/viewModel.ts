import { DimensionItemType, GetAnalyticsOutput, GetContentAnalyticsResultItemOutput } from "../../../DacastSdk/analytics";
import { formatTimeValue, tsToLocaleDate } from "../../../utils/formatUtils";
import { dateAdd } from "../../../utils/services/date/dateService";
import { world } from "../../constants/CountriesList";
import { AccountAnalyticsData } from "../../redux-flow/store/Analytics/Data/types";
import { AccountAnalyticsParameters, AnalyticsAccountDimensions } from "../../redux-flow/store/Analytics/types";
import { AnalyticsDimensions, AnalyticsMetricInfo, AudienceAnalyticsState, ContentAnalyticsParameters, RealTimeAnalyticsState, SalesAnalyticsState, TimeRangeAnalytics, WatchAnalyticsState } from "../../redux-flow/store/Content/Analytics/types";

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
                    return tsToLocaleDate(ts, { month: '2-digit', year: 'numeric', timeZone: 'UTC' });
                }
                return tsToLocaleDate(ts, { month: '2-digit', year: 'numeric', day: '2-digit', timeZone: 'UTC' });
            }
            return tsToLocaleDate(ts, { month: '2-digit', year: 'numeric', day: '2-digit', timeZone: 'UTC' });
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
                        const assosiatedCountry = world.features.find(element => element.id === data.dimension_type.value);
                        if (assosiatedCountry) {
                            formattedData.playsByLocation = {
                                data: [...(formattedData.playsByLocation ? formattedData.playsByLocation.data : []), {
                                    city: data.dimension_type.type,
                                    position: {
                                        latitude: 0,
                                        longitude: 0
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

    let plays = formatMetricResult(response, input, 'PLAYS')
    let impressions = formatMetricResult(response, input, 'IMPRESSIONS')
    let formattedData: AudienceAnalyticsState = {
        plays: plays,
        impressions: impressions
    }

    return formattedData
}

export const formatWatchResults = (response: GetAnalyticsOutput, input: ContentAnalyticsParameters | AccountAnalyticsParameters): WatchAnalyticsState => {
    let formattedData: WatchAnalyticsState = formatMetricResult(response, input, 'WATCHTIME')
    return formattedData
}

export const formatSalesResults = (response: GetAnalyticsOutput, input: ContentAnalyticsParameters | AccountAnalyticsParameters): SalesAnalyticsState => {
    let sales = formatMetricResult(response, input, 'SALES')
    let revenue = formatMetricResult(response, input, 'REVENUES')
    let formattedData: SalesAnalyticsState = {
        sales: sales,
        revenue: revenue
    }

    return formattedData
}

export const formatDataConsumptionResults = (response: GetAnalyticsOutput, input: AccountAnalyticsParameters): AccountAnalyticsData => {
    let formattedData: AccountAnalyticsData = formatMetricResult(response, input, 'DATA_CONSUMPTION')
    return formattedData
}

export const formatMetricResult = (response: GetAnalyticsOutput, input: ContentAnalyticsParameters | AccountAnalyticsParameters, metricToFilter: 'PLAYS' | 'IMPRESSIONS' | 'SALES' | 'REVENUES' | 'WATCHTIME' | 'DATA_CONSUMPTION'): AnalyticsMetricInfo => {
    let formattedData: AnalyticsMetricInfo = {
        time: {
            labels: [],
            data: [],
            table: []
        },
        device: {
            labels: [],
            data: [],
            table: []
        },
        location: {
            data: [],
            table: []
        }
    }

    let labels = formatLabels(input.timeRange, input.start, input.end, response)
    response.results.filter(metric => metric.data_dimension.includes(metricToFilter)).forEach(metric => {
        if(metric.data) {
            metric.data.forEach(data => {
                switch (data.dimension_type.type) {
                    case 'HOURLY':
                    case 'MONTH':
                    case 'DAY':
                        if(formattedData.time.labels.length === 0 ) {
                            formattedData.time.data = Array(labels.length).fill(0, 0, labels.length)
                            formattedData.time.labels = labels
                            formattedData.time.table = labels.map(label => { return { label: label, data: 0 } })
                        }
                        let label = formateTimestampAnalytics(metricToFilter === 'SALES' ? parseInt( data.dimension_type.value as string) / 1000 : parseInt(data.dimension_type.value as string), input.timeRange, response);
                        let indexLabel = labels.indexOf(label);
                        let index = formattedData.time.table.findIndex(obj => obj.label === label);
                        if (metricToFilter === "SALES") {
                            formattedData.time.data[indexLabel] += data.dimension_sum;
                            formattedData.time.table[index] ? formattedData.time.table[index].data += data.dimension_sum : null;

                        } else if (metricToFilter === "REVENUES") {
                            formattedData.time.data[indexLabel] = Math.round(formattedData.time.data[indexLabel] + data.dimension_sum);
                            formattedData.time.table[index] ? formattedData.time.table[index].data = Math.round(formattedData.time.table[index].data + data.dimension_sum) : null;

                        } else if(metricToFilter === 'DATA_CONSUMPTION') {
                            formattedData.time.data[indexLabel] = data.dimension_sum / 1000000000;
                            formattedData.time.table[index] ? formattedData.time.table[index].data = data.dimension_sum / 1000000000 : null;
                        } else if(indexLabel !== -1) {
                            formattedData.time.data[indexLabel] = data.dimension_sum;
                            formattedData.time.table[indexLabel].data = data.dimension_sum
                        }
                        break;
                    case 'DEVICE':
                        if (!formattedData || !formattedData.device) {
                            formattedData.device = { labels: [], data: [], table: [] }
                        }
                        formattedData.device = {
                            labels: [...(formattedData.device ? formattedData.device.labels : []), data.dimension_type.value.toString()],
                            data: [...(formattedData.device ? formattedData.device.data : []), data.dimension_sum],
                            table: [...(formattedData.device ? formattedData.device.table : []), { label: data.dimension_type.value.toString(), data: data.dimension_sum, }]
                        }
                        break;
                    case 'COUNTRY':
                        if (data.dimension_type.value !== 'Unknown') {
                            let index = formattedData.location.data.findIndex(obj => obj.city === data.dimension_type.value);
                            let indexTable = formattedData.location.table.findIndex(obj => world.features.find(e => e.id === data.dimension_type.value as string) && world.features.find(e => e.id === data.dimension_type.value as string).properties.name === obj.label ? world.features.find(e => e.id === data.dimension_type.value as string).properties.name : 'Unknown');
                            if(index === -1 ) {
                                formattedData.location = {
                                    data: [...(formattedData.location ? formattedData.location.data : []),
                                    {
                                        city: data.dimension_type.value as string,
                                        position: {
                                            latitude: 0,
                                            longitude: 0
                                        },
                                        value: [data.dimension_sum],
                                        label: [metricToFilter === 'WATCHTIME' ? formatTimeValue([data.dimension_sum]).unitLong : metricToFilter.toLowerCase()]
                                    }
                                    ],
                                    table: [...(formattedData.location.table ? formattedData.location.table : []), { label: world.features.find(e => e.id === data.dimension_type.value) ? world.features.find(e => e.id === data.dimension_type.value).properties.name : 'Unknown', data: data.dimension_sum }  ]
                                }
                            } else {
                                formattedData.location.data[index].value.push(data.dimension_sum)
                                formattedData.location.data[index].label.push(metricToFilter === 'WATCHTIME' ? formatTimeValue([data.dimension_sum]).unitLong : metricToFilter.toLowerCase())
                                formattedData.location.table[indexTable].data = data.dimension_sum;
                            }
                    
                        } else {
                            let indexTable = formattedData.location.table.findIndex(obj => obj.label === data.dimension_type.value.toString());
                            if(indexTable >= 0) {
                                formattedData.location.table[indexTable].data = data.dimension_sum;
                            } else {
                                formattedData.location.table = [...( formattedData.location ?  formattedData.location.table : []), { label: data.dimension_type.value.toString(), data: data.dimension_sum }  ]
                            }
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