import { Reducer } from 'redux';
import { Action } from './actions';
import { ActionTypes, PaywallThemingData, paywallThemingInitialState } from './types';


const reducer: Reducer<PaywallThemingData> = (state = paywallThemingInitialState, action: Action) => {
    let themes = null;
    switch (action.type) {
        case ActionTypes.GET_PAYWALL_THEMES :
            return {
                themes: action.payload
            }
        case ActionTypes.CREATE_PAYWALL_THEME :
            themes = state.themes.slice();
            if(action.payload.isDefault) {
                themes = themes.map((item) => {return {...item, isDefault: false}})
            }
            themes.splice(themes.length, 0, action.payload);
            return {
                themes: themes
            }
        case ActionTypes.SAVE_PAYWALL_THEME :
            state.themes.slice();
            if(action.payload.isDefault) {
                themes = state.themes.map((item) => {return {...item, isDefault: false}})
            }
            return {
                themes: state.themes.map((item) => {
                    if(item.id !== action.payload.id) {
                        return item;
                    }
                    else {
                        return {
                            ...item,
                            ...action.payload
                        }
                    }
                })
            }
        case ActionTypes.DELETE_PAYWALL_THEME :
            return {
                themes: state.themes.filter((item) => {return item.id !== action.payload.id})
            }
        default: 
            return state;
    }
}

export { reducer as PaywallThemingReducer };