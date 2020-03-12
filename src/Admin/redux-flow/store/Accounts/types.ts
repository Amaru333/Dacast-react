import { Account } from './List/types';
import { combineReducers, Reducer } from 'redux';
import reducer from './List/reducer';
import { PlanInfo } from './EditPlan/types';
import { PlanReducer } from './EditPlan';


export interface AccountsState {
    plan: false | PlanInfo;
    list: Account[] | false;

}

export const accountsInitialState: AccountsState = {
    plan: false,
    list: false,
}

export const AccountsReducer: Reducer<AccountsState> = combineReducers({
    plan: PlanReducer,
    list: reducer,

})

