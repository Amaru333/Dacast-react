import React from 'react';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate } from '../../../utils/utils';
import DoubleLineChart from '../../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import { AnalyticsDashboardInfos } from '../../redux-flow/store/Analytics/Dashboard';
import { AnalyticsCard, renderMap, DateFilteringAnalytics, ThirdLgHalfXmFullXs, HalfSmFullXs, FailedCardAnalytics, mergeForTable } from './AnalyticsCommun';
import { DashboardPageProps } from '../../containers/Analytics/Dashboard';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import moment from 'moment';

export const DashboardAnalyticsPage = (props: DashboardPageProps) => {

    const COLUMNS_TOP_CONTENT = [
        {
            Header: 'Content',
            accessor: 'content'
        },
        {
            Header: 'Watch Time (sec)',
            accessor: 'watchTime'
        },
        {
            Header: 'Number of views',
            accessor: 'views'
        },
        {
            Header: 'Revenue (USD)',
            accessor: 'revenueUsd'
        },
        {
            Header: 'Revenue (EUR)',
            accessor: 'revenueEur'
        }
    ]

    const [dates, setDates] = React.useState<{ end: number; start: number }>({ end: moment().subtract(1, 'hour'), start: moment().subtract(1, 'days') })

    const labelsFormate = (labels: number[]) => {
        if(!labels.length) {
            return [];
        }
        if (dates.start + (24 * 3600) < dates.end) {
            return labels.map(number => tsToLocaleDate(number, { hour: "2-digit", minute: "2-digit", day: '2-digit' }))
        }
        return labels.map(number => tsToLocaleDate(number))
    };

    const refreshData = (dates: any) => {
        setDates(dates);
        props.getAnalyticsDashboard({ end: Math.round(dates.endDate / 1000), start: Math.round(dates.startDate / 1000) });
    }

    

    return (
        <React.Fragment>
            <DateFilteringAnalytics defaultDates={dates} refreshData={refreshData} />
            <div className="clearfix mxn1 mb2">
                <div className={HalfSmFullXs}>
                    <AnalyticsCard dataName="consumptionPerTime" table={ { data: mergeForTable(props.dashboardAnalytics.data.consumptionPerTime? props.dashboardAnalytics.data.consumptionPerTime.data: [], props.dashboardAnalytics.data.consumptionPerTime && props.dashboardAnalytics.data.consumptionPerTime.time  ? labelsFormate(props.dashboardAnalytics.data.consumptionPerTime.time): []), columns: [{ Header: 'Mbytes', accessor: 'mb' }, { Header: 'Date', accessor: 'date' }] } } data={props.dashboardAnalytics.data.consumptionPerTime} infoText="How much data is consumed over time" title="Consumption by Time">
                        {
                            props.dashboardAnalytics.data.consumptionPerTime ?
                                props.dashboardAnalytics.data.consumptionPerTime.data.failed ?
                                    <FailedCardAnalytics />
                                    :
                                    <BarChart
                                        datasetName="GBytes"
                                        beginAtZero={true}
                                        data={props.dashboardAnalytics.data.consumptionPerTime.data}
                                        yAxesName="GB"
                                        displayFromMb
                                        labels={labelsFormate(props.dashboardAnalytics.data.consumptionPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard dataName="playsViewersPerTime" data={props.dashboardAnalytics.data.playsViewersPerTime ? props.dashboardAnalytics.data.playsViewersPerTime.plays : []} infoText="The number of views vs number of people viewing over time" title="Plays and Viewers by Time">
                        {
                            props.dashboardAnalytics.data.playsViewersPerTime ?
                                props.dashboardAnalytics.data.playsViewersPerTime.data.failed ?
                                    <FailedCardAnalytics /> :
                                    <DoubleLineChart
                                        datasetName="Hits"
                                        noDecimals={false}
                                        beginAtZero={true}
                                        yAxesName="Plays and viewers"
                                        datasetName1="plays"
                                        datasetName2="viewers"
                                        data1={props.dashboardAnalytics.data.playsViewersPerTime.data.plays.data}
                                        data2={props.dashboardAnalytics.data.playsViewersPerTime.data.viewers.data}
                                        labels={labelsFormate(props.dashboardAnalytics.data.playsViewersPerTime.data.plays.time)} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                {
                    //PART OF ANALYTICS V2 TO REWORK
                
                    // <div className={ThirdLgHalfXmFullXs}>
                    //     <AnalyticsCard dataName="consumptionPerDevice" data={props.dashboardAnalytics.data.consumptionPerDevice ? props.dashboardAnalytics.data.consumptionPerDevice : false} infoText="The proportion of views from each type of device" title="Consumption by Device">
                    //         {
                    //             props.dashboardAnalytics.data.consumptionPerDevice ?
                    //                 props.dashboardAnalytics.data.consumptionPerDevice.data.failed ?
                    //                     <FailedCardAnalytics /> :
                    //                     <CheeseChart
                    //                         displayBytesFromGB={true}
                    //                         data={props.dashboardAnalytics.data.consumptionPerDevice.data}
                    //                         labels={props.dashboardAnalytics.data.consumptionPerDevice.labels} /> :
                    //                 <LoadingSpinner center size='medium' color='violet' />
                    //         }

                    //     </AnalyticsCard>
                    // </div>
                    // <div style={{ float: "right" }} className={HalfSmFullXs}>
                    //     <AnalyticsCard dataName="topContents" data={props.dashboardAnalytics.data.topContents ? props.dashboardAnalytics.data.topContents.data : []} infoText="Viewership and revenue for your content" title="Top Content">
                    //         {
                    //             props.dashboardAnalytics.data.topContents ?
                    //                 props.dashboardAnalytics.data.topContents.data.failed ?
                    //                     <FailedCardAnalytics /> :
                    //                     <ReactTable
                    //                         data={props.dashboardAnalytics.data.topContents.data}
                    //                         columns={COLUMNS_TOP_CONTENT}
                    //                         pageSizeOptions={[5, 10, 20, 25]}
                    //                         defaultPageSize={10} /> :
                    //                 <LoadingSpinner center size='medium' color='violet' />
                    //         }
                    //     </AnalyticsCard>
                    // </div>
                    // <div className={HalfSmFullXs}>
                    //     <AnalyticsCard dataName="consumptionPerLocation" data={props.dashboardAnalytics.data.consumptionPerLocation ? props.dashboardAnalytics.data.consumptionPerLocation : []} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Location">
                    //         {
                    //             props.dashboardAnalytics.data.consumptionPerLocation.data ?
                    //                 props.dashboardAnalytics.data.consumptionPerLocation.failed ?
                    //                     <FailedCardAnalytics /> :
                    //                     renderMap(props.dashboardAnalytics.data.consumptionPerLocation.data, 'dashbordMapConsumptionPerLocation') :
                    //                 <LoadingSpinner center size='medium' color='violet' />
                    //         }
                    //     </AnalyticsCard>
                    // </div>
                    
                }


            </div>

        </React.Fragment>
    )
}