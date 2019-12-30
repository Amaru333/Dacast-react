
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfos } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { VodDetails, VodItem } from './General/types';
import { GeneralReducer, reducerList } from './General/reducer';


export const vodInitialState: VodState = {
    chapters: false,
    general: false,
    list: false
};


export interface  VodState {
    chapters: false | ChapterMarkerInfos;
    general: false | VodDetails;
    list: false | VodItem[];
}

export const VodReducer: Reducer<VodState> = combineReducers({
    chapters: ChaptersReducer, 
    general: GeneralReducer,
    list: reducerList
})