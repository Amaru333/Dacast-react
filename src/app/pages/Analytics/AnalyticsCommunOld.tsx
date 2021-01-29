import React from 'react';
import { displayBytesForHumans } from '../../../utils/formatUtils';
import { IconStyle, ActionIcon } from '../../../shared/Common/Icon';
import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import LeafletMapOld from '../../../components/Analytics/AnalyticsOld/LeafletMapOld';
import { DateRangePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateRangePickerWrapper';
import { presets } from '../../constants/DatepickerPresets';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import ReactTable from 'react-table';
import moment from 'moment'
import { exportCSVFile } from '../../../utils/services/csv/csvService';

export var ThirdLgHalfXmFullXs = "col col-12 sm-col-6 lg-col-4 px1 mb2";
export var HalfSmFullXs = "col col-12 sm-col-6 px1 mb2";


export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & { table?: { data: any; columns: any }; infoText: string; title: string; data?: any; dataName?: string; realTime?: boolean }) => {

    const exportCsvAnalytics = () => {
        exportCSVFile(props.data.data, props.dataName + ".csv", props.data.header);
    }

    const [showTable, setShowTable] = React.useState<boolean>(false)

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

export const logScale = (value: number, minp: number, maxp: number, minv: number, maxv: number) => {
    var minv = Math.log(minv);
    var maxv = Math.log(maxv);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (value - minp));
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
export const mapMarkerNameTranformBytesFromGB = (name: string, value: number) => {
    return name + ': ' + displayBytesForHumans(value, true);
}

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
            <LeafletMapOld
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

    const [dates, setDates] = React.useState<{ start: number; end: any }>({ start: props.defaultDates.start, end: props.defaultDates.end })
    const [selectedPreset, setSelectedPreset] = React.useState<string>('Last 24 Hours')

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
                            focusState={selectedPreset === text}
                            onClick={() => { setSelectedPreset(text); text !== 'Custom' && setDates({ start: start.getTime(), end: end.getTime() })} }
                        >
                            {text}
                        </Button>
                    );
                })}
            </div>
        )
            : null;
    }

    return (
        <div className="col col-12 mb25 clearfix">
            {renderDatePresets()}
            <DateRangePickerWrapper callback={(dates) => { setDates({ start: dates.startDate.getTime(), end: dates.endDate.getTime()}) }} disabled={selectedPreset !== 'Custom'} dates={{ startDate: dates.start, endDate: dates.end }} className="inline" />
            <Button sizeButton="small" onClick={() => { console.log(dates); props.refreshData({ startDate: dates.start, endDate: dates.end }) } } className="ml2" color="blue">Apply</Button>
        </div>
    )
}

/**
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */
export const lerpColor = (a: string, b: string, amount: number): string => {

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
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
            return item.thumbnail ? <img key={"thumbnail" + item.id} width="auto" height={42} src={item.thumbnail} ></img>
                : <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
        default:
            return;
    }
}