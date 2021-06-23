import React from 'react';
import { IconStyle } from '../../../shared/Common/Icon';
import styled from 'styled-components';
import { Text } from '../../../components/Typography/Text';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { AnalyticsDimensions, TimeRangeAnalytics } from '../../redux-flow/store/Content/Analytics/types';
import { Card } from '../../../components/Card/Card';
import { TableAnalytics } from './TableAnalytics';
import { getUrlParam } from '../../../utils/utils';
import { useHistory } from 'react-router';

export const ThirdLgHalfXmFullXs = "col col-12 sm-col-6 lg-col-4 px1 mb2";
export const HalfSmFullXs = "col col-12 sm-col-6 px1 mb2";

export const AllDimensions: AnalyticsDimensions[] = ['PLAYS_BY_DEVICE', 'PLAYS_BY_TIME', 'PLAYS_BY_COUNTRY', 'WATCHTIME_BY_TIME', 'WATCHTIME_BY_DEVICE', 'WATCHTIME_BY_COUNTRY', 'IMPRESSIONS_BY_TIME', 'IMPRESSIONS_BY_DEVICE', 'IMPRESSIONS_BY_COUNTRY', 'SALES_BY_TIME', 'SALES_BY_COUNTRY', 'REVENUES_BY_TIME', 'REVENUES_BY_COUNTRY'];
export const AudienceDimension: AnalyticsDimensions[] = ['PLAYS_BY_DEVICE', 'PLAYS_BY_TIME', 'PLAYS_BY_COUNTRY', 'IMPRESSIONS_BY_TIME', 'IMPRESSIONS_BY_COUNTRY', 'IMPRESSIONS_BY_DEVICE'];
export const WatchDurationDimension: AnalyticsDimensions[] = ['WATCHTIME_BY_TIME', 'WATCHTIME_BY_DEVICE', 'WATCHTIME_BY_COUNTRY'];
export const SalesDimension: AnalyticsDimensions[] = ['SALES_BY_TIME', 'SALES_BY_COUNTRY', 'REVENUES_BY_TIME', 'REVENUES_BY_COUNTRY'];
export const RealTimeDimension: AnalyticsDimensions[] = ['VIEWERS_BY_TIME', 'PLAYS_BY_TIME', 'WATCHTIME_BY_DEVICE', 'PLAYS_BY_COUNTRY'];

export const FailedCardAnalytics = (props: React.HTMLAttributes<HTMLDivElement>) => {
    if (props.hidden) {
        return <></>
    }

    return (
        <div className="col col-12 flex flex-column items-center">
            <IconStyle className="mt2" coloricon="red" fontSize='large' >warning</IconStyle>
            <Text size={16} weight="med" >Something went wrong</Text>
            <Text size={16} weight="reg" >We are unable to display this report.</Text>
        </div>
    )
}

export const AnalyticsContainerHalfSelector = styled.div<{}>`
    background-color: white;
    border: 1px solid ${props => props.theme.colors["gray-7"]};;
    height: 256px; 
    overflow-x: auto;
`

export const BreadcrumbContainer = styled.div`
min-height: 52px;
`

export const handleRowIconType = (item: FolderAsset) => {
    switch (item.type) {
        case 'playlist':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>playlist_play</IconStyle>
        case 'folder':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
        case 'live':
        case 'vod':
        case 'channel':
            return item.thumbnail ? <img key={"thumbnail" + item.id} width={94} height={54} src={item.thumbnail} ></img>
                : <div className='mr1 relative justify-center flex items-center' style={{ minWidth: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
        default:
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
    }
}

export const AnalyticsCardStyle = styled(Card) <{}>`
    min-height: 273px;
`
export const TableAnalyticsStyled = styled(TableAnalytics) <{}>`
    width: 80%;
`

export const AnalyticsCardHeader = styled.div<{}>`
    display: flex;
    justify-content: space-between;
`

export const AnalyticsCardBody = styled.div<{table: boolean}>`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    position: relative;
`

export const getAnalyticsQsParams = () => {
    const timeRange = getUrlParam('timeRange') || 'LAST_WEEK'
    const qsMetric = getUrlParam('metric').toLowerCase()
    const defaultFormat = getUrlParam('format').toLowerCase()
    const startDate = getUrlParam('startDate')
    const endDate = getUrlParam('endDate')

    if(qsMetric === 'audience' || qsMetric === 'plays') {
        return {timeRange, startDate, endDate, defaultMetric: {name: 'audience', sudMetric: 'plays'}, defaultFormat}
    }

    if(qsMetric === 'impressions') {
        return {timeRange, startDate, endDate,  defaultMetric: {name: 'audience', sudMetric: 'impressions'}, defaultFormat}
    }

    if(qsMetric === 'paywall' || qsMetric === 'sales') {
        return {timeRange, startDate, endDate,  defaultMetric: {name: 'paywall', sudMetric: 'sales'}, defaultFormat}
    }

    if(qsMetric === 'revenue') {
        return {timeRange, startDate, endDate,  defaultMetric: {name: 'paywall', sudMetric: 'revenue'}, defaultFormat}
    }

    return {timeRange, startDate, endDate, defaultMetric: {name: qsMetric}, defaultFormat}
}

export const setAnalyticsQsParams = (qsParam: {key: string, value: string}, newStartDate?: number, newEndDate?: number) => {
    let {timeRange, defaultMetric, defaultFormat, startDate, endDate} = getAnalyticsQsParams()
    let selectedMetric = qsParam.key === 'metric' ? qsParam.value : defaultMetric ? defaultMetric.sudMetric || defaultMetric.name : ''
    let selectedTimeRange = qsParam.key === 'timeRange' ? qsParam.value : timeRange || ''
    let selectedFormat = qsParam.key === 'format' ? qsParam.value : defaultFormat || ''
    let selectedStartDate = newStartDate ? newStartDate : startDate || ''
    let selectedEndDate = newEndDate ? newEndDate : endDate || ''
    let qs = ''

    if(selectedMetric) {
        qs += `metric=${selectedMetric}`
    }

    if(selectedTimeRange) {
        qs += `&timeRange=${selectedTimeRange}`
    }

    if(selectedStartDate) {
        qs += `&startDate=${selectedStartDate}`
    }

    if(selectedEndDate) {
        qs += `&endDate=${selectedEndDate}`
    }

    if(selectedFormat) {
        qs += `&format=${selectedFormat}`
    }

    qs = qs.replace(/^&/, '')

    if (history.pushState) {
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + qs;
        window.history.pushState({path:newurl},'',newurl);
    }
}