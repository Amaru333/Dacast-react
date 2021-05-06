import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnalyticsCard } from '../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../components/Analytics/BarChart'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { ThemeAnalyticsColors } from '../../../styled/themes/dacast-theme'
import { dateAdd } from '../../../utils/services/date/dateService'
import { ApplicationState } from '../../redux-flow/store'
import { Action, getAccountAnalyticsAudienceAction } from '../../redux-flow/store/Analytics/Audience/actions'
import { AccountAnalyticsAudienceState, AccountAudienceDimension } from '../../redux-flow/store/Analytics/Audience/types'
import { getAccountAnalyticsDataAction } from '../../redux-flow/store/Analytics/Data/actions'
import { AccountAnalyticsDataState, AccountDataDimension } from '../../redux-flow/store/Analytics/Data/types'
import { AccountAnalyticsParameters, TimeRangeAccountAnalytics } from '../../redux-flow/store/Analytics/types'
import { AudienceAnalytics } from '../../shared/Analytics/AnalyticsType/AudienceAnalytics'
import { DateFilteringAnalytics } from '../../shared/Analytics/DateFilteringAnalytics'
import { HeaderDataConsumptionTime } from '../../shared/Analytics/TableHeaders'

interface AccountAnalyticsDataProps {
    dataConsumption: AccountAnalyticsDataState
    getAccountAnalyticsData: (options: AccountAnalyticsParameters) => Promise<void>
}

const DataConsumption = (props: AccountAnalyticsDataProps) => {

    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>( {timeRange: 'LAST_WEEK', custom: { end: new Date().getTime(), start: dateAdd(new Date, 'week', -1).getTime() } } )
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(false)

    const loaded = React.useRef(false);

    React.useEffect(() => {
        if(!isFetching || !props.dataConsumption) {
            setIsFetching(true);
            props.getAccountAnalyticsData({ id: null, timeRange: 'LAST_WEEK', type: "account", dimension: AccountDataDimension }).then(() => setIsFetching(false))
        }
    }, [])

    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                console.log('request')
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
                    dataSets={[{ data: props.dataConsumption.data.dataConsumptionByTime.table.map(m => m.data), label: "Data (GBs)", color: ThemeAnalyticsColors.blue }]}
                    labels={props.dataConsumption.data.dataConsumptionByTime.table.map(m => m.label)} />
            )
        }

    }


    return (
        <React.Fragment>
            <div className="flex mb2">
                <DateFilteringAnalytics
                    selectedPreset={timeRangePick.timeRange}
                    isDisabled={loading}
                    className='col col-9'
                    defaultDates={{ start: timeRangePick.custom.start, end: timeRangePick.custom.end }}
                    callback={(info) => {  info.endDate && info.startDate ?  setTimeRangePick(  {timeRange: info.value as TimeRangeAccountAnalytics, custom: info.value === "CUSTOM" ?  { start: info.startDate, end: info.endDate} : timeRangePick.custom } ) : null } }
                />
            </div>
            {
            props.dataConsumption.data ?
            <AnalyticsCard
                title="Data Usage by "
                showTable={true}
                csvType="Data Usage"
                tabs={
                    {
                        "Time": { name: 'Time', content: returnDataConsumptionPerTimeAnalytics, table: {data: props.dataConsumption.data.dataConsumptionByTime.table, header: HeaderDataConsumptionTime} },
                    }
                }
            />
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