import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, EngagementInfo, interactionsDefaultState, MailCatcher, Ad } from './types';

const reducer: Reducer<EngagementInfo> = (state = interactionsDefaultState, action: Action) => {
    let mailCatcherList: MailCatcher[] = [];
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS:
            return {
                ...action.payload,
                mailCatcher: null
            };
        case ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS:
            return {...state, ...action.payload};
        case ActionTypes.SAVE_AD :
        case ActionTypes.CREATE_AD:
        case ActionTypes.DELETE_AD:
            return {
                ...state, 
                adsSettings: {
                    ...state.adsSettings,
                    ads: action.payload
                }
            }
        case ActionTypes.GET_UPLOAD_URL:
            return {
                ...state,
               uploadurl: action.payload.presignedURL
            }
        case ActionTypes.UPLOAD_IMAGE:
            return state
        case ActionTypes.DELETE_IMAGE:
            return state
        // case ActionTypes.SAVE_MAIL_CATCHER :
        //     mailCatcherList = state.mailCatcher.slice();
        //     return  {...state, mailCatcher: mailCatcherList.map((item) => {
        //         if (item.type !== action.payload.type) {
        //             return item
        //         }
        //         return {
        //             ...item,
        //             ...action.payload
        //         }
        //     })}
        // case ActionTypes.CREATE_MAIL_CATCHER:
        //     mailCatcherList = state.mailCatcher.slice();
        //     mailCatcherList.splice(mailCatcherList.length, 0, action.payload )
        //     return {...state,
        //         mailCatcher: mailCatcherList  
        //     }
        // case ActionTypes.DELETE_MAIL_CATCHER:
        //     return {...state, mailCatcher: state.mailCatcher.filter((item) => item.type !== action.payload.type)}
        default:
            return state;
    }
};

// Named export
export { reducer as InteractionReducer };
