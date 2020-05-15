import React from 'react';
import { VodRenditionsPage } from '../../pages/Videos/Renditions/Renditions';
import { RenditionsList, RenditionsListState } from '../../redux-flow/store/VOD/Renditions/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodRenditionsAction, addVodRenditionsAction, deleteVodRenditionsAction } from '../../redux-flow/store/VOD/Renditions/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';

interface VodRenditionsContainerProps {
    renditions: RenditionsList;
    renditionsState: RenditionsListState;
    getVodRenditions: Function;
    addVodRenditions: Function;
    deleteVodRenditions: Function;
}

export const VodRenditions = (props: VodRenditionsContainerProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if(!props.renditionsState[vodId]) {
            props.getVodRenditions(vodId);
        }
    }, [])

    return (
        props.renditionsState[vodId] ?
            (
                <div className='flex flex-column'>
                    <VideoTabs videoId={vodId} />
                    <VodRenditionsPage {...props} renditions={props.renditionsState[vodId]} vodId={vodId} />
                </div>            
            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        renditionsState: state.vod.renditions
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodRenditions: (vodId: string) => {
            dispatch(getVodRenditionsAction(vodId));
        },
        addVodRenditions: (data: string[], vodId: string) => {
            dispatch(addVodRenditionsAction(data, vodId));
        },
        deleteVodRenditions: (data: string[], vodId: string) => {
            dispatch(deleteVodRenditionsAction(data, vodId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodRenditions);