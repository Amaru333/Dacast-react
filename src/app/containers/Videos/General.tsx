import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodDetailsAction, getUploadUrlAction, editVodDetailsAction, deleteFileAction, uploadFileAction, deleteSubtitleAction, addSubtitleAction, uploadImageFromVideoAction } from '../../redux-flow/store/VOD/General/actions';
import { connect } from 'react-redux';
import { SubtitleInfo, ContentDetails, ContentDetailsState } from '../../redux-flow/store/VOD/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';


export interface GeneralComponentProps {
    vodDetails: ContentDetails;
    vodDetailsState: ContentDetailsState;
    editVodDetails: (data: ContentDetails) => Promise<void>;
    getVodDetails: (vodId: string) => Promise<void>;
    getUploadUrl: (uploadType: string, vodId: string, extension: string, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, vodId: string, uploadType: string) => Promise<void>;
    uploadImageFromVideo: (vodId: string, time: number, imageType: string) => Promise<void>;
    deleteFile: (vodId: string, targetId: string, fileName: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    deleteSubtitle: (targetId: string, vodId: string, fileName: string) => Promise<void>;
    addSubtitle: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, vodId: string) => Promise<void>;
}

const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams();

    React.useEffect(() => {
            props.getVodDetails(vodId);
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.vodDetailsState[vodId] ?
                    (
                        <div className='flex flex-column'>
                            <ContentGeneralPage
                                contentType="vod" 
                                contentDetails={props.vodDetailsState[vodId]}
                                getContentDetails={props.getVodDetails}
                                saveContentDetails={props.editVodDetails}
                                getUploadUrl={props.getUploadUrl}
                                uploadFile={props.uploadFile}
                                deleteFile={props.deleteFile}
                                showToast={props.showToast}
                                uploadImageFromVideo={props.uploadImageFromVideo}
                                deleteSubtitle={props.deleteSubtitle}
                                addSubtitle={props.addSubtitle}

                            />
                        </div>
                    )
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodDetailsState: state.vod.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodDetails: async (vodId: string) => {
            await dispatch(getVodDetailsAction(vodId));
        },
        editVodDetails: async (data: ContentDetails) => {
            await dispatch(editVodDetailsAction(data))
        },
        getUploadUrl: async (uploadType: string, vodId: string, extension: string, subtitleInfo?: SubtitleInfo) => {
            await dispatch(getUploadUrlAction(uploadType, vodId, extension, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, vodId: string, uploadType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, vodId, uploadType))
        },
        uploadImageFromVideo: async (vodId: string, time: number, imageType: string)  => {
            await dispatch(uploadImageFromVideoAction(vodId, time, imageType))
        },
        deleteFile: async (vodId: string, targetId: string) => {
            await dispatch(deleteFileAction(vodId, targetId))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        addSubtitle: async (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, vodId: string) => {
            await dispatch(addSubtitleAction(data, uploadUrl, subtitleInfo, vodId))
        },
        deleteSubtitle: async (targetId: string, vodId: string, fileName: string) => {
            await dispatch(deleteSubtitleAction(targetId, vodId, fileName))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);