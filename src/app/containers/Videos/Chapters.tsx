import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ChapterMarkerInfos, ChapterMarker } from '../../redux-flow/store/VOD/Chapters/types';
import { Action, getVodChapterMarkersAction, saveVodChapterMarkerAction, addVodChapterMarkerAction, deleteVodChapterMarkerAction } from '../../redux-flow/store/VOD/Chapters/actions';
import { ChaptersPage } from '../../pages/Videos/ChapterMarkers/Chapters';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface ChapterContainerProps {
    chapterPageDetails: ChapterMarkerInfos;
    getVodChapterMarkers: Function;
    saveVodChapterMarker: Function;
    addVodChapterMarker: Function;
    deleteVodChapterMarker: Function;
}

const Chapters = (props: ChapterContainerProps) => {

    React.useEffect(() => {
        if(!props.chapterPageDetails) {
            props.getVodChapterMarkers();
        }
    }, [])
    return (
        props.chapterPageDetails ?
            <ChaptersPage {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        chapterPageDetails: state.vod.chapters
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodChapterMarkers: () => {
            dispatch(getVodChapterMarkersAction());
        },
        saveVodChapterMarker: (data: ChapterMarker) => {
            dispatch(saveVodChapterMarkerAction(data));
        },
        addVodChapterMarker: (data: ChapterMarker) => {
            dispatch(addVodChapterMarkerAction(data));
        },
        deleteVodChapterMarker: (data: ChapterMarker) => {
            dispatch(deleteVodChapterMarkerAction(data));
        },
    };
}

export default  connect(mapStateToProps, mapDispatchToProps)(Chapters);