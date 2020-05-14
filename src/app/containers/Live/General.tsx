import React from 'react';
import { LiveGeneralPage } from '../../pages/Live/General/General'
import { LiveDetails } from '../../redux-flow/store/Live/General/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveDetailsAction, saveLiveDetailsAction, deleteFileAction, uploadFileAction, getUploadUrlAction } from '../../redux-flow/store/Live/General/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router-dom';

export interface LiveGeneralProps {
    liveDetails: LiveDetails;
    getLiveDetails: Function;
    saveLiveDetails: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    deleteFile: Function;
}

export const LiveGeneral = (props: LiveGeneralProps) => {

    let {liveId} = useParams()


    React.useEffect(() => {
        props.getLiveDetails(liveId);
    }, [])

    return (
        props.liveDetails ? 
            (
                <div className='flex flex-column'>
                    <LiveTabs liveId={liveId} />
                    <LiveGeneralPage {...props} />
                </div>            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveDetails: state.live.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveDetails: (liveId: string) => {
            dispatch(getLiveDetailsAction(liveId));
        },
        saveLiveDetails: (data: LiveDetails, callback?: Function) => {
            dispatch(saveLiveDetailsAction(data)).then(callback);
        },
        getUploadUrl: (uploadType: string, liveId: string, callback: Function) => {
            dispatch(getUploadUrlAction(uploadType, liveId)).then(callback)
        },
        uploadFile: (data: File, uploadUrl: string) => {
            dispatch(uploadFileAction(data, uploadUrl))
        },
        deleteFile: (liveId: string, targetId: string) => {
            dispatch(deleteFileAction(liveId, targetId))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);