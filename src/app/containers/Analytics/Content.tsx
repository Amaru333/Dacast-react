import { string } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import styled, { css } from 'styled-components'
import { BarChart } from '../../../components/Analytics/BarChart'
import { EmptyAnalytics } from '../../../components/Analytics/EmptyAnalytics'
import { LineChart } from '../../../components/Analytics/LineChart'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { Text } from '../../../components/Typography/Text'
import { ActionIcon, IconStyle } from '../../../shared/Common/Icon'
import { ThemeAnalyticsColors } from '../../../styled/themes/dacast-theme'
import { formatTimeValue } from '../../../utils/formatUtils'
import { exportCSVFile } from '../../../utils/services/csv/csvService'
import { capitalizeFirstLetter } from '../../../utils/utils'
import { ListContentTitle } from '../../pages/Folders/FoldersStyle'
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
    const [loading, setLoading] = React.useState<boolean>(false)
    const colTable = currentTab !== 'engagement' ? 'col col-3' : 'col col-4'
    const contentAnalyticsDropdownItems = [
        { title: "Audience", data: "audience" },
        // { title: "Paywall", data: "paywall" },
        { title: "Engagement", data: "engagement" }
    ]


    React.useEffect(() => {
        props.getAnalyticsContentList({metrics: ['plays', 'impressions'], sortBy: 'plays'})
    }, [])

    React.useEffect(() => {
        if(!selectedContent) {
            setSelectedContent(props.analyticsContent.contentList[0])
        }
    }, [props.analyticsContent.contentList])

    React.useEffect(() => {
        if(selectedContent) {
            setLoading(true)
            props.getSpecificContentAnalytics({ id: selectedContent.id, timeRange: 'LAST_MONTH', type: selectedContent.type as 'live' | 'vod', dimension: currentTab === 'audience' ? AudienceDimension : WatchDurationDimension })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        }
    }, [selectedContent])

    React.useEffect(() => {
        switch(currentTab) {
            case 'audience':
                props.getAnalyticsContentList({metrics: ['plays', 'impressions'], sortBy: 'plays'})
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

    const exportCsvAnalytics = () => {
        exportCSVFile(props.analyticsContent.contentList.map(item => {return {title: item.title, type: item.type === 'vod' ? 'Video' : 'Live Stream', id: item.id, ...Object.keys(item.metrics).reduce((acc, next) => {return {...acc, [next]: item.metrics[next]}}, {})}}), "TopContent", {title: 'Title', type: 'Type', id: 'Id', ...Object.keys(props.analyticsContent.contentList[0].metrics).reduce((acc, next) => {return {...acc, [next]: capitalizeFirstLetter(next)}}, {})});
    }

    const renderContentList = () => {
        return props.analyticsContent.contentList.map(content => {
            return (
                <ContentTableRow tableRow selected={ selectedContent ? content.id === selectedContent.id : false} key={content.id} onClick={() => handleContentClick(content.id, content.type, content.title)} className='flex flex-justify border-bottom col col-12 py1 pointer'>
                    <ListContentTitle className={colTable}>{content.title}</ListContentTitle>
                    <Text className={colTable + ' px4'}>{content.type === 'vod' ? 'Video' : 'Live Stream'}</Text>
                    {
                        Object.keys(content.metrics).map((metric: AnalyticsTopContentDimensions) => {
                            return <Text className={colTable}>{currentTab === 'engagement' ? formatTimeValue([content.metrics[metric]]).values + formatTimeValue([content.metrics[metric]]).unitShort : content.metrics[metric]}</Text>
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
        if(currentTab === 'audience' && props.analyticsContent.contentData && props.analyticsContent.contentData.impressions) {
            return <AudienceAnalytics loading={loading} data={props.analyticsContent.contentData as AudienceAnalyticsState} showTable={false} />
        }

        if(currentTab === 'engagement' && props.analyticsContent.contentData && props.analyticsContent.contentData.time) {
           return <WatchDurationAnalytics loading={loading} data={props.analyticsContent.contentData as WatchAnalyticsState} showTable={false} />
        }

        return <EmptyAnalytics />

    }

    return (
        <div className='flex flex-column'>
            <div className='mb2'>
                <Text size={32} className='pb2'>Last 30 Days - </Text>
                {selectedContent && <Text size={32} color='dark-violet'>{selectedContent.title}</Text>}
            </div>
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
            <div className='my2 mx-auto'>
                <Button onClick={() => { exportCsvAnalytics() }} sizeButton='small' buttonColor='blue' typeButton='primary'>Export CSV</Button>
            </div>
            <WidgetElement>
                <WidgetHeader>
                    <Text size={16} weight='med'>Top Content</Text>
                    <Text size={16} color='gray-3'>(Last 30 Days)</Text>
                </WidgetHeader>
                    <ContentTableRow className='flex flex-justify border-bottom col col-12 py1'>
                        <Text weight='med' className={colTable}>Title</Text>
                        <Text weight='med' className={colTable + ' px4'}>Type</Text>
                        {
                            props.analyticsContent.contentList.length > 0 && Object.keys(props.analyticsContent.contentList[0].metrics).map((key: AnalyticsTopContentDimensions) => {
                                return <Text weight='med' className={colTable}>{capitalizeFirstLetter(key)}</Text>
                            })
                        }
                    </ContentTableRow>
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

const ContentTableRow = styled.div<{selected?: boolean; tableRow?: boolean}>`
    ${props => props.tableRow && css`
        background-color: ${props.selected ? props.theme.colors['violet20'] : props.theme.colors["white"] };
        &:hover {
            background-color: ${props.theme.colors["violet10"]};
        }
    `}
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']}
`