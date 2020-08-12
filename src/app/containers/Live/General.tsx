import React from 'react';
import { LiveGeneralPage } from '../../pages/Live/General/General'
import { LiveDetails, LiveDetailsState } from '../../redux-flow/store/Live/General/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveDetailsAction, saveLiveDetailsAction, deleteFileAction, uploadFileAction, getUploadUrlAction } from '../../redux-flow/store/Live/General/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router-dom';
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';
import { ContentDetails, ContentDetailsState } from '../../redux-flow/store/VOD/General/types';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

export interface LiveGeneralProps {
    liveDetails: ContentDetails;
    liveDetailsState: ContentDetailsState;
    getLiveDetails: (liveId: string) => Promise<void>
    saveLiveDetails: (data: LiveDetails) => Promise<void>
    getUploadUrl: (uploadType: string, liveId: string, extension: string) => Promise<void>
    uploadFile: (data: File, uploadUrl: string, liveId: string, uploadType: string) => Promise<void>
    deleteFile: (liveId: string, targetId: string, uploadType: string) => Promise<void>
    showToast: (text: string, size: Size, notificationType: NotificationType) => Promise<void>
}

export const LiveGeneral = (props: LiveGeneralProps) => {

    let { liveId } = useParams()


    React.useEffect(() => {
        props.getLiveDetails(liveId);
    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.liveDetailsState[liveId] ?
                    (
                        <div className='flex flex-column'>
                            <ContentGeneralPage
                                contentType="live" 
                                contentDetails={props.liveDetailsState[liveId]}
                                getContentDetails={props.getLiveDetails}
                                saveContentDetails={props.saveLiveDetails}
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
    //let {liveId} = useParams()
    return {
        liveDetailsState: state.live.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveDetails: async (liveId: string) => {
            await dispatch(getLiveDetailsAction(liveId));
        },
        saveLiveDetails: async (data: LiveDetails) => {
            await dispatch(saveLiveDetailsAction(data))
        },
        getUploadUrl: async (uploadType: string, liveId: string, extension: string) => {
            await dispatch(getUploadUrlAction(uploadType, liveId, extension))
        },
        uploadFile: async (data: File, uploadUrl: string, liveId: string, uploadType: string) => {
            await dispatch(uploadFileAction(data, uploadUrl, liveId, uploadType))
        },
        deleteFile: async (liveId: string, targetId: string, uploadType: string) => {
            await dispatch(deleteFileAction(liveId, targetId, uploadType))
        },
        showToast: async (text: string, size: Size, notificationType: NotificationType) => {
            await dispatch(showToastNotification(text, size, notificationType));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);