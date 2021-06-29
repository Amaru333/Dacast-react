import React from 'react'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { LabelSelector } from '../../../../components/LabelSelector/LabelSelector'
import { Tab } from '../../../../components/Tab/Tab'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { exportCSVFile } from '../../../../utils/services/csv/csvService'
import { Routes } from '../../../containers/Navigation/NavigationTypes'
import { SalesAnalyticsState, SalesKeys } from '../../../redux-flow/store/Content/Analytics'
import { AnalyticsCardBody, AnalyticsCardHeader, AnalyticsCardStyle, getAnalyticsQsParams, setAnalyticsQsParams, TableAnalyticsStyled } from '../AnalyticsCommun'
import { Text } from '../../../../components/Typography/Text'
import { capitalizeFirstLetter } from '../../../../utils/utils'
import { SmallTabItem } from '../../../../components/Tab/TabTypes'
import { TabSmall } from '../../../../components/Tab/TabSmall'

export interface SalesAnalyticsProps {
    data: SalesAnalyticsState
    loading: boolean
    showTable?: boolean
}

export const SalesAnalytics = (props: SalesAnalyticsProps) => {

    const {defaultMetric, defaultFormat} = getAnalyticsQsParams()

    const MetricsList = ['Sales', 'Revenue']
    const [selectedMetric, setSelectedMetric] = React.useState<'Sales' | 'Revenue'>(defaultMetric && defaultMetric.sudMetric ? capitalizeFirstLetter(defaultMetric.sudMetric) as 'Sales' | 'Revenue' : 'Sales')

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                id="uniqueStuff"
                title="Paywall by Time"
                type="vertical"
                unit={selectedMetric === 'Revenue' ? "$" : null}
                step={1}
                dataSets={[{ data: props.data[selectedMetric.toLowerCase() as SalesKeys].time.data, label: selectedMetric, color: selectedMetric === 'Sales' ? ThemeAnalyticsColors.blue : ThemeAnalyticsColors.yellow, type: selectedMetric === 'Sales' ? 'bar' : 'line'}]}
                labels={props.data[selectedMetric.toLowerCase() as SalesKeys].time.labels} />
        )
    }

    // const returnDeviceAnalytics = () => {
    //     return (
    //         <BarChart
    //             id="uniqueStuff1"
    //             type="vertical"
    //             title="Sales and Revenue by Device"
    //             dataSets={ [ {data: props.data.salesRevenuesByDevice.sales, label: "Sales", color: ThemeAnalyticsColors.blue }, {data: props.data.salesRevenuesByDevice.revenues, label: "Revenue", color: ThemeAnalyticsColors.yellow, type: "line", yAxisPosition: "right" } ] }
    //             labels={props.data.salesRevenuesByDevice.labels} />
    //     )
    // }

    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers={props.data[selectedMetric.toLowerCase() as SalesKeys].location.data} 
                markerNameTranform={(element, index) => element.value.map((value, index): string => { console.log(element);return (index === 0 ? element.city+": " : ' ' ) + (element.label[0] !== "revenues" ? "$" : "") + value  +" "+element.label[index] }).join() } />
        )
    }

    let tabs = {
        "time": { name: 'Time', content: returnTimeAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as SalesKeys].time.table, header: [{Header: 'Date', accessor: 'label'}, {Header: selectedMetric === 'Revenue' ? 'Revenue ($)' : selectedMetric, accessor: 'data'}]} },
        // "Device": { name: 'Device', content: returnDeviceAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as SalesKeys].device.table, header: [{Header: 'Device', accessor: 'label'}, {Header: selectedMetric, accessor: 'data'}]} },
        "location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as SalesKeys].location.table, header: [{Header: 'Country', accessor: 'label'}, {Header: selectedMetric === 'Revenue' ? 'Revenue ($)' : selectedMetric, accessor: 'data'}] } },
    }

    const tabsList: SmallTabItem[] = Object.keys(tabs).map((value: 'time' | 'location') => { return { title: tabs[value].name }});
    const [selectedTab, setSelectedTab] = React.useState<'time' | 'location'>(defaultFormat ? defaultFormat as 'time' | 'location' : 'time')
    let totalMetric = selectedTab === 'location' ? props.data[selectedMetric.toLowerCase() as SalesKeys].location.data.reduce((acc, next) => acc + next.value[0], 0) : props.data[selectedMetric.toLowerCase() as SalesKeys][selectedTab.toLowerCase() as 'time'].data.reduce((acc, next) => acc + next, 0)

    const exportCsvAnalytics = () => {
        let tableHeader = tabs[selectedTab].table.header.map(element => element.Header)
        if(tabs[selectedTab].table.data.some(row => row.label.indexOf(',') !== -1)) {
            tableHeader.splice(1, 0 , 'Time')
        }
        exportCSVFile(tabs[selectedTab].table.data, selectedMetric+'-'+selectedTab, tableHeader);
    }

    return (
        <React.Fragment>
            <AnalyticsCardStyle>
                <AnalyticsCardHeader className='mb1 items-center'>
                    <div className="flex items-center">
                        <Text className='pr2' size={16} weight="med" color="gray-1">{selectedMetric + " by " + selectedTab}</Text>
                        {props.loading && <LoadingSpinner color='violet' size='xs' />}
                    </div>
                    <TabSmall defaultTabSelected={Object.keys(tabs).find(f => f === selectedTab) ? tabs[selectedTab].name : null} list={tabsList} callback={(value: SmallTabItem) => {setSelectedTab(value.title.toLowerCase() as 'time' | 'location');setAnalyticsQsParams({key: 'format', value: value.title.toLowerCase()})}} />
                </AnalyticsCardHeader>
                <div>
                    <Text weight='med' size={16}>Total {selectedMetric + ': ' }</Text>
                    <Text weight='med' size={16} color='dark-violet'>{(selectedMetric === 'Revenue' ? '$' : '') + totalMetric}</Text>
                </div>
                <AnalyticsCardBody className='col col-12 mx-auto' table={props.showTable}>
                    <LabelSelector className='mb2 center' labels={MetricsList} callback={(label: 'Sales' | 'Revenue') => {setSelectedMetric(label);setAnalyticsQsParams({key: 'metric', value: label.toLowerCase()})}} />
                    {tabs[selectedTab].content()}
                </AnalyticsCardBody>
            </AnalyticsCardStyle>
            {
                props.showTable &&
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