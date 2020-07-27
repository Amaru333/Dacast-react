import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getVodEngagementSettingsAction, Action, saveVodEngagementSettingsAction, saveVodAdAction, createVodAdAction, deleteVodAdAction, getUploadUrlAction, uploadVodImageAction, deleteVodImageAction } from '../../redux-flow/store/VOD/Engagement/actions';
import { Ad, ContentEngagementSettings, ContentEngagementSettingsState, InteractionsInfos } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions/actions';

export interface VodEngagementComponentProps {
    globalEngagementSettings: InteractionsInfos;
    getGlobalEngagementSettings: () => Promise<void>;
    vodEngagementSettings: ContentEngagementSettings;
    vodEngagementSettingsState: ContentEngagementSettingsState;
    getVodEngagementSettings: (vodId: string) => Promise<void>;
    saveVodEngagementSettings: (data: ContentEngagementSettings) => Promise<void>;
    saveVodAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    createVodAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    deleteVodAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string) => Promise<void>;
    uploadVodImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteVodImage: (targetId: string) => Promise<void>;
}

export const VodEngagement = (props: VodEngagementComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
        }
        if (!props.vodEngagementSettingsState[vodId])
            props.getVodEngagementSettings(vodId);
    }, []);

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.vodEngagementSettingsState[vodId] && props.globalEngagementSettings?
                    <div className='flex flex-column'>
                        <ContentEngagementPage
                            contentEngagementSettings={props.vodEngagementSettingsState[vodId]}
                            getContentEngagementSettings={props.getVodEngagementSettings}
                            saveContentEngagementSettings={props.saveVodEngagementSettings}
                            saveContentAd={props.saveVodAd}
                            createContentAd={props.createVodAd}
                            deleteContentAd={props.deleteVodAd}
                            getUploadUrl={props.getUploadUrl}
                            uploadContentImage={props.uploadVodImage}
                            deleteContentImage={props.deleteVodImage}
                            contentType='vod'
                            contentId={vodId}
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
        vodEngagementSettingsState: state.vod.engagement,
        globalEngagementSettings: state.settings.interactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodEngagementSettings: async (vodId: string) => {
            await dispatch(getVodEngagementSettingsAction(vodId));
        },
        getGlobalEngagementSettings: async () => {
            await dispatch(getSettingsInteractionsInfosAction());
        },
        saveVodEngagementSettings: async (data: ContentEngagementSettings) => {
            await dispatch(saveVodEngagementSettingsAction(data))
        },
        saveVodAd: async (data: Ad[], adsId: string, vodId: string) => {
            await dispatch(saveVodAdAction(data, adsId, vodId))
        },
        createVodAd: async (data: Ad[], adsId: string, vodId: string) => {
            await dispatch(createVodAdAction(data, adsId, vodId))
        },
        deleteVodAd: async (data: Ad[], adsId: string, vodId: string) => {
            await dispatch(deleteVodAdAction(data, adsId, vodId))
        },
        getUploadUrl: async (uploadType: string, vodId: string) => {
            await dispatch(getUploadUrlAction(uploadType, vodId))
        },
        uploadVodImage: async (data: File, uploadUrl: string) => {
            await dispatch(uploadVodImageAction(data, uploadUrl))
        },
        deleteVodImage: async (targetId: string) => {
            await dispatch(deleteVodImageAction(targetId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VodEngagement)