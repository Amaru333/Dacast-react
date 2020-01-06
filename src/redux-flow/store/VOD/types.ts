
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfos } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { VodSecuritySettings, VodSecurityReducer } from './Security';


export const vodInitialState: VodState = {
    chapters: false,
    security: false
};


export interface  VodState {
    chapters: false | ChapterMarkerInfos;
    security: false | VodSecuritySettings

}

export const VodReducer: Reducer<VodState> = combineReducers({
    chapters: ChaptersReducer, 
    security: VodSecurityReducer
})