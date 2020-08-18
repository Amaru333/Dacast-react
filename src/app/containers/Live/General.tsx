import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router-dom';
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { GeneralComponentProps } from '../Videos/General';
import { ContentDetails, SubtitleInfo } from '../../redux-flow/store/Content/General/types';
import { Action, getContentDetailsAction, editContentDetailsAction, deleteFileAction, uploadFileAction, getUploadUrlAction } from '../../redux-flow/store/Content/General/actions';

export const LiveGeneral = (props: GeneralComponentProps) => {

    let { liveId } = useParams()


    React.useEffect(() => {
        props.getContentDetails(liveId, 'live');
    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.contentDetailsState['live'] && props.contentDetailsState['live'][liveId] ?
                    (
                        <div className='flex flex-column'>
                            <ContentGeneralPage
                                contentType="live" 
                                contentDetails={props.contentDetailsState['live'][liveId]}
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
        getContentDetails: async (liveId: string, contentType: string) => {
            await dispatch(getContentDetailsAction(liveId, contentType));
        },
        saveContentDetails: async (data: ContentDetails, contentType: string) => {
            await dispatch(editContentDetailsAction(data, contentType))
        },
        getUploadUrl: async (uploadType: string, vodId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => {
            await dispatch(getUploadUrlAction(uploadType, vodId, extension, contentType, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, vodId: string, uploadType: string, contentType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, vodId, uploadType, contentType))
        },
        deleteFile: async (vodId: string, targetId: string, contentType: string) => {
            await dispatch(deleteFileAction(vodId, targetId, contentType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);