import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsRealTimeState, GetAnalyticsRealtimeOptions, getAnalyticsRealTimeAction } from '../../redux-flow/store/Analytics/RealTime';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getContentListAction } from '../../redux-flow/store/Content/List/actions';
import { SearchResult } from '../../redux-flow/store/Content/General/types';
import { ErrorRealTime } from '../../../components/Error/ErrorRealTime';
import { useHistory } from 'react-router';
import { ContentAnalytics } from '../../shared/Analytics/ContentAnalytics';


export interface AnalyticsProps {

}

const Analytics = (props: AnalyticsProps) => {

    const [noChannel, setNoChannel] = React.useState<boolean>(false)

    let history = useHistory()

    React.useEffect(() => {
       
    }, [])

    return <ContentAnalytics contentAnalyticsData={{}} contentId="" getContentAnalytics={() => {}} contentType="all" />  
}

export function mapStateToProps(state: ApplicationState) {
    return {
        
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);