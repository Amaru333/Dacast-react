import React from 'react';
import { BarChartOld } from '../../../components/Analytics/AnalyticsOld/BarChartOld';
import { tsToLocaleDate } from '../../../utils/formatUtils';
import DoubleLineChartOld from '../../../components/Analytics/AnalyticsOld/DoubleLineChartOld';
import { CheeseChartOld } from '../../../components/Analytics/AnalyticsOld/CheeseChartOld';
import ReactTable from "react-table";
import { AnalyticsDashboardInfos } from '../../redux-flow/store/Analytics/Dashboard';
import { AnalyticsCard, renderMap, DateFilteringAnalytics, ThirdLgHalfXmFullXs, HalfSmFullXs, FailedCardAnalytics, mergeForTable } from './AnalyticsCommunOld';
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
                    <AnalyticsCard dataName="playtimePerTime" table={ { data: mergeForTable(props.dashboardAnalytics.data.playtimePerTime? props.dashboardAnalytics.data.playtimePerTime.data: [], props.dashboardAnalytics.data.playtimePerTime && props.dashboardAnalytics.data.playtimePerTime.time  ? labelsFormate(props.dashboardAnalytics.data.playtimePerTime.time): []), columns: [{ Header: 'Mbytes', accessor: 'mb' }, { Header: 'Date', accessor: 'date' }] } } data={props.dashboardAnalytics.data.playtimePerTime.csv} infoText="How much data is consumed over time" title="Play time by Time">
                        {
                            props.dashboardAnalytics.data.playtimePerTime ?
                                props.dashboardAnalytics.data.playtimePerTime.failed ?
                                    <FailedCardAnalytics />
                                    :
                                    <BarChartOld
                                        datasetName="Seconds"
                                        beginAtZero={true}
                                        data={props.dashboardAnalytics.data.playtimePerTime.data}
                                        yAxesName="sec"
                                        labels={labelsFormate(props.dashboardAnalytics.data.playtimePerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard dataName="playsViewersPerTime" data={props.dashboardAnalytics.data.playsViewersPerTime ? props.dashboardAnalytics.data.playsViewersPerTime.csv : []} infoText="The number of views vs number of people viewing over time" title="Plays and Viewers by Time">
                        {
                            props.dashboardAnalytics.data.playsViewersPerTime ?
                                props.dashboardAnalytics.data.playsViewersPerTime.failed ?
                                    <FailedCardAnalytics /> :
                                    <DoubleLineChartOld
                                        datasetName="Hits"
                                        noDecimals={false}
                                        beginAtZero={true}
                                        yAxesName="Plays and viewers"
                                        datasetName1="plays"
                                        datasetName2="viewers"
                                        data1={props.dashboardAnalytics.data.playsViewersPerTime.plays.data}
                                        data2={props.dashboardAnalytics.data.playsViewersPerTime.viewers.data}
                                        labels={labelsFormate(props.dashboardAnalytics.data.playsViewersPerTime.plays.time)} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
            </div>

        </React.Fragment>
    )
}