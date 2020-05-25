import React from 'react';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB } from '../../../utils/utils';
import { AnalyticsCard, renderMap, HalfSmFullXs } from './AnalyticsCommun';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { RealTimePageProps } from '../../containers/Analytics/RealTime';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export const RealTimeAnalyticsPage = (props: RealTimePageProps) => {

    const labelsFormate = (labels: number[]) => { return labels.map(number => tsToLocaleDate(number)) };

    console.log(props);
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
                    list={{ '5 Minutes': false, '15 Minutes': false, '20 Minutes': false, '30 Minutes': false, '45 Minutes': false, '1 Hour': false, '1.5 Hour': false, '2 Hours': false }}
                />
                <DropdownSingle
                    id='liveChannelsDropdown'
                    isInModal
                    isWhiteBackground
                    className='col sm-col-3 col-5 px1'
                    dropdownTitle='Live Channel'
                    list={{ 'Channel1': false, 'Channel2': false }}
                />
                <Button style={{ marginBottom: 5 }} className='ml1' typeButton='primary' sizeButton='small' buttonColor='blue'>Apply</Button>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="concurentViewersPerTime" data={props.realTimeAnalytics.data.concurentViewersPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Concurent Viewers by Time (UTC)">
                        {
                            props.realTimeAnalytics.data.concurentViewersPerTime ?
                                <BarChart
                                    displayBytesFromGB={true}
                                    beginAtZero={true}
                                    data={props.realTimeAnalytics.data.concurentViewersPerTime.data}
                                    yAxesName="Concurent Viewers"
                                    datasetName="Concurent Viewers"
                                    labels={labelsFormate(props.realTimeAnalytics.data.concurentViewersPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="newPlaybackSessionsPerTime" data={props.realTimeAnalytics.data.newPlaybackSessionsPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="New Playback Sessions by Time (UTC)">
                        {
                            props.realTimeAnalytics.data.newPlaybackSessionsPerTime ?
                                <BarChart
                                    displayBytesFromGB={true}
                                    beginAtZero={true}
                                    data={props.realTimeAnalytics.data.newPlaybackSessionsPerTime.data}
                                    datasetName="New Playback Sessions"
                                    yAxesName="New Playback Sessions"
                                    labels={labelsFormate(props.realTimeAnalytics.data.newPlaybackSessionsPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="gbPerTime" data={props.realTimeAnalytics.data.gbPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="GBytes by Time (UTC)">
                        {
                            props.realTimeAnalytics.data.gbPerTime ?
                                <BarChart
                                    datasetName="GBytes"
                                    displayBytesFromGB={true}
                                    beginAtZero={true}
                                    data={props.realTimeAnalytics.data.gbPerTime.data}
                                    yAxesName="GB"
                                    labels={labelsFormate(props.realTimeAnalytics.data.gbPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                        
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="consumptionPerLocation" data={props.realTimeAnalytics.data.consumptionPerLocation} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Location">
                        {
                            props.realTimeAnalytics.data.consumptionPerLocation ?
                                renderMap(props.realTimeAnalytics.data.consumptionPerLocation, 'realTimeAnalyticsConsumptionPerLocation')
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}