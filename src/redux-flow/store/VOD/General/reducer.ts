import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, VodDetails, VodItem } from './types';

const initialVodGeneralState: VodDetails = {
    id: "",
    online: false,
    title: "",
    folder: "",
    description: "",
    thumbnail: null,
    subtitles: []
}

const initialVodList: VodItem[] | false = false;


const reducer: Reducer<VodDetails> = (state = initialVodGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.EDIT_VOD_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.ADD_VOD_SUBTITLE:
            let newArray = state.subtitles.slice()
            newArray.splice(newArray.length, 0, action.payload)
            return {
                ...state,
                subtitles: newArray
            };
        case ActionTypes.EDIT_VOD_SUBTITLE:
            return {
                ...state, subtitles: state.subtitles.map((item) => {
                    if (item.id !== action.payload.id) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload
                    }
                })
            };
        case ActionTypes.DELETE_VOD_SUBTITLE:
            return { ...state, subtitles: state.subtitles.filter((item) => item.id != action.payload.id) }
        case ActionTypes.CHANGE_VOD_THUMBNAIL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const reducerList: Reducer<VodItem[] | false> = (state = initialVodList, action: Action) => {
    switch (action.type) {
        case ActionTypes.POST_VOD:
            if(state) {
                return [
                    {
                        id: '1234567',
                        online: false,
                        title: "Big_Buck_Bunny.mp4",
                        size: 69742504,
                        views: 0,
                        thumbnail: 'https://images.dacast.com/96941/tf-636991-1.png?1576680225',
                        created: 1576666852,
                        features: {
                            paywall: false,
                            folder: false,
                            playlist: false,
                        }
                    },
                    ...state
                ];
            } else {
                return [
                    {
                        id: '1234567',
                        online: false,
                        title: "Big_Buck_Bunny.mp4",
                        size: 69742504,
                        views: 0,
                        thumbnail: 'https://images.dacast.com/96941/tf-636991-1.png?1576680225',
                        created: 1576666852,
                        features: {
                            paywall: false,
                            folder: false,
                            playlist: false,
                        }
                    }
                ];
            }
            
        case ActionTypes.GET_VOD_LIST:
            return [
                ...action.payload
            ];
        case ActionTypes.DELETE_VOD:
            if(state) {
                var newList = state.filter(elem => elem.title !== action.payload.name);
                return newList;
            }
        default:
            return state;
    }
};

export { reducer as GeneralReducer };