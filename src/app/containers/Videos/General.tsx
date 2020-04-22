import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodDetailsAction, addVodSubtitleAction, editVodSubtitleAction, getUploadUrlAction, editVodDetailsAction, deleteVodSubtitleAction, uploadImageAction, deleteImageAction } from '../../redux-flow/store/VOD/General/actions';
import { connect } from 'react-redux';
import { VodDetails, SubtitleInfo } from '../../redux-flow/store/VOD/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GeneralPage } from '../../pages/Videos/General/General';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';


export interface GeneralComponentProps {
    vodDetails: VodDetails;
    editVodDetails: Function;
    getVodDetails: Function;
    addVodSubtitle: Function;
    editVodSubtitle: Function;
    deleteVodSubtitle: Function;
    getUploadUrl: Function;
    uploadImage: Function;
    deleteImage: Function;
}

const General = (props: GeneralComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.vodDetails) {
            props.getVodDetails(vodId);
        }
    }, [])

    return (
        props.vodDetails ?
            (
                <div className='flex flex-column'>
                    <VideoTabs videoId={vodId} />
                    <GeneralPage {...props} vodId={vodId} />
                </div>
            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodDetails: state.vod.general
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
        addVodSubtitle: (data: SubtitleInfo) => {
            dispatch(addVodSubtitleAction(data));
        },
        editVodSubtitle: (data: SubtitleInfo) => {
            dispatch(editVodSubtitleAction(data));
        },
        deleteVodSubtitle: (data: SubtitleInfo) => {
            dispatch(deleteVodSubtitleAction(data));
        },
        getUploadUrl: (uploadType: string, vodId: string) => {
            dispatch(getUploadUrlAction(uploadType, vodId))
        },
        uploadImage: (data: File, uploadUrl: string) => {
            dispatch(uploadImageAction(data, uploadUrl))
        },
        deleteImage: (data: File) => {
            dispatch(deleteImageAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);