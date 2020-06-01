import React from 'react';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB } from '../../../utils/utils';
import { AnalyticsCard, renderMap, HalfSmFullXs, FailedCardAnalytics } from './AnalyticsCommun';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { RealTimePageProps } from '../../containers/Analytics/RealTime';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { LiveItem } from '../../redux-flow/store/Live/General/types';

export const RealTimeAnalyticsPage = (props: RealTimePageProps) => {

    const labelsFormate = (labels: number[]) => { return labels.map(number => tsToLocaleDate(number, { hour: "2-digit", minute: "2-digit", day: '2-digit' })) };
    const [timePeriod, setTimePeriod] = React.useState<number>(5)
    React.useEffect(() => {
    }, [props.liveList])

    const handleReload = () => {
        props.getAnalyticsRealTimeJobIds({period: timePeriod })
    }
    const handleTimePeriodsUpdate = (name: string) => {
        switch (name) {
            case '5 Minutes':
                setTimePeriod(5);
            case '15 Minutes':
                setTimePeriod(15);
            case '30 Minutes':
                setTimePeriod(30);
            case '45 Minutes':
                setTimePeriod(45);
            case '1 Hour':
                setTimePeriod(60);
            case '1.5 Hour':
                setTimePeriod(90);
            case '2 Hours':
                setTimePeriod(120);
        }

    }
    return (
        <React.Fragment>
            <div className="flex items-end col col-12 mb25">
                <DropdownSingle
                    id='timeRefreshDropdown'
                    callback={(name: string) => { handleTimePeriodsUpdate(name) }}
                    isInModal={false}
                    isWhiteBackground
                    className='col sm-col-2 col-5 pr1'
                    dropdownTitle='Time Period'
                    list={{ '5 Minutes': true, '15 Minutes': false, '20 Minutes': false, '30 Minutes': false, '45 Minutes': false, '1 Hour': false, '1.5 Hour': false, '2 Hours': false }}
                />
                {props.liveList ?
                    <DropdownSingle
                        id='liveChannelsDropdown'
                        isInModal
                        isWhiteBackground
                        className='col sm-col-3 col-5 px1'
                        dropdownTitle='Live Channel'
                        callback={(name: string) => {}}
                        list={props.liveList.results.reduce((reduced: DropdownListType, item: LiveItem) => { return { ...reduced, [item.title]: false } }, {})}
                    /> : null
                }

                <Button onClick={handleReload} style={{ marginBottom: 5 }} className='ml1' typeButton='primary' sizeButton='small' buttonColor='blue'>Apply</Button>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="concurentViewersPerTime" data={props.realTimeAnalytics.data.concurentViewersPerTime} infoText="The number of viewers consuming your content at the same time" title="Concurent Viewers by Time (UTC)">
                        {
                            props.realTimeAnalytics.data.concurentViewersPerTime ?
                                props.realTimeAnalytics.data.concurentViewersPerTime.data.failed ?
                                    <FailedCardAnalytics /> :
                                    <BarChart
                                        beginAtZero={true}
                                        data={props.realTimeAnalytics.data.concurentViewersPerTime.data.data}
                                        yAxesName="Concurent Viewers"
                                        datasetName="Concurent Viewers"
                                        labels={labelsFormate(props.realTimeAnalytics.data.concurentViewersPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="newPlaybackSessionsPerTime" data={props.realTimeAnalytics.data.newPlaybackSessionsPerTime} infoText="The number of new viewers who haven't consumed your content before" title="New Playback Sessions by Time (UTC)">
                        {
                            props.realTimeAnalytics.data.newPlaybackSessionsPerTime ?
                                props.realTimeAnalytics.data.newPlaybackSessionsPerTime.data.failed ?
                                    <FailedCardAnalytics /> :
                                    <BarChart
                                        beginAtZero={true}
                                        data={props.realTimeAnalytics.data.newPlaybackSessionsPerTime.data.data}
                                        datasetName="New Playback Sessions"
                                        yAxesName="New Playback Sessions"
                                        labels={labelsFormate(props.realTimeAnalytics.data.newPlaybackSessionsPerTime.data.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="gbPerTime" data={props.realTimeAnalytics.data.gbPerTime} infoText="Data consumption over time" title="GBytes by Time (UTC)">
                        {
                            props.realTimeAnalytics.data.gbPerTime ?
                                props.realTimeAnalytics.data.gbPerTime.data.failed ?
                                    <FailedCardAnalytics /> :
                                    <BarChart
                                        datasetName="GBytes"
                                        displayFromMb
                                        beginAtZero={true}
                                        data={props.realTimeAnalytics.data.gbPerTime.data}
                                        yAxesName="GB"
                                        labels={labelsFormate(props.realTimeAnalytics.data.gbPerTime.data.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="consumptionPerLocation" data={props.realTimeAnalytics.data.consumptionPerLocation} infoText="Where viewers are consuming your data" title="Consumption by Location">
                        {
                            props.realTimeAnalytics.data.consumptionPerLocation ?
                                props.realTimeAnalytics.data.consumptionPerLocation.failed ?
                                    <FailedCardAnalytics /> :
                                    renderMap(props.realTimeAnalytics.data.consumptionPerLocation.data, 'realTimeAnalyticsConsumptionPerLocation')
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}