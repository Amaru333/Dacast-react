import { AudienceAnalyticsState, ContentAnalyticsFinalState, ContentAnalyticsState } from '.'
import { GetContentAnalyticsInput, GetContentAnalyticsOutput, GetContentAnalyticsOutputItem, GetContentAnalyticsResultItemOutput } from '../../../../../DacastSdk/analytics'
import { CountriesDetail } from '../../../../constants/CountriesDetails';
import { SalesAnalyticsState, WatchAnalyticsState } from './types';


export const formatGetContentAnalyticsOutput = (response: GetContentAnalyticsOutput, data: GetContentAnalyticsInput): { contentId: string; contentType: string; data: ContentAnalyticsFinalState } => {
    

    var audienceData: AudienceAnalyticsState;
    var salesData: SalesAnalyticsState;
    var watchData: WatchAnalyticsState;

    const handleResultItem = async (element: GetContentAnalyticsResultItemOutput) => {
        element.results.forEach(metric => {
            switch(metric.dimension) {
                case "plays":
                case "impressions":
                    metric.data.forEach( data => {
                        switch(data.dimensionType.type) {
                            case 'HOURLY':
                            case 'MONTH':
                            case 'DAY':
                                if(!audienceData || !audienceData.playsImpressionsByTime) {
                                    audienceData.playsImpressionsByTime = { labels: [], plays: [], impressions: [], table: [] }
                                }
                                audienceData.playsImpressionsByTime = { 
                                    labels: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.labels : []) , ...( !audienceData.playsImpressionsByTime || audienceData.playsImpressionsByTime.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])  ], 
                                    plays: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.plays : []), ...(metric.dimension === "plays" ? [data.dimensionSum] : []) ],
                                    impressions: [...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.impressions : []), ...(metric.dimension === "impressions" ? [data.dimensionSum] : []) ],
                                    table: [ ...(audienceData.playsImpressionsByTime ? audienceData.playsImpressionsByTime.table : []) ]
                                }
                                break;
                            case 'DEVICE':
                                if(!audienceData || !audienceData.playsImpressionsByDevice) {
                                    audienceData.playsImpressionsByDevice = { labels: [], plays: [], impressions: [], table: [] }
                                }
                                audienceData.playsImpressionsByDevice = { 
                                    labels: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.labels : []) , ...( !audienceData.playsImpressionsByDevice || audienceData.playsImpressionsByDevice.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])  ], 
                                    plays: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.plays : []), ...(metric.dimension === "plays" ? [data.dimensionSum] : []) ],
                                    impressions: [...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.impressions : []), ...(metric.dimension === "impressions" ? [data.dimensionSum] : []) ],
                                    table: [ ...(audienceData.playsImpressionsByDevice ? audienceData.playsImpressionsByDevice.table : []) ]
                                }
                                break;
                            case 'COUNTRY':
                                if(!audienceData || !audienceData.playsImpressionsByLocation) {
                                    audienceData.playsImpressionsByLocation = { data: [], table: [] }
                                }
                                const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                                if(assosiatedCountry) {
                                    audienceData.playsImpressionsByLocation = { 
                                        data: [...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.data : []), {
                                            city: assosiatedCountry["\"Country\""],
                                            position:{
                                                latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                            },
                                            value: data.dimensionSum
                                        }],
                                        table: [ ...(audienceData.playsImpressionsByLocation ? audienceData.playsImpressionsByLocation.table : []) ]
                                    }
                                }
                                break;
                        }
                    })
                    break;
                    case "watchtime":
                        metric.data.forEach( data => {
                            switch(data.dimensionType.type) {
                                case 'HOURLY':
                                case 'MONTH':
                                case 'DAY':
                                    if(!watchData || !watchData.watchByTime) {
                                        watchData.watchByTime = { labels: [], data: [], table: [] }
                                    }
                                    watchData.watchByTime = { 
                                        labels: [...(watchData.watchByTime ? watchData.watchByTime.labels : []) , ...( !watchData.watchByTime || watchData.watchByTime.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])  ], 
                                        data: [...(watchData.watchByTime ? watchData.watchByTime.data : []), data.dimensionSum ],
                                        table: [ ...(watchData.watchByTime ? watchData.watchByTime.table : []) ]
                                    }
                                    break;
                                case 'DEVICE':
                                    if(!watchData || !watchData.watchByDevice) {
                                        watchData.watchByDevice = { labels: [], data: [], table: [] }
                                    }
                                    watchData.watchByDevice = { 
                                        labels: [...(watchData.watchByDevice ? watchData.watchByDevice.labels : []) , data.dimensionType.value], 
                                        data: [...(watchData.watchByDevice ? watchData.watchByDevice.data : []), data.dimensionSum],
                                        table: [ ...(watchData.watchByDevice ? watchData.watchByDevice.table : []) ]
                                    }
                                    break;
                                case 'COUNTRY':
                                    if(!watchData || !watchData.watchByLocation) {
                                        watchData.watchByLocation = { data: [], table: [] }
                                    }
                                    const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                                    if(assosiatedCountry) {
                                        watchData.watchByLocation = { 
                                            data: [...(watchData.watchByLocation ? watchData.watchByLocation.data : []), {
                                                city: assosiatedCountry["\"Country\""],
                                                position:{
                                                    latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                    longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                                },
                                                value: data.dimensionSum
                                            }],
                                            table: [ ...(watchData.watchByLocation ? watchData.watchByLocation.table : []) ]
                                        }
                                    }
                                    break;
                            }
                        })
                        case "sales":
                        case "revenues":
                            metric.data.forEach( data => {
                                switch(data.dimensionType.type) {
                                    case 'HOURLY':
                                    case 'MONTH':
                                    case 'DAY':
                                        if(!salesData || !salesData.salesRevenuesByTime) {
                                            salesData.salesRevenuesByTime = { labels: [], sales: [], revenues: [], table: [] }
                                        }
                                        salesData.salesRevenuesByTime = { 
                                            labels: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.labels : []) , ...( !salesData.salesRevenuesByTime || salesData.salesRevenuesByTime.labels.indexOf(data.dimensionType.value) < 0 ? [data.dimensionType.value] : [])  ], 
                                            sales: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.sales : []), ...(metric.dimension === "sales" ? [data.dimensionSum] : []) ],
                                            revenues: [...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.revenues : []), ...(metric.dimension === "revenues" ? [data.dimensionSum] : []) ],
                                            table: [ ...(salesData.salesRevenuesByTime ? salesData.salesRevenuesByTime.table : []) ]
                                        }
                                        break;
                                    case 'COUNTRY':
                                        if(!salesData || !salesData.salesRevenuesByLocation) {
                                            salesData.salesRevenuesByLocation = { data: [], table: [] }
                                        }
                                        const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === data.dimensionType.value);
                                        if(assosiatedCountry) {
                                            salesData.salesRevenuesByLocation = { 
                                                data: [...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.data : []), {
                                                    city: assosiatedCountry["\"Country\""],
                                                    position:{
                                                        latitude: parseInt(assosiatedCountry["\"Latitude(average)\""]),
                                                        longitude: parseInt(assosiatedCountry["\"Longitude(average)\""])
                                                    },
                                                    value: data.dimensionSum
                                                }],
                                                table: [ ...(salesData.salesRevenuesByLocation ? salesData.salesRevenuesByLocation.table : []) ]
                                            }
                                        }
                                        break;
                                }
                            })

            }
        })
    }
    
    response.forEach((element) => {
        handleResultItem(element)
    })


    if(data.dimension.indexOf('PLAYS_BY_TIME') > 0 && audienceData === undefined) {
        audienceData = { playsImpressionsByTime: { labels: [], plays: [], impressions: [], table: [] }, playsImpressionsByDevice: { labels: [], plays: [], impressions: [], table: [] }, playsImpressionsByLocation: { data: [], table: [] }}
    }
    if(data.dimension.indexOf('WATCHTIME_BY_COUNTRY') > 0 && watchData === undefined) {
        watchData = { watchByDevice: { labels: [], data: [], table: [] }, watchByLocation: { data:[], table: [] }, watchByTime: { labels: [], data: [], table: [] }}
    }
    if(data.dimension.indexOf('SALES_BY_COUNTRY') > 0 && salesData === undefined) {
        salesData = { salesRevenuesByTime: { labels: [], sales: [], revenues: [], table: [] }, salesRevenuesByLocation: { data:[], table: [] } }
    }

    return {
        contentId: data.id,
        contentType: data.type,
        data: {
            audience: audienceData,
            sales: salesData,
            watch: watchData
        }
    }
}

export const formatGetContentAnalyticsInput = (data: GetContentAnalyticsInput): GetContentAnalyticsInput => {
    return data
}

