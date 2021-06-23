import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { dateAdd } from '../../../utils/services/date/dateService'
import { ApplicationState } from '../../redux-flow/store'
import { Action, getAccountAnalyticsAudienceAction } from '../../redux-flow/store/Analytics/Audience/actions'
import { AccountAnalyticsAudienceState, AccountAudienceDimension } from '../../redux-flow/store/Analytics/Audience/types'
import { AccountAnalyticsParameters, TimeRangeAccountAnalytics } from '../../redux-flow/store/Analytics/types'
import { getAnalyticsQsParams, setAnalyticsQsParams } from '../../shared/Analytics/AnalyticsCommun'
import { AudienceAnalytics } from '../../shared/Analytics/AnalyticsType/AudienceAnalytics'
import { DateFilteringAnalytics } from '../../shared/Analytics/DateFilteringAnalytics'

interface AccountAnalyticsAudienceProps {
    audience: AccountAnalyticsAudienceState
    getAccountAnalyticsAudience: (options: AccountAnalyticsParameters) => Promise<void>
}

const Audience = (props: AccountAnalyticsAudienceProps) => {

    const {timeRange, startDate, endDate} = getAnalyticsQsParams()

    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>({timeRange: timeRange ? timeRange as TimeRangeAccountAnalytics : 'LAST_WEEK', custom: { end: parseInt(endDate) || new Date().getTime(), start: parseInt(startDate) || dateAdd(new Date, 'week', -1).getTime()}})
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(false)

    const loaded = React.useRef(false);

    React.useEffect(() => {
        if(!isFetching || !props.audience) {
            setIsFetching(true);
            props.getAccountAnalyticsAudience({ id: null, timeRange: timeRange as TimeRangeAccountAnalytics, type: "account", dimension: AccountAudienceDimension, start: parseInt(startDate), end: parseInt(endDate) }).then(() => setIsFetching(false))
        }
    }, [])

    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                setLoading(true)
                props.getAccountAnalyticsAudience({
                    id: null,
                    dimension: AccountAudienceDimension,
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
            props.audience.data ?
                <AudienceAnalytics showTable={true} data={props.audience.data} loading={loading} /> 
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </React.Fragment>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        audience: state.analytics.audience,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAccountAnalyticsAudience: async (options: AccountAnalyticsParameters) => {
           await dispatch(getAccountAnalyticsAudienceAction(options))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Audience);