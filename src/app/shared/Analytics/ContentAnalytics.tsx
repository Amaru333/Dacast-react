import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { AnalyticsDimensions, GetContentAnalyticsInput, TimeRangeAnalytics } from '../../../DacastSdk/analytics';
import { ContentAnalyticsFinalState } from '../../redux-flow/store/Content/Analytics';
import { AudienceDimension, SalesDimension, WatchDurationDimension } from './AnalyticsCommun';
import { AudienceAnalytics } from './AnalyticsType/AudienceAnalytics';
import { EngagementAnalytics } from './AnalyticsType/EngagementAnalytics';
import { RealTimeAnalytics } from './AnalyticsType/RealTimeAnalytics';
import { SalesAnalytics } from './AnalyticsType/SalesAnalytics';
import { WatchDurationAnalytics } from './AnalyticsType/WatchDurationAnalytics';
import { DateFilteringAnalytics } from './DateFilteringAnalytics';
import { RealTimeDropdown } from './RealTimeDropdown';

export interface ContentAnalyticsProps {
    contentId: string,
    contentType: ContentAnalyticsTypes,
    getContentAnalytics: (options: GetContentAnalyticsInput) => Promise<void>,
    contentAnalyticsData: ContentAnalyticsFinalState
}

export type ContentAnalyticsTypes = 'live' | 'vod';

export type ContentAnalyticsDropdownValues = 'audience' | 'watch-duration' | 'sales' | 'engagement' | 'real-time';

const TabsDimensionLink: { [key: string] : AnalyticsDimensions[] } = {
    'audience': AudienceDimension,
    'watch-duration': WatchDurationDimension,
    'sales': SalesDimension
}

export const ContentAnalytics = (props: ContentAnalyticsProps) => {

    const [currentTab, setCurrentTab] = React.useState<ContentAnalyticsDropdownValues>('audience')
    const [timeRangePick, setTimeRangePick] = React.useState<TimeRangeAnalytics>('LAST_WEEK')

    
    React.useEffect(() => {
        props.getContentAnalytics({ 
            id: props.contentId,
            dimension: TabsDimensionLink[currentTab],
            timeRange: timeRangePick,
            type: props.contentType
        })
    }, [currentTab, timeRangePick])
    
    const handleExtraSettings = () => {
        switch (currentTab) {
            case 'audience':
            case 'watch-duration':
            case 'sales':
            case 'engagement':
                return (
                    <DateFilteringAnalytics
                        className='col col-9'
                        defaultDates={{ start: 0, end: 0 }}
                        callback={(info) => setTimeRangePick(info.value)}
                    />
                )
            case 'real-time':
                return (
                    <RealTimeDropdown
                        callback={(value) => console.log(value)}
                    />
                )
            default:
                break;
        }
    }

    console.log(props.contentAnalyticsData);

    const handleAnalyticsType = () => {
        switch (currentTab) {
            case 'audience':
                return props.contentAnalyticsData.audience ? 
                    <AudienceAnalytics data={props.contentAnalyticsData.audience} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'watch-duration':
                return  props.contentAnalyticsData.watch &&  Object.keys(props.contentAnalyticsData.watch).length !== 0 ? 
                    <WatchDurationAnalytics data={props.contentAnalyticsData.watch} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'sales':
                    return  props.contentAnalyticsData.sales ? 
                    <SalesAnalytics data={props.contentAnalyticsData.sales} /> : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            case 'engagement':
                return (
                    <EngagementAnalytics />
                )
            case 'real-time':
                return (
                    <RealTimeAnalytics />
                )
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
                    callback={(item: DropdownSingleListItem) => setCurrentTab(item.data)}
                />
                {handleExtraSettings()}
            </div>
            <div>
                {handleAnalyticsType()}
            </div>
        </React.Fragment>

    )
}