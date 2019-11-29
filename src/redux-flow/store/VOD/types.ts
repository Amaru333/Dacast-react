
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfos } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';


export const vodInitialState: VodState = {
    chapters: false
};


export interface  VodState {
    chapters: false | ChapterMarkerInfos;

}

export const VodReducer: Reducer<VodState> = combineReducers({
    chapters: ChaptersReducer, 
})