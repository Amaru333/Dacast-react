export enum ActionTypes {
    GET_VOD_CHAPTER_MARKERS = "@@vod_chapters/GET_VOD_CHAPTER_MARKERS",
    SAVE_VOD_CHAPTER_MARKER = "@@vod_chapters/SAVE_VOD_CHAPTER_MARKER",    
    ADD_VOD_CHAPTER_MARKER = "@@vod_chapters/ADD_VOD_CHAPTER_MARKER",
    DELETE_VOD_CHAPTER_MARKER = "@@vod_chapters/DELETE_VOD_CHAPTER_MARKER"

}

export interface ChapterMarker { [key: string]: string};

export interface ChapterMarkerInfos {
    chapterMarkers: ChapterMarker[]
}

export const defaultStateChapter: ChapterMarkerInfos = {
    chapterMarkers: []
}
