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
import { ContentType } from '../../redux-flow/store/Common/types';

export interface ChapterComponentProps {
    chapterPageDetails: ChapterMarkerInfos;
    chapterPageDetailsState: ChapterMarkerInfosState;
    getContentChapterMarkers: (contentId: string, contentType: ContentType) => Promise<void>;
    saveContentChapterMarker: (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => Promise<void>;
    addContentChapterMarker: (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => Promise<void>;
    deleteContentChapterMarker: (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => Promise<void>;
}

const Chapters = (props: ChapterComponentProps) => {

    let { vodId } = useParams<{vodId: string}>()
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
        getContentChapterMarkers: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentChapterMarkersAction(contentType)(contentId));
        },
        saveContentChapterMarker: async (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => {
            await dispatch(saveContentChapterMarkerAction(contentType)({contentId: contentId, chapterMarkers: chapterMarkers}));
        },
        addContentChapterMarker: async (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => {
            await dispatch(addContentChapterMarkerAction(contentType)({contentId: contentId, chapterMarkers: chapterMarkers}));
        },
        deleteContentChapterMarker: async (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => {
            await dispatch(deleteContentChapterMarkerAction(contentType)({contentId: contentId, chapterMarkers: chapterMarkers}));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapters);