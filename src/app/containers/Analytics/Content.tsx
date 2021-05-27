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
import { ApplicationState } from '../../redux-flow/store'
import { Action, getAnalyticsContentListAction, getSpecificContentAnalyticsAction } from '../../redux-flow/store/Analytics/Content/actions'
import { AnalyticsContentState } from '../../redux-flow/store/Analytics/Content/types'
import { AnalyticsTopContentDimensions, AnalyticsTopContentParams } from '../../redux-flow/store/Analytics/Dashboard'
import { ContentType } from '../../redux-flow/store/Common/types'
import { ContentAnalyticsParameters } from '../../redux-flow/store/Content/Analytics/types'
import { AudienceDimension, WatchDurationDimension } from '../../shared/Analytics/AnalyticsCommun'
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
    const contentAnalyticsDropdownItems = [
        { title: "Audience", data: "audience" },
        // { title: "Paywall", data: "paywall" },
        { title: "Engagement", data: "engagement" }
    ]


    React.useEffect(() => {
        props.getAnalyticsContentList({metrics: ['impressions', 'plays'], sortBy: 'impressions'})
    }, [])

    React.useEffect(() => {
        if(selectedContent) {
            props.getSpecificContentAnalytics({ id: selectedContent.id, timeRange: 'LAST_MONTH', type: selectedContent.type as 'live' | 'vod', dimension: currentTab === 'audience' ? AudienceDimension : WatchDurationDimension })
        }
    }, [selectedContent, currentTab])

    const handleContentClick = (contentId: string, contentType: ContentType, contentTitle: string) => {
        setSelectedContent({id: contentId, type: contentType, title: contentTitle})
    }

    const renderContentList = () => {
        return props.analyticsContent.contentList.map(content => {
            return (
                <ContentTableRow selected={ selectedContent ? content.id === selectedContent.id : false} key={content.id} onClick={() => handleContentClick(content.id, content.type, content.title)} className='flex flex-justify border-bottom col col-12 py1 pointer'>
                    <Text className='col col-3'>{content.title}</Text>
                    <Text className='col col-3'>{content.type}</Text>
                    {
                        Object.keys(content.metrics).map((metric: AnalyticsTopContentDimensions) => {
                            return <Text className='col col-3'>{content.metrics[metric]}</Text>
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
        if(currentTab === 'audience' && props.analyticsContent.contentData.impressions) {
            return <LineChart
                title="Plays & Impressions by Time"
                options={{ fill: true, curve: 0, rightYAxes: false }}
                lines={[{ data: props.analyticsContent.contentData.plays as number[], label: "Plays", color: ThemeAnalyticsColors.blue }, { data: props.analyticsContent.contentData.impressions as number[], label: "Impressions", color: ThemeAnalyticsColors.yellow }]}
                labels={props.analyticsContent.contentData.labels} />
        }

        if(currentTab === 'engagement' && props.analyticsContent.contentData.watchtime) {
            const watchDurationPerTime = formatTimeValue(props.analyticsContent.contentData.watchtime as number[])

            return <BarChart
                title="Engagement by Time"
                dataSets={ [ {data: watchDurationPerTime.values, label: "Engagement (" + watchDurationPerTime.unitLong + ')', type:"bar", color: ThemeAnalyticsColors.blue}] }
                labels={props.analyticsContent.contentData.labels}
                unit={watchDurationPerTime.unitShort} 
            />
        }

        return <EmptyAnalytics />

    }

        // if(!props.analyticsContent.contentData && props.analyticsContent.contentList.length === 0) {
        //     return <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
        // }

    return (
        <div className='flex flex-column'>
            <Text size={32} className='pb2'>Last 30 Days - {selectedContent ? selectedContent.title : 'All Content'}</Text>
            <div className='flex col col-12 mb2'>
            <div className='flex-auto'>
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
            <Button onClick={() => setSelectedContent(null)} sizeButton='small' typeButton='primary' buttonColor='blue'>See All Content</Button>
            </div>

            <WidgetElement>
                <WidgetHeader className='flex flex-column'>
                    <Text size={16} weight='med'>{currentTab === 'audience' ? "Audience (Plays & Impression)" : "Engagement"}</Text>
                    <Text size={16} weight='med'>Content - {selectedContent ? selectedContent.title : "All"}</Text>
                </WidgetHeader>
                {
                    renderChart()
                }
            </WidgetElement>
            <WidgetElement className='mt2'>
                <WidgetHeader>
                    <Text size={16} weight='med'>Top Content</Text>
                    <Text size={16} color='gray-3'>(Last 30 Days)</Text>
                </WidgetHeader>
                    <div className='flex flex-justify border-bottom col col-12 py1'>
                        <Text className='col col-3' weight='med'>Title</Text>
                        <Text className='col col-3' weight='med'>Type</Text>
                        <Text className='col col-3' weight='med'>Plays</Text>
                        <Text className='col col-3' weight='med'>Impressions</Text>
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