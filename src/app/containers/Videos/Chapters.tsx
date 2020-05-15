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
    getVodChapterMarkers: Function;
    saveVodChapterMarker: Function;
    addVodChapterMarker: Function;
    deleteVodChapterMarker: Function;
}

const Chapters = (props: ChapterComponentProps) => {

    let { vodId } = useParams()
    
    React.useEffect(() => {
        if(!props.chapterPageDetailsState[vodId]) {
            props.getVodChapterMarkers(vodId);
        }
    }, [])
    
    return (
        props.chapterPageDetailsState[vodId] ? 
            <div className='flex flex-column'>
                <VideoTabs videoId={vodId} />
                <ChaptersPage {...props} chapterPageDetails={props.chapterPageDetailsState[vodId]} vodId={vodId} />
            </div>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        chapterPageDetailsState: state.vod.chapters
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodChapterMarkers: (vodId: string) => {
            dispatch(getVodChapterMarkersAction(vodId));
        },
        saveVodChapterMarker: (vodId: string, data: ChapterMarker[]) => {
            dispatch(saveVodChapterMarkerAction(vodId, data));
        },
        addVodChapterMarker: (vodId: string, data: ChapterMarker[]) => {
            dispatch(addVodChapterMarkerAction(vodId, data));
        },
        deleteVodChapterMarker: (vodId: string, data: ChapterMarker[]) => {
            dispatch(deleteVodChapterMarkerAction(vodId, data));
        },
    };
}

export default  connect(mapStateToProps, mapDispatchToProps)(Chapters);