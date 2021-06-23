import React from 'react'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { AudienceAnalyticsState, AudienceKeys } from '../../../redux-flow/store/Content/Analytics'
import { Routes } from '../../../containers/Navigation/NavigationTypes'
import { AnalyticsCardBody, AnalyticsCardHeader, AnalyticsCardStyle, getAnalyticsQsParams, setAnalyticsQsParams, TableAnalyticsStyled } from '../AnalyticsCommun'
import { LabelSelector } from '../../../../components/LabelSelector/LabelSelector'
import { Tab } from '../../../../components/Tab/Tab'
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { exportCSVFile } from '../../../../utils/services/csv/csvService'
import { Text } from '../../../../components/Typography/Text' 
import { capitalizeFirstLetter } from '../../../../utils/utils'

export interface AudienceAnalyticsProps {
    data: AudienceAnalyticsState
    loading: boolean
    showTable?: boolean
    title?: string
}

export const AudienceAnalytics = (props: AudienceAnalyticsProps) => {

    const {defaultMetric, defaultFormat} = getAnalyticsQsParams()

    const MetricsList = ['Plays', 'Impressions']
    const [selectedMetric, setSelectedMetric] = React.useState<'Plays' | 'Impressions'>(defaultMetric && defaultMetric.sudMetric ? capitalizeFirstLetter(defaultMetric.sudMetric) as 'Plays' | 'Impressions' : 'Plays')

    const returnTimeAnalytics = () => {
        return (
            <LineChart
                title={null}
                options={{ fill: true, curve: 0, rightYAxes: false }}
                lines={[ { data: props.data[selectedMetric.toLowerCase() as AudienceKeys].time.data, label: selectedMetric, color: selectedMetric === 'Plays' ? ThemeAnalyticsColors.blue : ThemeAnalyticsColors.yellow }]}
                labels={props.data[selectedMetric.toLowerCase() as AudienceKeys].time.labels} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                type="vertical"
                title={selectedMetric + " by Device"}
                dataSets={[ { data: props.data[selectedMetric.toLowerCase() as AudienceKeys].device.data, label: selectedMetric, color: selectedMetric === 'Plays' ? ThemeAnalyticsColors.blue : ThemeAnalyticsColors.yellow }]}
                labels={props.data[selectedMetric.toLowerCase() as AudienceKeys].device.labels} />
        )
    }

    const returnLocationAnalytics = () => {
        return (
            <LeafletMap
                markers={props.data[selectedMetric.toLowerCase() as AudienceKeys].location.data}
                markerNameTranform={(element, index) => element.value.map((value, index) => { return (index === 0 ? element.city+": " : ' ' ) + value+" "+element.label[index] }).join() } />
        )
    }

    let tabs = {
        "time": { name: 'Time', content: returnTimeAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].time.table, header: [{Header: 'Date', accessor: 'label'}, {Header: selectedMetric, accessor: 'data'}]} },
        "device": { name: 'Device', content: returnDeviceAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].device.table, header: [{Header: 'Device', accessor: 'label'}, {Header: selectedMetric, accessor: 'data'}]} },
        "location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].location.table, header: [{Header: 'Country', accessor: 'label'}, {Header: selectedMetric, accessor: 'data'}] } },
    }

    const tabsList: Routes[] = Object.keys(tabs).map((value: 'time' | 'device' | 'location') => { return { name: tabs[value].name, path: value } });
    const [selectedTab, setSelectedTab] = React.useState<'time' | 'device' | 'location'>(defaultFormat ? defaultFormat as 'time' | 'device' | 'location' : 'time')
    let totalMetric = selectedTab === 'location' ? props.data[selectedMetric.toLowerCase() as AudienceKeys].location.data.reduce((acc, next) => acc + next.value[0], 0) : props.data[selectedMetric.toLowerCase() as AudienceKeys][selectedTab.toLowerCase() as 'time' | 'device'].data.reduce((acc, next) => acc + next, 0)

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
                        <Text className='pr2' size={16} weight="med" color="gray-1">{selectedMetric + " by " + selectedTab}</Text>
                        {props.loading && <LoadingSpinner color='violet' size='xs' />}
                    </div>
                    <Tab tabDefaultValue={Object.keys(tabs).findIndex(f => f === selectedTab)} orientation='horizontal' list={tabsList} callback={(name: 'Time' | 'Device' | 'Location') => {setSelectedTab(name.toLowerCase() as 'time' | 'device' | 'location');setAnalyticsQsParams({key: 'format', value: name.toLowerCase()})}} />
                </AnalyticsCardHeader>
                <div>
                    <Text weight='med' size={16}>Total {selectedMetric + ': ' }</Text>
                    <Text weight='med' size={16} color='dark-violet'>{totalMetric}</Text>
                </div>
                <AnalyticsCardBody className='col col-12 mx-auto' table={props.showTable}>
                    <LabelSelector defaultSelectedLabel={selectedMetric} className='mb2 center' labels={MetricsList} callback={(label: 'Plays' | 'Impressions') => {setSelectedMetric(label);setAnalyticsQsParams({key: 'metric', value: label.toLowerCase()})}} />
                    {tabs[selectedTab].content()}
                </AnalyticsCardBody>
            </AnalyticsCardStyle>
            { props.showTable && 
                <>
                    <Button sizeButton="small" className="mt2 block mr-auto ml-auto" typeButton="primary" onClick={() => exportCsvAnalytics()}>Export CSV</Button>
                    <TableAnalyticsStyled
                        className="striped highlight mr-auto ml-auto mt2"
                        data={tabs[selectedTab].table.data}
                        header={tabs[selectedTab].table.header}
                    />
                </>
            }
        </React.Fragment>
    )
}