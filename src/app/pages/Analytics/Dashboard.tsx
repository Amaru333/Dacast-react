import React from 'react';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate } from '../../utils/utils';
import DoubleLineChart from '../../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import { AnalyticsDashboardInfos } from '../../redux-flow/store/Analytics/Dashboard';
import { AnalyticsCard, renderMap, DateFilteringAnalytics } from './AnalyticsCommun';
import { DashboardPageProps } from '../../containers/Analytics/Dashboard';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

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

    const labelsFormate = (labels: number[]) => { return labels.map(number => tsToLocaleDate(number)) };

    const refreshData = (dates: any) => {
        props.getAnalyticsDashboardConsumptionDevice(dates);
        props.getAnalyticsDashboardConsumptionLocation(dates);
        props.getAnalyticsDashboardConsumptionTime(dates);
        props.getAnalyticsDashboardPlaysViewersTime(dates);
        props.getAnalyticsDashboardTopContents(dates);
    }

    console.log(props);
    return (
        <React.Fragment>
            <DateFilteringAnalytics refreshData={refreshData} />
            <div className="clearfix mxn1 mb2">
                <div className="col col-4 px1">
                    <AnalyticsCard dataName="consumptionPerTime" data={props.dashboardAnalytics.data.consumptionPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption By Time">
                        {
                            props.dashboardAnalytics.data.consumptionPerTime ?
                                <BarChart
                                    datasetName="GBytes"
                                    displayBytesFromGB={true}
                                    beginAtZero={true}
                                    data={props.dashboardAnalytics.data.consumptionPerTime.data}
                                    yAxesName="GB"
                                    labels={labelsFormate(props.dashboardAnalytics.data.consumptionPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard dataName="playsViewersPerTime" data={props.dashboardAnalytics.data.playsViewersPerTime ? props.dashboardAnalytics.data.playsViewersPerTime.plays : []} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Plays and Viewers by Time">
                        {
                            props.dashboardAnalytics.data.playsViewersPerTime ?
                                <DoubleLineChart
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
                <div className="col col-4 px1">
                    <AnalyticsCard dataName="consumptionPerDevice" data={props.dashboardAnalytics.data.consumptionPerDevice ? props.dashboardAnalytics.data.consumptionPerDevice : false} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Device">
                        {
                            props.dashboardAnalytics.data.consumptionPerDevice ?
                                <CheeseChart
                                    displayBytesFromGB={true}
                                    data={props.dashboardAnalytics.data.consumptionPerDevice.data}
                                    labels={props.dashboardAnalytics.data.consumptionPerDevice.labels} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard dataName="topContents" data={props.dashboardAnalytics.data.topContents ? props.dashboardAnalytics.data.topContents.data : []} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Top Content">
                        {
                            props.dashboardAnalytics.data.topContents ?
                                <ReactTable
                                    data={props.dashboardAnalytics.data.topContents.data}
                                    columns={COLUMNS_TOP_CONTENT}
                                    pageSizeOptions={[5, 10, 20, 25]}
                                    defaultPageSize={10} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className="col col-6 px1">
                    <AnalyticsCard dataName="consumptionPerLocation" data={props.dashboardAnalytics.data.consumptionPerLocation ? props.dashboardAnalytics.data.consumptionPerLocation.data : []} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Location">
                        {
                            props.dashboardAnalytics.data.consumptionPerLocation ?
                                renderMap(props.dashboardAnalytics.data.consumptionPerLocation.data, 'dashbordMapConsumptionPerLocation') :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}