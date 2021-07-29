import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { AnalyticsDimensions, ContentAnalyticsFinalState, ContentAnalyticsParameters, RealTimeRange, TimeRangeAnalytics } from '../../redux-flow/store/Content/Analytics';
import { AudienceDimension, getAnalyticsQsParams, RealTimeDimension, SalesDimension, setAnalyticsQsParams, WatchDurationDimension } from './AnalyticsCommun';
import { AudienceAnalytics } from './AnalyticsType/AudienceAnalytics';
import { RealTimeAnalytics } from './AnalyticsType/RealTimeAnalytics';
import { SalesAnalytics } from './AnalyticsType/SalesAnalytics';
import { WatchDurationAnalytics } from './AnalyticsType/WatchDurationAnalytics';
import { DateFilteringAnalytics } from './DateFilteringAnalytics';
import { RealTimeDropdown } from './RealTimeDropdown';
import { dateAdd } from '../../../utils/services/date/dateService';

export interface ContentAnalyticsProps {
    contentId: string,
    contentType: ContentAnalyticsTypes,
    getContentAnalytics: (options: ContentAnalyticsParameters) => Promise<void>,
    contentAnalyticsData: ContentAnalyticsFinalState;
}

export type ContentAnalyticsTypes = 'live' | 'vod';

export type ContentAnalyticsDropdownValues = 'audience' | 'paywall' | 'engagement' | 'real-time';

const TabsDimensionLink: { [key: string]: AnalyticsDimensions[] } = {
    'audience': AudienceDimension,
    'engagement': WatchDurationDimension,
    'paywall': SalesDimension,
    'real-time': RealTimeDimension
}

export const ContentAnalytics = (props: ContentAnalyticsProps) => {
    const {timeRange, defaultMetric, startDate, endDate} = getAnalyticsQsParams()

    const [currentTab, setCurrentTab] = React.useState<ContentAnalyticsDropdownValues>(defaultMetric && defaultMetric.name ? defaultMetric.name as ContentAnalyticsDropdownValues : 'audience')
    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAnalytics, custom: { start: number; end: number } }>( {timeRange: timeRange as TimeRangeAnalytics, custom: { end: parseInt(endDate) || new Date().getTime(), start: parseInt(startDate) || dateAdd(new Date, 'week', -1).getTime() } } )
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

    const handleDatepickerChange = (info: {value?: TimeRangeAnalytics, startDate?: number, endDate?: number}) => {
        if(info.endDate && info.startDate) {
            setTimeRangePick(  {timeRange: info.value, custom: info.value === "CUSTOM" ?  { start: info.startDate, end: info.endDate} : timeRangePick.custom })
            setAnalyticsQsParams({key: 'timeRange', value: info.value}, info.startDate, info.endDate)
        }
    }

    const handleExtraSettings = () => {
        switch (currentTab) {
            case 'audience':
            case 'paywall':
            case 'engagement':
                return (
                    <DateFilteringAnalytics
                        selectedPreset={timeRangePick.timeRange}
                        className='col col-9'
                        defaultDates={{ start: timeRangePick.custom.start, end: timeRangePick.custom.end }}
                        callback={(info) =>  handleDatepickerChange(info) }
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
                    <AudienceAnalytics showTable loading={loading} data={props.contentAnalyticsData.audience} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'engagement':
                return props.contentAnalyticsData.watch && Object.keys(props.contentAnalyticsData.watch).length !== 0 ?
                    <WatchDurationAnalytics showTable loading={loading} data={props.contentAnalyticsData.watch} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'paywall':
                return props.contentAnalyticsData.sales ?
                    <SalesAnalytics showTable loading={loading} data={props.contentAnalyticsData.sales} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            // case 'engagement':
            //     return (
            //         <EngagementAnalytics />
            //     )
            case 'real-time':
                return props.contentAnalyticsData.realtime ?
                    <RealTimeAnalytics loading={loading} data={props.contentAnalyticsData.realtime} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            default:
                break;
        }
    }

    const contentAnalyticsDropdownItems = [
        { title: "Audience", data: "audience" },
        // { title: "Watch Duration", data: "watch-duration" },
        { title: "Paywall", data: "paywall" },
        { title: "Engagement", data: "engagement" },
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
                    dropdownDefaultSelect={contentAnalyticsDropdownItems.find(f => f.data === currentTab) ? contentAnalyticsDropdownItems.find(f => f.data === currentTab).title : 'Audience'}
                    callback={(item: DropdownSingleListItem) => { setCurrentTab(item.data);setAnalyticsQsParams({key: 'metric', value: item.data.toLowerCase()}) }}
                />
                {handleExtraSettings()}
            </div>
            {
                    <div>
                        {handleAnalyticsType()}
                    </div>
            }

        </React.Fragment>

    )
}