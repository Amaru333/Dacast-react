import { exportCSVFile, displayBytesForHumans, mapMarkerNameTranformBytesFromGB, formateDateFromDatepicker } from '../../../utils/utils';
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
import ReactTable from 'react-table';

export var ThirdLgHalfXmFullXs = "col col-12 sm-col-6 lg-col-4 px1 mb2";
export var HalfSmFullXs = "col col-12 sm-col-6 px1 mb2";

import moment from 'moment'

export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & { table?: { data: any; columns: any }; infoText: string; title: string; data?: any; dataName?: string; realTime?: boolean }) => {


    console.log(props.data);

    const exportCsvAnalytics = () => {
        exportCSVFile(props.data.header, props.data.data, props.dataName + ".csv");
    };

    const [showTable, setShowTable] = React.useState<boolean>(false);

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
                    {!props.realTime ?
                        <ActionIcon id={"download" + props.title}>
                            <IconStyle onClick={() => { exportCsvAnalytics() }} >get_app</IconStyle>
                        </ActionIcon>
                        : null}
                    {props.table &&
                        <ActionIcon id={"table" + props.title}>
                            <IconStyle onClick={() => { setShowTable(!showTable) }} >toc</IconStyle>
                        </ActionIcon>
                    }
                </div>
                <Tooltip target={"download" + props.title}>Download csv</Tooltip>
                <Tooltip target={"table" + props.title}>Show table</Tooltip>
            </AnalyticsCardHeader>
            {showTable ?
                <ReactTable
                    data={props.table.data}
                    columns={props.table.columns}
                    pageSizeOptions={[5, 10, 20, 25]}
                    defaultPageSize={10} /> : props.children
            }
        </AnalyticsCardStyle>
    )
}

export const mergeForTable = (data: any, dates: any) => {
    if(data && data.length) {
        var result = []
        for (var i = 0; i < data.length; i++) {
            result.push({ mb: data[i], date: dates[i]})
        }
    } else {
        var result = [];
    }
    return result
}
export const AnalyticsCardStyle = styled(Card) <{}>`
    padding: 16px !important;
    min-height: 273px;
`


export const AnalyticsCardHeader = styled.div<{}>`
    display: flex;
    justify-content: space-between;
`

export const renderMap = (dataRepo: any, id: string, isGb?: boolean) => {
    let mapMin: any = Math.min(...dataRepo.map(m => m.consumedMB));
    if (isFinite(mapMin)) {
        mapMin = isGb ? displayBytesForHumans(mapMin, true) : mapMin;
    } else {
        mapMin = 'No Data';
    }
    let mapMax: any = Math.max(...dataRepo.map(m => m.consumedMB));
    if (isFinite(mapMax)) {
        mapMax = isGb ? displayBytesForHumans(mapMax, true) : mapMax;
    } else {
        mapMax = 'No Data';
    }

    return (
        <div>
            <LeafletMap
                height="400px"
                markerNameTranform={isGb ? mapMarkerNameTranformBytesFromGB : (name: string, value: string) => { return name+" : "+value }}
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

export const DateFilteringAnalytics = (props: React.HTMLAttributes<HTMLDivElement> & { defaultDates: { end: number; start: number }, refreshData: Function }) => {

    const [dates, setDates] = React.useState<{ start: any; end: any }>({ start: props.defaultDates.start, end: props.defaultDates.end })

    const renderDatePresets = () => {
        return presets ? (
            <div>
                {presets.map(({ text, start, end }) => {
                    return (
                        <Button
                            key={text}
                            className='ml1 mb2'
                            typeButton='secondary'
                            buttonColor='blue'
                            sizeButton='small'
                            onClick={() => setDates({ start, end })}
                        >
                            {text}
                        </Button>
                    );
                })}
            </div>
        )
            : null;
    }

    React.useEffect(() => {
        console.log(dates);
    }, [dates])

    return (
        <div className="col col-12 mb25 clearfix">
            {renderDatePresets()}
            <DateRangePickerWrapper disabled dates={{ startDate: moment(dates.start), endDate: moment(dates.end) }} className="inline" presets={presets} />
            <Button sizeButton="small" onClick={() => props.refreshData(formateDateFromDatepicker({ startDate: dates.start, endDate: dates.end }))} className="ml2" color="blue">Apply</Button>
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