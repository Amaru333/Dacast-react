import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Datepicker } from '../../../components/FormsComponents/Datepicker/DateRangePicker';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB } from '../../../utils/utils';
import DoubleLineChart from '../../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import LeafletMap from '../../../components/Analytics/LeafletMap';
import { AnalyticsRealTimeInfos } from '../../redux-flow/store/Analytics/RealTime';
import { AnalyticsCard, renderMap, HalfSmFullXs } from './AnalyticsCommun';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const RealTimeAnalyticsPage = (props: AnalyticsRealTimeInfos) => {
    

    const labelsFormate = (labels: number[]) => {return labels.map(number => tsToLocaleDate(number))};

    return (
        <React.Fragment>
            <div className="flex items-end col col-12 mb25">
                <DropdownSingle 
                    id='timeRefreshDropdown'
                    isInModal={false}
                    isWhiteBackground
                    dropdownDefaultSelect='5 mins'
                    className='col sm-col-2 col-5 pr1'
                    dropdownTitle='Time Period' 
                    list={{'5 Minutes': false, '15 Minutes': false, '20 Minutes': false, '30 Minutes': false, '45 Minutes': false, '1 Hour': false, '1.5 Hour': false, '2 Hours': false}}
                    isWhiteBackground
                />
                <DropdownSingle
                    id='liveChannelsDropdown'
                    isInModal
                    isWhiteBackground
                    className='col sm-col-3 col-5 px1'
                    dropdownTitle='Live Channel'
                    list={{'Channel1': false, 'Channel2': false}}
                    isWhiteBackground
                />
                <Button className='ml1' typeButton='primary' sizeButton='large' buttonColor='blue'>Apply</Button>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="concurentViewersPerTime" data={props.concurentViewersPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Concurent Viewers by Time (UTC)">
                        <BarChart
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.concurentViewersPerTime.data}
                            yAxesName="Concurent Viewers"
                            datasetName="Concurent Viewers"
                            labels={labelsFormate(props.concurentViewersPerTime.time)} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="newPlaybackSessionsPerTime" data={props.newPlaybackSessionsPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="New Playback Sessions by Time (UTC)">
                        <BarChart
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.newPlaybackSessionsPerTime.data}
                            datasetName="New Playback Sessions"
                            yAxesName="New Playback Sessions"
                            labels={labelsFormate(props.newPlaybackSessionsPerTime.time)} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="gbPerTime" data={props.gbPerTime}  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="GBytes by Time (UTC)">
                        <BarChart
                            datasetName="GBytes"
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.gbPerTime.data}
                            yAxesName="GB"
                            labels={labelsFormate(props.gbPerTime.time)} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="consumptionPerLocation" data={props.consumptionPerLocation.data} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Location">
                        {renderMap(props.consumptionPerLocation.data, 'realTimeAnalyticsConsumptionPerLocation')}
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}