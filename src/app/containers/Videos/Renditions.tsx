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
    getVodRenditions: (vodId: string) => Promise<void>;
    addVodRenditions: (data: string[], vodId: string) => Promise<void>;
    deleteVodRenditions: (data: string[], vodId: string) => Promise<void>;
}

export const VodRenditions = (props: VodRenditionsContainerProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.renditionsState[vodId]) {
            props.getVodRenditions(vodId);
        }
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.renditionsState[vodId] ?
                    (
                        <div className='flex flex-column'>
                            <VodRenditionsPage {...props} renditions={props.renditionsState[vodId]} vodId={vodId} />
                        </div>
                    )
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        renditionsState: state.vod.renditions
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodRenditions: async (vodId: string) => {
            await dispatch(getVodRenditionsAction(vodId));
        },
        addVodRenditions: async (data: string[], vodId: string) => {
            await dispatch(addVodRenditionsAction(data, vodId));
        },
        deleteVodRenditions: async (data: string[], vodId: string) => {
            await dispatch(deleteVodRenditionsAction(data, vodId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodRenditions);