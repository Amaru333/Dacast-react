import { string } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import styled from 'styled-components'
import { BarChart } from '../../../components/Analytics/BarChart'
import { EmptyAnalytics } from '../../../components/Analytics/EmptyAnalytics'
import { LineChart } from '../../../components/Analytics/LineChart'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { Text } from '../../../components/Typography/Text'
import { ThemeAnalyticsColors } from '../../../styled/themes/dacast-theme'
import { formatTimeValue } from '../../../utils/formatUtils'
import { capitalizeFirstLetter } from '../../../utils/utils'
import { ApplicationState } from '../../redux-flow/store'
import { Action, getAnalyticsContentListAction, getSpecificContentAnalyticsAction } from '../../redux-flow/store/Analytics/Content/actions'
import { AnalyticsContentState } from '../../redux-flow/store/Analytics/Content/types'
import { AnalyticsTopContentDimensions, AnalyticsTopContentParams } from '../../redux-flow/store/Analytics/Dashboard'
import { ContentType } from '../../redux-flow/store/Common/types'
import { AudienceAnalyticsState, ContentAnalyticsParameters, WatchAnalyticsState } from '../../redux-flow/store/Content/Analytics/types'
import { AudienceDimension, WatchDurationDimension } from '../../shared/Analytics/AnalyticsCommun'
import { AudienceAnalytics } from '../../shared/Analytics/AnalyticsType/AudienceAnalytics'
import { WatchDurationAnalytics } from '../../shared/Analytics/AnalyticsType/WatchDurationAnalytics'
import { ContentAnalyticsDropdownValues } from '../../shared/Analytics/ContentAnalytics'
import { WidgetHeader } from '../Dashboard/DashboardStyles'
import { WidgetElement } from '../Dashboard/WidgetElement'

interface AnalyticsContentProps {
    getAnalyticsContentList: (options: AnalyticsTopContentParams) => Promise<void>
    getSpecificContentAnalytics: (options: ContentAnalyticsParameters) => Promise<void>
    analyticsContent: AnalyticsContentState
}

const AnalyticsContent = (props: AnalyticsContentProps) => {

    const [currentTab, setCurrentTab] = React.useState<ContentAnalyticsDropdownValues>('audience')
    const [selectedContent, setSelectedContent] = React.useState<{id: string; type: ContentType; title: string} | null>(null)
    const colTable = currentTab !== 'engagement' ? 'col col-3' : 'col col-4'
    const contentAnalyticsDropdownItems = [
        { title: "Audience", data: "audience" },
        // { title: "Paywall", data: "paywall" },
        { title: "Engagement", data: "engagement" }
    ]


    React.useEffect(() => {
        props.getAnalyticsContentList({metrics: ['impressions', 'plays'], sortBy: 'impressions'})
    }, [])

    React.useEffect(() => {
        if(!selectedContent) {
            setSelectedContent(props.analyticsContent.contentList[0])
        }
    }, [props.analyticsContent.contentList])

    React.useEffect(() => {
        console.log(selectedContent)
        if(selectedContent) {
            props.getSpecificContentAnalytics({ id: selectedContent.id, timeRange: 'LAST_MONTH', type: selectedContent.type as 'live' | 'vod', dimension: currentTab === 'audience' ? AudienceDimension : WatchDurationDimension })
        }
    }, [selectedContent])

    React.useEffect(() => {
        switch(currentTab) {
            case 'audience':
                props.getAnalyticsContentList({metrics: ['impressions', 'plays'], sortBy: 'impressions'})
                break
            case 'engagement':
                props.getAnalyticsContentList({metrics: ['watchtime'], sortBy: 'watchtime'})
                break
            default:
                break
        }
        if(selectedContent) {
            props.getSpecificContentAnalytics({ id: selectedContent.id, timeRange: 'LAST_MONTH', type: selectedContent.type as 'live' | 'vod', dimension: currentTab === 'audience' ? AudienceDimension : WatchDurationDimension })
        }
    }, [currentTab])

    const handleContentClick = (contentId: string, contentType: ContentType, contentTitle: string) => {
        setSelectedContent({id: contentId, type: contentType, title: contentTitle})
    }

    const renderContentList = () => {
        return props.analyticsContent.contentList.map(content => {
            return (
                <ContentTableRow selected={ selectedContent ? content.id === selectedContent.id : false} key={content.id} onClick={() => handleContentClick(content.id, content.type, content.title)} className='flex flex-justify border-bottom col col-12 py1 pointer'>
                    <Text className={colTable}>{content.title}</Text>
                    <Text className={colTable}>{content.type}</Text>
                    {
                        Object.keys(content.metrics).map((metric: AnalyticsTopContentDimensions) => {
                            return <Text className={colTable}>{content.metrics[metric]}</Text>
                        })
                    }
                </ContentTableRow>
            )
        })
    }

    const renderChart = () => {
        if(!props.analyticsContent.contentData) {
            return <EmptyAnalytics />
        }
        if(currentTab === 'audience' && props.analyticsContent.contentData && props.analyticsContent.contentData.playsImpressionsByTime) {
            return <AudienceAnalytics data={props.analyticsContent.contentData as AudienceAnalyticsState} showTable={false} />
        }

        if(currentTab === 'engagement' && props.analyticsContent.contentData && props.analyticsContent.contentData.watchByTime) {
           return <WatchDurationAnalytics data={props.analyticsContent.contentData as WatchAnalyticsState} showTable={false} />
        }

        return <EmptyAnalytics />

    }

        // if(!props.analyticsContent.contentData && props.analyticsContent.contentList.length === 0) {
        //     return <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
        // }

    return (
        <div className='flex flex-column'>
           { selectedContent && <Text size={32} className='pb2'>Last 30 Days - {selectedContent.title}</Text>}
            <div className='flex col col-12 mb2'>
                <DropdownSingle
                    isWhiteBackground
                    className='col col-3'
                    id='content-analytics-dropdown'
                    list={contentAnalyticsDropdownItems}
                    dropdownTitle=""
                    dropdownDefaultSelect={"Audience"}
                    callback={(item: DropdownSingleListItem) => { setCurrentTab(item.data) }}
                />
            </div>
            {
                renderChart()
            }
            <WidgetElement className='mt2'>
                <WidgetHeader>
                    <Text size={16} weight='med'>Top Content</Text>
                    <Text size={16} color='gray-3'>(Last 30 Days)</Text>
                </WidgetHeader>
                    <div className='flex flex-justify border-bottom col col-12 py1'>
                        <Text className={colTable}>Title</Text>
                        <Text className={colTable}>Type</Text>
                        {
                            props.analyticsContent.contentList.length > 0 && Object.keys(props.analyticsContent.contentList[0].metrics).map((key: AnalyticsTopContentDimensions) => {
                                return <Text className={colTable}>{capitalizeFirstLetter(key)}</Text>
                            })
                        }
                    </div>
                    {
                        renderContentList()
                    }
            </WidgetElement>
        </div>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        analyticsContent: state.analytics.content,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsContentList: async (options: AnalyticsTopContentParams) => {
           await dispatch(getAnalyticsContentListAction(options))
        },
        getSpecificContentAnalytics: async (options: ContentAnalyticsParameters) => {
            await dispatch(getSpecificContentAnalyticsAction(options));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContent);

const ContentTableRow = styled.div<{selected?: boolean;}>`
    background-color: ${props => props.selected ? props.theme.colors['violet20'] : props.theme.colors["white"] };
    &:hover {
        background-color: ${props => props.theme.colors["violet10"]};
    }
`