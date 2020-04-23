import React from 'react';
import { LiveEngagementPage } from '../../pages/Live/Engagement/Engagement';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LiveEngagementSettings } from "../../redux-flow/store/Live/Engagement/types"
import { getLiveEngagementSettingsAction, Action, saveLiveEngagementSettingsAction, saveLiveAdAction, createLiveAdAction, deleteLiveAdAction } from '../../redux-flow/store/Live/Engagement/actions';
import { Ad } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';

export interface LiveEngagementComponentProps {
    liveEngagementSettings: LiveEngagementSettings;
    getLiveEngagementSettings: Function;
    saveLiveEngagementSettings: Function;
    saveLiveAd: Function;
    createLiveAd: Function;
    deleteLiveAd: Function;
}

export const LiveEngagement = (props: LiveEngagementComponentProps) => {

    let {liveId} = useParams()

    React.useEffect(() => {
        if(!props.liveEngagementSettings) {
            props.getLiveEngagementSettings();
        }
    }, []);

    return (
        props.liveEngagementSettings ?
            <div className='flex flex-column'>
                <LiveTabs liveId={liveId} />
                <LiveEngagementPage {...props} />
            </div>
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveEngagementSettings: state.live.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveEngagementSettings: () => {
            dispatch(getLiveEngagementSettingsAction());
        },
        saveLiveEngagementSettings: (data: LiveEngagementSettings) => {
            dispatch(saveLiveEngagementSettingsAction(data))
        },
        saveLiveAd: (data: Ad) => {
            dispatch(saveLiveAdAction(data))
        },
        createLiveAd: (data: Ad) => {
            dispatch(createLiveAdAction(data))
        },
        deleteLiveAd: (data: Ad) => {
            dispatch(deleteLiveAdAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)