
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfos } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { VodDetails } from './General/types';
import { GeneralReducer } from './General/reducer';


export const vodInitialState: VodState = {
    chapters: false,
    general: false
};


export interface  VodState {
    chapters: false | ChapterMarkerInfos;
    general: false | VodDetails;

}

export const VodReducer: Reducer<VodState> = combineReducers({
    chapters: ChaptersReducer, 
    general: GeneralReducer
})