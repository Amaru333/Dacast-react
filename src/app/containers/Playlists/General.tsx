import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';
import { GeneralComponentProps } from '../Videos/General';
import { getContentDetailsAction, Action, editContentDetailsAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Content/General/actions';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';

const GeneralPlaylist = (props: GeneralComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        props.getContentDetails(playlistId, 'playlist');
    }, [])

    return (
        <>
            <PlaylistsTabs playlistId={playlistId} />
            { props.contentDetailsState['playlist'] && props.contentDetailsState['playlist'][playlistId] ?
                (
                    <div className='flex flex-column'>
                        <ContentGeneralPage
                            contentType="playlist" 
                            contentDetails={props.contentDetailsState['playlist'][playlistId]}
                            getContentDetails={props.getContentDetails}
                            saveContentDetails={props.saveContentDetails}
                            getUploadUrl={props.getUploadUrl}
                            uploadFile={props.uploadFile}
                            deleteFile={props.deleteFile}
                            showToast={props.showToast}
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
        getUploadUrl: async (uploadType: string, contentId: string, extension: string, contentType: string) => {
            await dispatch(getUploadUrlAction(uploadType, contentId, extension, contentType))
        },
        uploadFile: async (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, contentId, uploadType, contentType))
        },
        deleteFile: async (contentId: string, targetId: string, contentType: string) => {
            await dispatch(deleteFileAction(contentId, targetId, contentType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPlaylist);