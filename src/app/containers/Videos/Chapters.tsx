import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ChapterMarkerInfos, ChapterMarker, ChapterMarkerInfosState } from '../../redux-flow/store/VOD/Chapters/types';
import { Action, getVodChapterMarkersAction, saveVodChapterMarkerAction, addVodChapterMarkerAction, deleteVodChapterMarkerAction } from '../../redux-flow/store/VOD/Chapters/actions';
import { ChaptersPage } from '../../pages/Videos/ChapterMarkers/Chapters';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';

export interface ChapterComponentProps {
    chapterPageDetails: ChapterMarkerInfos;
    chapterPageDetailsState: ChapterMarkerInfosState;
    getVodChapterMarkers: (contentId: string) => Promise<void>;
    saveVodChapterMarker: (vodId: string, data: ChapterMarker[]) => Promise<void>;
    addVodChapterMarker: (vodId: string, data: ChapterMarker[]) => Promise<void>;
    deleteVodChapterMarker: (vodId: string, data: ChapterMarker[]) => Promise<void>;
}

const Chapters = (props: ChapterComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.chapterPageDetailsState[vodId]) {
            props.getVodChapterMarkers(vodId);
        }
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.chapterPageDetailsState[vodId] ?
                    <div className='flex flex-column'>
                        <ChaptersPage {...props} chapterPageDetails={props.chapterPageDetailsState[vodId]} vodId={vodId} />
                    </div>
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        chapterPageDetailsState: state.vod.chapters
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodChapterMarkers: async (vodId: string) => {
            await dispatch(getVodChapterMarkersAction(vodId));
        },
        saveVodChapterMarker: async (vodId: string, data: ChapterMarker[]) => {
            await dispatch(saveVodChapterMarkerAction(vodId, data));
        },
        addVodChapterMarker: async (vodId: string, data: ChapterMarker[]) => {
            await dispatch(addVodChapterMarkerAction(vodId, data));
        },
        deleteVodChapterMarker: async (vodId: string, data: ChapterMarker[]) => {
            await dispatch(deleteVodChapterMarkerAction(vodId, data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chapters);