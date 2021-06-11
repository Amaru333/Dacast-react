import React from 'react'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { formatTimeValue } from '../../../../utils/formatUtils'
import {HeaderWatchTime, HeaderWatchDevice, HeaderWatchLocation} from '../TableHeaders'
import { WatchAnalyticsState } from '../../../redux-flow/store/Content/Analytics'
import { exportCSVFile } from '../../../../utils/services/csv/csvService'
import { Routes } from '../../../containers/Navigation/NavigationTypes'
import { AnalyticsCardBody, AnalyticsCardHeader, AnalyticsCardStyle, TableAnalyticsStyled } from '../AnalyticsCommun'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { Tab } from '../../../../components/Tab/Tab'
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { Text } from '../../../../components/Typography/Text'

export interface WatchDurationAnalyticsProps {
    data: WatchAnalyticsState
    loading: boolean
    showTable?: boolean
}

export const WatchDurationAnalytics = (props: WatchDurationAnalyticsProps) => {
    const watchDurationPerTime = formatTimeValue(props.data.time.data)
    const watchDurationPerDevice = formatTimeValue(props.data.device.data)
    const watchDurationPerLocationData = formatTimeValue(props.data.location.table.map(item => item.data))
    
    const handleDynamiceHeader = (header: {Header: string, accessor: string}[], metric: string) => {
        return header.map(h => {
            if(h.Header.indexOf('Engagement') !== -1) {
                return {
                    Header: h.Header + ' (' + metric + ')',
                    accessor: h.accessor
                }
            }
            return h
        })
    } 

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                title="Engagement by Time"
                dataSets={ [ {data: watchDurationPerTime.values, label: "Engagement (" + watchDurationPerTime.unitLong + ')', type:"bar", color: ThemeAnalyticsColors.blue}] }
                labels={props.data.time.labels}
                unitRight={watchDurationPerTime.unitShort} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                title="Engagement by Device"
                dataSets={ [ {data: watchDurationPerDevice.values, label: "Engagement (device)", color: ThemeAnalyticsColors.blue } ] }
                labels={props.data.device.labels} 
                unitRight={watchDurationPerDevice.unitShort}/>
        )
    }
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers={props.data.location.data.map((el, i) => {return {...el, value: formatTimeValue(el.value).values}})} 
                markerNameTranform={ (element) => element.city+": "+(element.value[0])+" "+watchDurationPerLocationData.unitShort } />
        )
    }


    let tabs = {
        "Time": { name: 'Time', content: returnTimeAnalytics, table: {data: props.data.time.table.map((el, i) => {return {data: watchDurationPerTime.values[i], label: el.label}}), header: handleDynamiceHeader(HeaderWatchTime, watchDurationPerTime.unitShort)} },
        "Device": { name: 'Device', content: returnDeviceAnalytics, table: {data: props.data.device.table.map((el, i) => {return {data: watchDurationPerDevice.values[i], label: el.label}}), header: handleDynamiceHeader(HeaderWatchDevice, watchDurationPerDevice.unitShort)}},
        "Location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data.location.table.map((el, i) => {return {data: formatTimeValue([el.data]).values[0], label: el.label}}), header: handleDynamiceHeader(HeaderWatchLocation, watchDurationPerLocationData.unitShort)}  },
    }

    const tabsList: Routes[] = Object.keys(tabs).map((value: string, index: number) => { return { name: value, path: value } });
    const [selectedTab, setSelectedTab] = React.useState<'Time' | 'Device' | 'Location'>(tabsList[0].name as 'Time' | 'Device' | 'Location')
    let totalMetric = selectedTab === 'Location' ? props.data.location.data.reduce((acc, next) => acc + next.value[0], 0) : props.data[selectedTab.toLowerCase() as 'time' | 'device'].data.reduce((acc, next) => acc + next, 0)

    const exportCsvAnalytics = () => {
        let tableHeader = tabs[selectedTab].table.header.map(element => element.Header)
        if(tabs[selectedTab].table.data.some(row => row.label.indexOf(',') !== -1)) {
            tableHeader.splice(1, 0 , 'Time')
        }
        exportCSVFile(tabs[selectedTab].table.data, 'Audience'+'-'+selectedTab, tableHeader);
    }

    return (
        <React.Fragment>
            <AnalyticsCardStyle>
                <AnalyticsCardHeader className='mb1 items-center'>
                    <div className="flex items-center">
                        <Text className='pr2' size={16} weight="med" color="gray-1">{"Engagement by " + selectedTab}</Text>
                        {props.loading && <LoadingSpinner color='violet' size='xs' />}
                    </div>
                    <Tab orientation='horizontal' list={tabsList} callback={(name: 'Time' | 'Device' | 'Location') => setSelectedTab(name)} />
                </AnalyticsCardHeader>
                <div className='mb2'>
                    <Text weight='med' size={16}>Total Watchtime: </Text>
                    <Text weight='med' size={16} color='dark-violet'>{formatTimeValue([totalMetric]).values[0] + ' ' + formatTimeValue([totalMetric]).unitLong}</Text>
                </div>
                <AnalyticsCardBody className='col col-12 mx-auto' table={props.showTable}>
                    {tabs[selectedTab].content()}
                </AnalyticsCardBody>
            </AnalyticsCardStyle>
                <Button sizeButton="small" className="mt2 block mr-auto ml-auto" typeButton="primary" onClick={() => exportCsvAnalytics()}>Export CSV</Button>
                <TableAnalyticsStyled
                    className="striped highlight mr-auto ml-auto mt2"
                    data={tabs[selectedTab].table.data}
                    header={tabs[selectedTab].table.header}
                />
        </React.Fragment>

    )
} 
