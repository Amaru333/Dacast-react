import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentAnalytics, ContentAnalyticsProps } from '../../shared/Analytics/ContentAnalytics';
import { ContentAnalyticsState, getContentAnalyticsAction } from '../../redux-flow/store/Content/Analytics';
import { Action } from '../../redux-flow/store/Content/Analytics';
import { GetContentAnalyticsInput } from '../../../DacastSdk/analytics';


const LiveAnalytics = (props: { getContentAnalytics: (options: GetContentAnalyticsInput) => void, contentAnalyticsData: ContentAnalyticsState }) => {

    let { liveId } = useParams()

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    console.log(liveId);
    
    React.useEffect(() => {
        if(Object.keys(props.contentAnalyticsData).length === 0 && props.contentAnalyticsData.constructor === Object) {
            setIsFetching(true);
            props.getContentAnalytics({ id: liveId, timeRange: 'LAST_WEEK', type: "channel", dimension: ['IMPRESSIONS_BY_COUNTRY'] }).then(() => setIsFetching(false))
        }
    }, [])
        

    console.log(props, "les props")


    return !isFetching || (props.contentAnalyticsData.channel && props.contentAnalyticsData.channel[liveId]) ?
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <ContentAnalytics {...props} contentAnalyticsData={props.contentAnalyticsData.channel[liveId]} contentType="live" contentId={liveId} />
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