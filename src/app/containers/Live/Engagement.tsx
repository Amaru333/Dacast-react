import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getLiveEngagementSettingsAction, Action, saveLiveEngagementSettingsAction, saveLiveAdAction, createLiveAdAction, deleteLiveAdAction } from '../../redux-flow/store/Live/Engagement/actions';
import { Ad, ContentEngagementSettings, ContentEngagementSettingsState } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';

export interface LiveEngagementComponentProps {
    liveEngagementSettings: ContentEngagementSettings;
    liveEngagementSettingsState: ContentEngagementSettingsState;
    getLiveEngagementSettings: Function;
    saveLiveEngagementSettings: Function;
    saveLiveAd: Function;
    createLiveAd: Function;
    deleteLiveAd: Function;
}

export const LiveEngagement = (props: LiveEngagementComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if (!props.liveEngagementSettingsState[liveId]) {
            props.getLiveEngagementSettings(liveId);
        }
    }, []);

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.liveEngagementSettingsState[liveId] ?
                    <div className='flex flex-column'>
                        <ContentEngagementPage
                            contentEngagementSettings={props.liveEngagementSettingsState[liveId]}
                            getContentEngagementSettings={props.getLiveEngagementSettings}
                            saveContentEngagementSettings={props.saveLiveEngagementSettings}
                            saveContentAd={props.saveLiveAd}
                            createContentAd={props.createLiveAd}
                            deleteContentAd={props.deleteLiveAd}
                            contentType='live'
                            contentId={liveId}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveEngagementSettingsState: state.live.engagement
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
        saveLiveAd: (data: Ad[], adsId: string, liveId: string, callback?: Function) => {
            dispatch(saveLiveAdAction(data, adsId, liveId)).then(callback)
        },
        createLiveAd: (data: Ad[], adsId: string, liveId: string, callback?: Function) => {
            dispatch(createLiveAdAction(data, adsId, liveId)).then(callback)
        },
        deleteLiveAd: (data: Ad[], adsId: string, liveId: string) => {
            dispatch(deleteLiveAdAction(data, adsId, liveId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)