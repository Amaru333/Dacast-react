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
    getLiveEngagementSettings: (liveId: string) => Promise<void>;
    saveLiveEngagementSettings: (data: ContentEngagementSettings) => Promise<void>;
    saveLiveAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    createLiveAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    deleteLiveAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string) => Promise<void>;
    uploadLiveImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteLiveImage: (targetId: string) => Promise<void>;
    globalEngagementSettings: InteractionsInfos;
    getGlobalEngagementSettings: () => Promise<void>;
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
        getLiveEngagementSettings: async (liveId: string) => {
            await dispatch(getLiveEngagementSettingsAction(liveId));
        },
        getGlobalEngagementSettings: async  () => {
            await dispatch(getSettingsInteractionsInfosAction());
        },
        saveLiveEngagementSettings: async (data: ContentEngagementSettings) => {
            await dispatch(saveLiveEngagementSettingsAction(data))
        },
        saveLiveAd: async (data: Ad[], adsId: string, liveId: string) => {
            await dispatch(saveLiveAdAction(data, adsId, liveId))
        },
        createLiveAd: async (data: Ad[], adsId: string, liveId: string) => {
            await dispatch(createLiveAdAction(data, adsId, liveId))
        },
        deleteLiveAd: async (data: Ad[], adsId: string, liveId: string) => {
            await dispatch(deleteLiveAdAction(data, adsId, liveId))
        },
        getUploadUrl: async (uploadType: string, liveId: string) => {
            await dispatch(getUploadUrlAction(uploadType, liveId))
        },
        uploadLiveImage: async (data: File, uploadUrl: string) => {
            await dispatch(uploadLiveImageAction(data, uploadUrl))
        },
        deleteLiveImage: async (targetId: string) => {
            await dispatch(deleteLiveImageAction(targetId))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)