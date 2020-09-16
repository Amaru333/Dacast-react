import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ChapterMarkerInfos, ChapterMarker, ChapterMarkerInfosState } from '../../redux-flow/store/Content/Chapters/types';
import { Action, getContentChapterMarkersAction, saveContentChapterMarkerAction, addContentChapterMarkerAction, deleteContentChapterMarkerAction } from '../../redux-flow/store/Content/Chapters/actions';
import { ChaptersPage } from '../../pages/Videos/ChapterMarkers/Chapters';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface ChapterComponentProps {
    chapterPageDetails: ChapterMarkerInfos;
    chapterPageDetailsState: ChapterMarkerInfosState;
    getContentChapterMarkers: (contentId: string, contentType: string) => Promise<void>;
    saveContentChapterMarker: (contentId: string, contentType: string, data: ChapterMarker[]) => Promise<void>;
    addContentChapterMarker: (contentId: string, contentType: string, data: ChapterMarker[]) => Promise<void>;
    deleteContentChapterMarker: (contentId: string, contentType: string, data: ChapterMarker[]) => Promise<void>;
}

const Chapters = (props: ChapterComponentProps) => {

    let { vodId } = useParams()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentChapterMarkers(vodId, 'vod')
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.chapterPageDetailsState['vod'] && props.chapterPageDetailsState['vod'][vodId] ?
                    <div className='flex flex-column'>
                        <ChaptersPage {...props} chapterPageDetails={props.chapterPageDetailsState['vod'][vodId]} contentId={vodId} contentType='vod' />
                    </div>
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        chapterPageDetailsState: state.content.chapters
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentChapterMarkers: async (contentId: string, contentType: string) => {
            await dispatch(getContentChapterMarkersAction(contentId, contentType));
        },
        saveContentChapterMarker: async (contentId: string, contentType: string, data: ChapterMarker[]) => {
            await dispatch(saveContentChapterMarkerAction(contentId, contentType, data));
        },
        addContentChapterMarker: async (contentId: string, contentType: string, data: ChapterMarker[]) => {
            await dispatch(addContentChapterMarkerAction(contentId, contentType, data));
        },
        deleteContentChapterMarker: async (contentId: string, contentType: string, data: ChapterMarker[]) => {
            await dispatch(deleteContentChapterMarkerAction(contentId, contentType, data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapters);