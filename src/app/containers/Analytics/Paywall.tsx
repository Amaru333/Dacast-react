import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { dateAdd } from '../../../utils/services/date/dateService'
import { ApplicationState } from '../../redux-flow/store'
import { Action } from '../../redux-flow/store/Analytics/Paywall/actions'
import { TimeRangeAccountAnalytics } from '../../redux-flow/store/Analytics/types'
import { getAccountAnalyticsPaywallAction } from '../../redux-flow/store/Analytics/Paywall/actions'
import { AccountAnalyticsPaywallState, AccountPaywallDimension } from '../../redux-flow/store/Analytics/Paywall/types'
import { AccountAnalyticsParameters } from '../../redux-flow/store/Analytics/types'
import { SalesAnalytics } from '../../shared/Analytics/AnalyticsType/SalesAnalytics'
import { DateFilteringAnalytics } from '../../shared/Analytics/DateFilteringAnalytics'

interface AccountAnalyticsPaywallProps {
    paywall: AccountAnalyticsPaywallState
    getAccountAnalyticsPaywall: (options: AccountAnalyticsParameters) => Promise<void>
}

const Paywall = (props: AccountAnalyticsPaywallProps) => {

    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>( {timeRange: 'LAST_WEEK', custom: { end: new Date().getTime(), start: dateAdd(new Date, 'week', -1).getTime() } } )
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(false)

    const loaded = React.useRef(false);

    React.useEffect(() => {
        if(!isFetching || !props.paywall) {
            setIsFetching(true);
            props.getAccountAnalyticsPaywall({ id: null, timeRange: 'LAST_WEEK', type: "account", dimension: AccountPaywallDimension }).then(() => setIsFetching(false))
        }
    }, [])

    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                console.log('request')
                setLoading(true)
                props.getAccountAnalyticsPaywall({
                    id: null,
                    dimension: AccountPaywallDimension,
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
            props.paywall.data ?
                <SalesAnalytics data={props.paywall.data} /> 
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </React.Fragment>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        paywall: state.analytics.paywall,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAccountAnalyticsPaywall: async (options: AccountAnalyticsParameters) => {
           await dispatch(getAccountAnalyticsPaywallAction(options))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paywall);