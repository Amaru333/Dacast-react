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
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';

export interface VodRenditionsProps {
    renditions: RenditionsList;
    renditionsState: RenditionsListState
    addContentRenditions: (ids: string[], contentId: string, contentType: ContentType) => Promise<void>;
    deleteContentRenditions: (ids: string[], contentId: string, contentType: ContentType) => Promise<void>;
    getContentRenditions: (contentId: string, contentType: ContentType) => Promise<void>;
}
export const VodRenditions = (props: VodRenditionsProps) => {

    let { vodId } = useParams<{vodId: string}>()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentRenditions(vodId, 'vod')
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

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
        getContentRenditions: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentRenditionsAction(contentType)(contentId));
        },
        addContentRenditions: async (ids: string[], contentId: string, contentType: ContentType) => {
            await dispatch(addContentRenditionsAction(contentType)({names: ids, targetValue: contentId}));
        },
        deleteContentRenditions: async (ids: string[], contentId: string, contentType: ContentType) => {
            await dispatch(deleteContentRenditionsAction(contentType)({ids: ids, targetValue: contentId}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodRenditions);