import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, ChapterMarkerInfos, defaultStateChapter } from './types';

const reducer: Reducer<ChapterMarkerInfos> = (state = defaultStateChapter, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_CHAPTER_MARKERS:
            return {
                ...state, chapterMarkers: action.payload.map((chapter, i) => {return {...chapter, id: chapter.text + i.toString()}})
            };
        case ActionTypes.SAVE_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                chapterMarkers: state.chapterMarkers.map((chapter) => {
                    if(chapter.id !== action.payload.id) {
                        return chapter
                    }
                    else {
                        return action.payload
                    }
                })
            };
        case ActionTypes.ADD_VOD_CHAPTER_MARKER:
            let newArray = state.chapterMarkers.slice()
            newArray.splice(newArray.length, 0, {...action.payload, id: action.payload.text + (newArray.length + 1)})
            return {
                ...state, 
                chapterMarkers: newArray
            };
        case ActionTypes.DELETE_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                chapterMarkers: state.chapterMarkers.filter((chapter) => chapter.id !== action.payload.id)
            };
        default:
            return state;
    }
};

// Named export
export { reducer as ChaptersReducer };

