import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { AnalyticsDimensions, ContentAnalyticsFinalState, ContentAnalyticsParameters, RealTimeRange, TimeRangeAnalytics } from '../../redux-flow/store/Content/Analytics';
import { AudienceDimension, RealTimeDimension, SalesDimension, WatchDurationDimension } from './AnalyticsCommun';
import { AudienceAnalytics } from './AnalyticsType/AudienceAnalytics';
import { EngagementAnalytics } from './AnalyticsType/EngagementAnalytics';
import { RealTimeAnalytics } from './AnalyticsType/RealTimeAnalytics';
import { SalesAnalytics } from './AnalyticsType/SalesAnalytics';
import { WatchDurationAnalytics } from './AnalyticsType/WatchDurationAnalytics';
import { DateFilteringAnalytics } from './DateFilteringAnalytics';
import { RealTimeDropdown } from './RealTimeDropdown';
import moment from 'moment';
import { userToken } from '../../utils/services/token/tokenService';

export interface ContentAnalyticsProps {
    contentId: string,
    contentType: ContentAnalyticsTypes,
    getContentAnalytics: (options: ContentAnalyticsParameters) => Promise<void>,
    contentAnalyticsData: ContentAnalyticsFinalState;
}

export type ContentAnalyticsTypes = 'live' | 'vod';

export type ContentAnalyticsDropdownValues = 'audience' | 'watch-duration' | 'sales' | 'engagement' | 'real-time';

const TabsDimensionLink: { [key: string]: AnalyticsDimensions[] } = {
    'audience': AudienceDimension,
    'watch-duration': WatchDurationDimension,
    'sales': SalesDimension,
    'real-time': RealTimeDimension
}

export const ContentAnalytics = (props: ContentAnalyticsProps) => {

    const [currentTab, setCurrentTab] = React.useState<ContentAnalyticsDropdownValues>('audience')
    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAnalytics, custom: { start: number; end: number } }>( {timeRange: 'LAST_WEEK', custom: { end: moment().valueOf(), start: moment().subtract(1, 'week').valueOf() } } )
    const [realTimeRangePick, setRealTimeRangePick] = React.useState<RealTimeRange>('LAST_45_MINUTES')

    const [loading, setLoading] = React.useState<boolean>(false)

    const loaded = React.useRef(false);


    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                setLoading(true)
                props.getContentAnalytics({
                    id: props.contentId,
                    dimension: TabsDimensionLink[currentTab],
                    timeRange: currentTab === 'real-time' ? realTimeRangePick : timeRangePick.timeRange,
                    type: props.contentType,
                    start: timeRangePick.timeRange === 'CUSTOM' ? timeRangePick.custom.start : undefined,
                    end: timeRangePick.timeRange === 'CUSTOM' ? timeRangePick.custom.end : undefined,
                }).then(() => {
                    setLoading(false)
                })
            }
            
        } else {
            loaded.current = true;
        }
        
    }, [currentTab, timeRangePick, realTimeRangePick])

    const handleExtraSettings = () => {
        switch (currentTab) {
            case 'audience':
            case 'watch-duration':
            case 'sales':
            case 'engagement':
                return (
                    <DateFilteringAnalytics
                        selectedPreset={timeRangePick.timeRange}
                        isDisabled={loading}
                        className='col col-9'
                        defaultDates={{ start: timeRangePick.custom.start, end: timeRangePick.custom.end }}
                        callback={(info) => { setTimeRangePick(  {timeRange: info.value, custom: info.value === "CUSTOM" ?  { start: info.startDate, end: info.endDate} : timeRangePick.custom } ) } }
                    />
                )
            case 'real-time':
                return (
                    <RealTimeDropdown
                        callback={(value) => setRealTimeRangePick(value)}
                    />
                )
            default:
                break;
        }
    }

    const handleAnalyticsType = () => {
        switch (currentTab) {
            case 'audience':
                return props.contentAnalyticsData.audience ?
                    <AudienceAnalytics data={props.contentAnalyticsData.audience} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'watch-duration':
                return props.contentAnalyticsData.watch && Object.keys(props.contentAnalyticsData.watch).length !== 0 ?
                    <WatchDurationAnalytics data={props.contentAnalyticsData.watch} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'sales':
                return props.contentAnalyticsData.sales ?
                    <SalesAnalytics data={props.contentAnalyticsData.sales} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'engagement':
                return (
                    <EngagementAnalytics />
                )
            case 'real-time':
                return props.contentAnalyticsData.realtime ?
                    <RealTimeAnalytics data={props.contentAnalyticsData.realtime} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            default:
                break;
        }
    }

    const contentAnalyticsDropdownItems = [
        { title: "Audience", data: "audience" },
        { title: "Watch Duration", data: "watch-duration" },
        { title: "Sales & Revenue", data: "sales" },
        // { title: "Engagement", data: "engagement" },
        ...(props.contentType === "live" ? [{ title: "Real Time", data: "real-time" }] : [])
    ]


    return (
        <React.Fragment>
            <div className="flex mb2">
                <DropdownSingle
                    isWhiteBackground
                    className='col col-3 self-end mr2'
                    id='content-analytics-dropdown'
                    list={contentAnalyticsDropdownItems}
                    dropdownTitle=""
                    dropdownDefaultSelect={"Audience"}
                    callback={(item: DropdownSingleListItem) => { setCurrentTab(item.data) }}
                />
                {handleExtraSettings()}
            </div>
            {
                loading ? <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer> :
                    <div>
                        {handleAnalyticsType()}
                    </div>
            }

        </React.Fragment>

    )
}