import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnalyticsCard } from '../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../components/Analytics/BarChart'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { ThemeAnalyticsColors } from '../../../styled/themes/dacast-theme'
import { exportCSVFile } from '../../../utils/services/csv/csvService'
import { dateAdd } from '../../../utils/services/date/dateService'
import { ApplicationState } from '../../redux-flow/store'
import { Action } from '../../redux-flow/store/Analytics/Audience/actions'
import { getAccountAnalyticsDataAction } from '../../redux-flow/store/Analytics/Data/actions'
import { AccountAnalyticsDataState, AccountDataDimension } from '../../redux-flow/store/Analytics/Data/types'
import { AccountAnalyticsParameters, TimeRangeAccountAnalytics } from '../../redux-flow/store/Analytics/types'
import { AnalyticsCardBody, AnalyticsCardHeader, AnalyticsCardStyle, getAnalyticsQsParams, setAnalyticsQsParams, TableAnalyticsStyled } from '../../shared/Analytics/AnalyticsCommun'
import { DateFilteringAnalytics } from '../../shared/Analytics/DateFilteringAnalytics'
import { HeaderDataConsumptionTime } from '../../shared/Analytics/TableHeaders'
import { Routes } from '../Navigation/NavigationTypes'
import { Text } from '../../../components/Typography/Text'

interface AccountAnalyticsDataProps {
    dataConsumption: AccountAnalyticsDataState
    getAccountAnalyticsData: (options: AccountAnalyticsParameters) => Promise<void>
}

const DataConsumption = (props: AccountAnalyticsDataProps) => {

    const {timeRange, startDate, endDate} = getAnalyticsQsParams()

    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>({timeRange: timeRange ? timeRange as TimeRangeAccountAnalytics : 'LAST_WEEK', custom: { end: parseInt(endDate) || new Date().getTime(), start: parseInt(startDate) || dateAdd(new Date, 'week', -1).getTime()}})
    const [loading, setLoading] = React.useState<boolean>(false)

    const loaded = React.useRef(false);

    React.useEffect(() => {
        if(!loading || !props.dataConsumption) {
            setLoading(true);
            props.getAccountAnalyticsData({ id: null, timeRange: timeRange as TimeRangeAccountAnalytics, type: "account", dimension: AccountDataDimension, start: parseInt(startDate), end: parseInt(endDate) }).then(() => setLoading(false))
        }
    }, [])

    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                setLoading(true)
                props.getAccountAnalyticsData({
                    id: null,
                    dimension: AccountDataDimension,
                    timeRange: timeRangePick.timeRange,
                    type: 'account',
                    start: timeRangePick.timeRange === 'CUSTOM' ? timeRangePick.custom.start : undefined,
                    end: timeRangePick.timeRange === 'CUSTOM' ? timeRangePick.custom.end : undefined,
                }).then(() => {
                    setLoading(false)
                })
            }
            
        } else {
            loaded.current = true;
        }
        
    }, [timeRangePick])

    const returnDataConsumptionPerTimeAnalytics = () => {
        if(props.dataConsumption.data) {
            return (
                <BarChart
                    type="vertical"
                    title="Data Usage"
                    unitRight='GB'
                    dataSets={[{ data: props.dataConsumption.data.time.table.map(m => m.data), label: "Data (GB)", color: ThemeAnalyticsColors.blue }]}
                    labels={props.dataConsumption.data.time.table.map(m => m.label)} />
            )
        }

    }

    let tabs = {
        "Time": { name: 'Time', content: returnDataConsumptionPerTimeAnalytics, table: {data: props.dataConsumption.data ? props.dataConsumption.data.time.table : [], header: HeaderDataConsumptionTime} },
        // "Device": { name: 'Device', content: returnDeviceAnalytics, table: {data: props.data.device.table.map((el, i) => {return {data: watchDurationPerDevice.values[i], label: el.label}}), header: handleDynamiceHeader(HeaderWatchDevice, watchDurationPerDevice.unitShort)}},
        // "Location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data.location.table.map((el, i) => {return {data: formatTimeValue([el.data]).values[0], label: el.label}}), header: handleDynamiceHeader(HeaderWatchLocation, watchDurationPerLocationData.unitShort)}  },
    }

    const selectedTab = 'Time'
    let totalMetric = props.dataConsumption.data ? props.dataConsumption.data.time.data.reduce((acc, next) => acc + next, 0).toFixed(2) : 0

    const exportCsvAnalytics = () => {
        let tableHeader = tabs[selectedTab].table.header.map(element => element.Header)
        if(tabs[selectedTab].table.data.some(row => row.label.indexOf(',') !== -1)) {
            tableHeader.splice(1, 0 , 'Time')
        }
        exportCSVFile(tabs[selectedTab].table.data, 'Data Consumption'+'-'+selectedTab, tableHeader);
    }

    const handleDatepickerChange = (info: {value?: TimeRangeAccountAnalytics, startDate?: number, endDate?: number}) => {
        if(info.endDate && info.startDate) {
            setTimeRangePick(  {timeRange: info.value, custom: info.value === "CUSTOM" ?  { start: info.startDate, end: info.endDate} : timeRangePick.custom })
            setAnalyticsQsParams({key: 'timeRange', value: info.value}, info.startDate, info.endDate)
        }
    }


    return (
        <React.Fragment>
            <div className="flex mb2">
                <DateFilteringAnalytics
                    selectedPreset={timeRangePick.timeRange}
                    className='col col-9'
                    defaultDates={{ start: timeRangePick.custom.start, end: timeRangePick.custom.end }}
                    callback={(info) =>  handleDatepickerChange(info) }
                />
            </div>
            {
            props.dataConsumption.data ?
            <React.Fragment>
            <AnalyticsCardStyle>
                <AnalyticsCardHeader className='mb1 items-center'>
                    <div className="flex items-center">
                        <Text className='pr2' size={16} weight="med" color="gray-1">Data Usage</Text>
                        {loading && <LoadingSpinner color='violet' size='xs' />}
                    </div>
                </AnalyticsCardHeader>
                <div className='mb2'>
                    <Text weight='med' size={16}>Total Consumption: </Text>
                    <Text weight='med' size={16} color='dark-violet'>{totalMetric + ' GB'}</Text>
                </div>
                <AnalyticsCardBody className='col col-12 mx-auto' table={true}>
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
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </React.Fragment>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        dataConsumption: state.analytics.dataConsumption,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAccountAnalyticsData: async (options: AccountAnalyticsParameters) => {
           await dispatch(getAccountAnalyticsDataAction(options))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataConsumption);