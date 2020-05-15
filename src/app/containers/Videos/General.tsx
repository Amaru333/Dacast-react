import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodDetailsAction, getUploadUrlAction, editVodDetailsAction, deleteFileAction, uploadFileAction } from '../../redux-flow/store/VOD/General/actions';
import { connect } from 'react-redux';
import { VodDetails, SubtitleInfo, VodDetailsState } from '../../redux-flow/store/VOD/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GeneralPage } from '../../pages/Videos/General/General';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';


export interface GeneralComponentProps {
    vodDetails: VodDetails;
    vodDetailsState: VodDetailsState;
    editVodDetails: Function;
    getVodDetails: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    deleteFile: Function;
}

const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams();

    React.useEffect(() => {
        if(!props.vodDetailsState[vodId]) {
            props.getVodDetails(vodId);
        }
    }, [])

    return (
        props.vodDetailsState[vodId] ?
            (
                <div className='flex flex-column'>
                    <VideoTabs videoId={vodId} />
                    <GeneralPage {...props} vodDetails={props.vodDetailsState[vodId]} vodId={vodId} />
                </div>
            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
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
        editVodDetails: (data: VodDetails) => {
            dispatch(editVodDetailsAction(data));
        },
        getUploadUrl: (uploadType: string, vodId: string, subtitleInfo?: SubtitleInfo) => {
            dispatch(getUploadUrlAction(uploadType, vodId, subtitleInfo))
        },
        uploadFile: (data: File, uploadUrl: string) => {
            dispatch(uploadFileAction(data, uploadUrl))
        },
        deleteFile: (vodId: string, targetId: string) => {
            dispatch(deleteFileAction(vodId, targetId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);