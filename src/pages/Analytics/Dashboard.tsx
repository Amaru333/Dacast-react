import React from 'react';
import { BarChart } from '../../components/Analytics/BarChart';
import { tsToLocaleDate } from '../../utils/utils';
import DoubleLineChart from '../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import { AnalyticsDashboardInfos } from '../../redux-flow/store/Analytics/Dashboard';
import { AnalyticsCard, renderMap, DateFilteringAnalytics } from './AnalyticsCommun';

export const DashboardAnalyticsPage = (props: {getAnalyticsDashboard: Function} & AnalyticsDashboardInfos) => {

    //Map header accesseur match data
    // Only for ReactTable (table for some analytics like Top COntents)
    // accesor must match the object attribut for sort by columns and stuff
    // The pagination is automatically done, you need to send all the data to the table
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

    //Just to turn timestamp into locale Date, might need update for some analytics that required hours instead of Day 
    const labelsFormate = (labels: number[]) => {return labels.map(number => tsToLocaleDate(number))};
    
    return (
        <React.Fragment>
            <DateFilteringAnalytics refreshData={props.getAnalyticsDashboard} />
            <div className="clearfix mxn1 mb2">
                <div className="col col-4 px1">
                    {
                        //So get to the Analytics Card components to understand how it works there's some comments down their
                    }
                    <AnalyticsCard dataName="consumptionPerTime" data={props.consumptionPerTime}  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption By Time">
                        {
                            //Classic Bar Chart, data is an array of value, labels is also an array. Data is for the height of bars ofc and labels are date most of the time (or timestanp in our case)
                        }
                        <BarChart
                            datasetName="GBytes"
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.consumptionPerTime.data}
                            yAxesName="GB"
                            labels={labelsFormate(props.consumptionPerTime.time)} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard dataName="playsViewersPerTime" data={props.playsViewersPerTime.plays} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Plays and Viewers by Time">
                        {
                            //Line chart, here's a double line (plays AND views)pretty much the same as Bar Chart
                        }
                        <DoubleLineChart
                            datasetName="Hits"
                            noDecimals={false}
                            beginAtZero={true}
                            yAxesName="Plays and viewers"
                            datasetName1="plays"
                            datasetName2="viewers"
                            data1={props.playsViewersPerTime.plays.data}
                            data2={props.playsViewersPerTime.viewers.data}
                            labels={labelsFormate(props.playsViewersPerTime.plays.time)} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard dataName="consumptionPerDevice" data={props.consumptionPerDevice} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Device">
                        {
                            //Cheese chart is the easiest one
                            //Data in an array of number and labels array of string
                        }
                        <CheeseChart
                            displayBytesFromGB={true}
                            data={props.consumptionPerDevice.data}
                            labels={props.consumptionPerDevice.labels} />
                    </AnalyticsCard>
                </div>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard dataName="topContents" data={props.topContents.data} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Top Content">
                        {
                            //This is taken from a package named ReactTable, you can have a look at the doc its well explained
                            // Just columns need to match element in the data (for this one check out the TopContent Type in types.ts for dashboard redux flow)
                        }
                        <ReactTable
                            data={props.topContents.data}
                            columns={COLUMNS_TOP_CONTENT}
                            pageSizeOptions={[5, 10, 20, 25]}
                            defaultPageSize={10} />
                    </AnalyticsCard>
                </div>
                <div className="col col-6 px1">
                    <AnalyticsCard dataName="consumptionPerLocation" data={props.consumptionPerLocation.data} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Location">
                        {
                            //Check out the renderMap function there's some comments up here
                        }
                        {renderMap(props.consumptionPerLocation.data, 'dashbordMapConsumptionPerLocation')}
                    </AnalyticsCard>
                </div>
                
            </div>

        </React.Fragment>
    )
}