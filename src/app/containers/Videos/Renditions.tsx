import React from 'react';
import { VodRenditionsPage } from '../../pages/Videos/Renditions/Renditions';
import { RenditionsList, RenditionsListState } from '../../redux-flow/store/Content/Renditions/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getContentRenditionsAction, addContentRenditionsAction, deleteContentRenditionsAction } from '../../redux-flow/store/Content/Renditions/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';

export interface VodRenditionsProps {
    renditions: RenditionsList;
    renditionsState: RenditionsListState
    addContentRenditions: (ids: string[], contentId: string, contentType: string) => Promise<void>;
    deleteContentRenditions: (ids: string[], contentId: string, contentType: string) => Promise<void>;
    getContentRenditions: (contentId: string, contentType: string) => Promise<void>;
}
export const VodRenditions = (props: VodRenditionsProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
            props.getContentRenditions(vodId, 'vod');
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.renditionsState['vod'] && props.renditionsState['vod'][vodId] ?
                    (
                        <div className='flex flex-column'>
                            <VodRenditionsPage {...props} renditions={props.renditionsState['vod'][vodId]} contentId={vodId} contentType='vod' />
                        </div>
                    )
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        renditionsState: state.content.renditions
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentRenditions: async (contentId: string, contentType: string) => {
            await dispatch(getContentRenditionsAction(contentId, contentType));
        },
        addContentRenditions: async (ids: string[], contentId: string, contentType: string) => {
            await dispatch(addContentRenditionsAction(ids, contentId, contentType));
        },
        deleteContentRenditions: async (ids: string[], contentId: string, contentType: string) => {
            await dispatch(deleteContentRenditionsAction(ids, contentId, contentType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodRenditions);