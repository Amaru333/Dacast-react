import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, InteractionsInfos, interactionsDefaultState } from './types';

const reducer: Reducer<InteractionsInfos> = (state = interactionsDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_INTERACTIONS_INFOS:
            return {...action.payload};
        case ActionTypes.SAVE_SETTINGS_INTERACTIONS_INFOS:
            return {...action.payload};
        case ActionTypes.SAVE_AD :
            let ads = state.adList.slice();
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
            ads.splice(ads.length, 0, action.payload )
            return {...state,
                adList: ads  
            }
        case ActionTypes.DELETE_AD:
            return {...state, adList: state.adList.filter((item) => item.id != action.payload.id)}
        
        case ActionTypes.SAVE_MAIL_CATCHER :
            let mailCatcherList = state.mailCatcher.slice();
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
