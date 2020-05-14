import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getLiveEngagementSettingsAction, Action, saveLiveEngagementSettingsAction, saveLiveAdAction, createLiveAdAction, deleteLiveAdAction } from '../../redux-flow/store/Live/Engagement/actions';
import { Ad, ContentEngagementSettings } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';

export interface LiveEngagementComponentProps {
    liveEngagementSettings: ContentEngagementSettings;
    getLiveEngagementSettings: Function;
    saveLiveEngagementSettings: Function;
    saveLiveAd: Function;
    createLiveAd: Function;
    deleteLiveAd: Function;
}

export const LiveEngagement = (props: LiveEngagementComponentProps) => {

    let {liveId} = useParams()

    React.useEffect(() => {
        props.getLiveEngagementSettings(liveId);
    }, []);

    return (
        props.liveEngagementSettings ?
            <div className='flex flex-column'>
                <LiveTabs liveId={liveId} />
                <ContentEngagementPage 
                    contentEngagementSettings={props.liveEngagementSettings}
                    getContentEngagementSettings={props.getLiveEngagementSettings}
                    saveContentEngagementSettings={props.saveLiveEngagementSettings}
                    saveContentAd={props.saveLiveAd}
                    createContentAd={props.createLiveAd}
                    deleteContentAd={props.deleteLiveAd}
                    contentType='live'
                />            
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
        getLiveEngagementSettings: (liveId: string) => {
            dispatch(getLiveEngagementSettingsAction(liveId));
        },
        saveLiveEngagementSettings: (data: ContentEngagementSettings, callback?: Function) => {
            dispatch(saveLiveEngagementSettingsAction(data)).then(callback)
        },
        saveLiveAd: (data: Ad, callback?: Function) => {
            dispatch(saveLiveAdAction(data)).then(callback)
        },
        createLiveAd: (data: Ad, callback?: Function) => {
            dispatch(createLiveAdAction(data)).then(callback)
        },
        deleteLiveAd: (data: Ad) => {
            dispatch(deleteLiveAdAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)