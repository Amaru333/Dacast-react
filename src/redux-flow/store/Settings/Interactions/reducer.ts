import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, InteractionsInfos, interactionsDefaultState, MailCatcher, Ad } from './types';

const reducer: Reducer<InteractionsInfos> = (state = interactionsDefaultState, action: Action) => {
    let ads: Ad[] = []
    let mailCatcherList: MailCatcher[] = [];
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS:
            return {...action.payload};
        case ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS:
            return {...action.payload};
        case ActionTypes.SAVE_AD :
            ads = state.adList.slice();
            return  {...state, adList: ads.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.CREATE_AD:
            ads = state.adList.slice();
            ads.splice(ads.length, 0, action.payload )
            return {...state,
                adList: ads  
            }
        case ActionTypes.DELETE_AD:
            return {...state, adList: state.adList.filter((item) => item.id != action.payload.id)}
        
        case ActionTypes.SAVE_MAIL_CATCHER :
            mailCatcherList = state.mailCatcher.slice();
            return  {...state, mailCatcher: mailCatcherList.map((item) => {
                if (item.type !== action.payload.type) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.CREATE_MAIL_CATCHER:
            mailCatcherList = state.mailCatcher.slice();
            mailCatcherList.splice(mailCatcherList.length, 0, action.payload )
            return {...state,
                mailCatcher: mailCatcherList  
            }
        case ActionTypes.DELETE_MAIL_CATCHER:
            return {...state, mailCatcher: state.mailCatcher.filter((item) => item.type != action.payload.type)}
        default:
            return state;
    }
};

// Named export
export { reducer as InteractionReducer };
