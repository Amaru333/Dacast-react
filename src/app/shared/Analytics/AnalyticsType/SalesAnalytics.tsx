import React from 'react'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { LabelSelector } from '../../../../components/LabelSelector/LabelSelector'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { exportCSVFile } from '../../../../utils/services/csv/csvService'
import { SalesAnalyticsState, SalesKeys } from '../../../redux-flow/store/Content/Analytics'
import { AnalyticsCardBody, AnalyticsCardHeader, AnalyticsCardStyle, getAnalyticsQsParams, setAnalyticsQsParams, TableAnalyticsStyled } from '../AnalyticsCommun'
import { Text } from '../../../../components/Typography/Text'
import { capitalizeFirstLetter } from '../../../../utils/utils'
import { SmallTabItem } from '../../../../components/Tab/TabTypes'
import { TabSmall } from '../../../../components/Tab/TabSmall'
import { useTranslation } from 'react-i18next'

export interface SalesAnalyticsProps {
    data: SalesAnalyticsState
    loading: boolean
    showTable?: boolean
}

export const SalesAnalytics = (props: SalesAnalyticsProps) => {

    const {defaultMetric, defaultFormat} = getAnalyticsQsParams()
    const { t } = useTranslation()

    const MetricsList = [{title: t('common_analytics_sales_title'), data: 'Sales'}, {title: t('dashboard_revenue_widget_title'), data: 'Revenue'}]
    const [selectedMetric, setSelectedMetric] = React.useState<'Sales' | 'Revenue'>(defaultMetric && defaultMetric.sudMetric && MetricsList.find(f => f.data === capitalizeFirstLetter(defaultMetric.sudMetric)) ? capitalizeFirstLetter(defaultMetric.sudMetric) as 'Sales' | 'Revenue' : 'Sales')

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                id="uniqueStuff"
                title="Paywall by Time"
                type="vertical"
                unit={selectedMetric === 'Revenue' ? "$" : null}
                step={1}
                dataSets={[{ data: props.data[selectedMetric.toLowerCase() as SalesKeys].time.data, label: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), color: selectedMetric === 'Sales' ? ThemeAnalyticsColors.blue : ThemeAnalyticsColors.yellow, type: selectedMetric === 'Sales' ? 'bar' : 'line'}]}
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
        "time": { name: 'common_analytics_metric_time', content: returnTimeAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as SalesKeys].time.table, header: [{Header: t('common_content_list_table_header_date'), accessor: 'label'}, {Header: (selectedMetric === 'Revenue' ? t('dashboard_revenue_widget_title') + '($)' : t(`common_analytics_${selectedMetric.toLowerCase()}_title`)), accessor: 'data'}]} },
        // "device": { name: 'common_analytics_metric_device', content: returnDeviceAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].device.table, header: [{Header: t('common_analytics_metric_device'), accessor: 'label'}, {Header: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), accessor: 'data'}]} },
        "location": { name: 'common_analytics_metric_location', content: returnLocationAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as SalesKeys].location.table, header: [{Header: t('common_analytics_table_header_country'), accessor: 'label'}, {Header: (selectedMetric === 'Revenue' ? t('dashboard_revenue_widget_title') + '($)' : t(`common_analytics_${selectedMetric.toLowerCase()}_title`)), accessor: 'data'}] } },
    }

    const tabsList: SmallTabItem[] = Object.keys(tabs).map((value: 'time' | 'location') => { return { title: t(tabs[value].name), data: value} });
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
                    <Text className='pr2' size={16} weight="med" color="gray-1">{t(`common_analytics_${selectedMetric.toLowerCase()}_by_${selectedTab}_title`)}</Text>
                        {props.loading && <LoadingSpinner color='violet' size='xs' />}
                    </div>
                    <TabSmall defaultTabSelected={tabsList.find(f => f.data === selectedTab) ? tabsList.find(f => f.data === selectedTab).data : null} list={tabsList} callback={(value: SmallTabItem) => {setSelectedTab(value.data.toLowerCase() as 'time' | 'location');setAnalyticsQsParams({key: 'format', value: value.data.toLowerCase()})}} />
                </AnalyticsCardHeader>
                <div>
                <Text weight='med' size={16}>{t(`common_analytics_total_${selectedMetric.toLowerCase()}_title`) + ': ' }</Text>
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
                    <Button sizeButton="small" className="mt2 block mr-auto ml-auto" typeButton="primary" onClick={() => exportCsvAnalytics()}>{t('common_button_text_export_csv')}</Button>
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