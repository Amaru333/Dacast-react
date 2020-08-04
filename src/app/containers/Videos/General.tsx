import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodDetailsAction, getUploadUrlAction, editVodDetailsAction, deleteFileAction, uploadFileAction, deleteSubtitleAction, addSubtitleAction, uploadImageFromVideoAction } from '../../redux-flow/store/VOD/General/actions';
import { connect } from 'react-redux';
import { VodDetails, SubtitleInfo, VodDetailsState } from '../../redux-flow/store/VOD/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GeneralPage } from '../../pages/Videos/General/General';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';


export interface GeneralComponentProps {
    vodDetails: VodDetails;
    vodDetailsState: VodDetailsState;
    editVodDetails: Function;
    getVodDetails: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    uploadImageFromVideo: Function;
    deleteFile: Function;
    showToast: Function;
    deleteSubtitle: Function;
    addSubtitle: Function;
}

const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams();

    React.useEffect(() => {
        if (!props.vodDetailsState[vodId]) {
            props.getVodDetails(vodId);
        }
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.vodDetailsState[vodId] ?
                    (
                        <div className='flex flex-column'>
                            <GeneralPage {...props} vodDetails={props.vodDetailsState[vodId]} />
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
        getVodDetails: (vodId: string) => {
            dispatch(getVodDetailsAction(vodId));
        },
        editVodDetails: (data: VodDetails, callback?: Function) => {
            dispatch(editVodDetailsAction(data)).then(callback).catch(callback);
        },
        getUploadUrl: (uploadType: string, vodId: string, extension: string, subtitleInfo?: SubtitleInfo) => {
            dispatch(getUploadUrlAction(uploadType, vodId, extension, subtitleInfo))
        },
        uploadFile: async (data: File, uploadUrl: string, vodId: string, uploadType: string) => {
           await dispatch(uploadFileAction(data, uploadUrl, vodId, uploadType))
        },
        uploadImageFromVideo: async (vodId: string, time: number, imageType: string, callback?: Function)  => {
            await dispatch(uploadImageFromVideoAction(vodId, time, imageType))
            .then(callback).catch(callback)
        },
        deleteFile: (vodId: string, targetId: string, fileName: string) => {
            dispatch(deleteFileAction(vodId, targetId)).then(() => dispatch(getVodDetailsAction(vodId)))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        addSubtitle: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, vodId: string, callback: Function) => {
            dispatch(addSubtitleAction(data, uploadUrl, subtitleInfo, vodId))
            .then(callback).catch(callback)

        },
        deleteSubtitle: (targetId: string, vodId: string, fileName: string) => {
            dispatch(deleteSubtitleAction(targetId, vodId, fileName))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);