import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SubtitleInfo, ContentDetails, ContentDetailsState } from '../../redux-flow/store/Content/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';
import { getContentDetailsAction, editContentDetailsAction, getUploadUrlAction, uploadFileAction, uploadImageFromVideoAction, deleteFileAction, deleteSubtitleAction, addSubtitleAction, Action } from '../../redux-flow/store/Content/General/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface GeneralComponentProps {
    contentDetailsState: ContentDetailsState;
    contentDetails: ContentDetails;
    getContentDetails: (contentId: string, contentType: string) => Promise<void>
    saveContentDetails: (data: ContentDetails, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => Promise<void>;
    deleteFile: (contentId: string, targetId: string, uploadType: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    uploadImageFromVideo?: (contentId: string, time: number, imageType: string) => Promise<void>
    deleteSubtitle?: (targetId: string, contentId: string, fileName: string, contentType: string) => Promise<void>;
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => Promise<void>
}
const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)


    React.useEffect(() => {
        props.getContentDetails(vodId, "vod")
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.contentDetailsState['vod'] && props.contentDetailsState['vod'][vodId] ?
                    (
                        <div className='flex flex-column'>
                            <ContentGeneralPage
                                contentType="vod" 
                                contentDetails={props.contentDetailsState['vod'][vodId]}
                                getContentDetails={props.getContentDetails}
                                saveContentDetails={props.saveContentDetails}
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
        contentDetailsState: state.content.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentDetails: async (contentId: string, contentType: string) => {
            await dispatch(getContentDetailsAction(contentId, contentType));
        },
        saveContentDetails: async (data: ContentDetails, contentType: string) => {
            await dispatch(editContentDetailsAction(data, contentType))
        },
        getUploadUrl: async (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => {
            await dispatch(getUploadUrlAction(uploadType, contentId, extension, contentType, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, contentId, uploadType, contentType))
        },
        uploadImageFromVideo: async (contentId: string, time: number, imageType: string)  => {
            await dispatch(uploadImageFromVideoAction(contentId, time, imageType))
        },
        deleteFile: async (contentId: string, targetId: string, contentType: string, imageType: string) => {
            await dispatch(deleteFileAction(contentId, targetId, contentType, imageType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        addSubtitle: async (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => {
            await dispatch(addSubtitleAction(data, uploadUrl, subtitleInfo, contentId, contentType))
        },
        deleteSubtitle: async (targetId: string, contentId: string, fileName: string, contentType: string) => {
            await dispatch(deleteSubtitleAction(targetId, contentId, fileName, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);