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
    getGlobalEngagementSettings: Function;
    vodEngagementSettings: ContentEngagementSettings;
    vodEngagementSettingsState: ContentEngagementSettingsState;
    getVodEngagementSettings: Function;
    saveVodEngagementSettings: Function;
    saveVodAd: Function;
    createVodAd: Function;
    deleteVodAd: Function;
    getUploadUrl: Function;
    uploadVodImage: Function;
    deleteVodImage: Function;
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
        getVodEngagementSettings: (vodId: string) => {
            dispatch(getVodEngagementSettingsAction(vodId));
        },
        getGlobalEngagementSettings: () => {
            dispatch(getSettingsInteractionsInfosAction());
        },
        saveVodEngagementSettings: (data: ContentEngagementSettings, callback?: Function) => {
            dispatch(saveVodEngagementSettingsAction(data)).then(callback)
        },
        saveVodAd: (data: Ad[], adsId: string, vodId: string, callback?: Function) => {
            dispatch(saveVodAdAction(data, adsId, vodId)).then(callback)
        },
        createVodAd: (data: Ad[], adsId: string, vodId: string, callback?: Function) => {
            dispatch(createVodAdAction(data, adsId, vodId)).then(callback)
        },
        deleteVodAd: (data: Ad[], adsId: string, vodId: string) => {
            dispatch(deleteVodAdAction(data, adsId, vodId))
        },
        getUploadUrl: (uploadType: string, vodId: string, callback: Function) => {
            dispatch(getUploadUrlAction(uploadType, vodId)).then(callback)
        },
        uploadVodImage: (data: File, uploadUrl: string) => {
            dispatch(uploadVodImageAction(data, uploadUrl))
        },
        deleteVodImage: (targetId: string) => {
            dispatch(deleteVodImageAction(targetId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VodEngagement)