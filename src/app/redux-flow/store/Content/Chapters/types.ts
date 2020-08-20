export enum ActionTypes {
    GET_CONTENT_CHAPTER_MARKERS = "@@content_chapters/GET_CONTENT_CHAPTER_MARKERS",
    SAVE_CONTENT_CHAPTER_MARKER = "@@content_chapters/SAVE_CONTENT_CHAPTER_MARKER",    
    ADD_CONTENT_CHAPTER_MARKER = "@@content_chapters/ADD_CONTENT_CHAPTER_MARKER",
    DELETE_CONTENT_CHAPTER_MARKER = "@@content_chapters/DELETE_CONTENT_CHAPTER_MARKER"

}

export interface ChapterMarker { 
    id?: string;
    text: string;
    start: number;
};

export interface ChapterMarkerInfos {
    chapterMarkers: ChapterMarker[];
}

export interface ChapterMarkerInfosState { 
    [key: string]: {
        [key: string]: ChapterMarkerInfos 
    }
}

export const defaultStateChapter: ChapterMarkerInfosState = {}
