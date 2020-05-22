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

export interface LiveGeneralProps {
    liveDetails: LiveDetails;
    liveDetailsState: LiveDetailsState;
    getLiveDetails: Function;
    saveLiveDetails: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    deleteFile: Function;
}

export const LiveGeneral = (props: LiveGeneralProps) => {

    let { liveId } = useParams()


    React.useEffect(() => {
        if (!props.liveDetailsState[liveId]) {
            props.getLiveDetails(liveId);
        }
    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.liveDetailsState[liveId] ?
                    (
                        <div className='flex flex-column'>
                            <LiveGeneralPage {...props} liveDetails={props.liveDetailsState[liveId]} />
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