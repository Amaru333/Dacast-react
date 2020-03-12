import { Account } from './List/types';
import { combineReducers, Reducer } from 'redux';
import reducer from './List/reducer';
import { PlanInfo } from './EditPlan/types';
import { PlanReducer } from './EditPlan';
import { AccountInfo } from './EditAccount/types';
import { AccountReducer } from './EditAccount';


export interface AccountsState {
    plan: false | PlanInfo;
    list: Account[] | false;
    account: AccountInfo | false;

}

export const accountsInitialState: AccountsState = {
    plan: false,
    list: false,
    account: false
}

export const AccountsReducer: Reducer<AccountsState> = combineReducers({
    plan: PlanReducer,
    list: reducer,
    account: AccountReducer

})

