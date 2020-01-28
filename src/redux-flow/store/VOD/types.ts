
import { combineReducers, Reducer } from 'redux';
import { ChapterMarkerInfos } from './Chapters/types';
import { ChaptersReducer } from './Chapters/reducer';
import { VodSecuritySettings, VodSecurityReducer } from './Security';
import { VodDetails, VodItem } from './General/types';
import { GeneralReducer, reducerList } from './General/reducer';
import { RenditionsReducer } from './Renditions/reducer';
import { RenditionsList } from './Renditions/types';
import { VodTheme } from './Theming/types';
import { VodThemingReducer } from './Theming/reducer';


export const vodInitialState: VodState = {
    chapters: false,
    security: false,
    general: false,
    list: false,
    renditions: false,
    theming: false
};


export interface  VodState {
    chapters: false | ChapterMarkerInfos;
    security: false | VodSecuritySettings;
    general: false | VodDetails;
    list: false | VodItem[];
    renditions: false | RenditionsList;
    theming: false | VodTheme
}

export const VodReducer: Reducer<VodState> = combineReducers({
    chapters: ChaptersReducer, 
    security: VodSecurityReducer,
    general: GeneralReducer,
    list: reducerList,
    renditions: RenditionsReducer,
    theming: VodThemingReducer
})