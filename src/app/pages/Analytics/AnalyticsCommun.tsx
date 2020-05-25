import { CsvService, displayBytesForHumans, mapMarkerNameTranformBytesFromGB, formateDateFromDatepicker } from '../../../utils/utils';
import React from 'react';
import { IconStyle, ActionIcon } from '../../../shared/Common/Icon';
import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import LeafletMap from '../../../components/Analytics/LeafletMap';
import { DateRangePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateRangePickerWrapper';
import { GetAnalyticsDashboardOptions } from '../../redux-flow/store/Analytics/Dashboard';
import { presets } from '../../constants/DatepickerPresets';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { FolderAsset } from '../../redux-flow/store/Folders/types';

export var ThirdLgHalfXmFullXs = "col col-12 sm-col-6 lg-col-4 px1 mb2";
export var HalfSmFullXs = "col col-12 sm-col-6 px1 mb2";


export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & { infoText: string; title: string; data?: any; dataName?: string; realTime?: boolean}) => {

    const exportCsvAnalytics = (data: any) => {
        CsvService.exportToCsv(props.dataName+".csv", Object.values(data));
    };

    return (
        <AnalyticsCardStyle className={props.className}>
            <AnalyticsCardHeader>
                <Text className='mb2' size={16} weight="med" color="gray-1">{props.title}</Text>
                <div className="flex">
                    <div>
                        <ActionIcon id={"tooltip" + props.title}>
                            <IconStyle >info_outlined</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"tooltip" + props.title}>{props.infoText}</Tooltip>
                    </div>
                    { !props.realTime ? 
                        <ActionIcon id={"download" + props.title}>
                            <IconStyle onClick={() => {exportCsvAnalytics(props.data)} } >get_app</IconStyle>
                        </ActionIcon>
                        : null}   
                </div>
                <Tooltip target={"download" + props.title}>lorem ipsum</Tooltip>
            </AnalyticsCardHeader>
            {props.children}
        </AnalyticsCardStyle>
    )
}

export const AnalyticsCardStyle = styled(Card)<{}>`
    padding: 16px !important;
    min-height: 273px;
`


export const AnalyticsCardHeader = styled.div<{}>`
    display: flex;
    justify-content: space-between;
`

export const renderMap = (dataRepo: any, id: string) => {
    let mapMin: any = Math.min(...dataRepo.map(m => m.consumedMB));
    if (isFinite(mapMin)) {
        mapMin = displayBytesForHumans(mapMin, true);
    } else {
        mapMin = 'No Data';
    }
    let mapMax: any = Math.max(...dataRepo.map(m => m.consumedMB));
    if (isFinite(mapMax)) {
        mapMax = displayBytesForHumans(mapMax, true);
    } else {
        mapMax = 'No Data';
    }

    return (
        <div>
            <LeafletMap
                height="400px"
                markerNameTranform={mapMarkerNameTranformBytesFromGB}
                markers={dataRepo}
                idMap={id} />
            <div className="flex mt2 justify-center">
                <a className="mr2">{mapMin}</a>
                <div style={{ backgroundColor: '#93d5ed', height: '20px', width: '30px' }}></div>
                <div style={{ backgroundColor: '#45a5f5', height: '20px', width: '30px' }}></div>
                <div style={{ backgroundColor: '#4285f4', height: '20px', width: '30px' }}></div>
                <div style={{ backgroundColor: '#2f5ec4', height: '20px', width: '30px' }}></div>
                <a className="ml2">{mapMax}</a>
            </div>
        </div>
    )
}

export const DateFilteringAnalytics = (props: React.HTMLAttributes<HTMLDivElement> & { refreshData: Function}) => {
    
    const [dates, setDates] = React.useState<{startDate: any; endDate: any}>({startDate: null, endDate: null})

    return (
        <div className="col col-12 mb25 clearfix">
            <DateRangePickerWrapper callBack={(dates: GetAnalyticsDashboardOptions) => setDates(dates)} className="inline" presets={presets} />
            <Button sizeButton="small" onClick={() => props.refreshData(formateDateFromDatepicker(dates))} className="ml2" color="blue">Apply</Button>
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
    switch (item.contentType) {
        case 'playlist':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>playlist_play</IconStyle>
        case 'folder':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
        case 'live':
        case 'vod':
            return <img key={"thumbnail" + item.id} width="auto" height={42} src={item.thumbnail} ></img>
        default:
            return;
    }
}