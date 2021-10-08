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
import { SmallTabItem } from '../../../../components/Tab/TabTypes'
import { TabSmall } from '../../../../components/Tab/TabSmall'
import { useTranslation } from 'react-i18next'

export interface AudienceAnalyticsProps {
    data: AudienceAnalyticsState
    loading: boolean
    showTable?: boolean
    title?: string
}

export const AudienceAnalytics = (props: AudienceAnalyticsProps) => {

    const {defaultMetric, defaultFormat} = getAnalyticsQsParams()
    const { t } = useTranslation()

    const MetricsList = [{title: t('common_analytics_plays_title'), data: 'Plays'}, {title: t('dashboard_impressions_widget_title'), data: 'Impressions'}]
    const [selectedMetric, setSelectedMetric] = React.useState<'Plays' | 'Impressions'>(defaultMetric && defaultMetric.sudMetric && MetricsList.find( f => f.data === capitalizeFirstLetter(defaultMetric.sudMetric)) ? capitalizeFirstLetter(defaultMetric.sudMetric) as 'Plays' | 'Impressions' : 'Plays')

    const returnTimeAnalytics = () => {
        return (
            <LineChart
                title={null}
                options={{ fill: true, curve: 0, rightYAxes: false }}
                lines={[ { data: props.data[selectedMetric.toLowerCase() as AudienceKeys].time.data, label: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), color: selectedMetric === 'Plays' ? ThemeAnalyticsColors.blue : ThemeAnalyticsColors.yellow }]}
                labels={props.data[selectedMetric.toLowerCase() as AudienceKeys].time.labels} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                type="vertical"
                title={selectedMetric + " by Device"}
                dataSets={[ { data: props.data[selectedMetric.toLowerCase() as AudienceKeys].device.data, label: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), color: selectedMetric === 'Plays' ? ThemeAnalyticsColors.blue : ThemeAnalyticsColors.yellow }]}
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
        "time": { name: 'common_analytics_metric_time', content: returnTimeAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].time.table, header: [{Header: t('common_content_list_table_header_date'), accessor: 'label'}, {Header: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), accessor: 'data'}]} },
        "device": { name: 'common_analytics_metric_device', content: returnDeviceAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].device.table, header: [{Header: t('common_analytics_metric_device'), accessor: 'label'}, {Header: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), accessor: 'data'}]} },
        "location": { name: 'common_analytics_metric_location', content: returnLocationAnalytics, table: {data: props.data[selectedMetric.toLowerCase() as AudienceKeys].location.table, header: [{Header: t('common_analytics_table_header_country'), accessor: 'label'}, {Header: t(`common_analytics_${selectedMetric.toLowerCase()}_title`), accessor: 'data'}] } },
    }

    const tabsList: SmallTabItem[] = Object.keys(tabs).map((value: 'time' | 'device' | 'location') => { return { title: t(tabs[value].name), data: value} });
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
                        <Text className='pr2' size={16} weight="med" color="gray-1">{t(`common_analytics_${selectedMetric.toLowerCase()}_by_${selectedTab}_title`)}</Text>
                        {props.loading && <LoadingSpinner color='violet' size='xs' />}
                    </div>
                    <TabSmall defaultTabSelected={tabsList.find(f => f.data === selectedTab) ? tabsList.find(f => f.data === selectedTab).data : null} list={tabsList} callback={(value: SmallTabItem) => {setSelectedTab(value.data.toLowerCase() as 'time' | 'device' | 'location');setAnalyticsQsParams({key: 'format', value: value.data.toLowerCase()})}} />
                </AnalyticsCardHeader>
                <div>
                    <Text weight='med' size={16}>{t(`common_analytics_total_${selectedMetric.toLowerCase()}_title`) + ': ' }</Text>
                    <Text weight='med' size={16} color='dark-violet'>{totalMetric}</Text>
                </div>
                <AnalyticsCardBody className='col col-12 mx-auto' table={props.showTable}>
                    <LabelSelector defaultSelectedLabel={MetricsList.find( f => f.data === selectedMetric).data} className='mb2 center' labels={MetricsList} callback={(label: 'Plays' | 'Impressions') => {setSelectedMetric(label);setAnalyticsQsParams({key: 'metric', value: label.toLowerCase()})}} />
                    {tabs[selectedTab].content()}
                </AnalyticsCardBody>
            </AnalyticsCardStyle>
            { props.showTable && 
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