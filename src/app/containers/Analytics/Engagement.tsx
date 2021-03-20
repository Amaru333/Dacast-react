import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { dateAdd } from '../../../utils/services/date/dateService'
import { ApplicationState } from '../../redux-flow/store'
import { Action, getAccountAnalyticsEngagementAction } from '../../redux-flow/store/Analytics/Engagement/actions'
import { AccountAnalyticsParameters, TimeRangeAccountAnalytics } from '../../redux-flow/store/Analytics/types'
import { DateFilteringAnalytics } from '../../shared/Analytics/DateFilteringAnalytics'
import { AccountAnalyticsEngagementState, AccountEngagementDimension } from '../../redux-flow/store/Analytics/Engagement/types'
import { WatchDurationAnalytics } from '../../shared/Analytics/AnalyticsType/WatchDurationAnalytics'

interface AccountAnalyticsEngagementProps {
    engagement: AccountAnalyticsEngagementState
    getAccountAnalyticsEngagement: (options: AccountAnalyticsParameters) => Promise<void>
}

const Engagement = (props: AccountAnalyticsEngagementProps) => {

    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>( {timeRange: 'LAST_WEEK', custom: { end: new Date().getTime(), start: dateAdd(new Date, 'week', -1).getTime() } } )
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(false)

    const loaded = React.useRef(false);

    React.useEffect(() => {
        if(!isFetching || !props.engagement) {
            setIsFetching(true);
            props.getAccountAnalyticsEngagement({ id: null, timeRange: 'LAST_WEEK', type: "account", dimension: AccountEngagementDimension }).then(() => setIsFetching(false))
        }
    }, [])

    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                setLoading(true)
                props.getAccountAnalyticsEngagement({
                    id: null,
                    dimension: AccountEngagementDimension,
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
            props.engagement.data ?
                <WatchDurationAnalytics data={props.engagement.data} /> 
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </React.Fragment>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        engagement: state.analytics.engagement,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAccountAnalyticsEngagement: async (options: AccountAnalyticsParameters) => {
           await dispatch(getAccountAnalyticsEngagementAction(options))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Engagement);