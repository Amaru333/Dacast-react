import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SubtitleInfo, ContentDetails, ContentDetailsState } from '../../redux-flow/store/VOD/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';
import { getContentDetailsAction, editContentDetailsAction, getUploadUrlAction, uploadFileAction, uploadImageFromVideoAction, deleteFileAction, deleteSubtitleAction, addSubtitleAction, Action } from '../../redux-flow/store/Shared/General/actions';


export interface GeneralComponentProps {
    vodDetails: ContentDetails;
    vodDetailsState: ContentDetailsState;
    editContentDetails: (data: ContentDetails, contentType: string) => Promise<void>;
    getContentDetails: (contentId: string, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, vodId: string, extension: string, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, vodId: string, uploadType: string, contentType: string) => Promise<void>
    uploadImageFromVideo: (vodId: string, time: number, imageType: string) => Promise<void>
    deleteFile: (vodId: string, targetId: string, fileName: string, contentType: string) => Promise<void>
    showToast: (text: string, size: Size, notificationType: NotificationType) => Promise<void>
    deleteSubtitle: (targetId: string, vodId: string, fileName: string, contentType: string) => Promise<void>
    addSubtitle: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, vodId: string) => Promise<void>
}

const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams();

    React.useEffect(() => {
            props.getContentDetails(vodId, "vod");
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
                                getContentDetails={props.getContentDetails}
                                saveContentDetails={props.editContentDetails}
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
        getContentDetails: async (contentId: string, contentType: string) => {
            await dispatch(getContentDetailsAction(contentId, contentType));
        },
        editContentDetails: async (data: ContentDetails, contentType: string) => {
            await dispatch(editContentDetailsAction(data, contentType))
        },
        getUploadUrl: async (uploadType: string, vodId: string, extension: string, subtitleInfo?: SubtitleInfo) => {
            await dispatch(getUploadUrlAction(uploadType, vodId, extension, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, vodId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, vodId, uploadType, contentType))
        },
        uploadImageFromVideo: async (vodId: string, time: number, imageType: string)  => {
            await dispatch(uploadImageFromVideoAction(vodId, time, imageType))
        },
        deleteFile: async (vodId: string, targetId: string, contentType: string) => {
            await dispatch(deleteFileAction(vodId, targetId, contentType))
        },
        showToast: async (text: string, size: Size, notificationType: NotificationType) => {
            await dispatch(showToastNotification(text, size, notificationType));
        },
        addSubtitle: async (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, vodId: string) => {
            await dispatch(addSubtitleAction(data, uploadUrl, subtitleInfo, vodId))
        },
        deleteSubtitle: async (targetId: string, vodId: string, fileName: string, contentType: string) => {
            await dispatch(deleteSubtitleAction(targetId, vodId, fileName, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);