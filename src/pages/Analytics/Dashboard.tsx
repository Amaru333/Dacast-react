import React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card/Card';
import { Text } from '../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { BarChart } from '../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB, CsvService } from '../../utils/utils';
import DoubleLineChart from '../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import LeafletMap from '../../components/Analytics/LeafletMap';
import { AnalyticsDashboardInfos } from '../../redux-flow/store/Analytics/Dashboard';
import { DateRangePickerWrapper } from '../../components/FormsComponents/Datepicker/DateRangePickerWrapper';

export const DashboardAnalyticsPage = (props: AnalyticsDashboardInfos) => {

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

    //Function to create the Map
    //I know its a bit of a mess with Typescript, I didn;t have the time to set the right type so everything is Any
    // dataRepo should follow the following structure tho [{ "city": "San Francisco (California)", "position": { "latitude": 37.7484, "longitude": -122.4156 }, "consumedMB": 36.8285 }, ...otherItems...]
    const renderMap = (dataRepo: any) => {
        let mapMin: any = Math.min(...dataRepo.map(m => m.consumedMB));
        if (isFinite(mapMin)) {
            mapMin = displayBytesForHumans(mapMin, true);
        } else {
            mapMin = 'No Data';
        }
        let mapMax: any = Math.max(...dataRepo.map(m => m.consumedMB));
        if (isFinite(mapMax)) {
            mapMax = displayBytesForHumans(mapMax, true);
        } else {
            mapMax = 'No Data';
        }

        return (
            <div>
                <LeafletMap
                    height="400px"
                    markerNameTranform={mapMarkerNameTranformBytesFromGB}
                    markers={props.consumptionPerLocation.data} />
                <div className="flex mt2 justify-center">
                    <a className="mr2">{mapMin}</a>
                    <div style={{ backgroundColor: '#93d5ed', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#45a5f5', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#4285f4', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#2f5ec4', height: '20px', width: '30px' }}></div>
                    <a className="ml2">{mapMax}</a>
                </div>
            </div>
        )
    }


    return (
        <React.Fragment>
            <div className="col col-12 mb25">

                <DateRangePickerWrapper />

            </div>
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
                        {renderMap(props.consumptionPerLocation.data)}
                    </AnalyticsCard>
                </div>
                
            </div>

        </React.Fragment>
    )
}


// Basics Card components, infoText = what's in the information icon tooltip; title = The title of the card; 
// Data= data that will be csv export (play around to fogure out not that fificult)
// Data name = name of the file to register the csv might delete later 
// the chart is in the children state
// Its used in every file so might need to get it out of here at one point
export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & { infoText: string; title: string; data: any; dataName: string}) => {

    const exportCsvAnalytics = (data: any) => {
        CsvService.exportToCsv(props.dataName+".csv", Object.values(data));
    };

    return (
        <AnalyticsCardStyle className={props.className}>
            <AnalyticsCardHeader>
                <Text className='mb2' size={16} weight="med" color="gray-1">{props.title}</Text>
                <div>
                    <Icon id={"tooltip" + props.id}>info_outlined</Icon>
                    <Tooltip target={"tooltip" + props.id}>{props.infoText}</Tooltip>
                    <Icon onClick={() => {exportCsvAnalytics(props.data)} } >get_app</Icon>
                </div>
            </AnalyticsCardHeader>
            {props.children}
        </AnalyticsCardStyle>
    )
}

export const AnalyticsCardStyle = styled(Card)<{}>`
    padding: 16px !important;
    min-height: 273px;
`


export const AnalyticsCardHeader = styled.div<{}>`
    display: flex;
    justify-content: space-between;
`