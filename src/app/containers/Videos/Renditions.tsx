import React from 'react';
import { VodRenditionsPage } from '../../pages/Videos/Renditions/Renditions';
import { RenditionsList, Rendition } from '../../redux-flow/store/VOD/Renditions/types';
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
    getVodRenditions: Function;
    addVodRenditions: Function;
    deleteVodRenditions: Function;
}

export const VodRenditions = (props: VodRenditionsContainerProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if(!props.renditions) {
            props.getVodRenditions(vodId);
        }
    }, [])

    return (
        props.renditions ?
            (
                <div className='flex flex-column'>
                    <VideoTabs videoId={vodId} />
                    <VodRenditionsPage {...props} vodId={vodId} />
                </div>            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        renditions: state.vod.renditions
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodRenditions: (vodId: string) => {
            dispatch(getVodRenditionsAction(vodId));
        },
        addVodRenditions: (data: Rendition[]) => {
            dispatch(addVodRenditionsAction(data));
        },
        deleteVodRenditions: (data: Rendition[]) => {
            dispatch(deleteVodRenditionsAction(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodRenditions);