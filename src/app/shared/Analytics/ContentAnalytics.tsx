import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { GetContentAnalyticsInput } from '../../../DacastSdk/analytics';
import { ContentAnalyticsFinalState } from '../../redux-flow/store/Content/Analytics';
import { AudienceAnalytics } from './AnalyticsType/AudienceAnalytics';
import { EngagementAnalytics } from './AnalyticsType/EngagementAnalytics';
import { RealTimeAnalytics } from './AnalyticsType/RealTimeAnalytics';
import { SalesAnalytics } from './AnalyticsType/SalesAnalytics';
import { DataUsageAnalytics } from './AnalyticsType/DataUsageAnalytics';
import { DateFilteringAnalytics } from './DateFilteringAnalytics';
import { RealTimeDropdown } from './RealTimeDropdown';

export interface ContentAnalyticsProps {
    contentId: string,
    contentType: ContentAnalyticsTypes,
    getContentAnalytics: (options: GetContentAnalyticsInput) => void,
    contentAnalyticsData: ContentAnalyticsFinalState
}

export type ContentAnalyticsTypes = 'live' | 'vod' | 'all';

export type ContentAnalyticsDropdownValues = 'audience' | 'data-usage' | 'sales' | 'engagement' | 'real-time';

export const ContentAnalytics = (props: ContentAnalyticsProps) => {

    const [currentTab, setCurrentTab] = React.useState<ContentAnalyticsDropdownValues>('audience')


    React.useEffect(() => {

    }, [])
    
    const handleExtraSettings = () => {
        switch (currentTab) {
            case 'audience':
            case 'data-usage':
            case 'sales':
            case 'engagement':
                return (
                    <DateFilteringAnalytics
                        className='col col-9'
                        defaultDates={{ start: 0, end: 0 }}
                        callback={(dates) => console.log(dates)}
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

    const handleAnalyticsType = () => {
        switch (currentTab) {
            case 'audience':
                return (
                    <AudienceAnalytics data={props.contentAnalyticsData.audience} />
                )
            case 'data-usage':
                return (
                    <DataUsageAnalytics data={props.contentAnalyticsData.data} />
                )
            case 'sales':
                return (
                    <SalesAnalytics data={props.contentAnalyticsData.sales} />
                )
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
        { title: "Data Usage", data: "data-usage" },
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