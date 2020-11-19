import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentAnalytics } from '../../shared/Analytics/ContentAnalytics';
import { ContentAnalyticsState, getContentAnalyticsAction } from '../../redux-flow/store/Content/Analytics';
import { Action } from '../../redux-flow/store/Content/Analytics';
import { GetContentAnalyticsInput } from '../../../DacastSdk/analytics';
import { AudienceDimension } from '../../shared/Analytics/AnalyticsCommun';


const LiveAnalytics = (props: { getContentAnalytics: (options: GetContentAnalyticsInput) => Promise<void>, contentAnalyticsData: ContentAnalyticsState }) => {

    let { liveId } = useParams<{liveId: string}>()

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    
    React.useEffect(() => {
        if(Object.keys(props.contentAnalyticsData).length === 0 && props.contentAnalyticsData.constructor === Object) {
            setIsFetching(true);
            props.getContentAnalytics({ id: liveId, timeRange: 'LAST_WEEK', type: "live", dimension: AudienceDimension }).then(() => setIsFetching(false))
        }
    }, [])

    return !isFetching || (props.contentAnalyticsData.live && props.contentAnalyticsData.live[liveId]) ?
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <ContentAnalytics {...props} contentAnalyticsData={props.contentAnalyticsData.live[liveId]} contentType="live" contentId={liveId} />
        </div>
        : <><LiveTabs liveId={liveId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
}

export function mapStateToProps(state: ApplicationState) {
    return {
       contentAnalyticsData: state.content.analytics
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentAnalytics: async (options: GetContentAnalyticsInput) => {
            await dispatch(getContentAnalyticsAction(options));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveAnalytics)