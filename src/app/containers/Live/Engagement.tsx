import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getLiveEngagementSettingsAction, Action, saveLiveEngagementSettingsAction, saveLiveAdAction, createLiveAdAction, deleteLiveAdAction, getUploadUrlAction, uploadLiveImageAction, deleteLiveImageAction } from '../../redux-flow/store/Live/Engagement/actions';
import { Ad, ContentEngagementSettings, ContentEngagementSettingsState, InteractionsInfos } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions';

export interface LiveEngagementComponentProps {
    liveEngagementSettings: ContentEngagementSettings;
    liveEngagementSettingsState: ContentEngagementSettingsState;
    getLiveEngagementSettings: Function;
    saveLiveEngagementSettings: Function;
    saveLiveAd: Function;
    createLiveAd: Function;
    deleteLiveAd: Function;
    getUploadUrl: Function;
    uploadLiveImage: Function;
    deleteLiveImage: Function;
    globalEngagementSettings: InteractionsInfos;
    getGlobalEngagementSettings: Function;
}

export const LiveEngagement = (props: LiveEngagementComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if (!props.liveEngagementSettingsState[liveId]) {
            props.getLiveEngagementSettings(liveId);
        }
        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
        }
    }, []);

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.liveEngagementSettingsState[liveId] && props.globalEngagementSettings ?
                    <div className='flex flex-column'>
                        <ContentEngagementPage
                            contentEngagementSettings={props.liveEngagementSettingsState[liveId]}
                            getContentEngagementSettings={props.getLiveEngagementSettings}
                            saveContentEngagementSettings={props.saveLiveEngagementSettings}
                            saveContentAd={props.saveLiveAd}
                            createContentAd={props.createLiveAd}
                            deleteContentAd={props.deleteLiveAd}
                            getUploadUrl={props.getUploadUrl}
                            uploadContentImage={props.uploadLiveImage}
                            deleteContentImage={props.deleteLiveImage}
                            contentType='live'
                            contentId={liveId}
                            globalEngagementSettings={props.globalEngagementSettings}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveEngagementSettingsState: state.live.engagement,
        globalEngagementSettings: state.settings.interactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveEngagementSettings: (liveId: string) => {
            dispatch(getLiveEngagementSettingsAction(liveId));
        },
        getGlobalEngagementSettings: () => {
            dispatch(getSettingsInteractionsInfosAction());
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
        },
        getUploadUrl: (uploadType: string, liveId: string, callback: Function) => {
            dispatch(getUploadUrlAction(uploadType, liveId)).then(callback)
        },
        uploadLiveImage: (data: File, uploadUrl: string) => {
            dispatch(uploadLiveImageAction(data, uploadUrl))
        },
        deleteLiveImage: (targetId: string) => {
            dispatch(deleteLiveImageAction(targetId))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)