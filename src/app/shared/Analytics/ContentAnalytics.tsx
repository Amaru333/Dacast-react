import React from 'react'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentAnalyticsState } from '../../redux-flow/store/Content/Analytics';
import { AudienceAnalytics } from './AnalyticsType/AudienceAnalytics';
import { EngagementAnalytics } from './AnalyticsType/EngagementAnalytics';
import { SalesAnalytics } from './AnalyticsType/SalesAnalytics';
import { DateFilteringAnalytics } from './DateFilteringAnalytics';
import { RealTimeDropdown } from './RealTimeDropdown';

export interface ContentAnalyticsProps {
    contentId: string,
    contentType: ContentAnalyticsTypes,
    getContentAnalytics: (liveId: string, contentType: string) => void,
    contentAnalyticsData: ContentAnalyticsState
}

export type ContentAnalyticsTypes = 'live' | 'vod';

export type ContentAnalyticsDropdownValues = 'audience' | 'data' | 'sales' | 'engagement' | 'real-time';

export const ContentAnalytics = (props: ContentAnalyticsProps) => {

    const [currentTab, setCurrentTab] = React.useState<ContentAnalyticsDropdownValues>('audience')


    React.useEffect(() => {

    }, [])
    
    const handleExtraSettings = () => {
        switch (currentTab) {
            case 'audience':
            case 'data':
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
                    <AudienceAnalytics />
                )
            case 'data':
                return (
                    <div>No Backend</div>
                )
            case 'sales':
                return (
                    <SalesAnalytics />
                )
            case 'engagement':
                return (
                    <EngagementAnalytics />
                )
            case 'real-time':
                return (
                    <div>No Mockups</div>
                )
            default:
                break;
        }
    }

    const contentAnalyticsDropdownItems = [
        { title: "Audience", data: "audience" },
        { title: "Data Usage", data: "data" },
        { title: "Sales & Revenue", data: "sales" },
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